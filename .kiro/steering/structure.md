---
inclusion: always
---
# 저장소 구조와 산출물 규칙

## 목표 구조

```text
.
├── .kiro/
│   └── steering/                 # 프로젝트 운영·집필 규칙
├── docs/
│   ├── 00-start-here/            # 사용법, 선수 지식, 학습 진단
│   ├── 01-ai-ml-foundations/     # 도메인 1
│   ├── 02-generative-ai/         # 도메인 2
│   ├── 03-foundation-models/     # 도메인 3
│   ├── 04-responsible-ai/        # 도메인 4
│   ├── 05-security-compliance/   # 도메인 5
│   ├── 06-exam-strategy/         # 문제 유형, 복습, 모의고사 전략
│   └── glossary.md               # 누적 용어 사전
├── sources/
│   ├── aws-sidebar-index.md      # 공식 사이드바 전체 링크 목록
│   ├── source-registry.yaml      # URL·분류·확인일·변환 상태
│   └── raw/                      # 허용 범위의 원문 메타데이터 또는 다운로드 자료
├── plans/
│   ├── outline.md                # 승인된 전체 목차
│   └── questions.md              # 사용자 결정 질문과 답변 기록
└── aidlc/                        # AI-DLC 실행 상태와 산출물
```

실제 디렉터리와 파일은 작업 단계에서 생성한다. 사용자 승인 전에는 목차와 범위를 임의로 확정하지 않는다.

## 도메인 문서 규칙
- 도메인 디렉터리에는 `README.md`를 두어 도메인 목표, 공식 시험 항목, 선수 지식, 문서 읽기 순서를 안내한다.
- 시험 안내서의 각 작업·기술 항목은 적어도 하나의 문서 또는 명시적인 `해당 없음/확장` 기록에 연결한다.
- 문서는 한 번에 너무 많은 개념을 넣지 않고 개념 단위로 나눈다.
- 도메인 README에는 공식 가중치와 마지막 검증일을 표시한다.

## 상태 관리
- 링크 수집 상태: `discovered` → `downloaded` → `summarized` → `reviewed` → `verified`.
- 문서 상태: `draft` → `review` → `verified`.
- 사용자 승인, 출처 검증, AI-DLC 단계 완료를 서로 혼동하지 않는다.
