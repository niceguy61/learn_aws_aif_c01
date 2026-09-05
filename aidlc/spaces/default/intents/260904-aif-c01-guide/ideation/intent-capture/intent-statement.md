# Intent Statement

## Problem Statement

AIF-C01 시험을 준비하는 완전 초보자가 AI/ML과 AWS의 핵심 개념을 이해하고, AWS 서비스 선택과 시나리오 판단을 거쳐 시험 문제에 적용할 수 있는 한국어 학습 자료가 필요합니다. 이 자료는 단순 암기보다 개념 이해와 문제 풀이 연결을 지원해야 합니다. [Q1]

시험 준비 기간이 1개월 이내로 정해져 있으므로, 학습자는 시험에 직접 연결되는 핵심 내용을 우선적으로 빠르게 복습할 수 있어야 합니다. [Q4]

## Target Customer

주요 대상은 AI/ML과 AWS를 모두 처음 접하는 완전 초보자입니다. 코딩·수학·통계·모델 개발 경험이 없어도 문서를 따라갈 수 있어야 합니다. [Q2]

학습자는 AIF-C01 합격과 이해하기 쉬운 설명을 중요하게 여기며, 개념 설명에서 AWS 서비스 선택과 시나리오 판단으로 자연스럽게 이동할 수 있는 구조를 필요로 합니다. [Q1][Q5]

## Success Metrics

- AWS 공식 AIF-C01 시험 안내서의 5개 도메인과 모든 작업·기술 항목을 빠짐없이 추적합니다. [Q3]
- 1개월 이내에 자체 문제은행 전체 정답률 80% 이상을 달성할 수 있도록 핵심 복습과 문제 풀이 자료를 제공합니다. [Q3][Q9]
- 100문항 이상의 자체 제작 문제은행을 제공합니다. [Q3]
- 카드 요약, 학습 진도표, 용어 퀴즈, Anki 가져오기 자료를 제공합니다. [Q3]
- 코드·수학·유료 AWS 실습을 기본 범위에서 제외하여 초보자의 학습 장벽을 낮춥니다. [Q2][Q8]

## Initiative Trigger

1개월 이내 AIF-C01 시험 준비가 직접적인 시작 계기입니다. 합격을 최우선으로 하되, 시험 개념을 AWS 서비스 선택과 기본 시나리오에 연결하는 범위까지 실무 확장을 제공합니다. [Q4][Q10]

## Initial Scope Signal

- **Workflow-selected**: `aif-c01-korean-guide-comprehensive` 범위가 선택되어 있습니다. 이는 workflow가 선택한 범위이며, 그 자체가 사용자의 제품 범위 확인을 대신하지는 않습니다. [scope]
- **User-confirmed product boundary**: 5개 도메인 전체, 초보자용 상세 설명, 시험 개념과 AWS 서비스 선택·기본 시나리오를 연결하는 실무 확장, 공식 출처 추적, 100문항 이상 문제은행, Anki 자료를 포함하는 AIF-C01 한국어 가이드입니다. [Q8][Q10]
- **Writing order**: D1→D2→D3→D4→D5 순서로 도메인별 문서를 작성하고 승인받습니다. [Q7]
- **Depth and test strategy**: `depth`는 Comprehensive, `test strategy`는 Comprehensive로 적용합니다. [Q8][Q13]

## Assumptions & Open Questions

None.

## Review

**Verdict:** READY
**Reviewer:** aidlc-product-lead-agent
**Date:** 2026-09-04T03:02:42Z
**Iteration:** 2

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| R-01 | Major | aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/intent-capture/intent-statement.md > Target Customer | 완전 초보자 대상과 코딩·수학·통계·모델 개발 경험 없이 학습 가능해야 한다는 경계가 명시되어 있다. | 초보자 대상과 선수 지식 경계를 유지한다. | Resolved |
| R-02 | Major | aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/intent-capture/intent-statement.md > Success Metrics 및 Initial Scope Signal | AIF-C01 공식 5개 도메인 전체와 모든 작업·기술 항목을 추적하고, 시험 합격을 우선하되 AWS 서비스 선택·기본 시나리오까지 연결하는 범위가 명시되어 있다. | 5개 도메인 전체 추적과 시험 범위·실무 확장의 구분을 유지한다. | Resolved |
| R-03 | Major | aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/intent-capture/intent-statement.md > Success Metrics | 1개월 이내 준비의 판정 기준으로 자체 문제은행 전체 정답률 80% 이상이 명시되어 있다. | 전체 정답률 기준을 도메인별 기준이나 다른 합격 기준으로 임의 변경하지 않는다. | Resolved |
| R-04 | Major | aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/intent-capture/intent-statement.md > Target Customer 및 Initial Scope Signal | 사용자 질문·설명뿐 아니라 검토 자료와 학습 문서 전체를 한글로 작성하며, 실무 확장은 시험 개념을 AWS 서비스 선택과 기본 시나리오에 연결하는 범위로 제한한다. | 한글 적용 범위와 실무 확장의 경계를 유지하고 범위 밖의 복잡한 실무 구축을 추가하지 않는다. | Resolved |
| R-05 | Major | aidlc/spaces/default/intents/260904-aif-c01-guide/ideation/intent-capture/intent-statement.md > Initial Scope Signal > Depth and test strategy | Q8은 `Standard`를 역사적 초기 제안으로 명시하고, Q13은 `Comprehensive`를 확정하며, 통합 요약도 현재 `test strategy`가 `Comprehensive`라고 명시한다. | 현재 `test strategy`를 `Comprehensive`로 유지한다. | Resolved |

### Summary

R-01~R-04의 초보자 대상, AIF-C01 5개 도메인 전체 범위, 전체 문제은행 정답률 80% 기준, 한글 작성 범위와 실무 확장 경계가 모두 확인되었다. R-05도 Q8의 역사적 제안 표기, Q13의 확정 답변, 통합 요약의 현재값 표기로 해소되었으므로 추가 수정 없이 다음 단계로 진행할 수 있다.