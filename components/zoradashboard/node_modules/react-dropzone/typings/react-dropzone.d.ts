import * as React from "react";

export { FileWithPath } from "file-selector";
export default function Dropzone(props: DropzoneProps & React.RefAttributes<DropzoneRef>): JSX.Element;
export function useDropzone(options?: DropzoneOptions): DropzoneState;

export interface DropzoneProps extends DropzoneOptions {
  children?(state: DropzoneState): JSX.Element;
}

export interface FileError {
  message: string;
  code: "file-too-large" | "file-too-small" | "too-many-files" | "file-invalid-type" | string;
}

export interface FileRejection {
  file: File;
  errors: FileError[];
}

export type DropzoneOptions = Pick<React.HTMLProps<HTMLElement>, PropTypes> & {
  accept?: string | string[];
  minSize?: number;
  maxSize?: number;
  maxFiles?: number;
  preventDropOnDocument?: boolean;
  noClick?: boolean;
  noKeyboard?: boolean;
  noDrag?: boolean;
  noDragEventsBubbling?: boolean;
  disabled?: boolean;
  onDrop?: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void;
  onDropAccepted?: <T extends File>(files: T[], event: DropEvent) => void;
  onDropRejected?: (fileRejections: FileRejection[], event: DropEvent) => void;
  getFilesFromEvent?: (event: DropEvent) => Promise<Array<File | DataTransferItem>>;
  onFileDialogCancel?: () => void;
  validator?: <T extends File>(file: T) => FileError | FileError[] | null;
};

export type DropEvent = React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement> | DragEvent | Event;

export type DropzoneState = DropzoneRef & {
  isFocused: boolean;
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
  isFileDialogActive: boolean;
  draggedFiles: File[];
  acceptedFiles: File[];
  fileRejections: FileRejection[];
  rootRef: React.RefObject<HTMLElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
};

export interface DropzoneRef {
  open: () => void;
}

export interface DropzoneRootProps extends React.HTMLAttributes<HTMLElement> {
  refKey?: string;
  [key: string]: any;
}

export interface DropzoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  refKey?: string;
}

type PropTypes = "multiple"
  | "onDragEnter"
  | "onDragOver"
  | "onDragLeave";
