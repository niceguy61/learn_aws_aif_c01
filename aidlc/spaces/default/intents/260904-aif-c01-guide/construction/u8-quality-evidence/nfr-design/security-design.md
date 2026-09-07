---
title: "U8 품질 증거 보안 설계"
domain: "EXAM"
level: "beginner"
status: "draft"
source_urls:
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html"
  - "https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html"
source_checked: "2026-09-04"
---

# U8 품질 증거 보안 설계

## 목적과 범위

U8 `QualityEvidence`는 U1~U7의 정적 산출물을 읽고, 품질 판정과 재검사 이력을 재현할 수 있는 `QualityCheckRecord`를 버전 관리형 문서로 남긴다. 이 설계는 실제 검사 실행 코드, API, DB, AWS 계정·리소스, 배포·호스팅, 자동 최신성 모니터링, 새 dependency를 만들지 않는다.

U8은 다른 Unit의 콘텐츠 본문을 수정하지 않는다. `LearningContent`, `AssessmentContent`, `ReferenceCatalog`가 소유한 파일은 검사 대상이며, U8이 소유하는 것은 검사 결과·근거·조치·재검사 연결이다.

현재 기준선 상태는 확인된 범위의 경계로 기록한다. [`sources/content-traceability.yaml`](../../../../../../../../sources/content-traceability.yaml)은 `status: draft`이고 `baseline_items: []`이다. 따라서 현재 문서에서 실제 콘텐츠 품질의 `통과`를 주장하지 않으며, 생성되지 않은 대상은 `Deferred` 또는 `보류`로 남긴다.

## 단계 upstream 적용성

`nfr-design` stage contract의 required upstream은 모두 소비하되, U8의 정적 quality-evidence 범위에 직접 적용되지 않는 실행형 NFR은 다음처럼 명시적으로 `해당 없음`으로 판정한다.

| Required upstream | U8 적용성 | 근거 |
|---|---|---|
| `performance-requirements` | 해당 없음 | U8은 실행·서빙·런타임 지연시간을 갖지 않는 정적 Markdown/JSON/CSV 증거 묶음이다. |
| `security-requirements` | 적용됨 | QualityCheckRecord, 민감정보 비수집, 승격 차단, 상태 분리 계약을 소비한다. |
| `scalability-requirements` | 해당 없음 | U8은 API·DB·서비스 인스턴스·동시 사용자 상태를 만들지 않는다. |
| `reliability-requirements` | 해당 없음 | U8은 상태ful 실행 경로나 가용성 SLO가 없으며, 실패·보류는 정적 evidence와 새 재검사 시도로 처리한다. |
| `observability-requirements` | 해당 없음 | U8은 telemetry·알림·분산 추적을 실행하지 않고 정적 검사 evidence만 기록한다. |
| `tech-stack-decisions` | 적용됨 | UTF-8 정적 형식, 표준 parser, stable ID와 workspace-relative path 계약을 소비한다. |
| `functional-spec` | 적용됨 | 대상 해석, 검사 workflow, 상태 전이, handoff를 소비한다. |
| `contract-summary` | 선택 입력·미존재 | 현재 파일이 없어 내용을 추측하지 않고 `Deferred`로 기록한다. |

## 설계 결정

### 결정 1: 정적 immutable evidence를 단일 판정 기록으로 사용

검사 시도마다 하나의 `QualityCheckRecord`를 추가한다. 이후 재검사는 기존 행을 수정하거나 삭제하지 않고 반드시 새 시도로 추가하며, 새 record는 이전 시도의 `check_id`를 `recheck_of`로 가리킨다. 통합 보고서는 이 기록의 파생 뷰일 뿐 원본 판정을 대체하지 않는다.

### 결정 2: 경로보다 stable ID를 우선하는 대상 식별

`target_id`가 허용 대상 타입에 실제로 존재하고 `target_path`가 workspace root 기준 파일 또는 anchor에 도달할 때만 대상 식별을 유효하게 한다. 경로만 존재하거나 `Q-<n>`, `SCORE-<slug>`처럼 미해결 placeholder만 있는 경우에는 통과시키지 않는다.

