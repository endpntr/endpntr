#!/bin/bash

ENV_FILE=".env"

if [ -f "$ENV_FILE" ]; then
    # Load variables from the .env file
    source "$ENV_FILE"
else
    echo "Error: .env file not found"
    exit 1  # Exit the script with an error code
fi

# Check if TEST_ENDPOINT is set
if [ -z "$TEST_ENDPOINT" ]; then
    echo "Error: TEST_ENDPOINT not set in the .env file"
    exit 1  # Exit the script with an error code
fi

# Run ngrok with the specified TEST_ENDPOINT
ngrok http --domain=$TEST_ENDPOINT 3000
