# slackbot (Python)

## セットアップ

* https://github.com/lins05/slackbot

```bash
# pip install slackbot
# pip freeze > requirements.txt
pip install -r requirements.txt
```

## 動かす

```bash
vi slackbot_settings.py # API_TOKEN を書き換え
python run.py
```

`@respond_to` と `@listen_to` を使って、メッセージに対して何かする chatbot をつくってみましょう。

<img height="200" src="https://user-images.githubusercontent.com/19658/65396095-193e7c80-dd92-11e9-89fc-ee2591ed4895.png">

## 注意

このライブラリは Block Kit 未対応です。