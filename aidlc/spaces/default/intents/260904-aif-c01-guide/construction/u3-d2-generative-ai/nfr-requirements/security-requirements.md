---
title: "U3 D2 GenAI의 기초 보안 요구사항"
domain: "D2"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
  - "https://aws.amazon.com/bedrock/"
source_checked: "2026-09-04"
---

# U3 D2 GenAI의 기초 보안 요구사항

## 목적과 범위

U3 `u3-d2-generative-ai`는 실행형 GenAI 애플리케이션이 아니라 D2 초보자용 정적 학습 문서와 용어 연결을 소유한다. 이 문서는 생성형 AI 개념을 안전하게 설명하고, 공식 시험 범위와 실무 확장을 구분하며, 학습자 데이터와 비밀을 저장하지 않도록 하는 요구사항을 정한다.

U3는 `LearningContent`의 `DomainReadme`, `LearningDocument`, `GlossaryTerm`을 다룬다. 공식 기준선과 출처의 원본 계약은 [U1 Unit 계약](../../../inception/units-generation/unit-of-work.md)의 `U1`과 [source registry](../../../../../../../../sources/source-registry.yaml)가 소유한다. U3는 U1의 ID·상태를 복사해 재정의하지 않고 참조한다.

## 적용 범위 표지

- **시험 범위**: D2의 GenAI 기본 개념, 비즈니스 문제 해결을 위한 기능·한계, AWS 인프라·기술 항목을 설명하는 문서 내용이다.
- **실무 확장**: `AIF-C01-D2-T<n>` 기준선 ID를 먼저 제시한 뒤, Amazon Bedrock, SageMaker AI, Amazon Q 등 서비스 선택과 기본 시나리오를 설명한다. 실무 확장을 공식 출제 항목으로 단정하지 않는다.
- **학습자용 해설**: 토큰·임베딩·RAG·멀티모달 등의 설명은 원문 복사가 아닌 한국어 재구성이다. 모델명·기능·가격·리전처럼 변하는 사실은 source registry의 상태와 확인일을 함께 확인한다.

## 단계 upstream 계약과 적용성

nfr-requirements 단계의 공통 upstream 이름은 `functional-spec`, `rules`, `requirements`이다. U3는 `packaging` Unit이므로 별도 실행 로직이나 서비스 기능을 설계하지 않는다.

- `functional-spec`: [U3 정적 패키징 기능 명세](../functional-design/functional-spec.md)를 소비한다. 이 명세는 실행 로직이나 API가 아니라 정적 Markdown·JSON 산출물, 안정 ID, U1 manifest 및 U7/start content handoff 경계를 정의한다.
- `rules`: 정적 문서 기술 규칙, 출처 추적 규칙, 초보자 품질 규칙을 적용한다. 런타임·배포 규칙은 해당 없음이다.
- `requirements`: 승인된 `requirements.md`를 정식 기능·비기능 요구사항 입력으로 사용한다.

## 보안 요구사항

상세 ID는 승인된 상위 `NFR`에서 파생했다. `NFRx.y`는 U3 문서·검사 수준의 요구사항이다.

