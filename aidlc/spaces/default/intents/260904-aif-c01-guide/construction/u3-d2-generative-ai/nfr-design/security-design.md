---
title: "U3 D2 GenAI의 기초 보안 설계"
domain: "D2"
unit: "u3-d2-generative-ai"
level: "beginner"
status: "draft"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
  - "https://aws.amazon.com/bedrock/"
source_checked: "2026-09-04"
---

# U3 D2 GenAI의 기초 보안 설계

## 목적과 범위

U3는 AIF-C01 D2 학습자를 위한 정적 Markdown·JSON 자료를 만든다. 이 설계는 실행형 GenAI 서비스의 인증·암호화·네트워크 보안이 아니라, 문서 패키지가 잘못된 범위·출처·식별자·민감정보를 포함하지 않도록 하는 보안 경계를 정의한다.

적용 대상은 다음 세 가지다.

- `D2-README`와 `LD-d2-<slug>` 문서의 범위·출처·링크 무결성
- `TERM-d2-<slug>` 용어 inventory와 U7/start content handoff
- U1이 소유하는 기준선·출처 계약을 소비하는 정·역방향 추적성 JSON

이 문서는 구현 코드, API 계약, AWS 리소스 설정 또는 운영 절차를 만들지 않는다.

## Upstream 적용성

| Upstream | U3의 사용 방식 | 보안 설계 영향 |
|---|---|---|
| `security-requirements.md` | 상세 `NFR1.1`~`NFR9.1`의 보안 경계를 입력으로 사용 | 모든 상세 NFR을 이 문서의 설계 결정과 `traceability.json`에 연결한다. |
| `tech-stack-decisions.md` | UTF-8 Markdown, 상대 링크, 결정적 JSON, 기존 Bun 검사라는 결정을 소비 | 새 dependency·실행 코드·원격 전송을 추가하지 않는다. |
| `functional-spec.md` | `D2-README`, `LD-d2-<slug>`, `TERM-d2-<slug>`와 U1/U7 handoff를 소비 | 각 안정 ID의 소유권과 연결 방향을 바꾸지 않는다. |
| Unit 계약 | U3가 D2 packaging Unit이고 U1·U7·U8과 정적 계약으로 연결됨을 확인 | 배포 서비스가 아닌 shared static package로 범위를 제한한다. |
| `nfr-design` stage contract | security-design과 traceability만 이번 Unit에 적용 | performance, scalability, reliability, observability, logical-components 파일은 만들지 않는다. |

U3에는 별도 `contract-summary.md`가 없으며, Unit 계약과 `functional-spec.md`가 정의한 handoff가 cross-Unit 입력이다.

## 정적 패키지 보안 경계

U3의 신뢰 경계는 저장소 안의 정적 파일과 이를 로컬에서 점검하는 검사 도구다. 학습자는 Markdown viewer로 내용을 읽고, 문서 링크를 따라가며, JSON은 추적성 검사에 사용한다.

허용되는 것은 다음과 같다.

- 한국어 설명, 최초 등장 시 병기한 핵심 영어 용어, AWS 서비스명과 공식 URL
- 출처 ID·기준선 ID·문서 ID·용어 ID를 이용한 정적 연결
- UTF-8, JSON parse, 상대 링크, 민감정보 패턴을 확인하는 로컬 읽기 전용 검사

금지되는 것은 다음과 같다.

- 모델 호출, prompt 제출, inference, fine-tuning, RAG 검색 또는 임베딩 저장
- API, 인증, 세션, 데이터베이스, vector store, 네트워크 진입점 또는 실행 코드
- AWS account, IAM role/policy, credentials, token, API key 또는 유료 리소스
- 학습자 계정·답안·진도·PII를 받거나 저장하거나 원격으로 전송하는 기능
- 새 package, SDK, build system 또는 배포·호스팅 구성을 추가하는 일

따라서 U3의 보안 설계는 애플리케이션 런타임을 보호하는 설계가 아니라, 정적 콘텐츠의 입력·변경·연결 경계를 보호하는 설계다.

## 출처·범위·상태 분리

문서는 다음 세 층을 섞지 않는다.

