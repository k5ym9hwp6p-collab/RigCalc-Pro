RigCalc Pro Beta 1.19.8

Fixes the blank String modeling table in Beta 1.19.7. Restores
fluid tracker state and Live Well circulation initialization, keeps the
existing storage keys, and updates string readouts when bit depth changes.

Deploy the files together to the same site address to retain saved inputs.
The app header should show BETA 1.19.8 after the service worker updates.

Validation: JavaScript startup and UI event handlers tested with a simulated
DOM, including default and saved models, a saved sweep, section editing,
casing mode, depth and volume calculations, and circulation start/pause.
