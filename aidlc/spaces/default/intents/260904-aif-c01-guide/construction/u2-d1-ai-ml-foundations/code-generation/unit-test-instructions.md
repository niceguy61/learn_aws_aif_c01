# U2 D1 문서 품질 검사 지침

## 적용 범위

- **Unit**: `u2-d1-ai-ml-foundations`
- **컴포넌트**: `LearningContent`
- **Unit 종류**: `packaging`
- **Testing Contract**: `test-after`, `comprehensive`
- **Ordering**: 문서를 작성한 다음 해당 문서와 변경 범위에 맞는 문서 품질 검증을 실행하고, 실패 항목을 수정한 뒤 결과를 기록한다.
- **범위 의무**: `LearningContent`에 대해 unit, integration, E2E 성격 테스트를 각각 10~15개 이상의 의미 있는 사례로 작성한다. NFR이 요구하는 경우에만 성능·보안 테스트를 추가한다.
- **새 dependency**: 추가하지 않는다. 기존 Bun built-in test runner와 저장소의 기존 정적 검사 경로를 사용한다.
- **외부 서비스**: AWS API, 네트워크, 브라우저 원격 실행, 사용자 데이터 저장을 사용하지 않는다.

## Test runner와 정확한 실행 명령

첫 번째 테스트를 작성·실행하기 전에 최소 runner/configuration을 준비하고, 다음 Unit-scoped 명령이 실행 가능함을 확인한다. 계획 승인 전에는 실제 runner/configuration과 test file을 생성하지 않는다.

```text
bun test tests/u2-d1-ai-ml-foundations/document-structure.test.ts
```

승인 후 생성할 U2 테스트 파일과 명령은 다음과 같다. 모든 명령은 U2 파일을 정확히 지정하며 프로젝트 전체를 실행하지 않는다.

```text
bun test tests/u2-d1-ai-ml-foundations/document-structure.test.ts
bun test tests/u2-d1-ai-ml-foundations/traceability.integration.test.ts
bun test tests/u2-d1-ai-ml-foundations/reader-journey.e2e.test.ts
```

세 계층을 한 번에 실행해야 할 때도 exact Unit scope를 유지한다.

```text
bun test tests/u2-d1-ai-ml-foundations/document-structure.test.ts tests/u2-d1-ai-ml-foundations/traceability.integration.test.ts tests/u2-d1-ai-ml-foundations/reader-journey.e2e.test.ts
```

`bun test`, `npm test`, `yarn test`처럼 범위가 없는 명령은 이 파일에 사용하지 않는다. 별도 U1 회귀 명령도 이 Unit 지침에는 기록하지 않는다.

## 파일별 테스트 범위

### `tests/u2-d1-ai-ml-foundations/test-config.ts`

테스트 설정은 다음을 선언한다.

- U2가 소유하는 workspace-relative 파일 목록과 테스트 대상 경로
- `draft|review|verified` 문서 상태와 U1 출처 상태의 독립적인 허용 값
- 문서별 필수 H2와 순서
- `D1-README`, `LD-d1-<slug>`, `TERM-<slug>` 등 stable ID 형식
- U1이 확정한 `AIF-C01-D<n>-T<n>` baseline/source ID 참조 규칙
- `시험 범위`, 공식 baseline ID 선행 `실무 확장`, 학습자용 해설 표지
- 상대 링크·anchor·절대 로컬 경로·사용자 홈 경로 검사 규칙
- UTF-8, YAML front matter, JSON/CSV/TSV 구조 검사 규칙
- secret, token, API key, credential, 실제 AWS account identifier, PII 패턴의 안전한 탐지 규칙
- `blocked`/`확인 필요` source를 `verified` 문서가 사용할 수 없는 상태 전이 규칙

### `document-structure.test.ts` — unit 성격

`LearningContent`의 문서 구조를 대상으로 10~15개 이상을 작성한다.

