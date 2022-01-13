import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  Stack,
  Typography
} from '@material-ui/core';
import { Star as StarIcon } from '../../icons/star';

const reviews = [
  {
    totalReviews: 10,
    score: 5
  },
  {
    totalReviews: 14,
    score: 4
  },
  {
    totalReviews: 5,
    score: 3
  },
  {
    totalReviews: 2,
    score: 2
  },
  {
    totalReviews: 1,
    score: 1
  }
];

const getPercentage = (partialValue, totalValue) => (100 * partialValue) / totalValue;

export const ProductReviews = (props) => {
  const totalScore = reviews
    .reduce((acc, value) => acc + (value.score * value.totalReviews), 0);

  const totalReviews = reviews
    .reduce((acc, value) => acc + value.totalReviews, 0);

  const averageScore = (totalScore / totalReviews).toFixed(2);

  return (
    <Card
      variant="outlined"
      {...props}
    >
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <StarIcon
            fontSize="large"
            sx={{
              color: 'rgba(255, 180, 0, 1)',
              mr: 1
            }}
          />
          <Typography
            color="textPrimary"
            variant="h3"
          >
            {averageScore}
          </Typography>
        </Box>
        <Typography
          color="textSecondary"
          sx={{
            mb: 2,
            mt: 1
          }}
          variant="subtitle2"
        >
          14 reviews in total based on 122 reviews
        </Typography>
        <Card variant="outlined">
          <List disablePadding>
            {reviews.map((review, index) => {
              const percentage = getPercentage(review.totalReviews, totalReviews).toFixed(2);

              return (
                <ListItem
                  divider={reviews.length > index + 1}
                  key={review.score}
                  sx={{ p: 1 }}
                >
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    x
                    {review.score}
                  </Typography>
                  <Stack
                    sx={{
                      color: 'text.secondary',
                      flex: 1
                    }}
                  >
                    <LinearProgress
                      color="inherit"
                      sx={{
                        borderRadius: 2,
                        mx: 1
                      }}
                      value={Number.parseFloat(percentage)}
                      variant="determinate"
                    />
                  </Stack>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    {percentage}
                    %
                  </Typography>
                </ListItem>
              );
            })}
          </List>
        </Card>
      </CardContent>
    </Card>
  );
};