### 결정 3: 출처·문서·검사 상태를 분리

출처 상태(`discovered|downloaded|summarized|reviewed|verified|blocked|확인 필요`), 문서 상태(`draft|review|verified`), 품질 verdict(`통과|실패|보류`)는 별도 필드로 기록한다. 하나의 상태를 다른 상태의 대체값으로 사용하지 않는다.

### 결정 4: 확인 전 승격 금지

U1 manifest가 비어 있거나 출처가 `blocked`·`확인 필요`이면 기준선·파생 문서·문항·복습 자료를 `verified`로 승격하지 않는다. 대상이 생성되지 않았거나 stable ID와 출처 연결을 해석할 수 없으면 판정은 `Deferred`/`보류`다.

### 결정 5: evidence에 민감정보를 복사하지 않음

민감정보 검사는 패턴 발견 여부·영향 경로·제거 또는 치환 조치만 남긴다. 토큰, 자격 증명, 실제 AWS 계정 식별자, PII, 서명된 URL, 학습자 답안·진도는 evidence·로그·예시에 넣지 않는다.

## NFR별 설계

| NFR ID | 보안·품질 설계 | 현재 판정 | 후속 조건 |
|---|---|---|---|
| `NFR1.1` | 모든 설명·finding·action을 한국어로 작성하고 AWS 고유명사·ID·경로·명령은 원문으로 보존한다. `beginner-perspective` 기록에는 대상과 검토 범위를 명시한다. | `Deferred` | 실제 U2~U7 대상과 stable ID가 생긴 뒤 언어·초보자 검토 재실행 |
| `NFR1.2` | `beginner-perspective` 검사는 선수 지식, 학습 목표, 쉬운 설명·예시, 서비스 선택 단서, 오해, 확인 질문, 다음 문서 링크를 확인한다. | `Deferred` | 실제 U2~U7 문서와 링크 대상이 생긴 뒤 초보자 관점 검사 재실행 |
| `NFR2.1` | `markdown-structure`와 `accessibility`를 독립 기록으로 남긴다. 제목 계층·링크·alt text·텍스트 fallback을 확인하며 렌더러나 색상만으로 통과시키지 않는다. | `Deferred` | 실제 Markdown·Mermaid·이미지 대상과 anchor가 생성된 뒤 검사 |
| `NFR3.1` | `target_id`, `target_path`, `baseline_ids`, `source_ids`를 함께 보존하고, 기준선→파생 자료와 파생 자료→기준선 양방향 연결을 확인한다. | `Deferred` | U1 manifest에 실제 `AIF-C01-D<n>-T<n>` 행과 역방향 ID가 등록된 뒤 검사 |
| `NFR4.1` | `source-metadata`가 URL·공식 제목·출처 유형·상위 주제·도메인·확인일·접근 상태·revision을 registry와 대조한다. | `Deferred` | 실제 대상이 등록된 출처를 참조하고 revision이 해석된 뒤 검사 |
| `NFR4.2` | `blocked`·`확인 필요` 출처를 참조하는 대상은 `verified` 승격을 차단하고, 영향·owner·recheck condition을 evidence에 남긴다. | `Deferred` | U1의 출처 상태와 영향받는 대상 목록이 확정된 뒤 승격 게이트 실행 |
| `NFR5.1` | `internal-links`와 `glossary-links`가 상대 경로·anchor의 실제 도달성과 되돌아오는 stable ID 연결을 각각 검사한다. | `Deferred` | U2~U7의 실제 문서·용어·복습 링크가 생성된 뒤 검사 |
| `NFR6.1` | Markdown/YAML/JSON은 UTF-8과 구조를, Anki는 `front,back` 헤더·quoting·필드 보존을 표준 파서 기준으로 기록한다. | `Deferred` | U7의 실제 `assessment/anki.csv`와 JSON/Markdown 대상이 생성된 뒤 검사 |
| `NFR7.1` | `sensitive-data`는 변경 파일·예시·로그·출처 metadata·CSV에서 비밀·토큰·PII·계정 식별자 패턴을 찾고 값은 기록하지 않는다. | `Deferred` | 실제 변경 집합이 존재할 때 패턴 검사와 제거·치환 재검사 수행 |
| `NFR8.1` | `scope-classification`이 `시험 범위`, 기준선 ID를 앞세운 `실무 확장`, `학습자용 해설`, `가이드 작성 도표`, `AWS 공식 이미지`를 항목 수준에서 구분한다. | `Deferred` | 기준선 행과 파생 항목이 생성되어 scope 표지를 양방향 대조할 때 검사 |
| `NFR9.1` | `static-learning-flow`가 4주 상대 일정·정적 워크시트·비수집 경계를 대상과 연결한다. 학습자 점수 자체는 기록하지 않는다. | `Deferred` | U7의 실제 4주 자료·ScoreSheet 계약과 경로가 생성된 뒤 검사 |

