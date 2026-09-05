---
title: "U6 D5 보안·규정 준수·거버넌스 보안 요구사항"
domain: "D5"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html"
  - "https://aws.amazon.com/compliance/shared-responsibility-model/"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"
source_checked: "2026-09-04"
---

# U6 D5 보안·규정 준수·거버넌스 보안 요구사항

## 목적과 범위

U6 `u6-d5-security-compliance-governance`는 AI 솔루션의 보안, 규정 준수, 거버넌스 판단 단서를 초보자용 정적 문서로 설명한다. IAM 정책이나 암호화를 실제로 구성하지 않으며, 법률 자문·규정 인증·AWS 계정 운영을 제공하지 않는다.

U6는 `LearningContent`의 D5 README·개념 문서·용어를 소유한다. 기준선과 출처의 canonical 소유권은 U1에 있다.

## 적용 범위 표지

- **시험 범위**: AI 시스템 보안, AI 시스템 거버넌스와 규정 준수에 해당하는 설명이다.
- **실무 확장**: `AIF-C01-D5-T<n>`를 먼저 제시한 뒤 IAM, 암호화, Amazon Macie, AWS PrivateLink, 공동 책임 모델, Guardrails·AgentCore Identity 등의 AWS 관점을 설명한다. 특정 법률 준수나 운영 설정을 시험 범위로 단정하지 않는다.
- **학습자용 해설**: 권한·데이터·공동 책임 예시는 합성 시나리오로 작성하며 자격 증명과 실제 계정 식별자를 사용하지 않는다.

## 단계 upstream 계약과 적용성

- `functional-spec`: 실행형 보안 기능·API가 없는 packaging Unit의 별도 기능 명세는 `N/A`다.
- `rules`: 정적 문서·출처 추적·초보자 품질 규칙은 `OK`이며 IAM·배포 운영 규칙은 개념 설명 범위를 넘지 않는다.
- `requirements`: 승인된 `requirements.md`를 직접 소비한다.

## 보안 요구사항

| ID | 요구사항 | 검증 증거 | 관련 upstream |
|---|---|---|---|
| NFR1.1 | 보안·규정 준수·거버넌스 용어를 한국어와 영어로 병기하고 초보자용 합성 사례를 제공한다. | 초보자 검토 | NFR1; AC2.1.1 |
| NFR2.1 | 보안 선택 기준과 비교표가 일반 Markdown·모바일에서 읽히며 텍스트로도 이해된다. | Markdown·모바일 검사 | NFR2; AC2.1.2, AC2.1.5 |
| NFR2.2 | 공동 책임 모델·데이터 흐름 도표에는 alt text와 한국어 텍스트 fallback을 제공한다. | 접근성·fallback 검사 | NFR2; NFR8 |
| NFR3.1 | D5 문서와 `AIF-C01-D5-T<n>` 기준선 ID를 안정적으로 관리하고 임의 재번호화하지 않는다. | ID·중복 검사 | NFR3; FR1.1, FR1.3 |
| NFR3.2 | 보안 개념·AWS 서비스·출처·문서 사이의 양방향 연결을 추적 JSON으로 보존한다. | traceability·링크 검사 | NFR3; FR1.3, FR6.2 |
| NFR4.1 | IAM·암호화·서비스·규정 관련 외부 사실에는 공식 URL·제목·확인일·상태를 표시한다. | front matter·registry 대조 | NFR4; FR5.1 |
| NFR4.2 | 확인되지 않은 규정·리전·서비스 기능·할당량을 확정하지 않고 `확인 필요`와 후속 조치를 남긴다. | 보류 상태 검사 | NFR4; FR5.2, FR5.3 |
| NFR5.1 | 파일·디렉터리 규칙과 개념 단위 경계를 지키고 D4 선수·다음 문서·용어 링크를 둔다. | 경로·링크 검사 | NFR5; FR2.1, FR2.2 |
| NFR6.1 | Markdown·JSON은 strict UTF-8·결정적 ID·배열 순서를 사용한다. | 인코딩·parse 검사 | NFR6; FR6.3 |
| NFR7.1 | 문서·예시·검사 기록에 실제 계정 ID·access key·token·secret·PII·결제·건강정보를 기록하지 않는다. | 민감정보 패턴·수동 검토 | NFR7; FR6.4 |
| NFR7.2 | IAM role/policy·KMS key·Macie scan·PrivateLink·Guardrails를 실제 생성·호출·저장하지 않는다. | 코드·의존성·범위 점검 | NFR7; FR3.1, FR4.5 |
| NFR8.1 | 공식 시험 범위와 운영·법률·규제 사례인 실무 확장을 섹션 단위로 명확히 구분한다. | 범위 표지 검사 | NFR8; FR2.6 |
| NFR8.2 | 규정 원문을 통째로 복사하거나 법률 자문으로 표현하지 않고 공식 AWS 자료를 한국어로 재구성한다. | 출처·표현 검토 | NFR8; FR5.4 |
| NFR9.1 | U6는 4주 일정·점수·계정 데이터를 저장하지 않고 D5를 최종 평가·복습 자료로 연결한다. | Unit 책임·링크 검사 | NFR9; FR3.1 |

