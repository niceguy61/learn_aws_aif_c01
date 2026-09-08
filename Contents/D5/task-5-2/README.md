# Task 5.2 AI 시스템 거버넌스와 규정 준수

- 도메인: [D5 — AI 솔루션의 보안, 규정 준수 및 거버넌스](../README.md)
- 상태: `draft`
- 원본은 docs/Refs에 보존하며 이 폴더의 문서는 학습용 복사본입니다.

## 포함 문서

| 학습 문서 | 보존된 원본 |
|---|---|
| [part-1.md](./part-1.md) | [AIF-C01-Task5-2-Part1.md](../../../docs/Refs/AIF-C01-Task5-2-Part1.md) |
| [part-2.md](./part-2.md) | [AIF-C01-Task5-2-Part2.md](../../../docs/Refs/AIF-C01-Task5-2-Part2.md) |
| [part-3.md](./part-3.md) | [AIF-C01-Task5-2-Part3.md](../../../docs/Refs/AIF-C01-Task5-2-Part3.md) |
| [part-4.md](./part-4.md) | [AIF-C01-Task5-2-Part4.md](../../../docs/Refs/AIF-C01-Task5-2-Part4.md) |
| [part-5.md](./part-5.md) | [AIF-C01-Task5-2-Part5.md](../../../docs/Refs/AIF-C01-Task5-2-Part5.md) |
| [part-6.md](./part-6.md) | [AIF-C01-Task5-2-Part6.md](../../../docs/Refs/AIF-C01-Task5-2-Part6.md) |

## 학습 순서

이 Task는 위 표의 순서대로 읽습니다. 각 문서에는 원본 링크와 도메인 전체 순서의 이전·인덱스·다음 네비게이션이 있습니다.

```mermaid
flowchart TD
  scope[도메인 목표] --> task[Task 선택]
  task --> learn[보안 통제 학습]
  learn --> scenario[경계와 권한 판단]
  scenario --> evidence[감사 증적 확인]
  evidence -. 빠진 통제 보충 .-> learn
```