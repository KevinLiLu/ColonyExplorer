#!/bin/sh
if [[ $(pgrep -f dist/server.js) ]]; then
  echo "Express API server is already running!";
else
  echo "Starting Express API server...";
  nohup node $HOME/ColonyExplorer/metropolis/dist/server.js > /dev/null &
fi
