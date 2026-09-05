# Intent Backlog

## 목적과 우선순위 기준

이 백로그는 승인된 AIF-C01 한국어 학습 가이드를 실행 가능한 proto-Unit 단위로 나눈다. 각 항목은 안정적인 ID를 가지며, 구현 설계가 아니라 학습 가치·범위·의존성·완료 판단을 정의한다.

- **Must Have**: 합격 중심의 핵심 범위와 승인된 성공 기준에 직접 필요한 항목
- **Should Have**: 핵심 범위를 보강하고 1개월 이내 복습 효율을 높이는 항목
- **Won't Have**: 이번 버전에서 명시적으로 제외하는 항목
- `PU`는 `proto-Unit`을 뜻하며 이후 상세 계획에서 참조할 안정적인 ID다.

## 우선순위 백로그

| ID | proto-Unit | 우선순위 | 도메인·공통 산출물 | 의존성 | 수용 기준 | 추적성 |
|---|---|---|---|---|---|---|
| PU-00 | 공식 시험 범위·출처 기준선 | Must Have | FOUNDATION, EXAM | 없음 | 5개 도메인, 채점 비율, 모든 작업·기술 항목, 공식 URL·제목·확인일·상태가 등록된다. | `intent-statement.md` Q3; `constraint-register.md` C-01, C-06, C-07, C-14; AC-SCOPE-01, AC-SCOPE-05 |
| PU-01 | D1 AI 및 ML의 기초 문서 묶음 | Must Have | D1, 20% | PU-00 | D1의 모든 공식 항목이 하나 이상의 개념 문서 또는 `해당 없음/확장` 기록에 연결되고, 초보자용 설명·비교·기본 시나리오·확인 질문과 출처가 있다. | `intent-statement.md` Q3, Q7, Q8; `constraint-register.md` C-02~C-04, C-10; AC-SCOPE-02 |
| PU-02 | D2 GenAI의 기초 문서 묶음 | Must Have | D2, 24% | PU-00, PU-01 | D2의 모든 공식 항목이 추적되고, D1 선수 지식에서 GenAI 개념으로 연결되며, 시험 범위와 실무 확장이 분리된다. | `intent-statement.md` Q3, Q7, Q10; AC-SCOPE-01, AC-SCOPE-02, AC-SCOPE-04 |
| PU-03 | D3 파운데이션 모델의 적용 문서 묶음 | Must Have | D3, 28% | PU-00, PU-01, PU-02 | D3의 모든 공식 항목이 추적되고, AWS 서비스 선택·유사 서비스 비교·기본 시나리오의 판단 단서가 포함된다. | `intent-statement.md` Q3, Q5, Q7, Q10; AC-SCOPE-01, AC-SCOPE-02, AC-SCOPE-04 |
| PU-04 | D4 책임 있는 AI 문서 묶음 | Must Have | D4, 14% | PU-00, PU-01, PU-02 | D4의 모든 공식 항목이 추적되고, 편향·공정성·투명성·설명 가능성·안전 관련 오해와 시나리오가 초보자 관점으로 설명된다. | `intent-statement.md` Q3, Q7, Q8; `constraint-register.md` C-03, C-04, C-10; AC-SCOPE-01, AC-SCOPE-02 |
| PU-05 | D5 보안·규정 준수·거버넌스 문서 묶음 | Must Have | D5, 14% | PU-00, PU-01, PU-02, PU-03, PU-04 | D5의 모든 공식 항목이 추적되고, 데이터·접근·위험·규정 준수 관점의 시험 판단 단서와 실무 확장이 구분된다. | `intent-statement.md` Q3, Q7, Q10; `constraint-register.md` C-08, C-10; AC-SCOPE-01, AC-SCOPE-02, AC-SCOPE-04 |
| PU-06 | 시험 범위·문서 추적표 | Must Have | FOUNDATION, EXAM | PU-00, PU-01~PU-05 | 5개 도메인의 각 공식 항목에 문서 ID, 문서 상태, 출처 URL, 확인일과 `해당 없음/확장` 여부가 채워진다. 고아 항목이 0개다. | `intent-statement.md` Q3; `feasibility-assessment.md`; `constraint-register.md` C-01, C-05, C-06, C-10; AC-SCOPE-01, AC-SCOPE-04, AC-SCOPE-05 |
| PU-07 | 100문항 이상 자체 문제은행 | Must Have | FOUNDATION, EXAM | PU-01~PU-06 | 문항 수가 100개 이상이고 모든 문항에 안정 ID, 도메인, 작업/기술 항목, 정답, 해설, 공식 URL이 있다. 목표 전체 정답률은 80% 이상으로 측정한다. | `intent-statement.md` Q3, Q9; `feasibility-assessment.md`; `constraint-register.md` C-04; AC-SCOPE-03, AC-SCOPE-07 |
| PU-08 | 카드 요약·용어 퀴즈 | Should Have | FOUNDATION, EXAM | PU-01~PU-05, PU-06 | 핵심 용어와 혼동하기 쉬운 비교 기준이 카드 또는 퀴즈 항목으로 연결되고, 각 항목에 원문 문서·도메인 ID가 있다. | `intent-statement.md` Q3, Q9; `constraint-register.md` C-02, C-03; AC-SCOPE-06 |
| PU-09 | 1개월 이내 진도표·복습 안내 | Should Have | FOUNDATION, EXAM | PU-01~PU-07 | 정확한 달력 시험일을 발명하지 않고 상대 기간으로 D1→D5, 문제 풀이, 오답 복습 순서를 제시하며 완료 체크가 가능하다. | `intent-statement.md` Q4, Q7, Q9; `constraint-register.md` C-02, C-13; AC-SCOPE-09 |
| PU-10 | 용어 사전과 문서 연결 | Should Have | FOUNDATION | PU-01~PU-05 | 핵심 영어 용어·한국어 설명·첫 등장 문서·연결된 다음 문서가 누적되고 중복·고아 용어를 점검한다. | `intent-statement.md` Q2, Q5, Q8; `constraint-register.md` C-03, C-09; AC-SCOPE-02, AC-SCOPE-06 |
| PU-11 | UTF-8 Anki 앞면·뒷면 CSV | Should Have | FOUNDATION, EXAM | PU-08, PU-10 | UTF-8 CSV가 생성되고 모든 행에 앞면·뒷면 값이 있으며 가져오기 시 구분자와 필드 순서가 설명된다. | `feasibility-assessment.md` Q4; `constraint-register.md` C-08; AC-SCOPE-06 |
| PU-12 | 최종 평가·품질 점검 패키지 | Must Have | FOUNDATION, EXAM | PU-06~PU-11 | 도메인 누락, 출처·링크 상태, 문항 메타데이터, 초보자 관점, 시험/실무 구분, 산출물 형식의 6개 점검 결과가 기록되고 미해결 항목은 `확인 필요`로 남는다. | `intent-statement.md` Q3, Q9; `feasibility-assessment.md` Q1~Q6; `constraint-register.md` C-05~C-10; AC-SCOPE-03~AC-SCOPE-08 |
| PU-13 | 범위 밖 심화 주제 보류 기록 | Won't Have | FOUNDATION | PU-00 | 코드 실습·모델 개발·복잡한 수학·프로덕션 구축·개인정보 저장이 시험 범위로 잘못 표시되지 않고, 필요 시 선택적 심화 또는 제외로 명시된다. | `intent-statement.md` Q8, Q10; `constraint-register.md` C-04, C-08, C-10, C-11; AC-SCOPE-04, AC-SCOPE-08 |

