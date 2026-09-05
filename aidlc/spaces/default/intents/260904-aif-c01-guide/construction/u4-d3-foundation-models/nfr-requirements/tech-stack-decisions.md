---
title: "U4 D3 파운데이션 모델의 적용 기술 결정"
domain: "D3"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html"
  - "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
source_checked: "2026-09-04"
---

# U4 D3 파운데이션 모델의 적용 기술 결정

## 목적과 경계

U4는 FM 적용을 설명하는 정적 Markdown·JSON 패키지다. 모델·벡터 저장소·평가 파이프라인을 실행하지 않고 문서 구조, 출처, 추적성, 합성 예시를 선택한다.

## 단계 upstream 적용성

`requirements`는 승인된 요구사항 파일을 직접 소비한다. `rules`는 정적 문서·출처 추적·초보자 품질 규칙으로 적용한다. `functional-spec`은 API·실행 흐름이 없는 packaging Unit의 `N/A` 입력이다. 세 판정은 `traceability.json`의 `upstream_contract`에 기록한다.

## 결정 요약

| 결정 ID | 선택 | 적용 대상 | 이유 |
|---|---|---|---|
| TECH4.1 | UTF-8 Markdown + YAML front matter | D3 README·개념·NFR | 한국어·영어 용어와 문서 상태를 안정적으로 보존한다. |
| TECH4.2 | 저장소 상대 링크 | D2 선수·D4 다음·glossary 연결 | 배포 환경과 무관한 탐색을 제공한다. |
| TECH4.3 | U1 source registry 참조 | 모델·Bedrock·프롬프트 출처 | 변동 사실의 revision·상태를 단일 계약에서 관리한다. |
| TECH4.4 | 결정적 JSON 추적표 | NFR/FR/AC·Unit·component | 기존 센서로 상세 요구사항을 반복 검증한다. |
| TECH4.5 | 합성 예시와 no-runtime 경계 | prompt·RAG·evaluation 설명 | 실제 사용자 입력·비밀·데이터 저장을 차단한다. |
| TECH4.6 | 기존 Bun 센서 최소 의존성 | 문서 구조·upstream·traceability | 새 실행 의존성과 공급망 위험을 만들지 않는다. |
| TECH4.7 | Mermaid 선택·텍스트 fallback 필수 | 모델 적용 흐름 | 시각 자료가 없어도 판단 내용을 읽는다. |
| TECH4.8 | 상태 분리 | 문서와 출처 | `review` 문서가 `verified` 출처를 의미하지 않음을 명확히 한다. |
| TECH4.9 | 평가·카드·Anki는 U7 위임 | D3 문서·용어 ID | 평가 자료의 횡단 소유권을 유지한다. |

## 문서 구조 결정

각 문서는 개념 단위로 작성하고 `배울 것 → 선수 지식 → 쉬운 설명 → AWS 관점 → 비교 → 시나리오 → 시험 단서 → 오해 → 정리 → 확인 질문 → 다음 문서 → 출처` 순서를 따른다. FM 선택·prompt engineering·fine-tuning·evaluation을 하나의 문서에 무리하게 합치지 않는다.

## 탐색·접근성 결정

D3 README는 D2를 선수 지식으로, D4를 다음 도메인으로 연결한다. RAG와 평가 흐름은 텍스트 fallback을 제공하고 긴 모델 비교는 여러 작은 표로 나눈다. 중앙 glossary 생성 전에는 D3 용어 inventory를 임시 링크로 표시한다.

## 검사·재현성 결정

| 검사 | U4 대상 | 판정 |
|---|---|---|
| required-sections | 두 Markdown의 front matter·Sources·Review | 구조 누락 시 실패 |
| upstream-coverage | requirements·rules·functional-spec 적용성 | 세 upstream 모두 참조돼야 함 |
| traceability | JSON과 요구사항 ID | gaps·orphans·invalid target 0건 |
| linter/type-check | 코드 블록 | 코드 없음이면 not applicable |
| UTF-8·민감정보·링크 | 세 산출물 | strict UTF-8·합성 예시·상대 링크 |

## 해당 없음 결정

| 항목 | 상태 | 근거 |
|---|---|---|
| Python/JS SDK·모델 API | 해당 없음 | 코드와 모델 호출을 만들지 않는다. |
| 벡터 DB·데이터 파이프라인 | 해당 없음 | RAG 개념만 설명한다. |
| API·DB·IAM·KMS·secret | 해당 없음 | 실행·계정·자격 증명 경계가 없다. |
| 배포·호스팅·SLO | 해당 없음 | shared static package다. |
| 새 패키지 | 해당 없음 | Bun 기본 도구와 표준 파서를 사용한다. |

## 대안과 트레이드오프

### 실행 가능한 모델 실습

학습 효과는 높지만 비용·계정·비밀·데이터 관리가 필요하다. 승인된 범위 밖이므로 선택하지 않았다.

### 하나의 종합 FM 문서

탐색은 쉬워질 수 있으나 prompt·RAG·평가의 선수 관계와 개념 단위가 흐려진다. 개념별 작은 문서를 선택했다.

### 새 추적성 데이터베이스

검색 편의보다 운영·배포·개인정보 경계가 커진다. 결정적 JSON과 버전 관리형 문서를 사용한다.

## 핵심 정리

U4는 실행형 FM 기술이 아니라 출처·합성 예시·개념 단위·결정적 추적성을 갖춘 정적 문서 패키지다. 모델 호출·RAG 저장·API·DB·AWS 계정은 없다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [콘텐츠 도메인 3: 파운데이션 모델의 적용](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html) — D3 기준, 확인일: 2026-09-04, 상태: `downloaded`
- [Prompt engineering guidelines](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html) — 실무 확장, 확인일: 2026-09-04, 상태: `summarized`
- [U4 Unit 계약](../../../inception/units-generation/unit-of-work.md) — 경계·소유권, 확인일: 2026-09-04, 상태: `reviewed`

## Assumptions & Open Questions

- D3 모델·서비스 기준선 확정 전 문서 상태는 `review`다.
- 중앙 glossary와 평가 자료는 U7 또는 후속 품질 단계에서 연결한다.
- 최신 모델 기능·가격·리전·할당량은 콘텐츠 작성 시 공식 페이지에서 재확인한다.
