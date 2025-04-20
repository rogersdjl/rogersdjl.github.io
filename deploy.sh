#!/usr/bin/env sh

# ------------------------------------------------------------------------------
# 部署脚本
# ------------------------------------------------------------------------------

# 装载其它库
ROOT_DIR=$(
  cd $(dirname $0)
  pwd
)

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npx hexo clean
npx hexo generate

# 进入生成的文件夹
cd ${ROOT_DIR}/.temp

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

msg='手动部署'
GITHUB_URL=git@github.com:rogersdjl/rogersdjl.github.io.git

git init
git add -A
git commit -m "${msg}"
git branch -M main
git push -f "${GITHUB_URL}" main:main

cd ${ROOT_DIR}
echo "部署完成，几分钟后可以访问 https://rogersdjl.github.io/"

rm -rf ${ROOT_DIR}/.temp
