---
title: "U8 품질 증거 보안 요구사항"
domain: "EXAM"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html"
source_checked: "2026-09-04"
---

# U8 품질 증거 보안 요구사항

## 목적과 범위

U8 `u8-quality-evidence`는 U1~U7의 정적 산출물을 대상으로 재현 가능한 품질 검사 증거를 기록한다. U8은 콘텐츠 본문을 대신 수정하지 않으며, 검사 결과·발견 사항·조치·재검사 조건만 소유한다.

U8은 Markdown·CSV·JSON과 저장소의 기존 정적 검사만 사용한다. API, DB, AWS 계정·리소스, 배포·호스팅, 유료 실습, 자동 최신성 모니터링, 학습자 답안·진도 저장, 새 dependency는 범위 밖이다.

## 적용 범위 표지

- **시험 범위**: 공식 AIF-C01 기준선과 연결되는 대상의 누락·범위 표지·출처 상태를 확인하는 검사다.
- **실무 확장**: 기준선 ID를 먼저 표시한 콘텐츠가 `실무 확장`으로 표시되는지 검사하며, 이를 공식 출제 범위로 승격하지 않는다.
- **학습자용 해설**: 초보자 관점과 접근성 검사는 학습자 이해를 위한 품질 판단이며 AWS의 공식 보증이나 법률 적합성 인증을 뜻하지 않는다.

## 단계 upstream 계약과 적용성

- `requirements`: FR1~FR6, NFR1~NFR9와 AC1.1.1~AC5.1.6을 소비한다.
- `user-stories`: US1.1~US5.1, 특히 US5.1의 품질·최신성 acceptance criteria를 소비한다.
- `unit-of-work`: U8의 허용 `target_type`, 안정 ID, workspace-relative `target_path`, `QualityCheckRecord` 필드를 소비한다.
- `functional-spec`: 검사 대상 해석, 출처·기준선·링크·초보자·형식·민감정보 검사와 `통과|실패|보류` 상태 전이를 소비한다.
- `rules`: BR8.1~BR8.12를 검사 ID와 조치 기준으로 사용한다.

## QualityCheckRecord 계약

각 품질 검사 시도는 다음 필드를 반드시 갖는다.

| 필드 | 규칙 |
|---|---|
| `target_type` | `DomainReadme`, `LearningDocument`, `GlossaryTerm`, `QuestionBankItem`, `ScoreSheet`, `Card`, `TermQuizItem`, `AnkiNote`, `SourceRecord`, `BaselineItem` 중 하나 |
| `target_id` | 대상 유형의 안정 ID. 경로만으로 대상 식별을 대체하지 않는다. |
| `target_path` | workspace-relative 파일 또는 anchor 경로 |
| `check_id` | `BR8.1`~`BR8.12` 또는 명시된 품질 검사 ID |
| `status` | `통과`, `실패`, `보류` 중 하나 |
| `evidence` | 검사 명령·도구, 검사 범위, 관찰 필드, findings, action, 재검사 조건을 포함하는 재현 가능한 근거 |
| `checked_at` | `YYYY-MM-DD` 또는 ISO 8601 검사 시각 |

`status`는 문서 상태 `draft|review|verified`나 출처 상태 `discovered|downloaded|summarized|reviewed|verified|blocked|확인 필요`를 대신하지 않는다.

## 품질 검사 요구사항

| ID | 요구사항 | 검증 증거 | 관련 upstream |
|---|---|---|---|
| NFR1.1 | 모든 품질 보고서와 findings는 한국어로 작성하고 AWS 고유명사·ID·경로·명령은 원문을 보존한다. | 품질 기록 언어 검사 | NFR1; AC5.1.4 |
| NFR1.2 | 초보자 관점 검사는 선수 지식, 목표, 쉬운 설명·예시, 서비스 선택 단서, 오해, 확인 질문, 다음 문서 링크를 확인한다. | `beginner-perspective` QualityCheckRecord | NFR1; FR6.4; AC5.1.4 |
| NFR2.1 | 제목 계층·링크·alt text·텍스트 fallback을 검사하며 외부 렌더러나 색상에 의존하는 통과 판정을 하지 않는다. | `markdown-structure`, `accessibility` 기록 | NFR2; AC2.1.5, AC5.1.5 |
| NFR3.1 | 안정 ID, 대상 경로, 기준선·원본 문서·출처의 정방향·역방향 연결을 검사한다. | `traceability` 기록 | NFR3; AC1.1.3, AC4.1.3 |
| NFR4.1 | URL·제목·출처 유형·상위 주제·도메인·확인일·접근 상태·revision을 registry와 대조한다. | `source-metadata` 기록 | NFR4; AC5.1.1 |
| NFR4.2 | `blocked` 또는 `확인 필요` 출처에 의존하는 대상은 `verified` 승격 전까지 `보류`로 유지한다. | `source-status-gate` 기록 | NFR4; AC3.1.3, AC5.1.3 |
| NFR5.1 | 문서·용어·복습 자료의 실제 상대 링크와 anchor 도달성을 검사한다. | `internal-links` 기록 | NFR5; FR6.2 |
| NFR6.1 | Markdown·JSON·CSV의 UTF-8과 구조를 검사하며 Anki는 `front,back` 필드를 보존한다. | `encoding-and-format` 기록 | NFR6; AC4.1.2 |
| NFR7.1 | 변경 파일·예시·로그·출처 메타데이터에서 토큰·자격 증명·PII·실제 AWS 계정 식별자를 찾고, 발견 내용을 evidence에 복사하지 않는다. | `sensitive-data` 기록 | NFR7; AC5.1.6 |
| NFR8.1 | `시험 범위`, 기준선 ID를 앞세운 `실무 확장`, `가이드 작성 도표`와 AWS 공식 이미지를 구분한다. | `scope-classification` 기록 | NFR8; AC5.1.2 |
| NFR9.1 | 4주 상대 일정·정적 워크시트·비수집 경계를 품질 대상에 연결한다. | `static-learning-flow` 기록 | NFR9; AC1.2.1~AC1.2.4 |

