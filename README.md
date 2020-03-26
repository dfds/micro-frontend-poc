# Kafka to SignalR relay

![Kafka tp signalr](kafka-to-signalr-relay.svg)

## Introduction

A service that listens to Kafka topics and relay the Kafka records to SignalR clients.

The service works as a part of DFDS Development excellence departments self service platform and will forward domain events to clients. This mean that terminology used in the rest of the self servive platform also will be used here.

## Usage

build local docker image:
docker build -f ./src/KafkaToSignalrRelay/Dockerfile .

start host by running the docker image:
docker run -p 50900:50900 -it {image-id}

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
