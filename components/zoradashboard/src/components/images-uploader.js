import { useState } from 'react';
import { Avatar, Box, Button, Card, CardContent, IconButton, Typography } from '@material-ui/core';
import { useDialog } from '../hooks/use-dialog';
import { ImagesUploaderDialog } from './images-uploader-dialog';
import { Upload as UploadIcon } from '../icons/upload';
import { Trash as TrashIcon } from '../icons/trash';

export const ImagesUploader = () => {
  const [uploadDialogOpen, handleOpenUploadDialog, handleCloseUploadDialog] = useDialog();
  const [selectedImages, setSelectedImages] = useState([
    '/static/product-09.png',
    '/static/product-10.png'
  ]);

  const handleDeleteImage = (image) => {
    setSelectedImages((prevSelectedImages) => prevSelectedImages
      .filter((selectedImage) => selectedImage !== image));
  };

  const handleSaveImages = (newSelectedImage) => {
    setSelectedImages(newSelectedImage);
    handleCloseUploadDialog();
  };

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography
            color="textPrimary"
            sx={{ mb: 1.25 }}
            variant="subtitle2"
          >
            Image
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: !selectedImages.length ? '1fr' : ({
                md: 'repeat(auto-fill, 140px)',
                sm: 'repeat(4, 1fr)',
                xs: 'repeat(2, 1fr)'
              }),
              '& img': {
                borderRadius: 1,
                maxWidth: '100%'
              }
            }}
          >
            <Box
              onClick={handleOpenUploadDialog}
              sx={{
                alignItems: 'center',
                borderColor: 'neutral.200',
                borderRadius: 1,
                borderStyle: 'dashed',
                borderWidth: 1,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                height: '100%',
                minHeight: 140,
                justifyContent: 'center',
                outline: 'none',
                py: 2,
                '&:hover': {
                  backgroundColor: 'action.hover',
                  borderColor: 'primary.main'
                }
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: 'rgba(238, 240, 242, 1)',
                  color: 'text.secondary',
                  height: 36,
                  width: 36
                }}
              >
                <UploadIcon />
              </Avatar>
              <Button
                color="primary"
                variant="text"
              >
                Upload
              </Button>
              <Typography
                align="center"
                sx={{ color: 'text.secondary' }}
                variant="caption"
              >
                Select images
              </Typography>
            </Box>
            {selectedImages.map((image) => (
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
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    '&::before': {
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderRadius: 1,
                      bottom: 0,
                      content: '""',
                      display: 'none',
                      left: 0,
                      position: 'absolute',
                      right: 0,
                      top: 0
                    },
                    '&:hover': {
                      boxShadow: (theme) => `0px 0px 0px 1px ${theme.palette.primary.main}`,
                      '&::before': {
                        display: 'block'
                      },
                      '& button': {
                        display: 'inline-flex'
                      }
                    }
                  }}
                >
                  <img
                    alt=""
                    src={image}
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
            ))}
          </Box>
        </CardContent>
      </Card>
      <ImagesUploaderDialog
        onCancel={handleCloseUploadDialog}
        onSaveImages={handleSaveImages}
        open={uploadDialogOpen}
        selectedImages={selectedImages}
      />
    </>
  );
};
