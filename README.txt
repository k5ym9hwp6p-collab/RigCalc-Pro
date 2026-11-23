RigCalc Pro Beta 1.19.7 — String Modeling Startup Fix

Built from Beta 1.19.6.

Root cause
- The app still called verifyWellSetupReady() during startup.
- That helper was removed during the clean String Modeling rebuild.
- The undefined function caused a ReferenceError before the String Modeling module was reached.

Fixed
- Removed the orphan helper call.
- Initial Well Setup rendering now runs after the rest of the app has finished initializing.
- The initial Well Setup render is isolated so one render error cannot stop later modules from loading.
- Clean Drill String / Casing Run modeling from 1.19.5 remains in place.
- 1.19.6 Flow Areas fix remains in place.
- Added a String Modeling ready marker for easier troubleshooting.

Validation
- JavaScript syntax checked with Node.
- No verifyWellSetupReady references remain.
- Clean String Modeling initialization remains present.
- ZIP integrity checked.
