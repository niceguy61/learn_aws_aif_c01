---
title: "U7 평가·복습 자료 정적 패키징 기능 명세"
unit: "u7-assessment-and-review"
kind: "packaging"
status: "review"
---

# U7 평가·복습 자료 정적 패키징 기능 명세

## 목적과 범위

U7은 AIF-C01 학습을 위한 문제은행·점수 워크시트·카드·용어 퀴즈·Anki CSV의 정적 Markdown/CSV 계약을 정의한다. 이 명세는 자동 채점 서비스나 학습자 상태 저장 기능을 정의하지 않는다.

## 정적 산출물과 안정 ID

| 산출물 | 안정 ID 규칙 | 책임 |
|---|---|---|
| 문제은행 | `Q-<n>` | 질문·선택지·정답·해설·범위·기준선·출처 계약 |
| 점수 워크시트 | `SCORE-<slug>` | 로컬 수기 계산 산식과 비수집 안내 |
| 카드 | `CARD-<slug>` | 용어·혼동 지점·기준선·원본 링크 계약 |
| 용어 퀴즈 | `TQ-<n>` | 질문·정답·해설·기준선·원본 링크 계약 |
| Anki CSV | `ANKI-<n>` | UTF-8 `front,back`과 추적 필드 계약 |

## 정적 동작

1. 학습자는 Markdown viewer 또는 일반 CSV parser로 자료를 읽는다.
2. 각 항목은 U1 기준선·출처와 U2~U6 원본 문서·용어로 이동하는 상대 링크를 제공한다.
3. 점수 워크시트는 정답률을 로컬에서 수기로 계산하며 답안·점수·진도를 업로드하거나 저장하지 않는다.
4. 실제 콘텐츠 항목은 U1 기준선·출처 상태와 도메인 문서가 확정된 후 downstream 단계에서 생성한다.

## 비기능 경계와 해당 없음

- API·DB·인증·학습자 계정·AWS 리소스·배포·유료 실습·새 dependency·실행 코드는 없다.
- 실제 학습자 답안·진도·PII·자격 증명·토큰·계정 식별자는 입력·저장·전송하지 않는다.
- Anki CSV는 strict UTF-8, 일반 parser 호환 quoting, `front,back` 필드를 사용한다.
- 시험 범위·실무 확장·학습자용 해설은 항목별로 구분하고, 출처 확인 전 항목은 `review`·`blocked`·`확인 필요`로 보류한다.

## 검증 가능한 handoff

각 downstream 항목은 `id`, `target_path`, `baseline_ids`, `source_ids`, `forward_refs`, `reverse_refs`, `scope_classification`을 가진다. U1 manifest에서 항목으로 향하는 역방향 ID와 항목에서 baseline/source로 향하는 정방향 ID를 모두 확인하며, 실제 기준선·문서·출처가 확정되기 전에는 `Deferred`를 사용한다.

## 연결된 문서

- [U7 Unit 계약](../../../inception/units-generation/unit-of-work.md)
- [승인된 요구사항](../../../inception/requirements-analysis/requirements.md)
- [승인된 사용자 스토리](../../../inception/user-stories/stories.md)
