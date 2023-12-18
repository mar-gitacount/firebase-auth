#!/bin/bash

# git branch の出力を変数に格納する
branches=$(git branch)

echo "現在$branches ブランチです。 続行しますか？ (y/n): "
read userInput
if [ "$userInput" = "y" ]; then
    echo "続行します"
    #git add する。
    git add .
    echo "git addしました。"
    echo "git commitする際のコメントを記載してください。:"
    read commitMessage
    # 入力された値を表示する
    echo "入力された内容は: $commitMessage です"
    git commit -m "$commitMessage"
    git push origin master
    # 続行する処理をここに記述します
elif [ "$userInput" = "n" ]; then
    echo "キャンセルします"
    # キャンセルする処理をここに記述します
else
    echo "無効な入力です"
    # その他の入力に対する処理をここに記述します
fi
