// See https://github.com/google/jsonnet/issues/230
{
  volumeMounts: [
    {
      name: 'deployment-config',
      mountPath:
        if 42 == 42 then
          '/box/deployment-config'
        else
          '/box'
      ,
    },
  ],
}
