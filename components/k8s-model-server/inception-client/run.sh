SERVER=$1
PORT=$2

if [ -z $SERVER ] ; then
  echo "run.sh Error: Please provide server address as first parameter"
  exit 1
fi

if [ -z $PORT ] ; then PORT=9000 ; fi

python label.py -s $SERVER -p $PORT /data/*.jpg
