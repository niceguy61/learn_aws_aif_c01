---
title: "U3 D2 GenAI의 기초 정적 패키징 기능 명세"
unit: "u3-d2-generative-ai"
kind: "packaging"
status: "review"
---

# U3 D2 GenAI의 기초 정적 패키징 기능 명세

## 목적과 경계

U3는 D2 초보자용 학습 자료를 저장소에서 읽을 수 있는 정적 Markdown·JSON 연결 패키지로 제공한다. 이 명세는 실행형 GenAI 기능이나 API를 정의하지 않고, nfr-requirements 단계가 소비할 문서 산출물·식별자·handoff 경계를 명시한다.

## 기능적 산출물

| 산출물 | 안정 ID 규칙 | 책임 |
|---|---|---|
| D2 README | `D2-README` | 선수 지식, D2 학습 순서, 시험 범위·실무 확장 표지, D3 연결 |
| D2 개념 문서 | `LD-d2-<slug>` | 개념 설명, AWS 관점, 비교, 시나리오, 시험 단서, 출처 |
| D2 용어 inventory | `TERM-d2-<slug>` | 용어 정의, 연결 문서 ID, 기준선·출처 참조 |

실제 최종 콘텐츠 파일은 `docs/02-generative-ai/` 아래에 생성하며, 이 Unit은 파일 경로와 안정 ID를 U1 canonical manifest에 전달한다.

## 정적 동작

1. 학습자는 Markdown viewer에서 README와 개념 문서를 읽는다.
2. 저장소 상대 링크로 선수 D1 문서, 같은 도메인의 다음 문서, D3 문서로 이동한다.
3. 문서와 용어는 `AIF-C01-D2-T<n>` 기준선 ID 및 U1 `source_id`를 참조한다.
4. U3는 U1이 소유한 `sources/content-traceability.yaml`의 `BaselineItem`을 소비하고, 각 `LearningDocument`·`GlossaryTerm` ID를 해당 행의 정방향·역방향 배열에 전달한다.
5. U3는 D2 용어 inventory를 U7/start content에 전달하며, 중앙 `docs/glossary.md`의 조립·갱신은 U7/start content가 소유한다.

## 비기능 경계와 해당 없음

- 모델 호출, 프롬프트 제출, RAG 검색, 학습·미세 조정, 평가 실행은 없다.
- API, 인증, 세션, 데이터베이스, 벡터 저장소, AWS 계정, 자격 증명, 유료 리소스는 없다.
- 학습자 이름·답안·진도·PII·비밀·토큰·API key는 입력·저장·전송하지 않는다.
- 검증은 기존 저장소 센서와 UTF-8·JSON·상대 링크 검사로 로컬에서 수행한다.

## 검증 가능한 handoff

U3가 전달하는 각 문서·용어 항목은 다음 정보를 가져야 한다.

- `id`: `D2-README`, `LD-d2-<slug>`, 또는 `TERM-d2-<slug>`
- `target_path`: workspace-relative Markdown 경로 또는 glossary anchor
- `baseline_ids`: 하나 이상의 `AIF-C01-D2-T<n>`
- `source_ids`: U1 `source-registry.yaml`의 `SRC-*`
- `forward_refs`: 문서·용어에서 기준선·출처로 가는 ID 배열
- `reverse_refs`: 기준선·출처에서 문서·용어로 돌아오는 ID 배열

U1 manifest가 아직 채워지지 않은 기준선은 `Deferred` 또는 `확인 필요`로 남기며, U3 문서 상태를 `verified`로 승격하지 않는다.

## 내부 출처

- [U3 Unit 계약](../../../inception/units-generation/unit-of-work.md)
- [승인된 요구사항](../../../inception/requirements-analysis/requirements.md)
- [U1 canonical manifest 계약](../../../inception/units-generation/unit-of-work.md#u1--기준선출처-등록)
