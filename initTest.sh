#!/bin/bash

folder_path="public/insta"
file_path="$folder_path/meta.json"

# Check if the folder exists, create it if it doesn't
if [ ! -d "$folder_path" ]; then
    echo "Test Folder does not exist. Creating..."
    mkdir -p "$folder_path"
    echo "Test Folder created successfully."
else
    echo "Test Folder already exists."
fi

# Check if the file exists, create it if it doesn't
if [ ! -e "$file_path" ]; then
    echo "Test File does not exist. Creating..."
    echo "[]" > "$file_path"
    echo "Test File created successfully."
else
    echo "Test File already exists."
fi

if [ -n "$ALL_ENVS" ]; then
    echo "writing env"
    echo "$ALL_ENVS" >> .env.local
fi