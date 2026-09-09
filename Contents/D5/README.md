![도메인 D5](https://img.shields.io/badge/%F0%9F%A7%AD%20Domain-D5-B45309?style=flat-square&labelColor=0F172A) ![난이도 입문](https://img.shields.io/badge/%F0%9F%8C%B1%20Level-Beginner-2EA44F?style=flat-square&labelColor=0F172A) ![문서 상태 초안](https://img.shields.io/badge/%F0%9F%8F%97%EF%B8%8F%20Status-Draft-F59E0B?style=flat-square&labelColor=0F172A)

# D5 — AI 솔루션의 보안, 규정 준수 및 거버넌스

- 공식 도메인: [AI 솔루션의 보안, 규정 준수 및 거버넌스](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html)
- 공식 가중치: **14%**
- 문서 상태: `draft` — 공식 출처 revision과 기술 행은 현재 sources/ 기록에 따라 검증 보류 상태입니다.

## 학습 순서

- [Task 5 보안·규정 준수·거버넌스 개요](./task-5/README.md)
- [Task 5.1 AI 시스템 보안](./task-5-1/README.md)
- [Task 5.2 AI 시스템 거버넌스와 규정 준수](./task-5-2/README.md)

## 원본 보존

원본 57개는 모두 docs/Refs/에 그대로 보존합니다. 이 디렉터리의 문서는 원본을 복사한 뒤 메타데이터·도식·네비게이션만 추가한 학습용 파생본입니다.

렌더러 없이도 노드와 화살표로 도메인의 학습 흐름을 읽을 수 있습니다.

```mermaid
flowchart TD
  user[사용자와 애플리케이션] --> iam[IAM 권한 평가]
  iam --> network[PrivateLink와 네트워크 경계]
  network --> protect[암호화와 데이터 보호]
  protect --> model[모델과 데이터 경계]
  model --> guard[Guardrails와 검증]
  guard --> audit[CloudTrail 감사]
  audit -. 정책 개선과 재검토 .-> iam
```

---

[이전 도메인](../D4/README.md) | [Contents 인덱스](../README.md) | 다음: 없음
