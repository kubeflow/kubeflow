from kubernetes import client, config
import yaml
import time,os
import traceback
from kubernetes.config.config_exception import ConfigException
# Load the Kubernetes configuration
# Create API endpoints for the core API and custom object API

try:
    config.load_incluster_config()
except ConfigException:
    config.load_kube_config()

core_api = client.CoreV1Api()
custom_object_api = client.CustomObjectsApi()

"""
Clone the notebook from a notyebook template. We will clone the notebook by cloning the PVC and PV. The home directory of the source notebook
will be copied to the home directory of the target notebook. We will add a clone container in the target notebook to copy the home directory
from the source notebook to the target notebook.

The clone container will be added to the target notebook as a sidecar container. The clone container will be added to the target notebook.

We will create a PV which point to the same NFS path as the source notebook. Then, a PVC is created to use the cloned PV. In this way, the
sidecar container can copy the home directory from the source notebook to the target notebook.

We can customize the behaviour of the clone container which is specified in the sample_notebook.yaml. We will put this in a configmap so that
the user can customize the behaviour of the clone container.
"""
FILE_ABS_PATH = os.path.abspath(os.path.dirname(__file__))

NOTEBOOK_TEMPLATE_YAML = os.path.join(
    FILE_ABS_PATH, "yaml/notebook_template.yaml"
)

SAMPLE_NOTEBOOK = os.path.join(
    FILE_ABS_PATH, "yaml/sample_notebook.yaml"
)
SAMPLE_PVC = os.path.join(
    FILE_ABS_PATH, "yaml/sample_pvc.yaml"
)
SAMPLE_PV = os.path.join(
    FILE_ABS_PATH, "yaml/sample_pv.yaml"
)

