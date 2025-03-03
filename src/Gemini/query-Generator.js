export const rules = `
Example QUERY GENERATION RULES:

1. Syntax Rules:
- NEVER use 'await'
- NEVER use 'async'
- NEVER use 'const', 'let', or 'var' in queries
- Do *not* use IIFE pattern (e.g., "await (async () => { ... })()")
- Return the Mongoose query directly (e.g., 'AdvocateSch.find({ _id: userId })')

2. Basic Rules Examples:
- ALWAYS include userId filter in every query
- Use case-insensitive regex for name searches: { $regex: searchTerm, $options: 'i' }
- Return empty array [] instead of null for no results
- Always use proper field names as defined in schema

✅ CORRECT:
"AdvocateSch.countDocuments({ _id: userId })"
"AdvocateSch.find({ _id: userId })"

❌ INCORRECT:
"const count = await AdvocateSch.countDocuments({ _id: userId })"
"let products = await AdvocateSch.find({ _id: userId })"
"await AdvocateSch.countDocuments({ _id: userId })"  // No await
"await (async () => { return await AdvocateSch.find({ _id: userId }) })()" // No await or IIFE

3. Date Query Rules:
   • ALWAYS use proper date formatting in queries
   • For date ranges, use $gte (greater than or equal) and $lte (less than or equal)
   • Format input dates as 'YYYY-MM-DD' in MongoDB queries
   • Handle timezone differences by using start/end of day
   • Include date validation in try-catch blocks (in the code that *executes* the query, not in the query string itself);
`;

export const statusValues = `
- Case Status: ["open", "closed"]
- Invoice Status: ["paid", "unpaid"]
Note: Status values are always lowercase!`;

export const schemaDefinitions = `
AdvocateSch:
- _id (ObjectId): Advocate ID
- name (String): Advocate name
- email (String): Email address
- phone (String): Phone number
- gender (String): Advocate gender
- city (String): Advocate city
- state (String): Advocate state
- zipCode (Number): Advocate zipCode
- country (String): Advocate country
- address (String): Advocate address
- certificate (String): Advocate certificate
- barNumber (String): Advocate barNumber
- lawUniversity (String): Advocate lawUniversity
- graduationYear (String): Advocate graduationYear
- practiceArea (String): Advocate practiceArea
- languages (String): Advocate languages
- Specialization (String): Advocate Specialization
- degree (String): Advocate degree
- notes (String): Advocate notes
- firms (String): Advocate firms
- position (String): Advocate position
- duration (String): Advocate duration
- image (String): Advocate image
- About (String): Advocate About
- active (Boolean): Deletion status
- createdAt (Date): Creation timestamp
- updatedAt (Date): Last update timestamp

User:
- _id (ObjectId): User ID
- Name (String): User Name
- email (String): Email address
- Gender (String): User Gender
- mobileNumber (Number): Phone number
- AsignRole (String): User role
- password (String): User password
- companyId (ObjectId): Company ID
- image (ObjectId): User Image
- address (String): User address
- permission (Array): User permissions
- Active (Boolean): Deletion status
- refreshToken (Boolean): User access token
- createdAt (Date): Creation timestamp
- updatedAt (Date): Last update timestamp

Client:
- _id (ObjectId): Client ID
- Name (String): Client Name
- Email (String): Email address
- phonenum (Number): Phone number
- city (String): Client city
- state (String): Client state
- country (String): Client country
- zipCode (Number): Client zipCode
- About (String): Client about
- image (ObjectId): Client Image
- address (String): Client address
- Active (Boolean): Deletion status
- createdAt (Date): Creation timestamp
- updatedAt (Date): Last update timestamp

CaseModel:
- _id (ObjectId): Case ID
- Title (String): Case Title
- Date (Date): Case Date
- Client (ObjectId): Reference to the Client
- Advocate (ObjectId): Reference to the Advocate
- Matter (ObjectId): Reference to the Matter
- Judge (ObjectId): Reference to the Judge
- PoliceStation (ObjectId): Reference to the Police Station
- Court (ObjectId): Reference to the Court
- Fir (String): FIR Number
- CaseStatus (String): Status of the case (either "Open" or "Closed")
- description (String): Detailed description of the case
- internalNote (String): Internal notes (optional)
- Active (Boolean): Indicates whether the case is active or deleted
- createdAt (Date): Creation timestamp
- updatedAt (Date): Last update timestamp
`;

