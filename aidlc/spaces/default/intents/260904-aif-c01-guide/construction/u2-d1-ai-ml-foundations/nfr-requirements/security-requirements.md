---
title: "U2 D1 AI 및 ML의 기초 보안 요구사항"
domain: "D1"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
source_checked: "2026-09-04"
---

# U2 D1 AI 및 ML의 기초 보안 요구사항

## 목적과 범위

U2 `u2-d1-ai-ml-foundations`는 실행형 애플리케이션이 아니라 D1 초보자용 정적 학습 문서와 용어 연결을 소유한다. 이 문서는 문서가 안전하게 읽히고, 공식 출처와 범위를 잘못 확장하지 않으며, 학습자 데이터와 비밀을 저장하지 않도록 하는 요구사항을 정한다.

U2는 `LearningContent`의 `DomainReadme`, `LearningDocument`, `GlossaryTerm`을 다룬다. 공식 기준선과 출처의 원본 계약은 [U1 Unit 계약](../../../inception/units-generation/unit-of-work.md)의 `U1`과 [source registry](../../../../../../../../sources/source-registry.yaml)가 소유한다. U2는 U1의 ID·상태를 복사해 재정의하지 않고 참조한다.

## 적용 범위 표지

- **시험 범위**: 공식 AIF-C01 Domain 1 페이지에 명시된 `1.1 기본 AI 개념과 용어`, `1.2 AI의 실제 사용 사례와 기법 선택`, `1.3 ML 개발 수명 주기와 MLOps`를 설명하는 문서 내용이다.
- **실무 확장**: `AIF-C01-D1-T<n>` 기준선 ID를 먼저 제시한 뒤, 관리형 서비스 선택·비교·기본 시나리오를 학습자가 이해하도록 덧붙이는 설명이다. 실무 확장을 공식 출제 항목으로 단정하지 않는다.
- **학습자용 해설**: 예시, 비유, 시험 판단 단서는 공식 원문 복사가 아니라 한국어 재구성이다. 외부 사실은 [source registry](../../../../../../../../sources/source-registry.yaml)의 URL·제목·확인일·상태로 되돌아간다.

## 단계 upstream 계약과 적용성

nfr-requirements 단계의 공통 upstream 이름은 `functional-spec`, `rules`, `requirements`이다. U2는 `packaging` Unit이므로 별도 실행 로직이나 서비스 기능을 설계하지 않는다. 따라서 U2에서 `functional-spec`과 `rules`는 기능 설계 산출물을 새로 만들라는 의미가 아니라, 정적 문서 범위와 저장소 집필 규칙을 확인한 조건부 입력으로 기록한다. 현재 U2 디렉터리에 별도 `functional-design` 산출물이 없는 것은 이 경계를 반영한 것이며, 해당 upstream의 부재를 숨기지 않고 `해당 없음/조건부`로 추적한다.

- `functional-spec`: U2의 문서·용어 소유권과 NFR 적용 범위를 `unit-of-work.md` 및 승인된 요구사항으로 대체 확인한다. 서비스 동작·API 계약이 없으므로 별도 기능 명세 파일은 해당 없음이다.
- `rules`: 저장소의 문서 기술 규칙, 출처 추적 규칙, 초보자 품질 규칙을 적용한다. 런타임 검증 규칙이나 배포 규칙은 U2 범위에 없다.
- `requirements`: 승인된 `requirements.md`를 정식 기능·비기능 요구사항 입력으로 사용한다.

## 보안 요구사항

상세 ID는 승인된 상위 `NFR`에서 파생했다. `NFRx.y`는 U2 문서·검사 수준의 요구사항이다.

