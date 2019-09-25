# slack-ruby-bot

https://github.com/slack-ruby/slack-ruby-bot

## セットアップ

```bash
bundle install
```

## 実行する

以下の通り、環境変数に `xoxb-` の OAuth Access Token を設定して起動します。

```bash
export SLACK_API_TOKEN=xoxb-xxxx
bundle exec ruby bot.rb
```

正常に起動できれば以下のような出力が表示されます。

```
$ bundle exec ruby bot.rb
I, [2019-09-23T09:58:56.036254 #10341]  INFO -- request: POST https://slack.com/api/rtm.start
D, [2019-09-23T09:58:56.036388 #10341] DEBUG -- request: Accept: "application/json; charset=utf-8"
User-Agent: "Slack Ruby Client/0.14.4"
Content-Type: "application/x-www-form-urlencoded"
I, [2019-09-23T09:58:56.340538 #10341]  INFO -- response: Status 200

(omitted)

D, [2019-09-23T09:58:56.462362 #10341] DEBUG -- Slack::RealTime::Concurrency::Async::Socket#connect!: Slack::RealTime::Concurrency::Async::Client
D, [2019-09-23T09:58:56.487153 #10341] DEBUG -- id=T12345678, name=workspace_name, domain=domain_name#run_loop: WebSocket::Driver::OpenEvent
D, [2019-09-23T09:58:56.793005 #10341] DEBUG -- id=T12345678, name=workspace_name, domain=domain_name#run_loop: WebSocket::Driver::MessageEvent, {"type": "hello"}
D, [2019-09-23T09:58:56.793136 #10341] DEBUG -- id=T12345678, name=workspace_name, domain=domain_name#dispatch: type=hello
I, [2019-09-23T09:58:56.793194 #10341]  INFO -- : Successfully connected team workspace_name (T12345678) to https://domain_name.slack.com.
```

## 動作確認する

Slack 上で Bot をメンションして「hello」というメッセージを投稿します。

<img height="100" src="https://user-images.githubusercontent.com/19658/65397216-d4204780-dd9d-11e9-925a-09b8e3309970.png">
