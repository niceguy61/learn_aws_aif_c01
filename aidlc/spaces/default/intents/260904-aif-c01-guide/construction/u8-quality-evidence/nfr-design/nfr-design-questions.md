---
title: "U8 품질 증거 NFR Design Summary Confirmation"
domain: "EXAM"
level: "beginner"
status: "draft"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
source_checked: "2026-09-04"
---

# U8 품질 증거 NFR Design Summary Confirmation

## 확인 대상

다음 NFR Design 요약이 입력 계약과 일치하는지 확인한다.

- U8은 실행형 검사 코드가 아니라 버전 관리되는 정적 `QualityCheckRecord` 증거 설계만 소유한다.
- 각 기록은 허용된 `target_type`, 안정적인 `target_id`, 실제로 확인 가능한 workspace-relative `target_path`, 검사 종류, evidence, `checked_at`, owner, `recheck_condition`, verdict를 보존한다.
- 현재 U1의 `sources/content-traceability.yaml`은 `status: draft`이고 `baseline_items: []`이며, U2~U7의 실제 대상 파일·안정 ID·평가 자료가 확인되지 않았으므로 상세 NFR 11개는 모두 `Deferred`로 남긴다.
- `blocked` 또는 `확인 필요` 출처, 빈 기준선 manifest, 대상 부재, stable ID 미해석 상태에서는 `verified` 승격이나 근거 없는 `통과`를 허용하지 않는다.
- 민감정보·학습자 답안·진도·계정·PII를 evidence에 기록하거나 수집하지 않으며, 실패·보류는 수정 소유자와 재검사 조건을 가진 새 immutable 시도로 남긴다.

## Consolidated Summary Confirmation

위 요약은 현재 U8 NFR Design의 범위·보류 경계·정적 보안 설계를 정확히 반영합니까?

- `Looks correct`
- `Needs changes` — 변경 요청을 다음에 자유롭게 작성한다.

[Answer]: Looks correct