`Deferred`는 설계를 하지 않았다는 뜻이 아니다. 설계와 검사 절차는 확정했지만, 현재 필요한 대상·manifest·stable ID가 없어 실제 대상에 대한 최종 판정을 보류한다는 뜻이다.

`content-quality`는 별도 실행형 기능이나 새 저장 엔터티가 아니다. U8의 정적 통합 품질 뷰에서 `beginner-perspective`, `concept-unit`, `question-quality`, `scope-classification`, `source-metadata` 등의 독립 기록을 대상별로 집계한다. 각 원본 기록은 immutable하게 보존하고, 하나의 요약 상태가 개별 evidence를 덮어쓰지 않는다.

## QualityCheckRecord 스키마

`QualityCheckRecord`는 한 대상·한 검사 시도의 immutable 정적 레코드다. 저장 시 최소 필드와 보안 제약은 다음과 같다.

| 필드 | 형식·허용 값 | 설계 규칙 |
|---|---|---|
| `check_id` | `QC-<target-type>-<target-id>-<check-type>` | 시도마다 고유하다. 재검사는 새 ID를 사용한다. |
| `check_type` | `source-metadata`, `baseline-manifest`, `target-existence`, `traceability`, `baseline-traceability`, `scope-classification`, `internal-links`, `glossary-links`, `beginner-perspective`, `concept-unit`, `markdown-structure`, `encoding-and-format`, `utf8-csv`, `mermaid-fallback`, `accessibility`, `sensitive-data`, `question-bank-contract`, `question-quality`, `static-boundary` | 한 기록은 한 검사 종류만 나타낸다. |
| `target_type` | `DomainReadme`, `LearningDocument`, `GlossaryTerm`, `QuestionBankItem`, `ScoreSheet`, `Card`, `TermQuizItem`, `AnkiNote`, `SourceRecord`, `BaselineItem` | 허용 집합 밖이면 거부한다. |
| `target_id` | 대상 타입의 stable ID | 실제 ID가 없으면 경로만으로 통과하지 않는다. |
| `target_path` | workspace-relative 파일 또는 anchor | 절대 경로·사용자명·계정별 경로를 저장하지 않는다. |
| `baseline_ids` | `AIF-C01-D<n>-T<n>` 배열 또는 `[]` | 공식 기준선과 연결될 때만 기록한다. 빈 manifest를 추측해 채우지 않는다. |
| `source_ids` | `SRC-<slug>` 배열 또는 `[]` | URL만으로 source ID를 대신하지 않는다. |
| `checked_at` | `YYYY-MM-DD` 또는 ISO 8601 | 실제 검사 시각을 기록한다. 현재 설계 기준일은 `2026-09-04`다. |
| `checker` | 도구명 또는 역할명 | 실제 계정 식별자를 포함하지 않는다. |
| `status` | `통과`, `실패`, `보류` | 현재 대상 부재·manifest 미확정은 `보류`다. |
| `evidence` | 구조화된 객체 | 도구, 범위, 관찰, 확인 필드·링크·행·섹션, findings, action, owner, recheck condition을 포함한다. |
| `findings` | 문자열 배열 | 실패·보류일 때 빈 배열이 아니어야 하며 민감정보 값은 쓰지 않는다. |
| `action` | 문자열 | 실패·보류일 때 수정·제거·치환·출처 재확인 또는 대상 생성 후 재검사를 지정한다. |
| `recheck_of` | 이전 `check_id` 또는 `null` | 최초 시도는 `null`, 재검사는 이전 record의 `check_id`를 가리킨다. 이전 record는 수정·삭제하지 않는다. |
| `source_status_at_check` | 출처 상태 또는 `null` | 문서 상태와 혼동하지 않는다. |
| `document_status_at_check` | `draft`, `review`, `verified`, `null` | 출처 상태와 독립적으로 기록한다. |

