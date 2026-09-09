![도메인 D3](https://img.shields.io/badge/%F0%9F%A7%AD%20Domain-D3-2563EB?style=flat-square&labelColor=0F172A) ![난이도 입문](https://img.shields.io/badge/%F0%9F%8C%B1%20Level-Beginner-2EA44F?style=flat-square&labelColor=0F172A) ![문서 상태 초안](https://img.shields.io/badge/%F0%9F%8F%97%EF%B8%8F%20Status-Draft-F59E0B?style=flat-square&labelColor=0F172A)

# D3 — 파운데이션 모델의 적용

- 공식 도메인: [파운데이션 모델의 적용](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html)
- 공식 가중치: **28%**
- 문서 상태: `draft` — 공식 출처 revision과 기술 행은 현재 sources/ 기록에 따라 검증 보류 상태입니다.

## 학습 순서

- [Task 3 파운데이션 모델 적용 개요](./task-3/README.md)
- [Task 3.1 FM 애플리케이션 설계](./task-3-1/README.md)
- [Task 3.2 프롬프트 엔지니어링](./task-3-2/README.md)
- [Task 3.3 훈련·미세 조정](./task-3-3/README.md)
- [Task 3.4 성능 평가](./task-3-4/README.md)
- [Task 3 참고 문서](./task-3-reference/README.md)

## 원본 보존

원본 57개는 모두 docs/Refs/에 그대로 보존합니다. 이 디렉터리의 문서는 원본을 복사한 뒤 메타데이터·도식·네비게이션만 추가한 학습용 파생본입니다.

렌더러 없이도 노드와 화살표로 도메인의 학습 흐름을 읽을 수 있습니다.

```mermaid
flowchart TD
  requirements[요구 사항] --> select{모델 선택 기준}
  select --> latency[지연 시간과 비용]
  select --> modality[모달리티와 언어]
  select --> context[컨텍스트와 사용자 지정]
  latency --> candidate[후보 FM 비교]
  modality --> candidate
  context --> candidate
  candidate --> validate[품질과 제약 검증]
```

---

[이전 도메인](../D2/README.md) | [Contents 인덱스](../README.md) | [다음 도메인](../D4/README.md)
