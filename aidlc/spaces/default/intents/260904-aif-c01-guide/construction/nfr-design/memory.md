<!-- INVARIANT: examples are single-line HTML comments so a fresh template parses to total=0 (MEMORY_EMPTY). Do NOT un-comment or split across lines. t100 guards this. -->
> This file is kept up to date automatically while the stage runs. Add observations at the review step, not by editing here directly.

## Interpretations
- 2026-09-05 — U1의 NFR 설계는 실행 서비스가 아닌 정적 `ReferenceCatalog`와 로컬 읽기 전용 검사 경계로 한정했다. stable ID·provenance·양방향 추적성을 공통 설계 축으로 사용했다.
<!-- example: 2026-05-29T10:14:32Z — chose REST over GraphQL; the consuming team only needs CRUD, revisit if subscriptions land -->

## Deviations
- 2026-09-05 — 일반적인 캐시·재시도·자동 확장·운영 모니터링 패턴은 U1 경계와 충돌하므로 모두 해당 없음으로 기록하고, 실패 시 `blocked`·확인 필요·fail-closed 판정으로 대체했다.
<!-- example: 2026-05-29T10:14:32Z — skipped the optional caching layer the stage prose suggested; the dataset is small enough that it adds risk -->

## Tradeoffs
<!-- example: 2026-05-29T10:14:32Z — picked TDD over BDD this run; the team is unit-first and the domain is well-understood -->

## Open questions
- 2026-09-05 — 실제 공식 AIF-C01 revision·URL·작업·기술 행은 출처 조사 후 확정해야 하며, 그 전까지 관련 기준선과 파생 자료의 `verified` 승격을 보류한다.
<!-- example: 2026-05-29T10:14:32Z — confirm the retention window with compliance before the next stage hardens the schema -->
