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
            text: 'Stackdriver Logging',
            link: `https://console.cloud.google.com/logs/viewer?resource=k8s_cluster&project=${project}`,
        },
        {
            text: 'Project Overview',
            link: `https://console.cloud.google.com/home/dashboard?project=${project}`,
        },
        {
            text: 'Deployment Manager',
            link: `https://console.cloud.google.com/dm/deployments?project=${project}`,
        },
        {
            text: 'Kubernetes Engine',
            link: `https://console.cloud.google.com/kubernetes/list?project=${project}`,
        },
    ],
    title: 'Google Cloud Platform',
    logo: '/public/assets/gcp-logo.png',
    name: 'GCP',
});
