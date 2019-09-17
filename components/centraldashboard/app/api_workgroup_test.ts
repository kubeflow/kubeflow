import 'jasmine';
import express, {Request, Response} from 'express';

import {attachUser} from './attach_user_middleware';
import {DefaultApi} from './clients/profile_controller';
import {KubernetesService} from './k8s_service';
import {
    WorkgroupApi,
} from './api_workgroup';
import {sendTestRequest} from './test_resources';

describe('Workgroup API', () => {
    const header = {
        goog: 'X-Goog-Authenticated-User-Email',
        other: 'Other-Header',
    };
    const prefix = {
        goog: 'accounts.google.com:',
        other: 'other.foo.bar:',
    };
    const attachUserGCPMiddleware = attachUser(header.goog, prefix.goog);
    const attachUserOtherIAPMiddleware = attachUser(header.other, prefix.other);
    let mockK8sService: jasmine.SpyObj<KubernetesService>;
    let mockProfilesService: jasmine.SpyObj<DefaultApi>;
    let testApp: express.Application;
    let port: number;
    const newAPI = () => new WorkgroupApi(
        mockProfilesService,
        mockK8sService,
    );

    describe('Environment Information', () => {
        let url: string;
        beforeEach(() => {
            mockK8sService = jasmine.createSpyObj<KubernetesService>([
                'getPlatformInfo',
                'getNamespaces',
            ]);
            mockK8sService.getPlatformInfo.and.returnValue(Promise.resolve({
                provider: 'onprem',
                providerName: 'onprem',
                kubeflowVersion: '1.0.0',
            }));
            mockProfilesService = jasmine.createSpyObj<DefaultApi>(
                ['readBindings', 'v1RoleClusteradminGet']);

            mockProfilesService.readBindings.withArgs()
                .and.returnValue(Promise.resolve({
                    response: null,
                    body: {
                        bindings: [
                            {
                                user: {kind: 'User', name: 'anyone@kubeflow.org'},
                                referredNamespace: 'default',
                                roleRef: {kind: 'ClusterRole', name: 'admin'},
                            },
                            {
                                user: {kind: 'User', name: 'user1@kubeflow.org'},
                                referredNamespace: 'default',
                                roleRef: {kind: 'ClusterRole', name: 'edit'},
                            },
                            {
                                user: {kind: 'User', name: 'user1@kubeflow.org'},
                                referredNamespace: 'kubeflow',
                                roleRef: {kind: 'ClusterRole', name: 'admin'},
                            },
                        ]
                    },
                }));

            testApp = express();
            testApp.use(express.json());
            testApp.use(attachUserGCPMiddleware);
            testApp.use('/api/workgroup', newAPI().routes());
            const addressInfo = testApp.listen(0).address();
            if (typeof addressInfo === 'string') {
                throw new Error(
                    'Unable to determine system-assigned port for test API server');
            }
            port = addressInfo.port;
            url = `http://localhost:${port}/api/workgroup/env-info`;
        });

        it('Should retrieve information for a non-identity aware cluster',
            async () => {
                const expectedResponse = {
                    platform: {
                        provider: 'onprem',
                        providerName: 'onprem',
                        kubeflowVersion: '1.0.0',
                    },
                    user: 'anonymous@kubeflow.org',
                    isClusterAdmin: true,
                    namespaces: [
                        {
                            user: 'anonymous@kubeflow.org',
                            namespace: 'default',
                            role: 'contributor',
                        },
                        {
                            user: 'anonymous@kubeflow.org',
                            namespace: 'kubeflow',
                            role: 'contributor',
                        },
                    ],
                };

                let response = await sendTestRequest(url);
                expect(response).toEqual(expectedResponse);
                expect(mockK8sService.getPlatformInfo).toHaveBeenCalled();

                // Second call should use cached platform information
                response = await sendTestRequest(url);
                expect(response).toEqual(expectedResponse);
                expect(mockK8sService.getPlatformInfo.calls.count()).toBe(1);
                expect(mockProfilesService.readBindings).toHaveBeenCalled();
                expect(mockProfilesService.v1RoleClusteradminGet)
                    .not.toHaveBeenCalled();
            });

        it('Should retrieve information for an identity aware cluster',
            async () => {
                mockProfilesService.v1RoleClusteradminGet
                    .withArgs('test@testdomain.com')
                    .and.returnValue(Promise.resolve({response: null, body: false}));
                mockProfilesService.readBindings.withArgs('test@testdomain.com')
                    .and.returnValue(Promise.resolve({
                        response: null,
                        body: {
                            bindings: [{
                                user: {kind: 'user', name: 'test@testdomain.com'},
                                referredNamespace: 'test',
                                roleRef: {apiGroup: '', kind: 'ClusterRole', name: 'edit'}
                            }]
                        },
                    }));

                const headers = {
                    [header.goog]: `${prefix.goog}test@testdomain.com`,
                };
                const expectedResponse = {
                    platform: {
                        provider: 'onprem',
                        providerName: 'onprem',
                        kubeflowVersion: '1.0.0',
                    },
                    user: 'test@testdomain.com',
                    isClusterAdmin: false,
                    namespaces: [
                        {
                            user: 'test@testdomain.com',
                            namespace: 'test',
                            role: 'contributor',
                        },
                    ],
                };

                const response = await sendTestRequest(url, headers);
                expect(response).toEqual(expectedResponse);
                expect(mockK8sService.getNamespaces).not.toHaveBeenCalled();
                expect(mockK8sService.getPlatformInfo).toHaveBeenCalled();
                expect(mockProfilesService.readBindings)
                    .toHaveBeenCalledWith('test@testdomain.com');
                expect(mockProfilesService.v1RoleClusteradminGet)
                    .toHaveBeenCalledWith('test@testdomain.com');
            });

        it('Returns an error status if the Profiles service fails', async () => {
            mockProfilesService.v1RoleClusteradminGet.withArgs('test@testdomain.com')
                .and.callFake(
                    () => Promise.reject(
                        {response: {statusCode: 400}, body: 'A bad thing happened'}));
            mockProfilesService.readBindings.withArgs('test@testdomain.com')
                .and.returnValue(Promise.resolve({
                    response: null,
                    body: {
                        bindings: [{
                            user: {kind: 'user', name: 'test@testdomain.com'},
                            referredNamespace: 'test',
                            roleRef: {apiGroup: '', kind: 'ClusterRole', name: 'edit'}
                        }]
                    },
                }));

            const headers = {
                [header.goog]: `${prefix.goog}test@testdomain.com`,
            };
            const response = await sendTestRequest(url, headers, 400);
            expect(response).toEqual({error: 'A bad thing happened'});
            expect(mockK8sService.getNamespaces).not.toHaveBeenCalled();
            expect(mockK8sService.getPlatformInfo).toHaveBeenCalled();
            expect(mockProfilesService.readBindings)
                .toHaveBeenCalledWith('test@testdomain.com');
            expect(mockProfilesService.v1RoleClusteradminGet)
                .toHaveBeenCalledWith('test@testdomain.com');
        });
    });

    describe('Has Workgroup', () => {
        let url: string;
        beforeEach(() => {
            mockProfilesService = jasmine.createSpyObj<DefaultApi>(
                ['readBindings', 'v1RoleClusteradminGet']);

            testApp = express();
            testApp.use(express.json());
            testApp.use(attachUserGCPMiddleware);
            testApp.use('/api/workgroup', newAPI().routes());
            const addressInfo = testApp.listen(0).address();
            if (typeof addressInfo === 'string') {
                throw new Error(
                    'Unable to determine system-assigned port for test API server');
            }
            port = addressInfo.port;
            url = `http://localhost:${port}/api/workgroup/exists`;
        });

        it('Should return for a non-identity aware cluster', async () => {
            const expectedResponse = {hasAuth: false, hasWorkgroup: false, user: 'anonymous'};

            const response = await sendTestRequest(url);
            expect(response).toEqual(expectedResponse);
            expect(mockProfilesService.v1RoleClusteradminGet).not.toHaveBeenCalled();
            expect(mockProfilesService.readBindings).not.toHaveBeenCalled();
        });

        it('Should return for an identity aware cluster with a Workgroup',
            async () => {
                mockProfilesService.v1RoleClusteradminGet
                    .withArgs('test@testdomain.com')
                    .and.returnValue(Promise.resolve({response: null, body: false}));
                mockProfilesService.readBindings.withArgs('test@testdomain.com')
                    .and.returnValue(Promise.resolve({
                        response: null,
                        body: {
                            bindings: [{
                                user: {kind: 'user', name: 'test@testdomain.com'},
                                referredNamespace: 'test',
                                roleRef: {apiGroup: '', kind: 'ClusterRole', name: 'admin'}
                            }]
                        },
                    }));

                const expectedResponse = {hasAuth: true, hasWorkgroup: true, user: 'test'};

                const headers = {
                    [header.goog]: `${prefix.goog}test@testdomain.com`,
                };
                const response = await sendTestRequest(url, headers);
                expect(response).toEqual(expectedResponse);
                expect(mockProfilesService.readBindings)
                    .toHaveBeenCalledWith('test@testdomain.com');
                expect(mockProfilesService.v1RoleClusteradminGet)
                    .toHaveBeenCalledWith('test@testdomain.com');
            });

        it('Should return for an identity aware cluster without a Workgroup', async () => {
            mockProfilesService.v1RoleClusteradminGet
                .withArgs('test@testdomain.com')
                .and.returnValue(Promise.resolve({response: null, body: false}));
            mockProfilesService.readBindings.withArgs('test@testdomain.com')
                .and.returnValue(Promise.resolve({
                    response: null,
                    body: {bindings: []},
                }));

            const expectedResponse = {hasAuth: true, hasWorkgroup: false, user: 'test'};

            const headers = {
                [header.goog]: `${prefix.goog}test@testdomain.com`,
            };
            const response = await sendTestRequest(url, headers);
            expect(response).toEqual(expectedResponse);
            expect(mockProfilesService.readBindings)
                .toHaveBeenCalledWith('test@testdomain.com');
            expect(mockProfilesService.v1RoleClusteradminGet)
                .toHaveBeenCalledWith('test@testdomain.com');
        });
    });

    describe('Create Workgroup', () => {
        let url: string;

        beforeEach(() => {
            mockProfilesService = jasmine.createSpyObj<DefaultApi>(['createProfile']);

            testApp = express();
            testApp.use(express.json());
            testApp.use(attachUserGCPMiddleware);
            testApp.use('/api/workgroup', newAPI().routes());
            const addressInfo = testApp.listen(0).address();
            if (typeof addressInfo === 'string') {
                throw new Error(
                    'Unable to determine system-assigned port for test API server');
            }
            port = addressInfo.port;
            url = `http://localhost:${port}/api/workgroup/create`;
        });

        it('Should work for a non-identity aware cluster', async () => {
            const response = await sendTestRequest(url, null, 200, 'post');
            expect(response).toEqual({message: 'Created namespace anonymous'});
            expect(mockProfilesService.createProfile).toHaveBeenCalledWith({
                metadata: {
                    name: 'anonymous',
                },
                spec: {
                    owner: {
                        kind: 'User',
                        name: 'anonymous@kubeflow.org',
                    }
                },
            });
        });

        it('Should use user identity if no body is provided', async () => {
            const headers = {
                [header.goog]: `${prefix.goog}test@testdomain.com`,
            };
            const response = await sendTestRequest(url, headers, 200, 'post');
            expect(response).toEqual({message: 'Created namespace test'});
            expect(mockProfilesService.createProfile).toHaveBeenCalledWith({
                metadata: {
                    name: 'test',
                },
                spec: {
                    owner: {
                        kind: 'User',
                        name: 'test@testdomain.com',
                    }
                },
            });
        });

        it('Should use post body when provided', async () => {
            const headers = {
                [header.goog]: `${prefix.goog}test@testdomain.com`,
                'content-type': 'application/json',
            };
            const response = await sendTestRequest(
                url, headers, 200, 'post',
                {namespace: 'a_different_namespace', user: 'another_user@foo.bar'});
            expect(response).toEqual({message: 'Created namespace a_different_namespace'});
            expect(mockProfilesService.createProfile).toHaveBeenCalledWith({
                metadata: {
                    name: 'a_different_namespace',
                },
                spec: {
                    owner: {
                        kind: 'User',
                        name: 'another_user@foo.bar',
                    }
                },
            });
        });

        it('Returns an error status if the Profiles service fails', async () => {
            mockProfilesService.createProfile
                .withArgs({
                    metadata: {
                        name: 'test',
                    },
                    spec: {
                        owner: {
                            kind: 'User',
                            name: 'test@testdomain.com',
                        }
                    },
                })
                .and.callFake(() => Promise.reject({response: {statusCode: 405}}));

            const headers = {
                [header.goog]: `${prefix.goog}test@testdomain.com`,
            };
            const response = await sendTestRequest(url, headers, 405, 'post');
            expect(response).toEqual({error: 'Unexpected error creating profile'});
        });
    });
    describe('Add / Remove Contributor', () => {
        type RouteTypes = 'add' | 'remove';
        let url: (type: RouteTypes) => string;
        const requestBody = {contributor: 'apverma@google.com'};
        const headers = {
            'content-type': 'application/json',
            [header.goog]: `${prefix.goog}test@testdomain.com`,
        };

        beforeEach(() => {
            mockProfilesService = jasmine.createSpyObj<DefaultApi>(['createBinding', 'deleteBinding']);
            const api = newAPI();
            api.getContributors = async () => ['test'];

            testApp = express();
            testApp.use(express.json());
            testApp.use(attachUserGCPMiddleware);
            testApp.use('/api/workgroup', api.routes());
            const addressInfo = testApp.listen(0).address();
            if (typeof addressInfo === 'string') {
                throw new Error(
                    'Unable to determine system-assigned port for test API server');
            }
            port = addressInfo.port;
            url = (type: RouteTypes) =>
                `http://localhost:${port}/api/workgroup/${type}-contributor/apverma`;
        });
        it('Should should show error if user auth status is not detected', async () => {
            const response = await sendTestRequest(url('add'), null, 405, 'post', requestBody);
            expect(response).toEqual({error: `Unable to ascertain user identity from request, cannot access route.`});
            expect(mockProfilesService.createBinding).not.toHaveBeenCalled();
        });
        it('Should error on missing contributor', async () => {
            const [rAdd, rRemove] = await Promise.all([
                sendTestRequest(url('add'), headers, 400, 'post'),
                sendTestRequest(url('remove'), headers, 400, 'delete'),
            ]);
            [rAdd, rRemove].forEach(response => {
                expect(response).toEqual({error: `Missing contributor field.`});
            });
            expect(mockProfilesService.createBinding).not.toHaveBeenCalled();
        });
        it('Should error on invalid email for contrib', async () => {
            const response = await sendTestRequest(url('add'), headers, 400, 'post', {
                contributor: 'apverma'
            });
            expect(response).toEqual({error: `Contributor doesn't look like a valid email address`});
            expect(mockProfilesService.createBinding).not.toHaveBeenCalled();
        });
        it('Should successfully add a contributor', async () => {
            const response = await sendTestRequest(url('add'), headers, 200, 'post', requestBody);
            expect(response).toEqual(['test']);
            expect(mockProfilesService.createBinding).toHaveBeenCalledWith({
                user: {
                    kind: 'User',
                    name: 'apverma@google.com',
                },
                referredNamespace: 'apverma',
                roleRef: {
                    kind: 'ClusterRole',
                    name: 'edit',
                }
            }, jasmine.anything());
            expect(mockProfilesService.deleteBinding).not.toHaveBeenCalled();
        });
        it('Should successfully remove a contributor', async () => {
            const response = await sendTestRequest(url('remove'), {...headers, 'Transfer-Encoding': 'chunked'}, 200, 'delete', requestBody);
            expect(response).toEqual(['test']);
            expect(mockProfilesService.createBinding).not.toHaveBeenCalled();
            expect(mockProfilesService.deleteBinding).toHaveBeenCalledWith({
                user: {
                    kind: 'User',
                    name: 'apverma@google.com',
                },
                referredNamespace: 'apverma',
                roleRef: {
                    kind: 'ClusterRole',
                    name: 'edit',
                }
            }, jasmine.anything());
        });
    });
});
