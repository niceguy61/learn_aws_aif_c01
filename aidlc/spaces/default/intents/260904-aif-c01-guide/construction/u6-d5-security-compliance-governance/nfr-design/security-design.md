---
title: "U6 D5 보안·규정 준수·거버넌스 NFR 보안 설계"
domain: "D5"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html"
  - "https://aws.amazon.com/compliance/shared-responsibility-model/"
  - "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"
source_checked: "2026-09-05"
---

# U6 D5 보안·규정 준수·거버넌스 보안 설계

## 목적과 범위

U6는 AI 솔루션의 보안, 규정 준수(Compliance), 거버넌스(Governance)를 초보자가 판단할 수 있도록 설명하는 정적 Markdown/JSON Unit이다. 실행형 애플리케이션이나 AWS 계정 구성을 설계하지 않는다.

이 설계의 결과물은 이 파일과 `traceability.json`이다. 질문 기록은 같은 디렉터리의 `nfr-design-questions.md`에 둔다. 성능·확장성·신뢰성·관측성·logical components 산출물은 U6의 applicable output이 아니므로 생성하지 않는다.

### 시험 범위와 실무 확장

- **시험 범위**: AI 시스템 보안, AI 시스템 거버넌스와 규정 준수에 관한 AIF-C01 D5의 판단 단서.
- **실무 확장**: IAM, 암호화, Amazon Macie, AWS PrivateLink, AWS 공동 책임 모델, Guardrails와 AgentCore Identity를 개념 수준에서 연결한다.
- **제외**: 특정 법률의 적용 판정, 규정 인증, 계정 운영, 보안 정책 배포, 실제 데이터 스캔, 키·secret·token 생성.

실무 확장은 시험 출제 범위로 단정하지 않으며, 기능·리전·할당량처럼 변할 수 있는 사실은 공식 출처 확인 전까지 확정하지 않는다.

## Upstream 적용성

| Upstream | 적용성 | 근거 |
|---|---|---|
| `security-requirements.md` | 적용 | U6의 NFR1.1~NFR9.1을 모두 설계 대상으로 사용한다. |
| `tech-stack-decisions.md` | 적용 | UTF-8 Markdown, 상대 경로, U1 canonical registry 참조, 결정적 JSON, 기존 센서 최소 의존성을 따른다. |
| `unit-of-work.md` | 적용 | U6는 shared static package인 packaging Unit이며 U1·U7과의 handoff 경계를 따른다. |
| `functional-spec` | 적용 | U6 정적 Markdown·JSON 산출물, 안정 ID, U1/U7 handoff를 정의하는 [정적 패키징 기능 명세](../functional-design/functional-spec.md)를 소비한다. 실행 기능·API·사용자 흐름은 없다. |
| `contract-summary.md` | 해당 없음 | 실행 단위 사이의 API·이벤트 계약이 없으며 U6의 계약은 정적 파일·안정 ID·출처·후속 gate 조건이다. |

## 정적 보안 경계

### 실행하지 않는 것

U6는 IAM role/policy, KMS key, Amazon Macie scan, AWS PrivateLink, Guardrails 또는 AgentCore Identity를 생성·호출·저장하지 않는다. AWS CLI, SDK, API endpoint, 계정 ID, credentials, secret, token, database, network, deployment, runtime dependency, 실행 코드도 산출하지 않는다.

따라서 이 문서의 보안 설계는 다음 세 가지로 제한된다.

1. 학습자가 서비스와 보안 선택지를 구분하도록 개념과 비교 단서를 제공한다.
2. 합성 데이터와 가상 주체를 사용해 데이터 흐름·권한·보호 목적을 설명한다.
3. Markdown/JSON의 출처·범위·링크·민감정보·결정성 검사를 통과시키는 정적 품질 규칙을 정의한다.

### IAM·암호화·공동 책임 모델의 설명 범위

