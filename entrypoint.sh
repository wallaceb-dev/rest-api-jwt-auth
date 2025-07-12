#!/bin/sh

echo "NODE_ENV is $NODE_ENV"

if [ "$NODE_ENV" = "development" ]; then
  echo "Development mode"
  npm run dev
else
  echo "Production mode"
  npm start
fi
