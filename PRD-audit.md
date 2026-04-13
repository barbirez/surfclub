# PRD Audit — Surf Club
## Gaps Review: Flows · States · Errors · Rules

**Document audited:** PRD.md v1.0
**Framework applied:** Flows / States / Errors / Rules
**Status:** 26 gaps identified across 4 dimensions

---

## How to read this document

Each gap has:
- **Gap** — what is missing or undefined
- **Impact** — what goes wrong if this isn't resolved before building
- **Proposed solution** — a concrete answer ready to drop back into the PRD

Severity is marked as:
- 🔴 **Critical** — blocks the flow or creates legal/trust risk
- 🟡 **Important** — creates a broken experience or support burden
- 🟢 **Nice to have** — improves polish, not strictly blocking

---

---

# 1. Flows

The PRD defines the happy path well (§8). Everything else is missing.

---

### F1 — No alternative flows defined
**Severity:** 🔴 Critical

**Gap:**
The user flow only shows the forward path. There is no definition of what happens when a user goes backwards or abandons a step:
- User opens Plan Picker Modal (P4) and clicks "X" or taps outside — where do they land?
- User is in the Reservation Modal (P5) and decides to change the board — is there a "back" action? Does it go back to P3?
- User reaches the Disclosure screen (P6) and changes their mind — do they lose their selected dates?

**Impact:**
Without defined back/cancel behavior, different builders will make different choices. Users will end up stranded, lose their context, or have to start over — which kills conversion.

**Proposed solution:**

| Step | "Back / Cancel" action | Expected destination |
|------|------------------------|---------------------|
| Plan Picker Modal (P4) dismissed | Cancel → return to P3 with plan unset | P3 (Reserve CTA stays available) |
| Reservation Modal (P5) dismissed | Cancel → return to P3, dates cleared, plan kept | P3 |
| Disclosure (P6) "Go back" | Return to P5 with selected dates preserved | P5 |
| Confirmation screen | No back — reservation is done | — |

---

### F2 — No "change my mind mid-flow" path
**Severity:** 🟡 Important

**Gap:**
Once a user is in the reservation flow, there is no defined path for changing the board. The user may arrive at P5 and realize they want a different model — but the only defined action is forward.

**Impact:**
Users either abandon and restart from scratch (high drop-off risk) or feel trapped. Neither is "seamless."

**Proposed solution:**
Add a "Change board" link inside P5 (Reservation Modal) that returns the user to P2 with their current filters preserved and their plan kept. This is the Airbnb equivalent of "Edit your trip."

---

### F3 — No exception flow for concurrent booking (race condition)
**Severity:** 🔴 Critical

**Gap:**
Two users can select the same board for the same dates at the same time. User A passes the availability check. Before A confirms, User B also passes the check and confirms first. User A then submits their reservation — but the board is now taken. The PRD has no flow for this scenario.

**Impact:**
Without handling this, the POST /reservations call will fail at the backend with a conflict, but the user will have no context for what happened. They just agreed to terms and clicked confirm. This is the highest-stakes broken experience in the product.

**Proposed solution:**
After POST /reservations returns a conflict (409):
1. Do not navigate to P7
2. Show an inline error on P6: *"Sorry, this board was just reserved by someone else for those dates. Please go back and choose new dates."*
3. Provide a CTA: "Choose new dates" → returns to P5 with dates cleared

---

### F4 — No post-confirmation actions defined
**Severity:** 🟡 Important

**Gap:**
The confirmation screen (P7) is defined as a terminal state — the user sees their booking summary and that's it. But what can they do from there? Can they browse more boards? Go back to the landing page? The flow just stops.

**Impact:**
Dead ends reduce trust and miss a re-engagement opportunity. Users who want to share their booking or immediately browse a second location have nowhere to go.

**Proposed solution:**
Add two CTAs to P7:
1. **"Browse more boards"** → returns to P2
2. **"Back to home"** → returns to P1

---

---

# 2. States

Every interactive screen needs definitions for all relevant states: loading, loaded, empty, error, disabled. The PRD currently only defines the loaded/success state for most screens.

---

### S1 — Board Menu has no loading state
**Severity:** 🟡 Important

**Gap:**
When the user lands on P2 and the GET /boards call is in progress, the PRD defines no loading state for the board list. U11 (board list) and U12 (empty state) are both post-load states.

