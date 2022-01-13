/* eslint prefer-template: 0 */
import React, {
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef
} from 'react'
import PropTypes from 'prop-types'
import { fromEvent } from 'file-selector'
import {
  allFilesAccepted,
  composeEventHandlers,
  fileAccepted,
  fileMatchSize,
  isEvtWithFiles,
  isIeOrEdge,
  isPropagationStopped,
  onDocumentDragOver,
  TOO_MANY_FILES_REJECTION
} from './utils/index'

/**
 * Convenience wrapper component for the `useDropzone` hook
 *
 * ```jsx
 * <Dropzone>
 *   {({getRootProps, getInputProps}) => (
 *     <div {...getRootProps()}>
 *       <input {...getInputProps()} />
 *       <p>Drag 'n' drop some files here, or click to select files</p>
 *     </div>
 *   )}
 * </Dropzone>
 * ```
 */
const Dropzone = forwardRef(({ children, ...params }, ref) => {
  const { open, ...props } = useDropzone(params)

  useImperativeHandle(ref, () => ({ open }), [open])

  // TODO: Figure out why react-styleguidist cannot create docs if we don't return a jsx element
  return <Fragment>{children({ ...props, open })}</Fragment>
})

Dropzone.displayName = 'Dropzone'

// Add default props for react-docgen
const defaultProps = {
  disabled: false,
  getFilesFromEvent: fromEvent,
  maxSize: Infinity,
  minSize: 0,
  multiple: true,
  maxFiles: 0,
  preventDropOnDocument: true,
  noClick: false,
  noKeyboard: false,
  noDrag: false,
  noDragEventsBubbling: false,
  validator: null
}

Dropzone.defaultProps = defaultProps

Dropzone.propTypes = {
  /**
   * Render function that exposes the dropzone state and prop getter fns
   *
   * @param {object} params
   * @param {Function} params.getRootProps Returns the props you should apply to the root drop container you render
   * @param {Function} params.getInputProps Returns the props you should apply to hidden file input you render
   * @param {Function} params.open Open the native file selection dialog
   * @param {boolean} params.isFocused Dropzone area is in focus
   * @param {boolean} params.isFileDialogActive File dialog is opened
   * @param {boolean} params.isDragActive Active drag is in progress
   * @param {boolean} params.isDragAccept Dragged files are accepted
   * @param {boolean} params.isDragReject Some dragged files are rejected
   * @param {File[]} params.draggedFiles Files in active drag
   * @param {File[]} params.acceptedFiles Accepted files
   * @param {FileRejection[]} params.fileRejections Rejected files and why they were rejected
   */
  children: PropTypes.func,

  /**
   * Set accepted file types.
   * See https://github.com/okonet/attr-accept for more information.
   * Keep in mind that mime type determination is not reliable across platforms. CSV files,
   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
   * Windows. In some cases there might not be a mime type set at all.
   * See: https://github.com/react-dropzone/react-dropzone/issues/276
   */
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

  /**
   * Allow drag 'n' drop (or selection from the file dialog) of multiple files
   */
  multiple: PropTypes.bool,

  /**
   * If false, allow dropped items to take over the current browser window
   */
  preventDropOnDocument: PropTypes.bool,

  /**
   * If true, disables click to open the native file selection dialog
   */
  noClick: PropTypes.bool,

  /**
   * If true, disables SPACE/ENTER to open the native file selection dialog.
   * Note that it also stops tracking the focus state.
   */
  noKeyboard: PropTypes.bool,

  /**
   * If true, disables drag 'n' drop
   */
  noDrag: PropTypes.bool,

  /**
   * If true, stops drag event propagation to parents
   */
  noDragEventsBubbling: PropTypes.bool,

  /**
   * Minimum file size (in bytes)
   */
  minSize: PropTypes.number,

  /**
   * Maximum file size (in bytes)
   */
  maxSize: PropTypes.number,
  /**
   * Maximum accepted number of files
   * The default value is 0 which means there is no limitation to how many files are accepted.
   */
  maxFiles: PropTypes.number,

  /**
   * Enable/disable the dropzone
   */
  disabled: PropTypes.bool,

  /**
   * Use this to provide a custom file aggregator
   *
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  getFilesFromEvent: PropTypes.func,

  /**
   * Cb for when closing the file dialog with no selection
   */
  onFileDialogCancel: PropTypes.func,

  /**
   * Cb for when the `dragenter` event occurs.
   *
   * @param {DragEvent} event
   */
  onDragEnter: PropTypes.func,

  /**
   * Cb for when the `dragleave` event occurs
   *
   * @param {DragEvent} event
   */
  onDragLeave: PropTypes.func,

  /**
   * Cb for when the `dragover` event occurs
   *
   * @param {DragEvent} event
   */
  onDragOver: PropTypes.func,

  /**
   * Cb for when the `drop` event occurs.
   * Note that this callback is invoked after the `getFilesFromEvent` callback is done.
   *
   * Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
   * `accept` must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
   * If `multiple` is set to false and additional files are dropped,
   * all files besides the first will be rejected.
   * Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
   *
   * Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
   * If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
   *
   * `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
   * For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
   *
   * ```js
   * function onDrop(acceptedFiles) {
   *   const req = request.post('/upload')
   *   acceptedFiles.forEach(file => {
   *     req.attach(file.name, file)
   *   })
   *   req.end(callback)
   * }
   * ```
   *
   * @param {File[]} acceptedFiles
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  onDrop: PropTypes.func,

  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are accepted, this callback is not invoked.
   *
   * @param {File[]} files
   * @param {(DragEvent|Event)} event
   */
  onDropAccepted: PropTypes.func,

  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are rejected, this callback is not invoked.
   *
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event
   */
  onDropRejected: PropTypes.func,

  /**
   * Custom validation function 
   * @param {File} file
   * @returns {FileError|FileError[]}
   */
  validator: PropTypes.func
}

