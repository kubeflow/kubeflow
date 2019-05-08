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
});
