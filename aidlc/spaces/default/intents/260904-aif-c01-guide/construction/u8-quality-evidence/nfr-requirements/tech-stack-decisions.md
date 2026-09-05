---
title: "U8 품질 증거 기술 스택 결정"
domain: "EXAM"
level: "beginner"
status: "review"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
source_checked: "2026-09-04"
---

# U8 품질 증거 기술 스택 결정

## 목적과 범위

U8은 실행형 애플리케이션이 아니라 버전 관리되는 정적 품질 증거 묶음이다. 기술 결정은 이미 승인된 Markdown·CSV·JSON 제약과 기존 저장소 검사 도구를 구체화하며, 새 dependency나 런타임 서비스를 도입하지 않는다.

## 결정된 기술 경계

| 영역 | 결정 | 선택하지 않는 것 | 근거 |
|---|---|---|---|
| 기록 형식 | UTF-8 Markdown과 UTF-8 JSON | DB, API, 별도 보고 서비스 | 정적 패키지와 추적성 요구 |
| 학습 자료 검사 | 기존 저장소의 Markdown·링크·구조 검사와 수동 초보자 검토 | 온라인 검사 플랫폼 | 비용·실행 범위 제한 |
| CSV 검사 | 표준 CSV 파서 호환성, `front,back` 보존 | Anki 서버·동기화 서비스 | 로컬 가져오기 계약 |
| 품질 레코드 | `QualityCheckRecord` 배열과 검사 시도별 immutable 기록 | 덮어쓰기형 상태 DB | 재검사·감사 추적성 |
| 상태 | `통과|실패|보류`와 문서·출처 상태를 별도 기록 | `verified`를 모든 품질 상태로 사용 | 출처 최신성과 문서 검토 수준의 분리 |
| 경로 | workspace-relative `target_path`와 stable `target_id` | 경로만을 ID로 사용 | 파일 이동·문서 개정에도 안정적인 연결 |
| 최신성 | `checked_at`, source revision, 접근 상태를 검사 증거에 기록 | 자동 정기 모니터링 | 승인된 정적 범위 |

## QualityCheckRecord 직렬화 결정

`traceability.json`은 다음 구조를 기본 계약으로 사용한다.

```json
{
  "target_type": "DomainReadme",
  "target_id": "D1-README",
  "target_path": "docs/01-ai-ml-foundations/README.md",
  "check_id": "beginner-perspective",
  "status": "보류",
  "evidence": {
    "tool": "manual-review",
    "scope": "target document and linked glossary",
    "observations": ["canonical baseline manifest is not available"],
    "findings": ["U1 source contract must be created before verified promotion"],
    "action": "U1 creates and validates sources/content-traceability.yaml",
    "owner": "u1-baseline-and-source-registry",
    "recheck_condition": "baseline manifest exists and stable IDs resolve"
  },
  "checked_at": "2026-09-04"
}
```

- JSON 배열의 각 원소는 한 대상·한 검사 시도의 증거다.
- 재검사는 새 원소로 추가하고 이전 원소를 삭제·수정하지 않는다.
- `evidence`는 실제 비밀·PII·토큰 값을 포함하지 않으며 발견 시 패턴·영향·조치만 기록한다.
- `target_type`과 `target_id`는 `unit-of-work.md`의 허용 집합을 따르고, `target_path`는 workspace-relative 경로로 유지한다.

## 검사 ID와 판정 매핑

| 검사 ID | 대상 | 통과 조건 | 실패·보류 조건 |
|---|---|---|---|
| `source-metadata` | `SourceRecord` | registry의 URL·제목·상태·확인일·연결 문서가 일치 | 누락·불일치·중복 또는 차단 |
| `baseline-manifest` | `SourceRecord`·`BaselineItem` | canonical manifest가 존재하고 ID·revision·파생 매핑이 유효 | manifest 부재·미확인 행·고아 |
| `traceability` | 모든 대상 | 양쪽 stable ID와 실제 path·anchor가 도달 | 누락·단방향·고아 |
| `beginner-perspective` | `DomainReadme`·`LearningDocument` | 필수 초보자 학습 흐름이 모두 존재 | 선수 지식·예시·판단 단서·질문·다음 링크 누락 |
| `concept-unit` | `LearningDocument` | 하나의 핵심 개념 또는 밀접한 작은 묶음 | 관련 없는 개념 혼합 |
| `internal-links` | 문서·복습 대상 | 상대 링크와 anchor가 실제로 도달 | 끊긴 링크·없는 anchor |
| `markdown-structure` | Markdown | UTF-8·제목 계층·필수 섹션이 유효 | 파싱·제목·필수 섹션 실패 |
| `encoding-and-format` | Markdown·CSV·JSON | UTF-8과 일반 파서 호환 | 인코딩·헤더·quoting·JSON 오류 |
| `scope-classification` | 모든 콘텐츠 대상 | 시험 범위·실무 확장·가이드 도표 표지가 명확 | 범위 혼합·공식 범위 오인 |
| `accessibility` | Markdown·이미지·Mermaid | 텍스트 링크·alt·fallback으로 핵심 이해 | 렌더러·색상·이미지만 의존 |
| `sensitive-data` | 변경 파일·로그·metadata | 민감정보 패턴 없음 | 제거·치환·보류 후 recheck 필요 |
| `static-boundary` | U1~U8 산출물 | 실행·수집·배포 경계 없음 | API·DB·계정·학습자 데이터·새 dependency 발견 |

