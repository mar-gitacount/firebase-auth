echo "git commitする際のコメントを記載してください。:"
read userInput

git add .
echo  "git addしました。"

# 入力された値を表示する
echo "入力された内容は: $userInput です"

git commit -m "$userInput"

git push origin master