**Impact:**
Without a loading state, builders will either show a blank area or flash the empty state before boards appear — both feel broken.

**Proposed solution:**
Add a loading state to P2: while `fetchBoards()` is running, show a skeleton card grid (3–6 placeholder cards) in place of U11. This is the standard pattern used by Airbnb, Booking.com, and all comparable listing pages.

---

### S2 — Board Menu has no error state
**Severity:** 🟡 Important

**Gap:**
If GET /boards fails (network timeout, 500 error), the PRD defines no fallback. The board list would show nothing — which looks identical to the empty state.

**Impact:**
Users can't tell if there are no boards or if something broke. They'll leave thinking the service has no inventory.

**Proposed solution:**
Add an error state to P2, distinct from U12 (empty state):
> *"We couldn't load the boards right now. Please refresh or try again in a moment."*
Include a "Try again" button that retriggers `fetchBoards()`.

---

### S3 — Board Detail has no loading or error state
**Severity:** 🟡 Important

**Gap:**
P3 (Board Detail) shows specs, conditions, and images — all fetched from the backend. If the page is still loading or the fetch fails, the PRD defines no state for either case.

**Impact:**
Slow connections will see a blank page. Failed fetches will show broken UI. Both look like bugs to the user.

**Proposed solution:**
- **Loading:** Show skeleton blocks in place of the specs panel and conditions card while data loads
- **Error:** Show: *"We couldn't load this board's details. Try refreshing or go back to browse other boards."* + "Back to boards" CTA

---

### S4 — Availability indicator has no loading or unavailable state
**Severity:** 🔴 Critical

**Gap:**
U20 (availability indicator in P5) is defined as a rendered element. But three states are not defined:
1. **Loading** — while `checkAvailability()` is running, what does U20 show?
2. **Available** — what does a positive result look like?
3. **Unavailable** — what does a negative result look like, and does it block the user from proceeding?

**Impact:**
The "Confirm Dates" button behavior is entirely undefined without these states. Should it be disabled while loading? Disabled if unavailable? This is a decision that affects the entire reservation mechanic.

**Proposed solution:**

| State | U20 displays | Confirm Dates button |
|-------|-------------|---------------------|
| Loading | Spinner + "Checking availability…" | Disabled |
| Available | ✅ "Board available for these dates" | Enabled |
| Unavailable | ❌ "Board not available — choose different dates" | Disabled |
| Error | ⚠️ "Couldn't check availability. Try again." | Disabled + retry link |

---

### S5 — "I Agree" button has no disabled state defined
**Severity:** 🟡 Important

**Gap:**
P6 has a liability checkbox (U24) and a confirmation button (U25). The PRD does not define whether U25 is disabled until U24 is checked.

**Impact:**
If the button is always active, users can bypass the liability acknowledgment — creating legal exposure. If it's disabled but not documented, the behavior may be implemented inconsistently.

**Proposed solution:**
State explicitly in the PRD:
> U25 ("I Agree — Complete Reservation") is disabled until U24 (liability checkbox) is checked. Once checked, U25 becomes active. This is not optional — it is a legal gate.

---

### S6 — Confirmation screen has no loading state
**Severity:** 🔴 Critical

**Gap:**
When the user clicks "I Agree — Complete Reservation" (U25), the POST /reservations call is triggered (N12). While this is processing, P7 does not yet exist. The PRD jumps straight from clicking U25 to the confirmation screen appearing. The in-between state is undefined.

**Impact:**
Without a loading state, double-submission is possible — users will click again because nothing happened. This creates duplicate reservations in the backend.

**Proposed solution:**
Between U25 and P7:
- Immediately disable U25 after first click
- Show a loading overlay or spinner with: *"Creating your reservation…"*
- On success: navigate to P7
- On failure: dismiss the loader, show an inline error (see E6)

---

---

# 3. Errors

The PRD mentions that errors can happen (Q3, Q4 in Risks) but defines zero error messages and zero recovery paths.

---

### E1 — No past date validation on the date picker
**Severity:** 🟡 Important

**Gap:**
R2 defines the date range constraint by plan (1/3/5/7 days) but says nothing about whether past dates can be selected. The PRD does not state that the start date must be today or later.

**Impact:**
A user selecting a past date will either see a confusing error from the backend or silently create an invalid reservation.

**Proposed solution:**
State in R2: *"The start date must be today or a future date. Past dates are disabled in the date picker."*
Implementation: grey out all past dates in the calendar component on render.

