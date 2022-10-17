"use strict";

const { Client } = require("@notionhq/client");

const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

if (!notionDatabaseId || !notionSecret) {
  throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

const notion = new Client({
  auth: notionSecret,
});

exports.handler = async (event) => {
  const response = await notion.databases.query({
    database_id: notionDatabaseId
  });

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
