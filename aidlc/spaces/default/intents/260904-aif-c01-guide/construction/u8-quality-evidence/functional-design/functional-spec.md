# U8 품질 증거 기능 명세

## 목적과 경계

U8 `QualityEvidence`는 U1의 `BaselineItem`·`SourceRecord` 계약과 U2~U7의 정적 자료를 읽고, 품질 상태를 재현할 수 있는 `QualityCheckRecord`를 남긴다. 이 문서는 U8의 ordered workflow와 검사·재검사 상태 전이의 source of truth다.

U8은 콘텐츠 본문을 대신 수정하지 않는다. U8은 UI/API/DB/AWS 계정/학습자 데이터 저장/온라인 채점/자동 최신성 모니터링을 만들지 않으며, 정적 Markdown·CSV와 검사 증거만 다룬다.

## 입력과 출력

| 구분 | 경로 또는 계약 | 설명 |
|---|---|---|
| 입력 | `inception/requirements-analysis/requirements.md` | FR1~FR6, NFR1~NFR9와 검사 기준 |
| 입력 | `inception/user-stories/stories.md` | `US5.1`의 AC5.1.1~AC5.1.6 |
| 입력 | `inception/units-generation/unit-of-work.md` | U8 경계와 `QualityCheckRecord` 허용 대상 계약 |
| 입력 | `inception/units-generation/unit-of-work-story-map.md` | `US5.1`의 U8 주 소유 및 U1~U7 지원 관계 |
| 입력 | `inception/domain-design/components.md` | `QualityEvidence` 소유권과 U1·LearningContent·AssessmentContent 참조 |
| 입력 | U1 기준선·출처 계약 | `baseline_id`, `source_id`, revision, 상태, 양방향 연결 |
| 출력 | U8 품질 증거 기록 | 대상·검사 종류·판정·근거·조치·재검사 상태 |
| 출력 | 도메인·통합 품질 보고서 링크 계약 | 학습자가 README에서 검사 결과와 상태 의미를 확인할 수 있는 상대 링크 |

## Workflow 1: 검사 대상 목록과 ID 해석

1. U1의 `sources/content-traceability.yaml`에서 기준선·파생 ID와 상태를 읽는다.
2. U2~U7이 선언한 문서·용어·문항·복습 자료의 stable ID와 workspace-relative `target_path`를 수집한다.
3. `target_type`별 허용 ID 규칙과 실제 파일 또는 anchor의 존재를 대조한다.
4. 누락·중복·고아 대상이 있으면 `QualityCheckRecord`를 완료 통과로 만들지 않고 담당 Unit과 action을 식별한다.
5. 대상 목록은 보고서의 입력 스냅샷이며 U8이 다른 Unit의 콘텐츠 본문을 소유하도록 바꾸지 않는다.

## Workflow 2: 출처·기준선·범위 추적 검사

1. 각 외부 사실 사용 대상에서 URL·공식 제목·출처 유형·상위 주제·도메인·확인 날짜·접근 상태·revision을 읽는다.
2. URL이 `source-registry.yaml`의 `source_id`로 되돌아가고, 공식 시험 범위 자료가 `AIF-C01-D<n>-T<n>`로 되돌아가는지 확인한다.
3. 기준선의 `learning_document_ids`, `question_ids`, `card_ids`, `quiz_ids`, `anki_ids`와 파생 자료의 `baseline_ids`를 양쪽에서 비교한다.
4. 시험 범위와 `실무 확장`이 항목 수준에서 분리되고, 실무 확장에 관련 기준선 ID가 먼저 표시되는지 확인한다.
5. `blocked` 또는 `확인 필요` 출처가 발견되면 영향받는 자료의 `verified` 승격을 차단하고 차단 사유·영향·후속 확인 대상을 기록한다.
6. 결과를 `source-metadata`, `baseline-traceability`, `scope-classification` 검사 기록으로 남긴다.

## Workflow 3: 학습 문서·링크·초보자 관점 검사

