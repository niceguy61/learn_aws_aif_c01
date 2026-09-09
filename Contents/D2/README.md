![도메인 D2](https://img.shields.io/badge/%F0%9F%A7%AD%20Domain-D2-7C3AED?style=flat-square&labelColor=0F172A) ![난이도 입문](https://img.shields.io/badge/%F0%9F%8C%B1%20Level-Beginner-2EA44F?style=flat-square&labelColor=0F172A) ![문서 상태 초안](https://img.shields.io/badge/%F0%9F%8F%97%EF%B8%8F%20Status-Draft-F59E0B?style=flat-square&labelColor=0F172A)

# D2 — GenAI의 기초

- 공식 도메인: [GenAI의 기초](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html)
- 공식 가중치: **24%**
- 문서 상태: `draft` — 공식 출처 revision과 기술 행은 현재 sources/ 기록에 따라 검증 보류 상태입니다.

## 학습 순서

- [Task 2.1 GenAI 기본 개념](./task-2-1/README.md)
- [Task 2.2 비즈니스 문제 해결을 위한 기능과 한계](./task-2-2/README.md)
- [Task 2.3 AWS 인프라와 기술](./task-2-3/README.md)
- [Task 2 참고 문서](./task-2-reference/README.md)

## 원본 보존

원본 57개는 모두 docs/Refs/에 그대로 보존합니다. 이 디렉터리의 문서는 원본을 복사한 뒤 메타데이터·도식·네비게이션만 추가한 학습용 파생본입니다.

렌더러 없이도 노드와 화살표로 도메인의 학습 흐름을 읽을 수 있습니다.

```mermaid
flowchart LR
  input[사용자 요청] --> token[토큰 기반 처리]
  token --> model[파운데이션 모델]
  model --> output[생성 결과]
  output --> measure[품질 비용 KPI]
  measure -. 프롬프트와 모델 개선 .-> input
  measure --> guard[안전장치와 검증]
```

---

[이전 도메인](../D1/README.md) | [Contents 인덱스](../README.md) | [다음 도메인](../D3/README.md)
