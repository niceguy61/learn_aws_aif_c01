---
title: "U3 D2 GenAI의 기초 기술 결정"
domain: "D2"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
  - "https://aws.amazon.com/bedrock/"
source_checked: "2026-09-04"
---

# U3 D2 GenAI의 기초 기술 결정

## 목적과 경계

U3는 D2의 초보자용 정적 Markdown·JSON 콘텐츠 패키지다. 생성형 AI 모델을 호출하거나 RAG 저장소를 구축하지 않고, 개념·서비스 선택 단서·출처·문서 탐색을 재현 가능하게 제공한다.

## 단계 upstream 적용성

`requirements`는 승인된 요구사항 파일을 직접 소비한다. `rules`는 정적 문서·출처 추적·초보자 품질 규칙으로 적용한다. `functional-spec`은 [U3 정적 패키징 기능 명세](../functional-design/functional-spec.md)를 소비하며, 실행 동작·API가 아닌 정적 산출물·안정 ID·U1 manifest·U7/start content handoff를 정의한다. 세 판정과 경로는 `traceability.json`에 기록한다.

## 결정 요약

| 결정 ID | 선택 | 적용 대상 | 이유 |
|---|---|---|---|
| TECH3.1 | UTF-8 Markdown + YAML front matter | D2 README·개념·NFR 문서 | 한국어와 영어 기술 용어를 보존하고 일반 뷰어에서 읽을 수 있다. |
| TECH3.2 | 저장소 상대 Markdown 링크 | D2 문서·D3 다음 문서·용어 연결 | 호스트·계정·배포 환경에 종속되지 않는다. |
| TECH3.3 | U1 canonical source registry 및 content-traceability manifest 참조 | 시험 범위·Bedrock 등 서비스 출처·D2 문서/용어 연결 | URL·제목·확인일·상태와 `baseline_id`·`source_id`·revision의 중복·불일치를 막고 U1 소유 계약을 재사용한다. |
| TECH3.4 | 결정적 JSON 추적표 및 U1 manifest handoff | upstream·FR/NFR/AC·Unit·component·D2 문서/용어 연결 | U1 manifest의 `BaselineItem`과 U3 항목의 `id`, `target_path`, `baseline_ids`, `source_ids`, `forward_refs`, `reverse_refs`를 고정된 순서로 검증할 수 있다. |
| TECH3.5 | 기존 Bun 검사 도구 최소 의존성 | required-sections·upstream-coverage·traceability·linter·type-check | 새 패키지·SDK·빌드 체계를 추가하지 않는다. |
| TECH3.6 | 서비스·모델 정보의 상태 분리 | 공식 시험 범위·실무 확장·변동 사실 | 출처 상태와 문서 상태를 혼동하지 않고 미확인 사실을 보류한다. |
| TECH3.7 | Mermaid 선택·텍스트 fallback 필수 | GenAI 흐름·RAG 개념 설명 | 외부 렌더러 없이도 핵심 관계를 읽을 수 있다. |
| TECH3.8 | 버전 관리형 정적 패키지 | `docs/02-generative-ai/` 및 `aidlc/` | 네트워크·계정·학습자 데이터 저장 없이 동일 입력의 결과를 재현한다. |
| TECH3.9 | 카드·퀴즈·Anki는 U7 위임 | D2 용어와 문서 ID | 평가 자료의 중복 소유와 추적성 충돌을 막는다. |

## 문서 구조 결정

각 D2 문서는 다음 순서를 따른다: 이 문서에서 배울 것, 선수 지식과 한 줄 요약, 쉬운 핵심 개념, AWS 관점과 관련 서비스, 비슷한 개념·서비스 비교, 실무형 시나리오, 시험 판단 단서, 자주 하는 오해, 핵심 정리, 확인 질문, 다음 문서, 출처. 시험 범위와 실무 확장은 섹션 단위로 표지한다.

## 탐색·접근성 결정

D2 README는 D1에서 배운 내용을 선수 지식으로 연결하고, D2 문서 사이에는 설명적인 상대 링크를 둔다. 마지막 문서는 D3 README로 이어진다. 긴 서비스 비교는 작은 표나 목록으로 나누며 이미지가 없을 때도 텍스트 설명이 남는다. 중앙 `docs/glossary.md`는 U7/start content가 조립·갱신하고 U3는 D2 inventory를 전달한다. U1 `sources/content-traceability.yaml`은 기준선·출처·문서·용어 연결의 canonical 입력이다.