export default Dropzone

/**
 * A function that is invoked for the `dragenter`,
 * `dragover` and `dragleave` events.
 * It is not invoked if the items are not files (such as link, text, etc.).
 *
 * @callback dragCb
 * @param {DragEvent} event
 */

/**
 * A function that is invoked for the `drop` or input change event.
 * It is not invoked if the items are not files (such as link, text, etc.).
 *
 * @callback dropCb
 * @param {File[]} acceptedFiles List of accepted files
 * @param {FileRejection[]} fileRejections List of rejected files and why they were rejected
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 */

/**
 * A function that is invoked for the `drop` or input change event.
 * It is not invoked if the items are files (such as link, text, etc.).
 *
 * @callback dropAcceptedCb
 * @param {File[]} files List of accepted files that meet the given criteria
 * (`accept`, `multiple`, `minSize`, `maxSize`)
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 */

/**
 * A function that is invoked for the `drop` or input change event.
 *
 * @callback dropRejectedCb
 * @param {File[]} files List of rejected files that do not meet the given criteria
 * (`accept`, `multiple`, `minSize`, `maxSize`)
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 */

/**
 * A function that is used aggregate files,
 * in a asynchronous fashion, from drag or input change events.
 *
 * @callback getFilesFromEvent
 * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
 * @returns {(File[]|Promise<File[]>)}
 */

/**
 * An object with the current dropzone state and some helper functions.
 *
 * @typedef {object} DropzoneState
 * @property {Function} getRootProps Returns the props you should apply to the root drop container you render
 * @property {Function} getInputProps Returns the props you should apply to hidden file input you render
 * @property {Function} open Open the native file selection dialog
 * @property {boolean} isFocused Dropzone area is in focus
 * @property {boolean} isFileDialogActive File dialog is opened
 * @property {boolean} isDragActive Active drag is in progress
 * @property {boolean} isDragAccept Dragged files are accepted
 * @property {boolean} isDragReject Some dragged files are rejected
 * @property {File[]} draggedFiles Files in active drag
 * @property {File[]} acceptedFiles Accepted files
 * @property {FileRejection[]} fileRejections Rejected files and why they were rejected
 */

const initialState = {
  isFocused: false,
  isFileDialogActive: false,
  isDragActive: false,
  isDragAccept: false,
  isDragReject: false,
  draggedFiles: [],
  acceptedFiles: [],
  fileRejections: []
}

