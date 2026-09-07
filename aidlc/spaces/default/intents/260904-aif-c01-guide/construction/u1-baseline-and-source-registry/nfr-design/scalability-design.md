# U1 확장성 설계

## 목적과 설계 경계

U1의 확장성은 사용자 요청을 처리하는 서비스 확장이 아니라, 기준선·출처·사이드바 링크·양방향 추적 항목이 늘어나도 정적 계약의 소유권과 검사 규칙이 유지되는 능력이다.

수평 확장, 로드 밸런서, 자동 확장, 샤딩, read replica, 메시지 큐, 멀티 리전은 런타임이 없으므로 **해당 없음**이다.

## 확장 원칙

### 파일과 책임의 확장

- 기준선은 도메인·작업·기술 항목별 stable ID를 유지한다.
- 출처는 URL별 `SourceRecord`를 유지하고, 동일 URL은 기존 `source_id`를 재사용한다.
- 사이드바 링크는 `SidebarLink`로 분리해 상위 주제와 발견 순서를 보존한다.
- 파생 문서가 늘어도 U1은 본문을 소유하지 않고 ID와 연결 계약만 제공한다.
- 품질 증거 본문은 U8이 소유하며, U1은 검사에 필요한 입력과 규칙을 제공한다.

이 구조는 파일을 추가해도 기존 컴포넌트의 책임을 바꾸지 않는다. 새 도메인이 추가될 때는 새 stable ID와 명시적 연결을 추가하며 기존 ID를 재사용하지 않는다.

### 검사 입력 확장

검사기는 선언된 입력 집합을 읽고, 결과를 결정적인 순서로 정렬한다. 파일 수가 늘어나는 경우에도 다음 순서를 유지한다.

1. 입력 파일 목록 확정
2. 파일별 인코딩·파싱 검사
3. 전역 ID 유일성 검사
4. `aws-sidebar-index.md`의 각 URL이 `source-registry.yaml`의 정확히 하나의 `SourceRecord`로 향하는지 검사
5. sidebar URL 중복, registry URL 중복, sidebar orphan을 각각 검사
6. 정방향·역방향 링크 집합 비교
7. 상태·범위·민감정보 검사
8. 결과와 누락 입력 기록

registry에는 sidebar에 없는 공식 certification·documentation·blog·Skill Builder 출처가 포함될 수 있다. 따라서 registry의 비-sidebar URL은 유효한 추가 출처이며 sidebar 완전성 실패로 판정하지 않는다. sidebar URL이 registry에 없거나 둘 이상의 `SourceRecord`에 연결되면 sidebar orphan 또는 중복으로 실패한다.

부분 입력만 검사한 결과는 전체 기준선 검증으로 표시하지 않는다. 입력을 여러 묶음으로 실행하는 경우 최종 증거에 모든 묶음과 통합 결과를 기록한다.

## 데이터 분할과 결합도

- 분할 키: **해당 없음**. 데이터베이스 파티션이나 샤드가 없다.
- 논리적 분할: `BaselineItem`, `SourceRecord`, `SidebarLink`의 stable ID와 파일 계약으로 구분한다.
- 공유 mutable state: **해당 없음**. 런타임 상태나 공유 메모리 저장이 없다.
- 직접 참조: URL 문자열이 아니라 선언된 stable ID 배열만 사용한다.
- 순환 의존성: U1의 canonical 파일 사이에 순환 소유권을 만들지 않는다. 양방향 링크는 동일 관계를 검증하기 위한 표현이지 서로의 본문 소유권을 뜻하지 않는다.

## 용량 임계치와 대응

U1에는 승인된 수치 용량 임계치가 없다. 다음 상황을 설계 재검토 신호로 삼는다.

- 하나의 파일이 사람이 읽기 어려울 정도로 커지는 경우
- 검사 입력 목록을 명시하지 않으면 누락을 발견하기 어려운 경우
- URL 문자열 검색 없이는 관계를 확인할 수 있다고 오해하게 되는 경우
- 출처 본문을 복제해야만 열람할 수 있다고 요구되는 경우
- 새 저장소·API·자동 수집이 필요해지는 경우

이 신호가 발생해도 먼저 개념 단위 파일 분할, 명시적 입력 목록, stable ID 인덱스, 검사 결과 통합을 검토한다. API·DB를 자동으로 도입하지 않는다.

## 런타임 확장 항목

| 항목 | 판정 | 이유 |
|---|---|---|
| 수평·수직 확장 | 해당 없음 | 실행 프로세스가 없다. |
| 자동 확장·로드 밸런싱 | 해당 없음 | 요청 처리 서비스가 없다. |
| 데이터 샤딩·파티셔닝 | 해당 없음 | DB나 대용량 저장소가 없다. |
| 큐 기반 분산 처리 | 해당 없음 | 장기 실행·비동기 작업이 없다. |
| 캐시 계층 | 해당 없음 | 오래된 출처 결과를 숨길 위험이 있다. |
| 독립 배포 단위 | 해당 없음 | 배포 환경을 만들지 않는다. |

## Upstream applicability (stage contract)

`nfr-design` stage의 `performance-requirements`, `scalability-requirements`, `reliability-requirements`, `observability-requirements`, 선택적 `contract-summary`는 U1 `spec` Unit에 실제 파일로 존재하지 않는다. 모두 N/A이며, 정적 파일량 증가에 대한 입력 목록·ID·결정성 규칙으로 대체한다. 이는 런타임 NFR·서비스·코드·dependency를 추가하지 않는다는 근거다.

## 검증 증거

- 새 항목 추가 후 기존 stable ID가 변경되지 않는다.
- 전체 입력 파일 목록이 증거에 포함된다.
- ID 집합·상태 집합·양방향 링크가 결정적인 순서로 비교된다.
- 파생 Unit이 추가되어도 `ReferenceCatalog`가 문서 본문을 침범하지 않는다.
- 검사량 증가에 대한 대응이 새 dependency나 런타임 서비스가 아니라 파일 분할·입력 명시·결과 통합으로 제한된다.

## Assumptions & Open Questions

- 현재 확장 대상은 정적 문서와 메타데이터의 양이며 동시 사용자 수가 아니다.
- 공식 범위가 바뀌면 기존 stable ID 보존과 새 revision 차이 기록을 우선 검토한다.
- 자동 최신성 수집이나 중앙 검색이 승인되면 U1 경계와 NFR을 다시 설계한다.

## Sources

- `construction/u1-baseline-and-source-registry/nfr-requirements/security-requirements.md`
- `construction/u1-baseline-and-source-registry/nfr-requirements/tech-stack-decisions.md`
- `construction/u1-baseline-and-source-registry/functional-design/functional-spec.md`
- `construction/u1-baseline-and-source-registry/functional-design/entities.md`