## 검사·재현성 결정

| 검사 | U3 대상 | 판정 |
|---|---|---|
| required-sections | 두 Markdown의 front matter·핵심 H2·Sources·Review | 필수 구조가 없으면 실패 |
| upstream-coverage | requirements와 정적 규칙·U1 registry 참조 | 필수 upstream 이름이 문서·JSON에 나타나야 함 |
| traceability | `traceability.json`, U1 `sources/content-traceability.yaml`, D2 문서·용어 handoff | upstream·AC·상세 NFR·Unit·component와 `id`·`target_path`·`baseline_ids`·`source_ids`·`forward_refs`·`reverse_refs`의 누락·고아 0건; U1 manifest 미생성 시 `Deferred` |
| linter | Markdown 안 TypeScript/JavaScript 블록 | 코드가 없으면 not applicable |
| type-check | TypeScript/JavaScript 산출물 | 코드가 없으면 not applicable |
| UTF-8·링크·민감정보 | 세 산출물과 참조 경로 | strict UTF-8·상대 링크·secret/PII 부재 |

## 해당 없음 결정

| 항목 | 상태 | 근거 |
|---|---|---|
| Model runtime/inference | 해당 없음 | 모델을 호출·호스팅·평가하지 않고 개념을 설명한다. |
| API/HTTP 서버 | 해당 없음 | 링크는 문서 탐색·출처이며 API 계약이 아니다. |
| Database/vector store | 해당 없음 | 임베딩·RAG는 설명 대상으로만 존재한다. |
| AWS account/credentials | 해당 없음 | AWS SDK·IAM·token·secret·유료 리소스를 사용하지 않는다. |
| Deployment/hosting | 해당 없음 | shared static package로 전달하며 배포 토폴로지를 설계하지 않는다. |
| Runtime scalability/availability/DR | 해당 없음 | 서비스 트래픽이 없고 정적 파일 재현성이 품질 속성이다. |
| New dependency | 해당 없음 | 기존 Bun 센서와 표준 파서로 검증한다. |

## 대안과 트레이드오프

### 실행형 Bedrock 데모

개념 이해에 도움을 줄 수 있지만 AWS 계정·비용·자격 증명·사용자 데이터 경계를 도입한다. 승인된 정적 가이드와 충돌하므로 선택하지 않았다.

### 벡터 데이터베이스 구축

RAG를 체험할 수 있지만 데이터베이스·운영·비용·보안 요구가 생긴다. U3는 RAG 판단 개념과 서비스 구분만 제공하고 구현은 범위 밖으로 둔다.

### 새 Markdown 처리 패키지

일부 자동화 편의보다 lockfile·공급망 부담이 커진다. 기존 Bun 검사 경로를 우선한다.

## 핵심 정리

U3는 UTF-8 정적 문서, U1 출처 계약, 결정적 JSON 추적표, 상대 링크와 기존 Bun 센서를 사용한다. 모델 호출·API·DB·AWS 계정·유료 실습·학습자 데이터 저장은 도입하지 않는다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [콘텐츠 도메인 2: GenAI의 기초](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html) — D2 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [Amazon Bedrock](https://aws.amazon.com/bedrock/) — 실무 확장 서비스 출처, 확인일: 2026-09-04, 상태: `summarized`
- [U3 정적 패키징 기능 명세](../functional-design/functional-spec.md) — 정적 산출물·ID·handoff 계약, 확인일: 2026-09-04, 상태: `review`
- [U3 Unit 계약](../../../inception/units-generation/unit-of-work.md) — 경계·소유권 기준, 확인일: 2026-09-04, 상태: `reviewed`

## Assumptions & Open Questions

- U1의 D2 기준선 revision과 `sources/content-traceability.yaml`이 확정되기 전까지 문서 상태와 content-level mapping은 `review`/`Deferred`다.
- 중앙 `docs/glossary.md`는 U7/start content가 조립·갱신하며 U3는 D2 terminology inventory와 안정 term ID를 handoff한다.
- 변동 가능한 모델·서비스 사실은 각 파생 문서 작성 시 공식 출처를 다시 확인한다.
