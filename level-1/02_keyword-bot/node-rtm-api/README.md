# @slack/rtm-api

https://slack.dev/node-slack-sdk/rtm-api

## セットアップ

```bash
npm i
```

```bash
npm init -y
npm i @slack/rtm-api nodemon
```

## 実行する

```bash
export SLACK_BOT_TOKEN=xoxb-xxxx
npm start
```

すると、以下のように起動します。

```bash
$ npm start

> node-rtm-api@1.0.0 start /path/to/level-1/02_keyword-bot/node-rtm-api
> nodemon index.js

[nodemon] 1.19.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] starting `node index.js`
```

対象の Bot User を正体しているチャンネルで「hello」とメッセージを投稿してみてください。すると、以下のように `text: 'hello'` のようなペイロードを受け取ることができます。

```bash
{ client_msg_id: 'd854e058-0486-4cba-850c-3c8bff69448b',
  suppress_notification: false,
  type: 'message',
  text: 'hello',
  user: 'U12345678',
  team: 'T12345678',
  user_team: 'T12345678',
  source_team: 'T12345678',
  channel: 'C12345678',
  event_ts: '1569197771.012000',
  ts: '1569197771.012000' }
```

<img height=200 src="https://user-images.githubusercontent.com/19658/65396664-1a72a800-dd98-11e9-8fc6-749a3e16d49d.png">
