If you'd like to integrate the dropzone with the [doka](https://pqina.nl/doka/?ref=react-dropzone) image editor, you just need to pass either of the selected images to the `create()` method exported by doka:

```jsx harmony
import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';

import {create} from 'doka';

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
  padding: 20
};

const thumb = {
  position: "relative",
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const thumbButton = {
  position: "absolute",
  right: 10,
  bottom: 10,
  background: "rgba(0,0,0,.8)",
  color: "#fff",
  border: 0,
  borderRadius: ".325em",
  cursor: "pointer"
};

const editImage = (image, done) => {
  const imageFile = image.doka ? image.doka.file : image;
  const imageState = image.doka ? image.doka.data : {};
  create({
    // recreate previous state
    ...imageState,

    // load original image file
    src: imageFile,
    outputData: true,

    onconfirm: ({ file, data }) => {
      Object.assign(file, {
        doka: { file: imageFile, data }
      });
      done(file);
    }
  });
};

function Doka(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map((file, index) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
      <button
        style={thumbButton}
        onClick={() =>
          editImage(file, (output) => {
            const updatedFiles = [...files];

            // replace original image with new image
            updatedFiles[index] = output;

            // revoke preview URL for old image
            if (file.preview) URL.revokeObjectURL(file.preview);

            // set new preview URL
            Object.assign(output, {
              preview: URL.createObjectURL(output)
            });

            // update view
            setFiles(updatedFiles);
          })
        }
      >
        edit
      </button>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

<Doka />
```