## 도메인 문서 생산 순서

| 순번 | 대상 proto-Unit | 선행 완료 조건 | 산출물 인계 |
|---|---|---|---|
| 1 | PU-00 | 승인된 범위와 공식 기준 목록 | 모든 문서가 참조할 시험·출처 기준 |
| 2 | PU-01 | PU-00 | D1 README와 개념 단위 문서 |
| 3 | PU-02 | PU-01 | D2 README와 개념 단위 문서 |
| 4 | PU-03 | PU-02 | D3 README와 개념 단위 문서 |
| 5 | PU-04 | PU-03 | D4 README와 개념 단위 문서 |
| 6 | PU-05 | PU-04 | D5 README와 개념 단위 문서 |
| 7 | PU-06 | PU-01~PU-05 | 전체 시험 항목·문서·출처 추적표 |
| 8 | PU-07 | PU-06과 각 도메인 출처 검토 | 100문항 이상 문제은행 |
| 9 | PU-08~PU-11 | PU-07 또는 해당 문서 확정 | 카드·퀴즈·진도표·Anki |
| 10 | PU-12 | PU-06~PU-11 | 최종 평가와 품질 점검 |

## 의존성 규칙

- PU-01~PU-05는 원칙적으로 D1→D5 순서를 지킨다. 앞 도메인 용어가 뒤 도메인의 선수 지식으로 사용되면 연결 문서에 명시한다.
- 각 도메인 작성 직전 관련 공식 출처를 확인한다. 확인되지 않은 출처로 PU-07 문항을 확정하지 않는다.
- PU-06은 문서 생산 중 계속 갱신할 수 있지만, PU-07의 완료 판정은 PU-06의 고아 항목이 0개일 때만 가능하다.
- PU-08~PU-11은 확정된 문서와 추적표에서 파생한다. 지원 자료가 원문 사실을 새로 추가하는 경우 해당 출처와 문서 ID를 함께 등록한다.
- PU-12에서 차단된 링크나 확인되지 않은 기능은 실패로 숨기지 않고 `확인 필요` 상태와 영향 범위로 기록한다.

