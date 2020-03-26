#Setup build image
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env

#Set container filesystem to /build (and create folder if it doesnt exist)
WORKDIR /build

#Copy files to container file system.
COPY ./src/KafkaToSignalrRelay ./src/KafkaToSignalrRelay
COPY ./src/KafkaToSignalrRelay.Domain ./src/KafkaToSignalrRelay.Domain
COPY ./src/KafkaToSignalrRelay.KafkaClient ./src/KafkaToSignalrRelay.KafkaClient
COPY ./src/KafkaToSignalrRelay.RestApi ./src/KafkaToSignalrRelay.RestApi
COPY ./src/KafkaToSignalrRelay.SignalrHub ./src/KafkaToSignalrRelay.SignalrHub

#Set workdir to current project folder
WORKDIR /build/src/KafkaToSignalrRelay

#Restore csproj packages.
RUN dotnet restore

#Compile source code using standard Release profile
RUN dotnet publish -c Release -o /build/out

#Setup final container images.
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS runtime
WORKDIR /app

EXPOSE 50900

ENV KAFKA_TO_SIGNALR_RELAY_START_KAFKA_CONSUMER=false
ENV ASPNETCORE_URLS="http://*:50900"

#Copy binaries from publish container to final container
COPY --from=build-env /build/out .

#Run dotnet executable
ENTRYPOINT ["dotnet", "KafkaToSignalrRelay.dll"]