| ID | 요구사항 | 검증 증거 | 관련 upstream |
|---|---|---|---|
| NFR1.1 | 설명은 한국어를 기본으로 하고 최초 등장 시 핵심 영어 용어를 병기한다. AWS 서비스명·API명·CLI 명령·URL·공식 문서 제목은 원문을 보존한다. | 초보자 검토와 문서 front matter·본문 점검 | NFR1; AC2.1.1, AC2.1.2 |
| NFR2.1 | 제목 계층, 링크 문구, 표와 목록은 GitHub-Flavored Markdown과 일반 Markdown 뷰어에서 읽힌다. 모바일에서 핵심 판단 정보가 넓은 표 하나에만 의존하지 않도록 짧은 목록과 문단을 우선한다. | Markdown lint, 내부 링크 검사, 모바일 폭 수동 검토 | NFR2; AC2.1.5, AC5.1.5 |
| NFR2.2 | Mermaid 또는 이미지가 사용되면 바로 인접한 한국어 텍스트 설명과 의미 있는 alt text·캡션을 제공한다. 외부 렌더러, 색상, 이미지가 유일한 의미 전달 수단이어서는 안 된다. | Mermaid 구문·텍스트 fallback·alt text 점검 | NFR2; NFR8; AC2.1.5 |
| NFR3.1 | D1 문서·README·용어는 `D1-README`, `LD-d1-<slug>`, `TERM-<slug>`와 같은 안정 ID 또는 U1이 정한 공식 `AIF-C01-D<n>-T<n>`를 사용한다. 제목·URL을 ID로 대신하지 않으며 기존 ID를 재번호화하지 않는다. | ID 형식·중복·기준선 참조 검사 | NFR3; FR1.1, FR1.3; AC1.1.3 |
| NFR3.2 | 문서에서 기준선·출처로 가는 정방향 링크와 기준선/출처에서 문서로 돌아오는 연결을 재구성할 수 있어야 한다. URL만 있는 연결이나 고아 문서는 실패로 판정한다. | `traceability.json`, U1 canonical 계약, 문서 링크 검사 | NFR3; FR1.3, FR6.2; AC1.1.3, AC4.1.3 |
| NFR4.1 | 외부 사실을 포함하는 D1 문서는 공식 URL, 문서 제목, `source_checked`, 접근 상태와 문서 상태를 함께 표시한다. 문서 상태 `draft|review|verified`와 출처 상태 `discovered|downloaded|summarized|reviewed|verified|blocked`를 혼용하지 않는다. | front matter·source registry 대조 | NFR4; FR5.1; AC5.1.1 |
| NFR4.2 | `blocked` 또는 `확인 필요` 출처에 의존하는 내용은 `verified`로 승격하지 않는다. 차단 사유·영향 자료·후속 확인 대상을 U1 registry 또는 품질 기록으로 추적한다. | 상태 전이·출처 연결·품질 기록 점검 | NFR4; FR5.2, FR5.3; AC3.1.3, AC5.1.3 |
| NFR5.1 | 파일과 디렉터리 이름은 영문 소문자·숫자·하이픈을 사용하고, 개념 단위 문서에는 현재 문서·이전/다음 문서·glossary 또는 용어 inventory 연결을 둔다. | 경로 규칙·내부 링크·다음 문서 검사 | NFR5; FR2.2, FR2.3; AC2.1.2, AC2.1.3 |
| NFR6.1 | 모든 Markdown과 JSON은 UTF-8 및 결정적 구조를 사용한다. JSON 배열의 ID 순서와 Markdown 표의 행 순서는 입력 계약을 기준으로 안정적으로 유지해 같은 입력에서 같은 결과를 재현한다. | UTF-8 판별, JSON parse, 반복 검사 diff | NFR6; FR5.1, FR6.3; AC5.1.5 |
| NFR7.1 | U2 산출물·예시·검사 기록에는 학습자 이름·계정·답안·진도·결제정보·건강정보·자격 증명·토큰·API key·실제 AWS 계정 식별자를 기록하거나 배포하지 않는다. | 민감정보 패턴 검사와 수동 검토 | NFR7; FR6.4; AC1.2.3, AC5.1.6 |
| NFR7.2 | U2는 브라우저 전송, 사용자 인증, 세션, 답안 제출, 자동 저장, 원격 업로드를 구현하지 않는다. 정적 파일을 읽고 로컬에서 수기로 학습하는 경계만 제공한다. | 파일·의존성·코드 범위 점검 | NFR7; FR3.1, FR4.5; AC1.2.3, AC4.2.5 |
| NFR8.1 | 문서의 각 관련 섹션은 `시험 범위` 또는 공식 기준선 ID를 앞세운 `실무 확장`으로 표시한다. 실무 확장과 학습자용 예시는 공식 출제 범위로 표현하지 않는다. | 섹션 표지와 baseline ID 검사 | NFR8; FR2.6; AC1.1.4, AC2.1.4 |
| NFR8.2 | 공식 원문을 통째로 복사하지 않는다. 필요한 짧은 인용과 한국어 재구성만 사용하고 공식 URL·제목·확인일을 문서 끝에 둔다. | 출처·인용·본문 유사성 수동 검토 | NFR8; FR5.4; AC5.1.2 |
| NFR9.1 | U2는 4주 계획 전체를 계산·저장하지 않는다. D1 README는 [시작 안내](../../../../../../../../docs/00-start-here/README.md) 및 후속 D2 링크를 제공하고, 상대 주차 계획의 canonical 소유는 후속 시작/평가 문서로 남긴다. | Unit 소유권·링크·traceability 검사 | NFR9 `Deferred`; AC1.2.1, AC1.2.2 |

