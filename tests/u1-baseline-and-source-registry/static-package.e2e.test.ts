import { describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(import.meta.dir, '../..');
const files = {
  sidebar: join(root, 'sources/aws-sidebar-index.md'),
  registry: join(root, 'sources/source-registry.yaml'),
  traceability: join(root, 'sources/content-traceability.yaml'),
};

type AnyRecord = Record<string, any>;

async function readPackage() {
  const [sidebarBytes, registryBytes, traceabilityBytes] = await Promise.all([
    readFile(files.sidebar),
    readFile(files.registry),
    readFile(files.traceability),
  ]);
  const decoder = new TextDecoder('utf-8', { fatal: true });
  const sidebar = decoder.decode(sidebarBytes);
  const registry = Bun.YAML.parse(decoder.decode(registryBytes)) as AnyRecord;
  const traceability = Bun.YAML.parse(decoder.decode(traceabilityBytes)) as AnyRecord;
  return { sidebar, registry, traceability };
}

function parseSidebar(markdown: string) {
  return [...markdown.matchAll(/^\| `(SIDE-[^`]+)` \| (.*?) \| \[공식 링크\]\(([^)]+)\) \| .*? \| .*? \| `(SRC-[^`]+)` \| (discovered|downloaded|summarized|reviewed|verified|blocked) \|$/gm)].map((match) => ({ link_id: match[1], title: match[2], url: match[3], linked_source_id: match[4], access_status: match[5] }));
}

function runFullValidation(pkg: { sidebar: string; registry: AnyRecord; traceability: AnyRecord }) {
  const findings: string[] = [];
  const sourceIds = new Set(pkg.registry.sources.map((source: AnyRecord) => source.source_id));
  const baselineIds = new Set(pkg.traceability.baseline_items.map((item: AnyRecord) => item.baseline_id));
  const links = parseSidebar(pkg.sidebar);
  const linkIds = new Set(links.map((link) => link.link_id));
  const statusValues = new Set(pkg.registry.status_values);
  if (sourceIds.size !== pkg.registry.sources.length) findings.push('duplicate source_id');
  if (new Set(pkg.registry.sources.map((source: AnyRecord) => source.url)).size !== pkg.registry.sources.length) findings.push('duplicate source URL');
  if (baselineIds.size !== pkg.traceability.baseline_items.length) findings.push('duplicate baseline_id');
  if (linkIds.size !== links.length) findings.push('duplicate sidebar link_id');

  for (const source of pkg.registry.sources) {
    if (!/^SRC-[a-z0-9-]+$/.test(source.source_id)) findings.push(`id:${source.source_id}`);
    if (!statusValues.has(source.access_status)) findings.push(`status:${source.source_id}`);
    const sidebarReverse = source.linked_sidebar_ids ?? [];
    const baselineReverse = source.linked_baseline_ids ?? [];
    if (!Array.isArray(source.linked_sidebar_ids) || !Array.isArray(source.linked_baseline_ids)) findings.push(`reverse:${source.source_id}`);
    if (new Set(sidebarReverse).size !== sidebarReverse.length) findings.push(`duplicate sidebar reverse:${source.source_id}`);
    if (new Set(baselineReverse).size !== baselineReverse.length) findings.push(`duplicate baseline reverse:${source.source_id}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.checked_date)) findings.push(`date:${source.source_id}`);
    if (source.access_status === 'blocked' && !/(사유|확인|후속|영향|revision)/i.test(source.notes)) findings.push(`blocked note:${source.source_id}`);
  }
  for (const item of pkg.traceability.baseline_items) {
    const source = pkg.registry.sources.find((entry: AnyRecord) => entry.source_id === item.source_id);
    if (!/^AIF-C01-D[1-5]-T\d+$/.test(item.baseline_id)) findings.push(`baseline id:${item.baseline_id}`);
    if (!source) findings.push(`baseline source:${item.baseline_id}`);
    if (item.checked_date !== undefined) findings.push(`date alias:${item.baseline_id}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.source_checked)) findings.push(`baseline date:${item.baseline_id}`);
    if (source && item.source_checked !== source.checked_date) findings.push(`date mismatch:${item.baseline_id}`);
    if (item.status === 'verified' && (source.access_status !== 'verified' || item.learning_document_ids.length === 0 || item.question_ids.length === 0)) findings.push(`unsafe verified:${item.baseline_id}`);
  }
  for (const link of links) {
    if (!/^SIDE-[a-z0-9-]+$/.test(link.link_id)) findings.push(`link id:${link.link_id}`);
    if (!sourceIds.has(link.linked_source_id)) findings.push(`link source:${link.link_id}`);
    if (!link.url.startsWith('https://')) findings.push(`link url:${link.link_id}`);
  }
  for (const source of pkg.registry.sources) {
    const forwardSidebar = links.filter((link) => link.linked_source_id === source.source_id).map((link) => link.link_id);
    const reverseSidebar = new Set(source.linked_sidebar_ids ?? []);
    if (forwardSidebar.length !== reverseSidebar.size || forwardSidebar.some((id) => !reverseSidebar.has(id))) findings.push(`sidebar equality:${source.source_id}`);
    const forwardBaseline = pkg.traceability.baseline_items.filter((item: AnyRecord) => item.source_id === source.source_id).map((item: AnyRecord) => item.baseline_id);
    const reverseBaseline = new Set(source.linked_baseline_ids ?? []);
    if (forwardBaseline.length !== reverseBaseline.size || forwardBaseline.some((id) => !reverseBaseline.has(id))) findings.push(`baseline equality:${source.source_id}`);
  }
  const allText = JSON.stringify(pkg);
  if (/(AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|password\s*[:=]|api[_-]?key\s*[:=]|token\s*[:=]|arn:aws:iam::\d{12})/i.test(allText)) findings.push('sensitive data');
  return { findings, input_files: Object.keys(files).map((key) => files[key as keyof typeof files].replace(`${root}\\`, '').replaceAll('\\', '/')), checked_date: pkg.registry.last_checked, tool: 'bun test tests/u1-baseline-and-source-registry/static-package.e2e.test.ts', decision: findings.length === 0 ? 'PASS' : 'FAIL', actions: findings.length === 0 ? [] : ['수정 후 동일 순서로 재검사'], recheck: '동일 U1 명령 재실행', trace_keys: ['BR1.1', 'BR1.3', 'BR1.5', 'BR1.6', 'BR1.7', 'BR1.8'] };
}

