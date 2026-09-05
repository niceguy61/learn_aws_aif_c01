# AIF-C01 한국어 가이드 Initiative Brief

## 의도와 문제

AIF-C01 시험을 준비하는 AI/ML·AWS 완전 초보자는 개념, AWS 서비스 선택, 시나리오 판단, 문제 풀이를 한 흐름으로 연결한 한국어 자료가 필요하다. 이 이니셔티브는 시험 합격을 최우선으로 하되, 단순 암기가 아니라 이해와 판단을 지원하는 정적 Markdown 학습 가이드를 제공한다.

## 근거와 시장 검증 요약

사용자가 확인한 직접적인 문제는 1개월 이내 시험 준비와 초보자용 설명의 필요성이다. 별도 시장 조사 또는 경쟁 분석 산출물은 제공되지 않았으므로 시장 규모·경쟁 우위·투자 수익을 추정하지 않는다. 투자 근거는 사용자 승인 문제 정의, AWS 공식 AIF-C01 시험 범위, 5개 도메인 전체 추적 필요성이다.

## 실행 가능성과 위험

정적 Markdown·CSV를 작성하는 문서 프로젝트이므로 AWS 계정, 배포 환경, 실행형 학습 애플리케이션, 학습자 데이터 저장소가 필요하지 않다. Feasibility 판정은 조건부 실행 가능이다.

핵심 통제는 다음과 같다.

- 각 도메인 작성 직전과 최종 검토에서 AWS 공식 출처를 확인한다.
- 접근할 수 없는 출처의 주장은 추측하지 않고 `blocked` 또는 `확인 필요`로 보류한다.
- 모든 시험 항목을 문서 또는 `해당 없음/확장` 기록에 연결한다.
- 모든 문제에 문항 ID, 도메인, 작업·기술 항목, 정답, 해설, 공식 URL을 기록한다.
- 시험 범위와 AWS 서비스 선택 중심의 `실무 확장`을 분리한다.
- 학습자 개인정보·결제정보·건강정보를 수집하거나 저장하지 않는다.

후속 관리 위험은 공식 항목 누락(R-01), 출처 변경·접근 차단(R-02~R-03), 문항 메타데이터 누락(R-04), 초보자 설명 부족(R-05), 시험·실무 혼합(R-06), 사용자 요청 전 최신성 지연(R-07), CSV 형식 오류(R-08), 일정 초과(R-09), 범위 밖 데이터 기능 추가(R-10)다. Feasibility 시점의 차단 이슈는 없다(I-01: 없음).

## 범위 경계

### 포함

- 시험 범위: AIF-C01의 D1 AI 및 ML의 기초 20%, D2 GenAI의 기초 24%, D3 파운데이션 모델의 적용 28%, D4 책임 있는 AI에 대한 가이드라인 14%, D5 보안·규정 준수·거버넌스 14%와 모든 작업·기술 항목
- 초보자용 개념 설명, 선수 지식, 비교, 기본 시나리오, 시험 판단 단서, 오해 교정, 확인 질문
- 실무 확장: AWS 서비스의 목적·선택·비교·기본 시나리오
- 100문항 이상 문제은행, 카드·퀴즈·진도표·UTF-8 Anki CSV
- 공식 시험 안내서와 AWS 공식 자료의 URL·제목·확인일·상태 추적

### 제외

모델 직접 개발·학습, 하이퍼파라미터 최적화, 복잡한 수학·통계 증명, 프로덕션 AI/ML 구축·운영, AWS 계정·유료 실습, 실행형 학습 애플리케이션, 로그인·답안·진도 저장, 개인정보·결제정보·건강정보 수집, 사용자 요청 전 자동 정기 최신성 검토는 기본 범위에 포함하지 않는다.

## 문서 탐색 개념

학습자는 `docs/00-start-here/`에서 시작해 선수 지식·진단·상대 진도표를 확인한다. 이후 각 도메인의 `README.md` 허브에서 D1→D5 순서로 개념 단위 문서를 읽고, `docs/glossary.md`와 확인 질문으로 용어를 복습한다. 문제를 푼 뒤 오답은 원 개념 문서와 용어 사전으로 회귀한다.

