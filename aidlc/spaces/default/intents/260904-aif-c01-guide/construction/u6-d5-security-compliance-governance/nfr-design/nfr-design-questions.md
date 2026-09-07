# U6 NFR Design 질문

## 질문 목적

U6는 실행형 AWS 시스템이 아니라 D5 보안·규정 준수·거버넌스를 설명하는 정적 Markdown/JSON 패키지다. 아래 질문은 보안 설계의 표현 경계, 추적성, 후속 문서 연결, 민감정보 비수집 원칙을 고정하기 위한 것이다. 질문의 답변은 산출물 생성 전에 반영한다.

## Q1. 실행하지 않는 보안 범위

IAM role/policy, KMS key, Amazon Macie scan, AWS PrivateLink, Guardrails를 실제 호출·구성하지 않고, API·DB·AWS account·credentials·배포·새 dependency·실행 코드를 만들지 않는 경계를 그대로 유지할까요? 이 결정은 U6의 모든 보안 설계가 개념 설명과 정적 검사에 한정되는지 결정합니다.

- A. 현재의 no-runtime 경계를 그대로 유지한다.
- B. 문서 예시만 허용하되 실행 명령·계정 설정은 계속 금지한다.
- C. 일부 AWS 실습을 추가한다.
- X. Other (please specify)

[Answer]:

## Q2. 합성 보안 시나리오

IAM 권한, 데이터 보호, 공동 책임 모델을 설명할 때 실제 사용자·계정·조직·데이터 대신 합성 식별자와 가상 데이터만 사용해야 합니다. 합성 시나리오의 허용 범위를 어떻게 적용할까요?

- A. 모든 예시를 합성 시나리오로만 작성하고 실제 식별자는 금지한다.
- B. 공식 문서의 일반 예시는 인용하되 프로젝트 고유 값은 합성 값으로 바꾼다.
- C. 실제 운영 사례를 익명화하여 포함한다.
- X. Other (please specify)

[Answer]:

## Q3. U1 source/baseline 추적성

U1의 `sources/source-registry.yaml` 및 `sources/content-traceability.yaml`의 최종 schema·baseline revision·source ID 연결이 아직 미확정입니다. U6의 설계에서 이 연결을 어떻게 표현할까요? 미확정 연결은 `Deferred`로 남겨야 후속 U1 생성 후 재검증할 수 있습니다.

- A. U1 manifest 연결은 `Deferred`로 두고 필요한 필드와 후속 검증 조건만 명시한다.
- B. 현재 파일을 임시 canonical manifest로 간주해 `OK`로 표시한다.
- C. U6에서 별도 source manifest를 복제해 독립적으로 확정한다.
- X. Other (please specify)

[Answer]:

## Q4. 법률 비보증과 규정 설명

규정 준수는 시험·AWS 관점의 개념 설명과 확인 경로만 제공하고, 특정 관할·산업의 법률 판단·인증·준수 보증은 제공하지 않아야 합니다. 문서의 규정 관련 표현을 어느 수준으로 제한할까요?

- A. 법률 비보증 문구를 고정하고 적용 가능성은 공식 출처 확인 필요로 표시한다.
- B. AWS 서비스의 규정 프로그램 이름만 실무 확장으로 설명한다.
- C. 특정 규정의 체크리스트와 준수 판단까지 포함한다.
- X. Other (please specify)

[Answer]:

## Q5. D4 선수 문서와 U7 다음 문서 연결

현재 `docs/04-responsible-ai/README.md`와 `docs/05-security-compliance/README.md`는 존재하지 않으며, U7 산출물의 실제 경로·anchor도 아직 생성 전입니다. 계획된 경로를 링크 PASS로 표시하지 않고, 실제 생성 후 후속 link gate에서 확인하는 방식을 사용할까요?

- A. 실제 존재하는 대상만 링크하고, 계획된 D4·D5·U7 target은 `Deferred`와 후속 gate 조건으로 기록한다.
- B. 계획된 경로를 미리 Markdown 링크로 넣고 나중에 확인한다.
- C. 내부 문서 링크를 모두 생략한다.
- X. Other (please specify)

[Answer]:

## Q6. 중앙 glossary와 U7 handoff

중앙 `docs/glossary.md`와 U7의 평가·복습 산출물은 U6가 소유하지 않습니다. U6 용어 inventory와 D5 문서가 이 후속 소유자에게 어떤 계약으로 넘겨져야 할까요?

- A. U6는 안정 용어 ID·정의 초안을 제공하고 중앙 glossary/U7 반영은 handoff로 기록한다.
- B. U6가 중앙 glossary와 U7 평가 자료까지 직접 작성한다.
- C. 용어 연결 없이 D5 문서만 작성한다.
- X. Other (please specify)

[Answer]:

## Q7. 민감정보 비수집

문서·예시·검사 기록에 실제 account ID, access key, token, secret, PII, 결제·건강정보를 저장하지 않아야 합니다. 검증은 패턴 검사와 수동 검토를 조합하고, 발견 시 산출물을 실패 처리하는 방식으로 고정할까요?

- A. 민감정보 비수집을 필수 차단 규칙으로 두고 발견 시 수정 후 재검사한다.
- B. 경고만 남기고 문서 생성을 계속한다.
- C. 민감정보 검사를 후속 U8에만 위임한다.
- X. Other (please specify)

[Answer]:

## Q8. 정적 산출물의 실패 처리

U6에는 실행 호출 실패나 서비스 장애가 없으므로, 실패 처리는 링크·출처·JSON parse·인코딩·민감정보·범위 표지 검사 실패를 대상으로 해야 합니다. 검사 실패 시 어떤 처리 규칙을 적용할까요?

- A. 해당 파일을 `review` 상태로 유지하고 실패 원인·수정·재검사 조건을 기록한다.
- B. 확인되지 않은 항목을 `verified`로 표시하지 않고 `Deferred`로 보류한다.
- C. 두 규칙을 모두 적용한다.
- X. Other (please specify)

[Answer]:

## Consolidated Summary Confirmation

위 질문에서 확정된 경계와 보류 항목을 반영한 U6 NFR Design 요약을 확인합니다. `security-design.md`와 `traceability.json`은 no-runtime 보안 설명, 합성 시나리오, 법률 비보증, U1·문서 링크의 `Deferred` 추적, 민감정보 비수집을 기준으로 작성됩니다.

[Answer]: Looks correct