export const basicQueries = `
1. General Questions:
{
  "type": "general_response",
  "response": "Let me help you with that general question...",
  "category": "general_knowledge"
}

2. Unclear Queries:
{
  "type": "clarification_needed",
  "response": "Could you please specify what exactly you'd like to know about...?",
  "category": "clarification"
}

3. Advocate Queries:
{
  "type": "database_query",
  "mongooseQuery": "AdvocateSch.find({ _id: 'userId' }).select('name email');",
  "schemaUsed": "AdvocateSch",
  "queryType": "list"
}

4. Client Queries:
{
  "type": "database_query",
  "mongooseQuery": "Client.find({ _id: 'userId' }).select('Name Email');",
  "schemaUsed": "Client",
  "queryType": "list"
}

5. User Queries:
{
  "type": "database_query",
  "mongooseQuery": "User.find().select('Name email');",
  "schemaUsed": "User",
  "queryType": "list"
}
`;

export const inventoryQueries = `
This is only the example query. If a user asks any advocate-related question, generate the query using AdvocateSch and if user asks about clients then generate query using Client same goes for user, and all other relevant operations to provide the user with 100% accurate results.  Remember to replace placeholders like 'userId', 'Advocate Name', 'caseName', etc., with the actual values.  Do not include 'await', 'async', or IIFEs in the generated query.  The query should be valid JSON inside the find() or findOne() parentheses, If query is regarding find by name then don't include _id or userId in query, If query is regarding find advocate/client/user then do not include password, city, state, country and image fields.

1. List all cases:
{
  "mongooseQuery": "CaseModel.find().populate('Client', 'Name').populate('Advocate', 'name').select('Title Date Client Advocate Matter CaseStatus')",
  "schemaUsed": "CaseModel",
  "queryType": "list"
}

2. Find advocate by name:
{
  "mongooseQuery": "AdvocateSch.findOne({ name: { $regex: 'Advocate Name', $options: 'i' } })",
  "schemaUsed": "AdvocateSch",
  "queryType": "detail"
}

3. List of users:
{
  "mongooseQuery": "User.find().select('name email phone')",
  "schemaUsed": "User",
  "queryType": "list"
}

4. Find client by name:
{
  "mongooseQuery": "Client.find({ Name: { $regex: 'Client Name', $options: 'i' } })",
  "schemaUsed": "Client",
  "queryType": "detail"
}

5. Find cases by client name:
{
  "mongooseQuery": "CaseModel.find({ "Client": { $exists: true } }).populate({ path: 'Client', match: { Name: { $regex: 'Name', $options: 'i' } }, select: 'Name' }).populate('Advocate', 'name') .select('Title Date Client Advocate CaseStatus')",
  "schemaUsed": "CaseModel",
  "queryType": "list"
}

6. Find cases by advocate name:
{
  "mongooseQuery": "CaseModel.find().populate({ path: 'Advocates', match: { name: { $regex: 'Advocate Name', $options: 'i' } }, select: 'name' }).populate('Client', 'Name') .select('Title Date Client Advocate CaseStatus')",
  "schemaUsed": "CaseModel",
  "queryType": "list"
}

7. Find all clients:
{
  "mongooseQuery": "Client.find()",
  "schemaUsed": "Client",
  "queryType": "list"
}
`;

export const responseType = `
For Advocate Queries:
{
  "type": "database_query",
 "mongooseQuery": "the query to execute (must include userId filter)",
  "schemaUsed": "schema name",
  "queryType": "query type"
}

For General Questions:
{
  "type": "general_response",
  "response": "direct answer to the question",
  "category": "category of question"
}

For Unclear Queries:
{
  "type": "clarification_needed",
  "response": "clarification question",
  "category": "clarification"
}`;

export const inventoryResponse = `
1. mongooseQuery: The exact query to execute
2. schemaUsed: Primary schema being queried
3. queryType: Type of query being performed`;