각 개념 문서는 제목·학습 목표·선수 지식, 쉬운 설명, AWS 관점, 비교, 시나리오, 시험 판단 단서, 오해, 핵심 정리, 확인 질문, 다음 문서와 출처 순서로 구성한다. `시험 범위`, `실무 확장`, `확인 필요`는 색상에 의존하지 않는 텍스트 표지로 제공한다. 로그인, 자동 저장, 검색 애플리케이션, 모달과 화면 전환은 설계하지 않는다.

## 팀 계획과 생산 순서

사용자는 Product Owner이자 최종 승인자다. 단일 작성자가 일관된 초안을 순차적으로 작성하고, 제품·전달·출처·규정 준수·품질·디자인·구조 역할은 필요한 논점의 검토자로 참여한다. 외부 파트너와 AWS Professional Services는 사용하지 않는다.

생산 순서는 `PU-00` 기준선 → `PU-01` D1 → `PU-02` D2 → `PU-03` D3 → `PU-04` D4 → `PU-05` D5 → `PU-06` 추적표 → `PU-07` 문제은행 → `PU-08`~`PU-11` 지원 자료 → `PU-12` 최종 점검이다. `PU-13`은 범위 밖 심화 주제를 시험 범위로 잘못 표시하지 않기 위한 보류 기록이다.

## Go 권고

**Go를 권고한다.** 사용자의 문제·대상·범위·산출물·팀 운영 방식이 승인되어 있고, 문서 중심 프로젝트로서 실행을 막는 feasibility 이슈가 없다. 단, Inception으로 넘어갈 때 공식 시험 기준선과 출처·추적성 통제를 먼저 세우고, 확인되지 않은 사실은 확정하지 않는 조건부 Go다.

## Inception 인계 기준

다음 조건을 충족하면 Inception 집필·계획 단계로 인계한다.

- `intent-statement.md`의 목적·대상·성공 지표가 `scope-document.md`와 `intent-backlog.md`에 일관되게 반영되어 있다.
- 모든 Must Have·Should Have·Won't Have 항목이 하나 이상의 실행 단위와 수용 기준에 연결되어 있다.
- Feasibility의 최신성, 접근 차단, 문항 추적성, Anki 형식, 데이터 제외 통제가 인계된다.
- `PU-00`에서 공식 AIF-C01 기준 목록과 출처 등록 상태를 확인한다.
- D1→D5 순서, 사용자 승인 게이트, 도메인별 출처·초보자·누락 검토가 유지된다.
- `sources/aws-sidebar-index.md`와 `sources/source-registry.yaml`의 URL·제목·도메인·확인일·상태를 문서와 연결한다.
- 확인되지 않은 항목은 `확인 필요` 또는 `blocked`로 남기고, `verified`로 승격하지 않는다.
- Inception에서 새 범위나 정확한 시험 날짜를 발명하지 않는다.

## Assumptions & Open Questions

- 현재 결정 질문의 미해결 항목은 없다.
- 정확한 시험 날짜는 기록하지 않고 “1개월 이내” 상대 일정만 사용한다.
- 시장 조사 산출물이 없으므로 시장 관련 주장은 후속 근거가 생기기 전까지 만들지 않는다.
- 실제 공식 URL별 최신성 검증과 문서·문항 매핑은 해당 집필 직전과 최종 검토에서 수행한다.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/intent-capture/intent-statement.md` — 승인된 문제, 대상, 성공 기준, 범위 신호.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/scope-definition/scope-document.md` — 포함·제외 범위, 우선순위, 수용 기준.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/scope-definition/intent-backlog.md` — `PU-00`~`PU-13` 생산 순서와 추적성.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/feasibility/feasibility-assessment.md` — 조건부 실행 가능 판정과 통제.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/feasibility/constraint-register.md` — 제약과 범위 경계.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/feasibility/raid-log.md` — 위험·가정·이슈·의존성.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/team-formation/team-assessment.md` — 역할·RACI·완료 기준.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/team-formation/mob-composition.md` — 단일 작성자와 검토 역할 구성.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/rough-mockups/wireframes.md` — 정적 Markdown 정보 구조와 접근성.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/rough-mockups/user-flow.md` — 학습자 문서 흐름과 회복 경로.

출처 URL의 실제 상태는 `sources/aws-sidebar-index.md`와 `sources/source-registry.yaml`에서 관리하며, 이 인계 문서는 해당 상태를 새로 확정하지 않는다.
<!-- 최종 승인 확인 후 재저장 -->