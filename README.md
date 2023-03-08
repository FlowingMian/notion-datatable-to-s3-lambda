# Notion DB to S3 Lambda
Notion to S3 Lambda is an AWS Lambda function written in NodeJS to transform a Notion database into a static JSON file
- Uses Notion API to query database
- Returns every Pages using pagination sorted by **Name**
- Upload resulting JSON on a S3 bucket
- Set Cache-Control metadata to 'no-cache' 
- Use Serverless Framework to deploy on AWS

## Setup
- Notion
  - Create an integration https://www.notion.so/my-integrations
  - Add a connection on desired database for this integration
- Lambda
  - Tested on Node.js 16.x runtime on arm64 architecture
  - Required environment variables (to set in serverless.yml)
    - AWS_S3_BUCKET : just the bucket name, not the ARN
    - AWS_S3_FILENAME : *some-filename*.json
    - NOTION_SECRET : obtained on Notion integration 
    - NOTION_DATABASE_ID : found in Notion database URL

## Usage
Install serverless globally
```bash
npm install -g serverless
```
Install dependencies
```bash
npm i
```
Deploy on local (offline)
```bash
sls offline
```
Invoke local deployment 
```bash
sls invoke local --function api
```
Deploy on AWS
```bash
sls deploy
```
