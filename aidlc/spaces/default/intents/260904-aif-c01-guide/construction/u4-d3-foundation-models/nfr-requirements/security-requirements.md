---
title: "U4 D3 파운데이션 모델의 적용 보안 요구사항"
domain: "D3"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html"
  - "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
  - "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-injection.html"
source_checked: "2026-09-04"
---

# U4 D3 파운데이션 모델의 적용 보안 요구사항

## 목적과 범위

U4 `u4-d3-foundation-models`는 파운데이션 모델 선택·프롬프트·RAG·사용자 지정·평가를 초보자용 정적 문서로 설명한다. 모델을 호출하거나 학습시키는 애플리케이션은 만들지 않으며, 프롬프트와 평가 예시에 실제 개인정보·비밀·고객 데이터를 포함하지 않는다.

U4는 `LearningContent`의 D3 `DomainReadme`, `LearningDocument`, `GlossaryTerm`을 소유한다. 기준선·출처의 canonical 계약은 U1이 소유하고 U4는 참조만 한다.

## 적용 범위 표지

- **시험 범위**: FM 애플리케이션 설계, 프롬프트 엔지니어링, 훈련·미세 조정, 성능 평가 관련 설명이다.
- **실무 확장**: `AIF-C01-D3-T<n>`를 먼저 제시한 뒤 RAG 저장소, Amazon Bedrock Prompt management·Guardrails·모델 평가 등 서비스 선택 단서를 설명한다. 구현 절차나 최신 기능을 출제 범위로 단정하지 않는다.
- **학습자용 해설**: 프롬프트 공격·환각·평가 지표 예시는 합성 예시로 만들며 원문을 통째로 복사하지 않는다.

## 단계 upstream 계약과 적용성

- `functional-spec`: 실행형 FM 애플리케이션·API가 없는 packaging Unit이므로 별도 기능 명세는 `N/A`다. Unit 계약과 승인된 requirements로 범위를 확인한다.
- `rules`: 정적 문서·출처 추적·초보자 품질 규칙은 `OK`로 적용하고 런타임·배포 규칙은 해당 없음이다.
- `requirements`: 승인된 `requirements.md`를 기능·비기능 기준으로 직접 소비한다.

## 보안 요구사항

| ID | 요구사항 | 검증 증거 | 관련 upstream |
|---|---|---|---|
| NFR1.1 | FM·prompt·RAG·fine-tuning·evaluation을 최초 등장 시 한국어와 영어로 설명하고, 초보자 예시를 포함한다. | 초보자 검토 | NFR1; AC2.1.1 |
| NFR2.1 | 문서 구조와 비교표는 일반 Markdown에서 읽히며, 모델 흐름을 이미지 없이도 이해할 텍스트 설명을 제공한다. | required-sections·모바일 검토 | NFR2; AC2.1.2, AC2.1.5 |
| NFR2.2 | 프롬프트·RAG 흐름 그림을 사용하면 alt text와 한국어 텍스트 fallback을 함께 둔다. | 접근성·fallback 검사 | NFR2, NFR8 |
| NFR3.1 | D3 문서 ID와 U1의 `AIF-C01-D3-T<n>` 기준선 ID를 안정적으로 유지하고 재번호화하지 않는다. | ID·중복 검사 | NFR3; FR1.1, FR1.3 |
| NFR3.2 | 모델 선택·프롬프트·평가 문서는 기준선·출처와 양방향으로 추적된다. | traceability·링크 검사 | NFR3; FR1.3, FR6.2 |
| NFR4.1 | 모델명·기능·가격·리전·할당량을 설명할 때 공식 URL·제목·확인일·상태를 함께 표시한다. | front matter·registry 대조 | NFR4; FR5.1 |
| NFR4.2 | 확인되지 않은 모델 기능이나 수치는 `확인 필요`로 남기고 `verified` 문서에 확정 사실처럼 쓰지 않는다. | 보류 상태 검사 | NFR4; FR5.2, FR5.3 |
| NFR5.1 | 문서와 디렉터리는 규칙에 맞고 이전·다음 문서 및 용어 연결을 제공한다. | 경로·링크 검사 | NFR5; FR2.2, FR2.3 |
| NFR6.1 | Markdown·JSON을 strict UTF-8과 결정적 순서로 저장한다. | UTF-8·JSON 검사 | NFR6; FR6.3 |
| NFR7.1 | 프롬프트 예시에 이름·이메일·계정·토큰·API key·비밀·실제 고객 데이터를 사용하지 않는다. | 민감정보 검사 | NFR7; FR6.4 |
| NFR7.2 | 모델 호출·fine-tuning job·벡터 DB·사용자 프롬프트 업로드·답안 저장을 구현하지 않는다. | 범위·의존성 점검 | NFR7; FR3.1, FR4.5 |
| NFR8.1 | 공식 범위와 RAG·prompt injection·서비스 비교 실무 확장을 섹션별로 구분한다. | 범위 표지·baseline 검사 | NFR8; FR2.6 |
| NFR8.2 | AWS 공식 문서는 한국어 학습 목적에 맞게 요약하고 문서 끝에 링크·제목·확인일을 남긴다. | 출처 검토 | NFR8; FR5.4 |
| NFR9.1 | D3는 4주 경로·점수·학습자 상태를 저장하지 않고 D4 다음 문서 링크를 제공한다. | Unit 책임·링크 검사 | NFR9; FR3.1 |

