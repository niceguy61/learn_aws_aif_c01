---
title: "U2 D1 AI 및 ML의 기초 보안 설계"
domain: "D1"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
source_checked: "2026-09-04"
---

# U2 D1 AI 및 ML의 기초 보안 설계

## 이 문서에서 결정하는 것

이 문서는 `u2-d1-ai-ml-foundations` Unit의 보안 경계를 설계한다. 대상은 한국어 AIF-C01 D1 학습 문서, D1 README, 용어 연결, 출처와 추적성 메타데이터다.

결론은 **실행형 보안 기능이 아니라 정적 문서 무결성·출처 신뢰성·민감정보 비수집을 보안 통제로 사용한다**는 것이다. 따라서 인증, API 보호, 데이터베이스 암호화 같은 런타임 설계는 이 Unit에 적용되지 않는다.

## 선수 지식과 한 줄 요약

선수 지식은 [U2 기술 결정](../nfr-requirements/tech-stack-decisions.md)과 [U2 보안 요구사항](../nfr-requirements/security-requirements.md)이다.

한 줄 요약: U2는 저장소 상대 링크와 안정 ID를 가진 UTF-8 Markdown 패키지이며, 공식 출처·범위 표지·검사 결과로 변경 무결성을 확인하고 학습자 데이터와 자격 증명을 저장하지 않는다.

## upstream 적용성

- `requirements`: [승인된 D1 요구사항](../../../inception/requirements-analysis/requirements.md)의 FR/NFR과 AC를 보안 설계의 기준으로 사용한다.
- `rules`: 문서 기술 규칙, 출처 조사 규칙, AIF-C01 교육 품질 규칙을 적용한다.
- `functional-spec`: 서비스 동작이나 API가 없는 `packaging` Unit이므로 별도 기능 명세는 **N/A**다. 문서 소유권과 범위는 [U2 Unit 계약](../../../inception/units-generation/unit-of-work.md)으로 확인한다.
- `contract-summary`: inter-unit 런타임 계약이 없으므로 **N/A**다. U2가 다른 Unit과 교환하는 것은 저장소 상대 링크와 안정 ID를 포함한 정적 파일 연결뿐이다.

## 보안 설계 원칙

### SD-01 정적 패키지 경계 고정

U2 산출물은 UTF-8 Markdown, YAML front matter, 결정적 JSON, 저장소 상대 링크로만 구성한다. 브라우저 전송, 사용자 인증, 세션, 답안 제출, 자동 저장, 원격 업로드, AWS 계정 호출, 실행 코드는 Unit 범위에 넣지 않는다.

이 결정은 공격 표면과 개인정보 보유 범위를 줄인다. 검사는 로컬 checkout의 파일만 읽고 외부 서비스로 프로젝트 내용이나 비밀을 전송하지 않는다.

### SD-02 출처·범위·상태를 변경 무결성의 근거로 사용

각 문서의 front matter와 끝의 `## Sources`는 입력 문서가 지정한 공식 URL, 문서 제목, 확인일을 재사용한다. 시험 범위는 AIF-C01 공식 안내서로 한정하고, 실무 확장·예시·학습자용 해설은 공식 출제 항목과 분리해 표시한다.

문서 상태(`draft|review|verified`)와 출처 상태(`discovered|downloaded|summarized|reviewed|verified|blocked`)는 별도로 관리한다. 출처가 `blocked` 또는 `확인 필요`이면 문서는 `verified`로 승격하지 않는다. U1의 canonical source registry와 기준선 ID는 U2가 복제하거나 재번호화하지 않고 상대 링크로 참조한다.

### SD-03 안정 ID와 양방향 추적성

문서, 용어, 기준선, 상세 NFR은 안정 ID를 사용한다. `traceability.json`은 모든 U2 상세 NFR을 이 문서의 설계 결정에 연결한다. 문서에서 기준선·출처로 이동하는 링크와 기준선·출처에서 문서로 돌아오는 연결을 모두 재구성할 수 있어야 하며, URL만 있거나 고아 문서인 경우 실패로 판정한다.

이 통제는 잘못된 문서가 공식 범위인 것처럼 남거나, 출처가 끊긴 설명이 검토 없이 유지되는 위험을 줄인다.

### SD-04 로컬 결정적 검증

검증은 새 dependency나 런타임을 추가하지 않고 기존 Bun 검사 경로와 표준 파싱으로 수행한다.