class CloneNotebook:
  def __init__(self):
    pass

  def fetch_notebook(self,namespace,name):
    # Fetch the notebook by name
    notebook = custom_object_api.get_namespaced_custom_object(
      group="kubeflow.org",
      version="v1",
      namespace=namespace,
      plural="notebooks",
      name=name
    )
    return notebook

  def fetch_pv(self,name):
    # Fetch the PV by name
    pv = core_api.read_persistent_volume(name=name)
    return pv

  def fetch_pvc(self,namespace,name):
    # Fetch the PVC by name
    pvc = core_api.read_namespaced_persistent_volume_claim(
      name=name,
      namespace=namespace
    )
    return pvc

  def load_template(self,file_path):
    with open(file_path, 'r') as file:
      template = yaml.safe_load(file)
    return template

  """
  Replace fields in the template with values from the PV object. 

  The PV object has a attribute_map which maps the attribute name to the attribute value. We will use the attribute_map to replace the fields
  in the template with the values from the PV object.

  In this way, we can use a YAML template and then replace the fields in the template with the values from the CRD object returned by the kubernetes 
  client API. We can use the same template to create different CRD objects.
  """
  def replace_fields(self,template, pv,maps):
    if maps:
      amaps = {v: k for k, v in maps.items()}
    else:
      amaps = {}
    print("Enter",template,pv,amaps)
    if isinstance(template, dict):
      for key, value in template.items():
        #print(key,value)
        if isinstance(value, dict) or isinstance(value, list):
          try:
            obj = getattr(pv,amaps[key])
            if isinstance(obj, dict):
              self.replace_fields(value, obj,None)
            elif isinstance(obj, list):
              self.replace_fields(value, obj,None)
            else:
              self.replace_fields(value, obj,obj.attribute_map)
          except:
            print(traceback.format_exc())
        elif isinstance(value, str):
          try:
            template[key] = getattr(pv,amaps[key])
          except:
            #print(traceback.format_exc())
            continue
    elif isinstance(template, list):
      for i in range(len(template)):
        if len(pv) > i:
          if isinstance(pv[i], dict):
            self.replace_fields(template[i], pv[i],None)
          else:
            template[i] = pv[i]
    return template

  """
  Clone the PV. The new PV will point to the same NFS path as the source PV.
  The Reclaim Policy of the new PV is set to Retain so that the content in the NFS path will not be deleted when the new PV is deleted.
  However, the PV will not be deleted automatically when the PVC is deleted. The cloned PV should be deleted manually.

  FIXME: We may need to add an annotation so that we can recycle the deleted PV in a controller.
  """
  def clone_pv(self,oldpvname,newpvname):
    # check if the PV newpvname exists

    try:
      while True:
        #print("...")
        pv = self.fetch_pv(newpvname)
        if pv is None: break
        if pv.status.phase == 'Bound':
          #print(f"PV {newpvname} already exists")
          return pv
        elif pv.status.phase == 'Released' or pv.status.phase == 'Failed':
          # delete the pv
          #print(f"Delete PV {newpvname}")
          core_api.delete_persistent_volume(name=newpvname)
          time.sleep(1)
          break
        time.sleep(1)
    except:
      pass
    # Fetch the PV by name
    pv = self.fetch_pv(oldpvname)

    # Load the template
    template = self.load_template(SAMPLE_PV)

    # Replace fields in the template with values from the PV
    updated_template = self.replace_fields(template, pv,pv.attribute_map)

    # Use the updated template for further processing
    # ...
    # Update the name
    updated_template['metadata']['name'] = newpvname
    updated_template['spec']['persistentVolumeReclaimPolicy'] = 'Retain'
    print(f"Create PV {newpvname}")
    print(updated_template)
    # Update the PV
    try:
      pv = core_api.create_persistent_volume(
        body=updated_template
      )
    except:
      pass
    return pv  
    # Check if the PV newpvname exists
    def pv_exists(newpvname):
      try:
        core_api.read_persistent_volume(name=newpvname)
        return True
      except:
        return False

    # Usage
    if pv_exists(newpvname):
      print(f"PV {newpvname} exists")
    else:
      print(f"PV {newpvname} does not exist")

  """
  When clone is True, the PV will be cloned. Otherwise, we will not setup the volumeName in the PVC. Therefore, a new PV will not be created.
  Typically, we will clone the PV when we clone the notebook. We will not clone the PV when we clone the PVC for the home directory.
  """
  def clone_pvc(self,namespace,oldpvcname,target_namespace,newpvcname,clone=False):
    # Fetch the PVC by name
    pvc = self.fetch_pvc(namespace,oldpvcname)
    print(f"Fetch PVC {oldpvcname} from namespace {namespace}")
    # delete the new pvc if it exists
    try:
      core_api.delete_namespaced_persistent_volume_claim(
        namespace=target_namespace,
        name=newpvcname
      )
    except:
      pass
    if clone:
      # Fetch the PV by name
      print("clone the PV")
      pv = self.fetch_pv(pvc.spec.volume_name)


      # Clone the PV
      newpvname = pv.metadata.name + '-' + target_namespace+'-'+newpvcname
      self.clone_pv(pv.metadata.name, newpvname)
    

    # Load the template
    template = self.load_template(SAMPLE_PVC)

    # Replace fields in the template with values from the PV
    updated_template = self.replace_fields(template, pvc,pvc.attribute_map)

    # Use the updated template for further processing
    # ...
    # Update the name
    updated_template['metadata']['name'] = newpvcname
    updated_template['metadata']['namespace'] = target_namespace
    if clone:
      updated_template['spec']['volumeName'] = newpvname
    else:
      del updated_template['spec']['volumeName']

    # Create the PVC
    try:
      pvc = core_api.create_namespaced_persistent_volume_claim(
        namespace=target_namespace,
        body=updated_template
      )
    except:
      print("update_template=",updated_template)
      pvc = core_api.delete_namespaced_persistent_volume_claim(
        namespace=target_namespace,
        name=newpvcname
      )
      max_attempts = 3
      attempt = 1
      while attempt <= max_attempts:
        try:
          pvc = core_api.create_namespaced_persistent_volume_claim(
            namespace=target_namespace,
            body=updated_template
          )
          time.sleep(1)
          break  # Exit the loop if PVC creation is successful
        except Exception as e:
          print(f"Error creating PVC: {e}")
          attempt += 1
          if attempt <= max_attempts:
            print(f"Retrying PVC creation (attempt {attempt})...")
            time.sleep(1)
          else:
            print("Max attempts reached. PVC creation failed.")
            break
    return pvc


  """
  Clone the notebook from a notebook template. We will clone the notebook by cloning the PVC and PV. The home directory of the source notebook
  will be copied to the home directory of the target notebook. We will add a clone container in the target notebook to copy the home directory
  from the source notebook to the target notebook.
  """
  def clone_notebook(self,namespace,notebookname,target_namespace,newnotebookname):
    # Fetch the notebook by name
    notebook = self.fetch_notebook(namespace,notebookname)
    #print(notebook)
    # Fetch the PVC by name
    pvc = self.fetch_pvc(namespace,notebook['spec']['template']['spec']['volumes'][1]['persistentVolumeClaim']['claimName'])

    # Clone the PVC and setup the name as targetbookname-source
    newpvcname = newnotebookname + '-source'
    self.clone_pvc(namespace,pvc.metadata.name,target_namespace,newpvcname,clone=True)
    while True:
      try:
        pvc = self.fetch_pvc(target_namespace,newpvcname)
        if pvc.status.phase == 'Bound':
          break 
        print(f"Wait {newpvcname} to be Bounded")
        time.sleep(1)
      except:
        print("waiting for pvc to be created")
        time.sleep(1)

    # clone the pvc for home directory
    newhomepvcname = newnotebookname + '-volume'
    self.clone_pvc(namespace,notebook['spec']['template']['spec']['volumes'][1]['persistentVolumeClaim']['claimName'],target_namespace,newhomepvcname,clone=False)

    # Load the template
    updated_template = self.load_template(SAMPLE_NOTEBOOK)

    # Replace fields in the template with values from the notebook object
    # Update the notebook
    updated_template['metadata']['name'] = newnotebookname
    updated_template['metadata']['namespace'] = target_namespace
    # update the name of the jupyternotebook home directory
    updated_template['spec']['template']['spec']['containers'][0]['volumeMounts'][1]['name'] = newnotebookname + '-volume'
    updated_template['spec']['template']['spec']['containers'][0]['image'] = notebook['spec']['template']['spec']['containers'][0]['image']
    # update the name of the clone container sidecar
    updated_template['spec']['template']['spec']['containers'][1]['volumeMounts'][1]['name'] = newnotebookname + '-volume'
    # update the volume names
    updated_template['spec']['template']['spec']['volumes'][1]['name'] = newnotebookname + '-volume'
    updated_template['spec']['template']['spec']['volumes'][1]['persistentVolumeClaim']['claimName'] = newnotebookname + '-volume'
    updated_template['spec']['template']['spec']['volumes'][2]['persistentVolumeClaim']['claimName'] = newpvcname

    # Create the notebook
    try:
      notebook = custom_object_api.create_namespaced_custom_object(
        group="kubeflow.org",
        version="v1",
        namespace=target_namespace,
        plural="notebooks",
        body=updated_template
      )
    except:
        notebook = custom_object_api.patch_namespaced_custom_object(
        group="kubeflow.org",
        version="v1",
        name=newnotebookname,
        namespace=target_namespace,
        plural="notebooks",
        body=updated_template
      )

    return notebook

#if __name__ == '__main__':
#  clone_notebook = CloneNotebook()
#  clone_notebook.clone_notebook(sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4])

# CloneNotebook().clone_notebook('test','k1','kubeflow-user-example-com','k2')

#clone_notebook('test','k1','test','k2')

#pv = fetch_pv("pvc-a71dde27-d986-48e9-ac6a-43f2f5fcbbcf")

# Load the template
#template = load_template("sample_pv.yaml")

# Replace fields in the template with values from the PV

#updated_template = replace_fields(template, pv,pv.attribute_map)
#print(updated_template)
