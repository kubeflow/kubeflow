package controllers

import (
	"context"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/go-logr/logr"
	appsv1 "k8s.io/api/apps/v1"
	apierrs "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	logf "sigs.k8s.io/controller-runtime/pkg/log"

	"github.com/kubeflow/kubeflow/components/tensorboard-controller/api/v1alpha1"
)

// The constants with name 'DEFAULT_{ENV_Var}' are the default values to be
// used, if the respective ENV vars are not present.
// All the time numbers correspond to minutes.

const DEFAULT_CULL_IDLE_TIME = "1440" // One day
const DEFAULT_IDLENESS_CHECK_PERIOD = "1"
const DEFAULT_ENABLE_CULLING = "false"

var CULL_IDLE_TIME = 0
var ENABLE_CULLING = false
var IDLENESS_CHECK_PERIOD = 0

// When a Resource should be stopped/culled, then the controller should add this
// annotation in the Resource's Metadata. Then, inside the reconcile loop,
// the controller must check if this annotation is set and then apply the
// respective culling logic for that Resource. The value of the annotation will
// be a timestamp of when the Resource was stopped/culled.
//
// In case of TensorBoard, the controller will reduce the replicas to 0 if
// this annotation is set. If it's not set, then it will make the replicas 1.
const STOP_ANNOTATION = "kubeflow-resource-stopped"
const LAST_ACTIVITY_ANNOTATION = "tensorboard.kubeflow.org/last-activity"
const LAST_ACTIVITY_CHECK_TIMESTAMP_ANNOTATION = "tensorboard.kubeflow.org/last_activity_check_timestamp"

// CullingReconciler : Type of a reconciler that will be culling idle tensorboard
type CullingReconciler struct {
	client.Client
	Log logr.Logger
}

func (r *CullingReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	log := r.Log.WithValues("culler", req.NamespacedName)
	log.Info("Reconciliation loop started")

	instance := &v1alpha1.Tensorboard{}
	err := r.Get(ctx, req.NamespacedName, instance)
	if err != nil && apierrs.IsNotFound(err) {
		// we'll ignore not-found errors, since they can't be fixed by an immediate
		// requeue (we'll need to wait for a new notification), and we can get them
		// on deleted requests.
		return ctrl.Result{}, nil
	} else if err != nil {
		return ctrl.Result{}, err
	}

	// Won't check for culling when a Tensorboard is being culled/stopped
	// Remove LAST_ACTIVITY_ANNOTATION and LAST_ACTIVITY_TIMESTAMP_CHECK
	// annotations for CR objects
	if StopAnnotationIsSet(instance.ObjectMeta) {
		log.Info("Tensorboard is already stopping")
		removeAnnotations(&instance.ObjectMeta, r.Log)
		err = r.Update(ctx, instance)
		if err != nil {
			return ctrl.Result{}, err
		}
		return ctrl.Result{}, nil
	}

	// Ensure that the underlying Tensorboard Deployment exists
	foundDeployment := &appsv1.Deployment{}
	err = r.Get(ctx, types.NamespacedName{Name: instance.Name, Namespace: instance.Namespace}, foundDeployment)
	if err != nil && apierrs.IsNotFound(err) {
		log.Info("Deployment not found...Will remove last-activity annotation...")

		removeAnnotations(&instance.ObjectMeta, r.Log)
		err = r.Update(ctx, instance)
		if err != nil {
			return ctrl.Result{}, err
		}
		return ctrl.Result{}, nil
	} else if err != nil {
		return ctrl.Result{}, err
	}

	// Initialize culling (last-activity and last-activity-check-timestamp) annotations
	if !annotationsExist(instance) {
		log.Info("No annotations found. Initializing last-activity and last-activity-check-timestamp annotations")
		initializeAnnotations(&instance.ObjectMeta)
		err = r.Update(ctx, instance)
		if err != nil {
			return ctrl.Result{}, err
		}
	}

	// Check if culling period has passed (IDLENESS_CHECK_PERIOD ~ default 1 min)
	if !cullingCheckPeriodHasPassed(instance.ObjectMeta, r.Log) {
		log.Info("Not enough time has passed. Won't check for culling.")
		return ctrl.Result{RequeueAfter: getRequeueTime()}, nil
	}

	// Update the LAST_ACTIVITY_ANNOTATION and LAST_ACTIVITY_CHECK_TIMESTAMP_ANNOTATION
	updateTensorboardLastActivityAnnotation(&instance.ObjectMeta, foundDeployment, r.Log)
	updateLastCullingCheckTimestampAnnotation(&instance.ObjectMeta, r.Log)
	// Always keep track of the last time we checked for culling
	err = r.Update(ctx, instance)
	if err != nil {
		return ctrl.Result{}, err
	}

	// Check if the Tensorboard needs to be stopped
	if tensorboardIsIdle(instance.ObjectMeta, r.Log) {
		log.Info(fmt.Sprintf(
			"Tensorboard %s/%s needs culling. Updating Tensorboard CR Annotations...",
			instance.Namespace, instance.Name))

		// Set Stop Annotation to the Tensorboard CR
		setStopAnnotation(&instance.ObjectMeta, r.Log)
		err = r.Update(ctx, instance)
		if err != nil {
			return ctrl.Result{}, err
		}
	}
	return ctrl.Result{RequeueAfter: getRequeueTime()}, nil
}