1. **시험 범위**: U1의 `AIF-C01-D2-T<n>` 기준선과 공식 AIF-C01 안내서가 정의한 D2 작업·기술 항목이다.
2. **실무 확장**: `AIF-C01-D2-T<n>`를 먼저 제시한 뒤 Amazon Bedrock 같은 서비스 선택 단서를 설명한다. 확장 내용을 공식 출제 항목이라고 표현하지 않는다.
3. **학습자용 해설**: 원문을 통째로 복사하지 않고 초보자가 이해할 수 있도록 다시 설명한 예시다.

출처 상태와 문서 상태도 따로 관리한다.

- 출처 상태는 U1 registry의 URL 접근·다운로드·요약·검토 상태다.
- 문서 상태는 문서 자체의 `draft`·`review`·`verified` 상태다.
- 출처가 `blocked` 또는 `확인 필요`이면 그 출처에 의존하는 내용을 `verified`로 표시하지 않고, 영향과 후속 확인을 남긴다.
- 확인 날짜는 변동 가능한 서비스·모델·기능 사실과 함께 기록하며, 확인하지 못한 세부사항을 추측하지 않는다.

## U1 manifest와 안정 ID의 정·역방향 추적성

U1은 `sources/content-traceability.yaml`과 `sources/source-registry.yaml`의 단독 소유자다. U3는 U1의 `AIF-C01-D2-T<n>`와 `SRC-*`를 소비하며 새 기준선·출처 ID를 만들거나 U1의 `revision`, `status`, `source_checked`를 복사해 다른 값으로 재정의하지 않는다.

U3가 전달하는 정적 항목은 다음 규칙을 따른다.

| 항목 | 규칙 |
|---|---|
| `D2-README` | `docs/02-generative-ai/README.md`에 대응하며 D2 학습 순서·범위 표지·D3 연결을 제공한다. |
| `LD-d2-<slug>` | 하나의 개념만 다루는 D2 문서에 대응하며 기준선·출처·다음 문서 링크를 가진다. |
| `TERM-d2-<slug>` | D2 용어 정의와 연결 문서 ID를 제공하고 U7/start content에 handoff한다. |
| `baseline_ids` | 하나 이상의 `AIF-C01-D2-T<n>`를 가리킨다. |
| `source_ids` | U1 `source-registry.yaml`의 `SRC-*`를 가리킨다. |
| `forward_refs` | 문서·용어에서 기준선·출처로 향하는 안정 ID 배열이다. |
| `reverse_refs` | 기준선·출처에서 문서·용어로 돌아오는 안정 ID 배열이다. |

정방향 연결은 각 문서·용어 항목이 자신이 설명하는 기준선과 출처를 선언하는 방식이다. 역방향 연결은 U1 manifest의 `learning_document_ids`와 파생 항목 배열이 그 문서·용어 ID를 다시 선언하는 방식이다. 두 방향의 ID와 배열 순서는 결정적으로 비교할 수 있어야 한다.

현재 U1 manifest의 상세 행·revision·양방향 배열이 아직 구현·확정되지 않았으므로, manifest에 실제로 기록되는 연결은 `Deferred`다. 이 보류는 U3의 안정 ID 설계나 정적 연결 규칙이 미정이라는 뜻이 아니다. U3가 검증 가능한 U1 manifest를 받으면 동일한 ID 규칙으로 재구성하고, 고아·중복·누락을 검사한다.

중앙 `docs/glossary.md`의 조립·갱신은 U7/start content가 소유한다. U3는 D2 terminology inventory와 `TERM-d2-<slug>` ID를 handoff하지만 중앙 glossary를 직접 수정하지 않는다. 이 소유권 분리는 여러 Unit이 같은 glossary 파일을 동시에 수정하는 충돌과 용어 정의의 중복을 막는다.

## 상대 링크·UTF-8·결정성 검사

문서 탐색과 보안 검사는 다음 규칙으로 재현한다.

