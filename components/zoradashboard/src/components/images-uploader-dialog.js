import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core';
import { Trash as TrashIcon } from '../icons/trash';
import { ImageDropzone } from './image-dropzone';

export const ImagesUploaderDialog = (props) => {
  const { onCancel, onSaveImages, open, selectedImages: selectedImagesProp, ...other } = props;
  const [images, setImages] = useState([
    '/static/product-07.png',
    '/static/product-08.png',
    '/static/product-09.png',
    '/static/product-10.png'
  ]);
  const [selectedImages, setSelectedImages] = useState(selectedImagesProp);

  const handleDeleteImage = (image) => {
    setImages((prevImages) => prevImages
      .filter((_image) => _image !== image));
  };

  const handleSelectImage = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages((prevSelectedImages) => prevSelectedImages
        .filter((selectedImage) => selectedImage !== image));
      return;
    }
    setSelectedImages((prevSelectedImages) => [...prevSelectedImages, image]);
  };

  const handleDrop = (newFiles) => {
    setImages((prevImages) => [...prevImages, URL.createObjectURL(newFiles[0])]);
  };

  useEffect(() => {
    setSelectedImages(selectedImagesProp);
  }, [selectedImagesProp]);

  return (
    <Dialog
      onClose={onCancel}
      open={open}
      PaperProps={{
        sx: {
          width: '100%'
        }
      }}
      {...other}
    >
      <DialogTitle>
        Select image
      </DialogTitle>
      <DialogContent>
        <Typography
          color="textSecondary"
          sx={{ mb: 3 }}
          variant="body2"
        >
          You can only choose images as variant media
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: !selectedImages.length ? '1fr' : ({
              md: 'repeat(4, 1fr)',
              sm: 'repeat(3, 1fr)',
              xs: 'repeat(2, 1fr)'
            }),
            '& img': {
              borderRadius: 1,
              maxWidth: '100%'
            }
          }}
        >
          <ImageDropzone
            onDrop={handleDrop}
            sx={{ height: '100%' }}
            accept="image/jpeg, image/png"
          />
          {images.map((image) => {
            const isSelected = selectedImages.includes(image);

            return (
              <Box
                key={image}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box
                  sx={{
                    borderRadius: 1,
                    boxShadow: (theme) => isSelected
                      && `0px 0px 0px 2px ${theme.palette.primary.main}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    '&::before': {
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: 1,
                      bottom: 0,
                      content: '""',
                      display: isSelected ? 'block' : 'none',
                      left: 0,
                      position: 'absolute',
                      right: 0,
                      top: 0
                    },
                    '&:hover': {
                      boxShadow: (theme) => (!isSelected
                        ? `0px 0px 0px 1px ${theme.palette.primary.main}`
                        : `0px 0px 0px 2px ${theme.palette.primary.main}`),
                      '&::before': {
                        display: 'block'
                      },
                      '& span, button': {
                        display: 'inline-flex'
                      }
                    }
                  }}
                >
                  <img
                    alt=""
                    src={image}
                    style={{ maxWidth: '100%' }}
                  />
                  <Checkbox
                    checked={isSelected}
                    onClick={() => handleSelectImage(image)}
                    sx={{
                      display: 'none',
                      left: 8,
                      position: 'absolute',
                      top: 8
                    }}
                  />
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteImage(image)}
                    sx={{
                      bottom: 8,
                      color: 'text.secondary',
                      display: 'none',
                      position: 'absolute',
                      right: 8
                    }}
                  >
                    <TrashIcon />
                  </IconButton>
                </Box>
              </Box>
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={onCancel}
          variant="text"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => onSaveImages(selectedImages)}
          variant="contained"
        >
          Add selected
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ImagesUploaderDialog.defaultProps = {
  open: false
};

ImagesUploaderDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSaveImages: PropTypes.func.isRequired,
  open: PropTypes.bool,
  selectedImages: PropTypes.arrayOf(PropTypes.string).isRequired
};
