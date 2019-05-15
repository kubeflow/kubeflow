#--ext-str imageBase=$(IMG) \
#	  --ext-str gitVersion=$(GIT_VERSION) --ext-str tag=$(TAG) \
#	  --ext-str useImageCache=$(USE_IMAGE_CACHE) \

PROJECT ?= cloud-ml-dev
NEW_REGISTRY ?= gcr.io/$(PROJECT)

build-gcb-spec: gcb_copy_images.jsonnet
	rm -rf ./build
	mkdir  -p build
	jsonnet ./gcb_copy_images.jsonnet  --ext-str newRegistry=$(NEW_REGISTRY) \
		> ./build/gcb_copy_images.json

copy-gcb: build-gcb-spec		
	gcloud builds submit --machine-type=n1-highcpu-32 --project=$(PROJECT) --config=./build/gcb_copy_images.json \
		--timeout=3600 --no-source