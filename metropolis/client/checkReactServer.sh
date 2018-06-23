#!/bin/sh
if [[ $(pgrep -f node_modules/react-scripts/scripts/start.js) ]]; then
  echo "React server is already running!";
else
  echo "Starting React server...";
  nohup yarn start > /dev/null &
fi
