import { describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(import.meta.dir, '../..');
const sourceRegistryPath = join(root, 'sources/source-registry.yaml');
const traceabilityPath = join(root, 'sources/content-traceability.yaml');

type AnyRecord = Record<string, any>;

async function readYaml(path: string): Promise<AnyRecord> {
  const text = await readFile(path, 'utf8');
  return Bun.YAML.parse(text) as AnyRecord;
}

async function catalog() {
  return {
    registry: await readYaml(sourceRegistryPath),
    traceability: await readYaml(traceabilityPath),
  };
}

function unique(values: unknown[]) {
  return new Set(values).size === values.length;
}

function isDate(value: unknown) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function sourceById(registry: AnyRecord) {
  return new Map(registry.sources.map((source: AnyRecord) => [source.source_id, source]));
}

describe('ReferenceCatalog — BaselineItem, SourceRecord, SidebarLink 계약', () => {
  test('기준선 ID가 공식 도메인·행 순번 형식이고 고유하다', async () => {
    const { traceability } = await catalog();
    const ids = traceability.baseline_items.map((item: AnyRecord) => item.baseline_id);
    expect(ids.length).toBe(14);
    expect(ids.every((id: string) => /^AIF-C01-D[1-5]-T\d+$/.test(id))).toBe(true);
    expect(unique(ids)).toBe(true);
  });

  test('SourceRecord ID가 SRC stable ID 형식이고 URL이 고유하다', async () => {
    const { registry } = await catalog();
    expect(registry.sources.every((source: AnyRecord) => /^SRC-[a-z0-9-]+$/.test(source.source_id))).toBe(true);
    expect(unique(registry.sources.map((source: AnyRecord) => source.source_id))).toBe(true);
    expect(unique(registry.sources.map((source: AnyRecord) => source.url))).toBe(true);
  });

  test('SidebarLink ID가 SIDE stable ID 형식이며 linked_source_id가 하나의 SourceRecord를 가리킨다', async () => {
    const { registry } = await catalog();
    const sourceIds = new Set(registry.sources.map((source: AnyRecord) => source.source_id));
    const sidebarIds = registry.sources.flatMap((source: AnyRecord) => source.linked_sidebar_ids);
    expect(sidebarIds.every((id: string) => /^SIDE-[a-z0-9-]+$/.test(id))).toBe(true);
    expect(unique(sidebarIds)).toBe(true);
    expect(registry.sources.every((source: AnyRecord) => Array.isArray(source.linked_sidebar_ids))).toBe(true);
    expect([...sourceIds].length).toBe(registry.sources.length);
  });

  test('도메인과 domain_mappings가 허용된 범위만 사용한다', async () => {
    const { registry, traceability } = await catalog();
    const domains = new Set(['D1', 'D2', 'D3', 'D4', 'D5', 'FOUNDATION', 'EXAM']);
    expect(traceability.baseline_items.every((item: AnyRecord) => domains.has(item.domain))).toBe(true);
    expect(registry.sources.every((source: AnyRecord) => source.domain_mappings.every((domain: string) => domains.has(domain)))).toBe(true);
    expect(new Set(traceability.baseline_items.map((item: AnyRecord) => item.domain))).toEqual(new Set(['D1', 'D2', 'D3', 'D4', 'D5']));
  });

  test('BaselineItem의 revision·공식 출처·상태 필드가 모두 존재한다', async () => {
    const { traceability } = await catalog();
    const required = ['baseline_id', 'source_id', 'source_revision', 'revision_title', 'domain', 'task', 'technology', 'official_source_url', 'official_source_title', 'source_checked', 'status', 'learning_document_ids', 'question_ids', 'card_ids', 'quiz_ids', 'anki_ids', 'notes'];
    for (const item of traceability.baseline_items) {
      expect(required.every((key) => Object.prototype.hasOwnProperty.call(item, key))).toBe(true);
      expect(item.status).toBe('blocked');
      expect(item.source_revision).toBe('확인 필요');
    }
  });

  test('SourceRecord의 canonical 메타데이터와 모든 reverse 배열이 존재한다', async () => {
    const { registry } = await catalog();
    const required = ['source_id', 'url', 'title', 'source_type', 'parent_topic', 'domain_mappings', 'checked_date', 'access_status', 'linked_baseline_ids', 'linked_sidebar_ids', 'linked_document_ids', 'linked_question_ids', 'linked_card_ids', 'linked_quiz_ids', 'linked_anki_ids', 'notes'];
    for (const source of registry.sources) {
      expect(required.every((key) => Object.prototype.hasOwnProperty.call(source, key))).toBe(true);
      expect(source.linked_baseline_ids).toBeInstanceOf(Array);
      expect(source.linked_sidebar_ids).toBeInstanceOf(Array);
    }
  });

  test('BaselineItem.source_checked와 연결된 SourceRecord.checked_date가 날짜 형식과 문자값으로 일치한다', async () => {
    const { registry, traceability } = await catalog();
    const sources = sourceById(registry);
    for (const item of traceability.baseline_items) {
      const source = sources.get(item.source_id);
      expect(source).toBeDefined();
      expect(isDate(item.source_checked)).toBe(true);
      expect(isDate(source.checked_date)).toBe(true);
      expect(item.source_checked).toBe(source.checked_date);
    }
  });

  test('BaselineItem.checked_date alias가 canonical 계약에 존재하지 않는다', async () => {
    const { traceability } = await catalog();
    expect(traceability.baseline_items.some((item: AnyRecord) => 'checked_date' in item)).toBe(false);
    expect(traceability.baseline_item_schema.canonical_date_field).toBe('source_checked');
    expect(traceability.baseline_item_schema.forbidden_aliases).toContain('checked_date');
  });

  test('blocked·확인 필요 상태는 파생 자료 verified 승격을 막는다', async () => {
    const { registry, traceability } = await catalog();
    const sources = sourceById(registry);
    const blockedStatuses = new Set(['discovered', 'downloaded', 'summarized', 'reviewed', 'blocked', '확인 필요']);
    for (const item of traceability.baseline_items) {
      const source = sources.get(item.source_id);
      expect(blockedStatuses.has(item.status)).toBe(true);
      expect(blockedStatuses.has(source.access_status)).toBe(true);
      expect(item.learning_document_ids).toHaveLength(0);
      expect(item.question_ids).toHaveLength(0);
    }
  });

  test('verified 승격 조건은 provenance·날짜·양방향 연결·내용 검토 증거를 요구한다', async () => {
    const { traceability } = await catalog();
    expect(traceability.baseline_items.every((item: AnyRecord) => item.status !== 'verified')).toBe(true);
    expect(traceability).not.toHaveProperty('verified_promotion_without_evidence');
    expect(traceability.open_items.some((item: AnyRecord) => item.id === 'OQ1')).toBe(true);
  });

  test('파생 자료 ID 배열은 required list<string> 구조이며 현재는 보류 상태에 맞게 비어 있다', async () => {
    const { traceability } = await catalog();
    const fields = ['learning_document_ids', 'question_ids', 'card_ids', 'quiz_ids', 'anki_ids'];
    for (const item of traceability.baseline_items) {
      for (const field of fields) {
        expect(Array.isArray(item[field])).toBe(true);
        expect(item[field].every((id: unknown) => typeof id === 'string')).toBe(true);
      }
    }
  });

  test('기준선 상태와 source registry 상태가 모두 허용 enum으로 선언되어 있다', async () => {
    const { registry, traceability } = await catalog();
    const statuses = new Set(registry.status_values);
    expect(statuses).toEqual(new Set(['discovered', 'downloaded', 'summarized', 'reviewed', 'verified', 'blocked']));
    expect(traceability.baseline_item_schema.allowed_statuses).toContain('확인 필요');
    expect(registry.sources.every((source: AnyRecord) => statuses.has(source.access_status))).toBe(true);
  });

  test('기준선의 source_id가 실제 SourceRecord이고 공식 URL이 연결된 record와 같다', async () => {
    const { registry, traceability } = await catalog();
    const sources = sourceById(registry);
    for (const item of traceability.baseline_items) {
      const source = sources.get(item.source_id);
      expect(source).toBeDefined();
      expect(item.official_source_url).toBe(source.url);
    }
  });
});
