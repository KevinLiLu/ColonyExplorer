#!/bin/sh

kill_pid()
{
  PNAME=$1
  PID=$2
  if [[ ! -z $PID ]]
  then
    echo "[INFO] Found pid $2 for process $1 so killing it."
    kill $2
  else
    echo "[WARN] Pid for $1 not found!"
  fi
}

# Find PIDs of ganache and trufflepig
GANACHE_PARENT_PID=`pgrep -f "/bin/sh -c cd src/lib/colonyNetwork && ganache-cli"`
GANACHE_CHILD_PID=`pgrep -f "node_modules/.bin/ganache-cli"`

TRUFFLEPIG_PARENT_PID=`pgrep -f "/bin/sh -c cd src/lib/colonyNetwork && trufflepig"`
TRUFFLEPIG_CHILD_PID=`pgrep -f "node_modules/.bin/trufflepig"`

# Try and kill all found PIDs
kill_pid "GANACHE_PARENT" $GANACHE_PARENT_PID
kill_pid "GANACHE_CHILD" $GANACHE_CHILD_PID
kill_pid "TRUFFLEPID_PARENT" $TRUFFLEPIG_PARENT_PID
kill_pid "TRUFFLEPIG_CHILD" $TRUFFLEPIG_CHILD_PID
