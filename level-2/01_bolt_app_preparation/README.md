# Bolt アプリを作成する

基本的には以下の説明をみていただければできるようになっていますが、ここでも改めて説明します。

https://slack.dev/bolt/ja-jp/tutorial/getting-started

## 起動する

### 雛形の作成

```bash
mkdir first-bolt-app
cd first-bolt-app
npm init -y
npm install @slack/bolt
```

### app.js

```js
const { App } = require('@slack/bolt');

// 環境変数の SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET が設定されていることが前提
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

(async () => {
  // 3000 ポートを listen するアプリを起動します
  // （Bolt の内部実装はデフォルトでは Express.js です）
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
```

### とりあえず起動してみる

```bash
export SLACK_SIGNING_SECRET=<your-signing-secret>
export SLACK_BOT_TOKEN=xoxb-<your-bot-token>
node app.js
```

とりあえず起動するかを確認してみてください。

なお、Windows で作業される方は `export SLACK_BOT_TOKEN=` のような箇所は、コマンドプロンプトでの `set SLACK_BOT_TOKEN=` と読み替えてください。

## 機能の雛形をつくる

機能が最低限動く状態かを確認しましょう。まず、ランチボットをチャンネルに招待します。

<img height="200" src="https://user-images.githubusercontent.com/19658/65399604-2d43a780-ddad-11e9-9165-5d814c2e4e4b.png">

<img height="100" src="https://user-images.githubusercontent.com/19658/65399609-35034c00-ddad-11e9-8322-bead70c3b22e.png">

### スラッシュコマンド `/lunch` の動作確認

上記の `app.js` に以下のようなコードをそのまま追加してください。

```js
app.command('/lunch', async ({ command, ack, say }) => {
  ack(); // 200 OK を返す - 3 秒以内に！
  say(`Thanks, you said - ${command.text}`); // 内部的に chat.postMessage を呼び出す
});
```

変更の反映は再起動が必要です。再起動した上で、動作を確認してみましょう。その上で `/lunch` を実行してちゃんと応答があることを確認します。

<img height="100" src="https://user-images.githubusercontent.com/19658/65399721-dbe7e800-ddad-11e9-8f9b-29f5a07a685d.png">
<img height="150" src="https://user-images.githubusercontent.com/19658/65399722-dbe7e800-ddad-11e9-9560-9a60e7f828f1.png">

再起動するのは面倒だなという方は

```bash
npm install nodemon
```

で `nodemon` を追加した上で `package.json` の `scripts` を以下のように書き換えてください。

```
  "scripts": {
    "start": "node_modules/.bin/nodemon app.js"
  },
```

この状態で

```bash
npm start
```

を実行してみてください。


```
$ npm start

> first-bolt-app@1.0.0 start /path/to/level-2/01_bolt_app_preparation/first-bolt-app
> nodemon app.js

[nodemon] 1.19.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] starting `node app.js`
⚡️ Bolt app is running!
```

のように表示されていれば OK です。今後は `app.js` を変更するたびに自動で反映されます。

### ボタンの動作確認

先ほど追加した `app.command` のコードを削除して以下をそのまま貼り付けてみてください。

```js
app.command('/lunch', async ({ ack, respond }) => {
  ack();
  // response_url を使って応答する
  respond({
    response_type: 'ephemeral', // このコマンドを実行したユーザにだけ見えるメッセージ、say の場合はチャンネルに普通に post される
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "お店の名前をここに入れる"
        },
        "accessory": {
          "type": "button",
          "action_id": "find-another", // このキー名で app.action と連動する
          "text": {
            "type": "plain_text",
            "text": "他の店を見る",
            "emoji": true
          },
          "value": "next"
        }
      }
    ]
  });
});

app.action('find-another', async ({ action, ack, respond }) => {
  ack();
  console.log(action);
  respond({
    response_type: 'ephemeral', // 再びこのユーザにだけ見えるメッセージ
    replace_original: true, // もともとあったメッセージを置き換える
    text: '検索中です...'
  })
});
```

すると `/lunch` を実行したときに以下のようなメッセージが投稿されます。

<img height=100 src="https://user-images.githubusercontent.com/19658/65400342-274fc580-ddb1-11e9-9613-6dd55fb8dc6f.png">

「他のお店を見る」というボタンをクリックするとこのメッセージ自体が以下の通り書き換えられるはずです。

<img height=100 src="https://user-images.githubusercontent.com/19658/65400343-274fc580-ddb1-11e9-8345-dbe65de8a8f4.png">

これで最低限の雛形が完成しました。次はいよいよ実際の推薦ロジックを実装していきましょう。
