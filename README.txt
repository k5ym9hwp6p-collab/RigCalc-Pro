RigCalc Pro Version 1.11

Trip Pill refinement
- Added an independent dry-pipe engineering cross-check based on:
  overbalance × (wellbore/casing capacity − tubular metal displacement)
  ÷ (mud gradient × tubular metal displacement)
- Metric inputs: formation pressure gradient in kPa/m, wellbore/casing capacity in m³/m, metal displacement in m³/m.
- Automatic overbalance is calculated from active mud gradient vs formation gradient at current TVD.
- Optional manual overbalance override.
- Cross-check dry length and stands are displayed beside the full geometry-based pill-balance result.
- Percentage difference between the two methods is shown with a review flag when assumptions/models differ materially.

MPD refinement
- Added pore pressure and fracture pressure summary.
- Added lower and upper operating limits after entered safety margins.
- Added static and circulating margins to both pore and fracture limits.
- Added a clear operating-window banner indicating inside-window, limited-margin, outside-window, or overlapping-limit conditions.

Important
These additions are engineering calculation/checking aids, not operating instructions. The trip-pill cross-check is a simplified independent formula and will not necessarily match the variable-ID hydrostatic model exactly. MPD outputs depend entirely on verified gradients, friction pressure, backpressure and safety margins. Use approved field procedures, instrumentation and engineering limits.