1. required-sections: front matter, 필수 제목, `## Sources`, `## Assumptions & Open Questions`, `## Review`를 확인한다.
2. upstream-coverage: `requirements`, `rules`, `functional-spec`의 조건부 적용을 확인한다.
3. traceability: `traceability.json`의 ID, 상태, 설계 대상, 고아와 누락을 확인한다.
4. UTF-8·상대 링크·민감정보 검사: 인코딩, 경로, 절대 로컬 경로, secret/PII 패턴을 확인한다.
5. Markdown lint와 type-check: 실행 코드가 없으므로 **N/A**로 기록한다.

같은 입력과 같은 `source_checked` 값에서는 JSON 배열 순서와 Markdown 표 행 순서를 바꾸지 않는다. 검사 실패 시 문서 상태를 `verified`로 바꾸지 않는다.

### SD-05 민감정보와 경로 격리

예시와 검사 기록에는 학습자 이름·계정·답안·진도·결제정보·건강정보·자격 증명·토큰·API key·실제 AWS 계정 식별자를 기록하지 않는다. 링크는 저장소 상대 경로만 사용하며 사용자 홈, 절대 경로, 임시 경로를 기록하지 않는다.

저장소 변경 검토와 pull request 승인을 변경 무결성 경계로 사용한다. U2에는 사용자 인증이나 애플리케이션 접근 제어를 새로 만들지 않는다.

## NFR 범주별 적용성

| 범주 | U2 판정 | 설계 근거 |
|---|---|---|
| 인증·인가 | N/A | 보호된 애플리케이션 기능이나 로그인 사용자가 없다. 저장소 접근 권한은 기존 개발 플랫폼의 책임이다. |
| 전송 중·저장 시 암호화 | N/A | U2가 네트워크 전송, DB, 파일 업로드, AWS 리소스를 구현하지 않는다. 출처 HTTPS URL은 문서 링크 메타데이터일 뿐 자체 전송 경로가 아니다. |
| API·세션·TLS 운영 | N/A | HTTP API, 세션, 토큰 발급, 서버 프로세스가 없다. |
| 입력 검증·CSRF/XSS 방어 | N/A | 사용자 입력을 받는 UI와 요청 처리기가 없다. 문서 내 링크·코드 예시는 정적 학습 내용이며 실행되지 않는다. |
| 네트워크·방화벽·WAF | N/A | 장기 실행 서비스나 네트워크 진입점이 없다. |
| 데이터베이스·검색 인덱스 | N/A | 문서·용어·추적성은 버전 관리형 Markdown/JSON이며 학습자 데이터를 저장하지 않는다. |
| 런타임 가용성·확장성·DR | N/A | 서비스 트래픽·SLO·RTO/RPO가 없고, 정적 파일의 재현성과 변경 이력이 품질 경계다. |
| 관찰 가능성 | 제한적 적용 | 서비스 metric/log/trace는 N/A다. 대신 검사 결과, 문서 상태, 출처 상태, traceability 결과를 품질 증거로 남긴다. |

## 실패·변경 시 처리

- 공식 출처 접근이 차단되거나 내용이 확인되지 않으면 내용을 추측하지 않고 source registry의 상태와 차단 사유를 따른다.
- 기준선 ID나 canonical source registry 행이 확정되지 않았으면 관련 추적성 판정은 `Deferred` 또는 `확인 필요`로 유지한다.
- 상대 링크·안정 ID·필수 섹션·민감정보 검사 중 하나라도 실패하면 해당 문서는 `verified`가 아니다.
- `docs/glossary.md`가 아직 없으면 중앙 glossary 연결은 미해결로 기록하고, 존재하지 않는 파일을 사실처럼 참조하지 않는다.
- U2 문서에는 복구 서비스나 백업 정책을 추가하지 않는다. 저장소의 기존 버전 관리와 pull request 변경 이력을 사용한다.

## 검증 증거

| 증거 | 대상 | 기대 결과 |
|---|---|---|
| required-sections | 이 문서와 질문 파일 | 필수 구조·출처·가정·검토 섹션 존재 |
| upstream-coverage | 입력 요구사항·기술 결정·Unit 계약 | 적용 upstream과 `N/A` 조건이 명시됨 |
| traceability | `traceability.json`과 14개 상세 NFR | 누락·고아·잘못된 target 없음 |
| UTF-8·상대 링크 | U2 산출물 | UTF-8, 저장소 상대 경로, 로컬 절대 경로 없음 |
| 민감정보 검사 | 본문·예시·검사 기록 | PII, token, API key, 실제 계정 식별자 없음 |
| Markdown lint/type-check | 코드 블록·실행 코드 | 실행 코드가 없으므로 N/A; Markdown 구조만 점검 |

