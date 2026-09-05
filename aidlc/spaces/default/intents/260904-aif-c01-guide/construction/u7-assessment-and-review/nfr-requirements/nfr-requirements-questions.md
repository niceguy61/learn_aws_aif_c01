---
title: "U7 평가·복습 자료 NFR 질문과 상속 결정"
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

# U7 평가·복습 자료 NFR 질문과 상속 결정

## 목적과 범위

U7 `u7-assessment-and-review`는 D1~D5를 가로지르는 정적 평가·복습 packaging Unit이다. 이 파일은 문제은행, 카드 요약, 용어 퀴즈, Anki CSV, 정적 점수 워크시트의 NFR 질문 상태와 상위 단계 결정을 기록한다.

U7은 실제 문항 100개를 이 단계에서 생성하지 않는다. downstream content outputs가 사용할 안정 ID, 필수 필드, 출처·범위·추적성 계약만 정의한다.

## Inherited Decisions

- 기존 승인 범위 깊이는 `Comprehensive`이며, 대상 학습자는 AI/ML과 AWS를 처음 접하는 완전 초보자다.
- 학습 기간은 특정 시험일이 아닌 1주차~4주차의 상대 일정이다.
- 자체 제작 문제은행의 최소 계약은 `N >= max(100, 확인된 기준선 행 수)`이며, 실제 수량과 도메인별 배분은 U1 기준선 등록 이후 downstream content 단계에서 계산한다.
- 첫 전체 풀이의 준비도 참고 지표는 평균 정답률 80% 이상이다. 이는 합격 보장이 아니며 문항 사실 정확성 검토와 분리한다.
- 모든 결과물은 정적 UTF-8 Markdown 또는 UTF-8 CSV다. API, DB, AWS 계정·리소스, 배포, 유료 실습, learner state/data 저장, 새 dependency는 범위에 포함하지 않는다.
- 시험 범위와 실무 확장은 항목 수준에서 구분한다. 실무 확장은 관련 `AIF-C01-D<n>-T<n>`를 먼저 표시하고 공식 출제 범위로 단정하지 않는다.
- 사용자의 추가 범위 질문은 없다. 이전 단계의 사용자 승인과 `Looks correct` 확인을 재사용한다.

## Summary Confirmation

- **Summary confirmation:** `Looks correct`
- **Confirmation basis:** 승인된 requirements baseline, 승인된 user stories, 승인된 Units Generation의 U7 계약, U6와 동일한 정적 문서 NFR 구조
- **Decision:** 추가 질문 없이 inherited decisions를 적용한다.
- **New scope:** 없음
- **Execution note:** 이 확인은 U7의 계약 산출물 작성 승인 기록이며, 실제 문제·카드·퀴즈·Anki 행의 생성 또는 품질 `verified` 승격을 의미하지 않는다.

## Questions

추가 사용자 질문 없음. 아래 항목은 질문이 아니라 downstream content 단계에서 확인해야 하는 inherited open items다.

| ID | 상속된 확인 항목 | 현재 처리 | 영향 |
|---|---|---|---|
| Q-U7-1 | U1이 확정할 기준선 행 수와 실제 revision | 확인 전까지 `review` 또는 `blocked` 상태 유지 | 문항·카드·퀴즈·Anki의 실제 매핑 수 |
| Q-U7-2 | 기준선 행별 최소 문항과 가중치 기반 추가 문항의 실제 배분 | 규칙만 계약하고 수량은 deferred | 문제은행 생성 |
| Q-U7-3 | Anki의 `front,back` 외 추가 열 | 호환성 검토 후 downstream에서 결정 | CSV 가져오기 안내 |
| Q-U7-4 | 차단된 공식 출처의 대체 경로 | 실제 차단 URL별 후속 기록 | 영향을 받는 파생 자료의 보류 |
| Q-U7-5 | 최종 품질 증거의 세부 파일 배치 | U8 계약을 따르며 downstream에서 결정 | 재검사 증거 연결 |

## U7 content output contract

| 산출물 계약 | 안정 ID 규칙 | 내용 |
|---|---|---|
| 문제은행 | `Q-<n>` | 질문, 선택지, 정답, 해설, domain, baseline ID, 공식 출처 메타데이터, 난이도, 범위 분류. 실제 `Q-<n>` 행은 downstream에서 작성한다. |
| 점수 워크시트 | `SCORE-<slug>` | 전체 문항 수, 첫 시도 정답·미응답, 산식, 소수 첫째 자리 반올림, 재시도 별도 기록, 80% 해석, 비수집 경계 |
| 카드 | `CARD-<slug>` | 핵심 용어 또는 혼동 지점, 한국어 설명, 영어 원문, baseline ID, 원본 문서 링크 |
| 용어 퀴즈 | `TQ-<n>` | 용어 질문·정답·해설, baseline ID, 원본 문서 링크 |
| Anki | `ANKI-<n>` | UTF-8 CSV의 `front,back` 및 추적 필드 계약, baseline ID 또는 원본 출처 |

## Scope classification contract

- `시험 범위`: 공식 AIF-C01 기준선에 직접 연결된 항목.
- `실무 확장`: 관련 `AIF-C01-D<n>-T<n>`를 먼저 제시한 서비스 선택, 비교, 시나리오 또는 학습 예시. 공식 출제 범위가 아니다.
- `학습자용 해설`: 이해를 돕는 재구성·예시이며 공식 사실과 혼동하지 않는다.
- 확인되지 않았거나 차단된 출처에 의존하는 downstream 항목은 `verified`가 될 수 없고 `review`·`blocked`·`확인 필요` 상태를 유지한다.

## Upstream contract references

- 요구사항: `inception/requirements-analysis/requirements.md`
- 사용자 스토리: `inception/user-stories/stories.md`
- Unit 경계: `inception/units-generation/unit-of-work.md`
- U1 기준선·출처 계약: `sources/`의 canonical registry와 content traceability
- U2~U6 도메인 문서·용어: 각 Unit의 static learning content
- U8 품질 증거: `QualityCheckRecord` 계약과 최종 품질 보고서

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 범위 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 1](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html) — D1 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 2](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html) — D2 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 3](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html) — D3 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 4](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html) — D4 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 5](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html) — D5 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [requirements.md](../../../inception/requirements-analysis/requirements.md) — 승인된 기능·NFR·AC 계약, 확인일: 2026-09-04
- [stories.md](../../../inception/user-stories/stories.md) — 승인된 사용자 스토리·AC 계약, 확인일: 2026-09-04
- [unit-of-work.md](../../../inception/units-generation/unit-of-work.md) — U7 소유권·산출물 계약, 확인일: 2026-09-04

## Assumptions & Open Questions

- U1의 실제 기준선 행과 `source-registry.yaml` 상태가 확정되기 전까지 U7 파생 자료는 계약 상태이며 `verified`가 아니다.
- U7은 학습자 답안·진도·계정·개인정보를 저장하지 않는다. 점수 워크시트의 기록은 학습자의 로컬 수기 사용으로 한정한다.
- 문제은행·카드·퀴즈·Anki의 실제 행 수와 문항 내용은 이 단계에서 생성하지 않으며 downstream content outputs 계약으로 deferred 한다.
- U8이 최종 품질 증거를 기록하기 전까지 출처·초보자·범위·중복 검토는 완료된 것으로 간주하지 않는다.

## Consolidated Summary Confirmation

기존 승인된 정적 콘텐츠 NFR 결정과 U7 계약을 추가 범위 없이 적용해도 되는가?

- Looks correct
- Request changes

[Answer]: Looks correct