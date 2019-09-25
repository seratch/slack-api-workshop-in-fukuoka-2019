const { RTMClient } = require('@slack/rtm-api');

// Read a token from the environment variables
const token = process.env.SLACK_BOT_TOKEN;
if (typeof token === 'undefined') {
    throw 'Env variable SLACK_BOT_TOKEN is missing'
}

// Initialize
const rtm = new RTMClient(token);

// Attach listeners to events by type. See: https://api.slack.com/events/message
rtm.on('message', async (event) => {
    console.log(event);

    if (event.text === 'hello') {
        try {
            // Send a welcome message to the same channel where the new member just joined, and mention the user.
            const reply = await rtm.sendMessage(`Hi there, <@${event.user}>!`, event.channel)
            console.log('Message sent successfully', reply.ts);
        } catch (error) {
            console.log('An error occurred', error);
        }
    }
});

(async () => {
    // Connect to Slack
    const { self, team } = await rtm.start();
})();