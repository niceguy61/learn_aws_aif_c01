<!-- INVARIANT: examples are single-line HTML comments so a fresh template parses to total=0 (MEMORY_EMPTY). Do NOT un-comment or split across lines. t100 guards this. -->
> This file is kept up to date automatically while the stage runs. Add observations at the review step, not by editing here directly.

## Interpretations
- 2026-09-04T00:00:00Z — 승인된 Q1~Q6 답변과 `Looks correct` 확인을 기준으로 정적 학습 가이드 요구사항을 FR/NFR 안정 ID로 정리했다.
<!-- example: 2026-05-29T10:14:32Z — chose REST over GraphQL; the consuming team only needs CRUD, revisit if subscriptions land -->
- 2026-09-04T15:07:06Z — 상위 승인 결정으로 시험 범위·대상·순서·산출물·실무 확장은 재질문하지 않고, 요구사항 생성에 필요한 운영 세부사항만 질문했다.

## Deviations
- 2026-09-04T00:00:00Z — 애플리케이션 요구사항 형식을 그대로 적용하지 않고, 정적 Markdown·CSV 자료에 해당하는 기능·품질·추적성 검증 기준으로 조정했다.
<!-- example: 2026-05-29T10:14:32Z — skipped the optional caching layer the stage prose suggested; the dataset is small enough that it adds risk -->
- 2026-09-04T15:07:06Z — 공식 AWS 사실을 새로 조사하거나 requirements.md를 생성하지 않고, 사용자가 지정한 질문 파일만 작성했다.

## Tradeoffs
- 2026-09-04T00:00:00Z — 시험 합격 핵심과 실무 확장을 함께 제공하되, 확인된 시험 핵심은 유지하고 확인되지 않은 AWS 서비스 세부사항에 의존하는 파생 자료는 보류하도록 분리했다.
<!-- example: 2026-05-29T10:14:32Z — picked TDD over BDD this run; the team is unit-first and the domain is well-understood -->
- 2026-09-04T15:07:06Z — Comprehensive 범위에서도 반복 질문을 줄이기 위해 6개 질문으로 제한하고, 이미 승인된 결정은 가정으로 기록했다.

## Open questions
- 2026-09-04T00:00:00Z — 제품 범위에 대한 추가 질문은 없으며, 공식 기준 목록 revision·도메인별 문항 배분·Anki 부가 필드·차단 출처 대체 경로는 후속 조사에서 확정한다.
<!-- example: 2026-05-29T10:14:32Z — confirm the retention window with compliance before the next stage hardens the schema -->
- 2026-09-04T15:07:06Z — 진도표 형식, 80% 목표의 측정 의미, Markdown 접근성 기준, 공식 기준 목록 확보 전 집필 조건, 최신성 보류 범위, 문항 검토 깊이가 남아 있다.
