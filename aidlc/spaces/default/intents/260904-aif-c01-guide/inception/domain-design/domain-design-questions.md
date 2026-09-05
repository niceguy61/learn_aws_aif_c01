# Domain Design 질문

> 대상: AIF-C01 완전 초보자용 한국어 정적 Markdown 학습 가이드
> 상태: `draft`
> 안내: 이미 승인된 시험 범위, P1/P2 페르소나, D1→D5 순서, 정적 Markdown/CSV, 비수집 경계는 다시 결정하지 않는다. 아래 질문은 문서 제작을 논리적 책임 단위로 나누기 위한 것이다.

## Q1. 논리적 구성 단위의 분해

학습 가이드는 실행형 애플리케이션이 아니므로 배포 단위가 아니라 변경·검토·추적 책임을 기준으로 나눕니다. 다음 중 기본 분해를 선택해 주세요.

- A. `DomainContent` 하나: D1~D5 문서, README, 용어와 예시를 하나의 콘텐츠 책임으로 관리
- B. `LearningContent`, `ReferenceCatalog`, `AssessmentContent`, `QualityEvidence` 네 책임: 학습 문서, 공식 기준선·출처, 카드·퀴즈·Anki·문제은행, 품질 기록을 분리
- C. `DomainContent`와 `LearningSupport` 두 책임: 도메인 문서·출처와 복습·평가 자료를 크게 분리
- D. 문서 파일마다 별도 책임 단위로 분해
- E. 위 선택을 조정하거나 다른 분해를 제안

[Answer]: A

## Q2. 공식 기준선과 출처의 소유

`AIF-C01-D<n>-T<n>` 기준선 행, 공식 시험 안내서 메타데이터, 사이드바 인덱스, `source-registry.yaml`은 여러 학습 자료가 함께 참조합니다. 이 정보의 단일 소유 책임을 어떻게 둘까요?

- A. `ReferenceCatalog`가 기준선·출처·사이드바 링크를 모두 소유
- B. 기준선은 `ReferenceCatalog`, 개별 문서 출처 표시는 `LearningContent`가 소유
- C. 도메인별 문서가 각자 기준선과 출처를 복제해 소유
- D. 중앙 소유 없이 문서와 문제 파일에만 기록
- E. 위 선택을 조정하거나 다른 소유 모델을 제안

[Answer]: B

## Q3. 문서·문항·복습 자료 사이의 연결 방식

정적 산출물에서 학습자가 기준선, 문서, 카드, 퀴즈, Anki, 문제은행 사이를 이동하고 검토자가 양방향 추적을 재구성해야 합니다. 기본 연결 방식을 선택해 주세요.

- A. 사람이 관리하는 안정 ID와 상대 Markdown 링크를 기본으로 하고, JSON/YAML 추적표는 검사용으로 둠
- B. 원본 문서는 최소화하고 빌드 시 생성되는 중앙 인덱스만 사용
- C. 각 파일에 링크를 두지 않고 중앙 JSON 추적표만 사용
- D. 문서 간 연결은 최소화하고 도메인 README에서만 안내
- E. 위 선택을 조정하거나 다른 연결 방식을 제안

[Answer]: C

## Q4. 정적 학습 경로와 탐색 책임

P1은 시작 안내에서 D1→D5 순서로 읽고, P2는 비교·약점 보완 경로를 사용할 수 있어야 합니다. 다음 중 탐색 구조의 책임을 선택해 주세요.

- A. `LearningContent`가 시작 안내, 도메인 README, 현재·이전·다음 문서 링크와 P2 보완 링크를 소유
- B. 각 도메인 README가 자기 도메인 링크만 소유하고 시작 안내는 별도 책임으로 둠
- C. `ReferenceCatalog`가 모든 탐색 링크를 소유
- D. 파일 목록만 제공하고 독자가 순서를 추론
- E. 위 선택을 조정하거나 다른 탐색 구조를 제안

[Answer]: A

## Q5. 평가 자료의 책임 경계

문제은행·용어 퀴즈·카드·Anki는 모두 학습 지원 자료지만 서로 다른 형식과 검토 규칙을 가집니다. 다음 중 평가·복습 자료의 책임 경계를 선택해 주세요.