---

### E2 — No date range overflow validation defined
**Severity:** 🟡 Important

**Gap:**
The date picker is "constrained to plan duration" (R2) but the mechanism isn't specified. Can the user freely pick any start and end date? Or does the end date auto-calculate from the start date + plan duration?

**Impact:**
If the user can freely select an end date, they might pick a range exceeding their plan's allowance. The PRD doesn't say what happens — silent truncation? Error message? Disabled dates?

**Proposed solution:**
Define the mechanic explicitly:
> When the user selects a start date, the end date is auto-calculated as start + plan duration and displayed as read-only. The user cannot manually select an end date. The calendar disables all dates beyond the allowed range.

This mirrors how Airbnb enforces minimum/maximum stay rules.

---

### E3 — No API error messages defined for GET /boards
**Severity:** 🟡 Important

**Gap:**
The PRD does not define what the user sees if the board fetch fails (500, timeout, network drop).

**Proposed solution:**
Define the error message for S2 (see above):
> *"We couldn't load the boards right now. Please refresh or try again."*
With a "Try again" button that retriggers `fetchBoards()` without reloading the page.

---

### E4 — No API error messages defined for GET /availability
**Severity:** 🟡 Important

**Gap:**
If the availability check fails, U20 has no defined error state and the Confirm Dates button behavior is undefined.

**Proposed solution:**
Covered in S4 above. Add to R2:
> If the availability API fails, U20 shows a warning: *"Couldn't check availability. Try again."* with an inline retry. The "Confirm Dates" button remains disabled until availability is confirmed.

---

### E5 — Race condition on POST /reservations not defined (409 conflict)
**Severity:** 🔴 Critical

**Gap:**
If the board was reserved by another user between the availability check and the reservation submission, POST /reservations will return a 409 conflict. The PRD has no defined response for this.

**Impact:**
This is the highest-stakes error in the product. The user has already agreed to terms. A silent failure or generic error here destroys trust and likely causes the user to leave permanently.

**Proposed solution:**
Define this as a named error scenario in the PRD:
> If POST /reservations returns 409 (conflict): show an inline message on the submission screen — *"Someone just reserved this board for those dates. Please go back and choose new dates or a different board."*
> Provide two CTAs: "Choose new dates" (→ P5, dates cleared) and "Browse other boards" (→ P2).

---

### E6 — General POST /reservations failure not defined (500, timeout)
**Severity:** 🔴 Critical

**Gap:**
If the reservation call fails for any reason other than a conflict (server error, network drop), the PRD defines no fallback.

**Impact:**
The user agreed to terms and clicked confirm. If nothing happens — or they see a generic browser error — they will either try again (creating duplicate submissions) or leave permanently.

**Proposed solution:**
> If POST /reservations returns 500 or times out: keep the user on P6, disable the "I Agree" button for 2 seconds, then show:
> *"Something went wrong. Your reservation wasn't created. Please try again."*
> Re-enable the button after showing the message. Do not navigate away.

---

### E7 — Email failure not defined
**Severity:** 🟢 Nice to have

**Gap:**
N14 (`sendConfirmationEmail()`) can fail. The PRD does not define what happens if the email isn't sent — does the reservation still succeed? Does the user know?

**Impact:**
Low immediate risk, but users who don't receive confirmation emails will contact support assuming the reservation failed.

**Proposed solution:**
> Email failure is non-blocking. The reservation is confirmed regardless of email status. If the email fails, log it for manual follow-up. P7 always shows the confirmation screen — the screen itself is the primary confirmation, not the email.
> Optional: add a "Resend confirmation email" link on P7.

---

---

# 4. Rules

The PRD defines what the product does but not the rules that govern edge cases, data integrity, or access control.

---

### R1 — Number of reservations per plan cycle is undefined
**Severity:** 🔴 Critical

**Gap:**
The PRD defines how many days per reservation a plan allows. It does not define how many reservations a member can make per cycle.

Examples not covered:
- Can a monthly member reserve 3 separate times in a month, each for 7 days? Or is it one reservation per cycle?
- Can a member have two active reservations at the same time?

**Impact:**
Without this rule, the backend has no business logic to enforce, and the frontend has no gate to build. This is a core business model decision.

**Proposed solution (to confirm with product owner):**

