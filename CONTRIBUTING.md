# How we work

## Workflow

Every work item is a GitHub issue on the project board and moves through:

**Backlog → Ready → In Progress → Code Review → Verification → Done**

| Column | Entry rule |
| --- | --- |
| Backlog | Any proposed work item |
| Ready | Has acceptance criteria, priority and owner (EM checks before moving) |
| In Progress | Owner has started; a branch exists |
| Code Review | PR is open and linked to the issue |
| Verification | PR approved; a non-author checks the acceptance criteria |
| Done | Verified, merged, issue closed |

## WIP limits

- **In Progress: max 3** (one item per developer at a time)
- **Code Review: max 3**

If Code Review is full, review someone else's PR before pulling new work.

**Why:** in the previous release, developers started new tasks while work waited for review, and some PRs stayed open for days. Limiting work in progress makes waiting visible and pushes the team to finish work before starting more.

## Definition of Done

An item is Done only when:

1. All acceptance criteria are met
2. Tests are added or updated and CI passes
3. Side effects on other features (e.g. reminders, emails) have been checked
4. The PR is reviewed and approved by someone other than the author
5. Someone other than the author has verified it against the acceptance criteria and left a comment on the issue
6. The PR is merged and the issue is closed; docs are updated if behaviour changed

## Branches and pull requests

- Branch name: `<issue-number>-short-name`, e.g. `8-booking-tests`
- One PR per issue; write `Closes #<number>` in the PR description
- `main` is protected: no direct pushes, 1 approval and passing CI required

## Reviews

- Aim to give a first review within 8 working hours of a PR opening
- Review comments are about the code, not the person

## Production incidents

- Every P1 incident gets an issue from the Production incident template.
- Within 48 h of a P1 being fixed, the owner and the EM hold a post-incident review: complete the Five Whys in the issue and create an issue for each corrective or preventive action.
- Keep it blameless: describe what the process allowed, not who made a mistake.
