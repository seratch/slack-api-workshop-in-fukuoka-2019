# 事前準備

## Slack ワークスペースをつくる

メールアドレスを入力します。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385068-94b01780-dd19-11e9-8d26-efb901494d69.png">

登録したメールアドレスに確認メールが届くので、そこに記載された 6 桁の数字を入力します。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385069-9548ae00-dd19-11e9-8a87-2c3cc3503a0a.png">

メールアドレスの確認が終了したら、ワークスペースの名前を設定します。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385070-9548ae00-dd19-11e9-99fd-4e1e6c61bf46.png">

簡単な説明を入れる必要があるので何か書きます。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385072-9548ae00-dd19-11e9-86ff-cefb1a40d218.png">

他に招待する人のメールアドレスを入力します。通常は誰かしらを招待するかと思いますが、今回は自分用の開発用なので「Skip for now」で次へ進みます。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385073-95e14480-dd19-11e9-858f-117a57d70ced.png">

ブラウザから無事このワークスペースにアクセスできました。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385074-95e14480-dd19-11e9-9171-a6a999302005.png">

上記の画面の「Finish Signing Up」という緑のボタンをクリックして、このユーザのフルネームとパスワードを設定してください。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385075-95e14480-dd19-11e9-9562-3db50dceaf9a.png">

## Slack App をつくる

このワークスペースにログインした状態のブラウザから https://api.slack.com/apps にアクセスします。すると以下のような画面が表示されます。

もし、すでに他のワークスペースにログインしていて、そのワークスペースを使ってアプリをつくったことがあればそれが表示されているかと思います。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385076-95e14480-dd19-11e9-8f07-e8f879369dbf.png">

「Create an App」というボタンをクリックするとこのようなダイアログボックスが表示されます。App Name は何でも好きなもので OK です。Development Slack Workspace はたった今つくった新しいワーゥスペースを指定してください。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385077-9679db00-dd19-11e9-9329-27146896565b.png">

「Create App」をクリックすると Slack App が作成され、このような画面が表示されるはずです。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385078-9679db00-dd19-11e9-87e0-4939fc73929c.png">

## Slack App をワークスペースにインストールする

Bot ユーザを作った上でこのアプリをワークスペースにインストールしてみましょう。まず、左メニューの Features > Bot Users をクリックして、Bot User のメニューに遷移して、「Add a Bot User」をクリックします。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385264-48b2a200-dd1c-11e9-9e5a-f7826f3642e7.png">

Display Name と Default username を設定します。 Default username には日本語を含めることはできません。もし、この名前がすでにワークスペースに存在する場合は、自動的に -2 のような suffix がつきます。Bot の username はインストール後にインストールしたワークスペース側で変更もできます。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385265-48b2a200-dd1c-11e9-8eb1-75117a0cf27d.png">

Bot User を保存したら、左メニューの Settings > Install App をクリックして、以下の画面に遷移し、開発用ワークスペースへのインストールボタンをクリックします。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385266-48b2a200-dd1c-11e9-8225-8630837842cd.png">

以下のような画面が表示されるので、インストール先ワークスペースを確認した上で「Allow」をクリックします。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385267-494b3880-dd1c-11e9-8859-2c8c988c523c.png">

先ほどの画面に戻ってくると、このように二つの OAuth アクセストークンが表示されているはずです。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385268-494b3880-dd1c-11e9-8f86-017ce4081fbe.png">

新しい利用権限を追加したときは「Reinstall App」をクリックして、インストールし直してください（権限変更の反映に再インストールが必要なときは、画面上部に黄色のワーニングメッセージが表示されます）。

また、このアプリをワークスペースからアンインストールしたい場合は、{ワークスペースのサブドメイン}.slack.com/apps にアクセスして、そこからアプリのリンクへ遷移した上で、以下のような「Remove App」という赤いボタンを押して設定を削除してください。

<img height="300" src="https://user-images.githubusercontent.com/19658/65385481-9cbe8600-dd1e-11e9-8900-c938202418a2.png">


