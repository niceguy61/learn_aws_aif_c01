# User Stories 계획 및 질문

## 확정된 전제

다음 항목은 승인된 요구사항 분석에서 확정되었으며 이 질문지에서 다시 열지 않는다.

- 제품 범위와 AIF-C01 공식 5개 도메인
- 완전 초보자 중심의 대상 학습자
- D1 → D2 → D3 → D4 → D5 작성 순서
- 승인된 학습 문서·지원 자료·문제은행·추적성 산출물 목록
- 한국어 중심 언어, AWS 고유명사 원문 보존, UTF-8 Markdown/CSV
- 공식 출처 우선, 시험 범위와 실무 확장의 분리, 코드·유료 실습·애플리케이션 구축 제외
- MVP 경계의 최종 결정은 Delivery Planning에서 수행

## Proposed plan

### Persona development approach

스토리 생성 전에 다음 역할을 최소 페르소나 세트로 정의한다. 각 페르소나는 역할, 목표, pain point, 기술 친숙도, 사용 빈도와 우선순위를 가진다.

- **주 페르소나**: AIF-C01을 처음 준비하는 완전 초보 학습자
- **보조 페르소나 후보**: 학습 경로·범위·품질을 승인하는 제품 소유자
- **워크플로 페르소나 후보**: 문서를 작성·유지하고 공식 출처와 추적성을 관리하는 콘텐츠 작성자/유지관리자
- **검토 관점**: 별도 최종 사용자 페르소나로 만들지, 콘텐츠 작성자/제품 소유자의 acceptance criteria에 검토 책임으로 반영할지 질문으로 결정한다.

모든 스토리는 하나의 정의된 페르소나를 참조하고, 페르소나 우선순위는 학습자 가치를 먼저 두되 제품 유지·검증에 필요한 역할을 보조 범위로 둔다.

### Story format and quality

모든 스토리는 `As a [persona], I want [goal], so that [benefit]` 형식을 사용한다. 각 스토리에 Given/When/Then 형식의 acceptance criteria를 작성하고, 독립성(Independent), 협상 가능성(Negotiable), 가치(Value), 추정 가능성(Estimable), 작은 크기(Small), 테스트 가능성(Testable)의 INVEST 기준을 점검한다. 문서 제품에서도 기술 작업 자체가 아니라 학습자·제품 소유자·작성자에게 보이는 가치를 스토리의 중심으로 둔다.

### Prioritization

각 스토리에 MoSCoW 우선순위를 부여한다.

- **Must Have**: 시험 합격이라는 핵심 목적, 공식 범위 커버리지, 초보자 학습 흐름, 필수 추적성·출처·기본 품질 검증에 필요한 것
- **Should Have**: 핵심 학습을 강화하지만 명시된 대체 경로가 있는 지원 흐름
- **Could Have**: 시간과 검토 여력이 있을 때 학습 경험을 개선하는 확장
- **Won't Have (this time)**: 승인된 기본 범위와 제약 밖의 항목

MoSCoW는 스토리 우선순위를 표시하는 데 사용하고, MVP 경계의 공식 결정은 Delivery Planning에 남긴다.

### Breakdown approach options

후보 방식은 다음과 같다.

1. **학습 여정 기반**: 범위 확인 → 개념 학습 → AWS 선택·시나리오 판단 → 복습·평가 → 품질 확인
2. **도메인 기반**: D1~D5별 핵심 학습 가치와 지원 자료를 세분화
3. **문서 워크플로 기반**: 공식 출처·기준선, 개념 문서, 학습 지원 자료, 문제은행, 검증·유지관리 흐름으로 세분화
4. **페르소나 기반**: 학습자, 제품 소유자, 콘텐츠 작성자/검토자의 독립적인 목표로 세분화
5. **혼합 수직 슬라이스**: 주로 학습 여정과 문서 워크플로를 축으로 삼고, 각 슬라이스가 요구사항·출력·acceptance criteria를 끝까지 연결하도록 구성

**제안 기본값**은 5번 혼합 수직 슬라이스다. 스토리는 한 개 파일이나 한 개 FR/NFR의 구현 작업으로 만들지 않고, 하나의 독립적으로 검토 가능한 사용자 가치와 연결된 문서·검증 묶음으로 만든다. 너무 큰 스토리는 학습 여정 단계, 문서 워크플로, 도메인 범위 또는 지원 자료 유형으로 나누고, 너무 작은 기술 작업은 상위 스토리의 acceptance criteria나 후속 단위로 남긴다.

## Questions

### Q1. 페르소나 강조점

승인된 완전 초보 학습자 중심을 유지하면서, User Stories에서 어떤 보조 역할을 별도 페르소나로 강조할까요?

