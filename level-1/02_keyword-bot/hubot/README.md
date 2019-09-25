# Hubot を使う

## Slack 連携のセットアップ

App Directory - slack.com/apps にアクセスして hubot で検索します。

<img height=300 src="https://user-images.githubusercontent.com/19658/65389111-0439fd00-dd42-11e9-8ef9-009dc3bc4459.png">

左側にある「Set Up」をクリックします。右上に表示されているワークスペースが、今使っている開発用のワークスペースであることを確認してください。

<img height=300 src="https://user-images.githubusercontent.com/19658/65389113-0439fd00-dd42-11e9-98f4-50b9eb352ae2.png">

Hubot の設定はとても簡単です。ただ、Bot の名前を設定して「Add Hubot Integration」をクリックするだけです。

<img height=300 src="https://user-images.githubusercontent.com/19658/65389114-04d29380-dd42-11e9-972c-8db35cf5e66c.png">

次の画面で以下のように `HUBOT_SLACK_TOKEN` が表示されます。これを使って Hubot アプリを起動します。

<img height=300 src="https://user-images.githubusercontent.com/19658/65389115-04d29380-dd42-11e9-959c-8a6e33c77da5.png">

## Hubot アプリの起動

https://slack.dev/hubot-slack/

Hubot アプリは [Yeoman Generator](https://yeoman.io) を使ってプロジェクトの雛形をつくります。これを読んでいるタイミングで最適な Node.js / npm のバージョンを使ってください。なお、この説明の動作確認には `node -v` で `v10.13.0` となる Node.js を使用しています。level-2 で出てくる Bolt はこのバージョン以上でないと動作しませんので、このバージョンより新しい安定バージョンを使用するようにしてください。


```bash
npm install -g yo generator-hubot
mkdir my-awesome-hubot && cd my-awesome-hubot
yo hubot --adapter=slack
```

これでプロジェクトが無事生成されたら、先ほどつくった `HUBOT_SLACK_TOKEN` を使って起動します。

```bash
export HUBOT_SLACK_TOKEN=xoxb-YOUR-TOKEN-HERE
#export HUBOT_LOG_LEVEL=debug
./bin/hubot --adapter slack
```

## コードを変更する

ここでは、[祝いめでた](https://ja.wikipedia.org/wiki/%E5%8D%9A%E5%A4%9A%E7%A5%87%E5%9C%92%E5%B1%B1%E7%AC%A0)の冒頭を応答するように変更してみましょう。以下のようなコードを書き加えて起動すればよいです。変更した際は再起動が必要ですので、Hubot アプリを立ち上げ直してください。

```coffeescript
module.exports = (robot) ->

  robot.hear /祝いめでた/i, (res) ->
    res.send """祝い目出度の若松様よ　若松様よ
枝も栄ゆりゃ葉もしゅげる
エーイーショウエ　エーイショウエー
ショウエイ　ショウエイ　ションガネ
アレワイサソ　エサソエー　ショーンガネー"""
```

## 連携が動作するかを試す

まず Hubot を動かしたいチャンネルに Hubot の Bot を正体します。

```bash
/invite @{hubot ユーザ名}
```

<img height=300 src="https://user-images.githubusercontent.com/19658/65389332-a1963080-dd44-11e9-9cf7-a63f0f1e0d38.png">

その上で「祝いめでた」と投稿してみましょう。Hubot が「祝いめでた」の冒頭を応答してくれるはずです。

<img height=300 src="https://user-images.githubusercontent.com/19658/65389333-a1963080-dd44-11e9-95f8-f90598d59490.png">

それでは、このコードをベースにして好きな内容でキーワードに反応する Bot に変更してみてください。

## Hubot 連携ではなく、普通の Slack App の設定で動かす

上記の例では公式の Hubot 連携を使って動作させましたが、00_preparation で作った Slack App の設定を使って動作させることもできます。

Bot User を持っている Slack App の `xoxb-` から始まる OAuth Access Token を `HUBOT_SLACK_TOKEN` 環境変数に設定し、hubot コマンドで起動します。その Slack App の Bot User を動作確認するチャンネルに invite して、キーワードを投稿したり、Bot User をメンションしたりしてみてください。

## おまけ：雛形からの変更（必須ではありません）

とりあえず動かす分には変更は必須ではありませんが、デフォルトだと 2 件ほどメッセージが表示されているかと思います。

```
[Sun Sep 22 2019 23:32:02 GMT+0900 (Japan Standard Time)] WARNING Loading scripts from hubot-scripts.json is deprecated and will be removed in 3.0 (https://github.com/github/hubot-scripts/issues/1113) in favor of packages for each script.

Your hubot-scripts.json is empty, so you just need to remove it.
```

こちらはメッセージの通り、`hubot-scripts.json` を削除するか、空ファイルにすればワーニングを解消できます。

```
[Sun Sep 22 2019 23:23:25 GMT+0900 (Japan Standard Time)] INFO hubot-redis-brain: Using default redis on localhost:6379
[Sun Sep 22 2019 23:23:25 GMT+0900 (Japan Standard Time)] ERROR hubot-heroku-keepalive included, but missing HUBOT_HEROKU_KEEPALIVE_URL. `heroku config:set HUBOT_HEROKU_KEEPALIVE_URL=$(heroku apps:info -s | grep web.url | cut -d= -f2)`
```

このメッセージは Heroku デプロイ用の設定が適切に設定されていないというエラーメッセージです。もし Heroku にデプロイする予定がなければ、

```
npm remove hubot-heroku-keepalive
```

とした上で `external-scripts.json` から `hubot-heroku-keepalive` の行を削除してください。