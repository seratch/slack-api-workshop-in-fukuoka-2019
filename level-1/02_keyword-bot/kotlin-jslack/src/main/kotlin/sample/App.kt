package sample

import com.github.seratch.jslack.Slack
import com.github.seratch.jslack.api.model.event.HelloEvent
import com.github.seratch.jslack.api.model.event.MessageEvent
import com.github.seratch.jslack.api.model.event.UserTypingEvent
import com.github.seratch.jslack.api.rtm.RTMEventHandler
import com.github.seratch.jslack.api.rtm.RTMEventsDispatcherFactory

object App {

    private val botToken = System.getenv("SLACK_BOT_TOKEN")
    private val slack = Slack.getInstance()

    @JvmStatic
    fun main(args: Array<String>) {
        slack.rtmConnect(botToken).use { rtm ->
            val dispatcher = RTMEventsDispatcherFactory.getInstance()
            dispatcher.register(HelloHandler())
            dispatcher.register(MessageHandler())
            dispatcher.register(UserTypingHandler())
            rtm.addMessageHandler(dispatcher.toMessageHandler())
            rtm.connect()
            println("RTM client successfully started!")
            Thread.sleep(Long.MAX_VALUE)
        }
    }

    private class HelloHandler : RTMEventHandler<HelloEvent>() {
        override fun handle(event: HelloEvent?) {
            println(event)
        }
    }

    private class MessageHandler : RTMEventHandler<MessageEvent>() {
        override fun handle(event: MessageEvent?) {
            println(event)
            if (event != null && event.botId == null) {
                val response = slack.methods(botToken).chatPostMessage {
                    it.channel(event.channel).text("Hello <@${event.user}>")
                }
                println(response)
            }
        }
    }

    private class UserTypingHandler : RTMEventHandler<UserTypingEvent>() {
        override fun handle(event: UserTypingEvent?) {
            println(event)
        }
    }
}
