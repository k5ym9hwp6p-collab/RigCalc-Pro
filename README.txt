RigCalc Pro Beta 1.15 — BHA Anchored to Bit Depth

INSTALL
Extract and upload all app files to the SAME existing website folder. README.txt is optional. No test files are included. Keep website data to retain inputs. Close/reopen and reload after upload to see Beta 1.15.

USE
Open Live Well Profile > Well Setup > String modeling in Drill String mode. Anchor BHA to current bit depth is enabled by default.
- Enter drill-pipe ID and OD in the first row. Its length is automatic.
- Enter BHA components from top to bottom: fixed length, ID and OD for each.
- From MD and To MD are calculated, not entered. Use arrows to reorder components; × removes a BHA component; Add adds one below the existing assembly.
- Changing Current bit depth moves the complete BHA to bottom and fills the remaining length above it with drill pipe.
- A 300 m BHA occupies 3200–3500 m at 3500 m bit MD, and 3300–3600 m at 3600 m bit MD.

ONE-TIME REVIEW
Existing drill-string rows are copied into a new anchored model. The first/top row becomes the auto-length drill-pipe row; subsequent rows become fixed-length BHA components using their previous To minus From depths. Existing IDs are retained. ODs are copied from any component OD or the hole geometry at the former component midpoint. Review lengths, order and ODs once, especially if the previous first row was not drill pipe. A newly added component requires its real OD before valid estimates are available.

CALCULATIONS
Internal capacity, string displacement functions, annular capacity/volumes, bottoms-up tracking, flow bands, hole-cleaning calculations, full-circulation tracking and trip-pill string-volume functions use the calculated component intervals. Dynamic annular intervals are split at both hole boundaries and string/BHA boundaries. Hole IDs and excess volume remain entered in Hole / annulus sections. Their old fixed string-OD inputs are disabled while the anchored model supplies ODs. The last hole interval extends to current bit MD with its last entered ID/excess; add/edit a physical interval when hole size changes.

The BHA cannot exceed current bit MD. Components require positive lengths and valid ID < OD, with hole/casing ID larger than string OD. Errors are shown in String modeling; estimates are marked for checking instead of showing a valid arrival. Pumped-volume accounting is not reset by depth changes.

COMPATIBILITY
Original depth-based drill-string rows remain saved and are available by switching off Anchor BHA. The separate Casing Run model is unchanged and remains depth-based. Switching modes preserves the anchored BHA. Other well inputs and the simplified Beta 1.14 layout are retained. Well Control Live and Returns Coming remain removed.

VALIDATION
Passed production-logic checks for 3500→3600 m anchoring, fixed lengths/order, DP fill, internal/annular volume deltas, final-hole extension, return-position calculations, invalid dimensions, shallow wells, editor edits/add/reorder/delete, persistence/reload, manual fallback and casing isolation. JavaScript syntax and HTML element IDs checked. Full browser/phone visual rendering has not been verified in this environment.
