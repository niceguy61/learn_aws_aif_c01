---
title: "U7 평가·복습 자료 기술 결정"
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

# U7 평가·복습 자료 기술 결정

## 목적과 경계

U7은 모든 도메인을 참조하는 정적 평가·복습 packaging Unit이다. 기술 결정은 문제은행·점수 워크시트·카드·용어 퀴즈·Anki CSV의 파일·ID·추적·검사 계약만 정의한다.

U7에는 API, DB, AWS 계정·리소스, 배포·호스팅, 유료 실습, learner state/data 저장, 실행형 UI, 새 dependency가 없다. 실제 문제 100개 이상도 이 단계에서 만들지 않고 downstream content outputs의 계약으로 남긴다.

## 단계 upstream 적용성

`requirements.md`의 FR/NFR/AC, `stories.md`의 US/AC, `unit-of-work.md`의 U7 경계와 U1 canonical source contract를 입력으로 사용한다. 실행형 `functional-spec`은 정적 packaging Unit에 `N/A`이며, `rules`는 UTF-8·한국어·출처·초보자·비수집 규칙으로 `OK`다.

## 결정 요약

| 결정 ID | 선택 | 적용 대상 | 이유 |
|---|---|---|---|
| TECH7.1 | UTF-8 Markdown + YAML front matter | U7 NFR·계약·평가 안내 | 한국어 설명, 영어 원문, 상태 메타데이터를 보존한다. |
| TECH7.2 | UTF-8 CSV with `front,back` | Anki output contract | 일반 Anki 가져오기와 추적 필드의 기본 호환성을 유지한다. |
| TECH7.3 | 저장소 상대 Markdown 링크 | 문항·카드·퀴즈·워크시트·U2~U6 자료 | 이동·정적 배포 환경과 무관한 탐색·역추적을 유지한다. |
| TECH7.4 | U1 canonical source registry 참조 | 모든 외부 사실·기준선 | URL·제목·revision·확인일·상태의 단일 기준을 사용한다. |
| TECH7.5 | 결정적 안정 ID | Q, SCORE, CARD, TQ, ANKI, baseline | 항목 개정에도 추적표와 양방향 링크를 재구성한다. |
| TECH7.6 | 정적 Markdown 점수 워크시트 | 첫 시도·재시도 기록 | 학습자 로컬 수기 사용을 지원하면서 데이터 수집을 막는다. |
| TECH7.7 | 항목 수준 scope classification | 문제·카드·퀴즈·Anki 행 | `시험 범위`, `실무 확장`, `학습자용 해설`의 혼동을 막는다. |
| TECH7.8 | 기존 저장소 품질 센서·표준 파서 재사용 | 구조·링크·추적·CSV·민감정보 검사 | 새 runtime·package·supply-chain 위험을 만들지 않는다. |
| TECH7.9 | downstream content outputs로 지연 | 실제 평가·복습 항목 | 기준선 행·도메인 자료·출처 상태가 확정되기 전의 추측을 방지한다. |

## 문서 구조 결정

U7의 실제 downstream 문서는 다음 계약을 따른다.

- 문제은행: `assessment/question-bank.md` 또는 승인된 동일 목적의 정적 Markdown. 각 문항은 `Q-<n>` anchor와 domain, baseline ID, 질문, 선택지, 정답, 해설, 공식 출처 메타데이터, 난이도, 범위 분류를 가진다. `N >= max(100, 확인된 기준선 행 수)`는 생성 시점에 계산한다.
- 점수 워크시트: `assessment/score-sheet.md`에 `SCORE-<slug>`를 두고 전체 문항 수, 첫 시도 정답 수, 미응답 수, 산식, 소수 첫째 자리 반올림, 재시도 별도 행, 80%의 비보장 의미, 비수집 경계를 설명한다.
- 카드: `assessment/cards.md`의 `CARD-<slug>` 항목은 용어·혼동 지점, 한국어 설명, 영어 원문, baseline ID, 원본 링크를 가진다.
- 용어 퀴즈: `assessment/term-quiz.md`의 `TQ-<n>` 항목은 질문·정답·해설·baseline ID·원본 링크를 가진다.
- Anki: `assessment/anki.csv`는 최소 `front,back`과 추적 필드를 갖는 UTF-8 CSV다. 실제 열 추가는 downstream 호환성 검토 후 결정한다.

## 탐색·접근성 결정

문항·카드·퀴즈·Anki 안내는 U2~U6의 원본 문서와 U1의 기준선·출처로 이동하는 상대 링크를 제공한다. 표는 모바일에서 읽을 수 있을 정도로 열을 제한하고, 긴 문항은 짧은 소제목·목록으로 나눈다. 이미지나 Mermaid를 사용하지 않아도 핵심 판단을 이해할 수 있어야 하며, 사용한다면 한국어 alt text·캡션·텍스트 fallback을 함께 둔다.

## 검사·재현성 결정

