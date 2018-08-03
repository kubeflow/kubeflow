set -e
set -x
#export RELEASENAME=katib
#ks init ${RELEASENAME}
#cd ${RELEASENAME}
ks registry add kubeflow github.com/kubeflow/kubeflow/tree/master/kubeflow
ks pkg install kubeflow/automation@master
export IMAGENAME=vizier-core
ks generate release ${IMAGENAME} --extra_repos=kubeflow/testing@HEAD\;kubeflow/katib@HEAD --image=${IMAGENAME} --dockerfileDir=kubeflow/katib/cmd/manager/
export IMAGENAME=suggestion-random
ks generate release ${IMAGENAME} --extra_repos=kubeflow/testing@HEAD\;kubeflow/katib@HEAD --image=${IMAGENAME} --dockerfileDir=kubeflow/katib/cmd/suggestion/random/
export IMAGENAME=suggestion-grid
ks generate release ${IMAGENAME} --extra_repos=kubeflow/testing@HEAD\;kubeflow/katib@HEAD --image=${IMAGENAME} --dockerfileDir=kubeflow/katib/cmd/suggestion/grid/
export IMAGENAME=suggestion-hyperband
ks generate release ${IMAGENAME} --extra_repos=kubeflow/testing@HEAD\;kubeflow/katib@HEAD --image=${IMAGENAME} --dockerfileDir=kubeflow/katib/cmd/suggestion/hyperband/
export IMAGENAME=suggestion-bayesianoptimization
ks generate release ${IMAGENAME} --extra_repos=kubeflow/testing@HEAD\;kubeflow/katib@HEAD --image=${IMAGENAME} --dockerfileDir=kubeflow/katib/cmd/suggestion/bayesianoptimization/
export IMAGENAME=earlystopping-medianstopping
ks generate release ${IMAGENAME} --extra_repos=kubeflow/testing@HEAD\;kubeflow/katib@HEAD --image=${IMAGENAME} --dockerfileDir=kubeflow/katib/cmd/earlystopping/medianstopping/
export IMAGENAME=katib-frontend
ks generate release ${IMAGENAME} --extra_repos=kubeflow/testing@HEAD\;kubeflow/katib@HEAD --image=${IMAGENAME} --dockerfileDir=kubeflow/katib/cmd/modeldb/
jsonnet fmt -i $(find . -name '[a-z]*sonnet') --string-style d --comment-style s --indent 2
