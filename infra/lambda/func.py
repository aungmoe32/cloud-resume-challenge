import boto3

def get_table():
    dynamodb = boto3.resource("dynamodb")
    return dynamodb.Table("resume-visitors")

def handler(event, context):
    table = get_table()

    response = table.get_item(Key={"id": "1"})
    views = response["Item"]["views"] + 1

    table.put_item(
        Item={
            "id": "1",
            "views": views
        }
    )

    return views
