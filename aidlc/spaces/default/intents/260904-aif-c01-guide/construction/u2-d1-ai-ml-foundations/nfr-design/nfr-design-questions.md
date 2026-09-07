---
title: "U2 D1 NFR 설계 질문과 Summary Confirmation"
domain: "D1"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
source_checked: "2026-09-04"
---

# U2 D1 NFR 설계 질문과 Summary Confirmation

## 이 문서에서 확인할 것

이 문서는 U2 `nfr-design`의 설계 질문 기록이다. [U2 보안 요구사항](../nfr-requirements/security-requirements.md)과 [U2 기술 결정](../nfr-requirements/tech-stack-decisions.md)을 읽은 결과, 정적 문서·출처·검사 경계에 관한 추가 설계 질문은 없다.

## 선수 지식과 한 줄 요약

선수 지식은 U2 NFR 입력 문서와 [U2 보안 설계](./security-design.md)다.

한 줄 요약: 승인된 입력 결정만으로 U2의 보안 설계를 작성할 수 있으며, 사용자에게는 설계 요약과 런타임 N/A 판정만 확인받는다.

## 질문 분석

### 추가 설계 질문

**없음.** U2는 실행형 애플리케이션이 아닌 `packaging` Unit이다. 인증, 암호화, API, DB, 네트워크, 확장성, 장애 복구 같은 런타임 보안 패턴을 선택할 입력이나 적용 대상이 없다. 승인된 입력이 정적 패키지 경계, 출처 상태 분리, 안정 ID, 결정적 로컬 검사, 민감정보 비수집을 이미 결정하므로 추가 질문 없이 설계할 수 있다.

### 조건부 입력 확인

- `functional-spec`: 서비스 동작·API가 없으므로 N/A.
- `contract-summary`: inter-unit 런타임 계약이 없으므로 N/A.
- `NFR9.1`: 4주 계획과 중앙 glossary 소유권은 후속 문서에서 확정해야 하므로 `Deferred`.
- U1 canonical baseline manifest와 공식 기준선 행은 확정 전까지 `Deferred` 또는 `확인 필요`로 유지.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 시험 범위 입력 출처, 확인일: 2026-09-04, 상태: `downloaded`.
- [콘텐츠 도메인 1: AI 및 ML의 기초](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html) — D1 입력 출처, 확인일: 2026-09-04, 상태: `downloaded`.
- [U2 보안 요구사항](../nfr-requirements/security-requirements.md) — 질문 생성에 사용한 입력, 확인일: 2026-09-04, 상태: `review`.
- [U2 기술 결정](../nfr-requirements/tech-stack-decisions.md) — 질문 생성에 사용한 입력, 확인일: 2026-09-04, 상태: `review`.

## Assumptions & Open Questions

- 사용자의 summary confirmation 전에는 승인된 설계로 상태를 승격하지 않는다.
- U1 canonical baseline manifest, 공식 기준선 ID, 중앙 glossary 소유권은 입력 문서의 미해결 조건으로 유지한다.
- 입력 문서에 없는 공식 URL이나 기능 사실은 추가하지 않았다.

## Review

**상태:** summary confirmation 대기.

추가 설계 질문 없음은 승인된 입력의 적용성 판정에 따른 것이다. reviewer 요청, `REVIEW_COMPLETED`, `UNIT_COMPLETED`, `report --result revised`는 실행하지 않았다.

## 연결된 산출물

- [U2 보안 설계](./security-design.md)
- [U2 추적성](./traceability.json)

## Consolidated Summary Confirmation

다음 설계 요약을 확인해 주세요.

1. U2 보안은 실행형 보안 기능이 아니라 **정적 문서 무결성**으로 구현한다: UTF-8 Markdown, YAML front matter, 저장소 상대 링크, 안정 ID, 공식 출처·범위·상태 표지, 결정적 로컬 검사.
2. 학습자 PII, 답안·진도, 자격 증명, token, API key, 실제 AWS 계정 식별자를 기록하지 않으며, API·세션·DB·AWS 계정·배포·새 dependency·실행 코드는 U2에서 N/A로 둔다.
3. `blocked`/`확인 필요` 출처는 문서를 `verified`로 승격할 수 없고, U1 기준선과 `docs/glossary.md`의 미확정 연결은 확인 전까지 보류한다.
4. 사용자 확인 전에는 reviewer 요청과 workflow 완료·revision 보고를 수행하지 않는다.

**질문:** 위 요약과 [U2 보안 설계](./security-design.md), [U2 추적성](./traceability.json)의 범위·N/A·Deferred 판정을 승인합니까? 변경이 필요하면 수정할 항목을 적어 주세요.

[Answer]: Looks correct