- **IAM**: 누가 무엇을 할 수 있는지 정하는 권한 관리라는 개념, 최소 권한과 역할 분리라는 판단 단서만 설명한다. 실제 policy document, role ARN, principal, 계정 연결은 만들지 않는다.
- **암호화**: 저장 중 보호와 전송 중 보호의 목적, 키 관리가 별도 책임이 될 수 있다는 개념만 설명한다. 실제 KMS key, key policy, certificate, secret은 만들지 않는다.
- **공동 책임 모델**: AWS가 맡는 클라우드 자체의 책임과 고객이 맡는 클라우드 내부 구성·데이터·권한의 책임을 구분하는 학습 모델로 설명한다. 서비스·계약·규정별 책임을 보증하거나 법률 판단으로 확장하지 않는다.
- **규정 준수**: 특정 관할·산업의 준수 여부를 판정하지 않는다. 적용 가능성은 조직의 공식 담당자와 최신 공식 문서로 확인해야 한다고 표시한다.

## 설계 결정

| 결정 ID | 결정 | 적용 및 이유 |
|---|---|---|
| SD6.1 | No-runtime 보안 경계 | 실행 API·계정 변경·새 dependency 없이 보안 개념과 정적 검사만 제공한다. |
| SD6.2 | 합성 보안 시나리오 | 주체·데이터·권한 이름은 가상 값으로 만들어 실제 계정·PII·secret 유입을 막는다. |
| SD6.3 | 개념 수준의 IAM·암호화·공동 책임 설명 | 구성 절차나 보증이 아니라 시험 판단 단서를 제공한다. |
| SD6.4 | 법률 비보증 | 규정 설명을 AWS 자료 기반의 학습 해설로 제한하고 관할별 판단은 `확인 필요`로 남긴다. |
| SD6.5 | U1 canonical manifest 단일 참조 | source/baseline ID를 U6에서 복제하지 않고 U1 manifest로 역추적한다. `BaselineItem`의 필수 필드(`baseline_id`, `source_id`, `source_revision`, `status`, `learning_document_ids`, `question_ids`, `card_ids`, `quiz_ids`, `anki_ids`)를 소비하고, U6 문서·용어에서 기준선·출처로 가는 정방향과 U1 manifest에서 U6·U7 파생 ID로 돌아오는 역방향을 모두 후속 gate에서 검증한다. 최종 manifest schema·revision 연결은 현재 `Deferred`다. |
| SD6.6 | 출처·범위·문서 상태 분리 | 공식 시험 범위, 실무 확장, 출처 접근 상태, 문서 작성 상태를 서로 다른 필드와 섹션으로 기록한다. |
| SD6.7 | 결정적 UTF-8 Markdown/JSON | 안정 ID, 고정 배열 순서, strict UTF-8, parse 가능한 JSON으로 반복 검사를 가능하게 한다. |
| SD6.8 | 상대 링크와 후속 link gate | 실제 존재하는 파일만 링크 PASS로 판단한다. 아직 생성 전인 D4/D5 README, U7 산출물, 중앙 glossary target은 경로를 예약만 하고 `Deferred`로 둔다. |
| SD6.9 | 민감정보 차단 | 실제 account ID, access key, token, secret, PII, 결제·건강정보를 수집·저장하지 않으며 발견 시 수정 후 재검사한다. |
| SD6.10 | U7·중앙 glossary handoff | U6는 D5 용어와 문서 ID의 입력을 제공하지만 중앙 glossary·평가 문항·카드·Anki는 U7/공유 소유자에게 넘긴다. 대상 파일 생성 전 연결 검증은 후속 gate에서 수행한다. |
| SD6.11 | 정적 실패의 보류 처리 | 링크·출처·범위·인코딩·JSON parse·민감정보 검사 실패는 파일을 `review` 상태로 유지하고 원인·수정·재검사 조건을 남긴다. 확인되지 않은 사실은 `verified`로 승격하지 않는다. |

## 합성 보안 시나리오 설계

다음은 실제 AWS 리소스가 아닌 설명용 시나리오다.

- 가상 주체 `학습용-분석가`가 합성 데이터셋 `샘플-문서`를 읽으려 한다.
- IAM 설명은 “업무에 필요한 읽기만 허용하고 관리 작업은 분리한다”는 선택 기준으로 끝낸다.
- 암호화 설명은 “저장·전송 중 데이터 보호를 고려한다”는 목적과 확인 질문으로 끝낸다.
- 공동 책임 설명은 AWS와 고객의 책임 경계를 표로 나누되 특정 계정·서비스 설정의 준수를 보증하지 않는다.

