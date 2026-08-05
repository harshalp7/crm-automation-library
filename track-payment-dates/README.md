# Track Payment Dates

Automatically records the **First Payment Date** and **Full Payment Date** for a Deal based on payments received.

## Overview

This workflow monitors payment-related fields on the **Deals** module and automatically updates payment milestone dates.

### Trigger

The workflow executes whenever either of the following fields is modified to a value greater than **NZD 0.00**:

- `Payment Initiated (GC)`
- `Payment Made (Other)`

The workflow runs every time these fields are updated.

![track-payment-dates](workflow-rule-screenshot.png)

---

## Workflow Logic

### Condition 1

**First Payment Date** is empty.

**Action**

Runs the custom function:

```
UpdateFirstPaymentDate
```

---

### Condition 2

- First Payment Date is **not empty**
- Full Payment Date is **empty**

**Action**

Runs the custom function:

```
UpdateFullPaymentDate
```

---

## Custom Function

### Function Name

```
UpdateFirstPayment
```

### Fields Used

| Field | Purpose |
|--------|---------|
| ICL Visa Fees | Visa fee amount |
| ICL GST | GST amount |
| Payment Initiated (GC) | Payments initiated through GoCardless |
| Latest Payment Made in NZD | Manual/other payments |
| First Payment Date | Stores the date of the first payment |
| Full Payment Date | Stores the date when payment is completed |

---

## Business Logic

### 1. Calculate Total Amount

```
Total Fees = ICL Visa Fees + ICL GST
```

---

### 2. Set First Payment Date

If either payment source has received a payment:

```
Payment Initiated > 0
AND
Payment Initiated ≤ Total Fees
```

**OR**

```
Payment Made (Other) > 0
AND
Payment Made (Other) ≤ Total Fees
```

Then:

- If **First Payment Date** is empty
- Set it to today's date.

This happens only once.

---

### 3. Set Full Payment Date

If:

```
Payment Initiated
+
Payment Made (Other)
=
Total Fees
```

Then:

- If **Full Payment Date** is empty
- Set it to today's date.

This also happens only once.

---

## Example

| Visa Fees | GST | Payment Initiated | Payment Made (Other) | Result |
|-----------:|----:|------------------:|---------------------:|--------|
| 4,000 | 600 | 1,000 | 0 | First Payment Date is recorded |
| 4,000 | 600 | 2,000 | 2,600 | Full Payment Date is recorded |
| 4,000 | 600 | 4,600 | 0 | Both First Payment Date and Full Payment Date are recorded |

---

## Notes

- First Payment Date is never overwritten after it is populated.
- Full Payment Date is only recorded once the total payments equal the total invoice amount.
- Payments from both **GoCardless** and **Other Payments** are combined when determining whether the invoice has been fully paid.
- The workflow safely ignores subsequent updates after the payment dates have already been populated.
