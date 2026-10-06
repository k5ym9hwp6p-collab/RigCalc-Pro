RigCalc Pro Beta 1.08 — Returns Coming

Open Live Well Profile, enter valid hole/string geometry, pump output (m³/stroke) and SPM. Tag an event at the bit, then use Live Circulate Start/Pause. 18.5 L/stroke is 0.0185 m³/stroke.

New in this build:
- Multiple tagged return events, ordered by remaining annular volume.
- Origin MD/TVD, formation and expected pressure range retained at tagging.
- Current MD/TVD, remaining volume, strokes and predicted surface clock time.
- Paused/pumps-off ETA, connection and reverse-flow holds.
- Arrival history retained until cleared; circulation reset clears all tags.
- Snapshot annular geometry prevents later bit-depth/geometry edits from moving existing tags.
- Tags and history persist on this device.
- Contextual calculation explanation inside the panel.

Tracking uses the effective-volume circulation ledger; output/rate changes do not rewrite past displacement. Geometry at tagging must cover surface to origin without gaps or overlaps. Enter string OD for each annular interval in Hole Geometry. Formation pressures use the existing kPa/m gradients converted to kg/m³ EMW.

Sweep tags represent the leading edge at the bit, not the moment a sweep starts down the drill string. Use the existing Fluid Tracker for down-string travel. Geometry-based estimates exclude surface-line capacity, fluid slip and mixing. Arrival timestamps show when the app detected arrival. Partial-return efficiency is a user-entered approximation, not a calibrated loss/slip model.

Deploy all included files together to your existing web host. The service-worker cache is updated for Beta 1.08. Device inputs use the existing storage keys.

RigCalc Pro Beta 1.07

New — Live Circulate 2.0

- Timestamped circulation-volume ledger preserves each rate, output, state and return-path segment.
- Pump-rate changes no longer recalculate earlier circulation at the newest rate.
- Marker positions remain fixed through pauses and pumps-off connections.
- Operating states cover normal, continuous, MPD, displacement, partial-return and reverse-circulation workflows.
- Separate pumped and effective tracking volumes support partial-return estimates.
- Dynamic volume, strokes and time remaining update from the active segment.
- Manual volume corrections require a reason and are retained in the ledger.
- Circulation history can be exported as CSV.
- Formation pressure entries now support low / expected / high gradients, source and confidence.

Reverse-circulation safety behavior
The reverse-flow volume is recorded, but the normal forward-annulus marker is intentionally held until a dedicated reverse-path geometry model is configured.

Retained — Beta 1.06 Education Layer

New — Education Layer

Education Mode
- Global dashboard toggle.
- Adds contextual Learn buttons to key calculated outputs while leaving the normal field interface clean when switched off.
- The preference is stored locally on the device.

RigCalc Academy
- Dedicated dashboard module with initial lessons for:
  • Volumes & Capacities
  • Pumps & Bottoms-Up
  • Live Well Profile
  • Trip Pill
  • Cementing
  • Well Control
  • Managed Pressure Drilling

Dynamic education panels
- Explain what the value means and why it matters.
- Show the metric formula used.
- Explain the variables.
- Pull current RigCalc inputs/results into worked examples where practical.
- Explain what makes the result increase/decrease.
- Highlight assumptions, simplifications and field cautions.

Existing Beta 1.05 polished interface and functionality are retained.

Training boundary
The Education layer explains calculations and assumptions. It does not replace approved drilling programs, company/operator procedures, certified well-control training, cement programs, MPD procedures or verified field instrumentation.

Validation for Beta 1.08
- Calculation acceptance case passed: 1240 / 1740 / 2310 strokes at 55 SPM; after 550 strokes, 690 / 1190 / 1760 at 40 SPM give 17.25 / 29.75 / 44.00 minutes.
- Annular section boundaries, marker ordering, invalid geometry, output changes, pause, connection and arrival tests passed.
- Actual circulation ledger + mocked DOM adapter tests passed for tagging, retained origin pressure, rate checkpointing, paused position, storage, arrivals and reset.
- JavaScript syntax checks passed. Full browser/device rendering has not been verified in this environment.
- Re-run Node tests from the app folder: node tests/returns-test.cjs and node tests/integration-test.cjs.

Tracked-fluid pumped volume update
- Each active fluid card shows volume pumped / total (m³), left to pump, and percentage pumped with a separate progress bar.
- Pumped volume uses the existing cumulative pump-volume ledger minus the batch's saved start volume. It stops increasing at the entered batch volume; later displacement still moves front/tail markers.
- Pauses and rate/output changes follow the existing ledger. Manual meter corrections also adjust this display.
- The existing front/tail travel bar remains separate. Adding a fluid starts it at the current pump total; this update does not introduce a sequential batch queue.
- Upload the updated app.js, styles.css and service-worker.js together. Tests stay local and are not needed on the web host.
