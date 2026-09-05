# Units Generation 질문

> 대상: 승인된 네 컴포넌트 기반의 AIF-C01 한국어 정적 Markdown·CSV 학습 가이드
> 상태: `draft`
> 주의: 아래 질문은 작업 단위와 의존성 토폴로지만 결정한다. 어느 단위를 먼저 구현할지, 어떤 단위가 가장 높은 가치를 갖는지는 Delivery Planning에서 결정한다.

## Q1. 작업 단위 경계 전략

Domain Design의 논리적 컴포넌트를 Construction에서 검증 가능한 작업 단위로 나누는 기준을 선택해 주세요.

- A. 책임 기준: `ReferenceCatalog`, `LearningContent`, `AssessmentContent`, `QualityEvidence`를 각각 하나의 Unit으로 둠
- B. 도메인 기준: D1, D2, D3, D4, D5를 각각 하나의 Unit으로 두고 출처·평가·품질을 별도 Unit으로 둠
- C. 혼합 기준: 기준선·출처 1개, D1~D5 학습 콘텐츠 5개, 평가·복습 1개, 품질 증거 1개로 둠
- D. 산출물 형식 기준: Markdown 문서, CSV, JSON/YAML 추적표를 각각 별도 Unit으로 둠
- X. Other (please specify)

[Answer]: C

> 결정 보정: 기준선·출처 1개, D1~D5 학습 콘텐츠 5개, 평가·복습 1개, 품질 증거 1개로 총 8개 Unit을 만든다.

## Q2. Unit 세분화 정도

D1→D5 순서를 지키면서도 문서 변경을 작은 단위로 검토해야 합니다. 다음 중 세분화 정도를 선택해 주세요.

- A. 거친 분해: 네 컴포넌트와 거의 같은 4개 Unit
- B. 세밀한 분해: 기준선 1개, D1~D5 5개, 평가·복습 1개, 품질 1개로 총 8개 Unit
- C. 절충 분해: 기준선 1개, D1~D5를 하나의 학습 콘텐츠 Unit으로 묶고, 평가·복습 1개와 품질 1개로 총 4개 Unit
- D. 모든 도메인의 문서 파일을 개별 Unit으로 분해
- X. Other (please specify)

[Answer]: B

> 결정 보정: 8개 Unit으로 분리해 D1~D5의 문서 변경·검토를 작게 유지하고, 평가·복습과 품질 검사를 별도 책임으로 둔다.

## Q3. 의존성 토폴로지와 병렬 가능성

이 단계는 경제적 구현 순서가 아니라 Unit 간 선행 조건만 기록합니다. 다음 중 토폴로지 원칙을 선택해 주세요.

- A. 필요한 의존성만 directed edge로 기록하고, 서로 의존하지 않는 Unit은 병렬 개발 가능으로 표시
- B. 공식 문서 작성 순서인 D1→D2→D3→D4→D5를 모든 Unit의 강제 선형 의존성으로 기록
- C. 모든 Unit이 기준선 Unit에 의존하도록 하되 도메인 Unit끼리는 서로 독립으로 기록
- D. Unit 간 의존성을 기록하지 않고 Delivery Planning에서만 결정
- X. Other (please specify)

[Answer]: C

> 결정 보정: 모든 도메인 Unit은 기준선·출처 Unit에 의존하고 서로는 독립으로 둔다. 평가·복습 Unit은 기준선과 D1~D5 학습 자료에, 품질 Unit은 모든 산출물에 의존한다. D1→D5는 학습 경로·문서 연결 규칙이며 이 단계의 경제적 구현 순서를 뜻하지 않는다.

## Q4. Unit 간 통합 지점

정적 산출물에는 API·이벤트·공유 데이터베이스가 없습니다. Unit이 서로 연결되는 방식을 선택해 주세요.

- A. 안정 ID, 기준선·출처 ID, 상대 Markdown 링크, 중앙 JSON/YAML 추적표와 품질 보고서 링크를 통합 계약으로 사용
- B. REST API와 JSON 응답을 Unit 간 계약으로 사용
- C. 공유 데이터베이스 테이블을 Unit 간 계약으로 사용
- D. Unit 간 통합을 만들지 않고 각 Unit을 완전히 독립된 문서 묶음으로 유지
- X. Other (please specify)

[Answer]: A

> 결정 보정: 안정 ID, 기준선·출처 ID, 상대 Markdown 링크, 중앙 JSON/YAML 추적표와 품질 보고서 링크를 정적 통합 계약으로 사용한다. API·이벤트·데이터베이스는 만들지 않는다.

## Q5. 배포·전달 모델

이 프로젝트의 전달 대상은 실행형 서비스가 아니라 버전 관리된 정적 문서입니다. Unit의 전달 모델을 선택해 주세요.

