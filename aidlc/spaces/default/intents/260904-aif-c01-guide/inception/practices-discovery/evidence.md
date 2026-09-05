# Practices Discovery 근거

> 상태: `affirmed` — 사용자 인터뷰와 리드·지원 검토를 최종 통합했다.
> 통합 요약 확인: `Looks correct`

## 프로젝트 판정

- **프로젝트 유형**: Greenfield.
- **활성 범위**: `aif-c01-korean-guide-comprehensive`.
- **작업 대상**: 애플리케이션이 아닌 정적 한국어 Markdown 학습 가이드.
- **최종 결정**: 다섯 실천 영역 모두 사용자의 A 선택으로 확정되었다.

## 인터뷰 답변 기록

| ID | 결정 영역 | 사용자 답변 | 확정 내용 |
|---|---|---|---|
| Q-PD-01 | 작업 방식 | A | 짧은 작업 단위의 버전 관리형 Markdown, 짧은 브랜치, 가능한 squash-merge, `main` 통합 |
| Q-PD-02 | 첫 검증 단위 | A | 공식 출처부터 초보자 검토까지 통과하는 첫 문서 수직 슬라이스 |
| Q-PD-03 | 검증 방식 | A | `Methodology: test-after`; 작성 후 Markdown·front matter·링크·출처·범위·초보자·누락 검사를 수행 |
| Q-PD-04 | 전달 기준 | A | 애플리케이션 배포는 해당 없음; 필수 검증 통과와 `main` 통합을 전달 경계로 사용 |
| Q-PD-05 | 문서 작성 규칙 | A | UTF-8 Markdown, 영문 소문자·숫자·하이픈 명명, 짧은 문단·명확한 제목·제한적 표, 한국어 prose와 AWS 고유 표기 구분 |

## 사용자 추가 기록

- **상태**: 승인됨
- **사용자 추가**: 자유 형식에 Mermaid와 AWS 사이트 내 공식 이미지를 추가한다.
- **적용 실천**: `Code Style`, `Testing Posture`
- **반영 결정**: Mermaid는 학습 효과가 있을 때만 사용하고 일반 텍스트·Markdown 설명, 구문 검증, 단순성과 모바일 가독성을 요구한다. AWS 호스팅 공식 이미지는 출처·직접 이미지 또는 원본 URL·제목·접근일·저작자 표시·재사용 및 사용 조건을 `sources/`에 기록할 때만 사용하며, 이미지별 한국어 alt text·캡션 또는 주변 설명·텍스트 대체 경로·원격 접근성 검사를 적용한다. AWS 공식 이미지와 자체 설명용 다이어그램을 분리하고 AWS 보증으로 오해되지 않게 한다.

## 지원 근거

| 근거 | 확인 내용 | 반영 위치 |
|---|---|---|
| `team-practices.md` 리드 초안 | Greenfield 정적 문서 프로젝트에 trunk-based 작업, 첫 문서 수직 슬라이스, `test-after`, 애플리케이션 배포 해당 없음, Markdown 규칙을 제안했다. | 다섯 확정 섹션 |
| `contributions/aidlc-quality-agent.md` | 문서 구조·front matter·내부 링크·용어 연결·출처·공식 범위 양방향 추적·초보자 검토·UTF-8·CSV·차단 출처 처리를 품질 게이트로 고정해야 한다고 검토했다. | `Testing Posture`, `discovered-rules.md` |
| `contributions/aidlc-developer-agent.md` | 파일명·README 역할·문서 ID와 출처 ID·front matter·문서-출처 추적·검사 기준의 일관성을 구체화해야 한다고 검토했다. | `Way of Working`, `Testing Posture`, `Code Style` |
| `contributions/aidlc-devsecops-agent.md` | 출처 인벤토리, 차단 출처 기록, 비밀·PII 회피, 도구·공급망 검증, 병합 전 품질 게이트가 필요하다고 검토했다. | `Testing Posture`, `discovered-rules.md` |
| `aidlc/spaces/default/memory/org.md` | trunk-based, walking skeleton, `test-after`, 배포, 코드 스타일의 조직 기본값을 확인했다. | 확정 실천의 기준 근거 |
| `practices-discovery-questions.md` | 다섯 질문의 완료된 `[Answer]`가 모두 A임을 확인했다. | 인터뷰 답변 기록 |
| 사용자 추가 기록 | Mermaid와 AWS 호스팅 공식 이미지 사용을 `Code Style` 및 `Testing Posture`에 추가하도록 승인했다. Mermaid 구문·가독성·텍스트 설명 검증, 이미지 출처·권리·alt text·캡션·텍스트 대체·원격 접근성 검사를 요구한다. | `team-practices.md`, `discovered-rules.md`, `practices-discovery-questions.md` |

