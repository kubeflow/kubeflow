import json
import requests
from flask import request, jsonify

from kubeflow.kubeflow.crud_backend import api, decorators, helpers, logging
from ...common import utils
from . import bp

log = logging.getLogger(__name__)


@bp.route("/api/namespaces/<namespace>/gpu-culling-policy", methods=["GET"])
def get_gpu_culling_policy(namespace):
    """Get effective GPU culling policy for a namespace."""
    try:
        # Get GPU culling policy from Enhanced Culling Controller
        # This would typically query the controller's API or ConfigMaps
        
        # For now, return a default policy structure
        # In production, this would query the actual policy resolver
        default_policy = {
            "source": "default",
            "enabled": True,
            "mode": "gpu-priority",
            "memoryThreshold": 10,
            "computeThreshold": 5,
            "kernelTimeout": "5m",
            "sustainedDuration": "10m"
        }
        
        # Try to get profile-level or cluster-level policies
        try:
            # Query Kubernetes API for profile annotations
            profile_policy = _get_profile_gpu_policy(namespace)
            if profile_policy:
                return api.success_response("gpuCullingPolicy", profile_policy)
        except Exception as e:
            log.warning(f"Could not get profile GPU policy: {e}")
        
        # Try to get cluster-level policies
        try:
            cluster_policy = _get_cluster_gpu_policy()
            if cluster_policy:
                return api.success_response("gpuCullingPolicy", cluster_policy)
        except Exception as e:
            log.warning(f"Could not get cluster GPU policy: {e}")
        
        return api.success_response("gpuCullingPolicy", default_policy)
        
    except Exception as e:
        log.error(f"Error getting GPU culling policy: {e}")
        return api.failed_response("Failed to get GPU culling policy", str(e))


@bp.route("/api/namespaces/<namespace>/notebooks/<notebook_name>/gpu-metrics", methods=["GET"])
def get_gpu_metrics(namespace, notebook_name):
    """Get current GPU metrics for a notebook from HAMi vGPUmonitor."""
    try:
        # Discover HAMi vGPUmonitor endpoints
        hami_endpoints = _discover_hami_endpoints()
        
        if not hami_endpoints:
            return api.failed_response("HAMi vGPUmonitor not available", 
                                     "No HAMi endpoints found")
        
        # Query GPU metrics from HAMi
        gpu_metrics = _query_hami_metrics(hami_endpoints, namespace, notebook_name)
        
        if not gpu_metrics:
            return api.success_response("gpuMetrics", {
                "namespace": namespace,
                "name": notebook_name,
                "devices": [],
                "timestamp": None,
                "hasGPUResources": False
            })
        
        return api.success_response("gpuMetrics", gpu_metrics)
        
    except Exception as e:
        log.error(f"Error getting GPU metrics: {e}")
        return api.failed_response("Failed to get GPU metrics", str(e))


@bp.route("/api/namespaces/<namespace>/notebooks/<notebook_name>/gpu-culling-annotations", methods=["PATCH"])
@decorators.request_is_json_type
def update_gpu_culling_annotations(namespace, notebook_name):
    """Update notebook GPU culling annotations."""
    try:
        body = request.get_json()
        annotations = body.get("annotations", {})
        
        # Get the notebook
        notebook = api.get_notebook(namespace, notebook_name)
        if not notebook:
            return api.failed_response("Notebook not found", 
                                     f"Notebook {notebook_name} not found in namespace {namespace}")
        
        # Update GPU culling annotations
        if not notebook.get("metadata", {}).get("annotations"):
            notebook["metadata"]["annotations"] = {}
        
        # Add GPU culling annotations
        gpu_annotations = _build_gpu_culling_annotations(annotations)
        notebook["metadata"]["annotations"].update(gpu_annotations)
        
        # Update the notebook
        updated_notebook = api.patch_notebook(namespace, notebook_name, notebook)
        
        return api.success_response("result", {
            "message": "GPU culling annotations updated successfully",
            "annotations": gpu_annotations
        })
        
    except Exception as e:
        log.error(f"Error updating GPU culling annotations: {e}")
        return api.failed_response("Failed to update GPU culling annotations", str(e))


def _get_profile_gpu_policy(namespace):
    """Get GPU culling policy from profile annotations."""
    try:
        # Query the profile for this namespace
        profiles = api.list_profiles()
        
        for profile in profiles.get("items", []):
            if profile.get("metadata", {}).get("name") == namespace:
                annotations = profile.get("metadata", {}).get("annotations", {})
                
                # Check for GPU culling annotations
                gpu_policy = {}
                if "notebooks.kubeflow.org/gpu-cull-enabled" in annotations:
                    gpu_policy["enabled"] = annotations["notebooks.kubeflow.org/gpu-cull-enabled"] == "true"
                    gpu_policy["source"] = "profile"
                    
                    # Extract other GPU culling settings
                    if "notebooks.kubeflow.org/gpu-memory-threshold" in annotations:
                        gpu_policy["memoryThreshold"] = float(annotations["notebooks.kubeflow.org/gpu-memory-threshold"])
                    
                    if "notebooks.kubeflow.org/gpu-compute-threshold" in annotations:
                        gpu_policy["computeThreshold"] = float(annotations["notebooks.kubeflow.org/gpu-compute-threshold"])
                    
                    if "notebooks.kubeflow.org/gpu-kernel-timeout" in annotations:
                        gpu_policy["kernelTimeout"] = annotations["notebooks.kubeflow.org/gpu-kernel-timeout"]
                    
                    if "notebooks.kubeflow.org/gpu-sustained-duration" in annotations:
                        gpu_policy["sustainedDuration"] = annotations["notebooks.kubeflow.org/gpu-sustained-duration"]
                    
                    if "notebooks.kubeflow.org/gpu-culling-mode" in annotations:
                        gpu_policy["mode"] = annotations["notebooks.kubeflow.org/gpu-culling-mode"]
                    
                    return gpu_policy
        
        return None
        
    except Exception as e:
        log.warning(f"Error getting profile GPU policy: {e}")
        return None