| ID | 요구사항 | 검증 증거 | 관련 upstream |
|---|---|---|---|
| NFR1.1 | 설명은 한국어를 기본으로 하고 최초 등장 시 GenAI 핵심 영어 용어를 병기한다. AWS 서비스명·API명·URL·공식 문서 제목은 원문을 보존한다. | 초보자 검토와 문서 점검 | NFR1; AC2.1.1, AC2.1.2 |
| NFR2.1 | 제목 계층·링크·표는 GitHub-Flavored Markdown과 일반 뷰어에서 읽히며, 모바일에서 긴 표에만 의존하지 않는다. | Markdown lint와 링크·모바일 검토 | NFR2; AC2.1.5 |
| NFR2.2 | 이미지·Mermaid를 사용하면 한국어 텍스트 설명과 alt text·캡션을 제공하고 외부 렌더러를 필수로 만들지 않는다. | 텍스트 fallback·alt text 점검 | NFR2; NFR8; AC2.1.5 |
| NFR3.1 | D2 README·개념·용어는 안정 문서 ID를 사용하고 U1의 `AIF-C01-D2-T<n>`를 임의로 재번호화하지 않는다. | ID 형식·중복·기준선 검사 | NFR3; FR1.1, FR1.3 |
| NFR3.2 | U1이 소유한 `sources/content-traceability.yaml`의 `BaselineItem`과 `source-registry.yaml`을 소비해 `D2-README`, `LD-d2-<slug>`, `TERM-d2-<slug>` 각각의 `baseline_ids`, `source_ids`, `forward_refs`, `reverse_refs`, `target_path`를 기록하고 기준선·출처↔문서·용어 연결을 재구성한다. manifest가 채워지기 전에는 `Deferred`로 유지한다. | content-traceability manifest·traceability·상대 링크 검사 | NFR3; FR1.3, FR6.2 |
| NFR4.1 | 외부 사실을 담은 문서는 공식 URL·제목·확인일·접근 상태와 문서 상태를 표시한다. 출처 상태와 문서 상태를 혼용하지 않는다. | front matter·registry 대조 | NFR4; FR5.1 |
| NFR4.2 | `blocked` 또는 `확인 필요` 출처에 의존하는 모델·서비스 사실은 `verified`로 승격하지 않고 영향·후속 확인을 기록한다. | 상태 전이·보류 항목 점검 | NFR4; FR5.2, FR5.3 |
| NFR5.1 | 파일·디렉터리는 소문자·숫자·하이픈을 사용하고 개념 문서에 선수·다음 문서·용어 연결을 둔다. | 경로·내부 링크 검사 | NFR5; FR2.1, FR2.2 |
| NFR6.1 | Markdown과 JSON은 strict UTF-8과 결정적 ID·배열 순서를 사용한다. | UTF-8 판별과 JSON parse | NFR6; FR5.1, FR6.3 |
| NFR7.1 | U3에는 학습자 계정·프롬프트·답안·진도·PII·자격 증명·토큰·API key·실제 계정 식별자를 기록하지 않는다. | 민감정보 패턴·수동 검토 | NFR7; FR6.4 |
| NFR7.2 | U3는 모델 호출, 브라우저 전송, 인증, 세션, 자동 저장, 원격 업로드를 구현하지 않고 정적 파일 경계만 제공한다. | 파일·의존성·코드 범위 점검 | NFR7; FR3.1, FR4.5 |
| NFR8.1 | 각 섹션은 `시험 범위` 또는 기준선 ID를 앞세운 `실무 확장`으로 표시하며 서비스 예시를 공식 출제 범위로 표현하지 않는다. | 섹션 표지·baseline 검사 | NFR8; FR2.6 |
| NFR8.2 | 공식 원문을 통째로 복사하지 않고 한국어로 재구성하며 문서 끝에 공식 출처 메타데이터를 남긴다. | 출처·인용·유사성 검토 | NFR8; FR5.4 |
| NFR9.1 | U3는 4주 계획이나 학습자 점수를 저장하지 않는다. U3는 D2 용어 inventory와 `TERM-d2-<slug>`·문서 ID를 U7/start content에 전달하고, 중앙 `docs/glossary.md`의 조립·갱신은 U7/start content가 소유한다. | Unit handoff·소유권·링크 검사 | NFR9; FR3.1 |

## 접근 제어와 변경 무결성

U3에는 런타임 접근 제어가 없다. 저장소 권한, 리뷰, 버전 관리 이력이 정적 문서 변경의 경계다.

1. U1의 기준선·source ID를 새로 만들거나 재사용하지 않는다.
2. 문서 링크는 저장소 상대 경로를 사용하며 사용자 홈·절대 경로·임시 경로를 기록하지 않는다.
3. 출처 확인 실패 시 내용을 추측하지 않고 `blocked` 또는 `확인 필요`로 보류한다.
4. 검사 도구는 로컬 파일을 읽기 전용으로 검사하며 프로젝트 내용·비밀·학습자 데이터를 외부로 전송하지 않는다.
5. 모델·서비스 기능·가격·리전·할당량은 공식 확인일과 상태를 문서에 연결한다.

## 해당 없음으로 기록하는 보안 항목

| 항목 | U3 판정 | 근거 |
|---|---|---|
| 사용자 인증·인가 | 해당 없음 | 로그인 사용자나 보호된 애플리케이션 기능이 없다. |
| AWS IAM·KMS·Secrets Manager | 해당 없음 | AWS 계정 호출·role/policy·키·secret을 생성·저장하지 않는다. |
| API·세션·TLS 운영 | 해당 없음 | HTTP API와 세션이 없고 URL은 출처 메타데이터다. |
| 데이터베이스·벡터 저장소 | 해당 없음 | RAG·임베딩은 개념 설명일 뿐 실제 학습자나 애플리케이션 데이터를 저장하지 않는다. |
| 네트워크·WAF·런타임 취약점 | 해당 없음 | 장기 실행 서비스·네트워크 진입점·컨테이너가 없다. |
| 배포·호스팅·AWS 계정 | 해당 없음 | 결과물은 승인된 정적 저장소 파일이다. |
| 백업·재해 복구 | 해당 없음 | 서비스 데이터 보존 목표가 없으며 기존 저장소 이력을 사용한다. |

## 내부 연결과 다음 문서

