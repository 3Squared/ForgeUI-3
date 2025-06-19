---
"@3squared/forge-ui-3": patch
---

Update passthroughs for Dropdown and Columns for small fixes

* Make dropdown disables use different cursor, fgor when disabled, so it doesn't look like you can click it
* Add conditional logic on the sort badge icons, if the table is also sorted by the row group and an additional column, as this adds a 1 next to the single sortable field, and doesn't match the standard functionality