## 프롬프트와 예시의 안전 경계

1. 예시 입력은 합성 텍스트만 사용하고 실제 개인·조직·계정·비밀을 넣지 않는다.
2. 프롬프트 injection, 민감정보 노출, 환각은 위험 설명으로 다루되 공격 자동화 절차를 제공하지 않는다.
3. 모델 평가 예시는 정답 데이터나 고객 대화를 저장하지 않고 개념·판단 기준만 보여 준다.
4. 모델·서비스 최신 기능은 공식 출처 상태를 확인한 뒤 문서 상태와 별도로 기록한다.

## 해당 없음으로 기록하는 보안 항목

| 항목 | U4 판정 | 근거 |
|---|---|---|
| FM inference/training runtime | 해당 없음 | 모델 호출·훈련·미세 조정 작업을 실행하지 않는다. |
| API·인증·인가·세션 | 해당 없음 | 실행 서비스와 사용자 계정이 없다. |
| 벡터 DB·데이터 저장 | 해당 없음 | RAG·임베딩은 설명 대상이며 실제 데이터 저장이 없다. |
| IAM·KMS·Secrets Manager | 해당 없음 | AWS 계정·키·secret·권한을 생성하지 않는다. |
| 네트워크·WAF·컨테이너 | 해당 없음 | 장기 실행 진입점이 없다. |
| 배포·가용성·재해 복구 | 해당 없음 | 정적 파일 패키지이며 서비스 SLO가 없다. |

## 내부 연결과 다음 문서

- D3 진입점: [D3 README](../../../../../../../../docs/03-foundation-models/README.md)
- 선수 문서: [D2 README](../../../../../../../../docs/02-generative-ai/README.md)
- 다음 도메인: [D4 README](../../../../../../../../docs/04-responsible-ai/README.md)
- 중앙 glossary가 없으므로 D3 용어 inventory를 임시 연결 대상으로 남긴다.
- 승인된 요구사항: [requirements.md](../../../inception/requirements-analysis/requirements.md)
- U4 Unit 계약: [unit-of-work.md](../../../inception/units-generation/unit-of-work.md)

## 핵심 정리

U4의 보안 요구사항은 실제 모델을 보호하는 런타임 설정이 아니라, FM 적용 지식을 안전하게 설명하는 정적 콘텐츠 경계다. 합성 예시·공식 출처·범위 표지·보류 상태·UTF-8을 지키고 실제 프롬프트·데이터·비밀을 저장하지 않는다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [콘텐츠 도메인 3: 파운데이션 모델의 적용](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html) — D3 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [Prompt engineering guidelines](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [Prompt injection](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-injection.html) — 보안 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [source-registry.yaml](../../../../../../../../sources/source-registry.yaml) — canonical 출처 등록부, 확인일: 2026-09-04

## Assumptions & Open Questions

- U1의 D3 기준선 revision과 모델별 최신 사실은 후속 출처 확인 전까지 확정하지 않는다.
- 중앙 glossary 부재는 후속 Unit에서 해결할 open issue다.
- 모델 서비스·가격·리전·할당량은 각 콘텐츠 문서 작성 시 다시 확인한다.

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-04T21:32:21Z
**Iteration:** 2
**Request Challenge:** review:4f5869b3b29a649c0c436554f9851ce7

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|

발견된 Critical, Major 또는 Minor architectural finding이 없습니다. U4의 static packaging, no-runtime, no-credentials 경계는 요구사항 및 Unit 계약과 일치합니다.

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-required-sections.ts` | PASS (`security h2_count=11`, `tech-stack h2_count=11`) | 두 NFR 산출물의 필수 구조와 단일 Review 섹션이 유효합니다. |
| `aidlc-sensor-upstream-coverage.ts` | PASS (`unreferenced=[]`) | `functional-spec`, `rules`, `requirements` upstream이 두 산출물에서 소비됩니다. |
| `aidlc-sensor-traceability.ts` | PASS (`gaps=[]`, `orphans=[]`, `missing_from_table=[]`, `missing_from_upstream_ids=[]`, `invalid_entries=[]`, `invalid_targets=[]`) | U4의 선언 ID와 coverage target이 유효합니다. |
| `aidlc-validate.ts outputs construction` | PASS | Construction 단계 선언 산출물이 누락되지 않았습니다. |
| UTF-8·민감정보 검사 | PASS (`0 matches`) | 세 산출물이 UTF-8로 읽히며 credential·token·PII 패턴이 없습니다. |

### Summary

U4의 보안 요구사항과 기술 결정은 `LearningContent` 정적 문서 패키지 경계, 공식 출처·보류 상태, 합성 예시, no-runtime/no-credentials 제약 및 U1·U7·U8 계약과 정합적입니다. 구현자는 런타임 서비스, API, 데이터 저장소 또는 자격 증명을 추가하지 않고 정의된 산출물을 구현할 수 있습니다.
