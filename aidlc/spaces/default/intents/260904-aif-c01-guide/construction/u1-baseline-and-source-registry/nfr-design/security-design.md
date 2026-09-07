# U1 보안 설계

## 목적과 설계 경계

U1은 `ReferenceCatalog`의 정적 계약을 보호한다. 보호 대상은 `BaselineItem`, `SourceRecord`, `SidebarLink`의 ID·provenance·상태·양방향 연결과 이를 담는 UTF-8 Markdown·YAML·JSON·CSV 파일이다.

U1은 인증된 사용자용 서비스가 아니다. API, DB, AWS 계정, IAM·KMS·Secrets Manager, 네트워크 방화벽, TLS 운영, 사용자 인증·인가를 만들지 않는다. 저장소의 기존 코드 리뷰·승인·버전 관리 경계를 변경 통제로 사용한다.

## 보안 결정

### 무결성과 식별자

U1의 canonical stable-ID 계약은 다음과 같다.

| 엔터티·필드 | 자료형 | 필수 | Cardinality | 의미 |
|---|---|---:|---|---|
| `BaselineItem.baseline_id` | `string` | 예 | 1개, unique | `AIF-C01-D<n>-T<n>` |
| `SourceRecord.source_id` | `string` | 예 | 1개, unique | `SRC-<slug>` |
| `SidebarLink.link_id` | `string` | 예 | 1개, unique | `SIDE-<slug>` |
| `SidebarLink.linked_source_id` | `reference` | 예 | 정확히 1개, many-to-one | 연결 대상 `SourceRecord.source_id` |
| `SourceRecord.linked_sidebar_ids` | `list<string>` | 예 | 0개 이상, one-to-many reverse collection | 연결된 `SidebarLink.link_id` 집합; SourceRecord마다 빈 목록도 명시 |
| `SourceRecord.linked_baseline_ids` | `list<string>` | 예 | 0개 이상, one-to-many reverse collection | 연결된 `BaselineItem.baseline_id` 집합; SourceRecord마다 빈 목록도 명시 |

- `SidebarLink.linked_source_id`가 SidebarLink→SourceRecord 관계의 유일한 canonical 정방향 필드다. 기존 `SidebarLink.source_id`는 alias가 아니며, 입력·저장·검사에서 허용하지 않는다.
- `SourceRecord.linked_sidebar_ids`가 SourceRecord→SidebarLink 관계의 유일한 canonical 역방향 필드다. 누락하지 않고 빈 목록도 명시적으로 기록한다.
- `SourceRecord.linked_baseline_ids`가 SourceRecord→BaselineItem 관계의 유일한 canonical 역방향 필드다. 자료형은 `list<string>`, required, zero-or-more이며 원소는 `BaselineItem.baseline_id`다. 모든 SourceRecord에 빈 목록도 명시적으로 기록한다.
- 각 `SidebarLink`에 대해 `SidebarLink.linked_source_id == SourceRecord.source_id`이고 `SidebarLink.link_id ∈ SourceRecord.linked_sidebar_ids`여야 한다.
- 각 SourceRecord에 대해 사이드바 정방향 집합 `{link.link_id | link.linked_source_id == source_id}`와 역방향 집합 `set(linked_sidebar_ids)`가 정확히 동등해야 한다.
- 각 SourceRecord에 대해 기준선 정방향 집합 `{BaselineItem.baseline_id | BaselineItem.source_id == source_id}`와 reverse 집합 `set(SourceRecord.linked_baseline_ids)`가 정확히 동등해야 한다. URL-only 연결 또는 한쪽에만 있는 ID는 인정하지 않는다.
- 각 SourceRecord에 대해 정방향 집합과 reverse 집합의 존재하지 않는 ID·중복·누락·한쪽만 있는 ID, URL-only 연결은 모두 fail-closed 검사 실패이며 `verified` 승격을 보류한다. 이 규칙은 사이드바의 `linked_sidebar_ids`와 기준선의 `linked_baseline_ids`에 동일하게 적용한다.
- BaselineItem·파생 자료의 양방향 stable-ID 배열도 같은 집합 동등성·orphan·중복 규칙을 적용한다. 기존 stable ID를 재번호화하거나 의미를 재사용하지 않는다.

### provenance와 상태 보호

#### Canonical provenance 날짜 계약

