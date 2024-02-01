ENV_FILE=".env"

if [ -f "$ENV_FILE" ]; then
    # Load variables from the .env file
    source "$ENV_FILE"

else
  echo "Error: .env file not found"
fi

ngrok http --domain=[$TEST_ENDPOINT] 80