// This function ensures that we run the culling checks every CULLING_CHECK_PERIOD
// even if in the meantime an update/create/delete event occurs for a Tensorboard CR.
func cullingCheckPeriodHasPassed(meta metav1.ObjectMeta, log logr.Logger) bool {
	if _, ok := meta.GetAnnotations()[LAST_ACTIVITY_CHECK_TIMESTAMP_ANNOTATION]; !ok {
		log.Info("No last-activity-check-timestamp found in the CR. Won't check for culling")
		return false
	}
	storedTimestamp, _ := time.Parse(time.RFC3339, meta.Annotations[LAST_ACTIVITY_CHECK_TIMESTAMP_ANNOTATION])
	nextCullingCheck := storedTimestamp.Add(getRequeueTime())
	currentTime := time.Now()
	return nextCullingCheck.Before(currentTime)
}

// Culling Logic
func tensorboardIsIdle(meta metav1.ObjectMeta, log logr.Logger) bool {
	// Being idle means that the Tensorboard can be culled/stopped
	if meta.GetAnnotations() != nil {
		if StopAnnotationIsSet(meta) {
			log.Info("Tensorboard is already stopping")
			return false
		}
		// Read the current LAST_ACTIVITY_ANNOTATION
		tempLastActivity := meta.GetAnnotations()[LAST_ACTIVITY_ANNOTATION]
		lastActivity, err := time.Parse(time.RFC3339, tempLastActivity)
		if err != nil {
			log.Error(err, "Error parsing last-activity time")
			return false
		}

		timeCap := lastActivity.Add(time.Duration(CULL_IDLE_TIME) * time.Minute)
		if time.Now().After(timeCap) {
			return true
		}
	}
	return false
}

// Update LAST_ACTIVITY_ANNOTATION
func updateTensorboardLastActivityAnnotation(meta *metav1.ObjectMeta, deployment *appsv1.Deployment, log logr.Logger) {
	var latestCondition *appsv1.DeploymentCondition
	var latestTime metav1.Time

	if deployment.Status.AvailableReplicas == 0 {
		log.Info("No available replicas found in the Deployment. Will not update the annotation")
		return
	}

	for _, condition := range deployment.Status.Conditions {
		if condition.Type == "Available" && (latestCondition == nil || condition.LastUpdateTime.Time.After(latestTime.Time)) {
			latestCondition = &condition
			latestTime = condition.LastUpdateTime
		}
	}

	if latestCondition == nil {
		log.Info("No conditions found in the Deployment of type 'Available'. Will not update the annotation")
		return
	}

	lastActivityTime := latestCondition.LastUpdateTime
	log.Info("Latest activity time: ", "time", lastActivityTime)

	t := lastActivityTime.Format(time.RFC3339)

	meta.Annotations[LAST_ACTIVITY_ANNOTATION] = t
	log.Info(fmt.Sprintf("Successfully updated last-activity from latest kernel action, %s", t))
}

func updateLastCullingCheckTimestampAnnotation(meta *metav1.ObjectMeta, log logr.Logger) {
	t := createTimestamp()
	if _, ok := meta.GetAnnotations()[LAST_ACTIVITY_CHECK_TIMESTAMP_ANNOTATION]; !ok {
		log.Info("No last-activity-check-timestamp annotation found. Will not update")
	}
	meta.Annotations[LAST_ACTIVITY_CHECK_TIMESTAMP_ANNOTATION] = t
	log.Info("Successfully updated last-activity-check-timestamp annotation")
}

