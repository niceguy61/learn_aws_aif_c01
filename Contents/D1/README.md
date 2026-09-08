---
title: 'D1 — AI 및 ML의 기초'
domain: 'D1'
level: 'beginner'
status: 'draft'
source_urls:
  - 'https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html'
source_checked: '2026-09-04'
---

# D1 — AI 및 ML의 기초

- 공식 도메인: [AI 및 ML의 기초](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html)
- 공식 가중치: **20%**
- 문서 상태: `draft` — 공식 출처 revision과 기술 행은 현재 sources/ 기록에 따라 검증 보류 상태입니다.

## 학습 순서

- [Task 1.1 기본 AI 개념과 용어](./task-1-1/README.md)
- [Task 1.2 AI 실제 사용 사례](./task-1-2/README.md)
- [Task 1.3 ML 개발 수명 주기](./task-1-3/README.md)

## 원본 보존

원본 57개는 모두 docs/Refs/에 그대로 보존합니다. 이 디렉터리의 문서는 원본을 복사한 뒤 메타데이터·도식·네비게이션만 추가한 학습용 파생본입니다.

렌더러 없이도 노드와 화살표로 도메인의 학습 흐름을 읽을 수 있습니다.

```mermaid
flowchart TD
  ai[AI 문제 해결 범주] --> ml[ML 데이터 학습]
  ml --> dl[딥 러닝 신경망]
  dl --> gen[GenAI 새 콘텐츠]
  ml -. 규칙 기반과 구분 .-> rules[명시적 규칙]
  gen --> output[텍스트 이미지 코드 출력]
```

---

이전: 없음 | [Contents 인덱스](../README.md) | [다음 도메인](../D2/README.md)
