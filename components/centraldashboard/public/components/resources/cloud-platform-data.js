/* The Goal of this file is to provide platform specific resources
 *  to centraldashboard:
 * - Platform Specific card in case links are provided.
 * - Logo for said card.
 * - And a full name Title
 */
import '../../assets/gcp-logo.png';


/**
 * Provides GCP specific Platform data
 * @param {string} project
 * @return {object}
 */
export const getGCPData = (project) => ({
    links: [
        {
            headerText: 'Stackdriver Logging',
            secondaryText: 'View cluster logs for the past hour',
            link: `https://console.cloud.google.com/logs/viewer?resource=k8s_cluster&project=${project}`,
        },
        {
            headerText: 'Project Overview',
            secondaryText: 'Manage your GCP Project',
            link: `https://console.cloud.google.com/home/dashboard?project=${project}`,
        },
        {
            headerText: 'Deployment Manager',
            secondaryText: 'View your deployments',
            link: `https://console.cloud.google.com/dm/deployments?project=${project}`,
        },
        {
            headerText: 'Kubernetes Engine',
            secondaryText: 'Administer your GKE clusters',
            link: `https://console.cloud.google.com/kubernetes/list?project=${project}`,
        },
    ],
    title: 'Google Cloud Platform',
    logo: '/assets/gcp-logo.png',
    name: 'GCP',
    resourceChartsLink: `https://app.google.stackdriver.com/gke?project=${project}`,
    resourceChartsLinkText: 'View in Stackdriver',
});