- A. `AssessmentContent`가 문제은행과 정적 점수 워크시트를 소유하고, `LearningSupport`가 카드·용어 퀴즈·Anki를 소유
- B. `AssessmentContent` 하나가 문제은행·점수 워크시트·카드·퀴즈·Anki를 모두 소유
- C. 도메인별 README가 해당 도메인의 모든 평가 자료를 소유
- D. 문제은행만 책임 단위로 두고 나머지는 문서 부록으로 둠
- E. 위 선택을 조정하거나 다른 경계를 제안

[Answer]: A

## Q6. 품질 검사와 증거의 소유

초보자 관점, 개념 단위, 링크·제목, 출처 상태, 범위 표지, 문항 품질, 민감정보 검사는 작성 콘텐츠와 별도의 판정을 남겨야 합니다. 다음 중 품질 책임을 선택해 주세요.

- A. `QualityEvidence`가 검사 기록·판정·재검사 결과를 중앙 소유하고 각 도메인 문서는 링크만 제공
- B. 각 콘텐츠 파일이 자기 품질 결과를 직접 소유하고 중앙 기록은 만들지 않음
- C. 도메인별 품질 보고서를 두되 최종 통합 점검표도 함께 유지
- D. 품질 검사는 최종 단계에서만 수행하고 중간 증거는 남기지 않음
- E. 위 선택을 조정하거나 다른 품질 기록 방식을 제안

[Answer]: A

## Q7. Mermaid·이미지·텍스트 대체의 책임

Mermaid와 AWS 공식 이미지는 선택 사항이며 외부 렌더러·이미지 없이도 의미를 이해할 수 있어야 합니다. 다음 중 표현 책임을 선택해 주세요.

- A. `LearningContent`가 가이드 작성 도표와 텍스트 대체를 함께 소유하고, `ReferenceCatalog`가 AWS 공식 이미지의 출처·권리 메타데이터를 소유
- B. 모든 시각 자료를 별도 `VisualContent` 책임으로 분리
- C. 이미지는 사용하지 않고 모든 설명을 텍스트로만 작성
- D. 시각 자료는 각 문서에 자유롭게 넣고 별도 책임을 두지 않음
- E. 위 선택을 조정하거나 다른 표현 정책을 제안

[Answer]: B

## Q8. 외부 의존성과 정적 산출물의 경계

이 프로젝트는 실행형 서비스·데이터베이스·학습자 데이터 저장을 만들지 않습니다. 논리적 구성 단위와 외부 의존성을 구분하기 위해 다음 경계를 선택해 주세요.

- A. AWS Certification 공식 안내서와 AWS 공식 문서는 `ReferenceCatalog`가 사용하는 외부 출처이며, Markdown·CSV·Git 저장소는 산출물 경계 밖의 저장·열람 의존성으로 기록
- B. AWS 서비스명을 각각 별도 컴포넌트로 모델링
- C. Markdown 파일과 CSV 파일을 각각 외부 의존성으로만 모델링
- D. 외부 의존성 목록을 작성하지 않음
- E. 위 선택을 조정하거나 다른 경계를 제안

[Answer]: B

## 미해결 모호성 확인

- 위 선택으로 책임 단위·각 엔터티의 단일 소유자·자료 간 연결·품질 증거 위치가 결정되는지 확인한다.
- 선택이 서로 충돌하면 후속 질문에서 `ReferenceCatalog`, `LearningContent`, 평가·복습 자료, `QualityEvidence`의 소유 범위를 좁힌다.

## 후속 질문 — 충돌 해소

앞선 답변에서 책임 단위와 추적 연결 방식이 서로 다르게 선택되어 아래 항목을 먼저 확정해야 합니다.

## Q9. 최종 책임 단위의 해석

`Q1=A`의 `DomainContent` 하나와 `Q2·Q5·Q6·Q7`의 여러 책임을 함께 적용할 수 없습니다. 하나의 논리적 컴포넌트 안에 내부 책임 영역을 두는지, 독립적인 컴포넌트로 나누는지 선택해 주세요.

- A. `GuideContent` 하나만 논리적 컴포넌트로 두고, `ReferenceCatalog`, 평가·복습, 품질, 시각 자료는 그 내부 책임 영역으로 기록
- B. `LearningContent`, `ReferenceCatalog`, `AssessmentContent`, `LearningSupport`, `QualityEvidence`, `VisualContent`를 독립적인 논리적 컴포넌트로 둠
- C. `LearningContent`, `ReferenceCatalog`, `AssessmentContent`, `QualityEvidence` 네 컴포넌트로 두고, 시각 자료는 `LearningContent`와 `ReferenceCatalog`에 귀속
- D. `DomainContent`와 `LearningSupport` 두 컴포넌트로 두고 출처·품질·시각 자료는 각 컴포넌트의 내부 책임으로 둠
- E. 위 선택을 조정하거나 다른 해석을 제안