현재 U8에서는 실제 `QualityCheckRecord` 행을 생성하지 않는다. 이 단계의 `traceability.json`은 상세 NFR이 어떤 설계로 커버되고 왜 `Deferred`인지 기록하며, 실제 대상별 immutable quality record는 대상 생성 이후 별도 검사 시도에서 추가한다.

## Evidence 저장 구조와 경로

U8 품질 증거는 현재 Unit record 아래의 다음 정적 파일에 저장한다.

| 산출물 | 소유·역할 | 현재 상태 |
|---|---|---|
| `nfr-design/security-design.md` | U8 보안·품질 설계와 판정 게이트 | `draft` |
| `nfr-design/traceability.json` | 상세 NFR→설계 해법 연결 | `draft` |
| `sources/content-traceability.yaml` | U1 canonical baseline manifest | `draft`, U1 소유 |
| `sources/source-registry.yaml` | U1 출처 등록부 | 존재, U1 소유 |
| `construction/u8-quality-evidence/functional-design/functional-spec.md` | U8 검사 workflow source of truth | 존재 |
| `construction/u8-quality-evidence/functional-design/rules.md` | U8 판정 규칙 `BR8.1`~`BR8.12` | 존재 |
| `construction/u8-quality-evidence/functional-design/entities.md` | `QualityCheckRecord` 논리 모델 | 존재 |
| `construction/u8-quality-evidence/functional-design/contract-summary.md` | U8 계약 요약 | `Deferred`: 현재 파일 미존재 |

실제 대상 경로는 대상 파일이 존재하고 stable ID가 선언된 뒤에만 record에 넣는다. 존재하지 않는 경로는 설계 설명에만 언급하고 통과 evidence의 링크로 사용하지 않는다.

## Immutable 기록과 재검사 모델

검사 시도는 다음 논리 상태를 따른다.

```text
planned → running → 통과
                    ↘ 실패 → 수정/조치 → 새 recheck 시도
                    ↘ 보류 → 출처 확인·대상 생성·범위 결정 → 새 recheck 시도
```

- `planned`와 `running`은 실행 workflow의 내부 상태로 취급할 수 있지만, U8 산출물의 최종 verdict는 `통과|실패|보류`만 사용한다.
- `통과`는 evidence가 비어 있지 않고, checked_at 시점의 실제 bytes·path·source 상태와 일치해야 한다.
- `실패`와 `보류`는 findings, action, owner, recheck condition을 모두 가진다.
- 수정 후에는 이전 record를 삭제·수정하지 않고 새 `check_id`와 새 `checked_at`을 추가한다.
- 기존 record가 `보류`였다는 사실은 후속 `통과` 시도와 함께 보존한다. 통합 상태는 미해결 보류가 남아 있으면 `review`다.

## Quality Gates와 승격 규칙

### Gate 1: 대상 존재·ID 해석

`target_type`이 허용 집합에 속하고 `target_id`가 실제 선언과 일치하며 `target_path`가 파일 또는 anchor에 도달해야 한다. U1 manifest가 비어 있거나 U2~U7 대상 파일이 없으면 `Deferred`/`보류`다.

### Gate 2: 출처·기준선 추적