1. DomainReadme와 LearningDocument의 목표, 선수 지식, 한 줄 요약, 쉬운 설명·예시를 확인한다.
2. 하나의 핵심 개념 또는 밀접한 작은 묶음만 다루는지 확인하고 관련 없는 개념 혼합을 실패로 판정한다.
3. AWS 관점·서비스 선택 단서·비교·시나리오·시험 판단 단서·오해·확인 질문·다음 문서 링크를 확인한다.
4. 현재·이전·다음 문서와 `glossary.md`, Card, TermQuizItem, AnkiNote 링크가 실제 target과 anchor에 도달하는지 확인한다.
5. 제목 계층, 링크 문구, 한국어 설명, 모바일에서 과도한 가로 표 의존 여부를 확인한다.
6. 누락이 있으면 `beginner-perspective`, `concept-unit`, `internal-links`, `glossary-links`, `markdown-structure` 기록에 findings와 수정 action을 남긴다.

## Workflow 4: Markdown·CSV·Mermaid·민감정보 검사

1. Markdown과 YAML front matter가 UTF-8로 읽히고 허용된 `status`, `source_urls`, `source_checked` 구조를 갖는지 확인한다.
2. Anki CSV가 UTF-8이고 `front,back` 헤더와 quoting·쉼표·줄바꿈을 일반 CSV 파서로 읽을 수 있는지 확인한다.
3. Mermaid를 사용하는 문서는 구문을 확인하고, 노드·순서·분기·결론을 설명하는 인접 텍스트 또는 Markdown 대체 설명을 확인한다.
4. 이미지가 있으면 의미 있는 한국어 alt text·캡션·텍스트 대체 경로와 출처 표지를 확인한다.
5. 학습 자료·예시·로그·출처 메타데이터·CSV·변경 파일에서 토큰·자격 증명·실제 계정 식별자·PII·서명된 URL 패턴을 검사한다.
6. 민감정보가 발견되면 값을 증거에 복사하지 않고 제거·치환·보류 action과 재검사 계획만 기록한다.

## Workflow 5: 판정·조치·재검사

1. 각 검사 결과를 `통과|실패|보류` 중 하나로 판정한다.
2. `통과`에는 검사 명령·확인한 필드·링크·행·섹션 등 재현 가능한 evidence를 기록한다.
3. `실패` 또는 `보류`에는 findings, 수정·제거·치환·출처 재확인 action, 책임 Unit, 후속 검사 조건을 기록한다.
4. 수정 Unit이 변경을 완료하면 U8은 이전 기록을 덮어쓰지 않고 새 검사 시도를 수행해 `recheck_result`를 기록한다.
5. 모든 확인된 대상이 필수 검사에서 통과하고 출처 승격 게이트를 통과할 때만 통합 보고서에서 `verified` 승격 가능 상태로 표시한다.
6. 미해결 실패·보류·blocked 출처가 하나라도 있으면 보고서의 상태는 `review` 또는 보류로 유지한다.

## Workflow 6: 통합 보고서와 학습자 연결

1. 대상별 `QualityCheckRecord`를 도메인별로 집계하되 원본 기록의 stable ID와 판정을 보존한다.
2. 도메인 README는 상대 Markdown 링크로 해당 품질 보고서 또는 검사 요약으로 연결된다.
3. 보고서에는 검사 대상 범위, 검사일, 검사자·도구, 판정, 근거, 발견 항목, 조치, 재검사 결과, 미해결 질문을 표시한다.
4. 상태 의미를 `draft|review|verified`와 출처의 `blocked|확인 필요`로 별도 설명한다.
5. 보고서는 학습자의 답안·계정·진도 데이터를 수집하지 않으며, 로컬 Markdown 열람만 제공한다.

## 상태 전이

### QualityCheckRecord 검사 상태

```text
planned → running → 통과
                    ↘ 실패 → 수정/조치 → recheck → 통과
                    ↘ 보류 → 출처 확인 또는 범위 결정 → recheck → 통과
```

- `planned`: 대상과 검사 종류가 목록화되었지만 실행되지 않았다.
- `running`: 한 번의 정적 검사 시도가 진행 중이다.
- `통과`: evidence가 있고 현재 대상 bytes·상태와 일치한다.
- `실패`: 기준을 위반했으며 findings와 action이 있다.
- `보류`: 출처 차단·동적 내용·확인 불가 또는 범위 결정 대기로 최종 판정을 미룬다.
- `recheck`: action 이후 새 검사 시도를 수행한다. 이전 기록은 감사·학습 증거로 보존한다.

