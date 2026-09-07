# U1 신뢰성 설계

## 목적과 설계 경계

U1의 신뢰성은 서비스 가용성이 아니라, 공식 기준선과 출처 연결을 잃거나 잘못된 사실을 확인된 것으로 표시하지 않는 능력이다. U1은 런타임 서비스, 고가용성 토폴로지, 자동 장애 조치, 백업 서비스, circuit breaker, retry queue를 만들지 않는다.

## Upstream applicability (stage contract)

`nfr-design` stage가 선언한 `performance-requirements`, `scalability-requirements`, `reliability-requirements`, `observability-requirements`, 선택적 `contract-summary` 파일은 U1 `spec` Unit에 없다. 각각 N/A이며, U1의 신뢰성은 파일·파싱·ID·상태·추적성의 fail-closed 검사로 정의한다. 이 적용성 기록은 새 런타임 NFR·서비스·코드·dependency를 만들지 않는 근거다.

## 신뢰성 결정

### Fail-closed 판정

검사할 수 없는 입력은 성공으로 간주하지 않는다.

- 파일이 없거나 UTF-8이 아니면 검사 실패다.
- YAML·JSON·CSV 파싱이 실패하면 해당 변경은 보류한다.
- stable ID가 중복되거나 형식이 틀리면 `verified` 승격을 보류한다.
- 존재하지 않는 `source_id`, `baseline_id`, 파생 자료 ID가 있으면 orphan 실패다.
- 정방향과 역방향 연결이 다르면 추적성 실패다.
- `blocked` 또는 확인 필요 출처에 의존한 자료는 `verified`가 될 수 없다.
- 민감정보 패턴이 발견되면 제거 후 동일 입력으로 재검사한다.

### 출처 접근 실패

공식 URL이 열리지 않거나 동적 내용·인증·네트워크 문제로 확인되지 않으면 내용을 만들지 않는다. 출처 레코드에 `blocked` 또는 확인 필요 상태, 차단 사유, 영향 자료, 후속 확인 대상을 기록한다.

복구 시에는 차단 사유가 해소된 새로운 확인 증거를 추가하고, 적절한 확인 단계로 되돌린다. 기존 확인일을 조용히 덮어쓰지 않는다.

### 변경 복구

버전 관리 이력에서 마지막 정상 상태를 확인할 수 있어야 한다. stable ID를 삭제하거나 재번호화하는 대신 변경 차이를 기록한다. 검사 실패를 수정한 뒤 동일 입력 파일과 동일 검사 명령을 다시 실행하고, 실패 원인·수정·재검사 결과를 품질 증거에 남긴다.

## 런타임 신뢰성 패턴의 적용성

| 패턴 | 판정 | U1 이유 |
|---|---|---|
| Circuit breaker | 해당 없음 | 호출하는 downstream 서비스가 없다. |
| Retry with backoff | 해당 없음 | 로컬 검사는 실패를 숨기기 위해 재시도하지 않는다. |
| Bulkhead | 해당 없음 | 프로세스·스레드·connection pool 경계가 없다. |
| Health check·failover | 해당 없음 | 운영 중인 서비스가 없다. |
| Backup·replication·DR | 해당 없음 | 저장소 백업 정책은 기존 버전 관리 플랫폼의 범위다. |
| Graceful degradation | 제한 적용 | 확인되지 않은 출처를 낮은 품질로 계속 제공하지 않고 `blocked`로 보류한다. |

## 상태 전이와 일관성

출처 확인 상태는 `discovered → downloaded → summarized → reviewed → verified`로 진행하며, 접근 또는 내용 확인이 막히면 `blocked`로 전환할 수 있다. 파생 자료의 `draft|review|verified` 상태는 출처 상태와 독립적으로 기록하되, 차단·미확인 출처가 있으면 `verified`를 금지한다.

양방향 추적성은 eventual consistency를 허용하는 런타임 이벤트가 아니다. 한 변경 안에서 양쪽 배열을 함께 업데이트하고 같은 로컬 검사에서 비교한다. 한쪽만 먼저 커밋된 상태는 검사 실패로 남긴다.

## 실패 복구 절차

1. 실패한 입력 파일과 검사 단계 식별
2. 오류가 파싱·ID·링크·상태·민감정보 중 어디인지 기록
3. 해당 파일만 수정하고 stable ID 의미를 보존
4. 동일 입력 집합과 검사 도구로 재검사
5. 통과 결과와 남은 차단·확인 필요 항목을 품질 증거에 기록
6. 모든 차단 항목이 해소되기 전에는 파생 자료를 `verified`로 승격하지 않음

## 검증 증거

- 실패 시 부분 결과를 성공으로 표시하지 않는다.
- 차단 출처의 영향 범위와 후속 조치가 남는다.
- 검사 실행일·도구·입력·판정·수정·재검사 결과가 재현 가능하다.
- 양방향 링크와 상태 전이가 같은 입력에서 일관되게 검사된다.
- 파일 복구는 버전 관리 이력과 stable ID 차이로 추적된다.

## Assumptions & Open Questions

- 저장소 버전 관리와 코드 리뷰가 파일 변경의 기본 복구 수단이다.
- 자동 동기화나 온라인 최신성 모니터링은 현재 범위 밖이다.
- 런타임 소비자 또는 외부 저장소가 추가되면 별도의 가용성·백업·장애 복구 목표가 필요하다.

## Sources

- `construction/u1-baseline-and-source-registry/nfr-requirements/security-requirements.md`
- `construction/u1-baseline-and-source-registry/functional-design/functional-spec.md`
- `construction/u1-baseline-and-source-registry/functional-design/rules.md`
- `construction/u1-baseline-and-source-registry/functional-design/entities.md`
