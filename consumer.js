const { EventHubConsumerClient, earliestEventPosition } = require("@azure/event-hubs");

const connectionString = 'connection string';
const eventHubNames = 'traffic';
const consumerGroup = 'cameradatafeed';

async function main() {
    const client = new EventHubConsumerClient(
        consumerGroup,
        connectionString,
        eventHubNames
    );

    const subscriptionOptions = {
        maxWaitTimeInSeconds: 30
    };
    // startPosition: earliestEventPosition

    const subscription = client.subscribe(
        {
            processEvents: (events, context) => {
                events.map(event => {
                    console.log(event.body);
                });
                // console.log(events);
            },
            processError: (err, context) => {
                console.log(err);
            }
        },
        subscriptionOptions
    );

    // Wait for a few seconds to receive events before closing
    // setTimeout(async () => {
    //     await subscription.close();
    //     await client.close();
    //     console.log(`Exiting sample`);
    // }, 3 * 1000);
}

main();