### 학습 문서 확정 상태와 출처 상태

문서 상태 `draft → review → verified`는 콘텐츠 검토 수준이다. 출처 상태 `discovered → downloaded → summarized → reviewed → verified`는 U1이 관리하는 사실 확인 수준이다. 출처가 `blocked` 또는 `확인 필요`이면 문서가 다른 검사를 통과해도 `verified`로 전이할 수 없다. 두 상태 머신은 독립적으로 기록하지만 `BR8.3`의 승격 게이트에서 함께 판단한다.

## ER 관계와 도출 규칙

```mermaid
erDiagram
    QUALITY_CHECK_RECORD }o--|| TARGET_ARTIFACT : "target_type + target_id"
    QUALITY_CHECK_RECORD }o--o BASELINE_ITEM : "baseline_ids"
    QUALITY_CHECK_RECORD }o--o SOURCE_RECORD : "source_ids"
    BASELINE_ITEM }o--o TARGET_ARTIFACT : "bidirectional traceability"
```

텍스트로 말하면 `QualityCheckRecord`는 하나의 검사 대상 artifact를 가리키고, 필요하면 U1의 `BaselineItem`과 `SourceRecord`를 stable ID로 연결한다. `BaselineItem`과 실제 대상의 양방향 연결은 U1이 제공하며, U8은 그 연결이 끊겼는지 검사한다. 이 도식은 저장소나 데이터베이스 관계를 뜻하지 않는다.

## 규칙 도출 요약

| 규칙 묶음 | 적용 workflow | 의미 |
|---|---|---|
| `BR8.1`~`BR8.2` | 1, 2 | 대상 stable ID와 상태 체계를 정확히 해석 |
| `BR8.3`~`BR8.5` | 2, 5 | 출처·revision·기준선·verified 승격을 함께 판정 |
| `BR8.6`~`BR8.9` | 3, 4 | 링크·용어·초보자·형식·접근성 품질을 검사 |
| `BR8.10`~`BR8.12` | 4, 5, 6 | 민감정보·재검사·정적 비수집 경계를 보장 |

## 실패·경계 사례

- 대상 파일은 존재하지만 `target_id`가 없으면 경로만으로 통과시키지 않고 `BR8.1` 실패로 기록한다.
- URL은 열리지만 `source_id`가 없으면 URL-only 연결로 인정하지 않고 `BR8.5`와 `BR8.4`를 보류한다.
- 출처가 동적이거나 접근이 차단되면 사실을 추측하지 않고 `blocked` 또는 `확인 필요`와 후속 확인 대상을 기록한다.
- 문서가 필수 섹션을 모두 갖췄지만 관련 없는 주제를 섞으면 `concept-unit`를 실패로 판정하고 문서 분리 또는 링크 추가를 action으로 남긴다.
- Mermaid가 렌더링되더라도 인접 텍스트 fallback이 없으면 접근성 검사를 실패로 판정한다.
- CSV가 열리지만 쉼표·줄바꿈 quoting을 일반 parser가 보존하지 못하면 UTF-8/CSV 검사를 실패로 판정한다.
- 민감정보가 발견되면 값을 quality evidence에 재복사하지 않고 안전한 패턴 설명만 기록한다.
- 일부 검사는 통과했지만 blocked 출처 또는 미해결 보류가 있으면 통합 보고서는 `verified`로 승격되지 않는다.
- U8은 품질 보고서를 작성하지만 다른 Unit의 문서 본문을 대신 수정하거나 학습자의 점수·진도를 저장하지 않는다.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/user-stories/stories.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work-story-map.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/domain-design/components.md`
## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Iteration:** 1

U8의 경계는 `QualityEvidence`와 `QualityCheckRecord`로 제한되며, U1 기준선·출처 계약과 U2~U7 정적 자료를 참조한다. 출처 상태와 문서 상태를 분리하고, `blocked`·`확인 필요` 출처의 `verified` 승격을 차단한다. `BR8.1`~`BR8.12` 규칙은 대상 식별, 출처·기준선 추적, 초보자·링크·형식·민감정보 검사, 재검사와 정적 비수집 경계를 포괄한다. UI/API/DB와 학습자 데이터 저장을 포함하지 않으며, Mermaid 사용 시 텍스트 fallback을 요구한다.