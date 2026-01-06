import boto3
import pytest
from moto import mock_aws 
from func import handler

@mock_aws
def test_handler_increments_views():
    # Arrange: create mock DynamoDB table
    dynamodb = boto3.resource("dynamodb", region_name="ap-southeast-1")

    table = dynamodb.create_table(
        TableName="resume-visitors",
        KeySchema=[
            {"AttributeName": "id", "KeyType": "HASH"}
        ],
        AttributeDefinitions=[
            {"AttributeName": "id", "AttributeType": "S"}
        ],
        BillingMode="PAY_PER_REQUEST",
    )

    # Seed initial item
    table.put_item(
        Item={
            "id": "1",
            "views": 5
        }
    )

    # Act
    result = handler({}, {})

    # Assert
    assert result == 6

    response = table.get_item(Key={"id": "1"})
    assert response["Item"]["views"] == 6
