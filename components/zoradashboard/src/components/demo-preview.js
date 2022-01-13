import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const DemoPreviewRoot = styled('div')((() => ({
  overflow: 'auto'
})));

export const DemoPreview = (props) => {
  const { title, description, children, ...other } = props;

  return (
    <DemoPreviewRoot {...other}>
      <div>
        {typeof title === 'string' ? (
          <Typography
            color="textPrimary"
            variant="body1"
          >
            {title}
          </Typography>
        ) : title}
        {description && (
          <Box sx={{ mt: 0.5 }}>
            {typeof description === 'string' ? (
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {description}
              </Typography>
            ) : description}
          </Box>
        )}
      </div>
      <Card
        sx={{ mt: 2 }}
        variant="outlined"
      >
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </DemoPreviewRoot>
  );
};

DemoPreview.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};