- **A. 학습자 + 제품 소유자 + 콘텐츠 작성자/유지관리자**: 제품 가치, 승인·우선순위, 반복 집필 워크플로를 모두 명시한다. **(제안 기본값)**
- **B. 학습자 중심 + 제품 소유자 보조**: 콘텐츠 작성·검토는 제품 소유자의 acceptance criteria와 팀 실천에 포함하고 별도 페르소나는 최소화한다.
- **C. 학습자 세분화 + 제품 소유자**: 완전 초보 학습자를 주 페르소나로 두고, AWS 경험이 조금 있는 학습자를 비교 관점의 보조 페르소나로 추가한다. 콘텐츠 작성·검토는 별도 페르소나로 만들지 않는다.
- **D. 모든 역할 균형 강조**: 학습자, 제품 소유자, 콘텐츠 작성자/유지관리자, 출처·품질 검토자를 각각 독립 페르소나로 정의한다.
- **E. 주 학습자 1명만 정의**: 다른 역할은 제품 요구사항과 acceptance criteria의 이해관계자로만 다룬다.
- **X. Other (please specify)**

[Answer]:C

### Q2. 스토리 breakdown 수준과 우선 축

스토리를 어느 수준으로 나누고, 여러 축이 충돌할 때 어떤 축을 우선할까요? 모든 선택은 INVEST를 통과하고 3~6개의 검증 가능한 acceptance criteria를 갖는 세분화를 전제로 한다.

- **A. 혼합 수직 슬라이스**: 학습 여정과 문서 워크플로를 주축으로 하되 도메인·페르소나·지원 자료 유형을 필요할 때만 분할한다. 한 스토리는 독립적으로 검토 가능한 사용자 가치와 관련 문서·검증 결과를 포함한다. **(제안 기본값)**
- **B. 학습 여정 우선**: 범위 확인, 개념 학습, 서비스 판단, 복습·평가의 순서로 나누고 D1~D5는 각 스토리의 acceptance criteria와 추적성으로 연결한다.
- **C. 도메인 우선**: D1~D5를 가장 큰 경계로 삼고 각 도메인의 문서·지원 자료·검증을 작은 스토리로 나눈다.
- **D. 문서 워크플로 우선**: 기준선·출처, 개념 문서, 지원 자료, 문제은행, 품질·유지관리 흐름을 중심으로 나눈다.
- **E. 큰 기능 묶음 우선**: 핵심 학습, 지원 자료, 문제은행, 품질 검증 같은 큰 스토리/에픽을 먼저 만들고 후속 단계에서 세부 스토리로 분해한다.
- **X. Other (please specify)**

[Answer]: B

## Assumptions & Open Questions

- 질문은 승인된 범위나 산출물의 재협상이 아니라 페르소나 표현과 스토리 granularity를 결정하기 위한 것이다.
- 주 학습자는 반드시 주 페르소나로 유지한다.
- 모든 생성 스토리는 requirements.md의 FR/NFR 또는 승인된 제약으로 추적하고, 고아 스토리를 만들지 않는다.
- MoSCoW는 이 단계에서 우선순위를 부여하는 데 사용하며, 최종 MVP 경계는 Delivery Planning에서 확정한다.
- **확인 필요**: 보조 역할을 별도 페르소나로 분리할지(Q1), 혼합 수직 슬라이스를 기본 세분화로 채택할지(Q2).
- 답변이 `mix`, `depends`, `not sure`에 해당하는 모호한 표현을 포함하면 해당 선택의 우선순위와 예외 조건을 묻는 후속 질문을 추가한다.

## Sources

- [User Stories 단계 정의](../../../../../../../.kiro/aidlc-common/stages/inception/user-stories.md) — 실행 판단, 계획 항목, INVEST·MoSCoW·breakdown 옵션, 산출물 계약
- [승인된 요구사항 분석](../requirements-analysis/requirements.md) — 대상, 범위, 산출물, FR/NFR, 제약, 추적성 기준
- [확정된 팀 실천](../practices-discovery/team-practices.md) — 초보자 검토, 작은 문서 단위, 출처·추적성·품질 검증 관행
- [Product Guide](../../../../../../../.kiro/knowledge/aidlc-product-agent/product-guide.md) — 페르소나, INVEST, MoSCoW, 스토리 맵 기준
- [User Story Patterns](../../../../../../../.kiro/knowledge/aidlc-product-agent/user-story-patterns.md) — 스토리 형식, acceptance criteria, 세분화·Definition of Ready 기준
- [Prioritization Frameworks](../../../../../../../.kiro/knowledge/aidlc-product-agent/prioritization-frameworks.md) — MoSCoW 원칙
- [Element-level traceability](../../../../../../../.kiro/knowledge/aidlc-shared/verification.md) — 안정 ID와 상하위 추적성 원칙

## Consolidated Summary Confirmation

앞의 User Stories 질문 답변과 그에 따른 계획을 바탕으로 페르소나·사용자 스토리를 생성하기 전에 다음을 확인한다.

- P1은 완전 초보 주 페르소나로 유지하고 P2는 독립 경로가 아닌 AWS 경험 학습자의 비교·약점 보완 관점으로 둔다.
- 스토리는 범위 확인 → 4주 학습 경로 → D1~D5 개념 학습 → AWS 선택·시나리오 판단 → 복습·평가 → 품질·최신성 확인의 학습 여정 우선으로 나눈다.
- 기존 `US`·`AC` 안정 ID를 유지하고 지원 검토 findings를 정적 Markdown/CSV 경계, 추적성, 출처·문항·접근성 품질 기준에 반영한다.

**확인 질문:** 이 요약이 맞습니까?

[Answer]: Looks correct
