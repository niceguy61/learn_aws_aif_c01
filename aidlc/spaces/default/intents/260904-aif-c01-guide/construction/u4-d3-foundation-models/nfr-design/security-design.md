---
title: "U4 D3 파운데이션 모델의 적용 보안 설계"
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

# U4 D3 파운데이션 모델의 적용 보안 설계

## 목적과 범위

U4는 파운데이션 모델(Foundation Model, FM) 선택·프롬프트(prompt)·검색 증강 생성(Retrieval-Augmented Generation, RAG)·사용자 지정·평가를 초보자에게 설명하는 정적 Markdown·JSON 패키지다. 이 설계는 실행 중인 AI 시스템을 보호하는 설정이 아니라, 학습 자료가 실제 데이터·비밀·자격 증명을 취급하지 않도록 하는 문서 보안 경계를 정의한다.

이 Unit은 다음을 만들지 않는다.

- 모델 호출, inference, fine-tuning job 또는 평가 실행
- 벡터 DB, 데이터베이스, API, 인증·인가·세션
- AWS 계정, credentials, IAM·KMS·Secrets Manager 리소스
- 배포 환경, 장기 실행 프로세스, 새 dependency 또는 실행 코드

시험 범위 설명과 실무 확장은 문서 안에서 분리한다. RAG, prompt injection, 환각(hallucination), Bedrock 기능 비교는 학습을 돕는 실무 확장으로 표시하며, 구현 절차나 최신 기능을 시험 출제 범위로 단정하지 않는다.

## upstream 적용성

| upstream 입력 | 적용 판정 | 설계에서의 사용 |
|---|---|---|
| `security-requirements.md` | 적용 | U4의 정적 보안 경계, 14개 상세 NFR, 민감정보·상태·추적성 요구를 설계 기준으로 사용한다. |
| `tech-stack-decisions.md` | 적용 | UTF-8 Markdown·YAML front matter, 저장소 상대 링크, 결정적 JSON, 합성 예시, 상태 분리 결정을 사용한다. |
| `unit-of-work.md` | 적용 | U4의 packaging·shared static package 경계, U1·U7·U8 소유권과 산출물 계약을 유지한다. |
| `functional-spec` | N/A | 실행형 기능·API·사용자 흐름이 없는 정적 packaging Unit이다. 존재하지 않는 파일을 링크하거나 없는 기능 명세를 가정하지 않는다. |
| performance/scalability/reliability/observability requirements | 이 보안 설계 범위에서는 N/A | 사용자가 지정한 applicable output이 `security-design.md`와 `traceability.json`뿐이며, 실행 서비스가 없다. 해당 설계 파일은 생성하지 않는다. |

## 설계 결정

### SD-01. 정적 보안 경계와 최소 권한의 문서 적용

U4의 보호 대상은 모델이나 데이터 저장소가 아니라 버전 관리되는 Markdown·JSON 파일이다. 따라서 인증·인가·네트워크 격리·암호화 키·런타임 secret을 설계하지 않고, 파일 생성 단계에서 범위·경로·내용을 제한한다.

허용되는 내용은 한국어 해설, 공식 출처 링크와 메타데이터, 합성 예시, 짧은 의사 설명, 결정적 추적성 JSON이다. 모델 실행·데이터 업로드·자격 증명 입력을 유도하는 예제는 허용하지 않는다.

### SD-02. 합성 예시와 안전한 위험 설명

prompt 예시는 실제 사람이나 조직을 가리키지 않는 값으로 작성한다. 예를 들어 `고객 문의 요약`과 같은 일반 문장과 `상품 A`, `문서 1` 같은 합성 식별자만 사용한다. 이메일, 계정 번호, 토큰, API key, 비밀 또는 실제 고객 대화는 넣지 않는다.

RAG는 다음의 개념 흐름으로만 설명한다.

> 질문 → 관련 문서 검색이라는 개념 → 검색된 문맥을 참고한 답변 생성

이 설명은 벡터 저장소를 만들거나 데이터를 업로드한다는 뜻이 아니다. 실제 저장 위치, 임베딩 생성, API 호출은 이 Unit의 산출물이 아니다.

prompt injection은 입력 문서나 사용자 입력이 원래 지시를 무시하도록 모델을 유도하는 위험으로 설명한다. 방어 우회 절차, 공격 자동화, 실제 비밀 추출 방법은 제공하지 않는다. 환각은 모델이 근거가 부족한데도 그럴듯하지만 틀린 답을 생성하는 위험으로 설명하고, 출처 확인·제한된 문맥·사람의 검토 같은 개념적 완화책만 제시한다.

### SD-03. U1 기준선·출처의 정방향 및 역방향 연결

