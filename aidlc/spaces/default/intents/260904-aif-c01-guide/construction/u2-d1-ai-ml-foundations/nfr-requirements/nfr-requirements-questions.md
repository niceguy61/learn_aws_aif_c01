# U2 D1 NFR 요구사항 결정 기록

> 이 파일은 기존 승인 결정과 이미 생성된 U2 NFR 산출물의 결정 근거를 lifecycle 기록 형식으로 보완한다. 새로운 승인 질문을 사용자에게 다시 제시하지 않는다.

## Q1. U2의 문서 경계

U2는 D1 초보자용 정적 Markdown 문서·README·용어 연결을 소유하고, U1의 기준선·출처를 참조한다. API·DB·AWS 계정·배포·학습자 데이터 저장은 범위에서 제외한다.

[Answer]: 기존 승인 결정 적용 — `LearningContent`의 정적 문서 경계만 사용하고 runtime/API/DB/AWS account/deployment는 해당 없음으로 기록한다.

## Q2. 초보자 문서 품질

한국어 설명, 최초 영어 용어 병기, 쉬운 예시, 비교·시나리오·시험 판단 단서·오해 교정·확인 질문과 문서 간 상대 링크를 NFR로 보장한다.

[Answer]: 기존 승인 결정 적용 — UTF-8 Markdown과 YAML front matter, 개념 단위 문서, 모바일을 고려한 표·문단, 다음 문서·용어 연결을 사용한다.

## Q3. 공식 출처와 시험 범위

D1 공식 시험 범위와 실무 확장을 명확히 구분하고, 공식 URL·제목·확인일·접근 상태와 문서 상태를 분리한다. `blocked` 또는 `확인 필요` 출처에 의존한 문서는 `verified`로 승격하지 않는다.

[Answer]: 기존 승인 결정 적용 — U1 canonical source registry를 참조하고, 출처 상태와 문서 상태를 혼용하지 않으며 미확인 내용은 보류한다.

## Q4. 추적성과 glossary 상태

문서·기준선·출처·용어의 정방향·역방향 연결을 안정 ID와 `traceability.json`으로 추적한다. 중앙 `docs/glossary.md`가 아직 없다는 사실은 확인 필요 상태로 유지한다.

[Answer]: 기존 승인 결정 적용 — D1 용어 inventory를 임시 연결 대상으로 유지하고 중앙 glossary 부재와 U1 공식 baseline 행 미확정을 open issue로 남긴다.

## Q5. 개인정보와 외부 실행

산출물과 검사 기록에 학습자 이름·계정·답안·진도·PII·자격 증명·토큰·API key·실제 AWS 계정 식별자를 저장하지 않고, 브라우저 전송·세션·자동 저장·원격 업로드를 구현하지 않는다.

[Answer]: 기존 승인 결정 적용 — 민감정보와 학습자 데이터를 수집·저장·배포하지 않으며 로컬 읽기 전용 검사를 사용한다.

## Q6. 파일 형식과 검사 도구

Markdown·JSON은 UTF-8과 결정적 구조를 유지하고 기존 Bun 기반 `required-sections`, `upstream-coverage`, `traceability`, `linter`, `type-check` 경로를 우선 사용한다. 새 패키지·SDK·서비스는 추가하지 않는다.

[Answer]: 기존 승인 결정 적용 — 기존 검사 도구와 표준 파서를 재사용하고, 코드가 없는 문서에는 `linter`와 `type-check`를 비적용으로 기록한다.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/user-stories/stories.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u2-d1-ai-ml-foundations/functional-design/functional-spec.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u2-d1-ai-ml-foundations/functional-design/rules.md`

## Consolidated Summary Confirmation

앞선 결정으로 생성된 U2 NFR 산출물을 재사용해도 되는가?

- Looks correct
- Request changes

[Answer]: Looks correct
