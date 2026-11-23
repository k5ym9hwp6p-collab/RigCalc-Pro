RigCalc Pro Beta 1.19.2 — Well Setup Startup Fix

Built from Beta 1.19.1.

Root cause fixed
- Beta 1.19.1 executed its automatic Drill String repair routine before the saved Drill String model had been initialized.
- Because drillStringData is declared later with let, the early reference caused a JavaScript startup error.
- That stopped the rest of the Live Well / Well Setup initialization, making Well Setup appear non-functional.

Fixed in 1.19.2
- Moved automatic string repair until after Drill String and Casing Run models are loaded.
- Well Setup survey and hole controls now initialize normally.
- Add Survey / Add Hole handlers are null-safe.
- Survey and hole table rendering is protected against missing optional UI elements.
- String modeling repair still runs, but at the correct initialization point.
- Existing Drill String, Casing Run, survey, hole geometry, Well Files and Live Operations data are preserved.

Validation
- JavaScript syntax checked with Node.
- Verified repairRigCalc ordering: drillStringData initializes before repairBhaModel() executes.
- ZIP integrity checked.
