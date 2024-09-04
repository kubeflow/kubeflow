docker build -t jupyter . --no-cache
docker images
docker tag jupyter twentyfouritaiwan/jupyter:v0.1.xx
docker push twentyfouritaiwan/jupyter:v0.1.xx

