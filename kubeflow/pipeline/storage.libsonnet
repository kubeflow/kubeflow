{
  // This component creates necessary K8s PV/PVC resources depending on
  // the user preferences. The logic is as following (for both mysql and nfs)
  // If user provide a GCE PD name, create a new PV and PVC using the PD
  // Else if user provide a precreated PV, create a new PVC using the PV
  // Otherwise, use default storage specified by default StorageClass. 
  // Data might not persist in this case when cluster is deleted.
  all(namespace, mysqlPvName=null, nfsPvName=null, mysqlPd=null, nfsPd=null):: [
    $.parts(namespace).mysqlPvc(mysqlPd,mysqlPvName),
    $.parts(namespace).nfsServerPvc(nfsPd,nfsPvName),
  ] +
  [ if mysqlPd != "null" 
    then $.parts(namespace).mysqlPv(mysqlPd),
  ] +
  [ if nfsPd != "null"
    then $.parts(namespace).nfsServerPv(nfsPd),
  ],
  parts(namespace):: {
    mysqlPv(mysqlPd): {
      apiVersion: "v1",
      kind: "PersistentVolume",
      metadata: {
        name: "mysql-pv",
        namespace: namespace,
        labels: {
          app: "mysql-pv",
        },
      },
      spec: {
        capacity: {
          storage: "20Gi",
        },
        accessModes: [
          "ReadWriteOnce",
        ],
        gcePersistentDisk: {
          pdName: mysqlPd,
          fsType: "ext4",
        },
      },
    }, //mysqlPv

    mysqlPvc(mysqlPd,mysqlPvName=null): {
      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        name: "mysql-pv-claim",
        namespace: namespace,
      },
      spec:
        {
          accessModes: [
            "ReadWriteOnce",
          ],
          resources: {
            requests: {
              storage: "20Gi",
            },
          },
        } + 
        // if GCE PD or PV is provided, use mysql-pv volume
        // Otherwise create PVC through default StorageClass
        if (mysqlPvName != "null") || (mysqlPd != "null")  then {
         storageClassName: "",
         volumeName:
           if mysqlPd != "null"
           then "mysql-pv"
           else mysqlPvName,
        } else {}
    },  //mysqlPvc

    nfsServerPv(nfsPd): {
      apiVersion: "v1",
      kind: "PersistentVolume",
      metadata: {
        name: "nfs-server-pv",
        namespace: namespace,
        labels: {
          app: "nfs-server-pv",
        },
      },
      spec: {
        capacity: {
          storage: "200Gi",
        },
        accessModes: [
          "ReadWriteOnce",
        ],
        gcePersistentDisk: {
          pdName: nfsPd,
          fsType: "ext4",
        },
      },
    }, // nfsServerPv

    nfsServerPvc(nfsPd,nfsPvName=null): {
      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        name: "nfs-server-pvc",
        namespace: namespace,
        labels: {
          app: "nfs-server-pvc",
        },
      },
      spec:
        {
          accessModes: [
            "ReadWriteOnce",
          ],
          resources: {
            requests: {
              storage: "200Gi",
            },
          },
        } +
        // if GCE PD or PV is provided, use mysql-pv volume
        // Otherwise create PVC through default StorageClass
        if (nfsPvName != "null") || (nfsPd != "null")  then {
         storageClassName: "",
         volumeName:
           if nfsPd != "null"
           then "nfs-server-pv"
           else nfsPvName,
        }
        else {}
    },  // nfsServerPvc
  },
}