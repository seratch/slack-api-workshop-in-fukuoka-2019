const { App } = require('@slack/bolt');

// 環境変数の SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET が設定されていることが前提
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.use(args => {
    console.log(JSON.stringify(args));
    args.next();
});

const restaurants = [
  { name: '割烹よし田', url: 'https://tabelog.com/fukuoka/A4001/A400103/40000692/' },
  { name: '真', url: 'https://tabelog.com/fukuoka/A4001/A400103/40003911/' },
  { name: '新三浦 天神店', url: 'https://tabelog.com/fukuoka/A4001/A400103/40000066/' },
  { name: '利花苑 大名本店', url: 'https://tabelog.com/fukuoka/A4001/A400104/40000443/' },
  { name: '106 サウスインディアン 福岡天神店', url: 'https://tabelog.com/fukuoka/A4001/A400103/40041110/' },
];

function getRecommendationBlocks() {
  const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];

  // blocks
  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:shallow_pan_of_food: <${restaurant.url}|${restaurant.name}> はいかがですか？`
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
  ];
}

app.command('/lunch', async ({ ack, respond }) => {
  ack();
  // response_url を使って応答する
  respond({
    response_type: 'ephemeral', // このコマンドを実行したユーザにだけ見えるメッセージ、say の場合はチャンネルに普通に post される
    blocks: getRecommendationBlocks()
  });
});

app.action('find-another', async ({ action, ack, respond }) => {
  ack();
  respond({
    response_type: 'ephemeral', // 再びこのユーザにだけ見えるメッセージ
    replace_original: true, // もともとあったメッセージを置き換える
    blocks: getRecommendationBlocks()
  })
});

app.event('file_created', async ({ event, context }) => {
  console.log(event);
});

(async () => {
  // 3000 ポートを listen するアプリを起動します
  // （Bolt の内部実装はデフォルトでは Express.js です）
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
