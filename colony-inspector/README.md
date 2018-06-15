# colony-inspector

The `colony-inspector` is a daemon responsible for periodically reading the Colony Network to generate statistics and save important metadata.

Calculated statistics and data are saved into the `general-store` (MongoDB).

# Usage

## Install Dependencies
Like all other projects, the dependencies must first be installed.
```
yarn
```

## Set Configurations
Configurations to connect to `general-store` are found in `config.json`. This json file must be filled out before running the daemon.
```
{
  "mongo": {
    "user": "",
    "password": "",
    "hostname": "",
    "port": "",
    "database": ""
  }
}
```

## Start Daemon
The `colony-inspector` runs an "infinite loop" so you will need to run the daemon as a background process.

```
nohup yarn run-inspector 2>&1 >/dev/null &
```

# Data
## Total Counts
The `ColonyNetworkClient` api supports getting the total count for specific variables such as total colony count and total skill count, but we are also interested in getting the total task and domain count. These totals must be manually calculated by getting the sum of all colonies.

We calculate the following totals:
- total-domain-count
- total-task-count

These totals are calculated every loop (minute) and saved to `general-store` so that `metropolis` can quickly fetch this data to render to the user.

## Time Series Data
The `colony-inspector` also saves time series data to identify trends over time. Time series data is data that is mapped to a specific time. We currently save data on a day by day basis (one data point per day) to give trends over the past week and month.

We save the following data points to `general-store`:
- total-colony-count
- total-task-count

# Snapshot Date
The `colony-inspector` uses a `snapshotDate` field that is retrieved from `general-store` to determine when to save a new time series data point.

The `colony-inspector` will save a new time series data point if the current date is different than the saved snapshot date. This means we save all the time series data for a day at the start of the day (00:00).
