RigCalc Pro Beta 1.19.4 — String Modeling Boot Fix

Built from Beta 1.19.3.

Root cause fixed
- Automatic String Modeling is consulted during the first Live Well / Well Setup calculation.
- `stringMode` was declared later with `let`.
- That created a JavaScript temporal-dead-zone error when autoBhaActive() ran during initial startup.
- The error occurred before String Modeling finished initializing, which is why the table/mode controls could remain non-functional even after the previous structural fixes.

Fixed in 1.19.4
- `stringMode` is now boot-safe and available during the earliest Well Setup calculations.
- autoBhaActive() safely determines Drill String / Casing Run mode during startup.
- Automatic String Modeling is rendered again after its override and handlers are fully installed.
- Drill String / Casing Run switching refreshes the displayed calculation source.
- Automatic String controls are guarded against stale cached markup.
- Existing saved Drill String, Casing Run, automatic BHA/string sections, survey and hole data are preserved.

Validation
- JavaScript syntax checked with Node.
- Verified stringMode is boot-safe before the initial renderWP()/updateProfile() call.
- Verified automatic String Modeling override initializes after string model state.
- ZIP integrity checked.
