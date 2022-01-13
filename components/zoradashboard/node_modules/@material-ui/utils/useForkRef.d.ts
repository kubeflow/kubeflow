import * as React from 'react';
export default function useForkRef<Instance>(refA: React.Ref<Instance> | null | undefined, refB: React.Ref<Instance> | null | undefined): React.Ref<Instance> | null;
