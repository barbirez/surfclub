# Product Requirements Document
## Surf Club — Surfboard Rental Subscription

**Version:** 1.0
**Author:** Barbara Rezende
**Date:** April 2026
**Status:** Ready to build

---

## Table of Contents

1. [Overview](#1-overview)
2. [Problem Statement](#2-problem-statement)
3. [Target Users](#3-target-users)
4. [Goals and Success Metrics](#4-goals-and-success-metrics)
5. [Business Model](#5-business-model)
6. [Scope and Appetite](#6-scope-and-appetite)
7. [Functional Requirements](#7-functional-requirements)
8. [User Flow](#8-user-flow)
9. [Out of Scope](#9-out-of-scope)
10. [UX Principles](#10-ux-principles)
11. [Competitive Landscape](#11-competitive-landscape)
12. [Risks and Open Questions](#12-risks-and-open-questions)
13. [Implementation Plan](#13-implementation-plan)

---

## 1. Overview

Surf Club is a surfboard rental subscription website. Surfers who are traveling or whose boards aren't suited for the current conditions can browse a menu of surfboards, choose a rental plan, reserve a board for their desired dates, pick it up, surf, and return it — all in one seamless experience.

The product is built from scratch by a solo designer-engineer. The goal of this first version is not to dominate a market; it is to validate the idea quickly. If users sign up and come back, the hypothesis is proven.

---

## 2. Problem Statement

### What is the problem?

Surfers sometimes find themselves in one of two situations:

- **Traveling** — they want to surf at their destination but don't have their board with them
- **Wrong conditions** — wave conditions change and the board they own isn't the right fit for the day

In both cases, the motivation to surf is there. The barrier is equipment access.

### Why is it a problem today?

Traveling with a surfboard means paying extra luggage fees on flights, managing physical transport, and the risk of board damage in transit. Many surfers simply skip the session rather than deal with it.

When conditions shift unexpectedly — a big swell arrives, the break changes — a surfer with only one board is under-equipped. Renting locally solves this, but finding the right board, in the right location, with a clear reservation process does not exist as a smooth digital experience for most markets.

### What is not broken

This is a new product. There is no existing system with a bug or failure. The problem is a gap in the market, not a malfunction.

---

## 3. Target Users

**Primary user:** Surfers who are traveling and do not have access to their own board.

**Secondary user:** Surfers whose current board is not suited for today's wave conditions — size, volume, or type mismatch.

**What these users have in common:**
- They want to surf
- They face a logistics or equipment barrier, not a lack of motivation
- They are comfortable booking things online (flights, accommodations, activities)
- They are willing to pay for convenience

**What they are not:**
- Complete beginners learning to surf for the first time (this product assumes some familiarity with surfboard types)
- Users who need instruction or guided sessions — this is equipment rental only

---

## 4. Goals and Success Metrics

### Primary goal
Validate that people will sign up for a surfboard rental subscription when the experience is clear and low-friction.

### The core hypothesis
People who try the service return. Retention is the bet. Even if the first session is a day rental, the expected conversion path is toward a monthly or annual plan.

### What "working" looks like at launch
- A visitor lands on the page and understands the concept without needing to ask questions
- At least one user completes a reservation end-to-end
- If no one signs up, the surface area is small enough to diagnose the cause (the product is not so complex that failure is ambiguous)

### What failure looks like
- Zero signups despite traffic → message or positioning problem
- Signups but no returns → experience problem or board/condition mismatch
- Signups but high support volume → operational gaps (return logistics, damage disputes)

---

## 5. Business Model

Surf Club offers four ways to hire a surfboard:

| Plan | Monthly Price | Days Per Reservation Cycle | Best For |
|------|--------------|---------------------------|----------|
| Day rental | Pay per use | 1 day | First-timers, one-off trips |
| Monthly | $289 / mo | Up to 7 days | Frequent local surfers |
| 3-month | $199 / mo | Up to 5 days | Regular surfers, better value |
| Annual | $149 / mo | Up to 3 days | Committed surfers, best rate |

**Revenue priority:** The three retainer plans (monthly, 3-month, annual) are the primary revenue stream. Day rental exists to lower the barrier to a first reservation — it is a trial mechanism, not the business model.

**The pricing signal:** The longer the commitment, the lower the monthly cost, but the fewer days per cycle. This is intentional — it rewards committed surfers and manages board inventory at the same time.

---

## 6. Scope and Appetite

### Appetite
**One day** to build and ship. One additional buffer day available if the core flow is done but edge cases remain.

### Team
Solo designer-engineer.

### What must be inside this scope

The following are non-negotiable for launch:

1. **Landing page** — explains the service, the 3-step loop, and the pricing plans
2. **Surfboard menu with filters** — browse boards by location, size, volume, type, and shaper
3. **Board detail page** — specs and conditions card
4. **Plan picker** — shown on landing and as a gate before reservation
5. **Reservation flow** — date picker, availability check, date confirmation
6. **Pre-reservation disclosure** — damage policy and liability acknowledgment
7. **Confirmation screen** — pickup date, location, and return deadline

### What can be cut if time runs out

- Skill level filter on the board menu (nice-to-have; can ship without it)
- Waitlist / "notify me" for unavailable boards
- User account and reservation history
- Delivery option (pickup only for V1)

---

## 7. Functional Requirements

### R0 — Board browsing with filters (Core goal)
Surfers can browse the full inventory of available surfboards and filter by:
- Location (city or town)
- Board size
- Board volume
- Board type (shortboard, longboard, fish, funboard, etc.)
- Shaper
- Skill level (beginner / intermediate / advanced)

### R1 — Board specs and conditions (Must-have)
Each board has a detail page showing:
- Volume (liters)
- Size (length × width × thickness)
- Board type
- Shaper name
- Brief description
- A conditions card describing what wave height, swell type, and skill level the board is best suited for

### R2 — Reservation with plan-based date constraints (Must-have)
A surfer can reserve a board for a date range. The available date range is determined by the plan selected:
- Day rental → 1 day
- Monthly plan → up to 7 days
- 3-month plan → up to 5 days
- Annual plan → up to 3 days

The date picker only activates after a plan is confirmed. The system checks availability for the selected dates before allowing confirmation.

### R3 — Clear landing page (Must-have)
A first-time visitor must be able to understand how the service works without asking. The hero section explains the 3-step process: browse → reserve → pick up, surf, return.

### R4 — Plan picker accessible before and during reservation (Must-have)
The plan can be selected from the landing page or triggered automatically when a user tries to reserve without having chosen a plan. Plan selection must happen before the date picker is activated.

### R5 — Seamless end-to-end experience (Must-have)
The flow from browsing to confirmed reservation must feel continuous and low-friction. Pickup and return logistics must be clearly communicated — including the specific location for pickup and the deadline for return.

### R6 — Small surface area for diagnosability (Nice-to-have)
The product should be scoped tightly enough that if no one signs up, the team can identify whether the problem is messaging, pricing, flow, or inventory — not "we don't know."

### R7 — Reservation UX modeled on familiar booking patterns (Must-have)
The reservation experience should feel like booking a hotel room or an Airbnb stay: choose dates, see availability, confirm. No novel interaction patterns that require explanation.

### R8 — Location findability by city or town (Must-have)
Users must be able to find boards near them by searching or filtering by city or town, not just by tag or category.

### R9 — Damage and liability communication before reservation (Must-have)
Before a reservation is confirmed, the user must see and acknowledge the damage policy and liability terms. This is a blocking step — the reservation cannot be completed without explicit acceptance.

---

## 8. User Flow

The complete end-to-end journey a surfer takes from first visit to confirmed reservation:

```
Landing Page (P1)
    │
    ├─ Reads how it works → Browse Boards CTA
    │
    ▼
Board Menu (P2)
    │
    ├─ Applies filters: location, size, volume, type, shaper, skill
    ├─ Sees available boards matching filters
    │
    ├─ Clicks a board card
    │
    ▼
Board Detail (P3)
    │
    ├─ Views specs: volume, size, type, shaper, description
    ├─ Views conditions card: wave height, swell type, skill level
    │
    ├─ Clicks "Reserve This Board"
    │        │
    │        ├─ No plan selected? → Plan Picker Modal (P4)
    │        │       ├─ Selects plan
    │        │       └─ Confirms → Reservation Modal (P5)
    │        │
    │        └─ Plan already selected → Reservation Modal (P5)
    │
    ▼
Reservation Modal (P5)
    │
    ├─ Sees available date range based on plan
    ├─ Picks start date
    ├─ System checks availability
    ├─ Sees availability indicator
    │
    ├─ Confirms dates
    │
    ▼
Pre-reservation Disclosure (P6)
    │
    ├─ Reads damage policy
    ├─ Reads liability terms
    ├─ Checks acknowledgment checkbox
    │
    ├─ Clicks "I Agree — Complete Reservation"
    │
    ▼
Confirmation Screen (P7)
    │
    ├─ Sees booking summary: board name, dates, pickup location
    ├─ Sees return deadline
    └─ Sees pickup instructions
```

---

## 9. Out of Scope

The following are explicitly not part of this version:

| Feature | Reason |
|---------|--------|
| User accounts and login | Not needed for a first reservation test |
| Reservation history / dashboard | Post-launch concern |
| Board delivery | Pickup only for V1 — showing "pickup only" clearly prevents confusion |
| Payment processing | Can be handled manually or through a simple link for V1 |
| Board inventory management (admin panel) | Out of scope — boards are added manually |
| Reviews and ratings | Post-launch |
| Waitlist for unavailable boards | Stretch goal — CTA can be added later |
| Multiple board reservations in one session | Single reservation per flow |
| Cancellation and rescheduling flow | Post-launch |

---

## 10. UX Principles

These are the design constraints that must hold across all screens:

**Clarity over cleverness.** Every screen should communicate one thing clearly. The landing page explains the service. The menu lets you find a board. The detail page shows specs. No screen tries to do too much.

**Familiar reservation patterns.** The booking experience mirrors Airbnb and similar platforms — date picker, availability indicator, confirmation. Users should not need to learn a new interaction model.

**Progressive commitment.** The user can browse boards before choosing a plan. They only hit the plan gate when they try to reserve. This lowers the barrier to exploration.

**Seamless return.** The word "seamless" was used intentionally. Pickup and return logistics must be spelled out concretely on the confirmation screen — not vague ("return when done") but specific ("return to [location] by [date/time]").

**Disclose before commit.** Damage and liability terms appear as a mandatory, explicit step before the reservation is confirmed — not buried in fine print on another page.

---

## 11. Competitive Landscape

### Direct competitor
**Surf's Up Club** — an existing service that solves the same problem. Its existence validates the market. The goal of this build is not to out-feature it; it is to test whether the model works when built and shipped quickly by a solo designer-engineer.

### Adjacent references

| Reference | What It Teaches |
|-----------|----------------|
| **Airbnb** | The reservation UX gold standard for physical asset rental. Users already know date picker + availability + confirm. Use this pattern, don't deviate from it. |
| **Zipcar / Lime** | Subscription access to physical assets with clear pickup and return. The return loop must feel as clear as the reservation — ambiguity here is a top churn cause. |
| **BoardCave / Pukas** | Sets the expectation for what "board specs" means. Users familiar with these sites expect: volume, length, width, thickness, fin setup, tail shape, rocker. |
| **Wetsuit / kiteboard rentals** | Local gear rental services that match boards to skill level. Services that skip skill-level matching get bad sessions and returns. The skill level filter has real operational value. |
| **Ski / fat bike seasonal rentals** | Damage deposit and liability waiver are near-universal in gear rental. Their absence is the top cause of post-session disputes and chargebacks. |

### Gaps common in this space (that we should not replicate)

| Gap | Risk if Ignored |
|-----|----------------|
| No damage policy disclosed upfront | Disputes after the session. Chargebacks. Support overhead. |
| Boards shown without availability filtering | User selects a board, gets to date picker, finds it's unavailable — frustrating drop-off |
| Unclear return location or deadline | Users return to the wrong place or late. Operationally expensive to fix. |
| No skill-level guidance | Beginners rent wrong boards. Bad sessions. No return. |

---

## 12. Risks and Open Questions

| # | Risk / Question | Impact | Suggested Handling |
|---|----------------|--------|--------------------|
| Q1 | Where exactly do surfers pick up and return boards? Same location always? Any location? | High — affects confirmation screen copy and user trust | Define pickup/return policy before launch and display it explicitly |
| Q2 | How is board availability tracked? Manual updates or automated? | Medium — affects reliability of the availability check in V4 | Start manual for V1; document the update process |
| Q3 | What happens if a board is returned damaged? | High — legal and financial risk | Damage policy text in P6 must be written with legal review |
| Q4 | Is payment handled in the app or offline? | Medium — affects whether the reservation flow needs a payment step | Day 1: reservation only, payment handled separately. Document this clearly. |
| Q5 | Will users need an account to manage reservations? | Low for V1 | Email confirmation is sufficient for V1; accounts can come later |
| Q6 | What if the board menu is empty for a user's location? | Medium — first impression problem | Empty state with clear messaging: "No boards in [city] yet — check back soon or browse nearby locations" |

---

## 13. Implementation Plan

The build is split into five vertical slices. Each slice ends in demo-able UI.

| # | Slice | What It Builds | Day |
|---|-------|---------------|-----|
| **V1** | Landing page + plan picker | Hero, process explanation, pricing section, plan picker modal | Day 1 |
| **V2** | Board menu with filters | Filter sidebar (location, size, volume, type, shaper, skill), board list, empty state | Day 1 |
| **V3** | Board detail page | Specs panel, conditions card, board images, Reserve CTA | Day 1 |
| **V4** | Reservation flow + availability | Date picker, availability check, duration constraint by plan | Day 2 (buffer) |
| **V5** | Disclosure + confirmation | Damage policy screen, liability checkbox, confirmation screen with pickup + return details | Day 2 (buffer) |

**Day 1 target:** V1, V2, V3 — the browsing experience is fully functional as a static site. A visitor can see the product, browse boards, read specs, and understand how it works.

**Day 2 target:** V4, V5 — the reservation engine. A user can select dates, check availability, agree to terms, and receive a confirmation.

**Definition of done:** A surfer can complete the full flow from landing page to reservation confirmation in a single session without needing to ask a question or contact support.