URL은 `source-registry.yaml`의 `source_id`로 되돌아가야 한다. 기준선은 `AIF-C01-D<n>-T<n>` stable ID와 source revision을 가져야 하며, 파생 자료의 ID가 기준선의 역방향 배열에도 존재해야 한다. 불일치·중복·고아·단방향 연결은 `실패` 또는 확인 불가 시 `보류`다.

### Gate 3: 범위·문서 품질

`beginner-perspective`, `concept-unit`, `internal-links`, `glossary-links`, `markdown-structure`, `scope-classification`, `mermaid-fallback`을 독립 검사한다. `시험 범위`와 `실무 확장`을 섞어 공식 출제 범위처럼 표현하지 않는다.

### Gate 4: 형식·민감정보

UTF-8·Markdown·YAML·JSON·CSV 구조를 확인하고, 민감정보 패턴 발견 시 실제 값을 evidence에 복사하지 않고 제거·치환 후 재검사를 요구한다.

### Gate 5: 통합 승격

모든 필수 검사와 재검사가 통과하고, 연결된 출처·기준선이 `blocked` 또는 `확인 필요`가 아니며, unresolved `실패|보류`가 없을 때만 통합 보고서가 `verified` 승격 가능 상태가 된다. 품질 record의 `통과`는 문서 `verified`와 동일한 의미가 아니다.

## 보안 경계와 위협 대응

| 위험 | 예방 설계 | 판정·대응 |
|---|---|---|
| 실제 파일이 없는 경로를 근거로 통과 주장 | stable ID와 파일·anchor 존재를 함께 확인 | 대상 부재는 `Deferred`/`보류`, owner와 재검사 조건 기록 |
| 빈 manifest를 공식 기준선으로 오인 | U1 manifest의 `status`와 `baseline_items`를 직접 확인 | `baseline-traceability`를 보류하고 U1 생성 후 재검사 |
| 출처 상태와 문서 상태 혼동 | 세 상태 체계를 별도 필드로 직렬화 | 잘못된 상태 매핑은 실패, 승격 차단 |
| URL만으로 추적성 확보 | `source_id`, `baseline_id`, 파생 stable ID의 양방향 연결 요구 | URL-only는 보류 또는 실패 |
| evidence로 비밀 재노출 | 패턴·영향·조치만 기록하고 실제 값은 삭제 | `sensitive-data` 실패 후 제거·치환·재검사 |
| 학습자 데이터 수집으로 범위 확대 | 정적 Markdown·CSV와 품질 증거만 허용 | API·DB·계정·답안·진도 기능은 범위 밖으로 거부 |
| 공식 시험 범위와 실무 확장 혼합 | 항목·섹션 수준 scope 표지와 기준선 선행 표기 | `scope-classification` 보류/실패, verified 승격 차단 |

## U8 이후 handoff

1. U1이 [`sources/content-traceability.yaml`](../../../../../../../../sources/content-traceability.yaml)에 공식 AIF-C01 기준선 행, revision, source ID, 파생 ID 배열을 등록한다.
2. U2~U6이 실제 Domain README·LearningDocument·GlossaryTerm과 stable ID·상대 링크를 생성한다.
3. U7이 실제 QuestionBankItem·ScoreSheet·Card·TermQuizItem·AnkiNote와 100문항 이상 평가 자료를 생성한다. U8은 이 단계에서 평가 자료를 생성하지 않는다.
4. U8은 대상 inventory를 다시 계산하고, 실제 존재하는 target만 대상으로 immutable `QualityCheckRecord` 검사 시도를 추가한다.
5. `source-metadata`, `baseline-traceability`, `scope-classification`, `beginner-perspective`, `concept-unit`, `internal-links`, `glossary-links`, `markdown-structure`, `utf8-csv`, `mermaid-fallback`, `sensitive-data`, `question-quality`를 대상 유형에 맞게 실행하고 `checked_at`·evidence·owner·recheck condition을 기록한다.
6. 모든 unresolved `실패|보류`와 blocked/확인 필요 출처가 해소된 뒤에만 통합 품질 보고서를 `review`에서 `verified` 가능 상태로 전환한다. 사용자 승인이나 stage 완료는 이 산출물에 의해 자동으로 실행되지 않는다.