U4 문서에는 D3 stable ID를 사용한다. 공식 시험 기준선 ID는 `AIF-C01-D3-T<n>` 형식을 유지하고, 문서·용어·평가 자료의 파생 ID는 해당 기준선 ID를 참조한다.

U1의 canonical manifest가 확정되면 다음 양방향 연결을 검사한다.

1. 정방향: 기준선 항목 → U4 학습 문서·문항·카드·퀴즈·Anki 항목
2. 역방향: 각 U4 학습 문서·문항·카드·퀴즈·Anki 항목 → 기준선 항목
3. 출처 연결: 기준선의 `source_id` → `sources/source-registry.yaml`의 기록
4. revision 연결: 기준선의 `source_revision`, `status`, `source_checked` → 동일 기준선 행과 파생 문서의 출처 표지

U1 baseline/source manifest가 최종 확정되지 않은 연결은 이 설계에서 `Deferred`로 기록한다. 미확정 상태를 근거로 문서나 출처를 `verified`로 표시하지 않는다.

### SD-04. 출처·범위·문서 상태의 분리

다음 개념은 서로 다른 축이다.

| 구분 | 의미 | 예시 |
|---|---|---|
| 공식 범위 | AWS Certification 공식 시험 안내서가 정의한 학습 대상 | D3의 파운데이션 모델 적용 주제 |
| 실무 확장 | 시험 판단을 돕지만 시험 범위라고 단정하지 않는 설명 | RAG, prompt injection, 서비스 선택 단서 |
| 출처 접근 상태 | 원문을 확인했는지 나타내는 상태 | `downloaded`, `summarized`, `blocked`, `확인 필요` |
| 문서 상태 | 이 학습 문서가 검토·검증되었는지 나타내는 상태 | `draft`, `review`, `verified` |

출처가 `blocked` 또는 `확인 필요`이면 그 출처에서 확인하지 못한 세부사항을 추측하지 않는다. 문서가 `review`라는 사실은 출처가 `verified`라는 뜻이 아니며, 반대로 출처가 확인되었다고 문서가 자동으로 `verified`가 되는 것도 아니다.

### SD-05. 상대 링크·UTF-8·결정적 직렬화

문서 간 링크는 저장소 상대 Markdown 링크를 사용한다. D3는 D2를 선수 문서로, D4를 다음 도메인으로 연결한다. 중앙 glossary가 아직 없으면 U4가 다른 Unit의 소유 파일을 대신 만들지 않고 임시 용어 inventory와 후속 연결 필요성을 남긴다.

모든 Markdown·JSON은 strict UTF-8로 저장한다. `traceability.json`은 고정 필드 순서와 요구사항 선언 순서를 사용하며, 배열 순서를 임의로 바꾸지 않는다. Mermaid나 외부 이미지가 없어도 핵심 보안 의미를 읽을 수 있도록 텍스트 설명을 우선한다.

### SD-06. 민감정보 비수집과 정적 검사

U4의 예시·문서·검사 결과에는 이름, 이메일, 계정 식별자, 토큰, API key, secret, 실제 고객 데이터가 없어야 한다. 의심되는 값이 발견되면 문서를 검토 상태로 유지하고 해당 값을 삭제하거나 합성 값으로 교체한다. 값이 정말 민감한지 확인할 수 없으면 보존하지 않고 `확인 필요`로 기록한다.

이 Unit은 사용자 prompt, 업로드 파일, 평가 답안, 모델 응답, 벡터 임베딩을 수집하거나 저장하지 않는다. 보안 설명에 필요한 데이터는 문서 안의 짧은 합성 텍스트로만 존재한다.

### SD-07. Unit 소유권과 다음 도메인 경계

U4는 D3 README·개념 문서·D3 용어 inventory를 소유한다. U1은 기준선·출처 manifest를, U7은 횡단 평가 자료를, U8은 품질 증거를 소유한다. U4는 이 파일들을 복제하거나 대신 확정하지 않고 안정 ID로 참조한다.

D3의 마지막 탐색 링크는 D4 README로 연결한다. D4의 내용이나 중앙 glossary의 최종 구조를 U4의 보안 설계에 포함하지 않는다.

## 보안 경계의 텍스트 흐름

실제 실행 흐름이 아니라 문서 작성자가 지켜야 하는 정적 경계는 다음과 같다.

> 공식 출처·승인된 요구사항 확인 → 합성 예시로 설명 작성 → 민감정보·범위 표지·상대 링크 검사 → 결정적 Markdown/JSON 저장 → U1 기준선·출처 연결 상태 확인

