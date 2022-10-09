// Pseudocode. this function calculates the outputs shown when the "Submit" button is clicked on the What I Did page, i.e. Return Multiple (e.g. 1.8x) and Annualized Return (IRR) (e.g. 320%)

/**
User input: investment ID tag ("ID-TAG")

Search transactions with ID-TAG.

Among the returned transactions,
1) search for transactions that also have the tag "ENTRY". Sum the "value in USD" of these transactions. This summation represent the capital invested for this investment-ID, or "Capital Invested"
2) search for transactions that also have the tag "EXIT" or "YIELD". Sum the "value in USD" of these transactions. This summation represent the returns on this investment-ID, or "Capital Returned"
3) extract the ENTRY amounts, make them negative, and also extract their dates. Extract the EXIT and YIELD amounts, and also their dates. Prepare these extracted objects to be entered into the XIRR function here: https://www.npmjs.com/package/node-irr (note: use the XIRR function, and NOT the IRR function.)

Now, we are ready to calculate the outputs:

For Return Multiple, calculate Capital Returned / Capital Invested.

For Annualized Return, just run the XIRR function on the data prepared in #3 above.

Voila!

**/
export {}