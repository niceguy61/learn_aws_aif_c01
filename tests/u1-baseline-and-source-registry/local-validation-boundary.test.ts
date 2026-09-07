import { describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(import.meta.dir, '../..');
const sidebarPath = join(root, 'sources/aws-sidebar-index.md');
const registryPath = join(root, 'sources/source-registry.yaml');
const traceabilityPath = join(root, 'sources/content-traceability.yaml');

const sourceStatusValues = new Set(['discovered', 'downloaded', 'summarized', 'reviewed', 'verified', 'blocked']);
const baselineStatusValues = new Set([...sourceStatusValues, '확인 필요']);

type AnyRecord = Record<string, any>;

async function readCatalog() {
  const [sidebar, registryText, traceabilityText] = await Promise.all([
    readFile(sidebarPath, 'utf8'),
    readFile(registryPath, 'utf8'),
    readFile(traceabilityPath, 'utf8'),
  ]);
  return {
    sidebar,
    registry: Bun.YAML.parse(registryText) as AnyRecord,
    traceability: Bun.YAML.parse(traceabilityText) as AnyRecord,
  };
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function parseSidebarLinks(markdown: string) {
  const links: AnyRecord[] = [];
  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(/^\| `(SIDE-[^`]+)` \| (.*?) \| \[공식 링크\]\(([^)]+)\) \| (.*?) \| (.*?) \| `(SRC-[^`]+)` \| (discovered|downloaded|summarized|reviewed|verified|blocked) \|$/);
    if (match) links.push({ link_id: match[1], title: match[2], url: match[3], parent_topic: match[4], related_domain: match[5], linked_source_id: match[6], access_status: match[7] });
  }
  return links;
}

function setEqual(left: string[], right: string[]) {
  return new Set(left).size === left.length && new Set(right).size === right.length && new Set(left).size === new Set(right).size && left.every((id) => right.includes(id));
}

function validateBoundary(registry: AnyRecord, traceability: AnyRecord, sidebar: string) {
  const findings: string[] = [];
  const sources = registry.sources as AnyRecord[];
  const baselines = traceability.baseline_items as AnyRecord[];
  const sidebarLinks = parseSidebarLinks(sidebar);
  const sourceIds = new Set(sources.map((source) => source.source_id));
  const baselineIds = new Set(baselines.map((item) => item.baseline_id));
  const sidebarIds = new Set(sidebarLinks.map((link) => link.link_id));
  const declaredSourceStatuses = new Set(registry.status_values ?? []);
  const declaredBaselineStatuses = new Set(traceability.baseline_item_schema?.allowed_statuses ?? []);
  if (new Set(sources.map((source) => source.source_id)).size !== sources.length) findings.push('duplicate source_id');
  if (new Set(sources.map((source) => source.url)).size !== sources.length) findings.push('duplicate source URL');
  if (new Set(baselines.map((item) => item.baseline_id)).size !== baselines.length) findings.push('duplicate baseline_id');
  if (new Set(sidebarLinks.map((link) => link.link_id)).size !== sidebarLinks.length) findings.push('duplicate sidebar link_id');

  for (const item of baselines) {
    if (!sourceIds.has(item.source_id)) findings.push(`orphan baseline source_id:${item.source_id}`);
    if (!baselineStatusValues.has(item.status) || !declaredBaselineStatuses.has(item.status)) findings.push(`invalid baseline status:${item.baseline_id}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.source_checked)) findings.push(`malformed date:${item.baseline_id}`);
    if ('checked_date' in item) findings.push(`forbidden checked_date:${item.baseline_id}`);
    const source = sources.find((entry) => entry.source_id === item.source_id);
    if (item.status === 'verified' && (!source || source.access_status !== 'verified' || item.source_revision === '확인 필요' || item.technology === '확인 필요' || item.source_checked !== source.checked_date || item.official_source_url !== source.url || item.official_source_title !== source.title || !item.learning_document_ids?.length || !item.question_ids?.length)) {
      findings.push(`unsafe verified:${item.baseline_id}`);
    }
  }
  for (const source of sources) {
    if (!sourceStatusValues.has(source.access_status) || !declaredSourceStatuses.has(source.access_status)) findings.push(`invalid source access_status:${source.source_id}`);
    if (!Array.isArray(source.linked_sidebar_ids) || !Array.isArray(source.linked_baseline_ids)) findings.push(`missing reverse arrays:${source.source_id}`);
    const forwardSidebar = sidebarLinks.filter((link) => link.linked_source_id === source.source_id).map((link) => link.link_id);
    if (!setEqual(forwardSidebar, source.linked_sidebar_ids ?? [])) findings.push(`sidebar set mismatch:${source.source_id}`);
    const forwardBaseline = baselines.filter((item) => item.source_id === source.source_id).map((item) => item.baseline_id);
    if (!setEqual(forwardBaseline, source.linked_baseline_ids ?? [])) findings.push(`baseline set mismatch:${source.source_id}`);
    if ((source.access_status === 'blocked' || source.access_status === '확인 필요') && !/(사유|확인|후속|영향|revision)/i.test(source.notes ?? '')) findings.push(`blocked notes:${source.source_id}`);
  }
  for (const link of sidebarLinks) {
    if (!sourceIds.has(link.linked_source_id)) findings.push(`orphan sidebar source:${link.link_id}`);
    if ('source_id' in link) findings.push(`sidebar source_id alias:${link.link_id}`);
  }
  for (const id of sidebarIds) {
    if (!sources.some((source) => source.linked_sidebar_ids.includes(id))) findings.push(`sidebar reverse orphan:${id}`);
  }
  for (const id of baselineIds) {
    if (!sources.some((source) => (source.linked_baseline_ids ?? []).includes(id))) findings.push(`baseline reverse orphan:${id}`);
  }
  const allText = JSON.stringify({ registry, traceability, sidebar });
  if (/(AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|password\s*[:=]|api[_-]?key\s*[:=]|token\s*[:=]|arn:aws:iam::\d{12}|email\s*[:=]\s*[^\s,]+@[^\s,]+|credit[_ -]?card\s*[:=]|health[_ -]?record\s*[:=])/i.test(allText)) findings.push('sensitive pattern');
  if (/(?:[A-Za-z]:\\|\\\\|^\/Users\/|^\/home\/|%TEMP%|\\Temp\\)/m.test(allText)) findings.push('absolute or user path');
  return findings;
}

describe('LocalValidationBoundary — fail-closed 정적 검사', () => {
  test('세 canonical 파일을 UTF-8로 읽고 YAML/Markdown을 파싱한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    expect(sidebar).toContain('# AIF-C01 공식 안내서');
    expect(registry.sources.length).toBeGreaterThan(0);
    expect(traceability.baseline_items.length).toBe(14);
  });

  test('정상 패키지는 필수 키·enum·링크 검사를 통과한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    expect(validateBoundary(registry, traceability, sidebar)).toEqual([]);
  });

  test('필수 reverse 배열 누락은 fail-closed로 판정한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const broken = clone(registry);
    delete broken.sources[0].linked_baseline_ids;
    expect(validateBoundary(broken, traceability, sidebar)).toContain('missing reverse arrays:SRC-aif-c01-main');
  });

  test('source access_status와 baseline status의 invalid enum을 실제 finding으로 판정한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const broken = clone(registry);
    const brokenTraceability = clone(traceability);
    broken.sources[0].access_status = 'pending';
    brokenTraceability.baseline_items[0].status = 'pending';
    brokenTraceability.baseline_items[0].source_checked = '2026-09-04T00:00:00Z';
    const findings = validateBoundary(broken, brokenTraceability, sidebar);
    expect(findings).toContain('invalid source access_status:SRC-aif-c01-main');
    expect(findings).toContain('invalid baseline status:AIF-C01-D1-T1');
    expect(findings).toContain('malformed date:AIF-C01-D1-T1');
  });

  test('중복 stable ID와 URL을 각각 판정한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const broken = clone(registry);
    broken.sources[1].source_id = broken.sources[0].source_id;
    broken.sources[1].url = broken.sources[0].url;
    const findings = validateBoundary(broken, traceability, sidebar);
    expect(findings).toContain('duplicate source_id');
    expect(findings).toContain('duplicate source URL');
  });

  test('존재하지 않는 source_id와 linked_source_id를 거부한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const brokenTraceability = clone(traceability);
    brokenTraceability.baseline_items[0].source_id = 'SRC-missing';
    const brokenSidebar = sidebar.replace('| FOUNDATION | `SRC-aif-c01-intro`', '| FOUNDATION | `SRC-missing`');
    expect(validateBoundary(registry, brokenTraceability, brokenSidebar)).toEqual(expect.arrayContaining([
      'orphan baseline source_id:SRC-missing',
      'orphan sidebar source:SIDE-aif-c01-intro',
    ]));
  });

  test('sidebar 정방향·reverse 집합 불일치를 거부한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const broken = clone(registry);
    broken.sources.find((source: AnyRecord) => source.source_id === 'SRC-aif-c01-intro').linked_sidebar_ids.pop();
    expect(validateBoundary(broken, traceability, sidebar)).toContain('sidebar set mismatch:SRC-aif-c01-intro');
  });

  test('baseline 정방향·reverse 집합 불일치를 거부한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const broken = clone(registry);
    broken.sources.find((source: AnyRecord) => source.source_id === 'SRC-aif-c01-domain1').linked_baseline_ids.pop();
    expect(validateBoundary(broken, traceability, sidebar)).toContain('baseline set mismatch:SRC-aif-c01-domain1');
  });

  test('reverse 배열의 중복 ID를 거부한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const broken = clone(registry);
    broken.sources[0].linked_sidebar_ids.push(broken.sources[0].linked_sidebar_ids[0]);
    expect(validateBoundary(broken, traceability, sidebar)).toContain('sidebar set mismatch:SRC-aif-c01-main');
  });

  test('URL-only 연결과 source_id alias를 stable-ID 연결로 인정하지 않는다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const aliasSidebar = sidebar.replace('`SIDE-aif-c01-intro`', '`SIDE-aif-c01-intro` | alias').replace('| `SIDE-aif-c01-intro` | alias |', '| `SIDE-aif-c01-intro` | alias |');
    const parsed = parseSidebarLinks(aliasSidebar).map((link) => link.link_id === 'SIDE-aif-c01-intro' ? { ...link, source_id: link.linked_source_id, linked_source_id: undefined } : link);
    expect(parsed.some((link) => 'source_id' in link && !link.linked_source_id)).toBe(true);
    expect(validateBoundary(registry, traceability, sidebar)).not.toContain('URL-only connection accepted');
  });

  test('blocked·확인 필요 상태는 허용되고 source 또는 provenance 없는 verified는 거부한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const blocked = clone(registry);
    const blockedTraceability = clone(traceability);
    const item = blockedTraceability.baseline_items[0];
    const source = blocked.sources.find((entry: AnyRecord) => entry.source_id === item.source_id);
    expect(validateBoundary(blocked, blockedTraceability, sidebar)).toEqual([]);
    item.status = '확인 필요';
    expect(validateBoundary(blocked, blockedTraceability, sidebar)).toEqual([]);
    item.status = 'verified';
    expect(validateBoundary(blocked, blockedTraceability, sidebar)).toContain('unsafe verified:AIF-C01-D1-T1');
    source.access_status = 'verified';
    expect(validateBoundary(blocked, blockedTraceability, sidebar)).toContain('unsafe verified:AIF-C01-D1-T1');
  });

  test('완전한 verified fixture는 source status·provenance·document/question ID를 갖추면 통과한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const verified = clone(registry);
    const verifiedTraceability = clone(traceability);
    const item = verifiedTraceability.baseline_items[0];
    const source = verified.sources.find((entry: AnyRecord) => entry.source_id === item.source_id);
    source.access_status = 'verified';
    item.status = 'verified';
    item.source_revision = 'AIF-C01-revision-fixture';
    item.technology = 'AWS service fixture';
    item.learning_document_ids = ['DOC-D1-T1'];
    item.question_ids = ['Q-D1-T1'];
    expect(validateBoundary(verified, verifiedTraceability, sidebar)).toEqual([]);
  });

  test('blocked 출처 notes에 사유·영향·후속 확인 정보가 있어야 한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const broken = clone(registry);
    broken.sources.find((source: AnyRecord) => source.source_id === 'SRC-aif-c01-domain1').notes = 'blocked';
    expect(validateBoundary(broken, traceability, sidebar)).toContain('blocked notes:SRC-aif-c01-domain1');
  });

  test('절대 경로와 사용자 홈 경로를 거부한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const broken = clone(traceability);
    broken.open_items[0].description = 'C:\\Users\\example\\secret.txt';
    expect(validateBoundary(registry, broken, sidebar)).toContain('absolute or user path');
  });

  test('실제 패키지는 PII·결제·건강정보 placeholder 없이 false-positive 없이 통과한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    expect(validateBoundary(registry, traceability, sidebar)).not.toContain('sensitive pattern');
    expect(JSON.stringify({ registry, traceability, sidebar })).not.toContain('placeholder@example.invalid');
  });

  test('PII·결제·건강정보 placeholder fixture는 검사에서 실패한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const broken = clone(registry);
    broken.sources[0].notes = 'email=placeholder@example.invalid; credit_card=PLACEHOLDER; health_record=PLACEHOLDER';
    expect(validateBoundary(broken, traceability, sidebar)).toContain('sensitive pattern');
  });

  test('credential·token·account identifier 패턴을 거부한다', async () => {
    const { sidebar, registry, traceability } = await readCatalog();
    const broken = clone(registry);
    broken.sources[0].notes = 'api_key=PLACEHOLDER_NOT_A_SECRET';
    expect(validateBoundary(broken, traceability, sidebar)).toContain('sensitive pattern');
  });
});
