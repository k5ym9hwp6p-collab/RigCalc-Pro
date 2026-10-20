RigCalc Pro Beta 1.12 — Automatic Formation-Top Returns

UPLOAD
Extract this ZIP and upload its app files into the SAME existing website folder. Keep the same website address. There is no test folder to upload. README.txt is optional.
Do not clear website data: existing inputs are retained under the same storage keys. The new service-worker version updates the app cache; after uploading, close and reopen the app, then reload if required. A cache update does not clear entered well data.

USE
1. Open Live Well Profile > Returns Coming.
2. Expand Formation tops & expected pressure. Add each formation name, top MD and optional low/high expected pore-pressure EMW in kg/m³.
3. In Hole Geometry, enter continuous surface-to-bit intervals with hole/casing ID and applicable string OD. Keep BHA/DP boundaries current before crossing a top.
4. Auto-tag is on initially. Increase bit MD past a top and confirm the field (Done/Return or tap elsewhere). Each crossed top creates a tag. A depth jump crossing several tops creates one tag for each at the detection-time cumulative volume, not inferred individual crossing times.
5. Use Circulate Live Start/Pause. Tags move by actual accumulated calculated pumped volume. Zero SPM holds position. Changing SPM or output does not rewrite past displacement.
6. The manual event box tags gas shows, sweeps already at the bit, and other events. Use Fluid Tracker for a sweep travelling down the string.

BEHAVIOUR
- Origin MD/TVD, formation, expected pressure and annular geometry are retained on each tag.
- Reaming, reopening, removing a tag and resetting circulation do not create duplicate formation tags.
- Circulation reset clears tags/history but retains duplicate protection. For a new well: set starting MD, then use Start new well tags under How tracking works.
- Existing tops above the initial/deepest confirmed bit MD are not backfilled. Adding or editing a top does not invent a past crossing.
- Missing geometry still records the crossing but shows Arrival estimate unavailable. Fix intervals and use Retry with entered geometry to explicitly recalculate that tag from its original reference.
- Blank/invalid output or SPM shows Arrival estimate unavailable. An explicit 0 SPM or Pause displays a paused ETA.
- Orange plot markers represent automatic tags; purple represents manual events. Predicted arrivals are retained in expandable history. These are not observed arrivals.
- Directional TVD comes from the existing survey; a missing survey range displays TVD unavailable and suppresses that plotted tag.

ACCEPTANCE EXAMPLE
At 3400 m MD: 0–1200 m, 244.5 mm ID x 127 mm OD; 1200–3000 m, 216 mm ID x 127 mm OD; 3000–3400 m, 216 mm ID x 171 mm OD. No excess volume.
Total annulus: 89.767947 m³. At 0.0185 m³/stroke: 4852.321 strokes to surface.
After 1000 strokes (18.5 m³), tag location: 2456.582 m MD. At 40 SPM: 3852.321 strokes / 96.308 minutes remaining.

VALIDATION
Calculation and production-logic integration checks passed for the example, multiple crossed tops, reaming/reload/reset duplicate prevention, new-well reset, pause/rate/output changes, missing data, geometry retry and legacy storage preservation. JavaScript syntax and HTML element references checked. Full browser/phone visual rendering has not been verified in this environment.

MODEL NOTES
Pressure is expected reference data, not a measurement. Idealized fluid-parcel tracking excludes cuttings/gas slip, mixing and surface-line volume. A tag freezes the entered annulus at detection; updating geometry later does not move existing tags. Geometry changes can be applied explicitly to tags that had no valid initial estimate.
Legacy live sessions store elapsed time only: their initial volume is migrated using the saved rate/output available at upgrade. Historical rate changes cannot be reconstructed from that older data format. All future rate/output segments accumulate independently.

Retained from Beta 1.11:
RigCalc Pro Beta 1.11 — Live Circulation Visualization

New in Full Circulation
- Blue = down active string.
- Green = up annulus.
- Marker changes color by phase.
- Marker label includes direction arrow plus MD / TVD.
- Current Location card shows phase, MD, TVD, total pumped, loop number and next event.
- Proportional phase scale shows string-volume vs annular-volume portions of one loop.
- Existing loop volume, strokes, time, progress and remaining values are retained.
