#!/bin/bash

KAFKA_TO_SIGNALR_RELAY_KAFKA_BOOTSTRAP_SERVERS=localhost:9092 \
KAFKA_TO_SIGNALR_RELAY_KAFKA_GROUP_ID=harald-consumer \
KAFKA_TO_SIGNALR_RELAY_KAFKA_ENABLE_AUTO_COMMIT=false \
dotnet watch --project ./../src/KafkaToSignalrRelay \
run
