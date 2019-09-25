# Slack App を準備する

Level 1 とは別のアプリを新しく作ってみましょう。

## Slack App をつくる

https://api.slack.com/apps にアクセスして「Create New App」をクリックします。

<img height="300" src="https://user-images.githubusercontent.com/19658/65398829-f79cbf80-dda8-11e9-93b9-98e06f54d4f1.png">

名前はなんでもよいのですが、特に指定したいものがなければ lunch suggester とでもしておいてください。

<img height=300 src="https://user-images.githubusercontent.com/19658/65398830-f79cbf80-dda8-11e9-9524-40e5b123bf7f.png">

## 今回のアプリで使う権限を設定する

今回のアプリでは以下の 3 つを設定しますので、順を追って説明します。

* Slash Commands
* Interactive Components
* Bot Users

この画面の「Add features and functionality」の部分をクリックしてみてください。

<img height="300" alt="Screen Shot 2019-09-23 at 11 21 50" src="https://user-images.githubusercontent.com/19658/65398832-f79cbf80-dda8-11e9-8266-08f20d969eee.png">

するとこのように展開されます。ここにあるもののうち、上記の三点を全て設定すると、それらが緑色の表示になります。その状態になったらワークスペースにインストールして初期設定は完了です。

<img height="300" alt="Screen Shot 2019-09-23 at 11 21 56" src="https://user-images.githubusercontent.com/19658/65398833-f8355600-dda8-11e9-99e7-c48f2847c2aa.png">

### ngrok を起動する

Slash Commands と Interactive Components は Request URL という Slack のサーバからデータ送信を受けるための URL を設定する必要があります。

これを確定させるために ngrok（エングロック）をまずは設定します。

https://ngrok.com/download

<img height=300 src="https://user-images.githubusercontent.com/19658/65398831-f79cbf80-dda8-11e9-9aec-c28bd217a925.png">

ダウンロードして必要な設定をします。設定が終わったら

```bash
ngrok http 3000
```

を実行してください。以下のような表示が出力されるはずです。ここで表示されている `https://{random}.ngrok.io` を使用します。

なお、ngrok は無料で利用している場合、起動しなおすたびに URL が変わってしまいます。今日のハンズオンではこのまま起動したままにしておいてください。

```
ngrok by @inconshreveable

Session Status                online
Session Expires               7 hours, 59 minutes
Version                       2.3.34
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://08e53daa.ngrok.io -> http://localhost:3000
Forwarding                    https://08e53daa.ngrok.io -> http://localhost:3000
Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00         
```               

なお、ここで表示されている URL に `/slack/events` といパスを加えた `https://08e53daa.ngrok.io/slack/events` のような URL を以下では使用します。

### Slash Commands を設定する

`/feedback` のようなスラッシュコマンドを設定します。メニューからアクセスしてみてください。つくったばかりの Slack App なのでまだコマンドはありません。「Create New Command」をクリックします。

<img height=300 src="https://user-images.githubusercontent.com/19658/65398982-c7095580-dda9-11e9-9d64-68648f39ffad.png">

以下の通り、入力します。上記で説明した通り、ngrok.io の URL に `/slack/events` を追加した URL を指定してください。

<img height=500 src="https://user-images.githubusercontent.com/19658/65398983-c7095580-dda9-11e9-8925-bb4feede849f.png">

保存すると以下の通り `/lunch` が設定されました。

<img height=300 src="https://user-images.githubusercontent.com/19658/65398991-d1c3ea80-dda9-11e9-9475-5a085eb2f3a3.png">

### Interactive Components を設定する

これは、メッセージ内のボタン押下のイベントだったり、プルダウンでの項目選択、ダイアログボックスによるデータ送信をハンドリングするための設定有効化です。

メニューからアクセスすると、まだ Off になっていますので、これをクリックして On にします。

<img height=300 src="https://user-images.githubusercontent.com/19658/65399067-33845480-ddaa-11e9-8f90-b0c6a1ad68d8.png">

Request URL は先ほどの Slash Commands と全く同じ URL を指定してください。それ以外の項目は何もしなくて大丈夫です。一番下に緑色で表示されている「Save Changes」を必ず押してください。

<img height=400 src="https://user-images.githubusercontent.com/19658/65399068-33845480-ddaa-11e9-9eee-de062095ae48.png">

### Bot User を設定する

最後にボットユーザーを設定します。メニューからアクセスして「Add a Bot User」をクリックします。

<img height=300 src="https://user-images.githubusercontent.com/19658/65399155-a1308080-ddaa-11e9-8a56-9568fc6cfb79.png">

好きな名前を指定したら「Add Bot User」を押して保存します。これらの情報は後から変更することもできます。

<img height=400 src="https://user-images.githubusercontent.com/19658/65399156-a1308080-ddaa-11e9-8ea4-96368a944a99.png">


これで設定は完了です。「Incoming Webhooks」「Event Subscriptions」以外が緑色に表示されていることを確認してください。なお、明示的に設定していないはずの「Permissions」も有効になっているのは Bot User を追加したことで bot 権限が有効になっているためです。

<img height=500 src="https://user-images.githubusercontent.com/19658/65399230-1603ba80-ddab-11e9-8ca2-d697b958a310.png">

## ワークスペースにインストールする

それでは準備が完了したので、このアプリをワークスペースにインストールして OAuth Access Token を入手します。左側メニューの「Install App」をクリックします。

<img height=300 src="https://user-images.githubusercontent.com/19658/65399274-595e2900-ddab-11e9-9d05-2e387e357e64.png">

このようなインストール確認画面となっているはずです。

<img height=500 src="https://user-images.githubusercontent.com/19658/65399275-595e2900-ddab-11e9-8fc1-d84841afe5c0.png">

インストール後、二種類の OAuth Access Token が表示されていれば　OK です。

<img height=300 src="https://user-images.githubusercontent.com/19658/65399321-86aad700-ddab-11e9-967f-71783707b481.png">

## 必要な情報

以下の二つの情報を今回のアプリ開発では使用しますので、控えておいてください。

* Install App の画面から「Bot User OAuth Access Token」
* Basic Information の画面から App Credentials 内の Signing Secret