- UTF-8 fatal decode
- YAML front matter 존재와 필수 키
- `title`, `domain`, `level`, `status`, `source_urls`, `source_checked` 검증
- 허용 document status와 source status 분리
- `blocked`/`확인 필요` source의 `verified` 승격 거부
- D1 stable document ID와 파일명·디렉터리명 규칙
- README의 공식 도메인명·가중치·목표·선수 지식·읽기 순서
- 개념 문서의 필수 H2와 논리적 제목 계층
- 한국어 설명과 최초 영어 용어 병기
- `시험 범위`와 baseline ID 선행 `실무 확장` 표지
- 다음 문서·D2·용어 자료 링크 존재
- Mermaid/image 사용 시 인접 텍스트 fallback·한국어 alt text 또는 캡션
- front matter 누락 fixture 거부
- 잘못된 status fixture 거부
- 필수 섹션 누락·범위 표지 누락 fixture 거부

### `traceability.integration.test.ts` — integration 성격

U1의 등록부와 U2 문서·용어 자료 사이의 계약을 실제 로컬 파일로 검증한다. 기준선 파일이 아직 확정되지 않은 경우 그 사실을 fixture 상태로 반영하고 추측하지 않는다.

- 문서·용어의 `baseline_ids`가 U1 canonical ID를 참조하는지 확인
- 문서 `source_urls`와 U1 `source-registry.yaml` URL의 일치 확인
- URL·공식 제목·확인일·access status·연결 문서 일치 확인
- source/baseline→document의 정방향 연결과 document→source의 역방향 연결
- stable document ID·term ID의 중복·고아 탐지
- 내부 링크·anchor의 실제 도달성과 역방향 연결
- `blocked`/`확인 필요` source 의존 자료의 `verified` 금지
- `draft|review|verified`와 source status enum 혼용 거부
- 절대 로컬 경로·사용자 홈 경로·임시 경로 거부
- JSON traceability의 parse 가능성·결정적 배열 순서·target 존재
- U7 소유 카드·문제은행·Anki/CSV 계약을 U2가 재정의하지 않는지 확인
- U2 범위의 정적 CSV/TSV가 실제 존재할 때 UTF-8 header·field count·CSV parser 호환성 확인
- 변조된 source metadata, orphan ID, 날짜 불일치 fixture 거부
- 실제 secret/token/PII/account identifier fixture가 증거에 노출되지 않는지 확인

### `reader-journey.e2e.test.ts` — 정적 독자 여정 E2E 성격

브라우저나 네트워크 없이 실제 파일 링크를 따라가며 10~15개 이상을 검증한다.

- D1 README에서 첫 개념 문서로 이동
- 네 개념 문서의 순차 다음 링크
- 각 문서의 이전 README·다음 문서·용어 자료 링크
- 마지막 D1 문서에서 D2 README로 이동
- 링크 대상 파일과 anchor 존재
- 설명적인 한국어 링크 문구
- 핵심 개념의 한국어 설명과 영어 원문 병기
- 비교·시나리오·시험 판단 단서·오해·확인 질문 존재
- Mermaid/image가 있으면 텍스트 fallback 존재
- 이미지가 있으면 의미 있는 한국어 alt text·캡션과 텍스트 대체 경로
- 문서·용어 자료의 시험 범위/실무 확장 분류
- 외부 렌더러나 네트워크 없이 핵심 내용을 읽을 수 있는지 확인
- 정적 CSV/TSV가 U2 소유 범위에 포함된 경우 header·행 파싱
- 민감정보 패턴 부재
- 문서 끝 Sources와 확인일 존재

## Mocking·fixture·보안 지침

- AWS API·네트워크·브라우저 원격 서비스·외부 파일 서비스는 호출하지 않는다.
- fixture는 실제 U2 문서, U1 source registry, U1 canonical traceability를 읽기 전용으로 사용한다.
- 변조·edge case 테스트는 `structuredClone` 또는 메모리 fixture를 사용하며 실제 source 파일을 변경하지 않는다.
- 가상 데이터는 `EXAMPLE`, `PLACEHOLDER`, `example.invalid`처럼 명백한 placeholder만 사용한다.
- 오류 출력과 품질 evidence에 실제 secret/token/API key/ARN/account identifier/PII를 복사하지 않는다.
- U2는 API·DB·세션·인증·인가·학습자 답안/진도 저장을 구현하지 않는다.

## 기대 결과와 품질 목표