## 검사 대상과 판정 경계

1. U1 `sources/source-registry.yaml`, `sources/aws-sidebar-index.md`, `sources/content-traceability.yaml`의 존재·스키마·상태·양방향 매핑을 확인한다.
2. U2~U6의 `README.md`, 개념 문서, glossary 연결과 U7의 문항·점수표·카드·퀴즈·Anki 대상은 stable ID가 해석된 뒤 검사한다.
3. U8이 검사 대상 파일을 찾지 못하거나 U1 canonical manifest가 없으면 경로만으로 통과시키지 않고 `보류`와 담당 Unit·후속 조건을 기록한다.
4. 출처가 `blocked` 또는 `확인 필요`이면 사실을 추측하지 않고 영향받는 문서·문항·복습 자료의 `verified` 승격을 막는다.
5. `실패` 또는 `보류` 기록에는 finding, action, owner, recheck_condition을 포함하며 이전 시도를 덮어쓰지 않는다.

## 보안·개인정보·비수집 경계

- QualityCheckRecord는 학습자 답안·진도·계정·PII·결제·건강정보·자격 증명·토큰을 기록하지 않는다.
- 민감정보가 발견되면 실제 값을 evidence에 복사하지 않고 `민감정보 패턴 발견`, 영향 경로, 제거·치환·재검사 조치만 남긴다.
- 로컬 수기 점수 워크시트의 존재 여부와 산식은 검사할 수 있지만, 학습자의 점수나 식별자를 수집·저장하지 않는다.
- 품질 결과의 `verified` 표현은 출처 상태와 문서 상태를 혼동하지 않으며, 정식 WCAG 적합성·법률 적합성·AWS 보증을 주장하지 않는다.

## 해당 없음으로 기록하는 항목

| 항목 | U8 판정 | 근거 |
|---|---|---|
| 로그인·인증·인가 | 해당 없음 | 정적 파일 검사이며 사용자 계정이 없다. |
| API·DB·서버·네트워크 | 해당 없음 | 실행형 경계와 원격 통신이 없다. |
| AWS 계정·IAM·KMS·Secrets Manager | 해당 없음 | 실제 AWS 리소스를 생성·호출하지 않는다. |
| 온라인 채점·답안·진도 저장 | 해당 없음 | QualityCheckRecord는 콘텐츠 품질 증거만 저장한다. |
| 자동 최신성 모니터링 | 해당 없음 | 작성·검사 시점의 공식 출처 상태만 기록한다. |
| 유료 실습·새 dependency | 해당 없음 | 기존 정적 문서·검사 도구만 재사용한다. |

## 내부 연결과 다음 문서

- 품질 기록 계약: [`unit-of-work.md`](../../../inception/units-generation/unit-of-work.md)의 U8 QualityCheckRecord 대상 계약
- 검사 절차: [`functional-spec.md`](../functional-design/functional-spec.md)
- 판정 규칙: [`rules.md`](../functional-design/rules.md)
- 공식 기준선·출처: [`sources/content-traceability.yaml`](../../../../../../../../sources/content-traceability.yaml), [`source-registry.yaml`](../../../../../../../../sources/source-registry.yaml)
- 다음 단계: NFR Design에서 정적 검사 계약의 구현 가능한 기록 형식과 저장 위치를 구체화한다.

## 핵심 정리

