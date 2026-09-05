# Ideation 결정 로그

## 기록 원칙

이 로그는 Intent Capture부터 Rough Mockups까지의 승인된 결정을 통합한다. 상위 기록에 없는 날짜나 마감일은 추가하지 않는다. 사용자가 이미 승인한 선택은 Approval & Handoff에서 다시 질문하지 않는다.

## Intent Capture 결정

| ID | 결정 | 근거·상태 |
|---|---|---|
| Q1 | 시험 합격을 최우선으로 하되 개념 이해·AWS 서비스 선택·기본 시나리오·문제 풀이를 연결한다. | 승인됨 |
| Q2 | AI/ML과 AWS를 처음 접하고 코딩·수학·통계·모델 개발 경험이 없는 완전 초보자를 대상으로 한다. | 승인됨 |
| Q3 | AIF-C01 5개 도메인과 모든 작업·기술 항목을 추적하고, 100문항 이상 문제은행과 카드·진도표·용어 퀴즈·Anki를 제공한다. | 승인됨 |
| Q4 | 시작 계기는 1개월 이내 시험 준비이며, 일정은 상대 표현으로 관리한다. | 승인됨 |
| Q5 | 학습자, 사용자/품질 결정자, AWS 공식 시험 안내서를 핵심 이해관계자·범위 기준으로 삼는다. | 승인됨 |
| Q6 | 사용자가 학습 제품 범위와 승인을 결정하고 AWS 공식 시험 안내서가 시험 범위를 결정한다. | 승인됨 |
| Q7 | D1→D5 순서로 작은 Markdown 단위의 도메인 문서를 작성하고 도메인별 검토·승인을 한다. | 승인됨 |
| Q8 | `aif-c01-korean-guide-comprehensive` 범위와 Comprehensive depth를 유지한다. 초기 `Standard` test strategy 제안은 후속 결정으로 대체되었다. | 승인됨 |
| Q9 | 1개월 이내 준비의 측정 기준은 자체 문제은행 전체 정답률 80% 이상이다. | 승인됨 |
| Q10 | 실무 확장은 시험 개념을 AWS 서비스 선택과 기본 시나리오에 연결하는 범위까지만 포함한다. | 승인됨 |
| Q11 | 문서 작성·관리 주체는 별도 이해관계자로 만들지 않고 사용자의 품질 요구사항으로 기록한다. | 승인됨 |
| Q12 | 사용자 질문·설명, 검토 자료, 학습 문서 전체를 한글로 작성한다. | 승인됨 |
| Q13 | 현재 test strategy는 Comprehensive로 확정한다. | 승인됨 |

## Feasibility 결정

| ID | 결정 | 근거·상태 |
|---|---|---|
| Q1 | 도메인별 작성 직전 관련 공식 출처를 확인하고 최종 검토에서 전체 링크를 다시 확인한다. | 승인됨 |
| Q2 | 확인할 수 없는 출처의 주장은 추측하지 않고 `확인 필요`로 보류한다. | 승인됨 |
| Q3 | 모든 문제에 도메인, 작업·기술 항목, 정답, 해설, 공식 출처 URL을 기록한다. | 승인됨 |
| Q4 | Anki는 UTF-8 CSV 하나이며 기본 필드는 앞면·뒷면이다. | 승인됨 |
| Q5 | 학습자 개인정보·결제정보·건강정보를 수집·저장하지 않는다. | 승인됨 |
| Q6 | 초기 완성 후 정기 유지보수 주기를 두지 않고 사용자의 변경 요청이 있을 때 검토한다. | 승인됨 |

## Scope Definition 결정

추가 질문은 없었다. 승인된 범위는 AIF-C01 전체 5개 도메인, 초보자용 설명, D1→D5 순서, 100문항 이상과 지원 자료, 시험·실무 구분, 공식 출처 추적, 코드·복잡한 수학·유료 실습·프로덕션 구축·개인정보 수집의 제외다. `PU-00`~`PU-13`과 `AC-SCOPE-01`~`AC-SCOPE-09`가 실행 기준으로 확정되었다.