[Answer]: C

> 결정 보정: `DomainContent` 하나로 뭉치지 않고, 변경·검토·추적 책임이 다른 논리적 컴포넌트를 분리한다.

## Q10. 정적 연결과 중앙 추적표의 관계

`Q3=C`의 중앙 JSON만 사용하는 방식은 학습자가 상대 Markdown 링크로 문서·도메인·다음 학습 자료를 이동해야 한다는 승인 요구사항과 충돌합니다. 두 목적을 모두 충족할 연결 방식을 선택해 주세요.

- A. 안정 ID와 상대 Markdown 링크를 학습자 탐색에 사용하고, 중앙 JSON/YAML 추적표를 양방향 검사용으로 함께 사용
- B. 중앙 JSON만 사용하고 학습자 탐색 링크 요구사항을 후속 단계에서 제외
- C. 상대 Markdown 링크만 사용하고 중앙 추적표는 만들지 않음
- D. 상대 Markdown 링크와 중앙 추적표를 모두 사용하되 중앙 추적표를 원본이 아니라 검사·재구성용으로만 취급
- E. 위 선택을 조정하거나 다른 연결 방식을 제안

[Answer]: A

> 결정 보정: 학습자 탐색에는 상대 Markdown 링크를 사용하고, 중앙 JSON/YAML은 양방향 추적과 누락 검사에 사용한다.

## Q11. AWS 서비스와 외부 의존성의 모델링

`Q8=B`는 AWS 서비스명을 각각 컴포넌트로 모델링하지만, 이 단계의 컴포넌트는 우리가 작성하는 논리적 책임 단위이며 AWS 서비스는 사용하는 외부 의존성입니다. 다음 중 프로젝트 경계에 맞는 방식을 선택해 주세요.

- A. AWS Certification 공식 안내서와 AWS 공식 문서를 `ReferenceCatalog`의 외부 출처 의존성으로 기록하고, AWS 서비스는 학습 내용의 참조 대상이지 컴포넌트가 아님
- B. AWS 서비스마다 컴포넌트를 두되 실제 배포나 구현은 만들지 않음
- C. AWS 서비스명은 컴포넌트가 아니라 `LearningContent`가 설명하는 개념·참조 항목으로만 기록
- D. AWS 서비스와 공식 문서를 모두 외부 의존성으로 기록하되, 서비스별 사용 목적과 문서별 출처 목적을 구분
- E. 위 선택을 조정하거나 다른 경계를 제안

[Answer]: A

> 결정 보정: AWS 서비스와 AWS 공식 문서는 `ReferenceCatalog`의 외부 의존성·참조 대상이며, 서비스별 컴포넌트는 만들지 않는다.

## Q12. 시각 자료 책임의 최종 범위

`Q7=B`는 `VisualContent`를 별도 컴포넌트로 두자는 뜻이고, 팀 관행은 Mermaid·이미지의 의미를 해당 학습 문서와 가까운 텍스트로 유지하도록 합니다. 다음 중 최종 범위를 선택해 주세요.

- A. `VisualContent`를 독립 컴포넌트로 두며 도표·이미지·alt text·캡션·텍스트 대체를 소유
- B. 시각 자료를 독립 컴포넌트로 두지 않고 `LearningContent`가 가이드 작성 도표와 텍스트 대체를, `ReferenceCatalog`가 AWS 공식 이미지 출처·권리 메타데이터를 소유
- C. 이미지를 사용하지 않고 Mermaid도 사용하지 않으며 모든 핵심 정보를 텍스트로만 제공
- D. `VisualContent`는 독립 책임으로 추적하되 실제 문서 안의 텍스트 대체와 출처 링크는 `LearningContent`·`ReferenceCatalog`가 각각 관리
- E. 위 선택을 조정하거나 다른 표현 정책을 제안

[Answer]: B

> 결정 보정: `VisualContent`를 별도 컴포넌트로 만들지 않고, 학습 문서의 텍스트 대체는 `LearningContent`가, AWS 공식 이미지의 출처·권리 메타데이터는 `ReferenceCatalog`가 소유한다.

## Q13. 엔터티 단일 소유 확인

