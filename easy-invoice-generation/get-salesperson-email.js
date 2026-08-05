string getSalesperson(string email)
{
// Define the output number
output_number = "";
if(email.contains("A"))
{
	output_number = "no. for A";
	// Assign number for A
}
else if(email.contains("B"))
{
	output_number = "no. for B";
	// Assign number for B
}
else
{
	output_number = "default no.";
	// Default number for no match
}
// Return the number as a string
return output_number;
// Log the result
}
