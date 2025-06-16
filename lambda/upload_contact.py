import json
import boto3
import uuid
import time
import os
import logging

# Set up logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('DYNAMODB_TABLE')
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    """
    Simple AWS Lambda handler for contact form submissions
    """
    try:
        # Log the entire event for debugging
        logger.info(f"Received event: {json.dumps(event)}")
        
        # Handle CORS preflight requests
        if event.get('httpMethod') == 'OPTIONS':
            return create_response(200, {'message': 'OK'})
        
        # Only allow POST requests
        if event.get('httpMethod') != 'POST':
            logger.error(f"Method not allowed: {event.get('httpMethod')}")
            return create_response(405, {'error': 'Method not allowed'})
        
        # Check if body exists
        if not event.get('body'):
            logger.error("No body in request")
            return create_response(400, {'error': 'No request body'})
        
        # Parse request body
        try:
            body = json.loads(event['body'])
            logger.info(f"Parsed body: {json.dumps(body)}")
        except json.JSONDecodeError as e:
            logger.error(f"JSON decode error: {str(e)}")
            return create_response(400, {'error': 'Invalid JSON'})
        
        # Save to DynamoDB
        contact_id = str(uuid.uuid4())
        timestamp = int(time.time())
        
        item = {
            'id': contact_id,
            'name': body.get('name', ''),
            'email': body.get('email', ''),
            'subject': body.get('subject', ''),
            'message': body.get('message', ''),
            'timestamp': timestamp
        }
        
        logger.info(f"Saving item to DynamoDB: {json.dumps(item, default=str)}")
        table.put_item(Item=item)
        
        return create_response(200, {
            'message': 'Contact form submitted successfully',
            'id': contact_id
        })
        
    except Exception as e:
        logger.error(f"Lambda error: {str(e)}")
        return create_response(500, {'error': str(e)})

def create_response(status_code, body):
    """
    Create API Gateway response with CORS headers
    """
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST,OPTIONS'
        },
        'body': json.dumps(body)
    }