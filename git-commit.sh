#!/bin/zsh

# 반복할 횟수를 인자로 받음
count=$1
day=$2  # 몇 일 전의 날짜

# 반복문
for ((i=1; i<=count; i++))
do
    # 파일명 생성 (예: file1.txt, file2.txt, ...)
    filename="file$i.txt"

    # 파일 생성 및 "hello"라는 내용 추가
    echo "hello" > "$filename"

    # git add 명령어로 파일 추가
    git add "$filename"

    # git commit 명령어 실행
    git commit --date="$day days ago" -m "Add $filename"

    # 날짜를 하루씩 줄이기 위해 day 변수를 1 감소
    day=$((day + 1))
done

git push origin main 