이 시나리오는 실제 주체, 실제 데이터, 실제 정책, 실제 key, 실제 endpoint를 나타내지 않는다.

## 출처·범위·문서 상태 분리

다음 상태를 혼합하지 않는다.

| 구분 | 의미 | U6 처리 |
|---|---|---|
| 출처 접근 상태 | URL의 확인·다운로드·요약 여부 | U1 `source-registry.yaml`의 canonical 상태를 참조하며 최종 연결은 `Deferred` |
| 시험 범위 | AIF-C01 공식 안내서가 정의한 D5 작업·기술 항목 | 기준선 ID `AIF-C01-D5-T<n>`로 추적 |
| 실무 확장 | 시험 범위를 이해하기 위한 AWS 관점·운영 해설 | `실무 확장` 표지와 별도 출처로 표시 |
| 문서 상태 | 이 설계 문서의 작성·검토 상태 | 현재 `review`; reviewer receipt 없음 |
| 링크 상태 | 파일·anchor가 실제 존재하는지 | 생성 전 target은 `Deferred`; 존재 확인 후 PASS |

## 내부 연결과 후속 gate

현재 workspace를 확인한 결과, 다음 파일은 아직 존재하지 않는다.

- `docs/04-responsible-ai/README.md`: 계획된 U5 출력 대상, 현재 없음.
- `docs/05-security-compliance/README.md`: 계획된 U6 출력 대상, 현재 없음.
- U7의 최종 평가·복습 산출물과 중앙 `docs/glossary.md`: 현재 U6가 연결할 확정 target 없음.

따라서 위 경로를 Markdown 링크로 작성하지 않는다. 코드 경로와 계획된 출력 계약만 명시하며, 실제 파일과 anchor가 생성된 후 후속 link gate에서 다음을 확인한다.

1. D4 README가 D5의 선수 문서로 존재하고 올바른 anchor를 제공하는지 확인한다.
2. D5 README와 개념 문서가 U6 stable ID와 source/baseline ID를 역추적하는지 확인한다.
3. U7이 D5 문서·용어를 소비하고 문제·카드·퀴즈·Anki 항목을 역방향으로 연결하는지 확인한다.
4. 중앙 glossary가 실제로 생성된 경우에만 U6 용어 inventory와 anchor 링크를 PASS로 승격한다.

실제로 존재하는 U7 관련 기존 디렉터리 `docs/06-exam-strategy/`가 있다는 사실은 U7 Unit의 새 산출물 target이 이미 완성되었다는 뜻으로 해석하지 않는다.

## 정적 검사와 결정성

- Markdown은 UTF-8로 저장하고 YAML front matter의 `status`는 `draft`, `review`, `verified` 중 하나만 사용한다.
- JSON은 유효한 strict JSON으로 저장하고 NFR ID·SD ID 배열은 선언 순서를 유지한다.
- 안정 ID는 임의 재번호화하지 않는다. U1이 소유한 `AIF-C01-D5-T<n>`는 U6가 새로 만들지 않는다.
- 상대 경로는 실제 파일·anchor가 존재할 때만 링크 PASS로 기록한다. 계획된 경로는 `Deferred`다.
- 외부 사실은 공식 URL·문서 제목·확인일·접근 상태를 `## Sources`와 U1 registry에서 대조한다.
- 코드 블록·CLI·SDK 예시는 만들지 않는다. 그러므로 type-check와 실행 코드 검사는 `N/A`다.
- 민감정보 패턴 검사와 수동 검토에서 문제를 발견하면 `review` 상태를 유지하고 수정 후 재검사한다.

## NFR별 적용성

