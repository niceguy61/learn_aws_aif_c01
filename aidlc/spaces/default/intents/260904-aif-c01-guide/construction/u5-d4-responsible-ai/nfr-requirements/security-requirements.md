---
title: "U5 D4 책임 있는 AI 보안 요구사항"
domain: "D4"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html"
  - "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"
  - "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
source_checked: "2026-09-04"
---

# U5 D4 책임 있는 AI 보안 요구사항

## 목적과 범위

U5 `u5-d4-responsible-ai`는 책임 있는 AI의 원칙·위험·편향·공정성·투명성·설명 가능성을 초보자용 정적 콘텐츠로 설명한다. 실제 모델 평가, 사용자 데이터 수집, 정책 집행 시스템은 만들지 않는다.

U5는 `LearningContent`의 D4 README·개념 문서·용어를 소유한다. 공식 기준선과 source registry는 U1이 소유하고 U5는 참조한다.

## 적용 범위 표지

- **시험 범위**: 책임 있는 AI 시스템 개발, 투명하고 설명 가능한 모델 항목에 해당하는 내용이다.
- **실무 확장**: `AIF-C01-D4-T<n>`를 먼저 제시한 뒤 Amazon Bedrock Guardrails, 모델 평가, 지속 가능성·조직 정책 사례를 학습자 판단용으로 설명한다. 규정·정책 사례를 공식 출제 항목으로 단정하지 않는다.
- **학습자용 해설**: 편향·공정성·포용성·안전성·진실성의 예시는 합성된 교육 사례다.

## 단계 upstream 계약과 적용성

- `functional-spec`: 실행형 책임 있는 AI 기능·API가 없는 packaging Unit이므로 별도 명세는 `N/A`다.
- `rules`: 정적 문서·출처 추적·초보자 품질 규칙은 `OK`로 적용한다. 런타임 정책 집행 규칙은 해당 없음이다.
- `requirements`: 승인된 `requirements.md`를 기능·비기능 기준으로 직접 소비한다.

## 보안 요구사항

| ID | 요구사항 | 검증 증거 | 관련 upstream |
|---|---|---|---|
| NFR1.1 | 책임 있는 AI 용어를 한국어와 영어로 병기하고 비전문가가 이해할 수 있는 합성 사례를 제공한다. | 초보자 검토 | NFR1; AC2.1.1 |
| NFR2.1 | 제목·링크·표가 일반 Markdown에서 읽히고 색상·이미지 하나에 의미를 의존하지 않는다. | Markdown·접근성 검사 | NFR2; AC2.1.2, AC2.1.5 |
| NFR2.2 | 공정성·위험 판단 도표는 alt text·텍스트 대체 설명을 함께 제공한다. | fallback·alt text 점검 | NFR2; NFR8 |
| NFR3.1 | D4 문서와 `AIF-C01-D4-T<n>` 기준선 ID를 안정적으로 유지하고 임의 변경하지 않는다. | ID·중복 검사 | NFR3; FR1.1, FR1.3 |
| NFR3.2 | 책임 원칙·위험·출처·D4 학습 문서는 안정 ID와 소유 파일을 가지며 `PR-D4-<slug>`, `RISK-D4-<slug>`, `SRC-<slug>`, `LD-d4-<slug>`, `TERM-d4-<slug>` 형식으로 기록한다. 각 항목은 `forward_refs`와 `reverse_refs`를 가지며 `traceability.json`의 content-level contract로 정·역방향 연결을 검증한다. | content entity schema·traceability·링크 검사 | NFR3; FR1.3, FR6.2 |
| NFR4.1 | 책임 있는 AI 사실과 서비스 설명에는 U1 crosswalk의 `source_id`, `baseline_id`, `revision_title`, source type, parent topic, domain, checked date, access status, linked-document set과 사용 URL 집합 비교 evidence를 함께 표시한다. 문서 상태와 출처 상태를 혼용하지 않는다. | front matter·registry crosswalk·URL-set 비교 | NFR4; FR5.1, AC5.1.1 |
| NFR4.2 | 확인되지 않은 정책·규정·서비스 기능은 `확인 필요`로 표시하고 `verified`로 승격하지 않는다. | 상태·보류 검사 | NFR4; FR5.2, FR5.3 |
| NFR5.1 | 파일명 규칙과 개념 단위 경계를 지키며 선수·다음 문서·용어 링크를 제공한다. | 경로·링크 검사 | NFR5; FR2.1, FR2.2 |
| NFR6.1 | 모든 Markdown·JSON은 strict UTF-8과 결정적 순서를 사용한다. | 인코딩·parse 검사 | NFR6; FR6.3 |
| NFR7.1 | 사례에 실제 개인·민감 속성·계정·건강·인종·성별 데이터 또는 식별자를 넣지 않는다. | 민감정보·수동 검토 | NFR7; FR6.4 |
| NFR7.2 | 실제 모델 평가·감사·사용자 피드백 수집·정책 집행·답안 저장을 구현하지 않는다. | 범위·의존성 검사 | NFR7; FR3.1, FR4.5 |
| NFR8.1 | 시험 범위와 규정·조직 정책·서비스 사용 사례인 실무 확장을 섹션별로 구분한다. | 범위 표지 검사 | NFR8; FR2.6 |
| NFR8.2 | 공식 원문을 통째로 복사하지 않고 개념을 한국어로 재구성하며 출처를 남긴다. | 출처·인용 검토 | NFR8; FR5.4 |
| NFR9.1 | U5는 4주 일정과 학습자 성과를 저장하지 않는다. 일정·중앙 glossary 조립은 U7/start content가 소유하며, U5는 D4 README에서 D5 다음 문서와 D4 terminology inventory·안정 term ID를 handoff한다. | Unit handoff·소유권·링크 검사 | NFR9; FR3.1 |

