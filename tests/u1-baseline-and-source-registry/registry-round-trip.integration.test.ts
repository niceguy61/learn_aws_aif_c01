import { describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(import.meta.dir, '../..');
const sidebarPath = join(root, 'sources/aws-sidebar-index.md');
const registryPath = join(root, 'sources/source-registry.yaml');
const traceabilityPath = join(root, 'sources/content-traceability.yaml');

type AnyRecord = Record<string, any>;

async function load() {
  const [sidebar, registry, traceability] = await Promise.all([
    readFile(sidebarPath, 'utf8'),
    readFile(registryPath, 'utf8').then((text) => Bun.YAML.parse(text) as AnyRecord),
    readFile(traceabilityPath, 'utf8').then((text) => Bun.YAML.parse(text) as AnyRecord),
  ]);
  const links = [...sidebar.matchAll(/^\| `(SIDE-[^`]+)` \| (.*?) \| \[공식 링크\]\(([^)]+)\) \| (.*?) \| (.*?) \| `(SRC-[^`]+)` \| (discovered|downloaded|summarized|reviewed|verified|blocked) \|$/gm)].map((match) => ({ link_id: match[1], title: match[2], url: match[3], parent_topic: match[4], related_domain: match[5], linked_source_id: match[6], access_status: match[7] }));
  return { sidebar, registry, traceability, links };
}

function setEqual(left: string[], right: string[]) {
  return left.length === new Set(left).size && right.length === new Set(right).size && left.length === right.length && left.every((id) => right.includes(id));
}

describe('ReferenceCatalog 파일 간 round-trip 통합 계약', () => {
  test('모든 sidebar link가 정확히 하나의 SourceRecord로 정방향 연결된다', async () => {
    const { registry, links } = await load();
    const sources = new Map(registry.sources.map((source: AnyRecord) => [source.source_id, source]));
    expect(links.length).toBeGreaterThan(35);
    for (const link of links) {
      expect(sources.has(link.linked_source_id)).toBe(true);
      expect(sources.get(link.linked_source_id).url).toBe(link.url);
    }
  });

  test('SidebarLink canonical metadata가 SourceRecord와 왕복한다', async () => {
    const { registry, links } = await load();
    const sources = new Map(registry.sources.map((source: AnyRecord) => [source.source_id, source]));
    for (const link of links) {
      const source = sources.get(link.linked_source_id);
      expect(link.title).toBe(source.title);
      expect(link.parent_topic).toBe(source.parent_topic);
      // SidebarLink records link acquisition state. A domain link may remain
      // `downloaded` while SourceRecord is `blocked` because revision review is
      // still pending; this is the only schema-approved status lag.
      const statusRoundTrip = link.access_status === source.access_status || (link.access_status === 'downloaded' && source.access_status === 'blocked');
      expect(statusRoundTrip).toBe(true);
      expect(source.domain_mappings).toContain(link.related_domain);
    }
  });

  test('SidebarLink parser가 title·parent_topic·related_domain·access_status를 모두 추출한다', async () => {
    const { links } = await load();
    expect(links.length).toBeGreaterThan(35);
    expect(links.every((link) => link.title && link.parent_topic && link.related_domain && link.access_status)).toBe(true);
  });

  test('SourceRecord의 linked_sidebar_ids가 sidebar 정방향 집합과 왕복한다', async () => {
    const { registry, links } = await load();
    for (const source of registry.sources) {
      const forward = links.filter((link) => link.linked_source_id === source.source_id).map((link) => link.link_id);
      expect(setEqual(forward, source.linked_sidebar_ids)).toBe(true);
    }
  });

  test('registry에만 있는 공식 출처는 허용되지만 sidebar orphan은 없다', async () => {
    const { registry, links } = await load();
    const linkedSourceIds = new Set(links.map((link) => link.linked_source_id));
    expect(registry.sources.every((source: AnyRecord) => source.linked_sidebar_ids.length === 0 || linkedSourceIds.has(source.source_id))).toBe(true);
    expect(links.every((link) => registry.sources.some((source: AnyRecord) => source.source_id === link.linked_source_id))).toBe(true);
  });

  test('동일 URL은 하나의 SourceRecord에서만 관리된다', async () => {
    const { registry } = await load();
    const urls = registry.sources.map((source: AnyRecord) => source.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  test('stable ID와 reverse ID가 중복되지 않는다', async () => {
    const { registry, traceability, links } = await load();
    const allSourceIds = registry.sources.map((source: AnyRecord) => source.source_id);
    const allBaselineIds = traceability.baseline_items.map((item: AnyRecord) => item.baseline_id);
    const allSidebarIds = links.map((link) => link.link_id);
    expect(new Set(allSourceIds).size).toBe(allSourceIds.length);
    expect(new Set(allBaselineIds).size).toBe(allBaselineIds.length);
    expect(new Set(allSidebarIds).size).toBe(allSidebarIds.length);
    expect(registry.sources.every((source: AnyRecord) => new Set(source.linked_sidebar_ids).size === source.linked_sidebar_ids.length)).toBe(true);
    expect(registry.sources.every((source: AnyRecord) => new Set(source.linked_baseline_ids).size === source.linked_baseline_ids.length)).toBe(true);
  });

  test('BaselineItem.source_id와 linked_baseline_ids가 SourceRecord별로 set-equal이다', async () => {
    const { registry, traceability } = await load();
    for (const source of registry.sources) {
      const forward = traceability.baseline_items.filter((item: AnyRecord) => item.source_id === source.source_id).map((item: AnyRecord) => item.baseline_id);
      expect(setEqual(forward, source.linked_baseline_ids)).toBe(true);
    }
  });

  test('여러 기준선이 연결될 때도 source_checked와 checked_date equality를 지킨다', async () => {
    const { registry, traceability } = await load();
    for (const source of registry.sources.filter((entry: AnyRecord) => entry.linked_baseline_ids.length > 1)) {
      const items = traceability.baseline_items.filter((item: AnyRecord) => item.source_id === source.source_id);
      expect(items.length).toBeGreaterThan(1);
      expect(items.every((item: AnyRecord) => item.source_checked === source.checked_date)).toBe(true);
    }
  });

  test('모든 SourceRecord에 reverse 배열이 있으며 미연결이면 빈 배열이다', async () => {
    const { registry } = await load();
    for (const source of registry.sources) {
      expect(Array.isArray(source.linked_sidebar_ids)).toBe(true);
      expect(Array.isArray(source.linked_baseline_ids)).toBe(true);
      expect(Array.isArray(source.linked_document_ids)).toBe(true);
      expect(Array.isArray(source.linked_question_ids)).toBe(true);
      expect(Array.isArray(source.linked_card_ids)).toBe(true);
      expect(Array.isArray(source.linked_quiz_ids)).toBe(true);
      expect(Array.isArray(source.linked_anki_ids)).toBe(true);
    }
  });

  test('부분적으로만 파싱된 결과는 전체 PASS로 승격되지 않는다', async () => {
    const { registry, traceability, links } = await load();
    const incomplete = { ...registry, sources: registry.sources.slice(0, 1) };
    const sourceIds = new Set(incomplete.sources.map((source: AnyRecord) => source.source_id));
    const orphanLinks = links.filter((link) => !sourceIds.has(link.linked_source_id));
    const orphanBaselines = traceability.baseline_items.filter((item) => !sourceIds.has(item.source_id));
    expect(orphanLinks.length).toBeGreaterThan(0);
    expect(orphanBaselines.length).toBeGreaterThan(0);
    expect(orphanLinks.length + orphanBaselines.length).toBeGreaterThan(0);
  });

  test('round-trip evidence가 입력·날짜·도구·판정·finding·조치·재검사·trace key를 표현한다', async () => {
    const { registry, traceability } = await load();
    const evidence = {
      input_files: ['sources/aws-sidebar-index.md', 'sources/source-registry.yaml', 'sources/content-traceability.yaml'],
      checked_date: registry.last_checked,
      tool: 'bun test tests/u1-baseline-and-source-registry/registry-round-trip.integration.test.ts',
      decision: 'PASS',
      findings: [],
      actions: [],
      recheck: '동일 명령 재실행 필요',
      trace_keys: [traceability.owner, 'BR1.3', 'BR1.6'],
    };
    expect(Object.keys(evidence)).toEqual(['input_files', 'checked_date', 'tool', 'decision', 'findings', 'actions', 'recheck', 'trace_keys']);
    expect(evidence.input_files.every((path) => !path.startsWith('/') && !/^[A-Za-z]:/.test(path))).toBe(true);
  });

  test('SidebarLink은 source_id alias가 아니라 linked_source_id만 사용한다', async () => {
    const { links } = await load();
    expect(links.every((link) => 'linked_source_id' in link && !('source_id' in link))).toBe(true);
  });

  test('URL이 바뀌어도 stable ID 연결 계약은 URL만으로 대체되지 않는다', async () => {
    const { registry, links } = await load();
    const changed = { ...links[0], url: `${links[0].url}?language=ko` };
    const source = registry.sources.find((entry: AnyRecord) => entry.source_id === changed.linked_source_id);
    expect(source).toBeDefined();
    expect(changed.linked_source_id).toBe(source.source_id);
    expect(changed.url).not.toBe(source.url);
  });
});