| NFR | 적용성 | SD 결정·검증 증거 |
|---|---|---|
| NFR1.1 | OK | SD6.2, SD6.3; 한국어·영어 병기와 합성 사례를 문서 구조로 검사한다. |
| NFR2.1 | OK | SD6.3, SD6.7; 짧은 표·문단·텍스트 설명과 모바일 Markdown 검사를 적용한다. |
| NFR2.2 | OK | SD6.3, SD6.8; 공동 책임·데이터 흐름 도표는 사용하지 않는 것을 기본값으로 한다. 도표를 사용할 경우 각 도표에 의미를 요약한 한국어 `alt text`와 동일 내용을 읽을 수 있는 한국어 텍스트 fallback을 함께 제공하고, 두 항목을 모두 검사한다. | 도표 미사용 또는 alt text·텍스트 fallback 점검 |
| NFR3.1 | OK | SD6.5, SD6.7; `AIF-C01-D5-T<n>`와 U6 문서 ID의 안정성·중복을 검사한다. |
| NFR3.2 | Deferred | SD6.5; U1 `sources/content-traceability.yaml`의 `BaselineItem` 필수 필드(`baseline_id`, `source_id`, `source_revision`, `status`, `learning_document_ids`, `question_ids`, `card_ids`, `quiz_ids`, `anki_ids`)와 U6 문서·용어 ID의 정방향 및 U1 manifest에서 U6·U7 파생 ID로의 역방향을 후속 gate에서 검증한다. 현재 manifest·downstream population 전이라 보류한다. | 필수 필드·ID 소유자·중복·고아·정/역방향 orphan 검사 대기 |
| NFR4.1 | Deferred | SD6.6, SD6.5; 공식 URL은 명시했지만 U1 registry의 canonical row·제목·확인일·상태와의 최종 대조가 남아 있다. |
| NFR4.2 | OK | SD6.4, SD6.6, SD6.11; 확인 필요와 후속 조치를 확정 상태와 분리한다. |
| NFR5.1 | Deferred | SD6.8, SD6.10; D4/D5 README, 중앙 glossary, U7 target이 실제 생성 전이므로 후속 link gate까지 보류한다. |
| NFR6.1 | OK | SD6.7; strict UTF-8·결정적 JSON·배열 순서·parse 검사를 적용한다. |
| NFR7.1 | OK | SD6.2, SD6.9; 민감정보 비수집, 합성 값 사용, 패턴·수동 검토를 적용한다. |
| NFR7.2 | OK | SD6.1; IAM/KMS/Macie/PrivateLink/Guardrails 실행 및 저장을 하지 않는 범위를 검사한다. |
| NFR8.1 | OK | SD6.6; 시험 범위와 실무 확장을 섹션·표지로 분리한다. |
| NFR8.2 | OK | SD6.4, SD6.6; 법률 비보증과 한국어 재구성을 적용하며 원문 전체 복사를 하지 않는다. |
| NFR9.1 | OK | SD6.10; 일정·점수·계정 데이터를 저장하지 않고 U7 handoff 계약으로 평가·복습을 연결한다. 실제 U7 파일 링크 검증은 NFR5.1 후속 gate에 포함한다. |

## 실패 처리

U6에서 말하는 실패는 runtime 장애가 아니라 산출물 품질 검사 실패다.

| 실패 | 즉시 처리 | 재검사 조건 |
|---|---|---|
| JSON parse 실패 | `traceability.json`을 수정하고 `review` 유지 | strict JSON parse 성공 및 14개 NFR ID 존재 |
| NFR ID 누락·중복 | ID 목록과 coverage를 수정 | NFR1.1~NFR9.1이 각각 정확히 한 번 선언됨 |
| U1 manifest·출처 불일치 | `Deferred`와 사유를 유지하고 임의 사실을 추가하지 않음 | U1 row·revision·status와 대조 완료 |
| 실제 없는 내부 링크 | 링크를 제거하거나 계획 target으로 전환 | 파일·anchor 생성 후 link gate PASS |
| 민감정보 발견 | 값을 합성 값으로 교체하고 검사 기록에서 제거 | 패턴 검사·수동 검토 모두 통과 |
| 시험 범위와 실무 확장 혼합 | 섹션 표지를 보완 | 모든 확장 항목이 별도 표지로 구분됨 |
| 확인되지 않은 최신 사실 | `확인 필요`로 보류 | 공식 페이지 확인일·상태 갱신 |