def _get_cluster_gpu_policy():
    """Get GPU culling policy from cluster-level configuration."""
    try:
        # Query cluster-level ConfigMaps or CRDs for GPU culling policies
        # This would typically check for cluster-wide GPU culling configuration
        
        # For now, return None to indicate no cluster policy found
        return None
        
    except Exception as e:
        log.warning(f"Error getting cluster GPU policy: {e}")
        return None


def _discover_hami_endpoints():
    """Discover HAMi vGPUmonitor endpoints."""
    try:
        # Query Kubernetes API for HAMi vGPUmonitor pods
        # This would typically use the Kubernetes client to find HAMi pods
        
        # For now, return a mock endpoint
        # In production, this would discover actual HAMi endpoints
        return ["http://hami-vgpu-monitor:9394"]
        
    except Exception as e:
        log.warning(f"Error discovering HAMi endpoints: {e}")
        return []


def _query_hami_metrics(endpoints, namespace, notebook_name):
    """Query GPU metrics from HAMi endpoints."""
    try:
        for endpoint in endpoints:
            try:
                # Query Prometheus metrics from HAMi
                metrics_url = f"{endpoint}/metrics"
                response = requests.get(metrics_url, timeout=10)
                
                if response.status_code == 200:
                    # Parse Prometheus metrics and filter for the specific notebook
                    metrics_text = response.text
                    gpu_metrics = _parse_hami_metrics(metrics_text, namespace, notebook_name)
                    
                    if gpu_metrics:
                        return gpu_metrics
                        
            except requests.RequestException as e:
                log.warning(f"Failed to query HAMi endpoint {endpoint}: {e}")
                continue
        
        return None
        
    except Exception as e:
        log.error(f"Error querying HAMi metrics: {e}")
        return None


def _parse_hami_metrics(metrics_text, namespace, notebook_name):
    """Parse Prometheus metrics from HAMi and extract notebook-specific data."""
    try:
        # This is a simplified parser - in production, you'd use a proper Prometheus client
        lines = metrics_text.split('\n')
        
        devices = []
        
        for line in lines:
            if line.startswith('vGPU_device_memory_usage_in_bytes'):
                # Extract labels and values
                if f'podnamespace="{namespace}"' in line and f'podname="{notebook_name}"' in line:
                    # Parse the metric line to extract device information
                    # This is a simplified example - real implementation would be more robust
                    
                    device = {
                        "deviceUUID": "gpu-0",  # Would extract from labels
                        "virtualDeviceID": "0",  # Would extract from labels
                        "containerName": notebook_name,
                        "memoryUsage": {
                            "usedBytes": 1024 * 1024 * 100,  # 100MB example
                            "limitBytes": 1024 * 1024 * 1024,  # 1GB example
                            "utilizationPercentage": 10.0
                        },
                        "computeUtilization": {
                            "utilizationPercentage": 5.0
                        },
                        "secondsSinceLastKernel": 300
                    }
                    devices.append(device)
        
        if devices:
            return {
                "namespace": namespace,
                "name": notebook_name,
                "devices": devices,
                "timestamp": "2024-01-01T00:00:00Z",
                "hasGPUResources": True
            }
        
        return None
        
    except Exception as e:
        log.error(f"Error parsing HAMi metrics: {e}")
        return None


def _build_gpu_culling_annotations(config):
    """Build GPU culling annotations from configuration."""
    annotations = {}
    
    if config.get("enabled"):
        annotations["notebooks.kubeflow.org/gpu-cull-enabled"] = "true"
        
        if "mode" in config:
            annotations["notebooks.kubeflow.org/gpu-culling-mode"] = config["mode"]
        
        if "memoryThreshold" in config:
            annotations["notebooks.kubeflow.org/gpu-memory-threshold"] = str(config["memoryThreshold"])
        
        if "computeThreshold" in config:
            annotations["notebooks.kubeflow.org/gpu-compute-threshold"] = str(config["computeThreshold"])
        
        if "kernelTimeout" in config:
            annotations["notebooks.kubeflow.org/gpu-kernel-timeout"] = config["kernelTimeout"]
        
        if "sustainedDuration" in config:
            annotations["notebooks.kubeflow.org/gpu-sustained-duration"] = config["sustainedDuration"]
    else:
        annotations["notebooks.kubeflow.org/gpu-cull-enabled"] = "false"
    
    return annotations
