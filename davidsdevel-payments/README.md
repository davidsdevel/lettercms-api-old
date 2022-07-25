# Payments API

### API

Obtain Payment Data
GET /api/payment

Update Payment Data
PATCH /api/payment

Retrieve invoice list
GET /api/payment/invoice

Retrieve Invoice by ID
GET /api/payment/invoice/:id

Delete invoice
DELETE /api/payment/invoice/:id

Export as PDF, JSON, XML
GET /api/payment/invoice/:id/export


POST /v2/invoicing/generate-next-invoice-number

List invoice
/v2/invoicing/invoices
fields
page
page_size
total_required
