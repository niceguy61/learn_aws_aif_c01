# Code Generation 단위 테스트 지침 — U2 D1

## 실행 계약

단일 실행은 stage-level 경로를 사용하지만 실제 대상은 `u2-d1-ai-ml-foundations`다. 상세 지침은 [U2 단위 테스트 지침](../u2-d1-ai-ml-foundations/code-generation/unit-test-instructions.md)에 보존한다.

- methodology: `test-after`
- strategy: `comprehensive`
- runner: Bun built-in test runner
- 외부 dependency·네트워크·AWS 계정·브라우저·학습자 데이터 저장: 사용하지 않음

## 정확한 명령

```text
bun test tests/u2-d1-ai-ml-foundations/document-structure.test.ts
bun test tests/u2-d1-ai-ml-foundations/traceability.integration.test.ts
bun test tests/u2-d1-ai-ml-foundations/reader-journey.e2e.test.ts
bun test tests/u2-d1-ai-ml-foundations/document-structure.test.ts tests/u2-d1-ai-ml-foundations/traceability.integration.test.ts tests/u2-d1-ai-ml-foundations/reader-journey.e2e.test.ts
```

문서 구조, 추적성, 정적 독자 여정을 합쳐 10~15개 이상의 의미 있는 검사를 제공하고 happy path·누락 front matter·잘못된 상태·고아 링크·blocked 출처 승격·민감정보 edge cases를 포함한다. U1 회귀는 다음 명령으로 별도 확인한다.

```text
bun test tests/u1-baseline-and-source-registry
```

## 해당 없음과 결과 기준

데이터베이스, repository, business logic, API, frontend runtime은 정적 문서 Unit에 해당하지 않는다. 대신 문서 상태·UTF-8·YAML front matter·필수 섹션·상대 링크·stable ID·source registry·시험 범위/실무 확장 표지·Anki TSV·민감정보를 검사한다. 출처가 `blocked`이면 관련 자료는 `verified`가 될 수 없다. 실패는 조용히 무시하지 않고 문서 수정 후 같은 U2 명령으로 재검사한다.