## 보안·규정 설명의 안전 경계

1. IAM·암호화·공동 책임 모델은 선택 판단을 돕는 개념으로 설명하고 실행 명령이나 계정 설정을 요구하지 않는다.
2. 규정 준수는 적용 가능성·공식 확인 필요성을 설명하며 법률 자문, 인증, 보증을 하지 않는다.
3. 실제 자격 증명·계정 식별자·PII를 예시·로그·CSV·문서에 넣지 않는다.
4. AWS 기능·리전·할당량처럼 변하는 사실은 공식 출처와 확인일을 기록하고 불확실하면 보류한다.

## 해당 없음으로 기록하는 보안 항목

| 항목 | U6 판정 | 근거 |
|---|---|---|
| IAM role/policy 실행 | 해당 없음 | IAM은 선택 개념이며 실제 계정 변경이 없다. |
| KMS·Secrets Manager·Macie 호출 | 해당 없음 | 키·secret·스캔·데이터를 생성하지 않는다. |
| API·인증·인가·네트워크 | 해당 없음 | 실행 서비스와 사용자 계정이 없다. |
| 규정 인증·법률 자문 | 해당 없음 | 시험 학습용 요약이며 준수 보증이 아니다. |
| 로그·DB·학습자 데이터 | 해당 없음 | 정적 콘텐츠만 저장한다. |
| 배포·가용성·재해 복구 | 해당 없음 | shared static package다. |

## 내부 연결과 다음 문서

- D5 진입점: [D5 README](../../../../../../../../docs/05-security-compliance/README.md)
- 선수 문서: [D4 README](../../../../../../../../docs/04-responsible-ai/README.md)
- 다음 단계: [평가·복습 Unit 계약](../../../inception/units-generation/unit-of-work.md)의 U7
- 중앙 glossary가 없으므로 D5 용어 inventory 연결을 임시 유지한다.
- 승인된 요구사항: [requirements.md](../../../inception/requirements-analysis/requirements.md)
- U6 Unit 계약: [unit-of-work.md](../../../inception/units-generation/unit-of-work.md)

## 핵심 정리

U6의 보안은 실제 AWS 보안 구성을 수행하는 것이 아니라, 보안·규정·거버넌스 개념을 정확한 범위와 비보증 표현으로 설명하고 민감정보·자격 증명을 정적 자료에 넣지 않는 것이다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [콘텐츠 도메인 5: AI 솔루션의 보안·규정 준수 및 거버넌스](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html) — D5 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AWS 공동 책임 모델](https://aws.amazon.com/compliance/shared-responsibility-model/) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [IAM 소개](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [source-registry.yaml](../../../../../../../../sources/source-registry.yaml) — canonical 출처 등록부, 확인일: 2026-09-04

## Assumptions & Open Questions

- D5 기준선 revision과 규정별 적용 여부는 U1·공식 자료 확인 전까지 확정하지 않는다.
- 중앙 glossary와 평가 자료는 후속 Unit에서 연결한다.
- 이 문서는 법률 자문·규정 인증·보안 구성 절차가 아니다.
