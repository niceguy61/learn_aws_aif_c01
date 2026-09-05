# U1 기준선·출처 등록 Functional Design 질문

> 대상 Unit: `u1-baseline-and-source-registry`
> 목적: 승인된 요구사항·User Stories·Unit 계약을 정적 기준선·출처·추적 산출물의 기능 규칙으로 구체화한다.
> 작성 원칙: 새 애플리케이션·API·DB를 설계하지 않고 `sources/`의 Markdown·YAML과 중앙 추적표의 동작 경계를 정의한다.

## Q1. U1의 기능 경계

U1은 다른 Unit이 참조하는 공식 시험 기준선, 출처 메타데이터, 사이드바 링크, canonical 추적 계약을 소유하도록 승인되었다. Functional Design에서 이 경계를 다음처럼 확정해도 될까요?

- A. 승인된 U1 경계를 그대로 사용: `BaselineItem`, `SourceRecord`, `SidebarLink`와 `sources/content-traceability.yaml`을 U1이 소유
- B. U1에 도메인 학습 문서나 문제은행 콘텐츠 작성 책임도 추가
- C. 기준선과 출처만 두고 중앙 추적표는 별도 Unit으로 이동
- X. Other (please specify)

[Answer]: A

설명: 기존 승인 결정의 반복 확인이며 범위 변경 없음.

## Q2. BaselineItem의 필수 연결

요구사항 FR1.1과 Unit 계약은 기준선에서 파생 자료로, 파생 자료에서 기준선으로 이동할 수 있는 연결을 요구한다. 확인된 기준선 행마다 `learning_document_ids`, `question_ids`, `card_ids`, `quiz_ids`, `anki_ids` 배열을 두고, 각 파생 자료에도 `baseline_ids`를 두는 양방향 구조를 사용해도 될까요?

- A. 승인된 양방향 구조를 사용하고 연결이 없는 유형은 빈 배열로 기록
- B. 기준선에는 URL만 두고 파생 자료 연결은 각 도메인 문서가 관리
- C. 기준선과 파생 자료 사이에 URL만 연결하고 안정 ID 연결은 생략
- X. Other (please specify)

[Answer]: A

설명: 기존 승인 결정의 반복 확인이며 범위 변경 없음.

## Q3. 기준선·출처 상태와 검증 규칙

공식 안내서나 AWS 공식 페이지의 확인 상태가 자료의 확정 상태를 제한한다. 기준선·출처는 `discovered|downloaded|summarized|reviewed|verified|blocked`를 사용하고, `blocked` 또는 `확인 필요`인 행은 `verified` 파생 자료에 연결하지 않으며 차단 사유·영향·후속 조치를 `notes`에 남기는 규칙을 적용해도 될까요?

- A. 승인된 상태 흐름과 보류 규칙을 그대로 사용
- B. 미확인 출처도 초안 문서에는 `verified`로 연결 가능
- C. 차단 상태는 기록하지 않고 나중에 URL을 다시 확인할 때만 처리
- X. Other (please specify)

[Answer]: A

설명: 기존 승인 결정의 반복 확인이며 범위 변경 없음.

## Q4. U1의 주요 기능 흐름

U1 산출물은 실행형 서비스가 아니라 정적 파일 묶음이다. 다음 네 흐름을 Functional Design의 기능 명세로 정의해도 될까요?

1. 공식 revision·도메인·작업·기술 행을 안정 ID `AIF-C01-D<n>-T<n>`로 등록한다.
2. 공식 사이드바 링크와 사용 출처를 `source-registry.yaml` 및 `aws-sidebar-index.md`에 등록한다.
3. 기준선·출처 상태를 확인해 파생 자료의 허용 상태를 결정한다.
4. `content-traceability.yaml`의 양방향 연결과 고아·중복 ID를 검사한다.

- A. 네 흐름을 승인하고 정적 파일 검증으로 표현
- B. AWS API 호출이나 DB 저장 흐름을 추가
- C. 기준선 등록만 명세하고 상태·추적 검사는 U8로 이동
- X. Other (please specify)

[Answer]: A

설명: 기존 승인 결정의 반복 확인이며 범위 변경 없음.

## Q5. U1과 학습자 콘텐츠·품질의 경계

US1.1의 공식 범위·학습 지도 연결과 US5.1의 출처·최신성 검증은 U1이 기준선 ID와 출처 상태를 제공하고 U2~U7·U8이 각각 콘텐츠와 평가·품질 산출물을 소유하는 구조로 매핑되어 있다. 이 소유권 분리를 유지해도 될까요?

- A. 승인된 Unit–User Story 매핑과 소유권을 그대로 유지
- B. U1이 모든 도메인 README와 품질 보고서를 직접 생성
- C. U1의 기준선 연결 없이 각 도메인이 자체 출처 ID를 만든다
- X. Other (please specify)

[Answer]: A

설명: 기존 승인 결정의 반복 확인이며 범위 변경 없음.

## Q6. UI 산출물 적용 여부

U1은 `spec` Unit이며 학습자용 화면이나 프런트엔드 컴포넌트를 만들지 않는다. 따라서 `frontend-components.md`는 생성하지 않고, 정적 Markdown·YAML 파일의 열람·상대 링크·검증 경계만 `functional-spec.md`에 기록해도 될까요?

- A. `frontend-components.md`는 해당 없음으로 두고 정적 산출물 경계만 명세
- B. 기준선 등록을 위한 웹 UI 컴포넌트 계층을 설계
- C. 학습자용 화면은 아니지만 YAML 편집 UI 컴포넌트를 설계
- X. Other (please specify)

[Answer]: A

설명: 기존 승인 결정의 반복 확인이며 범위 변경 없음.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/user-stories/stories.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work-story-map.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/domain-design/components.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/delivery-planning/bolt-plan.md`

## Consolidated Summary Confirmation

- Q1~Q6은 모두 `A`로 답변되었으며, 기존 승인 결정의 반복 확인이며 범위 변경 없음이다.
- U1은 `ReferenceCatalog`의 `BaselineItem`, `SourceRecord`, `SidebarLink`와 `sources/content-traceability.yaml`의 canonical 추적 계약을 소유한다.
- 기준선·파생 자료는 stable ID와 양방향 배열로 연결하고, 출처 상태가 `blocked` 또는 `확인 필요`이면 `verified` 파생 자료를 허용하지 않는다.
- U1의 네 기능 흐름은 기준선 등록, 사이드바·출처 등록, 상태 결정, 양방향 추적성 검사를 정적 Markdown·YAML·JSON 검증으로 수행한다.
- 도메인 학습 문서·문제은행·품질 보고서와 UI는 U1의 소유 범위에 포함하지 않는다.

위 요약은 사용자가 승인한 Q1~Q6 답변과 기존 upstream 결정을 그대로 반영한다.

[Answer]: Looks correct
