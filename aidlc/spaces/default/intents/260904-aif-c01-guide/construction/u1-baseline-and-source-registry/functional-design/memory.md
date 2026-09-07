<!-- INVARIANT: examples are single-line HTML comments so a fresh template parses to total=0 (MEMORY_EMPTY). Do NOT un-comment or split across lines. t100 guards this. -->
> This file is kept up to date automatically while the stage runs. Add observations at the review step, not by editing here directly.

## Interpretations
<!-- example: 2026-05-29T10:14:32Z — chose REST over GraphQL; the consuming team only needs CRUD, revisit if subscriptions land -->

## Deviations
<!-- example: 2026-05-29T10:14:32Z — skipped the optional caching layer the stage prose suggested; the dataset is small enough that it adds risk -->

## Tradeoffs
<!-- example: 2026-05-29T10:14:32Z — picked TDD over BDD this run; the team is unit-first and the domain is well-understood -->

## Open questions
<!-- example: 2026-05-29T10:14:32Z — confirm the retention window with compliance before the next stage hardens the schema -->
## Interpretations
- 2026-09-04 — U1은 실행형 서비스가 아니라 `sources/`의 정적 기준선·출처·추적 계약을 소유하며, 파생 자료 본문은 다른 Unit이 소유한다.
- 2026-09-04 — `checked_date`와 Unit 계약의 `source_checked`를 둘 다 필수로 유지하고 동일성을 검증해 upstream 명칭 차이를 명시적으로 해소했다.

## Deviations
- 2026-09-04 — 확인되지 않은 공식 URL·revision·작업·기술 행을 설계 문서에 발명하지 않았다. 실제 값은 공식 조사 산출물에서만 채운다.

## Tradeoffs
- 2026-09-04 — `확인 필요`를 machine status enum에 추가하지 않고 `notes`의 `확인 필요:` 보류 표기로 분리했다. 허용 상태 집합을 보존하면서 미확인 사실을 명시할 수 있다.

## Open questions
- 2026-09-04 — 공식 AIF-C01 시험 안내서의 실제 URL, revision, 제목, 작업·기술 행, 확인일은 공식 자료 조사 단계에서 확정해야 한다. 현재 Functional Design은 해당 사실을 추측하지 않는다.
