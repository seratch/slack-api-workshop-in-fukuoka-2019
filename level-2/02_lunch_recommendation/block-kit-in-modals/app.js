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
      }
    },
    {
      "type": "actions",
      "elements": [
        {
          "type": "button",
          "action_id": "find-another", // このキー名で app.action と連動する
          "text": {
            "type": "plain_text",
            "text": "他の店を見る",
            "emoji": true
          },
          "value": "next"
        },
        {
          "type": "button",
          "action_id": "add-review", // このキー名で app.action と連動する
          "text": {
            "type": "plain_text",
            "text": "レビューをつける",
            "emoji": true
          },
          "value": JSON.stringify(restaurant) // このレストラン情報を次の処理へ引回す
        },
      ]
    },
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

app.action('find-another', async ({ body, context, ack, respond }) => {
  ack();
  respond({
    response_type: 'ephemeral', // 再びこのユーザにだけ見えるメッセージ
    replace_original: true, // もともとあったメッセージを置き換える
    blocks: getRecommendationBlocks()
  })
});

app.action('add-review', async ({ body, context, ack }) => {
  ack();
  const sentData = JSON.parse(body.actions[0].value);
  const restaurantName = sentData.name;
  app.client.views.open({
    "token": context.botToken,
    "trigger_id": body.trigger_id,
    "view": {
      "type": "modal",
      "callback_id": "modal-callback-id",
      "title": {
        "type": "plain_text",
        "text": `「${restaurantName}」を評価`
      },
      "submit": {
        "type": "plain_text",
        "text": "送信する"
      },
      "close": {
        "type": "plain_text",
        "text": "閉じる"
      },
      "blocks": [
        {
          "type": "input",
          "block_id": "rating",
          "label": {
            "type": "plain_text",
            "text": "評価"
          },
          "element": {
            "action_id": "single_action",
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Select an item",
              "emoji": true
            },
            "options": [
              {
                "text": {
                  "type": "plain_text",
                  "text": ":star:",
                  "emoji": true
                },
                "value": "1"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": ":star::star:",
                  "emoji": true
                },
                "value": "2"
              },
              {
                "text": {
                  "type": "plain_text",
                  "text": ":star::star::star:",
                  "emoji": true
                },
                "value": "3"
              },
            ]
          }
        },
        {
          "type": "input",
          "block_id": "date-of-visit",
          "label": {
            "type": "plain_text",
            "text": "行った日"
          },
          "element": {
            "type": "datepicker",
            "action_id": "single_action",
            "initial_date": "2019-09-26",
            "placeholder": {
              "type": "plain_text",
              "text": "行った日を選んでください",
              "emoji": true
            }
          }
        },
        {
          "type": "input",
          "block_id": "comment",
          "label": {
            "type": "plain_text",
            "text": "コメント"
          },
          "element": {
            "type": "plain_text_input",
            "action_id": "single_action",
            "multiline": true,
          }
        },
      ],
    }
  })
    .then(res => console.log(JSON.stringify(res)))
    .catch(err => console.log(JSON.stringify(err)));
});

app.view('modal-callback-id', ({ body, ack }) => {
  ack();
  const stateValues = body.view.state.values;
  // 本当はここで何かする
  console.log(JSON.stringify(stateValues));
});

(async () => {
  // 3000 ポートを listen するアプリを起動します
  // （Bolt の内部実装はデフォルトでは Express.js です）
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
