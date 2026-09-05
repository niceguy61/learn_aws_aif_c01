# U1 보안 요구사항

## 목적과 범위

U1 `u1-baseline-and-source-registry`는 실행형 애플리케이션이 아니라 공식 AIF-C01 기준선과 출처 메타데이터를 `sources/`의 정적 Markdown·YAML·JSON·CSV 계약으로 제공한다. 따라서 보안 요구사항은 AWS 계정, API, DB, 배포 환경의 보안 설정이 아니라 파일 무결성, 출처 신뢰성, 민감정보 비저장, 추적성 오용 방지, 재현 가능한 로컬 검사에 초점을 둔다.

U1은 `ReferenceCatalog`의 `BaselineItem`, `SourceRecord`, `SidebarLink`만 소유한다. 학습 문서와 문제·카드·퀴즈·Anki 본문은 다른 Unit이 소유하며 U1은 안정 ID와 상태·출처 연결만 제공한다.

## 보안 요구사항

모든 상세 요구사항 ID는 승인된 상위 NFR에서 파생되었다. `NFRx.y`는 U1 구현·검사 수준의 요구사항이며, 기준선이 확인되지 않은 경우 `verified` 승격을 허용하지 않는다.

| ID | 요구사항 | 검증 증거 | 관련 규칙·AC |
|---|---|---|---|
| NFR3.1 | `BaselineItem.baseline_id`, `SourceRecord.source_id`, `SidebarLink.link_id`는 각각 유일해야 하며, `AIF-C01-D<n>-T<n>`, `SRC-<slug>`, `SIDE-<slug>` 형식을 보존한다. ID는 URL이나 표시 제목으로 대체하지 않는다. | 중복·형식·참조 무결성 검사 결과 | BR1.1, BR1.7; AC1.1.1, AC1.1.3 |
| NFR3.2 | 기준선·출처·사이드바 링크와 파생 자료의 연결은 stable ID를 양방향으로 기록한다. 존재하지 않는 ID, URL만 있는 연결, 한쪽에만 있는 연결은 검사 실패로 처리한다. | `sources/content-traceability.yaml`의 정방향·역방향 비교 | BR1.3, BR1.7; AC1.1.3 |
| NFR4.1 | 모든 `BaselineItem`과 `SourceRecord`는 공식 URL, 공식 제목, `source_revision` 또는 `revision_title`, `checked_date`/`source_checked`, 접근 상태를 가져야 한다. | 필수 키·날짜 형식·허용 enum 검사 | BR1.2; AC1.1.1, AC1.1.2 |
| NFR4.2 | `blocked` 또는 `확인 필요` 출처·기준선은 차단 사유, 영향받는 자료, 후속 확인 대상을 `notes`에 남기며 관련 파생 자료를 `verified`로 표시하지 않는다. | 상태 전이·notes·파생 상태 대조 | BR1.5; AC1.1.4 |
| NFR4.3 | 공식 링크의 제목·상위 주제·출처 유형·도메인 매핑·확인일·접근 상태를 `sources/source-registry.yaml`에서 재현할 수 있어야 한다. | `aws-sidebar-index.md`와 registry URL 집합 비교 | BR1.6; AC1.1.3 |
| NFR7.1 | U1의 파일, 예시, 로그, 출처 메타데이터에는 자격 증명, 토큰, API 키, 비밀번호, 실제 계정 식별자, 개인 식별 정보(PII), 결제·건강정보를 기록하거나 배포하지 않는다. | 민감정보 패턴 검사와 수동 검토 기록 | AC1.1.2, AC1.1.3 |
| NFR7.2 | 공식 URL과 공개 문서 메타데이터만 저장하고 AWS API 호출, 계정 인증, 비밀 저장소, 학습자 답안·진도 저장을 사용하지 않는다. | 의존성·코드·파일 범위 점검 | BR1.8; AC1.1.2 |
| NFR8.1 | 기준선과 실무 확장은 각각 `시험 범위` 또는 관련 `AIF-C01-D<n>-T<n>`를 앞세운 `실무 확장`으로 구분하고, 차단·미확인 사실은 `verified`로 표현하지 않는다. | 범위 표지 및 상태 승격 검사 | BR1.5, BR1.7; AC1.1.4 |
| NFR8.2 | U1이 참조하는 원문은 통째로 복제하지 않고 출처 URL·제목·확인일과 짧은 메타데이터만 보존한다. | 원문 복사·링크 누락 검토 | FR5.4; AC1.1.4 |
| NFR6.1 | 모든 Markdown·YAML·JSON·CSV는 UTF-8로 저장하고, YAML·JSON은 파싱 가능하며 CSV는 헤더·구분자·quoting·개행을 일반 파서로 읽을 수 있어야 한다. | 인코딩·파싱·구조 검사 | AC1.1.2, AC1.1.3 |
| NFR2.1 | Markdown 제목 계층, 링크 문구, 표의 의미는 일반 Markdown 뷰어와 GitHub-Flavored Markdown에서 읽을 수 있어야 한다. Mermaid를 사용하는 경우 외부 렌더러 없이 동일한 의미를 전달하는 텍스트 설명을 가까이에 둔다. | 두 뷰어 점검, Mermaid 구문·텍스트 fallback 점검 | AC1.1.2 |
| NFR3.3 | 검사 결과는 입력 파일, 검사일, 도구 또는 검사자, 판정, 발견 항목, 조치, 재검사 결과를 포함해 동일 입력에서 반복 가능해야 한다. | U8 품질 증거로 연결되는 정적 검사 기록 | AC1.1.3; BR1.8 |

