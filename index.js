"use strict";
var AWS = require('aws-sdk');
const { Client } = require("@notionhq/client");

const awsRegion = process.env.AWS_REGION;
const awsS3Bucket = process.env.AWS_S3_BUCKET;
const awsS3Filename = process.env.AWS_S3_FILENAME;
if (!awsRegion || !awsS3Bucket || !awsS3Filename) {
  throw Error("Must define AWS_REGION, AWS_S3_BUCKET and AWS_S3_FILENAME in env");
}

const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;
if (!notionDatabaseId || !notionSecret) {
  throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}


const notion = new Client({
  auth: notionSecret,
});

exports.handler = async (event) => {

  var results = [];
  var cursor = undefined;
  while (cursor !== null) {
    const response = await notion.databases.query({
      database_id: notionDatabaseId,
      start_cursor: cursor,
      sorts: [
        {
            "property": "Name",
            "direction": "ascending"
        }
      ]
    });
    results = results.concat(...response.results);
    cursor = response.has_more ? response.next_cursor : null;
  }
  
  try {
    const s3 = new AWS.S3({
      region: awsRegion
    });

    var uploadParams = {
           Bucket: awsS3Bucket,
           Key: awsS3Filename,
           Body: JSON.stringify(results),
           CacheControl: 'no-cache',
           ContentType: 'application/json',
    };
    await s3.putObject(uploadParams).promise();
    return {
      statusCode: 200
    };
  }
  catch(error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
    
};
