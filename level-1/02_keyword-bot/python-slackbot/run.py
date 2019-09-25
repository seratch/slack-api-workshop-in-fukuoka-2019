from slackbot.bot import Bot

from slackbot.bot import respond_to
from slackbot.bot import listen_to
import re
import json

@respond_to('github', re.IGNORECASE)
def github(message):
    attachments = [
    {
        'fallback': 'Fallback text',
        'author_name': 'Author',
        'author_link': 'http://www.github.com',
        'text': 'Some text',
        'color': '#59afe1'
    }]
    message.send_webapi('', json.dumps(attachments))

@listen_to('I love you')
def love(message):
    message.reply('I love you too!')

def main():
    bot = Bot()
    bot.run()

if __name__ == "__main__":
    main()