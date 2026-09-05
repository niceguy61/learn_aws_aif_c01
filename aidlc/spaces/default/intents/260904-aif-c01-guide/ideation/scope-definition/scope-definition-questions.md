# Scope Definition Questions

## 목적

승인된 의도, 실행 가능성 평가, 제약 등록부를 바탕으로 범위 경계와 우선순위를 확정한다. 사용자가 이미 결정한 항목은 다시 질문하지 않고 그대로 전달한다.

## 질문 상태

추가로 사용자에게 확인할 범위·우선순위 질문은 없다. 이전 단계에서 대상, 시험 범위, 산출물, 순서, 일정 표현, 실무 확장 경계와 품질 기준이 결정되었고, 이 단계의 통합 요약도 승인되었다.

## 적용할 승인 결정

| 결정 영역 | 적용할 승인 결정 | 근거 |
|---|---|---|
| 시험 범위 | AIF-C01 5개 도메인 전체와 모든 작업·기술 항목을 다룬다. | `intent-statement.md` [Q3], `feasibility-assessment.md` |
| 대상과 난이도 | AI/ML과 AWS 완전 초보자를 대상으로 하며 코드·수학·통계·모델 개발 경험을 요구하지 않는다. | `intent-statement.md` [Q2][Q8] |
| 학습 순서 | D1 → D2 → D3 → D4 → D5 순서로 도메인별 문서를 작성하고 검토·승인한다. | `intent-statement.md` [Q7] |
| 학습 산출물 | 100문항 이상 문제은행, 카드 요약, 진도표, 용어 퀴즈, UTF-8 Anki CSV를 포함한다. | `intent-statement.md` [Q3][Q9] |
| 실무 확장 | AWS 서비스의 개념·선택·비교와 기본 시나리오까지만 포함한다. | `intent-statement.md` [Q10], `constraint-register.md` C-10 |
| 품질 기준 | 문제은행 전체 정답률 목표는 80% 이상이며 문항별 도메인·작업/기술 항목·정답·해설·공식 URL을 추적한다. | `intent-statement.md` [Q3][Q9] |
| 최신성 | 각 도메인 작성 직전과 최종 검토에서 공식 출처를 확인하며, 차단된 주장은 `확인 필요`로 보류한다. | `feasibility-assessment.md`, `constraint-register.md` C-06~C-07 |
| 제외 범위 | 코드 실습, 복잡한 수학·통계, 모델 개발, 프로덕션 구축·운영·트러블슈팅, 유료 AWS 실습, 학습자 개인정보 수집을 기본 범위에서 제외한다. | `constraint-register.md` C-04, C-11 및 명시적 제외 |
| 일정 표현 | 정확한 시험 날짜를 발명하지 않고 상대 표현인 “1개월 이내”와 우선순위로 관리한다. | `constraint-register.md` C-02, C-13 |

## 분석 결과

- 모순되는 범위·일정·품질 결정은 확인되지 않았다.
- 범위 경계와 우선순위에 영향을 줄 미해결 질문은 없다.
- 다음 산출물은 승인 결정을 바꾸지 않고 Must Have·Should Have·Won't Have로 정리한다.
- 공식 출처가 동적이거나 차단되면 내용을 확정하지 않고 `확인 필요` 또는 `blocked`로 기록한다.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/intent-capture/intent-statement.md` — 승인된 의도·대상·성공 기준·범위 경계.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/feasibility/feasibility-assessment.md` — 실행 가능성·품질 통제·산출물 기준.
- `aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/feasibility/constraint-register.md` — 범위·일정·최신성·형식·데이터 제약.

## Consolidated Summary

- 시험 합격을 위한 공식 AIF-C01 전체 범위를 최우선으로 한다.
- 초보자의 이해를 위해 개념 설명에서 AWS 서비스 선택과 기본 시나리오 판단으로 연결한다.
- 핵심 산출물은 D1~D5 학습 자료, 100문항 이상 문제은행, 카드·진도·용어 퀴즈·Anki 자료다.
- 실무 확장과 시험 공식 범위를 문서와 추적표에서 분리한다.
- 모든 문항과 출처의 추적성을 확인하고, 확인되지 않은 내용은 확정하지 않는다.

## Consolidated Summary Confirmation

- Looks correct
- Request changes

[Answer]: Looks correct
