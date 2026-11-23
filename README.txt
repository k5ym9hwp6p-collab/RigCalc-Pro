RigCalc Pro Beta 1.19.3 — String Modeling Interaction Fix

Built from Beta 1.19.2.

Root cause
- Beta 1.19.2 accidentally embedded verifyWellSetupReady() inside switchStringMode().
- That broke the Drill String / Casing Run switching path and prevented String Modeling from behaving normally.

Fixed
- Restored switchStringMode() as a complete standalone function.
- Moved Well Setup verification into its own standalone function.
- Drill String / Casing Run buttons switch models cleanly.
- Linked Live Well calculations refresh immediately after switching.
- Base and automatic String Modeling table renderers are null-safe.
- Add String control is null-safe.
- Automatic String Modeling retains Auto-fill, Fixed length and Fixed To MD behaviors.
- Fluid Tracker now uses true combined two-pump flow.

Validation
- JavaScript syntax checked with Node.
- String-mode function structure checked.
- Automatic String Modeling hooks checked.
- ZIP integrity checked.
