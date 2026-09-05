# Project-Level Rules

> Project-specific specialisation and corrections. Loaded after `org.md` and
> `team.md` as strict-additive guidance; contradictions with broader policy
> are rejected. Populated by practices-discovery and the self-learning loop.
>
> Use sparingly: most teams don't need a project layer. Reach for it
> only when this specific project needs stable, durable guidance beyond the
> team practice (for example, package-specific release checks or an additional
> regression suite for a legacy component).

## Way of Working

<!-- Project-specific specialisation. Example: -->
<!-- This monorepo requires package-scoped branch names and a package owner -->
<!-- review in addition to the team's normal merge policy. -->

## Walking Skeleton

<!-- Project-specific specialisation. Example: -->
<!-- The walking skeleton must exercise the legacy service adapter as well -->
<!-- as the new service boundary. -->

## Testing Posture

<!-- Project-specific specialisation. -->

## Deployment

<!-- Project-specific specialisation. -->

## Code Style

<!-- Project-specific specialisation. -->

## Tech Stack

<!-- Technology choices locked for this project. -->

## Decided

<!-- Decisions made in earlier stages that should not be re-asked. -->
<!-- Format: DECIDED: [decision] (Stage [slug], [date]) -->

## Scope Overrides

<!-- Custom scope rules for this project. -->

## Forbidden

<!-- Populated by practices-discovery affirmation gate. -->
<!-- Format: NEVER [behavior] (affirmed [date]) -->
<!-- Example: NEVER throw exceptions across service layer boundaries (affirmed 2026-05-17) -->

- NEVER 공식 시험 안내서가 정의하지 않은 내용을 AIF-C01 공식 출제 범위인 것처럼 단정한다. (affirmed 2026-09-04)
- NEVER 출처 원문을 통째로 복사하거나, 차단·미확인 출처의 내용을 추측하여 작성한다. (affirmed 2026-09-04)
- NEVER 출처 레지스트리와 문서의 URL·제목·확인 날짜·상태·연결 문서를 불일치 상태로 둔다. (affirmed 2026-09-04)
- NEVER 내부 링크, 다음 문서 연결, 용어 연결 또는 공식 작업·기술 항목 추적이 끊긴 상태로 통합한다. (affirmed 2026-09-04)
- NEVER 권리 또는 재사용·사용 조건이 불명확한 AWS 호스팅 공식 이미지를 다운로드하거나 재배포한다. (affirmed 2026-09-04)
- NEVER 이미지에 의미 있는 한국어 alt text, 캡션 또는 주변 설명, 텍스트 대체 경로 없이 이미지 하나만으로 학습 내용을 전달한다. (affirmed 2026-09-04)
- NEVER 이미지나 색상에만 의존하여 핵심 의미를 전달한다. (affirmed 2026-09-04)
- NEVER AWS 공식 이미지와 가이드 자체 설명용 다이어그램을 혼합해 출처나 제작 주체를 오해하게 하거나, AWS가 이 가이드를 보증하는 것처럼 표현한다. (affirmed 2026-09-04)
- NEVER 원격 이미지가 차단되거나 변경되었을 때 텍스트 대체 경로 없이 문서를 통합한다. (affirmed 2026-09-04)
- NEVER 검증되지 않은 문서나 접근이 차단된 출처에 의존하는 문서를 최종 `verified`로 표시한다. (affirmed 2026-09-04)
- NEVER 예시·로그·검사 결과에 실제 비밀, 자격 증명, 토큰, 개인정보, AWS 계정 식별자 또는 서명된 URL을 커밋한다. (affirmed 2026-09-04)
- NEVER 애플리케이션의 staging·production 환경, 배포 파이프라인 또는 운영 모니터링을 이 학습 가이드의 산출물로 만든다. (affirmed 2026-09-04)
- NEVER 코드 구현, 복잡한 수학 증명, 모델 개발 또는 유료 실습을 학습의 필수 조건으로 만든다. (affirmed 2026-09-04)
## Mandated

<!-- Populated by practices-discovery affirmation gate. -->
<!-- Format: ALWAYS [behavior] (affirmed [date]) -->
<!-- Example: ALWAYS use Result<T,E> for fallible operations in service layer (affirmed 2026-05-17) -->

