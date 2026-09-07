# U1 성능 설계

## 목적과 설계 경계

U1은 실행형 애플리케이션이 아니라 `ReferenceCatalog`의 정적 Markdown·YAML·JSON·CSV 계약을 제공한다. 따라서 네트워크 요청 지연, API 처리량, DB 연결 풀, 캐시 적중률, 런타임 CPU·메모리 목표는 설계 대상이 아니다.

성능 설계의 목표는 사람이 읽고 로컬 도구가 반복해서 검사할 수 있는 작은 파일 집합을 유지하는 것이다. 성능 수치는 확인되지 않은 숫자를 만들지 않고, 파일 구조와 검사 절차의 결정성으로 관리한다.

## Upstream applicability (stage contract)

`nfr-design` stage는 다음 upstream slug를 선언하지만, U1은 `spec` Unit이므로 해당 요구사항 파일을 생성하지 않는다. 이 누락은 숨겨진 전제가 아니라 적용성 판정이다.

| Stage upstream | U1 적용성 | 근거 |
|---|---|---|
| `performance-requirements` | N/A | 정적 파일 열람·로컬 검사의 성능만 다루며 latency·throughput·CPU·메모리 요구사항은 없다. |
| `scalability-requirements` | N/A | 런타임 서비스·사용자 요청·동시성 확장이 없어 확장성 요구사항을 만들지 않는다. |
| `reliability-requirements` | N/A | 서비스 가용성·장애 조치 대신 파일 무결성과 fail-closed 검사를 사용한다. |
| `observability-requirements` | N/A | 운영 메트릭·로그·트레이스가 없고 로컬 검사 증거만 기록한다. |
| `contract-summary` (optional) | N/A | U1에는 런타임 또는 Unit 간 API·이벤트 계약이 없어 contract-summary가 생성되지 않는다. |

위 N/A는 런타임 NFR이나 서비스·dependency를 추가하지 않는다는 설계 결정이며, 아래 성능 설계는 승인된 정적 UTF-8 Markdown/YAML/JSON/CSV 경계에 한정된다.

## 결정 요약

| 결정 | 설계 내용 | 적용 NFR |
|---|---|---|
| 정적 파일 우선 | 기준선·출처·사이드바·추적성을 별도 UTF-8 파일로 유지하고 런타임 서비스로 변환하지 않는다. | NFR2.1, NFR6.1 |
| 필요한 자료만 읽기 | 일반 열람은 대상 문서와 직접 연결된 출처만 읽고, 품질 검사는 선언된 입력 집합을 사용한다. | NFR3.3, NFR4.3 |
| 결정적 파싱 | Markdown·YAML·JSON·CSV를 동일한 파서와 고정된 검사 순서로 읽는다. 네트워크 확인이 필요한 URL은 로컬 검사와 분리한다. | NFR6.1, NFR3.3 |
| 불필요한 최적화 배제 | 캐시, CDN, connection pool, 비동기 작업, 페이지네이션, 배치 런타임을 도입하지 않는다. | 해당 없음인 런타임 항목 |

## 파일 열람과 검사 전략

### 사람이 읽는 열람

`aws-sidebar-index.md`는 링크와 상위 주제를 가까이 배치해 순차 열람한다. `source-registry.yaml`과 `content-traceability.yaml`은 stable ID를 기준으로 필요한 항목을 찾는다. URL이나 표시 제목을 색인 키로 사용하지 않는다.

도메인 문서가 출처를 참조할 때는 U1의 `source_id`와 `baseline_id`를 사용한다. 동일한 URL의 문자열 검색을 canonical 관계로 간주하지 않는다.

### 로컬 검사

검사는 다음 순서로 수행한다.