- 세 U2 테스트 파일의 모든 사례가 PASS한다.
- 각 applicable test layer가 10~15개 이상 의미 있는 사례를 가진다.
- UTF-8 decode 실패 0건
- 필수 section/front matter/status 위반 0건
- 고아·중복 stable ID와 끊긴 상대 링크 0건
- U1 source metadata 불일치 0건
- `blocked`/`확인 필요` source의 `verified` 승격 0건
- secret, credential, token, PII, 실제 AWS account identifier 노출 0건
- 실패·보류 결과는 findings/action/recheck 연결 전까지 완료로 집계하지 않는다.
- 애플리케이션 production line coverage 목표는 적용되지 않지만, 이는 comprehensive의 테스트 계층·사례 수를 줄이는 근거가 아니다.
- runtime performance test와 runtime security test는 NFR상 N/A이며, 정적 보안 검사는 integration/E2E에 포함한다.

## 실패 처리

1. 실패한 U2 문서·설정·fixture의 원인을 확인한다.
2. 동일한 U2-scoped 명령을 다시 실행한다.
3. 출처가 차단·동적·미확인 상태이면 내용을 추측하지 않고 상태·사유·영향을 기록한다.
4. `verified`가 잘못 승격되었으면 `draft` 또는 `review`로 되돌린다.
5. 실패·보류 판정은 기존 기록을 덮어쓰지 않고 재검사 연결과 함께 기록한다.
6. 실행 결과·미해결 질문·출처 상태는 후속 `code-summary.md`와 U8 품질 evidence에서 추적한다.

## 추적성 요약

| 테스트 파일 | US | FR | NFR | AC | BR |
|---|---|---|---|---|---|
| `document-structure.test.ts` | `US1.1`, `US2.1`, `US5.1` | `FR2.1`, `FR2.3`, `FR2.6`, `FR5.1`, `FR5.2`, `FR6.2`, `FR6.4` | `NFR1`, `NFR2`, `NFR4`, `NFR5`, `NFR6`, `NFR8` | `AC1.1.2`, `AC1.1.4`, `AC2.1.3`, `AC2.1.5`, `AC3.1.3`, `AC5.1.1`, `AC5.1.3`, `AC5.1.5` | `BR8.2`, `BR8.3`, `BR8.7`, `BR8.8`, `BR8.9`, `BR8.10`, `BR8.11` |
| `traceability.integration.test.ts` | `US1.1`, `US2.1`, `US4.1`, `US5.1` | `FR1.1`, `FR1.3`, `FR1.4`, `FR3.2`, `FR3.3`, `FR5.1`, `FR5.2`, `FR5.3`, `FR6.1`, `FR6.2` | `NFR3`, `NFR4`, `NFR6`, `NFR7`, `NFR8` | `AC1.1.3`, `AC3.1.3`, `AC4.1.1`, `AC4.1.3`, `AC5.1.1`, `AC5.1.3`, `AC5.1.4`, `AC5.1.6` | `BR8.1`, `BR8.2`, `BR8.3`, `BR8.4`, `BR8.5`, `BR8.6`, `BR8.10`, `BR8.11` |
| `reader-journey.e2e.test.ts` | `US1.1`, `US2.1`, `US4.1`, `US5.1` | `FR2.2`, `FR2.3`, `FR3.2`, `FR3.3`, `FR6.2`, `FR6.4` | `NFR1`, `NFR2`, `NFR5`, `NFR7`, `NFR8` | `AC2.1.2`, `AC2.1.5`, `AC4.1.1`, `AC4.1.3`, `AC5.1.5`, `AC5.1.6` | `BR8.6`, `BR8.7`, `BR8.8`, `BR8.9`, `BR8.10`, `BR8.11`, `BR8.12` |

## Plan Approval 전 확인

- 실제 U2 문서·코드·테스트 파일은 아직 생성하지 않는다.
- 이 지침의 모든 실행 명령은 U2 파일을 명시한다.
- U1·U7 소유 파일은 수정하지 않는다.
- `test-after`와 `comprehensive` 의무를 유지한다.
- 계획 승인 후에만 runner/configuration과 테스트 파일을 생성한다.
