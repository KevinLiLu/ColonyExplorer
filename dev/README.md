# dev
This directory contains the files necessary to spin up a local ethereum dev network, deploy the Colony Network contracts, and insert dummy data (colonies, domains, tasks, skills, etc).

All these steps need to be executed since the Colony Network is not officially deployed on testnet or mainnet yet. This directory will be deprecated once the Colony Network goes live on testnet.

The Colony.io team has created a `hackathonStarter` project that makes deployment an easier process. We extend the `hackathonStarter` project by adding a few helper scripts and files to further expedite the process, and insert our own data into the created Colony Network.

https://github.com/JoinColony/hackathonStarter

# Usage
When executing any script, make sure the file has execute file permissions by running:

```
dev$ chmod +x startDev.sh
dev$ chmod +x stopDev.sh
```

## Install Dependencies
You must first run `yarn` to install all the required dependencies.

```
dev$ yarn
```

## Start Network
We've created a helper shell script `startDev.sh` which will run all the required steps to start up the Colony Network (start ganache, deploy Colony contracts, start trufflepig, and create sample data).

```
dev$ ./startDev.sh
```

## Stop Network
There is also a helper script `stopDev.sh` that will stop the network by killing the ganache and trufflepig processes.

```
dev$ ./stopDev.sh
```

TODO: Make start script take in path to a JSON file that describes the test sample data to insert into the Colony Network (what colonies, tasks, domains, etc to create).