- 외부 사실은 Markdown 링크로 작성하고, 저장소 내부 연결은 workspace-relative 상대 경로만 사용한다.
- 링크 대상은 D1 선수 문서, 동일 도메인의 다음 문서, D3 README, U7 glossary anchor와 실제 경로·anchor가 일치해야 한다.
- Markdown과 JSON은 strict UTF-8이어야 한다. 깨진 인코딩이나 BOM·비결정적 문자 변환을 허용하지 않는다.
- `traceability.json`은 `upstream_ids`와 `coverage`를 안정된 ID 사전순으로 유지하고, 같은 입력에서 같은 bytes가 나오도록 한다.
- JSON parse, 필수 키, ID 형식, 중복 ID, workspace-relative `target_path`, forward/reverse orphan을 기존 Bun 검사와 로컬 표준 파서로 확인한다.
- Mermaid나 이미지를 쓰지 않는 것을 기본으로 하며, 사용하더라도 외부 렌더러 없이 읽을 수 있는 텍스트 설명과 alt text를 함께 둔다.

이 검사들은 파일을 읽기만 하며 네트워크·AWS 계정·학습자 데이터에 접근하지 않는다.

## 민감정보 비수집

U3 콘텐츠와 검사 결과에는 다음 값을 넣지 않는다.

- 학습자 이름, 이메일, 답안, 점수, 진도, 실제 조직명 또는 계정 식별자
- AWS access key, secret, session token, IAM role ARN, API key, bearer token
- 실제 prompt, 대화 기록, 업로드 파일, 모델 응답 또는 고객 데이터

예시가 필요한 경우에는 `학습자 A`, `example-id`, `SRC-example`처럼 실제 개인·계정과 연결되지 않는 placeholder만 사용한다. 로컬 검사 로그도 파일 경로·판정·결함 ID만 기록하고 파일 본문이나 민감한 환경 변수를 외부로 보내지 않는다.

## NFR별 적용성

| NFR ID 또는 범주 | 적용성 | 보안 설계 결정 |
|---|---|---|
| `NFR1.1` | 적용 | 한국어 기본, 최초 영어 용어 병기, 원문 기술 토큰 보존. |
| `NFR2.1` | 적용 | GFM Markdown, 짧은 문단, 모바일에서 표에만 의존하지 않는 구조. |
| `NFR2.2` | 조건부 적용 | 이미지·Mermaid를 사용하지 않는 기본값; 사용 시 텍스트 설명·alt text를 함께 제공. |
| `NFR3.1` | 적용 | `D2-README`, `LD-d2-<slug>`, `TERM-d2-<slug>`와 U1 기준선 ID를 안정적으로 유지. |
| `NFR3.2` | 부분 적용, manifest 연결은 `Deferred` | U1 manifest의 ID·경로·정·역방향 배열을 소비하되 U1이 미확정인 행은 보류. |
| `NFR4.1` | 적용 | URL·제목·확인일·접근 상태와 문서 상태를 별도로 표시. |
| `NFR4.2` | 적용 | `blocked`·`확인 필요` 출처 의존 내용을 `verified`로 승격하지 않음. |
| `NFR5.1` | 적용 | 소문자·숫자·하이픈 경로, 선수·다음 문서·용어 연결을 검사. |
| `NFR6.1` | 적용 | strict UTF-8과 결정적 ID·배열·JSON 직렬화. |
| `NFR7.1` | 적용 | 학습자 데이터·PII·credentials·token·API key를 수집·저장·전송하지 않음. |
| `NFR7.2` | 적용 | 모델 호출·브라우저 전송·인증·세션·자동 저장·원격 업로드를 구현하지 않음. |
| `NFR8.1` | 적용 | 모든 섹션에 시험 범위 또는 기준선 선행 실무 확장 표지를 둠. |
| `NFR8.2` | 적용 | 공식 원문을 재배포하지 않고 한국어로 재구성하며 출처 메타데이터를 남김. |
| `NFR9.1` | 적용 | D2 용어 inventory와 안정 term ID만 U7/start content에 handoff하고 glossary 조립은 U7이 담당. |

### 런타임 NFR 범주의 판정

