# Metropolis

# Info
`metropolis` leverages two separate servers: an Express.js API server, and a React.js frontend server.

The responsibility of the Express.js API server is to provide the backend connectivity to make calls to the Colony Network and `general-store` to return data to the React.js frontend server.

The Express.js API server runs on port 3001 while the React.js frontend server runs on port 3000.

# API

Developers can leverage `metropolis` to make queries and fetch data about the Colony Network by hitting the API endpoint.

Base Url: http://18.220.184.249:3001/api/

The following endpoints are supported...


## Total Counts
```
/network/count/colony
/network/count/domain
/network/count/skill
/network/count/task
```

## Token Info
```
/token/colonyId/:colonyId
```

## Get Colony ID Given An Address
```
/colony/id/:address
```

## Detailed List of Colony/Skill/Domain/Task (paged)
```
/colonies/:pageId
/domains/:pageId
/skills/:pageId
/tasks/:pageId
```

## Detailed List of Colony/Skill/Domain/Task (by start and end id)
```
/tasks/ethereum/:colonyId/:startId/:endId?
/domains/ethereum/:colonyId/:startId/:endId?
/colonies/ethereum/:startId/:endId?
/skills/ethereum/:startId/:endId?
```

## Details of a Single Colony/Skill/Domain/Task
```
/colony/:id
/domain/:colonyId/:id
/skill/:id
/task/:colonyId/:id
```

# Resiliency

We leverage two shell scripts scheduled to run every minute to ensure that our web application components (Express.js server and React.js frontend server) are always available. These shell scripts check to see if the processes are running, and will start them up (restart) if the processes are not running.

## Express.js Server Checker
```
#!/bin/sh
if [[ $(pgrep -f dist/server.js) ]]; then
  echo "Express API server is already running!";
else
  echo "Starting Express API server...";
  nohup node $HOME/ColonyExplorer/metropolis/dist/server.js > /dev/null &
fi
```

## React.js Server Checker
```
#!/bin/sh
if [[ $(pgrep -f node_modules/react-scripts/scripts/start.js) ]]; then
  echo "React server is already running!";
else
  echo "Starting React server...";
  nohup yarn start > /dev/null &
fi
```
