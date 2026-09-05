---
title: "U7 평가·복습 자료 보안 요구사항"
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

# U7 평가·복습 자료 보안 요구사항

## 목적과 범위

U7 `u7-assessment-and-review`는 문제은행, 카드, 용어 퀴즈, Anki CSV, 정적 점수 워크시트를 제공할 정적 packaging Unit이다. 보안 경계는 학습 자료와 품질 계약을 안전하게 배포 가능한 형태로 정의하는 데 있으며, 실행형 인증·인가·API·DB·AWS 리소스를 만들거나 호출하는 데 있지 않다.

U7은 실제 100문항을 지금 생성하지 않는다. 아래 요구사항은 downstream content outputs가 실제 자료를 만들 때 지켜야 할 계약이다.

## 적용 범위 표지

- **시험 범위**: 공식 AIF-C01 기준선과 연결되는 문제·용어·복습 항목의 추적·표지 규칙이다.
- **실무 확장**: 관련 `AIF-C01-D<n>-T<n>`를 먼저 표시한 서비스 비교·시나리오·학습 예시의 범위 구분 규칙이다. 실무 확장은 공식 출제 범위로 표시하지 않는다.
- **학습자용 해설**: 오답 해설·카드 설명·점수 계산 예시는 합성 자료이며 실제 학습자 데이터나 자격 증명을 사용하지 않는다.

## 단계 upstream 계약과 적용성

- `requirements`: `FR1`~`FR6`, `NFR1`~`NFR9`, `AC1.1.1`~`AC5.1.6`을 직접 소비한다.
- `user-stories`: `US1.1`~`US5.1`과 acceptance criteria를 U7 content output 계약에 매핑한다.
- `unit-of-work`: U7이 모든 도메인을 참조하는 static packaging Unit이며 U2~U6 문서·용어를 소비한다.
- `functional-spec`: 실행형 보안 기능·API·데이터 흐름이 없는 정적 Unit에서는 `N/A`다. 이 판정은 기능 누락이 아니라 승인된 비실행 범위의 결과다.
- `rules`: 초보자 설명, UTF-8, 출처·추적성, 민감정보 금지, 실무 확장 표지 규칙은 `OK`다.

## 보안 요구사항

| ID | 요구사항 | 검증 증거 | 관련 upstream |
|---|---|---|---|
| NFR1.1 | 모든 평가·복습 설명은 한국어를 기본으로 하고 핵심 영어 용어·AWS 고유명사는 원문을 보존한다. | 초보자 관점 검사 | NFR1; AC2.1.1, AC4.1.1 |
| NFR1.2 | 정답·오답 해설과 용어 설명에는 합성 예시를 사용하고 실제 학습자 정보를 사용하지 않는다. | 민감정보·초보자 검사 | NFR1; AC3.1.4 |
| NFR2.1 | Markdown·CSV 안내는 일반 뷰어와 일반 CSV 파서에서 읽히며 색상·이미지·외부 렌더러에 의존하지 않는다. | Markdown·CSV 검사 | NFR2; AC2.1.5, AC4.1.2, AC5.1.5 |
| NFR2.2 | 카드·퀴즈·문항·워크시트는 키보드로 따라갈 수 있는 Markdown 링크와 텍스트 대체 설명을 사용한다. | 링크·접근성 검사 | NFR2; AC4.1.1, AC5.1.5 |
| NFR3.1 | `Q-<n>`, `SCORE-<slug>`, `CARD-<slug>`, `TQ-<n>`, `ANKI-<n>` 안정 ID와 `AIF-C01-D<n>-T<n>` 기준선 ID를 중복·임의 변경 없이 사용한다. | ID·중복·traceability 검사 | NFR3; AC1.1.3, AC4.1.1, AC4.2.1 |
| NFR3.2 | 각 downstream 항목은 기준선·원본 문서·출처로 정방향·역방향 추적되며 고아 항목을 만들지 않는다. | 양방향 링크 검사 | NFR3; AC1.1.3, AC4.1.3, AC4.2.2 |
| NFR4.1 | 외부 사실을 포함하는 문항·카드·퀴즈·Anki 행은 공식 URL·제목·revision·확인일·접근 상태를 참조한다. | source registry 대조 | NFR4; AC3.1.2, AC5.1.1 |
| NFR4.2 | 확인되지 않거나 차단된 출처에 의존하는 항목은 `review`·`blocked`·`확인 필요`로 보류하고 `verified`로 승격하지 않는다. | 상태·보류 검사 | NFR4; AC3.1.3, AC5.1.3 |
| NFR5.1 | 자료를 문제은행·워크시트·카드·퀴즈·Anki의 개념 단위로 분리하고 상대 링크를 유지한다. | 경로·제목·링크 검사 | NFR5; AC2.1.2, AC4.1.1 |
| NFR6.1 | Markdown과 Anki CSV는 strict UTF-8이며 CSV의 `front,back` 및 추적 필드를 일반 파서로 읽을 수 있다. | encoding·CSV 검사 | NFR6; AC4.1.2 |
| NFR7.1 | 답안·진도·계정·개인정보·결제정보·건강정보·자격 증명·토큰·실제 AWS 계정 식별자를 수집·저장·배포하지 않는다. | 민감정보·범위 검사 | NFR7; AC1.2.3, AC4.2.5, AC5.1.6 |
| NFR7.2 | U7은 API, DB, AWS 계정·리소스, 배포, 유료 실습, learner state/data 저장 및 새 dependency를 사용하지 않는다. | 파일·dependency·범위 점검 | NFR7; AC1.2.4, AC4.2.5 |
| NFR8.1 | 문항·카드·퀴즈·Anki 행마다 `시험 범위` 또는 기준선 ID를 앞세운 `실무 확장`을 표시한다. | 범위 분류 검사 | NFR8; AC1.1.4, AC3.1.2, AC4.1.4, AC5.1.2 |
| NFR8.2 | 가이드 작성 해설과 AWS 공식 사실을 구분하고 원문을 통째로 복사하거나 공식 보증·법률 자문으로 표현하지 않는다. | 출처·표현 검토 | NFR8; AC5.1.2 |
| NFR9.1 | 점수 워크시트는 4주 상대 일정과 연결될 수 있지만 자동 진도·점수 저장을 하지 않는다. | 워크시트·비수집 경계 검사 | NFR9; AC1.2.1~AC1.2.4, AC4.2.3 |

