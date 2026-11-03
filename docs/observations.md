# Workflow observation log

Timestamped notes kept by the EM during the cycle. Used for Part C (observations) and Part H (experiment).

| Date / time | What was observed | Evidence (issue / PR / board) |
| --- | --- | --- |
| Thu Oct 29, 20:39–20:52 | Repo, CI and templates set up by EM alone; developers had no access until Fri | Commit history |
| Fri Oct 30, 10:05 | #3 kept in Backlog: acceptance criteria incomplete ("Admin can block hours" only) | #3, board |
| Fri Oct 30, 10:14 → 20:20 | PR #11 waited ~10 h before approval and merge; team target is 8 h | PR #11 timeline |
| Fri Oct 30, 13:02 | PR #14 (work on #5) opened from a fork by an account not yet confirmed as a team member; no review after 28 h | PR #14 |
| Fri Oct 30 – Sat Oct 31 | Dev 1 has not joined the repo; #9 (P1) not started by Sat 17:00 | Collaborators page, board |
| Sat Oct 31, 09:25 → 17:00 | PRs #15, #16, #17 approved but not merged after ~8 h | PRs #15–#17 |
| Sat Oct 31, 09:25 | PRs #15 and #17 both edit the same lines of DEVELOPMENT_PLAN.md; second merge will conflict | PRs #15, #17 |
| Sat Oct 31, 17:05 | P1 incident #19 opened; Dev 2 told to pause #5 to handle it | #19 |
| Sun Nov 1 | Dev 2 added Pause Checkpoint comment on #5 (per coaching check-in #22 / #26), completed PR #31 for #19/#23, and opened PR #35 for #5 | #5, #19, #23, #26, PR #31, PR #35 |

---

# Part C — Workflow Observations (Developer 2 Analysis)

## Observation 1: Unplanned P1 Incident Preempting Planned Work (Individual vs. Process Contrast)

- **Evidence:** Issue **#5** (*Two patients can book the same slot within seconds*, P1) was started on Friday, but at `Sat Oct 31, 17:05`, P1 incident **#19** was opened and the EM instructed Dev 2 on #19 to pause #5 immediately to handle the production incident. As a result, #5 stayed in `In Progress` across Saturday and Sunday—giving it the longest cycle time of any committed P1 item—until PR #31 (fixing #19 / #23) was completed and PR #35 (#5) was opened.
- **Possible explanation:**
  - *Individual reading:* Dev 2 worked more slowly on defect #5 than teammates working on other tasks.
  - *Process reading:* A mid-cycle P1 production incident (#19) preempted planned development. Without a reserved support buffer or dedicated on-call rotation, Dev 2 had to switch contexts from `src/appointments.js` (#5) to `src/reminders.js` (#19), conduct the Five Whys RCA, open corrective/preventive issues (#23–#25), and ship PR #31 with regression tests before resuming #5. The issue timeline and daily updates confirm the process reading rather than an individual performance issue.
- **Information still needed:** Measure active development time on #5 (excluding the hours #5 sat paused while #19 and #23 were being resolved) and track how frequently P1 incidents interrupt planned work across future cycles.
- **Proposed response:**
  1. Reserve ~20% cycle capacity for unplanned production support and assign a rotating support owner so P1 incidents do not stall committed P1 defects.
  2. Apply the "Pause Checkpoint" rule (**#26**, agreed in coaching session **#22**): whenever an `In Progress` issue is interrupted for more than 1 hour, post a 3-line checkpoint note (*Where I stopped / Next step / Paused for #NN*) on the issue before switching branches (demonstrated on #5 before opening PR #35).

## Observation 2: Pull Requests Waiting for Review or Merge While New Work Starts

- **Evidence:** As logged in the table above, **PR #11** waited ~10 hours before approval and merge (exceeding the team's 8-hour target), **PR #14** waited over 28 hours without review, and on Saturday (`09:25 -> 17:00`), **PRs #15, #16, and #17** sat approved or waiting for ~8 hours while parallel edits to `DEVELOPMENT_PLAN.md` in PRs #15 and #17 created a merge conflict risk.
- **Possible explanation:** Team members focused on starting their own individual tasks first rather than checking the `Code Review` column and completing the review-to-merge handoff, causing open PRs to queue up and touch the same files concurrently.
- **Information still needed:** Compare Friday–Saturday morning PR wait times against Saturday afternoon–Sunday review turnaround times (after introducing the review-first experiment in Discussion #21) and check team poll results.
- **Proposed response:** Enforce the **Review-First Rule** (Part H experiment, #21): before moving any new work item into `In Progress`, check `Code Review` and review/merge waiting PRs first (targeting <4 hours to first review), and serialize edits to shared planning files (`DEVELOPMENT_PLAN.md`) to prevent merge conflicts.

## Observation 3: Incomplete Acceptance Criteria and Unchecked Cross-Feature Side Effects

- **Evidence:** On `Fri Oct 30, 10:05`, **#3** had to be kept in `Backlog` because its acceptance criteria were incomplete (*"Admin can block hours" only*, without specifying what happens to existing appointments). Additionally, the Five Whys RCA on **#19** revealed that when the `cancel` feature was originally written, its acceptance criteria and unit tests never specified how cancelling an appointment should affect queued reminders in `src/reminders.js`.
- **Possible explanation:** Issues were drafted and verified in isolation without checking cross-feature side effects (how state changes in `store.appointments` impact `reminders.queue`), and the team's Definition of Done lacked an explicit side-effect verification checkbox.
- **Information still needed:** Audit remaining backlog items (#3, #4, #7, #8) to identify any other tasks that modify shared state or lack edge-case acceptance criteria before pulling them into the next release.
- **Proposed response:**
  1. Keep the strict `Ready` gate (`CONTRIBUTING.md`): hold items like #3 in `Backlog` until testable acceptance criteria are defined.
  2. Implement preventive action **#24** by adding *"Side effects checked"* to the Definition of Done and the issue Acceptance Criteria template.

## Observation 4: Late Onboarding / Unverified Collaborator Handoffs Delaying P1 Dependencies

- **Evidence:** From `Fri Oct 30 – Sat Oct 31`, Dev 1 had not yet joined the repo and P1 item **#9** (automated tests for book/cancel, which #2 depended on) had not started by Saturday at 17:00; similarly, **PR #14** was opened from an external fork by an unconfirmed account.
- **Possible explanation:** Asynchronous setup assumed all developers would accept repository invitations and follow branch workflow (`H1`/`H3`) at the same time on Friday without an early synchronous check-in trigger when a core P1 dependency (#9) remained unstarted past 24 hours.
- **Information still needed:** Check whether repository notification settings or unclear onboarding steps caused the fork/invitation delay.
- **Proposed response:** Add an explicit escalation trigger to the team's communication rules (Part B): if a teammate has not joined the repo or a P1 dependency (#9) has not moved to `In Progress` by the first daily cutoff, switch from asynchronous GitHub comments to a direct synchronous ping/call and redistribute or unblock the dependency immediately.
