import {
    IFRAME_CONNECTED_EVENT, PARENT_CONNECTED_EVENT,
    NAMESPACE_SELECTED_EVENT, CentralDashboardEventHandler,
} from './library';

describe('CentralDashboardEventHandler', () => {
    let parentSpy;
    let oldParent;

    beforeEach(() => {
        parentSpy = jasmine.createSpyObj('parent', ['postMessage']);
        oldParent = window.parent;
        CentralDashboardEventHandler.parent = parentSpy;

        spyOn(window, 'addEventListener');
    });

    afterEach(() => {
        CentralDashboardEventHandler.detach();
        CentralDashboardEventHandler.parent = oldParent;
    });

    it('Should not post message when outside of iframe', () => {
        parentSpy.location = window.location;
        const initSpy = jasmine.createSpy();
        CentralDashboardEventHandler.init(initSpy);

        expect(window.addEventListener).not.toHaveBeenCalled();
        expect(CentralDashboardEventHandler.parent.postMessage)
            .not.toHaveBeenCalled();
        expect(initSpy).toHaveBeenCalledWith(CentralDashboardEventHandler,
            false);
    });

    it('Should bind listener and send message to parent when in iframe', () => {
        parentSpy.origin = 'http://testpage.com';
        const initSpy = jasmine.createSpy();
        CentralDashboardEventHandler.init(initSpy);

        expect(window.addEventListener).toHaveBeenCalled();
        expect(CentralDashboardEventHandler.parent.postMessage)
            .toHaveBeenCalledWith(
                {
                    type: IFRAME_CONNECTED_EVENT,
                }, 'http://testpage.com'
            );
        expect(initSpy).toHaveBeenCalledWith(CentralDashboardEventHandler,
            true);
    });

    it('Should invoke callbacks when messages are received', () => {
        const callbacksSpy = jasmine.createSpyObj('callbacksSpy', [
            'onParentConnected', 'onNamespaceSelected']);
        CentralDashboardEventHandler.init((cdeh) => {
            cdeh.onParentConnected = callbacksSpy.onParentConnected;
            cdeh.onNamespaceSelected = callbacksSpy.onNamespaceSelected;
        });

        const message1 = {data: {type: PARENT_CONNECTED_EVENT, value: 'foo'}};
        const message2 = {
            data: {
                type: NAMESPACE_SELECTED_EVENT, value: 'default-namespace',
            },
        };

        CentralDashboardEventHandler._onMessageReceived(message1);
        expect(callbacksSpy.onParentConnected)
            .toHaveBeenCalledWith(message1.data);

        CentralDashboardEventHandler._onMessageReceived(message2);
        expect(callbacksSpy.onNamespaceSelected)
            .toHaveBeenCalledWith(message2.data.value);
    });
});