| Rule option | Description |
|-------------|-------------|
| **Option A: One active at a time** | A member can only have one active (ongoing) reservation per cycle. A new reservation can only start after the previous board is returned. |
| **Option B: One per cycle** | A member gets one reservation slot per billing cycle. Once used, they must wait for the next cycle. |
| **Option C: Unlimited per cycle** | Any number of reservations, each within the day limit. Inventory is the only constraint. |

**Recommended:** Option A for V1. It's the simplest to enforce and aligns with physical inventory management.

---

### R2 — Day rental limits per use not specified
**Severity:** 🟡 Important

**Gap:**
Day rental is defined as "1 day." But:
- Is the price fixed or variable? ("pay per use" — how much per day?)
- Can a day rental user book multiple consecutive days by making separate day rental reservations back to back?

**Impact:**
Without a price, the plan picker is incomplete. Without a rule on consecutive bookings, the business model can be gamed.

**Proposed solution:**
State in the business model:
> Day rental price: [X per day — to be defined].
> A day rental covers exactly one calendar day. Multiple day rentals cannot be stacked to simulate a longer plan — the system prevents reserving the same board on consecutive days under day rental.

---

### R3 — "Confirm Dates" button enablement condition not stated
**Severity:** 🟡 Important

**Gap:**
R2 says "the system checks availability for the selected dates before allowing confirmation" — but it doesn't define the exact condition that enables the button. Is it:
- Enabled as soon as dates are selected, regardless of availability result?
- Only enabled after availability returns "available"?
- Disabled again if the user changes the dates?

**Impact:**
Without this rule, builders will interpret it differently. Some will allow the user to click "Confirm" before availability is known.

**Proposed solution:**
Add to R2:
> The "Confirm Dates" button (U22) is only active when: (a) a start date has been selected, AND (b) the availability check has returned a confirmed "available" result. If the user changes the date, the button returns to disabled until availability is re-checked.

---

### R4 — Data format standards not defined
**Severity:** 🟡 Important

**Gap:**
Board specs are displayed as structured data (volume, size, type) but no format is defined:
- **Volume:** liters? Is it shown as "38.5L" or "38.5 liters"?
- **Size:** feet/inches or centimeters? "6'2" × 20.5" × 2.75"" or "188 × 52 × 7 cm"?
- **Dates:** DD/MM/YYYY, MM/DD/YYYY, or "Mon 14 Apr 2026"?

**Impact:**
Without format standards, different boards will display specs in different formats. International users (a core use case — traveling surfers) will be confused by locale-specific formats.

**Proposed solution:**

| Field | Format | Example |
|-------|--------|---------|
| Volume | liters, 1 decimal | 38.5 L |
| Size | feet + inches (primary), cm (secondary) | 6'2" × 20.5" × 2.75" |
| Dates | Day Month Year, spelled out | Mon 14 Apr 2026 |
| Duration | plain English | 3 days |

---

### R5 — Liability checkbox state not defined as a business rule
**Severity:** 🔴 Critical

**Gap:**
The disclosure step (P6) exists, but the rule is not stated: *is it legally required that the checkbox be checked, or is it advisory?*

**Impact:**
If this is a legal requirement, the button must be unconditionally blocked until the box is checked. If it's advisory, it can be pre-checked. This is a legal question, not a UX question — and it needs a definitive answer in the PRD.

**Proposed solution:**
Add to R9:
> The liability acknowledgment checkbox (U24) must be actively checked by the user — it cannot be pre-checked by default. The "Complete Reservation" button (U25) is disabled until the checkbox is checked. This is a legal gate, not a UX convenience.

---

### R6 — No rule on what "unavailable" means for filtering
**Severity:** 🟡 Important

**Gap:**
The board menu (P2) shows available boards. But "available" is not defined:
- Does the menu show all boards, with unavailable ones visually greyed out?
- Or does the menu only show boards that are available for the user's selected dates?
- If no dates are selected yet, what does "availability" mean on P2?

**Impact:**
Without this rule, a user might browse boards, fall in love with one, click through, and discover it's unavailable only when they reach the reservation modal. This is a known drop-off pattern in booking UX.

**Proposed solution:**
Define a two-state approach:
1. **No dates selected (default):** Show all boards. No availability filtering. Boards are shown with specs and a "Reserve" CTA.
2. **Dates selected (after reservation flow is started):** If the user returns to P2 with dates already in context, grey out boards that are unavailable for those dates.

