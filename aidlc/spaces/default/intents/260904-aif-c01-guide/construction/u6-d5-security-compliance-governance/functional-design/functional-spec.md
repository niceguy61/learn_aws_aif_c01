---
title: "U6 D5 보안·규정 준수·거버넌스 정적 패키징 기능 명세"
unit: "u6-d5-security-compliance-governance"
kind: "packaging"
status: "review"
---

# U6 D5 보안·규정 준수·거버넌스 정적 패키징 기능 명세

## 목적과 범위

U6는 AIF-C01 D5 학습자를 위한 정적 Markdown·JSON 패키지를 정의한다. 이 명세는 실행형 보안 서비스나 AWS 계정 기능을 정의하지 않고, D5 README·개념 문서·용어 inventory와 U1/U7 정적 handoff의 최소 계약을 고정한다.

## 정적 산출물과 안정 ID

| 산출물 | 안정 ID 규칙 | 책임 |
|---|---|---|
| D5 README | `D5-README` | D4 선수 지식, D5 학습 순서, 시험 범위·실무 확장 표지, U7 연결 |
| D5 개념 문서 | `LD-d5-<slug>` | 보안·규정·거버넌스 개념, AWS 관점, 비교, 시나리오, 출처 |
| D5 용어 inventory | `TERM-d5-<slug>` | 용어 정의, 연결 문서, U1 기준선·출처 참조 및 U7 handoff |

최종 콘텐츠는 `docs/05-security-compliance/` 아래에 생성한다. U6는 중앙 `docs/glossary.md`, 문제은행, 카드, 퀴즈, Anki와 학습자 일정·점수를 소유하지 않는다.

## 정적 동작

1. 학습자는 Markdown viewer에서 D5 README와 개념 문서를 읽는다.
2. 저장소 상대 링크로 D4 선수 문서와 U7 평가·복습 자료로 이동한다.
3. D5 문서·용어는 U1이 소유하는 `AIF-C01-D5-T<n>` 기준선과 `SRC-*` 출처를 참조한다.
4. U6는 U1 `sources/content-traceability.yaml`의 `BaselineItem`을 소비하고, 문서·용어 ID를 정방향·역방향 배열의 후속 handoff로 제공한다.
5. U7은 D5 terminology inventory를 소비하여 중앙 glossary와 평가 자료를 조립한다. 실제 파일·anchor 생성 전 링크 상태는 `Deferred`다.

## 비기능 경계와 해당 없음

- IAM role/policy, KMS key, Macie scan, PrivateLink, Guardrails, API, DB, 네트워크, 계정, credentials, 배포, 실행 코드는 없다.
- 규정 설명은 학습용 개념과 공식 확인 경로에 한정하며 법률 자문·인증·준수 보증을 제공하지 않는다.
- 사례는 합성 값만 사용하고 학습자 계정·답안·점수·진도·PII를 수집·저장·전송하지 않는다.
- 검증은 기존 로컬 센서와 strict UTF-8·JSON·상대 링크·민감정보 검사로 수행한다.

## 검증 가능한 handoff

U6가 U1과 U7에 전달하는 항목은 다음 정보를 가진다.

- `id`: `D5-README`, `LD-d5-<slug>`, 또는 `TERM-d5-<slug>`
- `target_path`: workspace-relative Markdown 경로 또는 후속 glossary anchor
- `baseline_ids`: 하나 이상의 `AIF-C01-D5-T<n>`
- `source_ids`: U1 `source-registry.yaml`의 `SRC-*`
- `forward_refs`: 문서·용어에서 기준선·출처로 향하는 ID 배열
- `reverse_refs`: 기준선·출처에서 문서·용어로 돌아오는 ID 배열

U1의 `BaselineItem`은 `baseline_id`, `source_id`, `source_revision`, `status`, `learning_document_ids`, `question_ids`, `card_ids`, `quiz_ids`, `anki_ids`를 필수 필드로 가진다. U6는 이 필드를 복제해 소유하지 않고 소비한다.

U1 manifest 또는 downstream 파일·anchor가 아직 생성되지 않은 경우 해당 연결은 `Deferred`다. `blocked` 또는 `확인 필요` 기준선·출처는 파생 문서의 `verified` 연결 대상이 될 수 없다.

## 연결된 다음 문서

- [U6 Unit 계약](../../../inception/units-generation/unit-of-work.md)
- [승인된 요구사항](../../../inception/requirements-analysis/requirements.md)
- [U1 canonical manifest 계약](../../../inception/units-generation/unit-of-work.md#u1--기준선출처-등록)
