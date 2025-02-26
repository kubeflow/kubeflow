package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	// Informers 與 cache
	"k8s.io/client-go/informers"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/cache"

	// YAML 解析套件
	"sigs.k8s.io/yaml"
)

// SpawnerUIConfig 定義 spawner_ui_config.yaml 的結構
type SpawnerUIConfig struct {
	SpawnerFormDefaults struct {
		Image struct {
			Options []string `json:"options" yaml:"options"`
		} `json:"image" yaml:"image"`
	} `json:"spawnerFormDefaults" yaml:"spawnerFormDefaults"`
}

// 監控與重新產生 daemonset 時用到的變數
var (
	// 要監視的 deployment 名稱與 namespace
	deploymentName = "jupyter-web-app-deployment"
	deploymentNS   = "kubeflow" // 請依實際情況修改

	// deployment 中參照的 configmap 名稱
	configmapNameStart = "jupyter-web-app-config"

	// daemonset 將建立在此 namespace 中
	pullImageNS = "pullimage"
)

func main() {
	// 取得 cluster 內部的設定 (若在 cluster 外執行，請使用 clientcmd)
	config, err := rest.InClusterConfig()
	if err != nil {
		log.Fatalf("取得叢集設定失敗: %v", err)
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		log.Fatalf("建立 clientset 失敗: %v", err)
	}

	// 建立 shared informer factory (這裡監控所有 namespace，可依需求調整)
	factory := informers.NewSharedInformerFactory(clientset, 5*time.Minute)

	// 取得 Deployment 與 ConfigMap 的 informer
	deploymentInformer := factory.Apps().V1().Deployments().Informer()
	configMapInformer := factory.Core().V1().ConfigMaps().Informer()

	// 為 Deployment informer 加入事件處理
	deploymentInformer.AddEventHandler(cache.ResourceEventHandlerFuncs{
		AddFunc: func(obj interface{}) {
			dep, ok := obj.(*appsv1.Deployment)
			if !ok {
				return
			}
			// 只關注指定的 deployment 與 namespace
			if dep.Name == deploymentName && dep.Namespace == deploymentNS {
				log.Printf("偵測到 Deployment %s/%s 新增，重新產生 DaemonSet", dep.Namespace, dep.Name)
				reconcileDaemonSets(clientset)
			}
		},
		UpdateFunc: func(oldObj, newObj interface{}) {
			dep, ok := newObj.(*appsv1.Deployment)
			if !ok {
				return
			}
			if dep.Name == deploymentName && dep.Namespace == deploymentNS {
				log.Printf("偵測到 Deployment %s/%s 更新，重新產生 DaemonSet", dep.Namespace, dep.Name)
				reconcileDaemonSets(clientset)
			}
		},
		DeleteFunc: func(obj interface{}) {
			dep, ok := obj.(*appsv1.Deployment)
			if !ok {
				return
			}
			if dep.Name == deploymentName && dep.Namespace == deploymentNS {
				log.Printf("偵測到 Deployment %s/%s 刪除，重新產生 DaemonSet", dep.Namespace, dep.Name)
				reconcileDaemonSets(clientset)
			}
		},
	})

	// 為 ConfigMap informer 加入事件處理
	configMapInformer.AddEventHandler(cache.ResourceEventHandlerFuncs{
		AddFunc: func(obj interface{}) {
			cm, ok := obj.(*corev1.ConfigMap)
			if !ok {
				return
			}
			// 只關注指定的 configmap 與 namespace
			if strings.HasPrefix(cm.Name, configmapNameStart) && cm.Namespace == deploymentNS {
				log.Printf("偵測到 ConfigMap %s/%s 新增，重新產生 DaemonSet", cm.Namespace, cm.Name)
				reconcileDaemonSets(clientset)
			}
		},
		UpdateFunc: func(oldObj, newObj interface{}) {
			cm, ok := newObj.(*corev1.ConfigMap)
			if !ok {
				return
			}
			if strings.HasPrefix(cm.Name, configmapNameStart) && cm.Namespace == deploymentNS {
				log.Printf("偵測到 ConfigMap %s/%s 更新，重新產生 DaemonSet", cm.Namespace, cm.Name)
				reconcileDaemonSets(clientset)
			}
		},
		DeleteFunc: func(obj interface{}) {
			cm, ok := obj.(*corev1.ConfigMap)
			if !ok {
				return
			}
			if strings.HasPrefix(cm.Name, configmapNameStart) && cm.Namespace == deploymentNS {
				log.Printf("偵測到 ConfigMap %s/%s 刪除，重新產生 DaemonSet", cm.Namespace, cm.Name)
				reconcileDaemonSets(clientset)
			}
		},
	})

	// 啟動 informer
	stopCh := make(chan struct{})
	defer close(stopCh)
	factory.Start(stopCh)

	// 等待 cache 同步完成
	if !cache.WaitForCacheSync(stopCh, deploymentInformer.HasSynced, configMapInformer.HasSynced) {
		log.Fatalf("cache 同步失敗")
	}

	// 等待結束訊號
	sigCh := make(chan os.Signal, 1)
	signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)
	<-sigCh
	log.Println("程序終止")
}

