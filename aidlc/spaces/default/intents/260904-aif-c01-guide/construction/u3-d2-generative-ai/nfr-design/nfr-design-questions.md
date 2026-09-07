---
title: "U3 D2 GenAI의 기초 NFR 설계 질문"
unit: "u3-d2-generative-ai"
stage: "nfr-design"
status: "draft"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
  - "https://aws.amazon.com/bedrock/"
source_checked: "2026-09-04"
---

# U3 D2 GenAI의 기초 NFR 설계 질문

이 질문지는 실행형 GenAI 애플리케이션이 아닌 정적 학습 문서 Unit의 보안 설계 결정을 확인하기 위한 것이다. 각 질문은 현재 상위 산출물의 결정을 재확인하며, 답변이 채워지기 전까지 설계 상태는 `draft`다.

## Q1. 정적 패키지 보안 경계

U3가 저장·전달하는 것은 한국어 Markdown, 용어 inventory, 추적성 JSON뿐이다. 모델 호출·프롬프트 제출·API·세션·DB/vector store·AWS 계정·credentials·배포·실행 코드를 경계 밖으로 유지하는 결정에 동의하는가?

- A. 동의한다. 정적 파일과 로컬 품질 검사만 허용한다.
- B. 일부 실행형 기능을 추가한다. 추가할 기능과 보안 범위를 적는다.
- X. Other (please specify)

[Answer]: 

## Q2. U1 manifest handoff와 추적성

U1이 소유하는 `sources/content-traceability.yaml`과 `source-registry.yaml`이 완성되기 전에는 U3 문서·용어의 기준선·출처 정·역방향 연결을 `Deferred`로 유지하고, U3가 U1 ID·revision·status를 복사해 재정의하지 않는 결정에 동의하는가?

- A. 동의한다. U3는 U1 계약을 소비하고 manifest 미확정 연결만 `Deferred`로 둔다.
- B. U3가 기준선·출처 manifest를 직접 소유한다.
- X. Other (please specify)

[Answer]: 

## Q3. D2 문서·용어 ID와 중앙 glossary 소유권

U3는 `D2-README`, `LD-d2-<slug>`, `TERM-d2-<slug>` 안정 ID와 D2 terminology inventory를 제공하고, 중앙 `docs/glossary.md`의 조립·갱신은 U7/start content가 소유하는 결정에 동의하는가?

- A. 동의한다. U3는 ID와 handoff를 제공하고 중앙 glossary를 직접 편집하지 않는다.
- B. U3가 중앙 glossary까지 소유한다.
- X. Other (please specify)

[Answer]: 

## Q4. 출처 상태·문서 상태·범위 표지

공식 시험 범위, 실무 확장, 학습자용 해설을 섹션에서 분리하고, 출처의 `blocked`·`확인 필요` 상태와 문서의 `draft`·`review`·`verified` 상태를 서로 혼동하지 않는 결정에 동의하는가?

- A. 동의한다. 확인되지 않은 사실은 추측하지 않고 보류한다.
- B. 확인되지 않은 서비스·모델 사실도 학습 편의를 위해 확정해 기록한다.
- X. Other (please specify)

[Answer]: 

## Q5. 민감정보 비수집

U3가 학습자 이름·답안·진도·PII·자격 증명·token·API key·실제 계정 식별자를 입력·저장·전송하지 않고, 검사도 로컬 읽기 전용으로만 수행하는 결정에 동의하는가?

- A. 동의한다. 민감정보와 원격 전송을 모두 금지한다.
- B. 학습자 데이터 또는 원격 저장을 추가한다. 대상과 보안 요구사항을 적는다.
- X. Other (please specify)

[Answer]: 

## Consolidated Summary Confirmation

이 질문지의 결정 요약은 다음과 같다.

- U3의 보안 경계는 실행형 애플리케이션이 아닌 정적 Markdown·JSON 패키지다.
- U1의 기준선·출처 manifest는 U1이 소유하고, U3는 안정 ID와 정·역방향 handoff를 소비한다.
- D2 문서·용어 ID는 U3가 소유하며 중앙 `docs/glossary.md`의 조립·갱신은 U7/start content가 소유한다.
- 공식 범위·실무 확장·출처 상태·문서 상태를 분리하고 확인되지 않은 사실은 보류한다.
- 학습자 데이터·PII·credentials·token·API key와 원격 실행·전송은 도입하지 않는다.

위 요약과 상위 입력에 근거한 NFR 설계 결정을 그대로 확정할 것인지 선택한다.

A. Accept assumptions
B. Convert to follow-up questions

[Answer]: Looks correct
