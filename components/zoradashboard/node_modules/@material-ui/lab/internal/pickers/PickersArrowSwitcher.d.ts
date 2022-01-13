import * as React from 'react';
export interface ExportedArrowSwitcherProps {
    /**
     * The components used for each slot.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
    components?: {
        LeftArrowButton?: React.ElementType;
        LeftArrowIcon?: React.ElementType;
        RightArrowButton?: React.ElementType;
        RightArrowIcon?: React.ElementType;
    };
    /**
     * The props used for each slot inside.
     * @default {}
     */
    componentsProps?: {
        leftArrowButton?: any;
        rightArrowButton?: any;
    };
    /**
     * Left arrow icon aria-label text.
     */
    leftArrowButtonText?: string;
    /**
     * Right arrow icon aria-label text.
     */
    rightArrowButtonText?: string;
}
interface ArrowSwitcherProps extends ExportedArrowSwitcherProps, React.HTMLProps<HTMLDivElement> {
    children?: React.ReactNode;
    isLeftDisabled: boolean;
    isLeftHidden?: boolean;
    isRightDisabled: boolean;
    isRightHidden?: boolean;
    onLeftClick: () => void;
    onRightClick: () => void;
}
declare const PickersArrowSwitcher: React.ForwardRefExoticComponent<Pick<Omit<ArrowSwitcherProps, "as">, "cite" | "data" | "form" | "label" | "slot" | "span" | "style" | "summary" | "title" | "pattern" | "hidden" | "selected" | "color" | "width" | "height" | "content" | "translate" | "className" | "key" | "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "accessKey" | "contentEditable" | "contextMenu" | "dir" | "draggable" | "id" | "lang" | "placeholder" | "spellCheck" | "tabIndex" | "radioGroup" | "role" | "about" | "datatype" | "inlist" | "prefix" | "property" | "resource" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "inputMode" | "is" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "children" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "list" | "disabled" | "step" | "start" | "default" | "wrap" | "size" | "open" | "multiple" | "value" | "components" | "componentsProps" | "leftArrowButtonText" | "rightArrowButtonText" | "action" | "autoFocus" | "formAction" | "formEncType" | "formMethod" | "formNoValidate" | "formTarget" | "name" | "type" | "download" | "href" | "hrefLang" | "media" | "rel" | "target" | "max" | "method" | "min" | "crossOrigin" | "classID" | "useMap" | "wmode" | "alt" | "coords" | "shape" | "autoPlay" | "controls" | "loop" | "mediaGroup" | "muted" | "playsInline" | "preload" | "src" | "dateTime" | "acceptCharset" | "autoComplete" | "encType" | "noValidate" | "manifest" | "allowFullScreen" | "allowTransparency" | "frameBorder" | "marginHeight" | "marginWidth" | "sandbox" | "scrolling" | "seamless" | "srcDoc" | "sizes" | "srcSet" | "accept" | "capture" | "checked" | "maxLength" | "minLength" | "readOnly" | "required" | "challenge" | "keyType" | "keyParams" | "htmlFor" | "integrity" | "charSet" | "httpEquiv" | "high" | "low" | "optimum" | "reversed" | "async" | "defer" | "nonce" | "scoped" | "cellPadding" | "cellSpacing" | "colSpan" | "headers" | "rowSpan" | "scope" | "cols" | "rows" | "kind" | "srcLang" | "poster" | "isLeftDisabled" | "isLeftHidden" | "isRightDisabled" | "isRightHidden" | "onLeftClick" | "onRightClick"> & React.RefAttributes<HTMLDivElement>>;
export default PickersArrowSwitcher;