- `BaselineItem.source_checked`가 기준선이 소유하는 유일한 canonical 확인일이다. 필수 자료형은 `string`이며 정확히 하나의 값만 가진다.
- `BaselineItem.checked_date`는 제거된 필드다. deprecated alias, fallback, 같은 의미의 임의 필드는 허용하지 않는다. 구현자는 두 필드 중 하나를 선택할 수 없다.
- `SourceRecord.checked_date`는 출처 레코드가 별도로 소유하는 필수 `string` 확인일이며, 연결된 모든 `BaselineItem.source_checked`와 문자 단위로 같아야 한다.
- 두 필드는 `YYYY-MM-DD` 형식의 UTC calendar date만 허용한다. timezone, 시간, offset, datetime, 다른 날짜 표기는 거부한다. 누락·형식 오류·불일치는 fail-closed로 처리하고 영향 항목을 `verified`로 승격하지 않는다.
- `BaselineItem.source_revision`과 `BaselineItem.revision_title`이 revision provenance의 source of truth다. `SourceRecord`는 revision 필드를 소유하지 않으며 URL·공식 제목·출처 유형·상위 주제·도메인 매핑·`checked_date`·접근 상태와 stable-ID 연결을 소유한다.

#### 상태와 승격 계약

출처·기준선 상태는 `discovered → downloaded → summarized → reviewed → verified` 순서로 전진한다. 어느 단계에서든 `blocked`로 전환할 수 있으며 `확인 필요`는 enum이 아닌 보류 라벨이다. 파생 문서 상태는 `draft | review | verified`와 보류 상태를 별도로 관리한다.

| 출처·기준선 상태 | 파생 문서 허용 상태 | `verified` 승격 | 필요한 증거·전이 |
|---|---|---|---|
| `discovered` | `draft`, `review`, 보류 | 금지 | URL·제목·stable ID 발견 증거만 있다. 접근·다운로드 증거가 있어야 `downloaded`로 전이한다. |
| `downloaded` | `draft`, `review`, 보류 | 금지 | 공식 자료 확보 증거가 있다. 요약·구조·provenance 검토 증거가 있어야 다음 단계로 전이한다. |
| `summarized` | `draft`, `review`, 보류 | 금지 | 요약 증거는 있으나 독립 내용·revision·canonical 날짜·양방향 링크 검토가 남아 있다. |
| `reviewed` | `draft`, `review`, 보류 | 금지 | 내용 검토 증거가 있어도 source/baseline 상태가 아직 verified가 아니므로 파생 문서 승격을 차단한다. |
| `verified` | `draft`, `review`, `verified` | 조건부 허용 | URL·제목·revision, 날짜 equality, stable-ID 집합 동등성, 파생 문서 내용 검토 증거가 모두 있어야 `review → verified`로 전이한다. |
| `blocked` | `draft`, `review`, 보류 | 금지 | `notes`에 차단 사유·영향 자료·후속 확인 대상을 기록한다. 새 공식 확인 증거 후 실제 상태로 되돌려 순차 재검증한다. |
| `확인 필요` | `draft`, `review`, 보류 | 금지 | enum이 아닌 보류 라벨이다. 추측하지 않고 확인 대상과 새 증거를 기록한 뒤 상태를 재평가한다. |

- `discovered`, `downloaded`, `summarized`, `reviewed` 중 하나라도 남아 있으면 파생 문서의 `verified` 전이는 fail-closed다.
- `blocked` 또는 `확인 필요`를 해소해도 이전 `verified` 상태는 자동 복구되지 않는다. 차단 해소 증거, canonical 날짜 재검증, stable-ID 집합 재검사를 완료한 뒤 다시 승격한다.

### 민감정보 최소화

U1의 파일·예시·로그·검사 증거에는 자격 증명, 토큰, API 키, 비밀번호, 실제 AWS 계정 식별자, PII, 결제·건강정보, 서명된 URL을 기록하지 않는다. 공식 공개 URL과 공개 문서 메타데이터만 보존한다.

검사 도구는 AWS API 호출, 계정 인증, 비밀 저장소, 학습자 답안·진도 저장, 원격 업로드를 사용하지 않는다. 예시가 필요하면 명백한 플레이스홀더를 사용한다.

### 입력과 경로 안전성

- 입력 파일은 저장소 상대 경로로만 선언한다.
- 로컬 절대 경로, 사용자 홈 경로, 임시 경로는 계약에 기록하지 않는다.
- YAML·JSON·CSV는 일반 파서로 읽고, 파싱 전후에 예상 구조와 허용 상태를 검사한다.
- Markdown 링크는 허용된 외부 URL 또는 저장소 상대 링크인지 확인한다.
- Markdown의 예시 코드나 출처 메타데이터에 실행 가능한 비밀·명령을 넣지 않는다.

## 접근 제어와 변경 무결성

런타임 접근 제어는 **해당 없음**이다. 변경 권한은 저장소 플랫폼의 기존 권한, pull request 리뷰, 승인 게이트, 버전 관리 이력으로 통제한다.

`sources/`를 변경하면 변경된 URL, stable ID, 상태, 양방향 연결, 검사 증거를 함께 검토한다. 검사 도구는 읽기 전용으로 동작하고, 네트워크 확인 실패를 성공으로 바꾸지 않는다.

## 위협과 대응

| 위협 | 대응 | 실패 시 결과 |
|---|---|---|
| ID 중복 또는 위조 연결 | 형식·유일성·양방향 참조 검사 | `verified` 승격 보류 |
| 출처 변경 또는 잘못된 provenance | revision·제목·URL·확인일·상태 기록 | 영향 문서 보류 |
| 차단된 출처의 추측 | `blocked`·확인 필요와 후속 조치 기록 | 파생 자료 `verified` 금지 |
| 민감정보 유입 | 패턴 검사와 수동 검토 | 변경 거부, 제거 후 재검사 |
| 악성 또는 잘못된 구조의 파일 | UTF-8·파서·필수 키·enum 검사 | 해당 검사 실패 |
| 절대 경로·사용자 데이터 노출 | 상대 경로와 비수집 경계 검사 | 변경 거부 |

## 암호화·인증·인가 항목

- 저장 시 암호화: **해당 없음**. AWS 저장소나 별도 데이터 저장소를 만들지 않는다.
- 전송 중 암호화: **해당 없음**. U1은 런타임 통신 계약을 만들지 않는다. 공개 URL 접근은 작성 시점의 출처 확인일 뿐 U1 서비스 통신이 아니다.
- 사용자 인증·인가: **해당 없음**. 정적 파일은 저장소 변경 권한 경계 안에서 관리한다.
- 비밀 관리: **해당 없음**. 비밀을 생성·저장·주입하지 않는다.
- 감사 로그: 런타임 감사 로그는 **해당 없음**. 대신 버전 관리 이력과 검사 증거에 변경·도구·판정을 기록한다.

## 검증 증거

- `BaselineItem.baseline_id`, `SourceRecord.source_id`, `SidebarLink.link_id`의 형식·유일성, `SidebarLink.linked_source_id: reference`의 required/exactly-one, `SourceRecord.linked_sidebar_ids: list<string>`의 required/reverse cardinality를 검사한다.
- 모든 SourceRecord에 대해 정방향 집합 `{SidebarLink.link_id}`와 역방향 집합 `set(SourceRecord.linked_sidebar_ids)`의 정확한 동등성을 검사한다. `linked_source_id` 불일치, orphan, 중복, 누락, `source_id` alias 사용은 각각 fail-closed로 판정한다.
- 모든 SourceRecord에 대해 기준선 정방향 집합 `{BaselineItem.baseline_id | BaselineItem.source_id == source_id}`와 reverse 집합 `set(SourceRecord.linked_baseline_ids)`의 정확한 equality를 검사한다. `linked_baseline_ids`는 required `list<string>`이며 원소는 `BaselineItem.baseline_id`이고, SourceRecord마다 빈 목록도 허용·명시한다. 존재하지 않는 ID, 중복, 누락, URL-only 연결, 정방향과 reverse 중 한쪽에만 있는 ID는 fail-closed로 판정한다.
- `BaselineItem.source_checked`와 `SourceRecord.checked_date`가 모두 필수 `YYYY-MM-DD` UTC calendar date인지, timezone/time이 없는지, 연결된 값이 문자 단위로 같은지 검사한다. `BaselineItem.checked_date`가 존재하면 alias 위반으로 실패한다. 누락·형식 오류·불일치는 영향 자료의 `verified` 승격을 막는다.
- 출처·기준선 상태별로 다음 승격 표를 검사한다: `discovered`, `downloaded`, `summarized`, `reviewed`, `blocked`, `확인 필요`는 파생 문서 `draft`/`review`/보류만 허용하고 `verified`를 금지한다. `verified`만 날짜 equality·provenance·양방향 링크·내용 검토 증거가 있을 때 `verified`를 허용한다.
- 상태가 `blocked` 또는 `확인 필요`인 경우 `notes`의 차단 사유·영향 자료·후속 확인 대상과 새 해소 증거·재검증 전이를 대조한다. 중간 상태에서 `verified`가 되거나 이전 `verified`가 증거 없이 복구되면 실패한다.
- `aws-sidebar-index.md`의 모든 sidebar URL과 stable ID가 `source-registry.yaml`의 정확히 하나의 SourceRecord에 연결된다. registry에만 있는 공식 certification·documentation·blog·Skill Builder 출처는 허용한다.
- sidebar URL 중복, registry URL 중복, sidebar stable-ID 중복, registry reverse-ID 중복, sidebar orphan·누락은 서로 별도 검사하며 어느 하나라도 실패하면 해당 검사를 보류한다.
- 민감정보·자격 증명·PII 패턴이 발견되지 않는다.
- 모든 파일이 UTF-8이고 YAML·JSON·CSV가 파싱된다.
- 검사 결과에 입력, 날짜, 도구, 판정, 조치, 재검사 결과가 있다.