이 흐름에는 모델 호출, 사용자 데이터 입력, 저장소 업로드, API 요청, AWS 자격 증명이 없다.

## NFR별 적용성

| NFR ID | 적용성 | 보안 설계 적용 | 검증 증거 |
|---|---|---|---|
| NFR1.1 | 적용 | SD-01·SD-02: FM·prompt·RAG·fine-tuning·evaluation을 최초 등장 시 병기하고 합성 초보자 예시를 사용한다. | 문서 초보자 검토표, 용어 첫 등장 검사 |
| NFR2.1 | 적용 | SD-05: 일반 Markdown, 작은 비교표, 텍스트 흐름을 사용한다. | required-sections 및 모바일 판독 검사 |
| NFR2.2 | 적용 | SD-02·SD-05: 그림을 쓰면 alt text와 텍스트 fallback을 함께 제공하며, 그림 없이도 내용을 읽게 한다. | 접근성·fallback 검사 |
| NFR3.1 | 부분 적용·Deferred | SD-03: D3 문서 ID와 `AIF-C01-D3-T<n>`를 고정한다. U1 canonical baseline revision 확정 전 연결은 `Deferred`다. | ID 중복 검사 및 U1 manifest 재검토 |
| NFR3.2 | 부분 적용·Deferred | SD-03: 모델 선택·prompt·평가 문서를 기준선·출처와 양방향으로 연결한다. U1 정·역방향 manifest 확정 전에는 `Deferred`다. | traceability와 U1 manifest 대조 |
| NFR4.1 | 부분 적용·Deferred | SD-04: 모델명·기능·가격·리전·할당량은 공식 URL·제목·확인일·상태를 남긴다. U1 source registry 행 확정 전 연결은 `Deferred`다. | front matter·source registry 대조 |
| NFR4.2 | 부분 적용·Deferred | SD-04: 확인되지 않은 기능·수치는 `확인 필요`로 유지하고 문서를 `verified`로 승격하지 않는다. U1 출처 상태 확정 전 연결은 `Deferred`다. | 보류 상태 검사 |
| NFR5.1 | 적용 | SD-05·SD-07: 파일명·경로·상대 링크·앞뒤 문서·임시 glossary 연결을 규칙으로 고정한다. | 경로·링크·다음 문서 검사 |
| NFR6.1 | 적용 | SD-05: strict UTF-8과 결정적 JSON 순서를 사용한다. | UTF-8·JSON 파싱 검사 |
| NFR7.1 | 적용 | SD-06: 예시와 검사 결과에서 PII·secret·token·실제 고객 데이터를 금지한다. | 민감정보 검사 |
| NFR7.2 | 적용 | SD-01·SD-06: 모델 호출·fine-tuning·벡터 DB·prompt 업로드·답안 저장을 구현하지 않는다. | 범위·dependency·산출물 목록 점검 |
| NFR8.1 | 적용 | SD-04·SD-07: 공식 범위, 실무 확장, U4·U1·U7·U8 소유 경계를 섹션별로 표시한다. | 범위 표지 및 baseline 검사 |
| NFR8.2 | 부분 적용·Deferred | SD-04·SD-05: AWS 공식 문서를 한국어로 재구성하고 제목·링크·확인일을 남긴다. U1 source registry 확정 전 연결은 `Deferred`다. | 출처 검토 및 registry 대조 |
| NFR9.1 | 적용 | SD-07: D3는 4주 경로·점수·학습자 상태를 저장하지 않고 D4 링크만 제공한다. | Unit 책임·링크 검사 |

`Deferred`는 보안 설계가 없다는 뜻이 아니라, U1의 canonical baseline/source manifest가 확정되기 전까지 그 연결을 승인된 최종 연결로 간주하지 않는다는 뜻이다.

## 실패 처리

| 실패 상황 | 처리 | 금지 사항 |
|---|---|---|
| 공식 출처에 접근할 수 없음 | 출처 상태를 `blocked` 또는 `확인 필요`로 기록하고 확인 가능한 다른 공식 출처와 차이를 남긴다. | 확인하지 못한 기능·수치·범위를 추측하지 않는다. |
| U1 baseline/source manifest 미확정 | 해당 연결을 `Deferred`로 유지하고 안정 ID를 변경하지 않는다. | 임시 연결을 최종 `verified`로 표시하지 않는다. |
| 내부 링크·anchor 불일치 | 문서 저장 전 상대 링크를 수정하거나 검토 상태를 유지한다. | 깨진 링크를 정상으로 보고하지 않는다. |
| 결정적 JSON 파싱 실패 | JSON을 다시 직렬화하고 요구사항 ID·순서를 재검사한다. | 일부 항목만 생략한 채 통과 처리하지 않는다. |
| 민감정보 의심 값 발견 | 값을 삭제하거나 합성 값으로 교체하고 필요하면 `확인 필요`를 남긴다. | 원문 값을 로그·예시·검사 증거에 복사하지 않는다. |
| 범위 혼동 발견 | 시험 범위와 실무 확장 표지를 분리해 수정한다. | 실무 확장을 공식 출제 범위라고 단정하지 않는다. |
| reviewer 미실행 | Review appendix에 미실행 상태를 기록하고 문서 상태를 `review`로 유지한다. | reviewer receipt나 Unit completion을 추측해 기록하지 않는다. |