## 확정 품질 게이트

1. Markdown 기본 형식, 제목 계층, 필수 섹션, YAML front matter와 허용 상태값을 검사한다.
2. UTF-8 인코딩, 파일명·디렉터리명, CSV 형식·구조를 검사한다.
3. 내부 링크, 다음 문서 연결, 용어 사전 연결이 실제 대상과 일치하는지 검사한다.
4. `sources/`와 `source-registry.yaml`의 URL·제목·확인 날짜·접근 상태·연결 문서를 문서 본문과 대조한다.
5. AIF-C01 공식 시험 안내서의 D1~D5 모든 작업·기술 항목을 문서 또는 명시적인 `해당 없음`·`확장` 기록과 양방향으로 추적한다.
6. 공식 범위와 실무 확장, 공식 사실과 학습자용 해설·예시를 구분한다.
7. 초보자 관점에서 선수 지식, 쉬운 예시, 서비스 선택 단서, 비교, 시나리오, 오해 교정, 확인 질문을 검토한다.
8. 비밀·자격 증명·토큰·실제 PII·실제 AWS 계정 식별자가 없는지 확인한다.
9. 차단·동적·인증 필요 등으로 확인하지 못한 출처는 `blocked` 또는 확인 필요와 사유를 기록하며 `verified`로 승격하지 않는다.
10. Mermaid 다이어그램은 학습 효과가 있는지 확인하고, 문서를 `verified`로 표시하기 전에 구문을 검증하며 단순성과 모바일 가독성을 검사한다.
11. 모든 Mermaid 다이어그램 가까이에 일반 텍스트 또는 Markdown 설명이 있는지 확인하여 핵심 의미가 외부 렌더러에 의존하지 않게 한다.
12. AWS 호스팅 공식 이미지는 출처 페이지, 직접 이미지·원본 URL, 제목, 접근일, 저작자 표시와 재사용·사용 조건이 `sources/`에 기록되었는지 확인하고, 권리나 조건이 불명확하면 다운로드·재배포하지 않는다.
13. 모든 이미지의 의미 있는 한국어 alt text, 캡션 또는 주변 설명, 텍스트 대체 경로와 원격 이미지 접근 가능 여부를 확인하며, URL 차단·변경 시에도 대체 경로가 유지되는지 검사한다.
14. AWS 공식 이미지와 가이드 자체 설명용 다이어그램이 구분되어 있고, 이미지나 색상만으로 주장하지 않으며 AWS 보증으로 오해될 표현이 없는지 검토한다.

## 최종 통합 상태

- 다섯 실천은 모두 `affirmed` 상태다.
- 사용자 추가 사항도 승인되어 `Code Style` 및 `Testing Posture`에 통합했다.
- 사용자 결정과 지원 근거는 이 파일에 기록했다.
- 이 단계에서는 구현 아키텍처나 새로운 제품 범위를 추가하지 않았다.
- `memory/team.md`와 `memory/project.md`는 이 단계에서 직접 수정하지 않았다.
