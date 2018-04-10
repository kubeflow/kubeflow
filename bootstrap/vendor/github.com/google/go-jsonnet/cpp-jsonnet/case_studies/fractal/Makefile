# Copyright 2015 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

ALL_IMAGES = $(shell cat service.list | grep '[.]packer.json$$')

default:
	../../jsonnet -J lib -A ssh_username=$$USER --multi . service.jsonnet > service.list
	$(MAKE) all_artifacts
	$(MAKE) terraform.done

all_artifacts: $(ALL_IMAGES:.packer.json=.packer.done)

%.packer.done: %.packer.json
	@echo "======== BUILDING IMAGE: $(basename $(basename $<)) ========"
	time packer build -force $< > $(basename $@).log 2>&1 
	cp $< $@

terraform.done: terraform.tf
	@echo "======== MODIFYING DEPLOYMENT ========"
	terraform plan -detailed-exitcode -out=terraform.plan ; case "$$?" in "2") exit 0;; *) exit 1;; esac
	@read -r -p "Are you sure? [y/N] " response && case "$$response" in [yY][eE][sS]|[yY]) terraform apply terraform.plan && cp $< $@ ;;  esac

destroy:
	@echo "======== DESTROYING DEPLOYMENT ======== "
	@rm -vf terraform.plan terraform.done
	@terraform destroy -force

clean:
	rm -fv service.list *.packer.log *.packer.json *~ *.packer.done *.tf
