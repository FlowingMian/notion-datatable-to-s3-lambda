# AFK Arena Notion Lambda
AFK Arena Notion Lambda is an AWS Lambda function written in NodeJS to transform a Notion database into a static JSON file
- Uses Notion API to query database
- Returns every Pages using pagination sorted by **Name**
- Upload resulting JSON on a S3 bucket
- Set Cache-Control metadata to 'no-cache' 

## Configuration
- Notion
  - Create an integration https://www.notion.so/my-integrations
  - Add a connection on desired database for this integration
- Lambda
  - Tested on Node.js 16.x runtime on arm64 architecture
  - Enable function URL to be able to trigger it through an HTTP request
  - Add **AmazonS3FullAccess** permission to Lambda execution role name
  - Required environment variables 
    - AWS_S3_BUCKET : just the bucket name, not the ARN
    - AWS_S3_FILENAME : *some-filename*.json
    - NOTION_SECRET : obtained on Notion integration 
    - NOTION_DATABASE_ID : found in Notion database URL