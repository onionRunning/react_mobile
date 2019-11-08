rm -rf temp.txt
git log -1 --name-only > lastgitcommit.text
node gitdifftest.js

for line in `cat temp.txt`
do
if [ $line == 'error' ]
  then echo "错误"; exit 1;
fi
done