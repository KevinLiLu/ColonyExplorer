# ColonyExplorer

www.colonyexplorer.com

## Motivation

The `ColonyExplorer` aims to bridge the gap between the real world and the Colony Network by providing both developers and non-developers a means to view and interact directly with the Colony Network.

## Features

The features list is split into the user-facing web application, and the backend services and processes.

### Web Application

- Full statistics on the network (total colony, domain, skill, and task counts)
- Time series data to display trends
- Manage page with full MetaMask integration to allow the user to create a token, colony, and task via forms (no code required!)
- Individual pages to view data on a specific colony, skill, domain, and task
- Full pages that list out all colonies, skills, domains, and tasks
- Search box that allows for fetching a colony's details by giving an Ethereum address

### Backend Services & Processes

- Web API to query data on the Colony Network
- Periodically crawls Colony Network to gather and generate statistics regarding the network
- Caches data into MongoDB to allow web application for faster data rendering

## High Level Design

The Colony Explorer consists of three major components:
- `metropolis` (web application)
- `colony-inspector` (backend daemon to crawl network)
- `general-store` (MongoDB database to cache data and statistics)

Each component is designed to run separately to allow for isolation and extendability.

### Metropolis

`metropolis` is the web application that all users will interact with directly. `metropolis` utilizes a React.js frontend and an Express.js backend.

The goal of `metropolis` is to provide a hub for both developers and non-developers to directly interact with the Colony Network. The user interface allows anybody to query data from the Colony Network without having to write any code. For developers, an web API is also exposed that provides a way to interact with the Colony Network without having to set up dependencies or connect to the Etheruem network.

`metropolis` fetches live data from the Etheruem network, and cached data from the `general-store`.

Additional details can be found at [metropolis/README.md](metropolis/README.md).

### Colony Inspector

The `colony-inspector` is a backend daemon that periodically crawls the entire Colony Network to generate statistics and save metadata.

The `colony-inspector` currently uses Node.js and a scheduled thread to operate.

Additional details can be found at [colony-inspector/README.md](colony-inspector/README.md).

### General Store

The `general-store` is the MongoDB cache that holds some metadata about the Colony Network. The `colony-inspector` saves statistics and metadata into the `general-store`, and `metropolis` pulls data from the `general-store` to render data to the user.

Additional details can be found at [general-store/README.md](general-store/README.md).

## Next Steps

As this was only a hackathon, there are still many improvements that can be made to the Colony Explorer.

Here is a list of major improvements that we wish we had time to implement:
- Better UI/UX design (we focused on building functionality as opposed to designing UI/UX)
- Making all components distributed and resilient (load balancer for the `metropolis` web app, running distributed batch jobs across multiple hosts in the backend `colony-inspector` crawler)
- Leveraging a real time-series database such as InfluxDB or Graphite to store timestamped data
- Providing a graph-based page that graphically displays the Colony Network (and the relationship between all the different components)
- Incorporating advanced colony operations such as funding


## What We Learned

As this was our very first project that incorporated blockchain & Ethereum (one of us had actually just picked up programming in general recently), we wanted to share the major accomplishments and learnings from this hackathon:
- How the Ethereum network works
- Interacting with Colony contracts via ColonyNetworkClient
- Interacting directly with Ethereum contracts by leveraging web3.js
- Building a full web application with a react.js frontend and an express.js backend
- Sending (and confirming) transactions to the Ethereum network takes some time...
- Working a full-time software engineering job and coding for a hackathon at night drains the brain fluids

## Open Source License
Copyright 2018 Kevin Lu

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
