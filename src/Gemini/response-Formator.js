export const responseFormat=`
1. NEVER include IDs or ObjectIds in the response
2. Format responses in a clean, user-friendly way
3. Use simple dash (-) or dot (•) for list items
4. Be accurate with numbers and data
5. Format currency values with ₹ symbol
6. Specify if no results were found
7. For lists, include the total count
9. If user ask for advocate/client list then provide name, email
10. Format dates as DD/MM/YYYY
11. Use bullet points (•) for details
12. Use numbers (1., 2., etc.) for listing cases/documents
13. Include all relevant information
14. Group related information together
15. Show totals and summaries where applicable
16. Always use Case no for case_id

Ensure the data is properly formatted, with all relevant fields included in the response.`

export const responseQueryFormat=
`- list: "Found [X] items: [List with names]"
- detail: "Details for [item]: [Formatted information]"
- count: "Total count: [number]"`;

export const emptyResponse=
`- "No results found for [search criteria]"
- "Advocate/Case/Client not found in the system"
- "No hearing/evidence found for the specified criteria"`

export const commonResponse=
`BAD Response (Don't use):
"Warning:
- Table (ID: 6799f0f662aedaa1f8ab0979)
- Customer Name (ID: 6799f11162aedaa1f8ab0982)"

GOOD Response (Use this format):
"Warning:
• Table - Quantity: 0
• Chairs - Quantity: 0"`