For V1, option 1 is sufficient. The key is that this is a documented decision, not a builder's assumption.

---

---

## Summary Table

| # | Dimension | Gap | Severity |
|---|-----------|-----|----------|
| F1 | Flows | No alternative / back flows defined | 🔴 |
| F2 | Flows | No "change board mid-flow" path | 🟡 |
| F3 | Flows | No exception flow for concurrent booking (race condition) | 🔴 |
| F4 | Flows | No post-confirmation actions defined | 🟡 |
| S1 | States | Board Menu has no loading state | 🟡 |
| S2 | States | Board Menu has no error state | 🟡 |
| S3 | States | Board Detail has no loading or error state | 🟡 |
| S4 | States | Availability indicator has no loading / unavailable / error state | 🔴 |
| S5 | States | "I Agree" button disabled state not defined | 🟡 |
| S6 | States | Confirmation screen has no loading state | 🔴 |
| E1 | Errors | No past date validation defined | 🟡 |
| E2 | Errors | Date range overflow mechanic not defined | 🟡 |
| E3 | Errors | No error defined for GET /boards failure | 🟡 |
| E4 | Errors | No error defined for GET /availability failure | 🟡 |
| E5 | Errors | Race condition on POST /reservations (409) not handled | 🔴 |
| E6 | Errors | General POST /reservations failure (500 / timeout) not handled | 🔴 |
| E7 | Errors | Email confirmation failure not handled | 🟢 |
| R1 | Rules | Number of reservations per plan cycle undefined | 🔴 |
| R2 | Rules | Day rental price and stacking rule not specified | 🟡 |
| R3 | Rules | "Confirm Dates" button enablement condition not stated | 🟡 |
| R4 | Rules | Data format standards not defined (volume, size, dates) | 🟡 |
| R5 | Rules | Liability checkbox rule not stated as legal gate | 🔴 |
| R6 | Rules | "Unavailable" board display rule not defined | 🟡 |

**Totals:** 7 × 🔴 Critical — 14 × 🟡 Important — 1 × 🟢 Nice to have — 2 gaps already covered in shaping.md but not in PRD

---

## Priority order for resolution

**Before building V4–V5 (reservation engine):**
F3, F1, S4, S6, E5, E6, R1, R5 — these are the critical items that directly affect the reservation flow and its failure modes.

**Before building V1–V3 (browsing experience):**
S1, S2, S3, R4 — loading/error states and data formats affect every screen in day 1.

**Can be resolved after first demo:**
F2, F4, E1, E2, E7, R2, R3, R6 — these improve polish and edge case handling but won't block the first end-to-end test.

---

## Form (filled)

Nome do produto: Surf Club
Headline: "Alugue a prancha certa para as condições de hoje"
Subtítulo: "Assinatura de aluguel de pranchas com reserva simples: escolha, confirme datas, pegue, surfe e devolva."

Features:
1. Menu de pranchas com filtros (localização, size, volume, tipo, shaper, nível)
2. Página de detalhe com specs + card de condições (para qual mar/nível a prancha serve)
3. Seletor de plano (gate antes do calendário) com limites por plano
4. Reserva com calendário + checagem de disponibilidade antes de confirmar
5. Disclosure obrigatório (danos/termos) + confirmação com instruções de pickup/retorno

Entidades extras (além de User, Account, Session):
- Surfboard (id, name, locationId, type, shaper, size, volumeLiters, description, conditionProfile, images[], status)
- Location (id, city, town, address, latitude, longitude, pickupInstructions, returnInstructions)
- Plan (id, name, priceMonthly, maxDaysPerReservation, commitmentMonths, isActive)
- Reservation (id, userId, surfboardId, planId, startDate, endDate, status, pickupLocationId, createdAt)
- Availability (surfboardId, date, isAvailable, updatedAt)
- LiabilityAcceptance (id, reservationId, acceptedAt, checkboxVersion, userAgent, ipAddress?)

Limites por plano:
- FREE: pode navegar/filtrar e ver detalhes, mas não pode reservar (precisa escolher um plano pago para ativar o calendário)
- TRIAL (14 dias): tudo ilimitado
- PRO: tudo ilimitado

Preço:
- PRO: R$ 289/mês

Cores:
- Primária: #3366FF
- Fundo: #1A1D29
- Acento: #F5C542