func annotationsExist(instance *v1alpha1.Tensorboard) bool {
	meta := instance.ObjectMeta
	if metav1.HasAnnotation(meta, LAST_ACTIVITY_ANNOTATION) &&
		metav1.HasAnnotation(meta, LAST_ACTIVITY_CHECK_TIMESTAMP_ANNOTATION) {
		return true
	}
	return false
}

func initializeAnnotations(meta *metav1.ObjectMeta) {
	if len(meta.GetAnnotations()) == 0 {
		meta.SetAnnotations(map[string]string{})
	}
	t := createTimestamp()
	meta.Annotations[LAST_ACTIVITY_ANNOTATION] = t
	meta.Annotations[LAST_ACTIVITY_CHECK_TIMESTAMP_ANNOTATION] = t
}

func removeAnnotations(meta *metav1.ObjectMeta, log logr.Logger) {
	if meta == nil {
		log.Info("Error: Metadata is Nil. Can't remove Annotations")
		return
	}

	if _, ok := meta.GetAnnotations()[LAST_ACTIVITY_ANNOTATION]; ok {
		log.Info("Removing last-activity annotation")
		delete(meta.GetAnnotations(), LAST_ACTIVITY_ANNOTATION)
	}
	if _, ok := meta.GetAnnotations()[LAST_ACTIVITY_CHECK_TIMESTAMP_ANNOTATION]; ok {
		log.Info("Removing last-activity-check-timestamp annotation")
		delete(meta.GetAnnotations(), LAST_ACTIVITY_CHECK_TIMESTAMP_ANNOTATION)
	}
}

// Stop Annotation handling functions
func setStopAnnotation(meta *metav1.ObjectMeta, log logr.Logger) {
	if meta == nil {
		log.Info("Error: Metadata is Nil. Can't set Annotations")
		return
	}

	log.Info("Setting stop timestamp annotation")
	t := time.Now()
	if len(meta.GetAnnotations()) == 0 {
		meta.SetAnnotations(map[string]string{})
	}
	meta.Annotations[STOP_ANNOTATION] = t.Format(time.RFC3339)
}

func StopAnnotationIsSet(meta metav1.ObjectMeta) bool {
	if meta.GetAnnotations() == nil {
		return false
	}
	if metav1.HasAnnotation(meta, STOP_ANNOTATION) {
		return true
	}
	return false
}

// Some Utility Functions
func GetEnvDefault(variable string, defaultVal string) string {
	envVar := os.Getenv(variable)
	if len(envVar) == 0 {
		return defaultVal
	}
	return envVar
}

// Time / Frequency Utility functions
func createTimestamp() string {
	now := time.Now()
	return now.Format(time.RFC3339)
}

func getRequeueTime() time.Duration {
	// The frequency in which we check if the Pod needs culling
	// Uses ENV var: IDLENESS_CHECK_PERIOD
	return time.Duration(IDLENESS_CHECK_PERIOD) * time.Minute
}

func initGlobalVars() error {
	log := logf.Log.WithName("Culler")

	idleTime := GetEnvDefault("CULL_IDLE_TIME", DEFAULT_CULL_IDLE_TIME)
	realIdleTime, err := strconv.Atoi(idleTime)
	if err != nil {
		log.Info(fmt.Sprintf(
			"CULL_IDLE_TIME should be Int. Got %s instead. Using default value.",
			idleTime))
		realIdleTime, _ = strconv.Atoi(DEFAULT_CULL_IDLE_TIME)
	}
	CULL_IDLE_TIME = realIdleTime

	enableCulling := GetEnvDefault("ENABLE_CULLING", DEFAULT_ENABLE_CULLING)
	if enableCulling == "true" {
		ENABLE_CULLING = true
	}

	cullPeriod := GetEnvDefault("IDLENESS_CHECK_PERIOD", DEFAULT_IDLENESS_CHECK_PERIOD)
	period, err := strconv.Atoi(cullPeriod)
	if err != nil {
		return err
	}
	IDLENESS_CHECK_PERIOD = period

	return nil
}

// SetupWithManager : Add the culling controller to the manager
func (r *CullingReconciler) SetupWithManager(mgr ctrl.Manager) error {

	log := r.Log.WithValues("Culler", "setup")

	if err := initGlobalVars(); err != nil {
		log.Error(err, "Could not initialize the global variables")
		return err
	}

	controller := ctrl.NewControllerManagedBy(mgr).
		For(&v1alpha1.Tensorboard{}).
		Named("Culler")

	err := controller.Complete(r)
	if err != nil {
		return err
	}
	return nil
}
