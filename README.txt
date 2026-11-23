RigCalc Pro Beta 1.19.5 — String Modeling Rebuild

This release removes both legacy automatic-string systems and replaces them with one String Modeling module.

- Separate Drill String and Casing Run models
- Independent saved values
- Component name, length, ID and OD
- Calculated From/To MD
- Internal volume by section
- Automatic-depth toggle
- Add/delete sections
- Linked volume, strokes-to-bit and time-to-bit
- Linked Live Well, Fluid Tracker, Hydraulics, Full Circulation, Trip Pill and Live Operations refresh
- Existing legacy depth-based string arrays are migrated where possible

Automatic depths: rows are surface-to-bit; the first section absorbs current bit-depth changes so the lower assembly remains on bottom.
