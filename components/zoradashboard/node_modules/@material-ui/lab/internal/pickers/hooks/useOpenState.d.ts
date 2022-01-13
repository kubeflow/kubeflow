export interface OpenStateProps {
    open?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}
export declare function useOpenState({ open, onOpen, onClose }: OpenStateProps): {
    isOpen: boolean;
    setIsOpen: (newIsOpen: boolean) => void;
};
export default useOpenState;
