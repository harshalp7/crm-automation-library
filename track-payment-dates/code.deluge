void automation.UpdateFirstPayment(Int deal_id)
{
// Fetch the deal details from Zoho CRM
deal_response = zoho.crm.getRecordById("Deals",deal_id);
// Extracting required fields from the deal
icl_visa_fees = ifnull(deal_response.get("ICL_Visa_Fees"),0);
icl_gst = ifnull(deal_response.get("ICL_GST"),0);
payment_initiated = ifnull(deal_response.get("Payment_Initiated_GC"),0);
payment_made_other = ifnull(deal_response.get("Latest_Payment_Made_in_NZD"),0);
first_payment_date = deal_response.get("First_Payment_Date");
full_payment_date = deal_response.get("Full_Payment_Date");
// Calculating total visa fees + gst
total_fees = icl_visa_fees + icl_gst;
// Check if payment initiated is > 0 but less than total fees
if(payment_initiated > 0 && payment_initiated <= total_fees)
{
	// Update first payment date with current date if not already set
	if(first_payment_date == null)
	{
		update_map = Map();
		update_map.put("First_Payment_Date",zoho.currentdate.toString("yyyy-MM-dd"));
		update_response = zoho.crm.updateRecord("Deals",deal_id,update_map);
		info update_response;
	}
}
// Check if payment made other is > 0 but less than total fees
if(payment_made_other > 0 && payment_made_other <= total_fees)
{
	// Update first payment date with current date if not already set
	if(first_payment_date == null)
	{
		update_map = Map();
		update_map.put("First_Payment_Date",zoho.currentdate.toString("yyyy-MM-dd"));
		update_response = zoho.crm.updateRecord("Deals",deal_id,update_map);
		info update_response;
	}
}
// Check if payment initiated + payment made other equals total fees
if(payment_initiated + payment_made_other == total_fees)
{
	// Update full payment date with current date
	if(full_payment_date == null)
	{
		update_map = Map();
		update_map.put("Full_Payment_Date",zoho.currentdate.toString("yyyy-MM-dd"));
		update_response = zoho.crm.updateRecord("Deals",deal_id,update_map);
		info update_response;
	}
}
}