U8의 보안과 품질은 실행형 플랫폼을 만드는 데 있지 않다. 안정 ID와 실제 경로를 확인하고, 출처·범위·초보자·접근성·형식·민감정보 상태를 재현 가능한 `QualityCheckRecord`로 남기며, 확인되지 않은 대상을 `verified`로 포장하지 않는 데 있다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 시험 범위, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 1](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html) — D1 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 2](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html) — D2 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 3](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html) — D3 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 4](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html) — D4 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 5](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html) — D5 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [`requirements.md`](../../../inception/requirements-analysis/requirements.md) — 승인된 FR/NFR·acceptance criteria, 확인일: 2026-09-04
- [`stories.md`](../../../inception/user-stories/stories.md) — 승인된 사용자 스토리·AC, 확인일: 2026-09-04
- [`unit-of-work.md`](../../../inception/units-generation/unit-of-work.md) — U8 대상 계약, 확인일: 2026-09-04

## Assumptions & Open Questions

- U1이 `sources/content-traceability.yaml`을 생성하기 전에는 BaselineItem의 실제 행·revision·파생 ID를 확정하지 않는다.
- 현재 존재하지 않는 D4/D5 README, U7 실제 평가 자료, 또는 stable ID가 확인되지 않은 파일은 검사를 완료 통과로 기록하지 않는다.
- 품질 기록의 최종 도메인별 파일 배치는 NFR Design에서 정하되, 각 기록의 필수 필드와 판정 상태는 변경하지 않는다.
- `blocked`·`확인 필요` 출처와 미해결 `실패|보류`가 있으면 통합 상태는 `review` 또는 보류로 유지한다.

<!-- U8 summary confirmation recorded; no scope or contract change. -->

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-04T22:20:46Z
**Iteration:** 1

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| R-01 | Major | `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u8-quality-evidence/nfr-requirements/traceability.json` > `quality_check_records`의 `SCORE-<slug>` 항목 및 `security-requirements.md` > 검사 대상과 판정 경계 3 | 실제 `assessment/` 디렉터리와 `assessment/score-sheet.md`가 아직 없는데 ScoreSheet 검사 기록이 `통과`다. U8 자체 계약은 대상 파일이 없거나 canonical `sources/content-traceability.yaml`이 없으면 경로만으로 통과시키지 않고 `보류`로 남기도록 요구하므로, 현재 기록은 대상 미생성 상태를 완료처럼 표현한다. | `SCORE-<slug>` 기록을 실제 ScoreSheet가 생성될 때까지 `보류`로 변경하고, 현재 evidence에 대상 미생성·담당 Unit·재검사 조건을 명시한다. U7 생성 후 실제 안정 ID와 `assessment/score-sheet.md` 경로를 가진 새 immutable 검사 시도를 추가하고, 그때만 `통과`를 기록한다. | New |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-required-sections.ts` | PASS; `h2_count: 12`, `findings_count: 0` | 보안 요구사항 문서의 필수 구조와 단일 Review 섹션이 유효하다. |
| `aidlc-sensor-traceability.ts` | PASS; `gaps: []`, `orphans: []`, `invalid_targets: []` | `traceability.json`의 75개 coverage와 upstream ID 구조에 센서상 누락·고아·무효 대상이 없다. |
| `aidlc-sensor-upstream-coverage.ts` | PASS; `unreferenced: []` | `functional-spec`, `rules`, `requirements`가 security/tech-stack 산출물에서 참조된다. |
| 정적 QualityCheckRecord 검사 | PASS; 11 records, 필수 7개 필드 누락 0건, 허용 상태 위반 0건 | `통과|실패|보류`와 필수 필드 계약은 지켜진다. |
| Requirements + User Stories ID 대조 | PASS; source IDs 75개, upstream IDs 75개, missing 0건, extra 0건, coverage 75개 | FR/NFR/US/AC 전체 upstream coverage가 완전하다. |
| 실제 대상 존재 검사 | FAIL observation; `assessment` 없음, `sources/content-traceability.yaml` 없음, `SCORE-<slug>`의 `assessment/score-sheet.md` 대상 없음 | R-01을 확인한다. 나머지 미생성·canonical manifest 의존 검사는 `보류` 또는 `Deferred`로 유지되어야 한다. |
| `aidlc-sensor-linter.ts` / `aidlc-sensor-type-check.ts` | NOT APPLICABLE; 각각 `no-eslint-config`, `no-tsconfig-found` | 대상이 정적 Markdown/JSON이고 프로젝트 ESLint/TypeScript 설정이 없어 코드형 검사는 적용되지 않는다. 이는 U8의 정적 경계와 일치한다. |

### Summary

U8은 QualityCheckRecord 필드·상태, 허용 대상 계약, 출처/문서 상태 분리, 72개 Deferred coverage, immutable 재검사와 정적 비수집 경계를 명확히 정의했으며, canonical manifest와 실제 콘텐츠가 없는 상태를 대부분 `보류`로 보존한다. 다만 존재하지 않는 ScoreSheet를 한 건 `통과`로 기록한 예외는 수정이 필요하며, 나머지 Critical finding이 없고 Major finding이 1건이므로 판정은 `READY`다. NFR Design으로의 handoff는 최종 보고서 위치·집계·README 링크를 다음 단계에서 구체화하도록 명시되어 있다.
