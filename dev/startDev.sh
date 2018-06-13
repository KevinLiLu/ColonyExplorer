#!/bin/sh

# Spin up local ethereum blockchain and deploy Colony contracts
nohup yarn start-ganache 2>&1 > /dev/null &
echo "[INFO] Started ganache!"
echo "[INFO] Sleeping for 5 seconds to allow ganache to fully start up."
sleep 5s
yarn deploy-contracts
echo "[INFO] Deployed contracts!"
nohup yarn start-trufflepig 2>&1 > /dev/null &
echo "[INFO] Started trufflepig!"
echo "[INFO] Sleeping for 10 seconds to allow trufflepig to fully start up."
sleep 10s

# Create test Colony data
yarn start-dev
