# U1 논리 컴포넌트 설계

## 목적과 설계 경계

U1은 배포 토폴로지가 아니라 정적 계약의 논리적 소유권과 검사 경계를 정의한다. 실행 서비스·서버·컨테이너·DB·API·AWS 리소스는 만들지 않는다.

## Upstream applicability (stage contract)

`nfr-design` stage의 `performance-requirements`, `scalability-requirements`, `reliability-requirements`, `observability-requirements`, 선택적 `contract-summary`는 U1 `spec` Unit에 실제 파일로 존재하지 않는다. 모두 N/A이며, 논리 컴포넌트는 정적 `ReferenceCatalog`와 `LocalValidationBoundary`만 정의한다. 이 적용성 기록은 런타임 NFR·서비스·코드·dependency를 추가하지 않는 근거다.

## 컴포넌트 카탈로그

```yaml
components:
  - name: ReferenceCatalog
    kind: packaging
    owner_unit: U1
    owner_directory: u1-baseline-and-source-registry
    owns:
      - BaselineItem
      - SourceRecord
      - SidebarLink
      - sources/aws-sidebar-index.md
      - sources/source-registry.yaml
      - sources/content-traceability.yaml
    interfaces:
      - stable_id_contract
      - provenance_contract
      - bidirectional_traceability_contract
      - status_transition_contract
    depends_on: []
    runtime: false
  - name: LocalValidationBoundary
    kind: library
    owner_unit: U1
    owns:
      - validation_rules
      - validation_evidence_contract
    interfaces:
      - parse_validation
      - identity_validation
      - link_validation
      - status_validation
      - sensitive_data_validation
    depends_on:
      - ReferenceCatalog
    runtime: false
  - name: QualityEvidence
    kind: packaging
    owner_unit: U8
    owns:
      - integrated_quality_evidence
    consumes:
      - ReferenceCatalog
      - LocalValidationBoundary
    runtime: false
```

텍스트로 설명하면 `ReferenceCatalog`가 U1의 유일한 기준선·출처 계약 소유 컴포넌트다. `LocalValidationBoundary`는 그 계약을 읽고 검사하는 논리 경계이며 런타임 서비스가 아니다. `QualityEvidence`는 U8이 최종 검사 결과를 소유하는 downstream 컴포넌트다. U8은 U1의 파일을 소유하지 않는다.

## ReferenceCatalog

### 책임

- AIF-C01 공식 기준선의 stable ID와 공식 메타데이터 연결
- 공식 사이드바 링크의 발견 순서·상위 주제·도메인 매핑 보존
- `SourceRecord`의 URL·제목·확인일·접근 상태 보존
- `BaselineItem.source_revision`과 `BaselineItem.revision_title`의 기준선 revision provenance 연결 보존
- 파생 자료와의 양방향 ID 연결 계약 제공
- `blocked`·확인 필요 출처의 영향 범위와 후속 확인 대상 보존

### 소유 엔터티

| 엔터티 | 식별자 | 소유 의미 |
|---|---|---|
| `BaselineItem` | `AIF-C01-D<n>-T<n>` | 시험 기준선의 도메인·작업·기술 행 |
| `SourceRecord` | `SRC-<slug>` | 공식 출처와 확인 provenance |
| `SidebarLink` | `SIDE-<slug>` | 공식 사이드바의 링크·상위 주제·연결 출처 |

각 엔터티는 U1에 하나의 소유자를 갖는다. 파생 자료의 본문·문항·카드·퀴즈·Anki 내용은 다른 Unit이 소유한다.

## LocalValidationBoundary

### 책임

- UTF-8 및 Markdown·YAML·JSON·CSV 파싱 검사
- stable ID 형식·유일성·참조 존재성 검사
- `aws-sidebar-index.md`와 `source-registry.yaml`의 링크 집합 검사
- 정방향·역방향 traceability 비교
- 출처 상태와 파생 자료 상태의 승격 규칙 검사
- 민감정보·절대 경로·원문 통째 복제 위험 점검
- 입력·도구·판정·조치·재검사 증거의 형식 제공

### 경계

이 컴포넌트는 네트워크로 출처를 수집하거나 AWS 계정에 접속하지 않는다. URL 접근 확인이 불가능하면 `blocked` 또는 확인 필요를 반환하는 정적 검사 경계다.

## 상호작용 계약

| 제공자 | 소비자 | 계약 | 실패 동작 |
|---|---|---|---|
| `ReferenceCatalog` | 도메인 학습 Unit | stable ID·provenance·범위 연결 | 존재하지 않는 ID면 소비 자료를 `verified`로 올리지 않음 |
| `ReferenceCatalog` | U7 평가 Unit | baseline/source 연결과 범위 구분 | 연결이 끊기면 orphan으로 보류 |
| `ReferenceCatalog` | U8 품질 Unit | 검사 입력과 trace key | 검사 증거가 없으면 통합 품질 판정을 보류 |
| `LocalValidationBoundary` | U8 품질 Unit | 결정적 검사 결과와 evidence 필드 | 파싱·ID·상태 실패를 PASS로 바꾸지 않음 |

이 상호작용은 런타임 API 호출이 아니라 버전 관리형 정적 파일과 로컬 검사 결과의 소비 관계다.

## 실패 도메인과 blast radius

- `ReferenceCatalog` 파일 오류: 해당 출처·기준선과 이를 소비하는 파생 자료에 영향을 준다.
- `LocalValidationBoundary` 검사 오류: 검사 결과를 신뢰할 수 없으므로 품질 승격을 보류한다.
- U8 증거 오류: 통합 품질 보고서에 영향을 주지만 U1 canonical 파일 자체의 소유권은 바뀌지 않는다.
- 하나의 출처가 `blocked`인 경우: 그 출처에 의존하는 자료만 보류하고, 독립 출처의 상태를 임의로 낮추거나 올리지 않는다.

런타임 장애 도메인·가용 영역·리전·자동 장애 조치는 **해당 없음**이다.

## 격리와 공유 자원

U1은 파일별 canonical 계약을 유지하되, stable ID 집합과 traceability만 공유 언어로 사용한다. 공유 mutable DB, 전역 캐시, 사용자 세션, 비밀 저장소는 없다. U8은 검사 증거를 별도로 소유하고 U1 파일을 직접 수정하지 않는다.

## 검증 증거

- 각 컴포넌트의 소유 Unit과 파일·엔터티가 하나로 결정되어 있다.
- U1의 `ReferenceCatalog`와 U8의 `QualityEvidence`가 분리되어 있다.
- 런타임 서비스와 배포 자원이 논리 카탈로그에 포함되지 않는다.
- 모든 경계가 stable ID·provenance·상태·검사 결과로 표현된다.
- 실패 영향 범위와 `verified` 승격 보류 조건이 명시되어 있다.

## Assumptions & Open Questions

- U1은 `ReferenceCatalog`와 정적 검사 계약만 소유한다.
- U8은 최종 품질 증거 본문을 소유한다.
- 자동 온라인 수집·검색·API가 승인되면 별도 컴포넌트와 보안·운영 설계가 필요하다.

## Sources

- `construction/u1-baseline-and-source-registry/nfr-requirements/security-requirements.md`
- `construction/u1-baseline-and-source-registry/nfr-requirements/tech-stack-decisions.md`
- `construction/u1-baseline-and-source-registry/functional-design/functional-spec.md`
- `construction/u1-baseline-and-source-registry/functional-design/entities.md`
- `inception/domain-design/components.md`
