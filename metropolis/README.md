# Metropolis

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