## 해당 없음

다음은 U8의 정적 quality-evidence 설계에서 구현·검사 대상이 아니다.

| 항목 | 판정 | 근거 |
|---|---|---|
| 로그인·인증·인가 | 해당 없음 | U8은 사용자 계정이나 실행형 서비스가 없다. |
| API·DB·서버·네트워크 | 해당 없음 | 결과는 버전 관리형 Markdown·JSON·CSV 증거다. |
| AWS 계정·IAM·KMS·Secrets Manager | 해당 없음 | 실제 AWS 리소스를 생성·호출하지 않는다. |
| 배포·호스팅·운영 모니터링 | 해당 없음 | static package가 전달 경계이며 운영 시스템이 아니다. |
| 자동 최신성 모니터링 | 해당 없음 | 작성·검사 시점의 출처 상태만 정적으로 기록한다. |
| 학습자 답안·진도·계정·PII 저장 | 해당 없음 | 학습자 데이터 비수집 경계가 BR8.12와 NFR7.1에 고정되어 있다. |
| 100문항 문제은행 생성 | 해당 없음 | 문제은행은 U7 소유이며 U8은 생성 후 품질을 검사한다. |
| 새 npm·Python·검사 dependency | 해당 없음 | 기존 정적 검사와 표준 파서 계약만 사용한다. |
| `contract-summary.md` | `Deferred` | 입력으로 지정되었으나 현재 경로에 파일이 없어 링크·내용을 추측하지 않는다. |

## Sources

- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html) — 공식 시험 범위, 확인일: `2026-09-04`, registry 상태: `downloaded` (`aif-c01-main`)
- [AIF-C01 도메인 1](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html) — D1 기준, 확인일: `2026-09-04`, registry 상태: `downloaded`
- [AIF-C01 도메인 2](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html) — D2 기준, 확인일: `2026-09-04`, registry 상태: `downloaded`
- [AIF-C01 도메인 3](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html) — D3 기준, 확인일: `2026-09-04`, registry 상태: `downloaded`
- [AIF-C01 도메인 4](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html) — D4 기준, 확인일: `2026-09-04`, registry 상태: `downloaded`
- [AIF-C01 도메인 5](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html) — D5 기준, 확인일: `2026-09-04`, registry 상태: `downloaded`
- [`requirements.md`](../../../inception/requirements-analysis/requirements.md) — U8 상위 NFR 정의와 범위, 확인일: `2026-09-04`
- [`security-requirements.md`](../nfr-requirements/security-requirements.md) — U8 상세 보안·품질 NFR, 확인일: `2026-09-04`
- [`tech-stack-decisions.md`](../nfr-requirements/tech-stack-decisions.md) — 정적 UTF-8 Markdown/JSON/CSV 기술 경계, 확인일: `2026-09-04`
- [`functional-spec.md`](../functional-design/functional-spec.md) — 검사 workflow·상태 전이, 확인일: `2026-09-04`
- [`rules.md`](../functional-design/rules.md) — `BR8.1`~`BR8.12` 판정 규칙, 확인일: `2026-09-04`
- [`entities.md`](../functional-design/entities.md) — `QualityCheckRecord` 논리 모델, 확인일: `2026-09-04`
- [`unit-of-work.md`](../../../inception/units-generation/unit-of-work.md) — U8 target contract, 확인일: `2026-09-04`
- [`source-registry.yaml`](../../../../../../../../sources/source-registry.yaml) — URL·제목·출처 유형·도메인·확인일·상태 등록부, 확인일: `2026-09-04`

## Assumptions & Open Questions

