import {
    IFRAME_CONNECTED_EVENT, PARENT_CONNECTED_EVENT,
    NAMESPACE_SELECTED_EVENT, CentralDashboardEventHandler,
} from './library';

describe('CentralDashboardEventHandler', () => {
    // eslint-disable-next-line no-unused-vars
    let cdEventHandler;
    let parentSpy;
    let oldParent;

    beforeEach(() => {
        parentSpy = jasmine.createSpyObj('parent', ['postMessage']);
        oldParent = window.parent;
        window.parent = parentSpy;

        spyOn(window, 'addEventListener');
    });

    afterEach(() => {
        window.parent = oldParent;
    });

    it('Should not post message when outside of iframe', () => {
        parentSpy.location = window.location;

        cdEventHandler = new CentralDashboardEventHandler();

        expect(window.addEventListener).not.toHaveBeenCalled();
        expect(window.parent.postMessage).not.toHaveBeenCalled();
    });

    it('Should bind listener and send message to parent when in iframe', () => {
        parentSpy.origin = 'http://testpage.com';

        cdEventHandler = new CentralDashboardEventHandler();

        expect(window.addEventListener).toHaveBeenCalled();
        expect(window.parent.postMessage).toHaveBeenCalledWith(
            {
                type: IFRAME_CONNECTED_EVENT,
            }, 'http://testpage.com'
        );
    });

    it('Should invoke callbacks when messages are received', () => {
        cdEventHandler = new CentralDashboardEventHandler();
        const callbacksSpy = jasmine.createSpyObj('callbacksSpy', [
            'onParentConnected', 'onNamespaceSelected']);

        cdEventHandler.onParentConnected = callbacksSpy.onParentConnected;
        cdEventHandler.onNamespaceSelected = callbacksSpy.onNamespaceSelected;

        const message1 = {data: {type: PARENT_CONNECTED_EVENT, value: 'foo'}};
        const message2 = {
            data: {
                type: NAMESPACE_SELECTED_EVENT, value: 'default-namespace',
            },
        };

        cdEventHandler._onMessageReceived(message1);
        expect(callbacksSpy.onParentConnected)
            .toHaveBeenCalledWith(message1.data);

        cdEventHandler._onMessageReceived(message2);
        expect(callbacksSpy.onNamespaceSelected)
            .toHaveBeenCalledWith(message2.data);
    });
});
