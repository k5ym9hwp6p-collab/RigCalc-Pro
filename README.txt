RigCalc Pro Beta 1.19.6 — String Modeling Runtime Fix

Built from Beta 1.19.5.

Root cause fixed
- 1.19.5 removed the old BHA/String Modeling state.
- The Flow Areas renderer still referenced the retired `bhaState` variable.
- That caused a runtime ReferenceError after the new String Modeling module loaded.

Fixed
- Flow Areas now uses the clean String Modeling sections directly.
- Removed the last legacy BHA/String Modeling reference.
- Hardened Flow Areas against missing optional SVG containers.
- Clean Drill String / Casing Run module remains unchanged.

Validation
- No legacy BHA/String Modeling references remain.
- JavaScript syntax checked with Node.
- ZIP integrity checked.
