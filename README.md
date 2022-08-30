# :warning: Repository not maintained :warning:

Please note that this repository is currently archived, and is no longer being maintained.

- It may contain code, or reference dependencies, with known vulnerabilities
- It may contain out-dated advice, how-to's or other forms of documentation

The contents might still serve as a source of inspiration, but please review any contents before reusing elsewhere.

# Kafka to SignalR relay

![Kafka tp signalr](kafka-to-signalr-relay.svg)

## Introduction

A service that listens to Kafka topics and relay the Kafka records to SignalR clients.

The service works as a part of DFDS Development excellence departments self service platform and will forward domain events to clients. This mean that terminology used in the rest of the self servive platform also will be used here.

## Usage

build local docker image:
docker build -f ./src/KafkaToSignalrRelay/Dockerfile . -t kafka-signalr-relay

start host by running the docker image:
docker run -p 50900:50900 -it kafka-signalr-relay

## Tests

Run integration tests by running the command: `dotnet test src/Tests/KafkaToSignalrRelay.IntegrationTests/` in this directory

## Development

You can emit events into the system by posting to the HTTP REST endpoint `/events` see curl example below:
``` curl
curl --request POST \
  --url http://localhost:50900/events \
  --header 'content-type: application/json' \
  --data '{"Hello": "World"}'
```
