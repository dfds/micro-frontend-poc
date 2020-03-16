using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR.Client;

namespace KafkaToSignalrRelay.IntegrationTests.Infrastructure
{
    public class SignalrClient
    {
        private HubConnection _hubConnection;

        public readonly List<object> Events = new List<object>();

        public SignalrClient(Uri hubUrl)
        {
            _hubConnection = new HubConnectionBuilder()
                .WithUrl(hubUrl)
                .Build();

            _hubConnection.On<object>(
                "ReceiveMessage",
                o => { Events.Add(o); }
            );

            _hubConnection.StartAsync().Wait();
        }
    }
}