/**
 * A React hook that creates a drag 'n' drop area.
 *
 * ```jsx
 * function MyDropzone(props) {
 *   const {getRootProps, getInputProps} = useDropzone({
 *     onDrop: acceptedFiles => {
 *       // do something with the File objects, e.g. upload to some server
 *     }
 *   });
 *   return (
 *     <div {...getRootProps()}>
 *       <input {...getInputProps()} />
 *       <p>Drag and drop some files here, or click to select files</p>
 *     </div>
 *   )
 * }
 * ```
 *
 * @function useDropzone
 *
 * @param {object} props
 * @param {string|string[]} [props.accept] Set accepted file types.
 * See https://github.com/okonet/attr-accept for more information.
 * Keep in mind that mime type determination is not reliable across platforms. CSV files,
 * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
 * Windows. In some cases there might not be a mime type set at all.
 * See: https://github.com/react-dropzone/react-dropzone/issues/276
 * @param {boolean} [props.multiple=true] Allow drag 'n' drop (or selection from the file dialog) of multiple files
 * @param {boolean} [props.preventDropOnDocument=true] If false, allow dropped items to take over the current browser window
 * @param {boolean} [props.noClick=false] If true, disables click to open the native file selection dialog
 * @param {boolean} [props.noKeyboard=false] If true, disables SPACE/ENTER to open the native file selection dialog.
 * Note that it also stops tracking the focus state.
 * @param {boolean} [props.noDrag=false] If true, disables drag 'n' drop
 * @param {boolean} [props.noDragEventsBubbling=false] If true, stops drag event propagation to parents
 * @param {number} [props.minSize=0] Minimum file size (in bytes)
 * @param {number} [props.maxSize=Infinity] Maximum file size (in bytes)
 * @param {boolean} [props.disabled=false] Enable/disable the dropzone
 * @param {getFilesFromEvent} [props.getFilesFromEvent] Use this to provide a custom file aggregator
 * @param {Function} [props.onFileDialogCancel] Cb for when closing the file dialog with no selection
 * @param {dragCb} [props.onDragEnter] Cb for when the `dragenter` event occurs.
 * @param {dragCb} [props.onDragLeave] Cb for when the `dragleave` event occurs
 * @param {dragCb} [props.onDragOver] Cb for when the `dragover` event occurs
 * @param {dropCb} [props.onDrop] Cb for when the `drop` event occurs.
 * Note that this callback is invoked after the `getFilesFromEvent` callback is done.
 *
 * Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
 * `accept` must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
 * If `multiple` is set to false and additional files are dropped,
 * all files besides the first will be rejected.
 * Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
 *
 * Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
 * If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
 *
 * `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
 * For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
 *
 * ```js
 * function onDrop(acceptedFiles) {
 *   const req = request.post('/upload')
 *   acceptedFiles.forEach(file => {
 *     req.attach(file.name, file)
 *   })
 *   req.end(callback)
 * }
 * ```
 * @param {dropAcceptedCb} [props.onDropAccepted]
 * @param {dropRejectedCb} [props.onDropRejected]
 *
 * @returns {DropzoneState}
 */
