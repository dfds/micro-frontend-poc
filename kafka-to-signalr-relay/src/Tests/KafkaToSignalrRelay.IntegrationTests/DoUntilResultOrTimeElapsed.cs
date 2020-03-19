using System;
using System.Threading;
using System.Threading.Tasks;

namespace KafkaToSignalrRelay.IntegrationTests
{
    public static class TimeElapsed
    {
        public static async Task<TResult> DoForTimespanOrNotNull<TResult>(
            
            TimeSpan timeSpan,
            Func<Task<TResult>> function)
        {
            var endTime = DateTime.Now.Add(timeSpan);
            dynamic result = null;
            do
            {
                result = await function();
                if (result == null)
                {
                    Thread.Sleep(1000);
                }
            } while (result == null && DateTime.Now < endTime);

            return result;
        }
    }
}