1. 파일을 UTF-8로 읽는다.
2. YAML·JSON·CSV의 문법과 필수 구조를 파싱한다.
3. stable ID 형식과 중복을 검사한다.
4. `source_id`, `baseline_id`, 파생 자료 ID의 정방향·역방향 연결을 비교한다.
5. 상태 전이와 `blocked`·`확인 필요`의 `verified` 차단을 검사한다.
6. 민감정보 패턴과 저장소 외부 절대 경로를 검사한다.
7. 입력 파일, 검사일, 도구, 판정, 조치, 재검사 결과를 증거로 남긴다.

검사 도구는 결과를 원격으로 전송하지 않는다. 동일 checkout과 동일 입력에 대해 결과가 달라지면 도구 버전, 입력 목록, 확인일을 먼저 비교한다.

## 성능 예산과 품질 기준

U1에는 사용자 요청에 대한 latency budget이나 처리량 목표가 없다. 대신 다음의 질적 기준을 사용한다.

- 작은 개념 단위 파일은 전체 파일을 읽어도 이해 가능한 크기로 유지한다.
- 추적성 검사는 URL 문자열 비교가 아니라 stable ID 집합 비교로 수행한다.
- 검사 대상과 검사 순서를 기록해 같은 입력을 다시 검사할 수 있게 한다.
- 대규모 파일 하나에 모든 출처 본문을 병합하지 않는다. 원문 통째 복제는 NFR8.2에 위배된다.
- 검사 실패 시 부분 성공 결과를 `verified`로 승격하지 않고 전체 판정을 보류한다.

## 캐시·비동기·병렬 처리

- 캐시: **해당 없음**. 로컬 정적 파일을 캐시하면 변경된 출처와 오래된 검사 결과가 섞일 수 있다.
- CDN·reverse proxy: **해당 없음**. U1은 콘텐츠 전달 서비스를 만들지 않는다.
- connection pool·비동기 큐: **해당 없음**. 외부 서비스나 장기 실행 작업이 없다.
- 페이지네이션: **해당 없음**. U1은 API 목록 응답을 제공하지 않는다.
- 병렬 검사: **선택적 구현 사항**. 독립 파일을 병렬로 읽을 수는 있지만, 결과 정렬과 오류 집계 순서는 고정해야 한다. 병렬 실행을 위해 새 dependency를 추가하지 않는다.

## 실패와 성능 저하 처리

파서가 실패하거나 입력 파일을 읽지 못하면 재시도나 대체 캐시를 사용하지 않고 해당 검사를 실패로 판정한다. 원격 공식 URL 접근이 느리거나 차단되면 내용을 추측하지 않고 `blocked` 또는 `확인 필요`를 기록한다.

파일 수와 문서량이 증가해 로컬 검사 시간이 커져도 U1의 범위를 API·DB·검색 인덱스로 확장하지 않는다. 필요하면 검사 입력을 명시적으로 나누되, 하나의 최종 판정에서 누락된 입력이 없는지 증거에 남긴다.

## 검증 증거

- Markdown 제목·링크·표가 일반 Markdown 뷰어에서 읽힌다.
- YAML·JSON·CSV가 일반 파서로 읽힌다.
- 동일 입력과 동일 검사 순서에서 stable ID와 양방향 연결 결과가 반복된다.
- 원문 본문이 복제되지 않고 메타데이터와 링크만 보존된다.
- 성능 최적화 기능을 추가하지 않았다는 범위 점검 결과가 기록된다.

## Assumptions & Open Questions

- 공식 revision·URL·행 값은 출처 조사에서 확인된 값만 입력한다.
- U1에 런타임 서비스나 대규모 원격 수집이 추가되는 범위 변경은 현재 설계를 재검토하는 조건이다.
- 별도의 수치 성능 목표는 승인된 요구사항에 없으므로 추가하지 않는다.

## Sources

- `construction/u1-baseline-and-source-registry/nfr-requirements/security-requirements.md`
- `construction/u1-baseline-and-source-registry/nfr-requirements/tech-stack-decisions.md`
- `construction/u1-baseline-and-source-registry/functional-design/functional-spec.md`
- `construction/u1-baseline-and-source-registry/functional-design/rules.md`
