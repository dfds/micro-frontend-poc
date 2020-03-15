using System;
using Microsoft.AspNetCore.SignalR.Client;

namespace KafkaToSignalrRelay.SignalrClient
{
    public class SignalrClient
    {
        private HubConnection _hubConnection;

        public SignalrClient(Uri hubUrl)
        {
            _hubConnection = new HubConnectionBuilder()
                .WithUrl(hubUrl)
                .Build();

            _hubConnection.On<object>("ReceiveMessage",
                o =>
                {
                    Console.WriteLine(o);        
                }
            );
        }
    }
}