# Unit 의존성 DAG

> 상태: `draft`  
> 통합 요약 확인: `Looks correct`  
> 이 문서는 가능한 선행 조건만 표현한다. 구현 순서나 critical path는 `Delivery Planning`에서 결정한다.

## Machine-readable dependency edges

```yaml
units:
  - name: u1-baseline-and-source-registry
    kind: spec
    depends_on: []
  - name: u2-d1-ai-ml-foundations
    kind: packaging
    depends_on: [u1-baseline-and-source-registry]
  - name: u3-d2-generative-ai
    kind: packaging
    depends_on: [u1-baseline-and-source-registry]
  - name: u4-d3-foundation-models
    kind: packaging
    depends_on: [u1-baseline-and-source-registry]
  - name: u5-d4-responsible-ai
    kind: packaging
    depends_on: [u1-baseline-and-source-registry]
  - name: u6-d5-security-compliance-governance
    kind: packaging
    depends_on: [u1-baseline-and-source-registry]
  - name: u7-assessment-and-review
    kind: packaging
    depends_on:
      - u1-baseline-and-source-registry
      - u2-d1-ai-ml-foundations
      - u3-d2-generative-ai
      - u4-d3-foundation-models
      - u5-d4-responsible-ai
      - u6-d5-security-compliance-governance
  - name: u8-quality-evidence
    kind: spec
    depends_on:
      - u1-baseline-and-source-registry
      - u2-d1-ai-ml-foundations
      - u3-d2-generative-ai
      - u4-d3-foundation-models
      - u5-d4-responsible-ai
      - u6-d5-security-compliance-governance
      - u7-assessment-and-review
```

## DAG 해석

- `u1-baseline-and-source-registry`는 다른 Unit이 참조하는 기준선·출처 계약을 제공하며 선행 의존성이 없다.
- `u2`~`u6`은 모두 `u1`에만 의존하고 서로 직접 의존하지 않는다. 따라서 이 그래프에는 여러 유효한 위상 순서가 존재한다.
- `u7-assessment-and-review`는 모든 도메인 문서와 기준선에 의존한다. 문제·카드·퀴즈·Anki의 원본 연결을 검증하려면 해당 문서가 선언되어야 하기 때문이다.
- `u8-quality-evidence`는 모든 산출물의 최종 품질 증거를 통합하므로 모든 Unit에 의존한다.
- 그래프에는 자기 의존성이나 순환이 없다.
- 위 설명은 가능한 의존성만 말하며, 어떤 Unit을 먼저 구현하거나 어느 경로가 critical path인지는 결정하지 않는다.

## Integration Points

| From Unit | To Unit | Static contract | Purpose |
|---|---|---|---|
| `u1-baseline-and-source-registry` | `u2`~`u6` | `AIF-C01-D<n>-T<n>`, `source_id`, `source_urls`, revision/title/date/status | 도메인 문서가 공식 기준선과 출처를 참조 |
| `u1-baseline-and-source-registry` | `u7-assessment-and-review` | 기준선 ID·canonical source ID·상태 | 문항·복습 자료가 공식 범위와 출처로 되돌아감 |
| `u2`~`u6` | `u7-assessment-and-review` | `document_id`, `term_id`, 상대 Markdown 링크 | 문제·카드·퀴즈·Anki가 원본 학습 자료를 참조 |
| 모든 Unit | `u8-quality-evidence` | 대상 경로·안정 ID·품질 보고서 링크 | 검사 대상과 결과를 추적 |
| `u8-quality-evidence` | 도메인 README | 상대 링크와 검사 상태 표지 | 학습자가 품질 보고서를 열람 |

## Parallel Development Opportunities

`u1`의 기준선 계약이 준비되었다는 전제에서 `u2`, `u3`, `u4`, `u5`, `u6`은 서로 직접 의존하지 않으므로 병렬 개발 가능한 집합이다. 다만 이 병렬 가능성은 경제적 실행 순서를 결정하지 않으며, 도메인 학습 경로의 D1→D5 표현 규칙과도 별개다.

`u7`은 도메인 문서의 ID와 용어를 참조하므로 해당 입력이 정해진 뒤 작업할 수 있다. `u8`은 모든 대상의 검사 증거를 통합하므로 각 Unit의 산출물 경계와 품질 대상이 확정된 뒤 수행한다.

## Non-goals

- Unit별 서비스 배포, AWS 계정·리소스·환경 생성
- Unit 간 REST API, 이벤트 버스, 공유 데이터베이스
- Unit의 경제적 구현 순서, Bolt 순서, critical path 결정