## 공통 수용 기준

1. 각 proto-Unit은 하나 이상의 승인된 상위 결정 또는 제약에 연결된다.
2. 각 Must Have 항목은 고유한 완료 증거를 갖고, 증거가 없으면 완료로 표시하지 않는다.
3. 모든 도메인 문서와 문제는 `시험 범위` 또는 `실무 확장`으로 분류된다.
4. 문서·문항·카드의 원문 사실과 학습자용 해설을 구분한다.
5. 공식 링크가 열리지 않으면 상태를 `blocked` 또는 `확인 필요`로 유지하고 추측으로 대체하지 않는다.
6. 최종 문제은행 전체 정답률 목표는 80% 이상이며, 정답률은 문제은행 검토 결과로 기록한다.
7. 개인정보, 결제정보, 건강정보를 요청하거나 저장하는 항목은 이 백로그에서 생성하지 않는다.

## 추적성 요약

| 추적 대상 | 연결해야 할 안정 ID |
|---|---|
| 사용자 문제·목표 | 승인된 `intent-statement.md`의 Q 태그와 상위 결정 |
| 실행 가능성·제약 | `feasibility-assessment.md`, `constraint-register.md`의 항목 ID |
| 시험 도메인 | D1, D2, D3, D4, D5와 공식 채점 비율 |
| 학습 문서 | PU-01~PU-05와 문서별 도메인·작업/기술 항목 ID |
| 공통 산출물 | PU-00, PU-06~PU-12 |
| 수용 기준 | AC-SCOPE-01~AC-SCOPE-09와 각 PU의 기준 |
| 출처 | `sources/aws-sidebar-index.md`, `sources/source-registry.yaml`의 URL·상태·확인일 |

## 범위 밖 항목 관리

PU-13은 구현을 만들기 위한 항목이 아니라 범위가 흔들리지 않도록 보류·제외 내용을 추적하는 기록이다. 범위 밖 주제를 추가하려면 해당 도메인·문항·출처·일정·초보자 난이도에 미치는 영향을 분석하고 별도 승인을 받아야 한다.

## 출처

- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/intent-capture/intent-statement.md` — 사용자 문제, 대상, 성공 지표, 순서와 산출물.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/feasibility/feasibility-assessment.md` — 실행 가능성 및 품질 통제.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/feasibility/constraint-register.md` — 범위, 일정, 언어, 최신성, 형식, 데이터 제약.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/scope-definition/scope-definition-questions.md` — 범위 결정과 통합 요약 승인.
- `sources/aws-sidebar-index.md` — 공식 사이드바 링크 인벤토리.
- `sources/source-registry.yaml` — 공식 URL 추적 등록부.
<!-- 승인된 요약 확인 후 재저장 -->
<!-- 최종 승인 확인 후 재저장 -->