## 보안·복습 자료의 안전 경계

1. 점수 워크시트는 `정답률 = 정답 문항 수 / 전체 문항 수 × 100`을 로컬 수기로 계산하는 정적 안내이며, 답안을 업로드하거나 저장하지 않는다.
2. 문제은행의 실제 문항·정답·오답 해설은 downstream content 단계에서 공식 기준선과 출처를 확인한 뒤 작성한다. 확인 전에는 계약 ID만 정의한다.
3. Anki CSV에는 실제 개인정보·계정 정보·비밀·토큰·서명된 URL을 넣지 않는다.
4. `80% 이상`은 합격 보장이 아닌 준비도 참고 지표이며, 문항 사실 정확성·오답 타당성·난이도·중복 검토는 별도 품질 증거로 관리한다.
5. AWS 서비스·모델명·요금·리전·할당량처럼 변할 수 있는 정보는 확인된 출처에 연결하거나 보류한다.

## 해당 없음으로 기록하는 보안 항목

| 항목 | U7 판정 | 근거 |
|---|---|---|
| 로그인·인증·인가 | 해당 없음 | learner account가 없는 정적 패키지다. |
| API·DB·서버·네트워크 | 해당 없음 | 실행형 기능과 통신 경계가 없다. |
| AWS 계정·IAM role/policy·KMS·Secrets Manager | 해당 없음 | 개념 설명을 넘어 실제 리소스를 생성·호출하지 않는다. |
| 학습자 답안·진도·PII·결제정보 저장 | 해당 없음 | 워크시트는 로컬 수기 기록만 지원한다. |
| 배포·호스팅·모니터링 | 해당 없음 | shared static package이며 배포·운영을 만들지 않는다. |
| 유료 AWS 실습 | 해당 없음 | Markdown·CSV·정적 문제만 사용한다. |
| 새 dependency | 해당 없음 | 기존 저장소 문서 규칙과 기본 CSV 파서·품질 센서를 재사용한다. |

## 내부 연결과 다음 문서

- 범위·기준선: [`sources/content-traceability.yaml`](../../../../../../../../sources/content-traceability.yaml) — U1이 소유한다.
- D1~D5 학습 자료: U2~U6의 각 README·개념 문서·용어 inventory — U7은 참조만 한다.
- 다음 품질 증거: [`unit-of-work.md`](../../../inception/units-generation/unit-of-work.md)의 U8 계약.
- 요구사항: [`requirements.md`](../../../inception/requirements-analysis/requirements.md).
- 사용자 스토리: [`stories.md`](../../../inception/user-stories/stories.md).

## 핵심 정리

U7의 보안은 실행형 보안 기능을 추가하는 것이 아니라, 정적 평가·복습 자료에서 민감정보·learner state/data·외부 실행 경계를 만들지 않고 공식 범위·출처·ID·상태를 안전하게 추적하는 것이다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 1](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html) — D1 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 2](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html) — D2 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 3](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html) — D3 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 4](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html) — D4 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 5](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html) — D5 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [requirements.md](../../../inception/requirements-analysis/requirements.md) — 승인된 보안·품질 제약, 확인일: 2026-09-04
- [stories.md](../../../inception/user-stories/stories.md) — 승인된 acceptance criteria, 확인일: 2026-09-04
- [unit-of-work.md](../../../inception/units-generation/unit-of-work.md) — U7 packaging 경계, 확인일: 2026-09-04

