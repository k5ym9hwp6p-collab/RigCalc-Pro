RigCalc Pro Version 1.10

New — Trip Pill / Weighted Pill Balance

Purpose
- Estimate how far a weighted pill / slug can lower the fluid level inside the drill string before static hydrostatic balance.
- Designed as a planning/checking aid for tripping out of hole and estimating dry pipe.

Inputs
- Active mud density
- Pill density
- Pill volume
- Current bit MD
- Stand length
- Pump output
- Optional direct link to Live Well Profile geometry

Geometry integration
- Uses the detailed drill-string internal diameter sections already entered in Live Well Profile.
- Uses the directional survey TVD for hydrostatic balance.
- Handles changing internal capacities as the pill moves through drill pipe / HWDP / collars / BHA.
- Can pull current bit depth and pump output from Live Well Profile.

Outputs
- Pill strokes
- Initial pill bottom
- Balanced fluid level / pill top
- Balanced pill bottom
- Pill MD length at balance
- Dry-pipe drop in metres
- Dry stands, whole stands and remaining metres
- Pill top/bottom TVD
- Initial hydrostatic excess
- Static balance status and schematic

Calculation basis
RigCalc solves:
mud density × TVD(top)
=
(pill density − mud density) × [TVD(bottom) − TVD(top)]

The pill bottom is solved from fixed pill volume through the actual variable drill-string internal capacities.

Important limitations
This is a static hydrostatic estimate only. It does not model gel strength, restrictions, float valves, trapped pressure, compressibility, temperature, dynamic U-tubing, swab/surge, losses, influx, or pill mixing quality. Verify against approved drilling procedures and field measurements before operational use.