## 접근 제어와 변경 무결성

U2에는 런타임 접근 제어가 없다. 저장소 권한, pull request 승인, 버전 관리 이력이 정적 문서 변경의 경계다. 다음 규칙을 지킨다.

1. U1의 `AIF-C01-D<n>-T<n>`, `source_id`, 출처 상태를 문서 안에서 임의로 새로 만들거나 재사용하지 않는다.
2. 문서의 링크는 저장소 상대 경로를 사용하며 사용자 홈·절대 경로·임시 경로를 기록하지 않는다.
3. 출처 확인 실패 시 내용을 추측하지 않고 `blocked` 또는 `확인 필요`로 보류한다.
4. 검사 도구는 로컬 파일을 읽기 전용으로 검사하며 프로젝트 내용·비밀·학습자 데이터를 외부로 전송하지 않는다.
5. 문서 상태 변경은 본문 수정, 출처 변경, 추적성 변경, 검사 결과와 함께 검토한다.

## 해당 없음으로 기록하는 보안 항목

| 항목 | U2 판정 | 근거 |
|---|---|---|
| 사용자 인증·인가 | 해당 없음 | 로그인 사용자나 보호된 애플리케이션 기능이 없다. 저장소 접근 권한은 기존 개발 플랫폼이 담당한다. |
| AWS IAM·KMS·Secrets Manager | 해당 없음 | AWS 계정 호출, IAM role/policy, 암호화 키, secret을 생성·저장하지 않는다. |
| API·세션·TLS 운영 | 해당 없음 | HTTP API와 세션이 없으며 URL은 문서 출처 메타데이터다. |
| 데이터베이스·검색 인덱스 | 해당 없음 | D1 내용·용어·추적성은 버전 관리형 Markdown/JSON이며 학습자 데이터를 저장하지 않는다. |
| 네트워크·방화벽·WAF | 해당 없음 | 장기 실행 서비스와 네트워크 진입점이 없다. |
| 런타임 취약점·컨테이너 이미지 | 해당 없음 | 애플리케이션 런타임·컨테이너·서버 프로세스를 만들지 않는다. |
| 백업·보존·재해 복구 | 해당 없음 | 서비스 데이터 보존 목표가 없고 저장소의 기존 버전 관리 경계를 사용한다. |
| 배포·호스팅·AWS 계정 | 해당 없음 | 결과물은 정적 저장소 파일이며 승인된 범위에 배포 환경·계정·유료 실습이 없다. |

## 내부 연결과 다음 문서

- 현재 D1 진입점: [D1 README](../../../../../../../../docs/01-ai-ml-foundations/README.md)
- D1 개념 문서: [AI·ML·GenAI 관계](../../../../../../../../docs/01-ai-ml-foundations/01-ai-ml-genai-relationship.md)
- 다음 도메인: [D2 README](../../../../../../../../docs/02-generative-ai/README.md)
- glossary 연결 대상: [D1 용어 inventory](../../../../../../../../docs/01-ai-ml-foundations/d1-terminology-quiz.md) — 중앙 `docs/glossary.md`는 아직 생성되지 않아 현재는 D1 용어 자료로 연결하고 후속 단계에서 중앙 glossary 링크를 재검사한다.
- 승인된 요구사항: [requirements.md](../../../inception/requirements-analysis/requirements.md)
- U2 Unit 계약: [unit-of-work.md](../../../inception/units-generation/unit-of-work.md)
- 승인된 컴포넌트 계약: [components.md](../../../inception/domain-design/components.md) — `LearningContent`와 `GlossaryTerm` 소유권의 근거

