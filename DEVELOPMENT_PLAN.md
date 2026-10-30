# Development plan — MediLink release cycle

## Cycle

- **Dates:** Thu Oct 29 – Sun Nov 1, 2026 (closes Sun 6 pm)
- **Goal:** Ship the reschedule feature and the two highest-priority defects, with automated tests and CI in place, without production defects slipping through verification.

## Team

| Role | Name | Responsibilities |
| --- | --- | --- |
| Engineering Manager / Team Lead | _name_ | Workflow and board, WIP enforcement, reviews, coaching, incident coordination. Does not take the hardest technical tasks. |
| Developer 1 | _name_ | Features (#1, #2), booking tests (#8) |
| Developer 2 | _name_ | Opt-out feature (#3), double-booking defect (#4), incident owner |
| Developer 3 | _name_ | Time zone defect (#5), maintenance (#6, #7), CI coverage gate (#9) |

## Committed items

| Issue | Title | Priority | Owner |
| --- | --- | --- | --- |
| #1 | Patient can reschedule an appointment | P1 | Dev 1 |
| #4 | Two patients can book the same slot | P1 | Dev 2 |
| #8 | Automated tests for booking/cancel | P1 | Dev 1 |
| #5 | Cancellation email shows UTC time | P2 | Dev 3 |
| #6 | Upgrade notification library | P2 | Dev 3 |
| #9 | CI fails when test coverage drops below 70% | P2 | Dev 3 |

Stretch: #2, #3, #7.

## SMART objectives

Each member adds their own objective below (via a pull request).

- **EM:**
- **Dev 1:**
- **Dev 2:**
- **Dev 3:**

## Daily updates

Posted once per day in **Discussions → Daily Updates**, in that day's thread, by 9 pm. Always cite issue or PR numbers.

```
Completed: <what moved forward, with #numbers>
Planned:   <what you'll do next, with #numbers>
Blockers:  <what's stopping you / help needed, or "none">
```

## Communication

**Asynchronous by default:** daily updates, code review, questions in issue comments.

**Switch to a call when:**

1. A P1 production incident is open
2. A blocker has been unresolved for more than 4 hours
3. A discussion has gone past 2 rounds of comments without agreement
