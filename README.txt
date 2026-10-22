RigCalc Pro Beta 1.16 — Automatic Multi-Section String

INSTALL
Extract and upload the app files to the SAME existing website folder. README.txt is optional. No test files are included. Keep website data to retain inputs; close/reopen and reload after uploading.

STRING MODELING
Open Live Well Profile > Well Setup > String modeling. Automatic string depths supports any number of DP, HWDP, collar and BHA/tool sections. Each row has its own name, ID and OD.

BEHAVIOURS
Fixed length: enter length in metres. The length remains unchanged. Rows below Auto-fill move with the bit; rows above it are placed from surface in sequence.
Fixed To MD: enter the MD at the bottom/end of that row, not its length. Its start follows the previous row; its length is calculated. Fixed To MD boundaries must be above Auto-fill and increase down the string.
Auto-fill: exactly one row fills the remaining depth between the rows above and the fixed assembly below. Its length is read-only and From/To depths are calculated.

EXAMPLES
Auto-fill DP size 1 > fixed 300 m DP size 2 > fixed 200 m HWDP > fixed 100 m BHA. At bit 3500 m, DP1 is 2900 m long. At bit 3600 m, DP1 becomes 3000 m; the other lengths stay fixed and move down by 100 m.
DP size 1 Fixed To MD 1000 m > Auto-fill DP size 2 > fixed 200 m HWDP > fixed 100 m BHA. At bit 3500 m, DP2 occupies 1000–3200 m. At 3600 m it occupies 1000–3300 m.

EDITING
Add creates a fixed-length section at the bottom. Enter its real ID/OD and length; use arrows to place it in order. Delete removes a non-Auto-fill row. Before deleting Auto-fill, choose Auto-fill on another row. Choosing a new Auto-fill converts the old one to its currently calculated fixed length (review the resulting arrangement). A missing Auto-fill, conflicting boundary, invalid dimensions or too-shallow bit depth shows a validation message rather than a usable prediction.

DATA AND CALCULATIONS
Existing Beta 1.15 BHA values convert automatically to a first Auto-fill pipe row and fixed-length rows. Original manual drill-string data and separate Casing Run data are retained. Turning Automatic string depths off restores manual mode. Switching Casing Run does not alter the automatic assembly.
The calculated sections are shared by internal capacities, pipe-volume functions, annular volumes, bottoms-up tracking, flow bands, hole-cleaning and trip-pill string-volume functions. The last hole interval extends to current bit MD with its entered ID/excess; add a physical hole interval when the hole diameter changes. Pumped-volume history is not reset by section/depth edits.

VALIDATION
Calculation and production-editor tests passed for two DP ODs, HWDP/BHA, 3500→3600 m depth changes, fixed MD boundaries, one Auto-fill, section ordering and coverage, capacity changes, add/edit/reorder/delete, auto-fill reassignment, validation, reload persistence, Beta 1.15 migration, manual fallback and casing isolation. Other tool sections compared unchanged. JavaScript syntax and HTML IDs checked. Full phone/browser rendering has not been visually verified in this environment.