| 검사 | U7 대상 | 판정 |
|---|---|---|
| required-sections | NFR Markdown·계약 문서 | front matter, H2, `Sources`, `Assumptions & Open Questions` 누락 시 실패 |
| upstream-coverage | 네 산출물 | requirements·stories·unit-of-work·U1 source contract 적용성 기록 필요 |
| traceability | `traceability.json` | 모든 NFR/AC, gaps·orphans·invalid targets를 검사 |
| linter/type-check | 코드 블록 | 실행 코드가 없으므로 `N/A`; 코드가 추가되면 범위 위반으로 재검토 |
| UTF-8·CSV | Markdown·Anki | encoding, header, quoting, comma/newline parsing 검사 |
| 범위·출처 | 모든 downstream 항목 | baseline ID, source metadata, scope classification, blocked 보류 검사 |
| 민감정보 | 모든 정적 파일·예시 | secret, token, PII, account identifier, signed URL 부재 검사 |
| 문항 품질 | question bank | 정답·오답 타당성, 난이도, 중복을 각각 `통과|실패|보류`로 기록 |

## 해당 없음 결정

| 항목 | 상태 | 근거 |
|---|---|---|
| API·웹 앱·UI runtime | 해당 없음 | U7은 정적 Markdown·CSV packaging Unit이다. |
| 데이터베이스·학습자 state 저장 | 해당 없음 | 답안·진도·계정 데이터를 수집·저장하지 않는다. |
| AWS 서비스·계정·리소스·배포 | 해당 없음 | AWS는 출처와 실무 확장 설명의 대상일 뿐 실제 호출·배포 대상이 아니다. |
| 인증·인가·네트워크 보안 구성 | 해당 없음 | 실행 경계가 없다. |
| 유료 실습·실제 문항 실행 엔진 | 해당 없음 | 로컬 정적 자료만 제공한다. |
| 새 dependency·runtime | 해당 없음 | 기존 문서 규칙·품질 센서·표준 파서를 재사용한다. |
| 자동 최신성 모니터링 | 해당 없음 | 확인일·상태·후속 확인을 기록하지만 정기 수집을 만들지 않는다. |

## 대안과 트레이드오프

### 평가 웹 애플리케이션

자동 채점과 진도 편의성은 높지만 API·DB·인증·learner state/data 저장·배포가 필요하다. 승인된 범위와 U7 packaging 경계에 맞지 않아 선택하지 않았다.

### 외부 LMS 또는 호스팅형 Anki 서비스

학습 동기화는 가능하지만 계정·개인정보·외부 의존성과 비용 경계가 생긴다. 정적 UTF-8 CSV와 로컬 사용으로 대체한다.

### 새 CSV/문서 처리 dependency

구문 검사를 강화할 수 있으나 공급망·설치·유지보수 비용이 늘어난다. 현재는 기존 도구와 표준 파서 검사 계약을 사용한다.

### 지금 실제 문항 100개 생성

후속 콘텐츠 작성 속도는 빨라 보이지만 U1 기준선 revision·출처 상태·U2~U6 문서 연결이 확정되기 전 추측과 재작업을 만든다. 이 단계에서는 downstream content outputs 계약만 정의한다.

## 핵심 정리

U7의 기술 선택은 실행형 기술을 선택하지 않는 것이다. UTF-8 Markdown·UTF-8 CSV·상대 링크·결정적 ID·U1 출처 참조·기존 품질 검사를 사용해 정적 평가·복습 자료의 추적성과 초보자 가독성을 확보한다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 1](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html) — D1 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 2](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html) — D2 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 3](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html) — D3 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 4](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html) — D4 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [AIF-C01 도메인 5](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html) — D5 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [requirements.md](../../../inception/requirements-analysis/requirements.md) — 승인된 NFR·AC·정적 산출물 제약, 확인일: 2026-09-04
- [stories.md](../../../inception/user-stories/stories.md) — 승인된 U7 관련 acceptance criteria, 확인일: 2026-09-04
- [unit-of-work.md](../../../inception/units-generation/unit-of-work.md) — U7 소유권·산출물·계약, 확인일: 2026-09-04

## Assumptions & Open Questions

- U1 기준선 등록과 U2~U6 문서·용어 ID가 확정되면 downstream content outputs가 이 기술 계약을 구현한다.
- 실제 Anki 추가 열은 일반 가져오기 호환성을 확인한 후 결정한다.
- `N >= max(100, 확인된 기준선 행 수)`는 생성 계약이며 이 단계의 실제 문항 수를 의미하지 않는다.
- 정적 자료의 상태는 `review`이며 U8 품질 증거와 출처 검증 전에는 `verified`로 올리지 않는다.
- 이 문서는 실행형 시스템의 기술 스택 선정서가 아니라 정적 콘텐츠 패키징 계약이다.

<!-- U7 summary confirmation recorded; no scope or contract change. -->