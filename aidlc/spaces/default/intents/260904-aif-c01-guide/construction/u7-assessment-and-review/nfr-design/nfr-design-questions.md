---
title: "U7 NFR 설계 질문지"
unit: "u7-assessment-and-review"
stage: "nfr-design"
status: "draft"
---

# U7 NFR 설계 질문지

## 질문 목적

U7은 문제은행·점수 워크시트·카드·용어 퀴즈·Anki CSV를 제공하는 정적 `packaging` Unit이다. 이 질문지는 실행형 기능을 추가하지 않고, 정적 자료의 비수집 경계·추적성·접근성·다음 품질 단계 handoff를 확정하기 위한 것이다.

## Q1. no-runtime 점수 워크시트 경계

점수 워크시트는 학습자가 답안·정답 수·미응답 수를 로컬에서 수기로 계산하는 Markdown 안내만 제공하고, 자동 채점·브라우저 저장·API·DB·로그인·learner state 저장은 만들지 않는 것으로 유지할까요? 이 결정은 U7의 실행 경계를 고정합니다.

- A. 유지한다: 정적 산식과 로컬 수기 기록만 제공한다.
- B. 로컬 파일에 점수 저장 기능까지 추가한다.
- C. 브라우저에서 자동 채점하되 서버 저장은 하지 않는다.
- D. API·DB를 사용한 학습자 진도 저장을 추가한다.
- E. 범위를 다르게 정한다.
- F. Other (please specify)

[Answer]:

## Q2. 합성 문항·해설과 민감정보

문항·정답·오답 해설·카드 설명·용어 퀴즈는 실제 학습자나 계정의 데이터를 사용하지 않고 합성 예시만 사용하며, 실제 100문항 이상은 후속 콘텐츠 단계에서 출처와 기준선을 확인한 뒤 작성하는 것으로 확정할까요?

- A. 확정한다: 현재 단계에서는 계약과 안전 규칙만 설계하고 실제 문항은 생성하지 않는다.
- B. 실제 학습자 답안 예시를 익명화하여 포함한다.
- C. 실제 AWS 계정·리소스·로그 예시를 포함한다.
- D. 현재 단계에서 일부 실제 문항을 먼저 생성한다.
- E. 범위를 다르게 정한다.
- F. Other (please specify)

[Answer]:

## Q3. stable ID와 기준선 ID

문제 `Q-<n>`, 워크시트 `SCORE-<slug>`, 카드 `CARD-<slug>`, 용어 퀴즈 `TQ-<n>`, Anki 행 `ANKI-<n>`, 기준선 `AIF-C01-D<n>-T<n>`의 ID를 downstream 개정 때도 임의 변경하지 않고 중복 없이 유지할까요? 이 결정은 문항·카드·퀴즈·Anki 행의 재추적을 가능하게 합니다.

- A. 유지한다: 기존 ID를 보존하고 새 항목에만 새 ID를 부여한다.
- B. 내용 개정마다 ID를 새로 부여한다.
- C. 기준선 ID만 유지하고 downstream ID는 자유롭게 바꾼다.
- D. 파일 위치를 ID로 대신한다.
- E. 다른 안정 ID 규칙을 채택한다.
- F. Other (please specify)

[Answer]:

## Q4. U1 기준선·출처 양방향 handoff

U1의 `sources/content-traceability.yaml`이 제공할 `BaselineItem`의 `baseline_id`, `source_id`, `source_revision`, `status`, `learning_document_ids`, `question_ids`, `card_ids`, `quiz_ids`, `anki_ids`와 U7 항목의 `baseline_ids`, `source_ids`, `forward_refs`, `reverse_refs`를 서로 대조하는 양방향 handoff를 사용하고, U1 manifest와 downstream 자료가 생기기 전에는 해당 검사를 `Deferred`로 둘까요?

- A. 확정한다: U1이 기준선·출처를 소유하고 U7은 정방향·역방향 참조를 소비한다.
- B. U7이 기준선과 출처 manifest를 복제하여 별도로 소유한다.
- C. U7 항목은 출처 링크만 갖고 기준선 역방향 매핑은 생략한다.
- D. U1 manifest 없이 파일명과 제목으로만 연결한다.
- E. 다른 handoff 계약을 정한다.
- F. Other (please specify)

[Answer]:

## Q5. scope classification

각 문제·카드·용어 퀴즈·Anki 행에 `시험 범위`, `실무 확장`, `학습자용 해설`을 명시하고, `실무 확장`은 먼저 관련 `AIF-C01-D<n>-T<n>`를 표시하되 공식 출제 범위로 표현하지 않는 규칙을 적용할까요?

