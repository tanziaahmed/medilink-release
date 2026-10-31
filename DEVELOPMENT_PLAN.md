# Development plan — MediLink release cycle

## Cycle

- **Dates:** Thu Oct 29 – Sun Nov 1, 2026 (closes Sun 6 pm)
- **Goal:** Ship the reschedule feature and the two highest-priority defects, with automated tests and CI in place, without production defects slipping through verification.

## Team

| Role | Name | Responsibilities |
| --- | --- | --- |
| Engineering Manager / Team Lead | _name_ | Workflow and board, WIP enforcement, reviews, coaching, incident coordination. Does not take the hardest technical tasks. |
| Developer 1 | _name_ | Features (#2, #3), booking tests (#9) |
| Developer 2 | _name_ | Opt-out feature (#4), double-booking defect (#5), incident owner |
| Developer 3 | mustafa | Time zone defect (#6), maintenance (#7, #8), CI coverage gate (#10) |

## Committed items

| Issue | Title | Priority | Owner |
| --- | --- | --- | --- |
| #2 | Patient can reschedule an appointment | P1 | Dev 1 |
| #5 | Two patients can book the same slot | P1 | Dev 2 |
| #9 | Automated tests for booking/cancel | P1 | Dev 1 |
| #6 | Cancellation email shows UTC time | P2 | Dev 3 |
| #7 | Upgrade notification library | P2 | Dev 3 |
| #10 | CI fails when coverage drops below 70% | P2 | Dev 3 |

Stretch: #3, #4, #8.

## SMART objectives

Each member adds their own objective below (via a pull request).

- **EM:** Keep the time from PR opened to first review under 8 working hours for every PR opened between Oct 30 and Nov 1, checked each evening on the board and reported in my daily update.
- **Dev 1:**
- **Dev 2:**
- **Dev 3 - Mustafa :close #10 and #6 and publish a dashboard with 5 indicators computed from this cycle's issues and PRs by Sun Nov 1 at 6 pm.**

## Daily updates

Posted once per day in **Discussions → Daily Updates**, in that day's thread, by 9 pm. Always cite issue or PR numbers.

```
Completed: <what moved forward, with #numbers>
Planned:   <what you'll do next, with #numbers>
Blockers:  <what's stopping you / help needed, or "none">
```

## Communication

**Asynchronous by default:** daily updates, code review, questions and incident investigation in issue comments.

**Switch to a call when:**

1. A P1 incident is not diagnosed within 2 hours in the issue thread
2. A blocker has been unresolved for more than 4 hours
3. A discussion has gone past 2 rounds of comments without agreement