## Team Formation 결정

| ID | 결정 | 근거·상태 |
|---|---|---|
| TF-01 | 단일 작성자 중심으로 운영하고 사용자를 Product Owner 겸 최종 승인자로 둔다. | 승인됨 |
| TF-02 | 제품·전달·아키텍처·개발·품질·출처·규정 준수·디자인 역할을 필요 시 Kiro/AIDLC 지원으로 사용한다. | 승인됨 |
| TF-03 | 범위·우선순위·공식 해석·최종 품질·단계 승인의 권한은 사용자에게 있다. | 승인됨 |
| TF-04 | 외부 파트너와 AWS Professional Services는 사용하지 않는다. | 승인됨 |
| TF-05 | 공식 출처 확인과 초보자 품질 검토를 문서·문항·지원 자료의 완료 조건으로 둔다. | 승인됨 |
| TF-06 | 상시 다인 mob보다 단일 작성자와 필요 시 짧은 역할별 협업을 우선한다. | 승인됨 |
| TF-07 | 공식 시험 범위·출처 확인 후 집필하고, 집필 후 출처·초보자·누락·시험/실무 구분을 검토한다. | 승인됨 |

## Rough Mockups 결정

- 진입점은 `docs/00-start-here/`이고 도메인별 `README.md`가 학습 허브다.
- 기본 탐색은 시작 안내 → D1 README → 개념 문서 → `docs/glossary.md` → 확인 질문·문제은행 → 다음 문서 또는 다음 도메인이다.
- D1→D5 순차 학습을 유지하되 용어 사전, 이전 문서, 오답 회귀 링크를 허용한다.
- 개념 문서는 학습 목표·선수 지식부터 시작해 쉬운 설명, AWS 관점, 비교, 시나리오, 시험 판단 단서, 오해, 확인 질문과 출처로 이어진다.
- `시험 범위`, `실무 확장`, `확인 필요`를 텍스트로 표시하고 색상에 의존하지 않는다.
- 모바일 우선, 짧은 문단, 제한된 표 열, 논리적인 제목과 명확한 링크 텍스트를 사용한다.
- 로그인, 자동 저장, 검색 애플리케이션, 모달, 사용자 데이터 저장과 실행형 UI는 만들지 않는다.

## 승인 상태와 인계

모든 Ideation 승인 질문의 통합 요약은 승인 상태다. 새 결정 질문은 없다. 다음 단계는 승인된 경계를 바꾸지 않고 `PU-00` 공식 기준선과 출처·문서 추적을 준비하는 것이다.

## Assumptions & Open Questions

- 결정 질문의 미해결 항목은 없다.
- R-01~R-06, R-08~R-10은 후속 집필 위험으로 남고, R-07은 Accepted risk다.
- 실제 출처 URL별 상태와 도메인별 문서 매핑은 집필 직전·최종 검토에서 확인한다.
- 시험일의 정확한 날짜는 정하지 않았으며 `1개월 이내` 상대 표현만 유지한다.

## Sources

- `intent-capture/intent-capture-questions.md`
- `intent-capture/intent-statement.md`
- `scope-definition/scope-definition-questions.md`
- `scope-definition/scope-document.md`
- `scope-definition/intent-backlog.md`
- `feasibility/feasibility-questions.md`
- `feasibility/feasibility-assessment.md`
- `feasibility/constraint-register.md`
- `feasibility/raid-log.md`
- `team-formation/team-formation-questions.md`
- `team-formation/team-assessment.md`
- `team-formation/mob-composition.md`
- `rough-mockups/rough-mockups-questions.md`
- `rough-mockups/wireframes.md`
- `rough-mockups/user-flow.md`
<!-- 최종 승인 확인 후 재저장 -->