| NFR 범주 | 판정 | U3 근거 |
|---|---|---|
| 성능 | 해당 없음 | 요청 처리·모델 추론·API·데이터베이스가 없고, 정적 파일의 결정적 검사만 수행한다. |
| 보안 | 제한적으로 적용 | 런타임 방어가 아니라 범위·출처·링크·ID·민감정보 경계를 설계한다. |
| 확장성 | 해당 없음 | 트래픽·동시성·저장소 파티션·자동 확장 대상이 없다. |
| 신뢰성 | 제한적으로 적용 | 서비스 가용성은 없지만 파일 누락·변경·출처 불확실성을 실패 처리한다. |
| 관찰 가능성 | 해당 없음 | 운영 서비스의 metric·log·trace·alert가 없으며 품질 증거는 U8이 소유한다. |
| 논리 컴포넌트 | 해당 없음 | 실행 컴포넌트가 없고 문서·출처·평가의 소유 경계는 Unit 계약이 이미 정의한다. |

## 해당 없음인 실행 보안 항목

다음 항목은 이름만 보안 설계에 포함될 수 있으나 U3에는 실행 대상이 없으므로 해당 없음으로 판정한다.

- **인증·인가**: 로그인 사용자, 역할, 보호된 API가 없다.
- **암호화·KMS·Secrets Manager**: 저장하거나 호출할 비밀·AWS 리소스가 없다.
- **API·TLS·세션·CSRF/XSS 방어**: HTTP 요청·세션·브라우저 입력 처리가 없다.
- **데이터베이스·vector store**: 임베딩·RAG는 학습 설명일 뿐 저장 기능이 아니다.
- **네트워크·WAF·런타임 가용성·DR**: 네트워크 진입점과 장기 실행 서비스가 없다.
- **배포·호스팅**: 승인된 정적 저장소 파일만 산출하며 배포 토폴로지를 설계하지 않는다.

## 실패·변경 처리

| 상황 | 처리 |
|---|---|
| U1 manifest가 없거나 revision/status가 불일치함 | 기준선·출처 정·역방향 연결을 `Deferred`로 두고 `verified` 승격을 막는다. 내용을 추측하지 않는다. |
| 출처 URL이 차단되거나 동적 내용 확인에 실패함 | registry 상태를 `blocked` 또는 `확인 필요`로 유지하고 영향과 후속 확인을 기록한다. |
| 문서 ID·용어 ID가 중복되거나 대상 경로가 없음 | 품질 검사 실패로 처리하고 중복·고아를 수정한 뒤 다시 검사한다. |
| 상대 링크·anchor·UTF-8·JSON parse 검사가 실패함 | 해당 산출물을 `draft`로 유지하고 링크·인코딩·직렬화를 수정한다. |
| 민감정보 패턴이 발견됨 | 파일과 검사 결과에서 값을 제거하고 placeholder로 교체한 뒤 재검사한다. |
| U7 glossary 소유 경계와 다른 변경이 제안됨 | U3는 중앙 glossary를 수정하지 않고 U7 handoff 계약을 재확인한다. |

이 설계의 변경은 기능 명세와 Unit 계약에 영향을 줄 때 `traceability.json`의 target과 관련 ID를 함께 갱신해야 한다. U1 manifest의 구현 완료는 U3의 `Deferred` 항목만 재검증하는 변경으로 취급한다.

## 검증 증거

검증은 다음 순서로 로컬에서 수행한다.

1. `required-sections`로 front matter, 제목 계층, 필수 `## Sources`, `## Assumptions & Open Questions`, `## Review`를 확인한다.
2. `upstream-coverage`로 requirements, tech-stack-decisions, functional-spec, Unit 계약과 U1 registry 참조를 확인한다.
3. `traceability`로 `NFR1.1`~`NFR9.1`의 선언·중복·target 누락을 확인하고, U1 manifest 미확정 연결은 `Deferred`인지 확인한다.
4. JSON parse와 strict UTF-8을 확인한다.
5. 상대 링크·anchor·안정 ID·파일명 규칙·민감정보 패턴을 확인한다.
6. 사람이 공식 범위와 실무 확장, 출처 사실과 학습자 해설, 초보자 가독성을 검토한다.

이번 초안에는 reviewer receipt나 Unit completion receipt를 기록하지 않는다. `## Review`는 reviewer가 아직 실행되지 않았음을 표시하는 초안 부록으로만 둔다.