## 검증 증거

- `required-sections`: front matter, 목적·범위, 적용성, NFR 표, `## Sources`, `## Assumptions & Open Questions`, `## Review` 존재 여부를 확인한다.
- `upstream-coverage`: `security-requirements.md`, `tech-stack-decisions.md`, `unit-of-work.md`의 적용성을 확인하고 `functional-spec`을 N/A로 기록했는지 확인한다.
- `traceability`: `traceability.json`에 `NFR1.1`~`NFR9.1` 14개가 모두 선언되고 SD 결정 또는 정당한 `Deferred` 근거에 연결되는지 확인한다.
- `linter/type-check`: 실행 코드가 없으므로 해당 없음이다. 코드 블록은 설계 설명용 텍스트일 뿐 실행 대상이 아니다.
- UTF-8·민감정보·링크 검사: strict UTF-8, 합성 예시, 상대 링크, URL·제목·확인일·상태의 존재를 확인한다.
- U1 manifest가 확정되면 Deferred 네트워크가 아닌 baseline/source 연결을 재대조하고, 통과한 연결만 `OK`로 갱신한다.

## 핵심 정리

U4 보안 설계의 핵심은 실행형 AI 시스템에 보안 기능을 추가하는 것이 아니라, 정적 학습 자료가 실제 데이터·비밀·자격 증명·실행 코드를 취급하지 않도록 경계를 고정하는 것이다. 합성 예시, prompt injection·환각의 안전한 개념 설명, U1 양방향 추적성, 공식 범위와 실무 확장의 분리, 문서·출처 상태 분리, UTF-8·상대 링크·결정적 JSON 검사를 적용한다. U1 manifest가 확정되지 않은 연결은 `Deferred`로 남긴다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [콘텐츠 도메인 3: 파운데이션 모델의 적용](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html) — D3 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [Prompt engineering guidelines](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [Prompt injection](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-injection.html) — 보안 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [security-requirements.md](../nfr-requirements/security-requirements.md) — U4 보안 요구사항, 확인일: 2026-09-04, 상태: `review`
- [tech-stack-decisions.md](../nfr-requirements/tech-stack-decisions.md) — U4 기술 결정, 확인일: 2026-09-04, 상태: `review`
- [unit-of-work.md](../../../inception/units-generation/unit-of-work.md) — U4 Unit 계약, 확인일: 2026-09-04, 상태: `reviewed`

## Assumptions & Open Questions

- U1의 `sources/content-traceability.yaml`과 `sources/source-registry.yaml`의 canonical baseline/source manifest와 revision은 아직 최종 확정되지 않았다고 가정한다.
- U1 manifest가 확정되면 `NFR3.1`, `NFR3.2`, `NFR4.1`, `NFR4.2`, `NFR8.2`의 `Deferred` 연결을 재검사한다.
- 중앙 `docs/glossary.md`가 아직 없으면 U4는 임시 D3 용어 inventory와 다음 문서 링크만 제공하고 최종 glossary 소유권을 가져오지 않는다.
- 공식 출처의 변동 가능한 모델명·기능·가격·리전·할당량은 콘텐츠 작성 시 다시 확인한다.

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-07T02:00:02Z
**Iteration:** 1
**Request Challenge:** review:f9e9cc80777e827922e087e445bbdc90

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| — | — | 해당 없음 | U4의 정적 보안 설계와 14개 NFR 추적성에서 Critical·Major·Minor finding을 확인하지 못했다. | 추가 조치 없음. | — |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| required-sections·upstream-coverage·traceability | PASS | U4 packaging 입력과 상세 NFR 연결이 유지된다. |
| strict UTF-8·JSON·상대 링크·민감정보 점검 | PASS | 합성 예시와 no-runtime 경계가 유지된다. |
| linter/type-check | N/A | 실행 코드가 없는 정적 Unit이다. |

### Summary

U4의 FM·prompt·RAG 설명은 합성 예시와 U1 Deferred 추적성 경계를 유지하며, 모델 호출·DB·API·자격 증명·배포를 도입하지 않는다.