- A. 모든 Unit을 하나의 정적 학습 가이드 패키지로 통합하고, Unit별 검증 후 저장소에 통합
- B. 각 Unit을 독립 실행 서비스로 배포
- C. 문서 Unit은 하나의 패키지로, 품질 Unit은 별도 운영 서비스로 배포
- D. Unit마다 별도 AWS 계정·환경·파이프라인으로 배포
- X. Other (please specify)

[Answer]: A

> 결정 보정: 모든 Unit은 하나의 정적 학습 가이드 패키지로 통합하고, Unit별 품질 검증을 통과한 변경만 저장소에 통합한다.

## Q6. Unit kind 표기

Downstream Construction이 Unit별 설계 산출물을 결정할 수 있도록 각 Unit의 종류를 표시해야 합니다. 정적 문서 프로젝트에 맞는 표기를 선택해 주세요.

- A. 기준선·추적표·품질 Unit은 `spec`, 도메인·평가 자료 Unit은 `packaging`
- B. 모든 Unit을 `packaging`으로 표기
- C. 도메인 학습 자료는 `ui`, 나머지는 `service`로 표기
- D. kind를 생략하고 모든 Unit에 전체 설계 산출물 집합을 적용
- X. Other (please specify)

[Answer]: A

> 결정 보정: 기준선·추적표 Unit과 품질 Unit은 `spec`, D1~D5 학습 Unit과 평가·복습 Unit은 `packaging`으로 표기한다.

## Q7. 횡단 User Story의 배치

`US5.1` 출처·범위·최신성·접근성 품질은 모든 콘텐츠에 걸쳐 적용되고, `US1.1`의 기준선과 학습 지도도 여러 Unit을 연결합니다. 횡단 스토리를 기록하는 방식을 선택해 주세요.

- A. 각 횡단 스토리에 주 소유 Unit 하나를 지정하고, 영향을 받는 Unit을 cross-cutting 목록에 추가
- B. 횡단 스토리를 여러 Unit에 중복 배정하고 주 소유자는 두지 않음
- C. 모든 스토리를 모든 Unit에 복제
- D. 횡단 스토리는 Units Generation 추적표에서 제외
- X. Other (please specify)

[Answer]: A

> 결정 보정: 각 횡단 스토리에 주 소유 Unit 하나를 지정하고 영향을 받는 Unit 목록을 함께 기록한다. `US5.1`은 품질 Unit을 주 소유자로, 모든 콘텐츠 Unit을 영향 대상으로 둔다.

## 미해결 모호성 확인

- Unit 수가 결정되면 각 Unit에 고유한 `U{n}` ID와 소문자 디렉터리명을 부여한다.
- Unit 간 의존성은 cycle-free DAG로 기록하며 구현 순서·critical path는 Delivery Planning에 남긴다.
- 모든 User Story는 하나 이상의 주 소유 Unit과 필요한 cross-cutting Unit에 연결한다.

## 결정 정리

- Unit 집합은 `U1` 기준선·출처, `U2` D1, `U3` D2, `U4` D3, `U5` D4, `U6` D5, `U7` 평가·복습, `U8` 품질 증거로 구성한다.
- `U2`~`U6`은 `U1`에 의존하지만 서로 직접 의존하지 않는다. `U7`은 `U1`과 `U2`~`U6`에 의존하고, `U8`은 모든 Unit의 산출물을 검사하므로 모두에 의존한다.
- 이 DAG는 가능한 의존성만 표현하며, 어느 Unit을 먼저 구현할지와 critical path는 Delivery Planning에서 정한다.
- Unit 간 계약은 정적 파일·안정 ID·상대 링크·중앙 추적표·품질 보고서 링크다. 실행 API·이벤트·데이터베이스·배포 환경은 없다.
- 모든 Unit은 하나의 정적 학습 가이드 패키지에 통합된다. `spec`은 기준선·추적표·품질 증거에, `packaging`은 학습·평가 정적 산출물에 사용한다.

## Consolidated Summary Confirmation

- 총 8개 Unit을 사용한다: 기준선·출처 1개, D1~D5 학습 콘텐츠 5개, 평가·복습 1개, 품질 증거 1개.
- D1~D5 Unit은 기준선·출처 Unit에 의존하지만 서로 직접 의존하지 않는다.
- 평가·복습 Unit은 기준선과 D1~D5 학습 자료에 의존하고, 품질 증거 Unit은 모든 산출물을 검사한다.
- Unit 간 통합은 안정 ID·기준선/출처 ID·상대 Markdown 링크·중앙 JSON/YAML·품질 보고서 링크로 구성한다.
- 모든 Unit은 하나의 정적 학습 가이드 패키지로 통합하며 API·이벤트·데이터베이스·AWS 배포 환경은 만들지 않는다.
- 기준선·추적표·품질 Unit은 `spec`, 학습·평가 정적 산출물 Unit은 `packaging`으로 표시한다.
- 횡단 User Story는 주 소유 Unit 하나와 영향받는 Unit 목록으로 추적한다.
- 구현 순서와 critical path는 이 단계가 아니라 Delivery Planning에서 결정한다.

- Looks correct
- Request changes

[Answer]: Looks correct
