# U8 품질 증거 NFR Requirements 확인 질문

## Inherited Decisions

U8은 승인된 범위 안에서 정적 품질 증거 계약만 정의한다. 실제 학습 문서·문항·카드·퀴즈·Anki의 최종 품질 검사는 해당 산출물이 생성된 뒤 `QualityCheckRecord`로 실행한다. 추가 범위·난이도·학습 방식 질문은 만들지 않는다.

- 품질 기록 필드: `target_type`, `target_id`, `target_path`, `check_id`, `status`, `evidence`, `checked_at`
- 허용 판정: `통과|실패|보류`
- 정적 경계: Markdown·CSV·JSON 기록만 사용하며 API·DB·AWS 계정·배포·유료 실습·학습자 데이터 저장·새 dependency를 사용하지 않는다.
- 미확인 기준선·차단 출처·생성 전 대상은 `보류`로 남기고 `verified`로 승격하지 않는다.

## Consolidated Summary Confirmation

기존 승인된 정적 품질 증거 계약과 U8 범위를 추가 범위 없이 적용해도 되는가?

- Looks correct
- Request changes

[Answer]: Looks correct