## 핵심 정리

U2의 보안은 서비스 경계가 아니라 문서 경계다. 안정 ID·공식 출처·범위 표지·상대 링크·UTF-8·재현 가능한 로컬 검사를 지키고, 학습자 데이터·비밀·AWS 계정·런타임을 도입하지 않는다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 시험 범위·5개 도메인 기준, 확인일: 2026-09-04, registry 상태: `downloaded`
- [콘텐츠 도메인 1: AI 및 ML의 기초](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html) — D1 작업·기술 기준, 확인일: 2026-09-04, registry 상태: `downloaded`
- [source-registry.yaml](../../../../../../../../sources/source-registry.yaml) — URL·제목·도메인·확인일·접근 상태의 canonical 등록부, 확인일: 2026-09-04, 상태: `downloaded`/개별 행 상태 따름
- [aws-sidebar-index.md](../../../../../../../../sources/aws-sidebar-index.md) — 공식 사이드바·D1 링크 인벤토리, 확인일: 2026-09-04, 상태: `downloaded`

## Assumptions & Open Questions

- 공식 세부 작업·기술 행의 canonical `AIF-C01-D1-T<n>` 값은 U1이 공식 안내서 revision 확인 후 확정한다. U2는 확인 전 임의 ID를 만들지 않는다.
- `docs/glossary.md`는 현재 존재하지 않는다. U2는 연결 요구를 보존하고, glossary 생성 또는 경로 확정 전까지 이 연결을 완료로 표시하지 않는다.
- AWS 기능·요금·리전·할당량은 D1 시험 범위와 별도로 확인해야 하며 확인되지 않은 세부사항은 `확인 필요`로 둔다.

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-04T21:24:31Z
**Iteration:** 3
**Request Challenge:** review:165dd3c033fd3147fa93ffed61b97fb7

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| R-01 | Critical | `security-requirements.md` > `## 단계 upstream 계약과 적용성`; `tech-stack-decisions.md` > `## 단계 upstream 적용성`; `traceability.json` > `upstream_contract` | Prior upstream-contract finding was rechecked. `functional-spec` is explicitly N/A for the static packaging Unit, while `rules` and `requirements` are explicitly consumed and traced consistently across the three artifacts. | No further action; preserve the documented N/A/OK rationale and do not introduce runtime functional-spec or rules artifacts into U2. | Resolved |

No new Critical, Major, or Minor findings. The `docs/glossary.md` absence and unfinished U1 baseline revision remain documented open issues and do not invalidate this NFR design because U2 keeps `review` status and does not claim verification.

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-required-sections.ts` on `security-requirements.md` | PASS; `h2_count=11`, `findings_count=0` | The artifact has one canonical review section and the required Markdown structure. |
| `aidlc-sensor-upstream-coverage.ts` with `functional-spec,rules,requirements` and both NFR deliverables | PASS; `unreferenced=[]`, `findings_count=0` | All required upstream slugs are referenced across the NFR deliverables. |
| `aidlc-sensor-traceability.ts` on `traceability.json` | PASS; `gaps=[]`, `orphans=[]`, `invalid_targets=[]`, `missing_from_table=[]`, `missing_from_upstream_ids=[]` | NFR/FR/AC/Unit/component traceability is complete and targets resolve. |
| Strict UTF-8 and JSON parse | PASS; 6 reviewed files decoded as UTF-8 and `traceability.json` parsed | Static exchange formats and encoding are valid. |
| Relative-link check | PASS; 13 relative Markdown links resolve | Document and upstream navigation links are implementable. |
| Secret-value pattern scan | PASS; no credential/token secret-value patterns found | The static no-credentials/no-learner-data boundary is preserved. |

### Summary

U2 remains architecturally ready for the `nfr-requirements` gate: the `LearningContent` Unit is a static packaging boundary with no runtime, API, database, AWS-account, credential, or learner-data behavior. The prior upstream-traceability finding remains resolved, all applicable validation checks pass, and no new findings block a READY verdict.
