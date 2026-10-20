RigCalc Pro Beta 1.13 — Trajectory Flow Areas

UPLOAD
Extract and upload the included app files into the SAME existing website folder. README.txt is optional. No test folder is included. Keep website data to retain your inputs and formation tags. Close and reopen/reload the app after uploading to see Beta 1.13.

NEW DISPLAY
- Blue centre: inside the active drill string (or active casing in Casing Run mode).
- Teal outer band: cased-hole annulus.
- Amber outer band: open-hole annulus.
- Enter Casing shoe in metres MD beside the trajectory. The boundary can split an existing interval without changing its entered dimensions or calculated total annular volume.
- Until shoe MD is entered, annulus is shown as an unclassified grey dashed band. No cased/open split is guessed. Explicit 0 means all open hole; a shoe below bit means all currently modelled annulus is cased.
- Tap a band for its depth range, capacity in L/m and volume in m³. Tap a total to inspect all matching sections. This works in the main and zoom views. Tap blank plot space for full screen.
- Show flow areas toggles the bands. The full-circulation marker moves along the central string on the down leg, then along the annular band on the up leg. The return-front and tagged-return dots also use the annular band.
- All paths follow the existing MD/TVD trajectory and survey vertices. Display widths and marker offsets are schematic, not a diameter scale.

CALCULATIONS
String capacity = pi/4 × string ID². Annular capacity = pi/4 × (hole/casing ID² − string OD²) × entered excess-volume factor. IDs and ODs are converted from mm to metres; L/m = m³/m × 1000. Volume = capacity × MD interval length.
The casing-shoe field CLASSIFIES intervals. It does not supply a casing ID or change hole/string dimensions. Enter the appropriate casing ID, hole diameter and string/BHA OD in Hole / annulus sections. Enter string component IDs in String modeling.
Totals cover modelled valid intervals. Missing, overlapping or invalid dimensions produce a notice. Extend the directional survey to the bit for complete band rendering. Existing partial/invalid input calculations in other modules are not replaced by these display checks.

VALIDATION
Calculation and adapter tests passed for cased/open/string totals, casing-shoe splits, unknown shoe, directional survey vertices, tap/keyboard handler wiring, zoom selection, marker offset, display toggle, invalid geometry, and active casing mode. Combined regression tests passed for automatic formation tags and circulation accounting. HTML IDs and JavaScript syntax checked. Full browser/phone visual rendering has not been verified in this environment.

Retained from Beta 1.12:
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
