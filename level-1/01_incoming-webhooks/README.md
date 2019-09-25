# Incoming Webhooks やってみよう

## 事前準備

詳細は 00_preparation を参照ください。

### Slack ワークスペースをつくる

https://slack.com/create にアクセスして、新規作成します。

### Slack App をつくる

https://api.slack.com/apps にアクセスして、新規作成します。

## Incoming Webhooks を有効にする

この時点では以下の通り Active されていない状態かと思います。

<img height="300" src="https://user-images.githubusercontent.com/19658/65387142-d9e14300-dd33-11e9-9471-b897b6e29d0b.png">

Off になっているところを On にトグルします。

<img height="300" src="https://user-images.githubusercontent.com/19658/65387143-da79d980-dd33-11e9-889a-18cd6bd31fd1.png">

黄色い帯が示す通り、Incoming Webhooks を有効にするにはワークスペースへの再インストールが必要です。 Settings > Install App から「Reinstall App」を実行します。

<img height="300" src="https://user-images.githubusercontent.com/19658/65387411-a653e800-dd36-11e9-9291-5794bbaad240.png">

先ほどと違って「Post to」という項目があらわれ、チャンネルを選択する必要があります。ここでは #random を選びますが、どのチャンネルでもよいので一つ選びます。

<img height="300" src="https://user-images.githubusercontent.com/19658/65387145-da79d980-dd33-11e9-9083-bb7f7f746fa1.png">

チャンネルを選んだら「Allow」ボタンを押します。

<img height="300" src="https://user-images.githubusercontent.com/19658/65387146-da79d980-dd33-11e9-83e7-d33c1d4037dd.png">

インストールが完了すると以下の通り、画面表示されます。Incoming Webhooks の URL が一つ払い出されました。これを使えば #random チャンネル（またはあなたが選んだチャンネル）にメッセージを投稿することができます。

<img height="300" src="https://user-images.githubusercontent.com/19658/65387412-a6ec7e80-dd36-11e9-8d34-58b7fc45d992.png">

この状態で Features > Incoming Webhooks にアクセスしてみると curl コマンドによるサンプルスクリプトを入手することができます。

<img height="300" src="https://user-images.githubusercontent.com/19658/65387247-f8940980-dd34-11e9-8c26-44c11cdd9607.png">

以下のコマンドは動作しません。このようなスクリプトが表示されているかと思います。`hooks.slack.com` の URL を実際のものにすれば `Hello, World!` というメッセージを投稿することができます。

```bash
curl -X POST \
  -H 'Content-type: application/json' \
  --data '{"text":"Hello, World!"}' \
  https://hooks.slack.com/services/T12345678/B12345678/XXXXXXXXXXXXXXXX
```

curl コマンドで複雑な JSON を送るのはやりにくいので Block Kit のメッセージを送るなら Postman などのツールを使うとよいでしょう。

<img height=500 src="https://user-images.githubusercontent.com/19658/65408714-84f60900-ddd5-11e9-92b1-97a0941b0bde.png">


