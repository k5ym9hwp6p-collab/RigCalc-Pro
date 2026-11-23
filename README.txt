RigCalc Pro Beta 1.19.1 — String Modeling Fix

Bug-fix release built from Beta 1.19.

Fixed
- Drill String / Casing Run switching now forces all linked Live Well calculations to recalculate immediately.
- Automatic Drill String mode now uses the current in-memory mode rather than a separate stale localStorage mode check.
- Added a repair pass for invalid or stale automatic string data.
- If an old automatic model is unusable, RigCalc rebuilds it from the saved Drill String rows rather than showing a table that calculations ignore.
- Visible automatic Drill String rows are now explicitly identified as the calculation source.
- Mobile input edits are saved immediately; full geometry recalculates on commit/change.
- String-to-bit time now uses the true combined flow when two pumps are active.
- Switching modes refreshes:
  • hole/annulus geometry
  • Live Well returns
  • Fluid Tracker
  • Hydraulics / Hole Cleaning
  • Full Circulation
  • Trip Pill
  • Live Operations

Data preservation
- Existing Drill String and Casing Run saved models are retained.
- Automatic Drill String data is repaired only if its basic section geometry is invalid or it lacks exactly one Auto-fill section.
