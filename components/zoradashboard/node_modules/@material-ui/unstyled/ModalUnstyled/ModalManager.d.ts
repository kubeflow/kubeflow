export interface ManagedModalProps {
    disableScrollLock?: boolean;
}
export declare function ariaHidden(element: Element, show: boolean): void;
interface Modal {
    mount: Element;
    modalRef: Element;
}
/**
 * @ignore - do not document.
 *
 * Proper state management for containers and the modals in those containers.
 * Simplified, but inspired by react-overlay's ModalManager class.
 * Used by the Modal to ensure proper styling of containers.
 */
export default class ModalManager {
    private containers;
    private modals;
    constructor();
    add(modal: Modal, container: HTMLElement): number;
    mount(modal: Modal, props: ManagedModalProps): void;
    remove(modal: Modal): number;
    isTopModal(modal: Modal): boolean;
}
export {};