최종 설계에서는 각 엔터티가 한 컴포넌트에만 귀속되어야 합니다. 다음 제안에 동의하는지, 조정할 항목이 있는지 선택해 주세요.

- A. `BaselineItem`·`SourceRecord`·`SidebarLink`는 `ReferenceCatalog`가 소유하고, `LearningDocument`·`DomainReadme`·`GlossaryTerm`은 `LearningContent`가 소유하며, `QuestionBankItem`·`ScoreSheet`는 `AssessmentContent`가, `Card`·`TermQuizItem`·`AnkiNote`는 `LearningSupport`가, `QualityCheckRecord`는 `QualityEvidence`가 소유
- B. 모든 엔터티를 `GuideContent` 하나가 소유하고 다른 영역은 내부 분류만 둠
- C. `VisualAsset`·`VisualAlternative`를 별도 엔터티로 두고 `VisualContent`가 소유하며 나머지는 A와 같이 나눔
- D. 엔터티 소유를 도메인별 README가 나누어 소유
- E. 위 제안을 조정하거나 다른 소유 모델을 제안

[Answer]: E — `BaselineItem`, `SourceRecord`, `SidebarLink`은 `ReferenceCatalog`가 소유하고, `LearningDocument`, `DomainReadme`, `GlossaryTerm`은 `LearningContent`가 소유하며, `QuestionBankItem`, `ScoreSheet`, `Card`, `TermQuizItem`, `AnkiNote`는 `AssessmentContent`가 소유하고, `QualityCheckRecord`는 `QualityEvidence`가 소유한다. `VisualAsset`은 별도 컴포넌트가 아닌 해당 문서의 표현으로 취급하며 공식 이미지 메타데이터만 `ReferenceCatalog`가 관리한다.

## 결정 정리

후속 답변은 앞선 충돌하는 선택을 다음과 같이 보정한다.

- `Q1=A`는 `Q9=C`로 보정한다. 논리적 컴포넌트는 `LearningContent`, `ReferenceCatalog`, `AssessmentContent`, `QualityEvidence` 네 개다.
- `Q3=C`는 `Q10=A`로 보정한다. 상대 Markdown 링크와 중앙 JSON/YAML 추적표를 함께 사용한다.
- `Q7=B`는 `Q12=B`로 구체화한다. 시각 자료를 독립 컴포넌트로 만들지 않는다.
- `Q8=B`는 `Q11=A`로 보정한다. AWS 서비스는 컴포넌트가 아니라 `ReferenceCatalog`가 사용하는 외부 참조·의존성이다.
- `Q5=A`의 `LearningSupport` 분리는 채택하지 않고, 카드·퀴즈·Anki를 `AssessmentContent`에 포함한다. 형식별 파일과 추적 ID는 분리하되 논리적 소유자는 하나로 유지한다.
- 엔터티는 정확히 하나의 컴포넌트가 소유한다. 정적 파일은 데이터베이스나 API가 아니라 각 컴포넌트가 관리하는 버전 관리 산출물이다.

이 결정은 실행형 애플리케이션·AWS 인프라·학습자 데이터 저장을 추가하지 않으며, `Units Generation`에서 배포 단위를 결정하지 않는다.

## Consolidated Summary Confirmation

- `ReferenceCatalog`, `LearningContent`, `AssessmentContent`, `QualityEvidence` 네 개의 논리적 컴포넌트를 사용한다.
- 기준선·공식 출처·사이드바 링크는 `ReferenceCatalog`가 소유하고, 학습 문서·도메인 README·용어는 `LearningContent`가 소유한다.
- 문제은행·점수 워크시트·카드·용어 퀴즈·Anki는 `AssessmentContent`가 소유한다.
- 품질 판정·근거·재검사 기록은 `QualityEvidence`가 소유한다.
- 학습자 탐색은 안정 ID와 상대 Markdown 링크를 사용하고, 중앙 JSON/YAML은 양방향 추적·누락 검사에 사용한다.
- AWS 서비스와 공식 문서는 컴포넌트가 아니라 `ReferenceCatalog`의 외부 의존성·학습 참조 대상이다.
- Mermaid·가이드 작성 도표의 텍스트 대체는 `LearningContent`에 귀속하고, AWS 공식 이미지 메타데이터는 `ReferenceCatalog`가 관리한다.
- 정적 파일은 버전 관리 산출물이며 API·데이터베이스·학습자 데이터 저장·AWS 인프라를 추가하지 않는다.

- Looks correct
- Request changes

[Answer]: Looks correct
