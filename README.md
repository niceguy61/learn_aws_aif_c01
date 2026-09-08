# 📘 AWS Certified AI Practitioner (AIF-C01) 한국어 공부자료집

<p align="center">
  <a href="https://www.credly.com/org/amazon-web-services/badge/aws-certified-ai-practitioner">
    <img src="./assets/aif-c01-badge.png" alt="AWS Certified AI Practitioner(AIF-C01) 배지" width="180">
  </a>
  <a href="https://kiro.dev/">
    <img src="./assets/kiro.svg" alt="Kiro 아이콘" width="96">
  </a>
</p>

<p align="center">
  <strong>✅ AIF-C01 학습자료집</strong> · <strong>🤖 Kiro로 작업</strong>
</p>

아이콘 출처: [AWS Certified AI Practitioner 공식 배지](https://www.credly.com/org/amazon-web-services/badge/aws-certified-ai-practitioner) · [Kiro 아이콘 및 LobeHub Icons 라이선스](https://github.com/lobehub/lobe-icons) (MIT)

**AWS Certified AI Practitioner(AIF-C01) 합격을 목표로 하는 입문자용 한국어 학습 자료집**입니다. AI·ML·생성형 AI의 핵심 개념을 이해하고, AWS 서비스와 사용 사례를 연결하며, 시험 시나리오에서 적절한 선택지를 판단하는 것을 목표로 합니다.

> ⚠️ 이 저장소는 개인 학습을 위해 AWS 공식 학습 자료를 바탕으로 재구성한 비공식 자료입니다. 실제 시험 문제를 복제하거나 제공하지 않으며, 서비스 기능·요금·리전·시험 범위처럼 변경될 수 있는 내용은 공식 출처에서 다시 확인하세요.

## 🤖 Kiro로 작업되었습니다

이 프로젝트는 **Kiro**를 활용해 학습 범위 조사, 문서 구조화, 개념별 Markdown 작성, 복습 자료 정리 과정을 진행했습니다.

## 🎯 학습 목표

- AI, 머신 러닝(ML), 딥 러닝, 생성형 AI(GenAI), 파운데이션 모델(FM)의 관계를 설명합니다.
- 지도 학습·비지도 학습·강화 학습과 주요 AI 사용 사례를 구분합니다.
- 토큰, 임베딩, 벡터, 프롬프트, RAG, 에이전트 같은 생성형 AI 용어를 연결합니다.
- 요구사항에 따라 AWS AI/ML 서비스를 선택하고 비슷한 서비스와 구분합니다.
- 모델 선택, 프롬프트 엔지니어링, 사용자 지정, 평가, 비용·성능·안전성의 절충을 판단합니다.
- 시험 문제의 조건과 단서를 읽고 정답을 선택하는 사고 순서를 연습합니다.

## 🎓 강의 출처

이 학습자료집의 기본 강의 출처는 AWS Skill Builder의 다음 학습 계획입니다.

- [AWS Skill Builder — Exam Prep Plan: AWS Certified AI Practitioner (AIF-C01)](https://skillbuilder.aws/learning-plan/3NRN71QZR2/exam-prep-plan-aws-certified-ai-practitioner-aifc01--/7CBH25H7MX)

학습자료는 강의 내용을 그대로 옮기지 않고, 초보자가 복습하기 쉽도록 개념 설명·비교·시나리오·확인 질문의 형태로 재구성합니다. 공식 시험 범위의 근거가 필요한 경우 [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)를 함께 확인하세요.

## 🗂️ Contents

강의와 조사 내용을 정리한 학습 콘텐츠는 아래 디렉터리에서 확인할 수 있습니다.

- **[Contents 전체 보기](./Contents/)**
- [D1 — AI 및 ML의 기초](./Contents/D1/README.md)
- [D2 — GenAI의 기초](./Contents/D2/README.md)
- [D3 — 파운데이션 모델의 적용](./Contents/D3/README.md)
- [D4 — 책임 있는 AI에 대한 가이드라인](./Contents/D4/README.md)
- [D5 — AI 솔루션의 보안, 규정 준수 및 거버넌스](./Contents/D5/README.md)

`Contents/`에는 `D1`~`D5` 도메인, Task, Part/Intro/Ref 학습 문서가 있습니다. 각 학습 문서는 원본 `docs/Refs/` 링크와 Mermaid 복습 도식을 포함합니다. 기존 `docs/Refs` 57개 원본은 수정·삭제·이동하지 않습니다.

## 📚 학습 문서 바로가기

| 순서 | 영역 | 내용 |
|---|---|---|
| 1 | [D1 — AI 및 ML의 기초](./Contents/D1/README.md) | AI·ML·딥러닝·GenAI 관계, 데이터와 학습 유형, ML 수명 주기 |
| 2 | [D2 — GenAI의 기초](./Contents/D2/README.md) | GenAI 핵심 개념, 기능과 한계, AWS 인프라와 비용 |
| 3 | [D3 — 파운데이션 모델의 적용](./Contents/D3/README.md) | FM 설계, 프롬프트·RAG, 사용자 지정, 성능 평가 |
| 4 | [D4 — 책임 있는 AI에 대한 가이드라인](./Contents/D4/README.md) | 공정성, 위험 측정·완화, 투명성, 인간 검토 |
| 5 | [D5 — AI 솔루션의 보안, 규정 준수 및 거버넌스](./Contents/D5/README.md) | IAM, 암호화, 네트워크, 감사, 거버넌스 |

### 추천 학습 순서

1. [D1](./Contents/D1/README.md)에서 AI·ML 기본 용어와 학습 유형을 익힙니다.
2. [D2](./Contents/D2/README.md)에서 생성형 AI의 핵심 개념과 한계를 이해합니다.
3. [D3](./Contents/D3/README.md)에서 파운데이션 모델 적용 방식을 비교합니다.
4. [D4](./Contents/D4/README.md)에서 책임 있는 AI와 인간 검토를 학습합니다.
5. [D5](./Contents/D5/README.md)에서 보안·규정 준수·거버넌스 흐름을 정리합니다.
6. 공식 시험 안내서와 AWS Skill Builder 강의에서 최신 범위와 표현을 최종 확인합니다.

각 도메인 README에서 Task 인덱스를 선택하고, 각 문서의 이전·인덱스·다음 링크로 순서대로 학습하세요.

## 🧭 AIF-C01 공식 도메인

현재 시험 안내서의 학습 기준은 다음 다섯 도메인입니다. 괄호 안의 비중은 공식 시험 안내서 기준이며, 변경될 수 있으므로 응시 전에 공식 페이지에서 다시 확인하세요.

| 도메인 | 공식 영역 | 비중 |
|---|---|---:|
| D1 | AI 및 ML의 기초 | 20% |
| D2 | GenAI의 기초 | 24% |
| D3 | 파운데이션 모델의 적용 | 28% |
| D4 | 책임 있는 AI에 대한 가이드라인 | 14% |
| D5 | AI 솔루션의 보안, 규정 준수 및 거버넌스 | 14% |

- [AIF-C01 공식 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)
- [AWS Certification — AWS Certified AI Practitioner](https://aws.amazon.com/certification/certified-ai-practitioner/)

## 📝 자료의 원칙

- 처음 등장하는 전문 용어는 한국어 설명과 영어 원어를 함께 제공합니다.
- 정의만 나열하지 않고 쉬운 비유, AWS 사용 맥락, 비슷한 개념과의 차이를 함께 설명합니다.
- 시험 범위와 AWS 실무 확장 내용을 구분합니다.
- 자체 문제는 공식 시험 문제를 복제하지 않고, 개념과 시나리오 판단을 연습하도록 작성합니다.
- 모델명·기능·요금·리전·할당량처럼 변할 수 있는 정보는 확인 날짜와 공식 링크를 기록합니다.
- 출처가 확인되지 않은 사실은 단정하지 않고 `확인 필요`로 표시합니다.

## 🙌 AWSKRUG와 함께 공부하기

혼자 공부한 내용을 공유하고 AWS 커뮤니티의 경험을 함께 배워 보세요. 아래 채널을 통해 학습 자료와 자격증 준비 경험을 나누고, 관련 모임에 참여할 수 있습니다.

- **AWSKRUG 홍보**: [AWS Korea User Group(AWSKRUG) GitHub](https://github.com/awskrug)에서 다양한 지역·주제별 AWS 커뮤니티 활동과 공개 자료를 만나 보세요.
- **awskrug cert 채널 Slack 홍보**: [awskrug Slack의 `#cert` 채널](https://awskrug.slack.com/archives/cert)에서 AWS 자격증 공부법, 시험 준비 경험, 학습 자료를 함께 나눠 보세요. Slack 워크스페이스 로그인 또는 가입이 필요할 수 있습니다.
- **밋업 홍보**: [AWSKRUG Meetup 이벤트](https://www.meetup.com/awskrug/events/)에서 AWSKRUG의 발표·스터디·네트워킹·핸즈온 일정을 확인하고 참여해 보세요.

> 💬 이 자료집을 공부하며 알게 된 내용이나 오류를 `#cert` 채널과 AWSKRUG 밋업에서 공유해 주세요. 함께 질문하고 설명하는 과정이 가장 좋은 복습이 될 수 있습니다.

## 🛠️ 저장소 구조

```text
.
├── Contents/
│   ├── D1/                    # AI 및 ML의 기초
│   ├── D2/                    # GenAI의 기초
│   ├── D3/                    # 파운데이션 모델의 적용
│   ├── D4/                    # 책임 있는 AI에 대한 가이드라인
│   └── D5/                    # 보안·규정 준수·거버넌스
├── docs/
│   └── Refs/                  # 변경하지 않는 원본 57개
├── sources/                   # 공식 출처 링크와 추적 정보
├── plans/                     # 목차·질문·결정 사항
└── aidlc/                     # AI-DLC 작업 상태와 산출물
```

## ⚠️ 학습 전 확인

- AWS Skill Builder 강의와 AWS Certification 공식 시험 안내서가 최신인지 먼저 확인하세요.
- AWS 계정이 필요한 실습은 비용이 발생할 수 있으므로 리소스 생성·삭제와 요금 정책을 확인하세요.
- 시험 합격을 보장하는 자료가 아니며, 최종 학습 범위와 시험 운영 정보는 AWS Certification 공식 안내를 기준으로 삼으세요.
- 문서에 포함된 링크와 서비스 설명은 작성 시점의 정보일 수 있습니다.

## 📣 함께 개선하기

오류, 깨진 링크, 이해하기 어려운 설명, 추가로 필요한 예시가 있다면 Issue 또는 Pull Request로 알려 주세요. 제안할 때는 다음 정보를 함께 적어 주면 반영하기 쉽습니다.

1. 문제가 있는 문서 경로
2. 문제가 되는 문장 또는 링크
3. 왜 혼동되는지
4. 가능한 경우 공식 AWS 출처

## 🔗 주요 출처

- [AWS Skill Builder AIF-C01 Exam Prep Plan](https://skillbuilder.aws/learning-plan/3NRN71QZR2/exam-prep-plan-aws-certified-ai-practitioner-aifc01--/7CBH25H7MX)
- [AWS Certified AI Practitioner(AIF-C01) 시험 안내서](https://docs.aws.amazon.com/ko_kr/aws-certification/latest/ai-practitioner-01/ai-practitioner-01.html)
- [AWS Certification — AWS Certified AI Practitioner](https://aws.amazon.com/certification/certified-ai-practitioner/)
- [AWSKRUG GitHub](https://github.com/awskrug)
- [AWSKRUG Slack `#cert`](https://awskrug.slack.com/archives/cert)
- [AWSKRUG Meetup](https://www.meetup.com/awskrug/events/)

---

📘 **AIF-C01을 함께 공부하고, 🤖 Kiro로 더 나은 학습 자료를 만들어 갑니다.**
