const { App } = require('@slack/bolt');

// 環境変数の SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET が設定されていることが前提
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

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

(async () => {
  // 3000 ポートを listen するアプリを起動します
  // （Bolt の内部実装はデフォルトでは Express.js です）
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
