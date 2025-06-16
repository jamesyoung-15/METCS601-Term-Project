import json
import boto3
import uuid
import time
import os

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('DYNAMODB_TABLE_NAME')
table = dynamodb.Table(table_name)

def lambda_handler(event, context):
    """
    Simple AWS Lambda handler for contact form submissions
    """
    try:
        # Handle CORS preflight requests
        if event.get('httpMethod') == 'OPTIONS':
            return create_response(200, {'message': 'OK'})
        
        # Only allow POST requests
        if event.get('httpMethod') != 'POST':
            return create_response(405, {'error': 'Method not allowed'})
        
        # Parse request body
        body = json.loads(event['body'])
        
        # Save to DynamoDB
        contact_id = str(uuid.uuid4())
        timestamp = int(time.time())
        
        item = {
            'id': contact_id,
            'name': body.get('name', ''),
            'email': body.get('email', ''),
            'subject': body.get('subject', ''),
            'message': body.get('message', ''),
            'timestamp': timestamp,
            'responded': False
        }
        
        table.put_item(Item=item)
        
        return create_response(200, {
            'message': 'Contact form submitted successfully',
            'id': contact_id
        })
        
    except Exception as e:
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