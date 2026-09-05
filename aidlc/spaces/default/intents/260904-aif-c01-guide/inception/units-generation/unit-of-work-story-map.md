# Unit–User Story 매핑

> 상태: `draft`  
> 통합 요약 확인: `Looks correct`  
> 매핑 원칙: 각 User Story에 주 소유 Unit 하나를 지정하고, 여러 Unit에 걸친 경우 영향 Unit을 별도로 표시한다.

## Unit directory map

| Unit ID | Directory | Unit |
|---|---|---|
| `U1` | `u1-baseline-and-source-registry` | 기준선·출처 등록 |
| `U2` | `u2-d1-ai-ml-foundations` | D1 AI 및 ML의 기초 |
| `U3` | `u3-d2-generative-ai` | D2 GenAI의 기초 |
| `U4` | `u4-d3-foundation-models` | D3 파운데이션 모델의 적용 |
| `U5` | `u5-d4-responsible-ai` | D4 책임 있는 AI에 대한 가이드라인 |
| `U6` | `u6-d5-security-compliance-governance` | D5 보안·규정 준수·거버넌스 |
| `U7` | `u7-assessment-and-review` | 평가·복습 자료 |
| `U8` | `u8-quality-evidence` | 품질 증거 |

## Machine-readable story-to-unit mappings

| story_id | unit_id | directory |
|---|---|---|
| US1.1 | U1 | u1-baseline-and-source-registry |
| US1.2 | U2 | u2-d1-ai-ml-foundations |
| US2.1 | U2 | u2-d1-ai-ml-foundations |
| US3.1 | U7 | u7-assessment-and-review |
| US4.1 | U7 | u7-assessment-and-review |
| US4.2 | U7 | u7-assessment-and-review |
| US5.1 | U8 | u8-quality-evidence |

> 위 표는 `aidlc-sensor-traceability.ts`가 읽는 기계적 계약이다. `traceability.json`의 각 `OK.target`은 이 표의 `unit_id`와 일치해야 하며, `directory`는 같은 행의 Unit 디렉터리와 일치해야 한다.

## Story map

| User Story | Primary Unit | Primary Directory | Supporting Units | Mapping rationale |
|---|---|---|---|---|
| `US1.1` | `U1` | `u1-baseline-and-source-registry` | `U2`, `U3`, `U4`, `U5`, `U6` | 공식 5개 도메인·기준선·학습 지도의 기준을 등록하고 각 README가 이를 표시 |
| `US1.2` | `U2` | `u2-d1-ai-ml-foundations` | `U3`, `U4`, `U5`, `U6`, `U7` | 4주 경로의 시작점을 D1에 두고 전체 도메인·복습·평가 링크를 연결 |
| `US2.1` | `U2` | `u2-d1-ai-ml-foundations` | `U3`, `U4`, `U5`, `U6`, `U1` | D1에서 확립한 초보자 문서 구조를 D2~D5에 적용하고 기준선으로 추적 |
| `US3.1` | `U7` | `u7-assessment-and-review` | `U2`, `U3`, `U4`, `U5`, `U6`, `U1` | 시나리오 문항과 서비스 선택 단서는 문항·복습 자료에서 제공하고 도메인 문서를 참조 |
| `US4.1` | `U7` | `u7-assessment-and-review` | `U2`, `U3`, `U4`, `U5`, `U6`, `U1` | 카드·용어 퀴즈·Anki를 문서와 기준선에 연결 |
| `US4.2` | `U7` | `u7-assessment-and-review` | `U2`, `U3`, `U4`, `U5`, `U6`, `U1`, `U8` | 문제은행·워크시트는 전체 도메인과 품질 검토를 횡단 |
| `US5.1` | `U8` | `u8-quality-evidence` | `U1`, `U2`, `U3`, `U4`, `U5`, `U6`, `U7` | 출처·범위·최신성·접근성·민감정보 검사를 모든 산출물에 적용 |

## Unit 내부 작업 순서

아래 순서는 전체 Unit의 경제적 구현 순서가 아니라 각 Unit 안에서 산출물을 구성하는 논리적 흐름이다.

| Unit | 내부 작업 흐름 |
|---|---|
| `U1` | 공식 기준선 메타데이터 → 안정 ID → 사이드바/source registry → canonical 추적 계약 |
| `U2`~`U6` | README·도메인 목표 → 개념 문서 → 용어 inventory → 문서 간 링크·범위 표지 |
| `U7` | 문항·복습 스키마 → 기준선/원본 연결 → 문제·카드·퀴즈·Anki → 점수 워크시트 |
| `U8` | 검사 대상 목록 → 검사 실행·판정 → 근거·조치 → 재검사·도메인 링크 |

## Cross-cutting Stories

- `US1.1`: 주 소유는 `U1`이며 `U2`~`U6`이 도메인 README와 학습 경로를 제공한다.
- `US1.2`: 주 소유는 `U2`로 두되 `U3`~`U6`과 `U7`의 주차별 링크를 포함한다.
- `US2.1`: 주 소유는 `U2`로 두고 D2~D5 Unit이 동일한 문서 구조를 적용한다.
- `US3.1`, `US4.1`, `US4.2`: 주 소유는 `U7`이며 도메인 Unit과 `U1`의 기준선·문서를 참조한다.
- `US5.1`: 주 소유는 `U8`이며 `U1`~`U7` 전체가 검사 대상이다.

## Coverage Verification

- 모든 승인된 User Story `US1.1`, `US1.2`, `US2.1`, `US3.1`, `US4.1`, `US4.2`, `US5.1`이 정확히 하나의 Primary Unit을 가진다.
- 모든 Unit `U1`~`U8`이 하나 이상의 User Story에 직접 또는 Supporting Unit으로 연결된다.
- `traceability.json`은 이 표의 Primary Unit을 기계적으로 재현한다.
- `U8`의 품질 기록은 콘텐츠를 소유하지 않고 검사 증거만 소유한다.
