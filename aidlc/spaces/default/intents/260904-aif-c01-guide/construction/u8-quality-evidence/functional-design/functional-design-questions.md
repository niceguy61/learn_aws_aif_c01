# U8 품질 증거 Functional Design 질문

> 대상 Unit: `u8-quality-evidence`
> 목적: 모든 정적 학습 자료의 품질 판정·출처 검증·범위 추적 증거를 재구성 가능한 계약으로 정의한다.
> 적용 원칙: 사용자가 승인한 정적 Markdown/CSV, 공식 출처 추적, D1→D5 범위, 초보자 검토와 비수집 경계를 그대로 적용한다.

## Q1. U8 소유 경계

U8은 `QualityEvidence`로서 콘텐츠 본문을 수정하지 않고 검사 대상, 판정, 근거, 조치, 재검사 결과를 소유한다. `QualityCheckRecord`와 통합 품질 보고서 계약만 U8이 소유하고 U1~U7 콘텐츠는 각 Unit이 소유하는 것으로 확정한다.

[Answer]: 승인된 경계를 그대로 사용

## Q2. 품질 검사 대상

검사 대상은 `DomainReadme`, `LearningDocument`, `GlossaryTerm`, `QuestionBankItem`, `ScoreSheet`, `Card`, `TermQuizItem`, `AnkiNote`, `SourceRecord`, `BaselineItem`의 허용 집합으로 고정한다. 각 대상은 stable ID와 workspace-relative `target_path`로 식별한다.

[Answer]: 승인된 허용 대상 집합을 사용

## Q3. 상태와 verified 승격

문서 상태 `draft|review|verified`와 출처 상태 `discovered|downloaded|summarized|reviewed|verified|blocked`를 분리한다. 기준선·출처가 `blocked` 또는 `확인 필요`이면 파생 자료의 `verified` 승격을 차단하고 사유·영향·후속 확인 대상을 기록한다.

[Answer]: 승인된 상태 분리와 승격 게이트를 사용

## Q4. 검사 범위와 판정

U8의 검사 범위는 공식 D1~D5 기준선·양방향 추적, 출처 메타데이터·최신성, 내부 링크·용어 연결, 초보자 관점·개념 단위, Markdown 제목·접근성, UTF-8/CSV, Mermaid 텍스트 fallback, 비밀·PII 검사로 고정한다. 각 기록의 판정은 `통과|실패|보류`로 한다.

[Answer]: 승인된 검사 범위와 판정을 사용

## Q5. 워크플로와 품질 보고서

U8은 대상 목록을 수집하고, 정적 검사를 실행하고, 실패·보류 항목에 조치와 재검사 계획을 남기고, 모든 확인된 범위 항목과 자료의 고아·누락을 점검한 뒤 통합 보고서를 갱신한다. 학습자는 도메인 README의 상대 링크로 보고서와 상태 의미를 확인한다.

[Answer]: 승인된 정적 검사·조치·재검사 흐름을 사용

## Q6. 실행형 기능과 UI 적용 여부

U8은 UI/API/DB/AWS 계정/학습자 데이터 저장을 설계하지 않는다. 검사 도구는 개념적 입력·출력과 오류·보류 동작만 정의하며, 실제 구현·자동 최신성 모니터링·온라인 답안 수집은 범위 밖으로 둔다.

[Answer]: UI/API/DB 없이 정적 품질 증거 경계만 정의

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/user-stories/stories.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work-story-map.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/domain-design/components.md`

## Consolidated Summary Confirmation

- Q1~Q6은 모두 기존 승인 결정과 사용자 요청을 그대로 반영하며 범위를 넓히지 않는다.
- U8은 `QualityCheckRecord`와 품질 증거 보고서만 소유하고 U1~U7의 콘텐츠 본문은 수정하지 않는다.
- 검사 대상·stable ID·workspace-relative 경로, 출처·문서 상태, verified 승격 게이트를 고정한다.
- 공식 범위 추적, 출처, 링크·용어, 초보자·개념 단위, UTF-8/CSV, Mermaid fallback, 비밀·PII 검사를 정적 파일 검사 흐름으로 연결한다.
- UI/API/DB/계정/학습자 데이터 저장과 자동 최신성 모니터링은 만들지 않는다.

[Answer]: Looks correct