describe('U1 static package E2E — UTF-8, 파싱, provenance, 추적성, 범위', () => {
  test('실제 저장소의 세 canonical 파일을 정해진 순서로 읽는다', async () => {
    const pkg = await readPackage();
    expect(pkg.sidebar).toContain('SIDE-aif-c01-intro');
    expect(pkg.registry.sources.length).toBeGreaterThan(30);
    expect(pkg.traceability.baseline_items).toHaveLength(14);
  });

  test('정상 정적 패키지가 전체 검사를 통과한다', async () => {
    const result = runFullValidation(await readPackage());
    expect(result.decision).toBe('PASS');
    expect(result.findings).toEqual([]);
  });

  test('UTF-8 decoder가 유효한 파일을 통과시킨다', async () => {
    const pkg = await readPackage();
    expect(() => new TextDecoder('utf-8', { fatal: true }).decode(new TextEncoder().encode(pkg.sidebar))).not.toThrow();
  });

  test('malformed YAML/JSON 입력은 파싱 실패로 남는다', () => {
    expect(() => Bun.YAML.parse('sources:\n  - source_id: [')).toThrow();
    expect(() => JSON.parse('{"source_id":}')).toThrow();
  });

  test('중복 stable ID fixture는 전체 PASS가 아니다', async () => {
    const pkg = await readPackage();
    const broken = structuredClone(pkg);
    broken.registry.sources[1].source_id = broken.registry.sources[0].source_id;
    expect(runFullValidation(broken).decision).toBe('FAIL');
  });

  test('orphan fixture는 전체 PASS가 아니다', async () => {
    const pkg = await readPackage();
    const broken = structuredClone(pkg);
    broken.traceability.baseline_items[0].source_id = 'SRC-orphan';
    expect(runFullValidation(broken).findings.some((finding: string) => finding.includes('baseline source'))).toBe(true);
  });

  test('날짜 mismatch fixture는 provenance 검사에서 실패한다', async () => {
    const pkg = await readPackage();
    const broken = structuredClone(pkg);
    broken.traceability.baseline_items[0].source_checked = '2026-09-05';
    const result = runFullValidation(broken);
    expect(result.findings).toContain('date mismatch:AIF-C01-D1-T1');
  });

  test('blocked 출처와 확인 필요 baseline은 verified로 표시되지 않는다', async () => {
    const pkg = await readPackage();
    const result = runFullValidation(pkg);
    expect(pkg.registry.sources.some((source: AnyRecord) => source.access_status === 'blocked')).toBe(true);
    expect(pkg.traceability.baseline_items.every((item: AnyRecord) => item.status === 'blocked')).toBe(true);
    expect(result.findings.filter((finding: string) => finding.startsWith('unsafe verified'))).toEqual([]);
  });

  test('실무 확장 출처와 확인 필요·blocked 표지가 시험 기준선과 섞이지 않는다', async () => {
    const pkg = await readPackage();
    expect(JSON.stringify(pkg.registry)).toContain('실무 확장 자료');
    expect(pkg.traceability.open_items.some((item: AnyRecord) => item.status === '확인 필요')).toBe(true);
    expect(pkg.sidebar).toContain('상태: `blocked`');
  });

  test('URL·제목·확인일·짧은 notes만 보존하고 원문 복제 표지가 없다', async () => {
    const pkg = await readPackage();
    expect(pkg.registry.sources.every((source: AnyRecord) => source.url && source.title && source.checked_date && source.notes)).toBe(true);
    expect(pkg.sidebar).not.toContain('원문 전체 복사');
    expect(pkg.traceability).not.toHaveProperty('raw_source_text');
  });

  test('민감정보 후보 fixture는 검사에서 실패한다', async () => {
    const pkg = await readPackage();
    const broken = structuredClone(pkg);
    broken.registry.sources[0].notes = 'token=PLACEHOLDER_NOT_A_SECRET';
    expect(runFullValidation(broken).findings).toContain('sensitive data');
  });

  test('검사 결과가 U8이 소비할 evidence 필드를 모두 제공한다', async () => {
    const result = runFullValidation(await readPackage());
    expect(result).toMatchObject({
      input_files: expect.any(Array),
      checked_date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      tool: expect.stringContaining('bun test tests/u1-baseline-and-source-registry'),
      decision: 'PASS',
      findings: [],
      actions: expect.any(Array),
      recheck: expect.any(String),
      trace_keys: expect.arrayContaining(['BR1.8']),
    });
  });
});