export function useDropzone(options = {}) {
  const {
    accept,
    disabled,
    getFilesFromEvent,
    maxSize,
    minSize,
    multiple,
    maxFiles,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onDropAccepted,
    onDropRejected,
    onFileDialogCancel,
    preventDropOnDocument,
    noClick,
    noKeyboard,
    noDrag,
    noDragEventsBubbling,
    validator
  } = {
    ...defaultProps,
    ...options
  }

  const rootRef = useRef(null)
  const inputRef = useRef(null)

  const [state, dispatch] = useReducer(reducer, initialState)
  const { isFocused, isFileDialogActive, draggedFiles } = state

  // Fn for opening the file dialog programmatically
  const openFileDialog = useCallback(() => {
    if (inputRef.current) {
      dispatch({ type: 'openDialog' })
      inputRef.current.value = null
      inputRef.current.click()
    }
  }, [dispatch])

  // Update file dialog active state when the window is focused on
  const onWindowFocus = () => {
    // Execute the timeout only if the file dialog is opened in the browser
    if (isFileDialogActive) {
      setTimeout(() => {
        if (inputRef.current) {
          const { files } = inputRef.current

          if (!files.length) {
            dispatch({ type: 'closeDialog' })

            if (typeof onFileDialogCancel === 'function') {
              onFileDialogCancel()
            }
          }
        }
      }, 300)
    }
  }
  useEffect(() => {
    window.addEventListener('focus', onWindowFocus, false)
    return () => {
      window.removeEventListener('focus', onWindowFocus, false)
    }
  }, [inputRef, isFileDialogActive, onFileDialogCancel])

  // Cb to open the file dialog when SPACE/ENTER occurs on the dropzone
  const onKeyDownCb = useCallback(
    event => {
      // Ignore keyboard events bubbling up the DOM tree
      if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) {
        return
      }

      if (event.keyCode === 32 || event.keyCode === 13) {
        event.preventDefault()
        openFileDialog()
      }
    },
    [rootRef, inputRef]
  )

  // Update focus state for the dropzone
  const onFocusCb = useCallback(() => {
    dispatch({ type: 'focus' })
  }, [])
  const onBlurCb = useCallback(() => {
    dispatch({ type: 'blur' })
  }, [])

  // Cb to open the file dialog when click occurs on the dropzone
  const onClickCb = useCallback(() => {
    if (noClick) {
      return
    }

    // In IE11/Edge the file-browser dialog is blocking, therefore, use setTimeout()
    // to ensure React can handle state changes
    // See: https://github.com/react-dropzone/react-dropzone/issues/450
    if (isIeOrEdge()) {
      setTimeout(openFileDialog, 0)
    } else {
      openFileDialog()
    }
  }, [inputRef, noClick])

  const dragTargetsRef = useRef([])
  const onDocumentDrop = event => {
    if (rootRef.current && rootRef.current.contains(event.target)) {
      // If we intercepted an event for our instance, let it propagate down to the instance's onDrop handler
      return
    }
    event.preventDefault()
    dragTargetsRef.current = []
  }

  useEffect(() => {
    if (preventDropOnDocument) {
      document.addEventListener('dragover', onDocumentDragOver, false)
      document.addEventListener('drop', onDocumentDrop, false)
    }

    return () => {
      if (preventDropOnDocument) {
        document.removeEventListener('dragover', onDocumentDragOver)
        document.removeEventListener('drop', onDocumentDrop)
      }
    }
  }, [rootRef, preventDropOnDocument])

  const onDragEnterCb = useCallback(
    event => {
      event.preventDefault()
      // Persist here because we need the event later after getFilesFromEvent() is done
      event.persist()
      stopPropagation(event)

      dragTargetsRef.current = [...dragTargetsRef.current, event.target]

      if (isEvtWithFiles(event)) {
        Promise.resolve(getFilesFromEvent(event)).then(draggedFiles => {
          if (isPropagationStopped(event) && !noDragEventsBubbling) {
            return
          }

          dispatch({
            draggedFiles,
            isDragActive: true,
            type: 'setDraggedFiles'
          })

          if (onDragEnter) {
            onDragEnter(event)
          }
        })
      }
    },
    [getFilesFromEvent, onDragEnter, noDragEventsBubbling]
  )

  const onDragOverCb = useCallback(
    event => {
      event.preventDefault()
      event.persist()
      stopPropagation(event)

      const hasFiles = isEvtWithFiles(event);
      if (hasFiles && event.dataTransfer) {
        try {
          event.dataTransfer.dropEffect = 'copy'
        } catch {} /* eslint-disable-line no-empty */
      }

      if (hasFiles && onDragOver) {
        onDragOver(event)
      }

      return false
    },
    [onDragOver, noDragEventsBubbling]
  )

  const onDragLeaveCb = useCallback(
    event => {
      event.preventDefault()
      event.persist()
      stopPropagation(event)

      // Only deactivate once the dropzone and all children have been left
      const targets = dragTargetsRef.current.filter(
        target => rootRef.current && rootRef.current.contains(target)
      )
      // Make sure to remove a target present multiple times only once
      // (Firefox may fire dragenter/dragleave multiple times on the same element)
      const targetIdx = targets.indexOf(event.target)
      if (targetIdx !== -1) {
        targets.splice(targetIdx, 1)
      }
      dragTargetsRef.current = targets
      if (targets.length > 0) {
        return
      }

      dispatch({
        isDragActive: false,
        type: 'setDraggedFiles',
        draggedFiles: []
      })

      if (isEvtWithFiles(event) && onDragLeave) {
        onDragLeave(event)
      }
    },
    [rootRef, onDragLeave, noDragEventsBubbling]
  )

  const onDropCb = useCallback(
    event => {
      event.preventDefault()
      // Persist here because we need the event later after getFilesFromEvent() is done
      event.persist()
      stopPropagation(event)

      dragTargetsRef.current = []

      if (isEvtWithFiles(event)) {
        Promise.resolve(getFilesFromEvent(event)).then(files => {
          if (isPropagationStopped(event) && !noDragEventsBubbling) {
            return
          }

          const acceptedFiles = []
          const fileRejections = []

          files.forEach(file => {
            const [accepted, acceptError] = fileAccepted(file, accept)
            const [sizeMatch, sizeError] = fileMatchSize(file, minSize, maxSize)
            const customErrors = validator ? validator(file) : null;

            if (accepted && sizeMatch && !customErrors) {
              acceptedFiles.push(file)
            } else {
              let errors = [acceptError, sizeError];
              
              if (customErrors) {
                errors = errors.concat(customErrors);
              }

              fileRejections.push({ file, errors: errors.filter(e => e) })
            }
          })

          if ((!multiple && acceptedFiles.length > 1) || (multiple && maxFiles >= 1 &&  acceptedFiles.length > maxFiles)) {
            // Reject everything and empty accepted files
            acceptedFiles.forEach(file => {
              fileRejections.push({ file, errors: [TOO_MANY_FILES_REJECTION] })
            })
            acceptedFiles.splice(0)
          }
        
          dispatch({
            acceptedFiles,
            fileRejections,
            type: 'setFiles'
          })

          if (onDrop) {
            onDrop(acceptedFiles, fileRejections, event)
          }

          if (fileRejections.length > 0 && onDropRejected) {
            onDropRejected(fileRejections, event)
          }

          if (acceptedFiles.length > 0 && onDropAccepted) {
            onDropAccepted(acceptedFiles, event)
          }
        })
      }
      dispatch({ type: 'reset' })
    },
    [
      multiple,
      accept,
      minSize,
      maxSize,
      maxFiles,
      getFilesFromEvent,
      onDrop,
      onDropAccepted,
      onDropRejected,
      noDragEventsBubbling,
      validator
    ]
  )

  const composeHandler = fn => {
    return disabled ? null : fn
  }

  const composeKeyboardHandler = fn => {
    return noKeyboard ? null : composeHandler(fn)
  }

  const composeDragHandler = fn => {
    return noDrag ? null : composeHandler(fn)
  }

  const stopPropagation = event => {
    if (noDragEventsBubbling) {
      event.stopPropagation()
    }
  }

  const getRootProps = useMemo(
    () => ({
      refKey = 'ref',
      onKeyDown,
      onFocus,
      onBlur,
      onClick,
      onDragEnter,
      onDragOver,
      onDragLeave,
      onDrop,
      ...rest
    } = {}) => ({
      onKeyDown: composeKeyboardHandler(composeEventHandlers(onKeyDown, onKeyDownCb)),
      onFocus: composeKeyboardHandler(composeEventHandlers(onFocus, onFocusCb)),
      onBlur: composeKeyboardHandler(composeEventHandlers(onBlur, onBlurCb)),
      onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
      onDragEnter: composeDragHandler(composeEventHandlers(onDragEnter, onDragEnterCb)),
      onDragOver: composeDragHandler(composeEventHandlers(onDragOver, onDragOverCb)),
      onDragLeave: composeDragHandler(composeEventHandlers(onDragLeave, onDragLeaveCb)),
      onDrop: composeDragHandler(composeEventHandlers(onDrop, onDropCb)),
      [refKey]: rootRef,
      ...(!disabled && !noKeyboard ? { tabIndex: 0 } : {}),
      ...rest
    }),
    [
      rootRef,
      onKeyDownCb,
      onFocusCb,
      onBlurCb,
      onClickCb,
      onDragEnterCb,
      onDragOverCb,
      onDragLeaveCb,
      onDropCb,
      noKeyboard,
      noDrag,
      disabled
    ]
  )

  const onInputElementClick = useCallback(event => {
    event.stopPropagation()
  }, [])

  const getInputProps = useMemo(
    () => ({ refKey = 'ref', onChange, onClick, ...rest } = {}) => {
      const inputProps = {
        accept,
        multiple,
        type: 'file',
        style: { display: 'none' },
        onChange: composeHandler(composeEventHandlers(onChange, onDropCb)),
        onClick: composeHandler(composeEventHandlers(onClick, onInputElementClick)),
        autoComplete: 'off',
        tabIndex: -1,
        [refKey]: inputRef
      }

      return {
        ...inputProps,
        ...rest
      }
    },
    [inputRef, accept, multiple, onDropCb, disabled]
  )

  const fileCount = draggedFiles.length
  const isDragAccept = fileCount > 0 && allFilesAccepted({ files: draggedFiles, accept, minSize, maxSize, multiple, maxFiles })
  const isDragReject = fileCount > 0 && !isDragAccept

  return {
    ...state,
    isDragAccept,
    isDragReject,
    isFocused: isFocused && !disabled,
    getRootProps,
    getInputProps,
    rootRef,
    inputRef,
    open: composeHandler(openFileDialog)
  }
}

function reducer(state, action) {
  /* istanbul ignore next */
  switch (action.type) {
    case 'focus':
      return {
        ...state,
        isFocused: true
      }
    case 'blur':
      return {
        ...state,
        isFocused: false
      }
    case 'openDialog':
      return {
        ...state,
        isFileDialogActive: true
      }
    case 'closeDialog':
      return {
        ...state,
        isFileDialogActive: false
      }
    case 'setDraggedFiles':
      /* eslint no-case-declarations: 0 */
      const { isDragActive, draggedFiles } = action
      return {
        ...state,
        draggedFiles,
        isDragActive
      }
    case 'setFiles':
      return {
        ...state,
        acceptedFiles: action.acceptedFiles,
        fileRejections: action.fileRejections
      }
    case 'reset':
      return {
        ...initialState
      }
    default:
      return state
  }
}