## 상태와 승격 규칙

- `통과`: 현재 bytes와 path·source 상태에 대해 evidence가 재현 가능하다.
- `실패`: 기준 위반이 확인되었고 수정 action이 필요하다.
- `보류`: 출처 차단, canonical manifest 부재, 대상 미생성 또는 검증 불가로 판정을 미룬다.
- 품질 기록의 `통과`는 콘텐츠 문서의 `verified`를 자동으로 의미하지 않는다.
- 하나라도 미해결 `실패|보류` 또는 `blocked|확인 필요` 출처가 있으면 통합 보고서는 `review` 또는 보류 상태다.

## 정적 검증 실행 계약

1. 파일 존재·경로·stable ID를 먼저 확인한다.
2. Markdown·JSON·CSV 파싱, 제목·링크·front matter·인코딩을 검사한다.
3. `source-registry.yaml`과 canonical baseline manifest를 대조한다.
4. 초보자 관점·개념 단위·접근성·범위 표지·민감정보 검사를 각각 독립적인 record로 남긴다.
5. 실패·보류에는 owner와 recheck condition을 기록하고 새 검사 시도에서만 통과로 바꾼다.

## 해당 없음으로 기록하는 기술

| 기술·기능 | 판정 | 이유 |
|---|---|---|
| Web UI·API·DB | 해당 없음 | 결과는 정적 파일이며 온라인 상호작용이 없다. |
| AWS runtime·IAM·KMS·Secrets Manager | 해당 없음 | 실제 AWS 리소스와 비밀을 사용하지 않는다. |
| 자동 점수·학습자 계정·동기화 | 해당 없음 | 로컬 수기 학습과 품질 증거만 지원한다. |
| 새 npm·Python·검사 dependency | 해당 없음 | 기존 저장소 도구와 표준 파서 계약을 재사용한다. |
| Mermaid 전용 렌더러 | 해당 없음 | 텍스트 fallback을 필수로 하며 외부 렌더러를 요구하지 않는다. |

## 내부 연결과 다음 문서

- 기능 명세: [`functional-spec.md`](../functional-design/functional-spec.md)
- 업무 규칙: [`rules.md`](../functional-design/rules.md)
- 입력 요구사항: [`requirements.md`](../../../inception/requirements-analysis/requirements.md)
- U8 대상 계약: [`unit-of-work.md`](../../../inception/units-generation/unit-of-work.md)
- 품질 증거 JSON: `traceability.json` (이 디렉터리)

## 핵심 정리

U8의 기술 스택은 정적 UTF-8 문서와 JSON 기록, 기존 검사 도구뿐이다. 모든 검사는 stable ID·실제 경로·재현 가능한 evidence를 남기고, 확인할 수 없는 대상은 보류하여 품질 상태를 과장하지 않는다.

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 범위, 확인일: 2026-09-04, 상태: `downloaded`
- [`requirements.md`](../../../inception/requirements-analysis/requirements.md) — 승인된 정적·품질 제약, 확인일: 2026-09-04
- [`functional-spec.md`](../functional-design/functional-spec.md) — U8 검사 workflow, 확인일: 2026-09-04
- [`rules.md`](../functional-design/rules.md) — BR8.1~BR8.12, 확인일: 2026-09-04

## Assumptions & Open Questions

- canonical baseline manifest의 실제 행 수와 stable ID는 U1 생성 후 계산한다.
- 현재 확인되지 않은 대상은 `보류`로 기록하며, U8이 콘텐츠 본문을 대신 생성하지 않는다.
- 최종 품질 보고서 파일의 도메인별 분할 위치는 NFR Design에서 확정한다.
- 이 결정은 보안 인증, 정식 WCAG 적합성, AWS 보증 또는 법률 자문을 의미하지 않는다.

<!-- U8 summary confirmation recorded; no scope or contract change. -->