- U1의 `sources/content-traceability.yaml`은 U1 소유이며 U8이 임의로 baseline 행이나 상태를 추가·수정하지 않는다.
- 현재 manifest의 `baseline_items: []`와 `status: draft`는 실제 공식 기준선 행이 등록되지 않았다는 뜻이므로, U8의 11개 상세 NFR은 실제 콘텐츠 검사 `통과`로 승격하지 않는다.
- U2~U7의 실제 파일과 stable ID는 이 산출물 작성 시점에 확인되지 않았으며, 실제 평가 자료·100문항은 U7 이후 생성되어야 한다.
- `contract-summary.md`는 입력 목록에 있었지만 현재 존재하지 않아 `Deferred`로 기록했다. 내용을 추측하거나 깨진 링크를 만들지 않는다.
- 공식 AIF-C01 URL은 registry에 `2026-09-04` 확인일과 `downloaded` 상태로 등록되어 있으나, 이 문서의 `draft` 상태는 U8 설계 승인 전 상태와 별개다.
- U8의 quality evidence `통과`는 문서 `verified`, 출처 `verified`, 또는 사용자 승인을 자동으로 의미하지 않는다.

<!-- U8 summary confirmation recorded; artifacts re-saved before reviewer iteration 2. -->


## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-07T03:34:11Z
**Iteration:** 1
**Request Challenge:** review:2d9943b008c5fc3d44b1c1f0989944c7

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|
| R-01 | Major | `security-design.md > QualityCheckRecord 스키마 > check_type` 및 `security-design.md > U8 이후 handoff > 5` | 검사 유형의 canonical registry가 upstream 계약과 일치하지 않는다. `security-requirements.md`의 NFR9.1은 `static-learning-flow` evidence를 요구하지만 현재 허용 `check_type` 집합에는 없고, NFR4.2의 검증 증거인 `source-status-gate`도 허용 집합과 handoff 목록에서 빠져 있다. 구현자는 NFR9.1·NFR4.2를 어떤 canonical 검사 유형으로 직렬화할지 추측해야 한다. | `security-design.md`, `security-requirements.md`, `tech-stack-decisions.md`, `functional-spec.md`의 검사 유형 registry를 하나로 맞춘다. `static-learning-flow`와 `source-status-gate`를 canonical 유형으로 추가하거나, upstream 요구사항을 기존 유형으로 명시적으로 매핑하고 NFR별 기록 생성 규칙·handoff 목록·허용 enum을 모두 갱신한다. | New |
| R-02 | Minor | `traceability.json > required_upstream_applicability > reason` | `NFR1.1`은 품질 보고서와 findings/action을 한국어로 요구하지만, 현재 `required_upstream_applicability`의 네 `reason` 값은 영어 자유 서술이다. 기계적 ID·enum과 달리 이 필드는 사람이 읽는 판정 근거이므로 언어 계약이 일관되지 않다. | 네 개 N/A 사유를 한국어로 번역하거나, 자유 서술형 evidence/reason의 언어 규칙과 기계적 필드 예외를 NFR1.1 설계에 명시한다. | New |

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-upstream-coverage.ts --stage nfr-design --output-path security-design.md --consumes <8 upstreams>` | **PASS** — `unreferenced=[]`, `findings_count=0` | stage contract의 8개 upstream 이름이 security-design에서 참조된다. |
| `aidlc-sensor-traceability.ts --stage nfr-design --output-path traceability.json` | **PASS** — `gaps=[]`, `orphans=[]`, `missing_from_table=[]`, `missing_from_upstream_ids=[]`, `invalid_entries=[]`, `invalid_targets=[]` | traceability JSON의 11개 상세 NFR coverage 구조와 target 매핑은 유효하다. |
| `linter` / `type-check` applicability | **N/A by inspection** — 검토 대상 산출물에 TypeScript/JavaScript 구현 snippet 없음 | stage 정의상 해당 센서는 matching TypeScript/JavaScript snippet만 검사하므로 이 pass에서 추가 코드 검증 대상은 없다. |

### Summary

정적 범위, `Deferred` 승격 경계, append-only 재검사 모델은 Q&A와 세 upstream 계약에 대체로 부합하고 두 선언된 센서도 통과했다. 다만 검사 유형 registry의 두 누락은 구현 단계에서 기록 형식 선택을 요구하므로 정렬이 필요하며, 그 외에는 자문 수준에서 진행 가능한 상태다.