## 접근 제어와 변경 무결성

U1은 런타임 접근 제어를 구현하지 않는다. 대신 저장소의 코드 리뷰·승인·버전 관리 경계를 변경 제어로 사용한다. `sources/` 파일을 변경할 때 변경된 URL, 기준선 ID, 상태, 양방향 연결과 검사 증거를 함께 검토해야 한다.

정적 파일 무결성은 다음 규칙으로 보장한다.

1. 파일은 저장소의 상대 경로로만 참조하고, 로컬 절대 경로·사용자 홈 경로·임시 파일 경로를 계약에 기록하지 않는다.
2. `source_id`와 `baseline_id`는 기존 의미를 임의로 재사용하거나 재번호화하지 않는다. 시험 revision 변경은 새 확인 증거와 차이 기록을 남긴다.
3. URL은 보조 메타데이터다. URL 변경이나 동일 URL의 제목 차이는 `source_id`와 `notes`로 추적하며 URL만으로 연결을 복구하지 않는다.
4. 검사는 원격 서비스에 업로드하지 않고 로컬 파일을 읽기 전용으로 분석한다. 네트워크가 필요한 URL 확인이 실패하면 내용을 추측하지 않고 `blocked` 또는 `확인 필요`로 남긴다.
5. 검사 도구 자체의 변경도 버전 관리 대상이며, 사용한 도구와 실행 시점을 품질 기록에 남긴다.

## 출처·컴플라이언스 처리

공식 AIF-C01 시험 안내서는 시험 범위를 결정하는 1차 근거다. AWS 문서, AWS 공식 블로그, AWS Skill Builder는 학습 해설을 보완하는 출처로 유형을 구분한다. 출처의 접근 상태와 문서 상태는 서로 다른 enum이며 혼용하지 않는다.

- `discovered → downloaded → summarized → reviewed → verified`는 출처 확인 수준이다.
- `blocked`는 접근 또는 내용 확인이 되지 않은 상태다.
- 문서의 `draft|review|verified`는 파생 문서의 집필 검토 상태다.
- 출처 또는 기준선이 `blocked`/`확인 필요`이면 파생 자료는 `verified`가 될 수 없다. `확인 필요`는 enum 값이 아니라 notes에 기록하는 보류 라벨이다.

U1은 법률·규제 적합성을 선언하지 않는다. 규정명이나 AWS 기능의 변동 가능한 사실을 기록할 때는 공식 URL, 제목, 확인일, 접근 상태와 범위 분류를 함께 남기며, 전문적인 법률 판단은 범위 밖으로 둔다.

## 해당 없음으로 기록하는 보안 항목

| 항목 | U1 판정 | 근거 |
|---|---|---|
| 사용자 인증·인가 | 해당 없음 | 실행형 사용자 기능이나 API가 없다. 저장소 변경 권한은 개발 플랫폼의 기존 권한 경계가 담당한다. |
| AWS IAM·KMS·Secrets Manager | 해당 없음 | AWS 계정, 비밀, 암호화 키를 사용하거나 생성하지 않는다. |
| 네트워크·방화벽·TLS 운영 | 해당 없음 | 런타임 요청과 배포 환경이 없다. 출처 URL 확인은 작성 시점의 공개 웹 접근 확인일 뿐 서비스 통신 계약이 아니다. |
| 데이터베이스·백업·보존 정책 | 해당 없음 | 기준선과 추적성은 버전 관리형 정적 파일이며 학습자 데이터 저장이 없다. |
| 런타임 취약점·컨테이너 이미지 | 해당 없음 | 애플리케이션 런타임, 패키지 이미지, 서버 프로세스를 만들지 않는다. |
| 온라인 최신성 모니터링 | 해당 없음 | 자동 정기 수집은 승인 범위 밖이다. 다음 수동 확인 시 상태와 확인일을 갱신한다. |

## 실패 처리와 복구

파싱 실패, 중복 ID, orphan 연결, 잘못된 상태, 민감정보 발견, UTF-8 오류가 있으면 해당 변경은 `verified` 승격과 다음 Unit 소비를 보류한다. 수정 후 동일 입력과 동일 검사 명령을 다시 실행하고, 실패 원인·수정·재검사 결과를 품질 증거에 기록한다. 원격 출처가 열리지 않는 경우에는 대체 URL을 임의로 선택하지 않고 차단 상태와 영향 범위를 기록한다.

## Sources

- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/requirements-analysis/requirements.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/user-stories/stories.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/inception/units-generation/unit-of-work-story-map.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/entities.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/rules.md`
- `aidlc/spaces/default/intents/260904-aif-c01-guide/construction/u1-baseline-and-source-registry/functional-design/functional-spec.md`

## Assumptions & Open Questions

- 공식 AIF-C01 revision·작업·기술 행의 실제 값은 기준선 등록 작업에서 공식 페이지를 확인한 뒤 채운다. 확인 전에는 추측하지 않는다.
- 현재 U1에는 런타임·배포·학습자 데이터가 없다는 승인된 경계를 적용했다.
- U8이 최종 품질 검사 증거를 소유하므로 U1은 검사 규칙과 필요한 증거 필드를 제공하고 품질 보고서 본문을 대신 소유하지 않는다.
