# AIF-C01 공식 안내서 사이드바 링크 인덱스

- 기준 페이지: [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)
- 확인일: 2026-09-04
- 상태: 초안 수집 완료
- 목적: 공식 안내서의 탐색 항목과 5개 도메인 페이지를 누락 없이 추적하고, 이후 학습 문서와 연결한다.

## 1. 안내서 내부 탐색 링크

| 항목 | URL | 연결 분류 | 상태 |
|---|---|---|---|
| 서론 | [시험 안내서 서론](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html#ai-practitioner-01-intro) | FOUNDATION, EXAM | downloaded |
| 대상 응시자 설명 | [대상 응시자](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html#ai-practitioner-01-target) | FOUNDATION, EXAM | downloaded |
| 시험 콘텐츠 | [시험 콘텐츠](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html#ai-practitioner-01-exam-content) | EXAM | downloaded |
| 콘텐츠 도메인과 가중치 | [콘텐츠 도메인](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html#ai-practitioner-01-domains) | EXAM | downloaded |
| 설문 조사 | [설문 조사](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html#ai-practitioner-01-survey) | EXAM | discovered |

## 2. 도메인 링크

| 도메인 | 공식 페이지 | 가중치 | 작업 | 관련 학습 디렉터리 | 상태 |
|---|---|---:|---|---|---|
| D1 AI 및 ML의 기초 | [Domain 1](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain1.html) | 20% | 1.1 기본 AI 개념과 용어, 1.2 AI 실제 사용 사례, 1.3 ML 개발 수명 주기 | `docs/01-ai-ml-foundations/` | downloaded |
| D2 GenAI의 기초 | [Domain 2](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html) | 24% | 2.1 GenAI 기본 개념, 2.2 비즈니스 문제 해결을 위한 기능과 한계, 2.3 AWS 인프라와 기술 | `docs/02-generative-ai/` | downloaded |
| D3 파운데이션 모델의 적용 | [Domain 3](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html) | 28% | 3.1 FM 애플리케이션 설계, 3.2 프롬프트 엔지니어링, 3.3 훈련·미세 조정, 3.4 성능 평가 | `docs/03-foundation-models/` | downloaded |
| D4 책임 있는 AI | [Domain 4](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html) | 14% | 4.1 책임 있는 AI 시스템 개발, 4.2 투명하고 설명 가능한 모델 | `docs/04-responsible-ai/` | downloaded |
| D5 보안·규정 준수·거버넌스 | [Domain 5](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain5.html) | 14% | 5.1 AI 시스템 보안, 5.2 AI 시스템 거버넌스와 규정 준수 | `docs/05-security-compliance/` | downloaded |

## 3. 안내서에서 연결된 외부·배포 자료

이 링크들은 사이드바 또는 안내서의 보조 탐색 영역에서 확인되었으며, 본문 도메인 범위의 근거와 구분한다.

| 자료 | URL | 연결 분류 | 상태 |
|---|---|---|---|
| AWS Certification 시험 안내서 목록 | [Exam guides](https://docs.aws.amazon.com/aws-certification/latest/examguides/index.html) | EXAM | discovered |
| 한국어 Markdown 원문 | [AIF-C01 Markdown](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.md) | EXAM | discovered |
| PDF 시험 안내서 | [AIF-C01 PDF](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.pdf) | EXAM | discovered |
| AWS Certified AI Practitioner 자격증 페이지 | [Certification page](https://aws.amazon.com/certification/certified-ai-practitioner/) | EXAM | discovered |
| AWS Skill Builder AIF-C01 자료 | [Skill Builder](https://skillbuilder.aws/category/exam-prep/ai-practitioner-AIF-C01) | EXAM | discovered |
| 시험 일정 예약 | [Schedule exam](https://cp.certmetrics.com/amazon/en/schedule/schedule-exam) | EXAM | discovered |

## 4. 도메인 범위 핵심 추적표

상세 목표는 각 공식 도메인 페이지에서 추출해 도메인별 README와 `source-registry.yaml`의 문서 연결 항목으로 확장한다.

### D1
- AI, ML, 딥 러닝, 신경망, CV, NLP, 모델, 알고리즘, 훈련, 추론, 편향, 공정성, LLM
- AI·ML·GenAI·딥 러닝의 관계와 차이
- 배치·실시간·비동기·서버리스 추론, 데이터 유형, 지도·비지도·강화 학습
- AI/ML 사용 사례의 적합성, 회귀·분류·클러스터링, 관리형 AI/ML 서비스
- ML 파이프라인, 사전 훈련 모델·사용자 지정 모델, 프로덕션 사용, MLOps, 모델·비즈니스 지표

### D2
- 토큰, 청킹, 임베딩, 벡터, 프롬프트 엔지니어링, Transformer LLM, FM, 멀티모달·확산 모델
- 이미지·비디오·오디오 생성, 요약, 어시스턴트, 번역, 코드 생성, 에이전트, 검색·추천
- FM 수명 주기, 토큰 기반 가격, 컨텍스트 엔지니어링, 멀티 에이전트·MCP·메모리·도구·오케스트레이션
- GenAI의 장점·한계·선택 기준·비즈니스 지표
- Amazon Bedrock, SageMaker AI, SageMaker JumpStart, Amazon Q, Kiro, Strands Agents, Amazon Bedrock AgentCore 및 인프라 비용 절충

### D3
- FM 선택 기준, 추론 파라미터, RAG, 임베딩 저장 서비스, FM 사용자 지정 비용 절충, AI 에이전트
- 컨텍스트·명령·네거티브 프롬프트, zero-shot·one-shot·few-shot, 프롬프트 템플릿과 위험
- 사전 훈련·미세 조정·지속적인 사전 훈련·증류, 데이터 큐레이션·거버넌스·대표성·RL
- 인간 평가, 벤치마크, Amazon Bedrock 모델 평가, ROUGE·BLEU·BERTScore·LLM-as-a-judge
- RAG·에이전트·워크플로 평가와 생산성·참여·작업 완료율·비용 등 비즈니스 지표

### D4
- 편향성·공정성·포용성·견고성·안전성·진실성, Amazon Bedrock Guardrails
- 지속 가능성을 포함한 책임 있는 모델 선택
- 지적 재산권, 편향 출력, 신뢰 상실, 사용자 위험, 환각의 법적·비즈니스 위험
- 데이터 다양성·포용성·큐레이션·균형, 편향·분산·과적합·과소적합
- 레이블 품질, 인간 감사, 하위 그룹 분석, SageMaker Clarify·Model Monitor·Amazon A2I
- 투명성·설명 가능성, 모델 카드, 모델 평가, 오픈 소스·데이터·라이선스, 인간 중심 설계

### D5
- IAM 역할·정책·권한, 암호화, Amazon Macie, AWS PrivateLink, 공동 책임 모델
- Amazon Bedrock AgentCore Identity·정책, Amazon Bedrock Guardrails
- 출처 인용, 데이터 계보·카탈로그, SageMaker Model Cards, 데이터 품질·프라이버시·무결성
- 애플리케이션 보안, 위협 탐지, 취약성 관리, 인프라 보호, prompt injection, 암호화, DLP, 필터·검증, 감사·로깅, 독성
- 환각 탐지·RAG grounding·출력 검증·신뢰도 점수
- AWS Config, Amazon Inspector, AWS Audit Manager, AWS Artifact, AWS CloudTrail, AWS Trusted Advisor
- 데이터 수명 주기·로깅·레지던시·모니터링·관찰·보존, 정책·검토·Security Scoping Matrix·투명성·교육

## 5. 다음 수집 단계

- [ ] Markdown 원문과 PDF의 접근 가능 여부를 확인한다.
- [ ] 각 도메인 페이지의 모든 목표를 `source-registry.yaml`에 항목별로 분해한다.
- [ ] 각 목표를 하나 이상의 도메인 문서에 연결한다.
- [ ] 공식 AWS 서비스 문서의 상세 링크를 추가로 수집한다.
- [ ] 수집 자료를 그대로 복제하지 않고 한국어 학습 문서로 재구성한다.
