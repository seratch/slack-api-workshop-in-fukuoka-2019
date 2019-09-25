# Kotlin での例

## セットアップ

Gradle をインストールします。

## 実行する

```bash
export SLACK_BOT_TOKEN=xoxb-xxx
gradle run
```

## Slack 上から動作確認する

入力し始めると user typing event を受け取っていることを確認できるはずです。また、Bot ではないユーザからのメッセージには一律 `Hello @{ユーザ名}` というメッセージを応答します。

<img height="100" src="https://user-images.githubusercontent.com/19658/65398130-0ed9ae00-dda5-11e9-9579-48dc835ab1ac.png">