// reconcileDaemonSets 會讀取 deployment 與 configmap 的最新內容，並根據 spawner_ui_config.yaml 的內容重新建立 DaemonSet
func reconcileDaemonSets(clientset *kubernetes.Clientset) {
	ctx := context.Background()

	// 1. 取得指定的 Deployment
	dep, err := clientset.AppsV1().Deployments(deploymentNS).Get(ctx, deploymentName, metav1.GetOptions{})
	if err != nil {
		log.Printf("取得 Deployment %s/%s 失敗: %v", deploymentNS, deploymentName, err)
		return
	}

	// 檢查 deployment 是否有參照指定的 configmap
	var foundVolume bool
	var volumeName string
	for _, vol := range dep.Spec.Template.Spec.Volumes {
		if vol.ConfigMap != nil && strings.HasPrefix(vol.ConfigMap.Name, configmapNameStart) {
			foundVolume = true
			volumeName = vol.ConfigMap.Name
			break
		}
	}
	if !foundVolume {
		log.Printf("Deployment %s/%s 並未在 volume 中參照 以jupyter-web-app-config開頭的configmap", deploymentNS, deploymentName)
		return
	}

	// 2. 取得指定的 ConfigMap
	cm, err := clientset.CoreV1().ConfigMaps(deploymentNS).Get(ctx, volumeName, metav1.GetOptions{})
	if err != nil {
		log.Printf("取得 ConfigMap %s/%s 失敗: %v", deploymentNS, volumeName, err)
		return
	}
	configContent, ok := cm.Data["spawner_ui_config.yaml"]
	if !ok {
		log.Printf("ConfigMap %s/%s 中找不到 spawner_ui_config.yaml", deploymentNS, volumeName)
		return
	}

	// 3. 解析 YAML，取得 image 列表
	var spawnerCfg SpawnerUIConfig
	if err := yaml.Unmarshal([]byte(configContent), &spawnerCfg); err != nil {
		log.Printf("解析 spawner_ui_config.yaml 失敗: %v", err)
		return
	}
	images := spawnerCfg.SpawnerFormDefaults.Image.Options
	log.Printf("重新產生 DaemonSet：從 ConfigMap 取得的 images：%v", images)

	// 4. 刪除 pullimage namespace 中現有的 DaemonSet
	dsList, err := clientset.AppsV1().DaemonSets(pullImageNS).List(ctx, metav1.ListOptions{})
	if err != nil {
		log.Printf("列出 namespace %s 中 DaemonSet 失敗: %v", pullImageNS, err)
		return
	}
	for _, ds := range dsList.Items {
		if err := clientset.AppsV1().DaemonSets(pullImageNS).Delete(ctx, ds.Name, metav1.DeleteOptions{}); err != nil {
			log.Printf("刪除 DaemonSet %s 失敗: %v", ds.Name, err)
		} else {
			log.Printf("已刪除 DaemonSet %s", ds.Name)
		}
	}

	// 5. 根據 image 列表逐一建立 DaemonSet，每個 DaemonSet 會在所有 node 上拉取該 image
	for _, image := range images {
		dsName := generateDaemonSetName(image)
		ds := &appsv1.DaemonSet{
			ObjectMeta: metav1.ObjectMeta{
				Name:      dsName,
				Namespace: pullImageNS,
			},
			Spec: appsv1.DaemonSetSpec{
				Selector: &metav1.LabelSelector{
					MatchLabels: map[string]string{"app": dsName},
				},
				Template: corev1.PodTemplateSpec{
					ObjectMeta: metav1.ObjectMeta{
						Labels: map[string]string{"app": dsName},
					},
					Spec: corev1.PodSpec{
						Containers: []corev1.Container{
							{
								Name:  "puller",
								Image: image,
								// 以 sleep infinite 確保 container 持續執行，從而確保 image 被拉取
								Command: []string{"sleep", "infinity"},
							},
						},
						// 若有需要，也可以設定 tolerations，例如 master 節點
						Tolerations: []corev1.Toleration{
							{
								Key:    "node-role.kubernetes.io/master",
								Effect: corev1.TaintEffectNoSchedule,
							},
						},
					},
				},
			},
		}
		if _, err := clientset.AppsV1().DaemonSets(pullImageNS).Create(ctx, ds, metav1.CreateOptions{}); err != nil {
			log.Printf("建立 DaemonSet %s (image: %s) 失敗: %v", dsName, image, err)
		} else {
			log.Printf("建立 DaemonSet %s (image: %s) 成功", dsName, image)
		}
	}

	log.Println("DaemonSet 重新產生完成")
}

// generateDaemonSetName 根據 image 名稱產生合法的 DaemonSet 名稱 (符合 DNS-1123 規範)
func generateDaemonSetName(image string) string {
	name := strings.ToLower(image)
	// 將不合法字元轉換為 "-"
	name = strings.Map(func(r rune) rune {
		if (r >= 'a' && r <= 'z') ||
			(r >= '0' && r <= '9') ||
			r == '-' {
			return r
		}
		return '-'
	}, name)
	return "ds-" + name
}
