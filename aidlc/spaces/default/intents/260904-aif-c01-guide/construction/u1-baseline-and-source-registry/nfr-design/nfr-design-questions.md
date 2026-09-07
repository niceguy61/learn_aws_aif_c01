# U1 NFR Design 질문

## 질문 수와 근거

승인된 U1 산출물(`security-requirements.md`, `tech-stack-decisions.md`, `functional-spec.md`)이 정적 `ReferenceCatalog` 경계, 파일 포맷, 상태 전이, 로컬 검사, 실패·복구 원칙을 이미 결정하고 있습니다. 따라서 새로운 설계 결정을 묻는 추가 질문은 없습니다. 아래 요약 확인에서 이 승인된 결정을 그대로 NFR 설계로 변환할지 확인합니다.

## 기존 결정의 적용 범위

- 런타임 서비스, API, DB, AWS 계정, 배포 환경, 학습자 데이터 저장은 설계하지 않습니다.
- 적용 대상은 UTF-8 Markdown/YAML/JSON/CSV 정적 계약, 공식 출처 provenance, stable ID와 양방향 추적성, 로컬 읽기 전용 검사입니다.
- `blocked` 또는 `확인 필요` 상태는 내용을 추측하지 않고 영향 범위와 후속 확인 대상을 기록하며 `verified` 승격을 막습니다.
- 재현성은 저장소 상대 경로, 버전 관리, 결정적 파서·센서 검사, 입력·검사일·도구·판정·조치·재검사 증거로 확보합니다.
- 실행형 NFR 패턴(캐시, connection pool, circuit breaker, autoscaling, IAM, TLS 운영, CloudWatch 운영)은 U1에 해당하지 않으며 해당 없음으로 기록합니다.

## Consolidated Summary Confirmation

승인된 결정에 따라 정적 파일 무결성·출처 신뢰성·추적성·민감정보 비저장·로컬 검사 설계를 생성합니다.

- Looks correct
- Request changes

[Answer]: Looks correct
