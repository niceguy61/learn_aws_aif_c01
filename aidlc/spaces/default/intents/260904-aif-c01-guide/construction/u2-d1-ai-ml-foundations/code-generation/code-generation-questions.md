---
title: "U2 D1 Code Generation Plan Approval 질문"
unit: "u2-d1-ai-ml-foundations"
phase: "construction"
stage: "code-generation"
status: "draft"
conversation_language: "Korean"
---

# U2 D1 Code Generation Plan Approval 질문

## Plan Approval

이 질문은 다음 두 문서와 `code-generation-plan.md` 안의 최신 전체 `## Testing Contract` JSON 블록을 함께 승인할지 확인한다.

- 계획: `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u2-d1-ai-ml-foundations/code-generation/code-generation-plan.md`
- 테스트 지침: `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u2-d1-ai-ml-foundations/code-generation/unit-test-instructions.md`
- 대상 Unit: `u2-d1-ai-ml-foundations` (`LearningContent`, `packaging`)
- 실행 계층: 정적 Markdown/JSON 및 U2 범위에 실제 포함되는 CSV/TSV 구조 검사, unit·integration·정적 독자 여정 E2E 성격 테스트
- Testing Contract: `test-after` ordering, `comprehensive` strategy, 컴포넌트별 10~15개 이상 사례, unit/integration/E2E 의무
- 정확한 Unit 명령: `bun test tests/u2-d1-ai-ml-foundations/document-structure.test.ts`, `bun test tests/u2-d1-ai-ml-foundations/traceability.integration.test.ts`, `bun test tests/u2-d1-ai-ml-foundations/reader-journey.e2e.test.ts`
- 범위 제외: 실행 애플리케이션 코드, API, DB, AWS 계정 호출, 세션, 사용자 데이터 저장, 웹 UI, runtime 성능·보안 테스트
- 소유 경계: U1 source registry·canonical baseline과 U7 평가·Anki/CSV 산출물은 수정하지 않으며, 미확정 기준선·중앙 glossary 연결은 `Deferred`로 유지
- 추적성: 모든 계획 단계와 테스트 파일에 `US`/`FR`/`NFR`/`AC`/`BR8.1`~`BR8.12` 연결을 기록
- 승인 전 경계: 실제 `docs/`·`tests/` 파일, runner/configuration, `source-manifest.json`, `code-summary.md`, Code Generation `traceability.json`을 생성·수정하지 않음
- 승인 후 범위: 계획과 지침의 순서를 따라 U2 소유 문서·검사 설정·테스트를 구현하고, 실패 수정·재검사·추적성 증거를 기록함

**Approve this exact Code Generation plan?**

- Approve Plan
- Request Changes

[Approval Fingerprint]: sha256:95a3e67ec2f484e67d9c7e38f60cd53c6420bacb7d77e6d04d3b3498a0207bb3

[Answer]:
