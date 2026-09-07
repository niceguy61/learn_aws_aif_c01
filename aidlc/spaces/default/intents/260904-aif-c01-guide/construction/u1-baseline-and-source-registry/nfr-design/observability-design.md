# U1 관측성 설계

## 목적과 설계 경계

U1은 운영 중인 서비스의 메트릭·로그·트레이스를 수집하지 않는다. 관측성의 대상은 정적 기준선·출처 계약을 어떤 입력과 규칙으로 검사했는지, 결과가 무엇이었는지, 차단·누락·수정이 어떻게 처리되었는지다.

CloudWatch, X-Ray, ADOT, 대시보드, 알람, SLI·SLO, 운영 에스컬레이션은 **해당 없음**이다.

## Upstream applicability (stage contract)

`performance-requirements`, `scalability-requirements`, `reliability-requirements`, `observability-requirements`, 선택적 `contract-summary`는 stage가 선언하지만 U1 `spec` Unit의 실제 upstream 파일은 아니다. 모두 N/A이며, 운영 관측성 대신 로컬 검사 evidence contract를 사용한다. 이는 런타임 NFR·서비스·코드·dependency를 임의로 추가하지 않는 근거다.

## 결정 요약

| 영역 | 결정 |
|---|---|
| 품질 증거 | 검사일, 입력 파일, 도구 또는 검사자, 판정, 발견 항목, 조치, 재검사 결과를 기록한다. |
| 상관관계 | `baseline_id`, `source_id`, `link_id`, 파생 자료 ID를 공통 추적 키로 사용한다. |
| 로그 | 런타임 로그 대신 로컬 검사 결과와 버전 관리 변경 이력을 사용한다. |
| 경고 | `blocked`, 확인 필요, orphan, 중복, 파싱 오류를 명시적으로 표시한다. |
| 재현성 | 동일 입력·도구·검사 순서를 증거에 남긴다. |

## 검사 결과 스키마

품질 증거는 최소한 다음 정보를 포함해야 한다.

- `input_files`: 검사한 저장소 상대 경로의 정렬된 목록
- `checked_date`: 검사 실행일
- `tool`: 사용한 검사기 또는 검사 명령의 식별자
- `decision`: `PASS`, `FAIL`, `BLOCKED`, `확인 필요` 중 실제 판정
- `findings`: ID·파일·규칙·설명·영향
- `actions`: 수정 또는 후속 확인 조치
- `recheck`: 수정 후 동일 입력으로 재검사한 결과
- `trace_keys`: 관련 `baseline_id`, `source_id`, `link_id`, 파생 자료 ID

이 설계는 U1이 최종 품질 보고서 본문을 소유한다는 뜻이 아니다. U1은 검사 가능성과 추적 키를 제공하고, 통합 품질 증거의 최종 소유자는 U8이다.

## 관측 대상과 이벤트성 정보

| 관측 대상 | 기록할 사실 | 실패 의미 |
|---|---|---|
| ID 무결성 | 형식, 중복, 존재 여부 | 기준선·출처 관계를 신뢰할 수 없음 |
| provenance | URL, 제목, revision, 확인일, 상태 | 원문 근거가 불명확함 |
| 양방향 추적성 | 정방향·역방향 ID 집합 차이 | 파생 자료가 누락되거나 고아임 |
| 상태 전이 | 확인 상태와 문서 상태의 조합 | 잘못된 `verified` 승격 가능 |
| 파일 구조 | UTF-8, 파서, 필수 키, enum | 도구와 사람이 같은 계약을 읽을 수 없음 |
| 민감정보 | 자격 증명·토큰·PII 패턴 | 변경 보류 및 제거 필요 |
| 범위 구분 | 시험 범위와 실무 확장 표지 | 학습자가 출제 범위를 오해할 수 있음 |

## 대시보드·알람·추적

- 운영 대시보드: **해당 없음**. 장기 실행 서비스가 없다.
- 실시간 알람: **해당 없음**. 검사 결과는 변경 검토와 품질 게이트에서 확인한다.
- 분산 추적: **해당 없음**. 분산 호출이나 요청 ID가 없다.
- 로컬 상관관계: 적용한다. 한 finding이 영향을 주는 파일과 stable ID를 함께 표시한다.
- 보존 기간: **해당 없음**. 별도 로그 저장소나 학습자 활동 데이터를 만들지 않는다. 필요한 검사 증거는 버전 관리형 품질 기록으로 보존한다.

## 판정과 후속 조치

`PASS`는 선언된 입력 집합과 규칙을 모두 검사했다는 뜻이다. `BLOCKED` 또는 확인 필요는 출처 확인 실패를 뜻하며, 해당 자료를 `verified`로 표시할 수 없다. `FAIL`은 로컬 계약 위반이며, 원인 수정 후 같은 입력으로 재검사한다.

결과에는 단순한 오류 개수만 남기지 않는다. 어떤 파일·ID·규칙이 영향을 받는지 기록해 사람이 원인을 추적할 수 있게 한다.

## 검증 증거

- 모든 판정이 입력 파일과 검사일을 갖는다.
- finding이 stable ID와 파일 경로를 통해 원인과 영향 자료로 연결된다.
- `blocked`·확인 필요와 `verified` 승격 금지의 관계가 결과에 드러난다.
- 재검사 결과가 원래 실패 결과와 함께 보존된다.
- 비밀·PII·실제 계정 식별자를 결과에 기록하지 않는다.

## Assumptions & Open Questions

- U8이 통합 품질 증거와 최종 품질 보고서를 소유한다.
- 로컬 검사 결과를 별도 원격 모니터링 시스템으로 전송하지 않는다.
- 향후 자동 검사 파이프라인이 승인되면 해당 파이프라인의 로그·권한·보존 설계를 별도 검토한다.

## Sources

- `construction/u1-baseline-and-source-registry/nfr-requirements/security-requirements.md`
- `construction/u1-baseline-and-source-registry/nfr-requirements/tech-stack-decisions.md`
- `construction/u1-baseline-and-source-registry/functional-design/functional-spec.md`
- `construction/u1-baseline-and-source-registry/functional-design/entities.md`
