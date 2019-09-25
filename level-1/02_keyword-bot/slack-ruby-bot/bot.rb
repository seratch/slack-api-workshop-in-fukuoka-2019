require 'slack-ruby-bot'

class HelloBot < SlackRubyBot::Bot
  command 'hello' do |client, data, match|
    client.say(text: "Hi <@#{data.user}>", channel: data.channel)
  end
end

HelloBot.run