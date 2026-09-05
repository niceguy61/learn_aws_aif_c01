# Practices Discovery 확인 질문

## 질문 안내

다음 다섯 항목은 제품 범위가 아니라 이 저장소의 집필·검토 방식을 확정하기 위한 질문이다. 이미 승인된 AIF-C01 범위, 대상, D1→D5 순서와 산출물은 다시 묻지 않는다. 제안 기본값을 그대로 채택하려면 각 질문에서 `A`를 선택하면 된다.

## Q-PD-01 작업 방식

문서 변경을 어떻게 통합할까요?

- A. 버전 관리형 Markdown을 짧은 작업 단위로 작성하고 `main`에 통합한다. 가능하면 짧은 브랜치와 squash-merge를 사용한다.
- B. 모든 문서를 한 번에 작성한 뒤 마지막에 통합한다.
- C. 외부 문서 도구에서 작성하고 저장소에는 최종본만 복사한다.

[Answer]: A

## Q-PD-02 첫 검증 단위

전체 가이드에 앞서 작은 한 단위를 처음부터 끝까지 검증하는 방식을 사용할까요? 여기서 첫 검증 단위는 공식 출처 연결, 문서 작성, 정적 검사, 초보자 검토까지 통과한 개념 문서 한 편을 뜻한다.

- A. 사용한다. 첫 문서 수직 슬라이스를 통과시킨 뒤 D1부터 D5로 확장한다.
- B. 사용하지 않는다. 처음부터 모든 도메인을 순차 작성한다.

[Answer]: A

## Q-PD-03 검증 방식

문서를 작성한 뒤 검증하는 방식(`test-after`)을 어떻게 적용할까요?

- A. `Methodology: test-after`로 확정하고, 문서 작성 후 Markdown·front matter·내부 링크·출처·공식 항목 추적·초보자 관점·종합 누락 검사를 실행한다.
- B. 형식 검사만 실행하고 출처·초보자 검토는 최종 단계에서만 실행한다.
- C. 문서별 검증 없이 전체 완성 후 한 번만 검토한다.

[Answer]: A

## Q-PD-04 전달 기준

이 프로젝트에는 애플리케이션의 staging·production 배포가 없습니다. 문서 산출물의 전달 기준을 어떻게 둘까요?

- A. 애플리케이션 배포는 해당 없음으로 두고, `main` 통합과 필수 정적 검증 통과를 전달 기준으로 삼는다.
- B. 별도의 staging·production 문서 사이트를 운영 대상으로 추가한다.
- C. 검증 없이 작성된 파일을 즉시 전달한다.

[Answer]: A

## Q-PD-05 문서 작성 규칙

문서 형식과 표현 규칙을 어떻게 확정할까요?

- A. UTF-8 Markdown, 영문 소문자·숫자·하이픈 파일명, 짧은 문단·명확한 제목·제한적 표를 사용하고, 한국어 prose와 AWS 고유 표기를 구분한다.
- B. 도메인마다 형식과 파일명 규칙을 다르게 허용한다.
- C. 외부 렌더러가 있어야만 읽을 수 있는 형식을 사용한다.

[Answer]: A

## 사용자 추가 기록 — 승인됨

> 기존 Q-PD-01부터 Q-PD-05까지의 다섯 `[Answer]: A`는 변경하지 않는다.

- **사용자 추가**: 자유 형식에 Mermaid와 AWS 사이트 내 공식 이미지를 추가하고 싶습니다.
- **적용 대상**: `Code Style` 및 `Testing Posture` 실천.
- **결정**: Mermaid는 학습을 실질적으로 개선할 때만 사용하고, 가까운 일반 텍스트 또는 Markdown 설명·구문 검증·단순한 모바일 친화 구조를 함께 요구한다. AWS 호스팅 공식 이미지는 출처 페이지, 직접 이미지·원본 URL, 제목, 접근일, 저작자 표시와 재사용·사용 조건을 `sources/`에 기록할 때만 사용한다. 모든 이미지에는 의미 있는 한국어 alt text, 캡션 또는 주변 설명, 텍스트 대체 경로를 두며 원격 접근성을 확인한다. AWS 공식 이미지와 자체 설명용 다이어그램을 구분하고 AWS 보증으로 오해하게 만들지 않는다.

## Assumptions & Open Questions

None.

## Sources

- `team-practices.md` — Practices Discovery 리드 제안.
- `contributions/aidlc-quality-agent.md` — 품질 검토.
- `contributions/aidlc-developer-agent.md` — 구조·형식 검토.
- `contributions/aidlc-devsecops-agent.md` — 출처·보안·공급망 검토.
- `aidlc/spaces/default/memory/org.md` — 조직 기본 관행.

## Consolidated Summary

- 다섯 실천 영역은 짧은 버전 관리형 Markdown 작업, 첫 문서 수직 슬라이스, `test-after`, 정적 검증 후 `main` 통합, UTF-8 한국어 Markdown 규칙으로 확정되었다.
- Mermaid는 학습 효과가 있을 때 사용하며 구문 검증·모바일 가독성·일반 텍스트 또는 Markdown fallback을 함께 적용한다.
- AWS 호스팅 공식 이미지는 출처·직접 이미지 또는 원본 URL·제목·접근일·저작자 표시·재사용 및 사용 조건을 기록할 수 있을 때만 사용한다.
- 이미지에는 의미 있는 한국어 alt text, 캡션 또는 주변 설명, 텍스트 대체 경로와 원격 접근성 검사를 적용하며 AWS 보증으로 오해되지 않게 한다.
- 위 규칙은 AIF-C01 범위나 학습 목표를 변경하지 않고 문서 작성·검토 품질 기준만 확장한다.

## Consolidated Summary Confirmation

- Looks correct
- Request changes

[Answer]: Looks correct

