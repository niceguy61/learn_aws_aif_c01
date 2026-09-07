---
title: "U4 D3 NFR 설계 질문"
domain: "D3"
level: "beginner"
status: "draft"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html"
  - "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
  - "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-injection.html"
source_checked: "2026-09-04"
---

# U4 D3 NFR 설계 질문

이 질문지는 모델 실행 서비스가 아니라 D3 파운데이션 모델 적용을 설명하는 정적 Markdown·JSON 패키지의 보안 설계를 확정하기 위한 것이다. 모든 질문은 U4의 승인된 범위와 기존 NFR 요구사항을 좁히는 데만 사용한다.

## Q1. 정적 보안 경계

모델 호출, fine-tuning job, 벡터 DB, API, DB, AWS 계정·credentials, 배포와 실행 코드를 만들지 않는다는 경계를 그대로 유지할지 확인한다. 이 답은 보안 설계에서 런타임 인증·인가·암호화·가용성 패턴을 `해당 없음`으로 판정하는 근거가 된다.

- A. 현재의 no-runtime·no-credentials 정적 문서 경계를 그대로 유지한다.
- B. 정적 문서 범위 안에서 설명만 추가하되 실행 산출물은 만들지 않는다.
- C. 범위를 변경해야 하는 항목이 있다.
- X. Other (please specify)

[Answer]:

## Q2. 합성 prompt·RAG·evaluation 예시

초보자 설명에 사용할 prompt, RAG, 모델 평가 예시는 실제 사용자 입력·고객 대화·정답 데이터·저장소를 사용하지 않아야 한다. 합성 텍스트와 개념 수준의 판단 기준만 사용할지 확인한다.

- A. 모든 예시는 합성 텍스트만 사용하고, 데이터 저장·업로드·모델 실행은 설명하지 않는다.
- B. 합성 예시에 안전한 데이터 흐름 설명을 추가하되 실제 입력과 저장은 사용하지 않는다.
- C. 예시 범위를 변경해야 하는 항목이 있다.
- X. Other (please specify)

[Answer]:

## Q3. U1 기준선·출처의 정방향과 역방향 추적성

U1의 `sources/content-traceability.yaml`과 `sources/source-registry.yaml`이 제공할 canonical baseline/source manifest는 아직 최종 확정되지 않았다. U4가 D3 stable ID에서 기준선·출처로, 기준선·출처에서 문서·문항·카드 등 파생 자료로 양방향 연결하는 설계 원칙을 유지하되 미확정 연결은 `Deferred`로 남길지 확인한다.

- A. U1 manifest가 확정될 때까지 해당 연결은 `Deferred`로 유지하고 안정 ID 형식은 변경하지 않는다.
- B. U1 manifest 확정 전에도 현재 출처 URL을 임시 연결로 사용하되 문서 상태는 `review`로 유지한다.
- C. 기준선·출처 연결 규칙을 변경해야 한다.
- X. Other (please specify)

[Answer]:

## Q4. D3 stable ID와 문서 상태

D3 문서와 기준선 ID는 재번호화하지 않고 유지해야 하며, 출처 미확정 상태에서는 문서를 `verified`로 승격하지 않아야 한다. `AIF-C01-D3-T<n>`와 D3 학습 문서 ID를 안정적으로 유지하고 현재 산출물 상태를 `draft` 또는 `review`로 두는 정책을 확인한다.

- A. stable ID를 유지하고 검증 전 문서 상태를 `draft` 또는 `review`로 제한한다.
- B. stable ID 정책은 유지하되 모든 문서를 `review`로 통일한다.
- C. ID 또는 상태 정책을 변경해야 한다.
- X. Other (please specify)

[Answer]:

## Q5. 출처·범위·문서 상태의 분리

공식 시험 범위, 실무 확장, 출처 접근 상태, 문서 작성 상태는 서로 다른 의미를 가진다. 공식 범위와 실무 확장을 섹션에서 구분하고, `blocked`·`확인 필요`·`review`·`verified`를 혼동하지 않는 설계를 유지할지 확인한다.

- A. 네 가지 상태와 공식 범위·실무 확장을 현재처럼 분리한다.
- B. 상태는 분리하되 실무 확장 표지를 더 엄격하게 추가한다.
- C. 상태 또는 범위 표지 체계를 변경해야 한다.
- X. Other (please specify)

[Answer]:

## Q6. 민감정보 비수집

U4는 이름·이메일·계정 식별자·토큰·API key·비밀·실제 고객 데이터를 예시·로그·검사 결과에 저장하지 않는다. 민감정보가 발견되면 문서 생성을 중단하거나 합성 값으로 교체하는 정적 검사 경계를 적용할지 확인한다.

- A. 민감정보는 수집·저장하지 않고 발견 시 제거 또는 합성 값으로 교체한다.
- B. 민감정보 검사는 유지하되 발견 시 문서를 `확인 필요`로만 표시한다.
- C. 민감정보 처리 경계를 변경해야 한다.
- X. Other (please specify)

[Answer]:

## Q7. 중앙 glossary와 다음 도메인 경계

중앙 `docs/glossary.md`가 아직 없을 수 있으므로 D3는 임시 용어 inventory를 사용하고 D4 README로 연결해야 한다. U4가 중앙 glossary를 대신 생성하지 않고, D2 선수 문서·D4 다음 문서 연결과 open question만 남기는 경계를 유지할지 확인한다.

- A. 중앙 glossary는 후속 Unit에 위임하고 U4는 임시 inventory와 D4 연결만 제공한다.
- B. U4에서 glossary 용어를 직접 통합하되 다른 Unit의 소유권은 유지한다.
- C. glossary 또는 다음 도메인 연결 범위를 변경해야 한다.
- X. Other (please specify)

[Answer]:

## Consolidated Summary Confirmation

위 질문의 설계 요약을 현재 U4 보안 설계의 입력으로 확정할지 선택한다. 이 섹션은 요약 확인용이며 아직 사용자 답변을 기록하지 않는다.

- Accept as-is
- Convert to follow-up questions

[Answer]: Looks correct