## 사례·정책 설명의 안전 경계

1. 모든 사례는 합성된 학습 사례이며 특정 개인·집단·조직을 평가하거나 분류하지 않는다.
2. 공정성·편향·설명 가능성은 교육용 판단 기준으로 설명하고 법률 자문이나 인증을 약속하지 않는다.
3. Amazon Bedrock Guardrails 등 서비스 기능은 공식 출처 상태가 확인된 범위만 설명하고, 미확인 기능은 보류한다.
4. 책임 있는 AI의 원칙과 조직 정책 구현은 구분하며, 정책 예시는 `실무 확장`으로 표시한다.

## 해당 없음으로 기록하는 보안 항목

| 항목 | U5 판정 | 근거 |
|---|---|---|
| 모델 평가 실행·데이터 수집 | 해당 없음 | 실제 입력·출력·평가 데이터를 다루지 않는다. |
| 사용자 인증·인가·API·세션 | 해당 없음 | 실행 애플리케이션이 없다. |
| IAM·KMS·Secrets Manager | 해당 없음 | AWS 계정·권한·키·secret을 사용하지 않는다. |
| 데이터베이스·로그·모니터링 | 해당 없음 | 학습자·평가 데이터를 저장하지 않는다. |
| 네트워크·WAF·배포·DR | 해당 없음 | 정적 문서 패키지다. |
| 규제 준수 보증 | 해당 없음 | 법률 자문·인증·보증을 제공하지 않는다. |

## 내부 연결과 다음 문서

- D4 진입점: [D4 README](../../../../../../../../docs/04-responsible-ai/README.md)
- 선수 문서: [D3 README](../../../../../../../../docs/03-foundation-models/README.md)
- 다음 도메인: [D5 README](../../../../../../../../docs/05-security-compliance/README.md)
- 중앙 glossary는 [U7/start content](../../../inception/units-generation/unit-of-work.md#u7--평가복습-자료)가 조립·갱신하고, U5는 D4 terminology inventory와 `TERM-d4-<slug>` handoff를 제공한다.
- 출처 crosswalk와 기준선 연결은 [U1 canonical manifest 계약](../../../inception/units-generation/unit-of-work.md#u1--기준선출처-등록)의 `source_id`·`baseline_id`·revision 필드를 소비한다.
- 승인된 요구사항: [requirements.md](../../../inception/requirements-analysis/requirements.md)
- U5 Unit 계약: [unit-of-work.md](../../../inception/units-generation/unit-of-work.md)

## 핵심 정리

U5의 보안은 책임 있는 AI 원칙을 실제 데이터·정책 집행 시스템으로 확장하지 않는 경계와, 합성 사례·공식 출처·범위 표지·비보증 표현을 지키는 것이다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [콘텐츠 도메인 4: 책임 있는 AI에 대한 가이드라인](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html) — D4 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [Amazon Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [Amazon Bedrock model evaluation](https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [source-registry.yaml](../../../../../../../../sources/source-registry.yaml) — canonical 출처 등록부, 확인일: 2026-09-04

## Assumptions & Open Questions

- D4 기준선 revision이 U1에서 확정되기 전까지 문서 상태는 `review`다.
- 규정·정책 사례는 공식 시험 범위와 분리하고 최신성 확인 전에는 확정하지 않는다.
- 중앙 glossary는 후속 단계에서 생성·연결한다.
## Review

**Request Challenge:** review:c8ac72715b93dc1abf4a4af6f72df02b
**Verdict:** NOT-READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-05T01:49:13Z
**Iteration:** 1

### Findings

| ID | Severity | Finding | Status |
|---|---|---|---|
| R-01 | Major | U1 source crosswalk의 필수 metadata와 사용 URL 집합 비교 evidence가 구현 계약으로 충분히 구체화되지 않았다. | Unresolved |
| R-02 | Major | 책임 원칙·위험·출처·학습 문서의 content-level 정·역방향 링크 schema와 검증 규칙이 없다. | Unresolved |
| R-03 | Major | U5의 4주 일정 의무와 D4 handoff의 소유자·범위가 분리되어 있지 않다. | Unresolved |
| R-04 | Minor | acceptance criteria의 provenance를 위한 `user-stories/stories.md` source path가 누락되어 있다. | Unresolved |
| R-05 | Minor | 결정적 JSON 직렬화의 key·array·encoding·validation 규칙이 정의되지 않았다. | Unresolved |

### Summary

정적 packaging 및 비수집 경계는 일관되지만, 위 계약 gap이 남아 있어 U5는 NOT-READY다.
