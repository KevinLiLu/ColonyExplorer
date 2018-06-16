# general-store

The `general-store` is the datastore where we save data that cannot be instantaneously or easily fetched from the Colony Network. Only the bare minimum is stored in the `general-store` as this adds an extra cost and dependency.

The current datastore implementation uses a MongoDB database deployed in an AWS EC2 instance. MongoDB is used for the datastore due to it's JSON-like structure which makes it straightforward to understand. A full scalable production blockchain explorer application would leverage multiple datastores for different functionalities.

Details about MongoDB concepts can be read at https://docs.mongodb.com/manual/core/databases-and-collections/.

# Collections
We use a single database `data` and utilize multiple collections for different data.

The main collections are:
- statistics
- time-series-data
- colony-inspector-metadata

## statistics

The `statistics` collection contains all data related to statistics at the most recent timestamp (current time). This includes overall statistics about the Colony Network, and featured data.

The `statistics` collection only contains one document which can be identified by the entry: key = `name` and value = `statistics`. This document contains the current statistics of the Colony Network (minute by minute).

## time-series-data

The `time-series-data` collection contains time series data regarding the Colony Network to supply the graph data in the `metropolis` web application.

The time series data we currently track can be found at [colony-inspector README](../colony-inspector/README.md#time-series-data).

We use a separate document to track a metric. We set the document `name` field to be the type of data tracked (ex. `total-colony-count`). We insert an entry (key is date formatted as `mm-dd-yy` and value is the count) for each day.

Ideally this time series data would be saved in an actual time series datastore like InfluxDB or OpenTSDB, but we want to maintain minimal dependencies as we have limited time and resources in a hackathon.

## colony-inspector-metadata

The `colony-inspector-metadata` collection contains important internal metadata for the `colony-inspector` component, which crawls the Colony Network to update statistics and other featured data.
