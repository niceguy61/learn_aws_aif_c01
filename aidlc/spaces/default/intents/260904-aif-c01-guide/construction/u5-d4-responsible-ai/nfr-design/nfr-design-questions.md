---
title: "U5 D4 NFR Design 질문"
domain: "D4"
unit: "u5-d4-responsible-ai"
level: "beginner"
status: "draft"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html"
source_checked: "2026-09-04"
---

# U5 D4 NFR Design 질문

이 질문지는 U5를 실행 기능이 없는 정적 Markdown·JSON 패키지로 유지하면서, 보안·추적성·민감정보 비수집 결정을 고정하기 위한 것이다. 답변이 없는 항목은 현재 승인된 요구사항과 기술 결정에 따라 설계하고, 불확실한 연결은 `Deferred`로 남긴다.

## Q1. 정적 no-runtime 경계

U5가 실제 모델 평가, Amazon Bedrock Guardrails 호출, 사용자 피드백 수집, 정책 집행, API·DB·AWS 계정·credentials·배포·실행 코드를 만들지 않는다는 경계를 어떻게 유지할까요? 이 답은 보안 설계의 적용 대상과 해당 없음 대상을 결정한다.

- A. 현재 요구사항 그대로 유지하고 실행형 예제는 모두 개념 설명과 의사코드 수준에서도 제외한다.
- B. 실행형 코드는 제외하되 서비스 호출 모양을 보여 주는 15줄 이하의 비실행 의사코드만 허용한다.
- C. 학습자 로컬 실행 예제를 추가한다.
- D. AWS 계정 없는 모의 실행기를 추가한다.
- E. 경계를 더 좁히거나 넓힌다.
- X. Other (please specify)

[Answer]:

## Q2. 합성 책임 있는 AI 사례

편향, 공정성, 포용성, 안전성, 진실성, 투명성·설명 가능성을 설명할 때 실제 개인·집단·민감 속성을 식별하거나 평가하지 않도록 어떤 사례 원칙을 적용할까요? 사례는 초보자가 판단 기준을 연습하는 데 사용된다.

- A. 모든 사례를 식별자·계정·건강·인종·성별 데이터가 없는 합성 학습 사례로 작성한다.
- B. 공개된 실제 사례를 요약해 사용한다.
- C. 실제 데이터를 익명화해 사용한다.
- D. 사례를 최소화하고 정의·비교만 제공한다.
- E. 특정 사례 유형을 금지하거나 추가한다.
- X. Other (please specify)

[Answer]:

## Q3. U1 source crosswalk와 기준선 추적성

U1의 source crosswalk가 아직 채워지지 않은 상태에서 D4 문서가 시험 기준선과 공식 출처를 어떻게 참조해야 할까요? `source_id`, `baseline_id`, `revision_title`, source type, parent topic, domain, checked date, access status, linked-document set 및 사용 URL 집합 비교 evidence가 완성되기 전의 처리 방식이 필요하다.

- A. 현재처럼 필요한 연결을 설계하고 실제 U1 population 전까지 관련 coverage를 `Deferred`로 둔다.
- B. U1 crosswalk가 완성될 때까지 D4 문서 생성을 중단한다.
- C. 문서별 URL만 기록하고 crosswalk 연결은 생략한다.
- D. 확인되지 않은 연결도 우선 `verified`로 표시한다.
- E. 다른 보류 기준을 사용한다.
- X. Other (please specify)

[Answer]:

## Q4. Content entity stable ID와 정·역방향 참조

책임 원칙(`PR-D4-<slug>`), 위험(`RISK-D4-<slug>`), 출처(`SRC-<slug>`), 학습 문서(`LD-d4-<slug>`), 용어(`TERM-d4-<slug>`)의 content entity schema가 아직 채워지지 않은 상태에서 어떤 계약을 적용할까요? 각 항목의 `target_path`, `forward_refs`, `reverse_refs`와 중복·고아 검사가 핵심이다.

- A. ID 형식·소유 파일·정·역방향 필드를 설계에 고정하고 실제 population 전까지 관련 coverage를 `Deferred`로 둔다.
- B. 문서가 먼저 생성된 뒤 ID를 나중에 부여한다.
- C. 문서 ID만 유지하고 원칙·위험·출처·용어 ID는 생략한다.
- D. 정방향 링크만 검사한다.
- E. 다른 stable ID 또는 참조 규칙을 사용한다.
- X. Other (please specify)

[Answer]:

## Q5. 공식 범위와 실무 확장

Amazon Bedrock Guardrails, 모델 평가, 지속 가능성, 조직 정책·규정 사례를 AIF-C01 공식 범위와 혼동하지 않도록 어떤 표지를 사용해야 할까요? 확인되지 않은 정책·규정·서비스 기능은 `확인 필요`로 남겨야 한다.

- A. 공식 시험 범위, 실무 확장, 학습자용 합성 해설을 별도 섹션과 상태로 구분한다.
- B. 관련성이 높으면 공식 범위로 함께 설명한다.
- C. 실무 확장을 모두 제거한다.
- D. 정책·규정 사례만 `확인 필요`로 두고 서비스 기능은 확정한다.
- E. 다른 범위 표지를 사용한다.
- X. Other (please specify)

[Answer]:

## Q6. 중앙 glossary와 U7 handoff

U5가 4주 일정이나 학습자 성과를 저장하지 않고, D4 용어 inventory와 `TERM-d4-<slug>`를 U7/start content의 중앙 glossary 조립에 넘기도록 어떤 handoff 경계를 유지할까요? 이는 U5와 U7의 소유권 중복을 방지한다.

- A. U5는 D4 용어 정의·stable term ID·D5 다음 문서 링크만 제공하고, 중앙 glossary·카드·퀴즈·Anki·일정은 U7이 소유한다.
- B. U5가 중앙 glossary까지 직접 갱신한다.
- C. 용어 ID를 만들지 않고 U7이 문서에서 추출한다.
- D. U5가 학습자 일정과 성과를 저장한다.
- E. 다른 handoff 소유권을 사용한다.
- X. Other (please specify)

[Answer]:

## Q7. 민감정보 비수집

사례·문서·검사 결과에서 실제 개인·민감 속성·계정·건강·인종·성별 데이터, credentials, token, secret 및 AWS 계정 식별자를 어떻게 차단할까요? 정적 산출물에는 학습자 답안·피드백·진도 데이터도 저장하지 않는다.

- A. 합성 텍스트와 명백한 placeholder만 허용하고 수동 검토·민감정보 검사를 통과하지 못한 산출물은 통합하지 않는다.
- B. 테스트를 위해 실제 데이터를 제한적으로 허용한다.
- C. 입력은 허용하되 결과에서 마스킹한다.
- D. credentials만 금지하고 민감한 합성 사례는 허용한다.
- E. 다른 비수집·검사 기준을 사용한다.
- X. Other (please specify)

[Answer]:

## Consolidated Summary Confirmation

위 질문과 승인된 U5 NFR 요구사항·기술 결정에 따라 정적 no-runtime 경계, 합성 사례, U1 crosswalk·content entity 추적성, 공식 범위 표지, U7 glossary handoff, 민감정보 비수집을 보안 설계에 반영한다. U1 crosswalk와 content entity schema가 실제로 채워지지 않은 연결은 `Deferred`로 유지한다.

[Answer]: Looks correct