## 핵심 정리

U3의 보안은 런타임 인증이나 암호화 설계가 아니라 정적 학습 패키지의 경계 관리다. U1이 기준선·출처 manifest를 소유하고 U3가 안정 ID와 정·역방향 연결을 소비하며, U7이 중앙 glossary를 조립한다. 상대 링크, strict UTF-8, 결정적 JSON, 출처·범위·상태 분리, 민감정보 비수집을 로컬 검사로 확인한다. 모델 호출·API·DB/vector store·AWS account/credentials·배포·새 dependency·실행 코드는 포함하지 않는다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 시험 범위·5개 도메인 기준, 확인일: 2026-09-04, registry 상태: `downloaded`
- [콘텐츠 도메인 2: GenAI의 기초](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html) — D2 작업·기술 기준, 확인일: 2026-09-04, registry 상태: `downloaded`
- [Amazon Bedrock](https://aws.amazon.com/bedrock/) — D2 실무 확장 서비스 개요, 확인일: 2026-09-04, registry 상태: `summarized`
- [U3 정적 패키징 기능 명세](../functional-design/functional-spec.md) — 정적 산출물·안정 ID·handoff 계약, 확인일: 2026-09-04, 상태: `review`
- [U3 Unit 계약](../../../inception/units-generation/unit-of-work.md) — Unit 소유권·정적 계약, 확인일: 2026-09-04, 상태: `reviewed`

## Assumptions & Open Questions

- U1의 `sources/content-traceability.yaml` 상세 schema와 D2 `BaselineItem` 행은 아직 구현·확정되지 않았다. 따라서 U1 manifest에 실제로 기록되는 연결만 `Deferred`다.
- U1의 `AIF-C01-D2-T<n>`와 `SRC-*` 안정 ID 규칙은 상위 Unit 계약을 따른다고 가정한다.
- 중앙 `docs/glossary.md`의 조립·갱신은 U7/start content가 수행하며, U3는 D2 terminology inventory만 전달한다.
- 출처 상태가 변경되면 영향받는 문서의 `status`와 `traceability.json`을 다시 검사한다.
- reviewer 실행, 공식 reviewer receipt, Unit completion은 이 초안 작성 범위에 포함되지 않는다.

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-06T12:20:00Z
**Iteration:** 1
**Request Challenge:** review:55cc43706f5e1271121c3120156ccc00

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| — | — | — | 검토 범위에서 Critical, Major, Minor finding 없음 | 추가 조치 없음 | — |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-required-sections.ts` — `security-design.md` | PASS | 보안 설계 본문과 이번 iteration의 단일 Review appendix를 포함한 H2 구조가 유효하다. |
| `aidlc-sensor-traceability.ts` — `traceability.json` | PASS | U3의 NFR 선언, coverage, target 구조에 gap·orphan·invalid entry가 없다. |
| `aidlc-sensor-upstream-coverage.ts` | PASS | 적용 가능한 `security-requirements`, `tech-stack-decisions`, `functional-spec` 입력이 보안 설계에서 명시적으로 소비된다. |
| strict UTF-8 / JSON parse smoke check | PASS | 검토 대상 산출물이 strict UTF-8로 읽히고 `traceability.json`이 파싱된다. |
| Markdown link / sensitive-data / no-runtime smoke check | PASS | 내부 상대 링크가 유효하고 credential-like secret, API·DB·배포·실행 코드 도입이 확인되지 않았다. |
| `linter`, `type-check` applicability | N/A | U3 산출물은 정적 Markdown/JSON이며 TS/TSX/JS 및 관련 설정이 없어 해당 센서의 실행 대상이 없다. |

### Summary

이번 reviewer 요청 challenge에 대해 U3의 정적 packaging 경계, U1 canonical manifest handoff, D2 stable ID, U7 glossary ownership, 출처·문서 상태 분리와 민감정보 비수집 원칙을 재확인했다. `NFR3.2`의 U1 manifest 의존성은 기존과 같이 `Deferred`로 유지되며, 그 외 NFR의 누락·고아·invalid target은 확인되지 않아 READY다.
