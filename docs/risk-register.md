# Risk register — MediLink release

Written by Dev 3 (Mustafa) for the Oct 29 – Nov 1 cycle.

| # | Risk | Type | Warning signal | What could happen | Likelihood | Impact | How we prevent it | Owner | Evidence from our cycle |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Changes to the reminder code break reminders without anyone noticing | Technical dependency | Reminder code changed with no test for it; security warning on the notification library (#7) | Patients miss reminders, or get reminders for appointments they cancelled | Medium | High | Every change to remiinders needs a test; check the reminder log after each release | Dev 3 | Incident #19: cancelled patients still got reminders |
| R2 | Everything depends on CI passing, so if CI gets stuck nothing can merge | Technical dependency | A PR's tests show "Action required" or never finish | PRs pile up in Code Review because main needs passing tests to merge | Medium | Medium | Everyone makes branches in the repo instead of forks; EM checks for stuck test runs daily; coverage gate (#10) keeps tests useful | Dev 3 | PR #14 came from a fork and its tests were stuck on "Action required" from Oct 30 onwards |
| R3 | PRs sit waiting for review while people start new work | Teamwork / workflow | A PR has no review after 8 hours; Code Review column is full (3/3) | Work piles up and planned items don't get finished | High | Medium | WIP limit of 3 in Code Review; review before starting new work (our Part H experiment) | EM | PR #11 took about 10 hours to merge (target was 8); on Nov 2, 5 of 6 open PRs were still waiting for review (#14, #20, #27, #29, #31) |
