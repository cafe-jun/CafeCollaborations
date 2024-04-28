#!/bin/zsh

#!/bin/bash

# 인자로 받은 day 값을 변수에 저장
day=$1  # 첫 번째 인자를 day 변수에 저장

# 커밋 메시지
commit_message="test commit"

# git commit 명령어 실행
git commit --date="$day days ago" -m "$commit_message"

