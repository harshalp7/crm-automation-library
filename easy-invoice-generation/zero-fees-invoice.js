int zero_fees_invoice(string fees)
{
if(fees == null || fees == "" || fees == "0")
{
	fees = 0;
}
else
{
	fees = fees;
}
return fees;
}