## Assumptions & Open Questions

- 실제 baseline 행·문항·카드·퀴즈·Anki 항목은 U1과 U2~U6의 downstream 자료가 확정된 뒤 생성한다.
- 출처가 `blocked` 또는 `확인 필요`인 항목을 `verified`로 표시하지 않는 규칙은 유지한다.
- 정적 파일의 보안 점검은 민감정보 패턴·외부 링크·범위 표지·의존성·실행 경계의 검사로 충분하며, 보안 인증이나 법률 적합성 주장을 하지 않는다.
- 이 문서는 인증·인가 설계서나 법률 자문이 아니다.

<!-- U7 summary confirmation recorded; no scope or contract change. -->

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-04T22:00:10Z
**Iteration:** 1

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| R-01 | Major | `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u7-assessment-and-review/nfr-requirements/security-requirements.md` > 내부 연결과 다음 문서 > 범위·기준선 링크; `traceability.json` > `upstream_contract.source_contract` | U7이 의존한다고 선언한 `sources/content-traceability.yaml`이 현재 저장소에 없고 U1 산출물에도 생성되어 있지 않다. 따라서 현재의 `source_state: review`, `gaps: 0`, `orphans: 0` 주장은 source contract의 존재·기준선 행·revision/status를 검증한 결과가 아니라 deferred 전제에 가깝다. | U1이 canonical `sources/content-traceability.yaml`을 생성하고 U7 downstream content 시작 전 존재·스키마·기준선 행 상태를 확인한다. 생성 전에는 U7의 source-contract 검증을 `Deferred` 또는 `blocked`로 명시하고 `verified` 승격을 막는다. | New |
| R-02 | Major | `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u7-assessment-and-review/nfr-requirements/traceability.json` > `unit_contract.contract_targets` 및 `bidirectional_links.u7_to_upstream` | 계약 대상 15개 중 `U7-CONTENT-REVIEW-MATERIALS`, `U7-CONTRACT-TRACEABILITY`, `U7-CONTRACT-STATUS-GUARD`, `U7-CONTRACT-NO-EXECUTION`, `U7-CONTRACT-NO-SENSITIVE-DATA` 5개가 `u7_to_upstream` 역방향 매핑에 없다. 내부 validation의 `orphans: 0`은 upstream ID coverage만 검사하여 이 계약 대상 누락을 탐지하지 못한다. | 누락된 5개 계약 대상 각각에 관련 FR/NFR/US/AC upstream ID와 근거를 추가하고, 계약 대상 전체가 양방향 매핑되는 별도 검사 또는 검증 증거를 추가한다. | New |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-traceability.ts` | PASS: `gaps=[]`, `orphans=[]`, `invalid_targets=[]`, `findings_count=0` | 75개 `upstream_ids`와 coverage 항목의 구조적 일치는 확인했지만, `unit_contract.contract_targets`의 역방향 완전성과 canonical source 파일 존재 여부는 검사하지 않는다. |
| `aidlc-sensor-upstream-coverage.ts` | PASS: `unreferenced=[]` | `requirements`와 `units-generation` 참조가 두 Markdown 산출물에 존재한다. |
| `aidlc-sensor-required-sections.ts` | PASS: 10개 H2 | 보안 요구사항 문서의 최소 Markdown 구조는 충족한다. |
| 계약 대상·파일 존재 점검 | FAIL: 15개 계약 대상 중 역방향 매핑 5개 누락; `sources/content-traceability.yaml` 미존재 | R-01과 R-02를 확인한다. |
| upstream NFR/AC coverage 점검 | PASS: NFR1~NFR9, AC1.1.1~AC5.1.6 전체 열거; 상태 `OK=67`, `N/A=5`, `Deferred=3` | 승인된 요구사항의 적용성은 기록되어 있으며, 실제 문항 생성과 최종 품질 증거가 deferred로 분리되어 있다. |

### Summary

정적 packaging 경계, API·DB·AWS 계정·배포·유료 실습·learner state·새 dependency 제외, 한국어 초보자 품질, 시험 범위/실무 확장 표지, 실제 문항 생성 지연 및 U8 QualityCheckRecord 참조는 승인된 계약과 일치한다. 다만 downstream 생성 전에 U1 canonical 추적표를 제공하고 계약 대상 전체의 역방향 매핑을 완성해야 추적성 주장을 구현 가능한 상태로 유지할 수 있다.