- A. 적용한다: 항목 단위로 범위 표지를 강제한다.
- B. 파일 단위의 범위 표지만 사용한다.
- C. 실무 확장을 공식 시험 범위와 함께 표시한다.
- D. 범위 표지를 생략하고 출처 링크만 제공한다.
- E. 다른 분류 체계를 정한다.
- F. Other (please specify)

[Answer]:

## Q6. UTF-8 CSV와 텍스트 접근성

Anki CSV는 strict UTF-8과 `front,back` 필드를 사용하고 일반 CSV parser가 읽도록 quoting·쉼표·줄바꿈을 검사하며, 모든 탐색은 상대 Markdown 링크와 텍스트 설명을 기본으로 하고 이미지·Mermaid는 사용하지 않는 기본값으로 둘까요? 향후 시각 자료가 필요하면 한국어 alt text·캡션·텍스트 fallback을 함께 둘까요?

- A. 확정한다: UTF-8·parser 호환성·상대 링크·텍스트 fallback을 필수로 한다.
- B. CSV 인코딩과 quoting 검사를 생략한다.
- C. 외부 렌더러와 이미지를 필수 의존성으로 둔다.
- D. 시각 자료만 제공하고 텍스트 설명은 생략한다.
- E. 다른 접근성·파일 호환성 규칙을 정한다.
- F. Other (please specify)

[Answer]:

## Q7. 실패 처리와 상태 승격

출처가 `blocked` 또는 `확인 필요`이면 항목을 `review`·`blocked`·`확인 필요`로 보류하고 `verified`로 승격하지 않으며, 중복 ID·고아 역방향 참조·잘못된 quoting·민감정보가 발견되면 해당 항목을 후속 수정 대상으로 남기고 패키지를 성공으로 표시하지 않는 규칙을 적용할까요?

- A. 적용한다: 실패는 항목 또는 검사 결과를 보류하고 근거 없는 승격을 막는다.
- B. 경고만 남기고 `verified`로 승격한다.
- C. 출처가 막혀도 학습자 추정으로 내용을 확정한다.
- D. 검사 실패 항목을 자동 삭제한다.
- E. 다른 실패 처리 규칙을 정한다.
- F. Other (please specify)

[Answer]:

## Q8. U8 handoff

U8 품질 증거 단계에 문항·워크시트·카드·퀴즈·Anki 각 항목의 안정 ID, target path, baseline/source 참조, scope classification, 출처 상태, UTF-8·CSV parser·링크·접근성·민감정보·중복·정답·오답·난이도 검사 결과를 전달하고, 현재 nfr-design에서는 실제 검사 결과를 만들지 않는 것으로 확정할까요?

- A. 확정한다: U7은 검증 가능한 계약과 예상 증거를 정의하고 U8이 실제 판정을 기록한다.
- B. U7이 U8 품질 판정까지 대신 기록한다.
- C. U8에는 문항 내용만 전달하고 출처·추적성은 전달하지 않는다.
- D. 품질 handoff를 만들지 않는다.
- E. 다른 handoff 항목을 정한다.
- F. Other (please specify)

[Answer]:

## Consolidated Summary Confirmation

다음 설계 요약은 U7의 승인된 upstream 계약과 현재 실행 범위를 반영합니다.

- U7은 정적 Markdown·CSV만 제공하며 자동 채점, learner state 저장, API·DB·UI runtime, AWS 계정·리소스·배포·유료 실습·새 dependency·실행 코드를 사용하지 않습니다.
- 점수 워크시트는 로컬 수기 계산만 지원하고 답안·점수·진도를 수집하거나 저장하지 않습니다.
- 문항·카드·퀴즈·Anki 해설은 합성 예시를 사용하며 실제 100문항 이상은 downstream content 단계에서 생성합니다.
- `Q-<n>`, `SCORE-<slug>`, `CARD-<slug>`, `TQ-<n>`, `ANKI-<n>`, `AIF-C01-D<n>-T<n>` stable ID를 유지합니다.
- U1 `BaselineItem`과 U7 항목 사이에 정방향·역방향 기준선·출처 handoff를 두며, U1 manifest와 downstream content가 없으면 관련 검증은 `Deferred`입니다.
- `시험 범위`·`실무 확장`·`학습자용 해설`을 항목 수준에서 분리합니다.
- Markdown·CSV는 strict UTF-8, 일반 parser 호환 quoting, 상대 링크, 텍스트 접근성을 기본으로 하며 이미지·Mermaid는 기본 사용하지 않습니다.
- 실패·차단·미확인 상태는 `verified`로 승격하지 않고 U8이 후속 품질 증거를 기록합니다.

가능한 응답은 `Looks correct` 또는 `Needs changes`입니다.

[Answer]: Looks correct