## Upstream applicability (stage contract)

`nfr-design` stage가 선언한 upstream 중 U1에서 실제 파일로 생성되지 않은 항목은 다음과 같이 명시적으로 N/A 처리한다.

| Stage upstream | U1 적용성 | 근거 |
|---|---|---|
| `performance-requirements` | N/A | 정적 파일과 로컬 검사만 보호하므로 런타임 성능 요구사항이 없다. |
| `scalability-requirements` | N/A | 서비스·사용자 요청·데이터 저장소가 없어 런타임 확장 요구사항이 없다. |
| `reliability-requirements` | N/A | 서비스 장애 복구가 아니라 fail-closed 파일 검사를 설계한다. |
| `observability-requirements` | N/A | CloudWatch·로그·트레이스가 아닌 검사 증거를 사용한다. |
| `contract-summary` (optional) | N/A | U1에는 런타임 경계 계약이 없어 해당 산출물이 없다. |

이 N/A는 stage 계약의 미생성 upstream을 숨기지 않기 위한 적용성 기록이다. U1은 새 요구사항·런타임 서비스·코드·dependency를 추가하지 않는다.

## Assumptions & Open Questions

- 저장소 플랫폼의 변경 권한과 리뷰 정책은 U1 외부의 기존 통제로 가정한다.
- 실제 공식 revision·URL·행 값은 출처 조사 후 확정하며, 그 전에는 보류 상태를 유지한다.
- 실행 서비스나 학습자 데이터가 추가되면 인증·인가·암호화·보존 설계를 별도 작성해야 한다.

## Sources

- `construction/u1-baseline-and-source-registry/nfr-requirements/security-requirements.md`
- `construction/u1-baseline-and-source-registry/nfr-requirements/tech-stack-decisions.md`
- `construction/u1-baseline-and-source-registry/functional-design/functional-spec.md`
- `construction/u1-baseline-and-source-registry/functional-design/rules.md`

## Review

**Verdict:** READY
**Reviewer:** aidlc-architecture-reviewer-agent
**Date:** 2026-09-07T12:44:02Z
**Iteration:** 2
**Request Challenge:** review:7170b5f1a156b391af9cf2cee7bac24f

### Findings

| ID | Severity | Location | Finding | Required action | Status |
|---|---|---|---|---|---|

### Validation Tool Results

| Tool | Result | Interpretation |
|---|---|---|
| `aidlc-sensor-required-sections.ts` | PASS; `security-design.md` has `h2_count=10` and `findings_count=0` | The review artifact retains the required NFR design sections and one terminal review section. |
| `aidlc-sensor-upstream-coverage.ts` | PASS; `consumes=[]`, `unreferenced=[]`, `findings_count=0` | Direct validation of the review artifact reports no unreferenced upstream paths. |
| `aidlc-sensor-traceability.ts` | PASS; `gaps=[]`, `orphans=[]`, `missing_from_table=[]`, `missing_from_upstream_ids=[]`, `invalid_entries=[]`, `invalid_targets=[]` | The U1 NFR traceability artifact is structurally complete. |
| `aidlc-sensor-linter.ts` | N/A: `no-eslint-config` | The reviewed U1 outputs contain no executable TypeScript/JavaScript requiring linting. |
| `aidlc-sensor-type-check.ts` | N/A: `no-tsconfig-found` | The reviewed U1 outputs contain no TypeScript/JavaScript requiring type checking. |
| Encoding and JSON validation | PASS | The reviewed Markdown outputs are UTF-8 and `traceability.json` parses as JSON. |
| Sensitive-data scan | PASS; `sensitive_pattern_hits=0` | No credential, token, PII, or account-identifier pattern was detected in the reviewed U1 outputs. |
| Allowed-scope cross-artifact review | PASS | The stage definition, Q&A, all current U1 NFR-design outputs, and the three permitted U1 upstream contracts agree on the static-only boundary, stable-ID/provenance contracts, fail-closed promotion rules, and traceability coverage. |

### Summary

The stale terminal review was replaced without changing the preceding U1 security design body. The current U1 NFR design remains implementable as a static, read-only `ReferenceCatalog` and `LocalValidationBoundary`; no Critical or Major architectural gap was found, so the review is READY.