- D2 진입점: [D2 README](../../../../../../../../docs/02-generative-ai/README.md)
- D2 개념 문서와 용어는 동일 도메인의 상대 링크로 연결한다.
- 다음 도메인: [D3 README](../../../../../../../../docs/03-foundation-models/README.md)
- 용어 연결: 중앙 `docs/glossary.md`는 [U7/start content](../../../inception/units-generation/unit-of-work.md#u7--평가복습-자료)가 조립·갱신하고, U3는 D2 terminology inventory와 `TERM-d2-<slug>` handoff를 제공한다.
- 추적성 입력: [U1 canonical manifest 계약](../../../inception/units-generation/unit-of-work.md#u1--기준선출처-등록)의 `sources/content-traceability.yaml`을 소비하며, manifest가 생성되기 전에는 해당 연결을 `Deferred`로 유지한다.
- 승인된 요구사항: [requirements.md](../../../inception/requirements-analysis/requirements.md)
- U3 Unit 계약: [unit-of-work.md](../../../inception/units-generation/unit-of-work.md)

## 핵심 정리

U3의 보안은 모델 호출을 보호하는 런타임 설계가 아니라 정적 설명의 경계 관리다. 기준선·출처·범위 표지·UTF-8·상대 링크·재현 가능한 검사를 지키고, 프롬프트·학습자 데이터·비밀·AWS 계정·런타임을 도입하지 않는다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 시험 범위·5개 도메인 기준, 확인일: 2026-09-04, registry 상태: `downloaded`
- [콘텐츠 도메인 2: GenAI의 기초](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html) — D2 작업·기술 기준, 확인일: 2026-09-04, registry 상태: `downloaded`
- [Amazon Bedrock](https://aws.amazon.com/bedrock/) — D2 실무 확장 서비스 개요, 확인일: 2026-09-04, registry 상태: `summarized`
- [source-registry.yaml](../../../../../../../../sources/source-registry.yaml) — URL·제목·도메인·확인일·접근 상태의 canonical 등록부, 확인일: 2026-09-04

## Assumptions & Open Questions

- U1이 D2의 `AIF-C01-D2-T<n>` 행과 revision을 확정하기 전에는 파생 문서를 `verified`로 승격하지 않는다.
- `docs/glossary.md`는 아직 없으므로 중앙 glossary 존재 검사는 보류한다.
- 모델명·기능·요금·리전·할당량은 작성일 기준 공식 문서에서 별도 재확인해야 한다.
## Review

**Request Challenge:** review:a7d2d3413b18be98ecbdfca840397ad6
**Verdict:** NOT-READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-04T21:27:29Z
**Iteration:** 2

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| R-01 | Critical | `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u3-d2-generative-ai/nfr-requirements/traceability.json` > `upstream_contract.functional-spec`; `construction/u3-d2-generative-ai/functional-design/` | The nfr-requirements stage contract marks `functional-spec` as required and requires the functional-design stage, but U3 still declares it `N/A` and no U3 functional-spec file exists. The upstream sensor only proves that the token is mentioned, not that the required artifact exists. | Add a minimal U3 functional-spec for the static Markdown/JSON outputs and no runtime behavior, or establish an explicit machine-recognized packaging-unit exception in the stage/unit contract; update the NFR upstream evidence. | Unresolved |
| R-02 | Major | `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md` > U3 outputs; `security-requirements.md` > `docs/glossary.md`; `traceability.json` > `FR3.3` | The upstream contract identifies `GlossaryTerm` as part of `LearningContent` and requires cumulative `docs/glossary.md`, but U3 owns only a D2 terminology inventory, no central glossary file exists, and no named assembly owner or handoff contract resolves `FR3.3`. | Assign the central glossary and update responsibility to a named Unit, or define the downstream assembly owner and inventory-to-glossary handoff; make `FR3.3` target and completion evidence concrete. | Unresolved |
| R-03 | Major | `tech-stack-decisions.md` > TECH3.3/TECH3.4; `traceability.json` > `source_paths` and `NFR3.2` | The U1 contract now confirms `sources/content-traceability.yaml` as the canonical manifest and defines baseline-side fields, but the manifest file is absent, U3's `source_paths` omits it, and U3 still defines no serialization for its `LearningDocument`/`GlossaryTerm` IDs and reverse mappings. A developer cannot reproduce the promised bidirectional content check without guessing. | Add the canonical manifest to U3's consumed source paths and specify the exact U3 document/term ID, baseline/source reference, reverse-link, and validation fields, or explicitly delegate that contract with a concrete handoff. | Unresolved |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-required-sections.ts` — security and tech-stack artifacts | PASS; 11 H2 headings each | Markdown structure is valid; it does not validate required upstream artifact existence or ownership. |
| `aidlc-sensor-upstream-coverage.ts` — security artifact | PASS; `unreferenced: []` | Required upstream names are mentioned, but the required U3 functional-spec file is absent. |
| `aidlc-sensor-traceability.ts` — `traceability.json` | PASS; gaps/orphans/invalid targets all empty | Requirement-level mapping parses cleanly, but it does not prove glossary ownership or content-manifest existence/schema. |
| File existence and JSON parse check | U3 functional-spec: FAIL; `sources/content-traceability.yaml`: FAIL; `docs/glossary.md`: FAIL; JSON parse: PASS | Confirms the three unresolved cross-artifact gaps while the traceability JSON itself is syntactically readable. |
| linter/type-check | NOT APPLICABLE | U3 produces no TypeScript/JavaScript code or runtime configuration. |

### Summary

The static, no-runtime/no-credentials boundary remains coherent, and the local structural sensors pass. However, the required functional-spec input and two cross-Unit content contracts are still not implementable without architectural clarification, so the prior R-01–R-03 findings remain unresolved and the verdict is NOT-READY.