## 검증 증거

- 입력 계약: `security-requirements.md`, `tech-stack-decisions.md`, `unit-of-work.md`.
- 기능 명세: [U6 정적 패키징 기능 명세](../functional-design/functional-spec.md)를 적용한다. 실행 기능·API·사용자 흐름은 없다.
- 산출물 범위: `nfr-design-questions.md`, `security-design.md`, `traceability.json` 세 파일만 생성한다.
- 추적성: `traceability.json`에 NFR1.1~NFR9.1 14개를 모두 선언한다.
- 민감정보: 실제 account ID, access key, token, secret, PII, 결제·건강정보를 사용하지 않는다.
- 링크: 실제 존재가 확인되지 않은 D4/D5 README, 중앙 glossary, U7 산출물에는 Markdown 링크를 만들지 않고 `Deferred`로 기록한다.
- reviewer receipt/unit completion: 이 작업에서는 기록하지 않는다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 시험 범위, 확인일: 2026-09-04, 상태: `downloaded`
- [콘텐츠 도메인 5: AI 솔루션의 보안·규정 준수 및 거버넌스](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html) — D5 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AWS 공동 책임 모델](https://aws.amazon.com/compliance/shared-responsibility-model/) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [IAM 소개](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- `sources/source-registry.yaml` — U1 canonical 출처 등록부, 현재 최종 연결: `Deferred`

## Assumptions & Open Questions

- `AIF-C01-D5-T<n>`의 정확한 기술 항목과 source revision은 U1 canonical manifest 확정 전까지 `확인 필요`다.
- D4/D5 README와 U7·중앙 glossary target은 계획된 출력 계약이며, 실제 파일·anchor 생성 후 후속 link gate가 필요하다.
- 규정 준수 설명은 법률 자문·인증·준수 보증이 아니다.
- 이 Unit은 AWS 계정·credentials·실행 코드·runtime dependency·배포 환경을 사용하지 않는다.
- 질문 파일의 답변이 추가되면 이 설계의 해당 결정과 `traceability.json`을 다시 대조한다.

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-06T12:20:30Z
**Iteration:** 1
**Request Challenge:** review:a777b87cbef969a05f0171c2ed4b38b2

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| — | — | — | 이번 재검토 범위에서 Critical, Major, Minor finding 없음 | 추가 조치 없음 | — |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-required-sections.ts` — `security-design.md` | PASS | U6 설계 본문과 이번 iteration의 단일 Review appendix를 포함한 H2 구조가 유효하다. |
| `aidlc-sensor-traceability.ts` — `traceability.json` | PASS | 14개 NFR ID의 선언·coverage와 target 구조에 gap·orphan·invalid entry가 없다. |
| `aidlc-sensor-upstream-coverage.ts` — U6 NFR Design | PASS | `security-requirements`, `tech-stack-decisions`, `functional-spec`이 security-design에서 명시적으로 소비된다. |
| `functional-spec` stage input check | PASS | 정적 Markdown·JSON packaging 계약과 U1/U7 handoff가 authoritative 입력으로 존재하며 실행 코드·API·계정·dependency를 도입하지 않는다. |
| strict UTF-8 / JSON parse / internal-link / sensitive-data / no-runtime smoke check | PASS | 대상 산출물이 파싱되고 내부 링크가 유효하며 credential·account ID·secret·실행 코드 패턴이 발견되지 않았다. |
| `linter`, `type-check` applicability | N/A | U6 출력은 정적 Markdown/JSON이고 TS/TSX/JS 및 관련 설정이 없어 실행 대상이 없다. |

### Summary

이번 reviewer 요청 challenge에 대해 이전 R-01~R-03의 해소 상태와 U6의 정적 packaging 경계를 재확인했다. NFR2.2의 접근성 fallback, U1 canonical manifest의 양방향 handoff, U7 handoff 및 `Deferred` 후속 gate가 설계와 traceability에 일치하며, 현재 readiness를 막는 Critical/Major/Minor finding은 없어 READY다.
