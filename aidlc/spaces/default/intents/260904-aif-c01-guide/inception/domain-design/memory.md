<!-- INVARIANT: examples are single-line HTML comments so a fresh template parses to total=0 (MEMORY_EMPTY). Do NOT un-comment or split across lines. t100 guards this. -->
> This file is kept up to date automatically while the stage runs. Add observations at the review step, not by editing here directly.

## Interpretations
2026-09-04 — 정적 학습 가이드의 변경·검토·추적 책임을 ReferenceCatalog, LearningContent, AssessmentContent, QualityEvidence 네 컴포넌트로 나누고, 이는 배포 단위가 아닌 논리적 책임 단위로 해석했다.
<!-- example: 2026-05-29T10:14:32Z — chose REST over GraphQL; the consuming team only needs CRUD, revisit if subscriptions land -->

## Deviations
2026-09-04 — 사용자의 초기 Q1/Q3/Q7/Q8 선택이 서로 충돌하여 후속 결정으로 보정했다. 중앙 추적표만이 아니라 상대 Markdown 링크를 함께 사용하고, AWS 서비스와 시각 자료를 별도 컴포넌트로 만들지 않았다.
<!-- example: 2026-05-29T10:14:32Z — skipped the optional caching layer the stage prose suggested; the dataset is small enough that it adds risk -->

## Tradeoffs
2026-09-04 — AssessmentContent에 문제은행·점수 워크시트·카드·용어 퀴즈·Anki를 함께 두어 추적 규칙을 재사용하는 대신, 형식별 검증 규칙은 QualityEvidence에서 별도로 판정한다. 상대 링크와 중앙 추적표를 병행해 학습자 가독성과 기계적 완전성을 함께 확보한다.
<!-- example: 2026-05-29T10:14:32Z — picked TDD over BDD this run; the team is unit-first and the domain is well-understood -->

## Open questions
2026-09-04 — 공식 AIF-C01 시험 안내서의 실제 revision·작업·기술 행과 사이드바 URL을 기준선 등록 단계에서 확정해야 한다. 그 전까지 기준선과 변동 가능한 AWS 세부사항은 확인 필요 또는 blocked 상태를 유지한다.
<!-- example: 2026-05-29T10:14:32Z — confirm the retention window with compliance before the next stage hardens the schema -->