- ALWAYS 모든 학습 자료를 한국어로 작성하고, AWS 서비스명·API명·CLI 명령·URL·공식 문서 제목과 핵심 영어 용어의 원문 표기를 보존한다. (affirmed 2026-09-04)
- ALWAYS UTF-8 Markdown을 사용하고, 파일명과 디렉터리명은 영문 소문자·숫자·하이픈으로 작성한다. (affirmed 2026-09-04)
- ALWAYS AIF-C01 공식 시험 안내서의 D1~D5, 모든 작업·기술 항목을 추적하며, 각 항목을 문서 또는 명시적인 `해당 없음`·`확장` 기록에 연결한다. (affirmed 2026-09-04)
- ALWAYS 공식 시험 범위와 실무 확장을 구분하고, 공식 사실과 학습자용 해설·예시를 구분한다. (affirmed 2026-09-04)
- ALWAYS 모든 외부 출처를 `sources/` 링크 인벤토리와 `source-registry.yaml`에 등록하고 URL, 제목, 출처 성격, 관련 도메인, 확인 날짜, 접근 상태, 연결 문서를 기록한다. (affirmed 2026-09-04)
- ALWAYS 문서 단위와 전체 저장소 단위에서 Markdown·제목 계층·필수 섹션·YAML front matter를 검사한다. (affirmed 2026-09-04)
- ALWAYS 문서 내부 링크, 다음 문서 연결, 용어 사전 연결, 출처 레지스트리 연결과 공식 범위 추적을 검사한다. (affirmed 2026-09-04)
- ALWAYS 문서 작성 후 관련 품질 검증을 실행하고, 실패를 수정한 뒤 결과와 미해결 항목을 기록한다. (affirmed 2026-09-04)
- ALWAYS 초보자 관점 검토를 수행하여 선수 지식, 쉬운 예시, 서비스 선택 단서, 비교, 시나리오, 오해 교정, 확인 질문의 누락을 확인한다. (affirmed 2026-09-04)
- ALWAYS UTF-8 인코딩과 CSV 형식·구조 검사를 수행한다. (affirmed 2026-09-04)
- ALWAYS 예시·로그·검사 결과에서 비밀, 자격 증명, 토큰, 실제 개인정보(PII), 실제 AWS 계정 식별자를 사용하지 않고 명백한 플레이스홀더를 사용한다. (affirmed 2026-09-04)
- ALWAYS 출처가 차단되거나 확인되지 않으면 `blocked` 또는 확인 필요 상태와 사유를 기록하고, 확인되지 않은 사실을 추측하지 않는다. (affirmed 2026-09-04)
- ALWAYS Mermaid 다이어그램은 학습 효과가 분명할 때만 사용하고, 가까운 일반 텍스트 또는 Markdown 설명과 함께 제공한다. (affirmed 2026-09-04)
- ALWAYS 문서를 `verified`로 표시하기 전에 Mermaid 구문을 검증하고, 다이어그램은 단순하고 모바일에서 읽기 쉽게 유지한다. (affirmed 2026-09-04)
- ALWAYS AWS 호스팅 공식 이미지를 사용할 때 출처 페이지, 직접 이미지·원본 URL, 제목, 접근일, 저작자 표시와 재사용·사용 조건을 `sources/`에 기록한다. (affirmed 2026-09-04)
- ALWAYS 모든 이미지에 의미 있는 한국어 alt text, 캡션 또는 주변 설명, 텍스트 대체 경로를 제공하고 이미지·색상만으로 핵심 의미를 전달하지 않는다. (affirmed 2026-09-04)
- ALWAYS 원격 이미지의 접근 가능 여부를 확인하고 URL이 차단되거나 변경되어도 사용할 수 있는 텍스트 대체 경로를 보존한다. (affirmed 2026-09-04)
- ALWAYS AWS 공식 이미지 콘텐츠와 가이드 자체 설명용 다이어그램을 구분하고, AWS가 이 가이드를 보증하는 것처럼 표현하지 않는다. (affirmed 2026-09-04)
- ALWAYS 문서가 공식 출처 확인, 초보자 검토, 범위 추적 검사를 통과하기 전에는 `verified` 상태로 표시하지 않는다. (affirmed 2026-09-04)
- ALWAYS 애플리케이션 배포가 아니라 문서 품질 검증 통과와 `main` 통합을 전달 경계로 삼는다. (affirmed 2026-09-04)
## Corrections

<!-- Project-specific corrections from human feedback. -->
<!-- Format: NEVER/ALWAYS [behavior] (learned [date]) -->