검사는 사용자 summary confirmation 전 설계 초안의 품질 점검으로만 취급한다. 이 파일에는 reviewer 결과나 workflow 완료 판정을 기록하지 않는다.

## 핵심 정리

U2의 보안 설계는 정적 파일 경계, 공식 출처와 범위 상태 분리, 안정 ID 양방향 추적성, 로컬 결정적 검사, 민감정보 비수집으로 구성된다. 인증·API·DB·AWS 계정·배포·dependency·실행 코드는 N/A이며 이 Unit에 새로 도입하지 않는다.

## 스스로 답하는 확인 질문

1. 왜 U2에는 IAM role이나 API 인증 설계가 없는가?
2. 문서 상태와 출처 상태를 왜 서로 다른 값으로 관리해야 하는가?
3. `blocked` 출처가 있는 문서를 `verified`로 표시하면 어떤 추적성 문제가 생기는가?
4. 상대 링크와 안정 ID가 보안·변경 무결성에 어떻게 기여하는가?

## 연결된 다음 문서

- [U2 NFR 설계 질문과 summary confirmation](./nfr-design-questions.md)
- [U2 NFR 추적성](./traceability.json)
- [U2 D1 README](../../../../../../../../docs/01-ai-ml-foundations/README.md)
- [D1 개념 문서](../../../../../../../../docs/01-ai-ml-foundations/01-ai-ml-genai-relationship.md)
- [D1 용어 inventory](../../../../../../../../docs/01-ai-ml-foundations/d1-terminology-quiz.md)
- [D2 README](../../../../../../../../docs/02-generative-ai/README.md)

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 시험 범위와 도메인 가중치의 입력 출처, 확인일: 2026-09-04, 상태: `downloaded`.
- [콘텐츠 도메인 1: AI 및 ML의 기초](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html) — D1 작업·기술의 입력 출처, 확인일: 2026-09-04, 상태: `downloaded`.
- [U2 보안 요구사항](../nfr-requirements/security-requirements.md) — 이 설계가 변환한 NFR 입력, 확인일: 2026-09-04, 상태: `review`.
- [U2 기술 결정](../nfr-requirements/tech-stack-decisions.md) — 정적 패키지·검사·상태 분리 결정의 입력, 확인일: 2026-09-04, 상태: `review`.
- [source registry](../../../../../../../../sources/source-registry.yaml) — 공식 URL·제목·확인일·접근 상태의 canonical 등록부, 확인일: 2026-09-04, 상태: 입력 문서 기준.

## Assumptions & Open Questions

- U1의 canonical baseline manifest와 `AIF-C01-D1-T<n>` 행이 확정되기 전까지 관련 traceability는 `Deferred`로 유지한다.
- 중앙 `docs/glossary.md`는 현재 존재 여부가 확인되지 않았으므로 경로 완성은 후속 콘텐츠 단계에서 재검사한다.
- 입력 문서가 지정한 공식 출처 URL·확인일 외에는 새 출처를 수집하거나 추가하지 않았다.
- 사용자 summary confirmation에서 SD-01~SD-05와 런타임 N/A 범위에 변경 요청이 없다는 가정은 아직 승인되지 않았다.

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-07T02:00:00Z
**Iteration:** 1
**Request Challenge:** review:f39a8561b96ad0e751725d349db3b4ed

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| — | — | 해당 없음 | 현재 U2 보안 설계에서 Critical·Major·Minor finding을 확인하지 못했다. | 추가 조치 없음. | — |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-required-sections.ts` | PASS | 필수 구조와 단일 `## Review` appendix가 유지된다. |
| `aidlc-sensor-upstream-coverage.ts` | PASS | U2 보안 요구사항·기술 결정·조건부 입력이 설계에서 참조된다. |
| `aidlc-sensor-traceability.ts` | PASS | 14개 상세 NFR ID가 선언되고 target이 비어 있지 않다. |
| strict UTF-8·JSON parse·상대 링크·민감정보 점검 | PASS | 정적 파일 경계, 유효 JSON, 상대 링크, 비수집 규칙이 유지된다. |
| linter/type-check | N/A | 실행 코드가 없는 packaging Unit이다. |

### Summary

U2의 정적 no-runtime 보안 경계와 NFR 추적성 설계가 upstream 계약과 일치하며, U1 기준선·glossary 후속 연결은 기존처럼 Deferred로 유지된다.
