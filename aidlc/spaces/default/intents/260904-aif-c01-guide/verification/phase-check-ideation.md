# Ideation 단계 경계 검증

## 검증 범위

대상 경계는 Intent Capture → Scope Definition → Intent Backlog → Feasibility → Team Formation → Rough Mockups → Approval & Handoff다. 이 문서는 상위 산출물의 일관성과 Inception 인계 가능성을 점검하며, 공식 AWS URL의 최신성 자체를 새로 `verified`로 확정하지 않는다.

## Intent → Scope → Backlog 일관성

| 검사 | 결과 | 근거 |
|---|---|---|
| 문제·대상 | 통과 | Intent의 완전 초보자·AIF-C01 합격 목표가 Scope의 초보자 경계와 `PU-01`~`PU-05`에 반영됨 |
| 공식 범위 | 통과 | Intent의 5개 도메인 전체 요구가 Scope의 D1~D5 및 `PU-00`~`PU-05`로 이어짐 |
| 성공 기준 | 통과 | 1개월 이내 상대 일정, 100문항 이상, 전체 정답률 80%, 카드·진도표·퀴즈·Anki가 Scope와 `PU-07`~`PU-11`에 반영됨 |
| 작성 순서 | 통과 | D1→D5 순서가 Scope 가치 흐름과 Backlog 생산 순서에 동일하게 기록됨 |
| 범위 경계 | 통과 | 시험 범위와 `실무 확장`이 분리되고 코드·복잡한 수학·유료 실습·프로덕션 구축·개인정보 저장은 제외됨 |
| 추적성 | 통과 | `PU-00`, `PU-06`, `PU-07`, `PU-12`가 기준선·문서·문항·최종 점검 연결을 담당함 |

판정: Intent, Scope, Intent Backlog 사이에 현재 확인되는 모순이나 고아 범위 항목은 없다.

## Feasibility backing

| 검사 | 결과 | 근거 |
|---|---|---|
| 범위 실행 가능성 | 통과 | 정적 Markdown·CSV 프로젝트이며 실행형 애플리케이션이나 AWS 인프라가 필요하지 않음 |
| 최신성 통제 | 통과 조건부 | 도메인 작성 직전 및 최종 검토 확인 규칙이 정의됨. 실제 URL별 확인은 집필 직전 수행 필요 |
| 접근 차단 통제 | 통과 조건부 | 확인되지 않은 주장을 `확인 필요` 또는 `blocked`로 보류하는 규칙이 정의됨 |
| 문항 추적성 | 통과 조건부 | 모든 문항의 도메인·작업/기술 항목·정답·해설·공식 URL 필드가 정의됨 |
| 형식 | 통과 조건부 | UTF-8 CSV와 앞면·뒷면 필드가 확정됨 |
| 데이터·규제 경계 | 통과 | 학습자 개인정보·결제정보·건강정보를 수집·저장하지 않음 |

## 출처·추적성 통제

- 시험 범위의 기준은 AWS Certification 공식 AIF-C01 시험 안내서로 제한한다.
- AWS 공식 사이드바 링크는 `sources/aws-sidebar-index.md`에 등록하고, URL·제목·주제·도메인·연결 문서·확인일·상태는 `sources/source-registry.yaml`에서 관리한다.
- 출처 상태는 `discovered` → `downloaded` → `summarized` → `reviewed` → `verified` 순서로 관리한다.
- 접근이 차단되거나 내용이 확인되지 않은 링크는 추측으로 대체하지 않는다.
- 문서·문항·카드·퀴즈는 안정 ID와 공식 항목 ID를 통해 원 문서와 출처로 역추적한다.

현재 검증은 통제 설계와 인계 연결의 확인이다. 개별 URL의 실제 접근 상태와 `verified` 승격은 해당 도메인 작성 직전과 최종 점검에서 별도로 수행해야 한다.

## 팀·문서 탐색 인계

- 단일 작성자와 사용자 최종 승인 구조가 `team-assessment.md`, `mob-composition.md`, `skill-matrix.md`에 일관되게 기록되어 있다.
- 정적 Markdown 학습 흐름은 `docs/00-start-here/`에서 시작해 D1→D5, 용어 사전, 문제은행, 오답 회귀, Anki로 이어진다.
- 모바일 가독성, 키보드 탐색, 색상 비의존 표지와 짧은 문단 원칙이 Rough Mockups에 반영되어 있다.
- 애플리케이션 화면, 로그인, 자동 저장, 학습자 데이터 수집은 문서 탐색 개념에 포함되지 않는다.

## 미해결 항목과 후속 조치

- 결정 질문의 미해결 항목: 없음.
- 현재 장애: 없음. Feasibility의 I-01은 없음이다.
- 열린 위험: R-01~R-06, R-08~R-10. 후속 조치는 공식 기준선·추적표·도메인별 검토·문항 필드 검사·CSV QA·범위 감시다.
- 수용된 위험: R-07. 사용자의 변경 요청 전에는 자동 정기 최신성 검토를 수행하지 않는다.
- 확인 필요: 실제 공식 URL 접근·제목·확인일·상태, 각 공식 작업·기술 항목의 문서 연결, 최종 문제은행 문항 수와 전체 정답률은 후속 산출물에서 확인한다.

## 인계 판정

**Go — 조건부 인계 가능.** Ideation의 의도·범위·백로그·실행 가능성·팀 계획·문서 흐름이 일관되며, Inception은 승인된 범위를 다시 결정하지 않고 공식 기준선과 추적성 통제를 구체화해야 한다.

- [x] Intent → Scope → Intent Backlog 일관성 확인
- [x] 모든 범위 묶음에 Feasibility 근거 존재
- [x] 출처·최신성·차단·문항 추적성 통제 인계
- [x] 팀 계획과 문서 탐색 개념 인계
- [ ] 개별 공식 URL과 모든 작업·기술 항목의 실제 검증 — 후속 작업
- [ ] 100문항 이상 문제은행과 지원 자료 완성 — 후속 작업
- [ ] 최종 품질 점검과 사용자 출시 승인 — 후속 작업

## Assumptions & Open Questions

None.

## Sources

- `ideation/intent-capture/intent-statement.md`
- `ideation/scope-definition/scope-document.md`
- `ideation/scope-definition/intent-backlog.md`
- `ideation/feasibility/feasibility-assessment.md`
- `ideation/feasibility/constraint-register.md`
- `ideation/feasibility/raid-log.md`
- `ideation/team-formation/team-assessment.md`
- `ideation/team-formation/mob-composition.md`
- `ideation/team-formation/skill-matrix.md`
- `ideation/rough-mockups/wireframes.md`
- `ideation/rough-mockups/user-flow.md`
<!-- 최종 승인 확인 후 재저장 -->