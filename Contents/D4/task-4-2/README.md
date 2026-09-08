# Task 4.2 투명하고 설명 가능한 모델

- 도메인: [D4 — 책임 있는 AI에 대한 가이드라인](../README.md)
- 상태: `draft`
- 원본은 docs/Refs에 보존하며 이 폴더의 문서는 학습용 복사본입니다.

## 포함 문서

| 학습 문서 | 보존된 원본 |
|---|---|
| [part-1.md](./part-1.md) | [AIF-C01-Task4-2-Part1.md](../../../docs/Refs/AIF-C01-Task4-2-Part1.md) |
| [part-2.md](./part-2.md) | [AIF-C01-Task4-2-Part2.md](../../../docs/Refs/AIF-C01-Task4-2-Part2.md) |

## 학습 순서

이 Task는 위 표의 순서대로 읽습니다. 각 문서에는 원본 링크와 도메인 전체 순서의 이전·인덱스·다음 네비게이션이 있습니다.

```mermaid
flowchart TD
  scope[도메인 목표] --> task[Task 선택]
  task --> learn[위험과 원칙 학습]
  learn --> scenario[시나리오 판단]
  scenario --> review[측정과 완화 검토]
  review -. 놓친 위험 보충 .-> learn
```