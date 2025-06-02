import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { buildSystemPrompt } from "./Prompt.js";
import { AdvocateSch } from "../models/Advocate.js";
import { User } from "../models/Admin.js";
import { Client } from "../models/Client.js";
import {
  responseFormat,
  responseQueryFormat,
  emptyResponse,
  commonResponse,
} from "./response-Formator.js";
import CaseModel from "../models/Case.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const systemPrompt = buildSystemPrompt();

const generateQueryAndExecution = async (input, userId) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${systemPrompt}

User Question: "${input}"

Generate the appropriate response in JSON format. Use '${userId}' as the _id value in queries.
Example format:
{
  "mongooseQuery": "await AdvocateSch.find({ _id: '${userId}' }).select('name email')",
  "schemaUsed": "SchemaModelName",
  "queryType": "query_type"
}`;
    const result = await model.generateContent(prompt);
    let response = result.response.text();
    response = response.replace(/```json|```/g, "").trim();
    try {
      const parsedResponse = JSON.parse(response);

      if (
        parsedResponse.type === "general_response" ||
        parsedResponse.type === "clarification_needed"
      ) {
        return parsedResponse;
      }

      return parsedResponse;
    } catch (error) {
      throw new Error(`Invalid query generation response: ${error.message}`);
    }
  } catch (error) {
    throw new Error(`Query generation failed: ${error.message}`);
  }
};

const generateResponse = async (input, dbResult, queryType) => {
  const responsePrompt = `
Generate a precise and accurate response for this database result:

Input Query: "${input}"
Query Type: ${queryType}
Result: ${JSON.stringify(dbResult)}

Example Response Formatting Rules:
${responseFormat}

Example Response Formats Based on Query Type:
${responseQueryFormat}

${commonResponse}

Example For empty results:
${emptyResponse}

Generate a clear and accurate response:`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(responsePrompt);
    return result.response.text();
  } catch (error) {
    throw new Error(`Response generation failed: ${error.message}`);
  }
};

const executeMongooseQuery = async (queryString, schemaUsed, userId) => {
  const schemaMap = {
    CaseModel,
    AdvocateSch,
    User,
    Client,
  };

  try {
    let modifiedQuery = queryString.replace(/_id: userId/g, `_id: '${userId}'`);

    // if (!modifiedQuery.includes("_id:")) {
    //   modifiedQuery = modifiedQuery.replace(
    //     /find\({/,
    //     `find({ _id: '${userId}',`
    //   );
    //   modifiedQuery = modifiedQuery.replace(
    //     /findOne\({/,
    //     `findOne({ _id: '${userId}',`
    //   );
    // }
    const wrappedQuery = `
      return (async () => {
        try {
          const result = ${modifiedQuery}
          if (!result || result.length === 0) {
            throw new Error("No data found.");
          }
          return result;
        } catch (error) {
          console.error('Query execution error:', error);
          return null;
        }
      })();
    `;
    console.log(modifiedQuery, "modifiedQuerymodifiedQuery");
    const executeQuery = new Function(...Object.keys(schemaMap), wrappedQuery);

    return await executeQuery(...Object.values(schemaMap));
  } catch (error) {
    throw new Error(`Query execution failed: ${error.message}`);
  }
};

const executeWithRetry = async (func, maxRetries = 3, delay = 500) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await func();
      if (result !== null && result !== undefined) {
        return result;
      }

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  return null;
};

export const testInput = async (input, userId) => {
  try {
    const queryData = await executeWithRetry(async () => {
      return await generateQueryAndExecution(input, userId);
    });

    if (
      queryData.type === "general_response" ||
      queryData.type === "clarification_needed"
    ) {
      return {
        success: true,
        data: {
          type: queryData.type,
          response: queryData.response,
          category: queryData.category,
        },
      };
    }

    const dbResult = await executeMongooseQuery(
      queryData.mongooseQuery,
      queryData.schemaUsed,
      userId,
    );
    console.log(dbResult, ".................");
    if (dbResult === null || dbResult.length === 0) {
      const responses = {
        AdvocateSch: `Advocate not found in system.`,
        User: `User not found in system.`,
        Client: `Client not found in system.`,
      };

      return {
        success: true,
        data: {
          query: queryData.mongooseQuery,
          result: null,
          response:
            responses[queryData.schemaUsed] ||
            `No results found for your query.`,
        },
      };
    }

    const response = await generateResponse(
      input,
      dbResult,
      queryData.queryType,
    );

    return {
      success: true,
      data: {
        query: queryData.mongooseQuery,
        result: dbResult,
        response: response,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      response:
        "Sorry, I couldn't process your request. Please try again with a more specific question.",
    };
  }
};
