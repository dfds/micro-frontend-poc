# Kafka to SignalR relay

![Kafka tp signalr](kafka-to-signalr-relay.svg)

## Introduction

A service that listens to Kafka topics and relay the Kafka records to SignalR clients.

The service works as a part of DFDS Development excellence departments self service platform and will forward domain events to clients. This mean that terminology used in the rest of the self servive platform also will be used here.

## Usage

start assembly by running the command: `KAFKA_TO_SIGNALR_RELAY_START_KAFKA_CONSUMER=false dotnet run --project src/KafkaToSignalrRelay` in this directory

## Tests

Run integration tests by running the command: `dotnet test src/Tests/KafkaToSignalrRelay.IntegrationTests/` in this directory

## Development

You can emit events into the system by posting to the HTTP REST endpoint `/events` see curl example below:
``` curl
curl --request POST \
  --url http://localhost:5000/events \
  --header 'content-type: application/json' \
  --data '{"Hello": "World"}'
```
