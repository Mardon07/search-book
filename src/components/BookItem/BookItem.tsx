import { Breadcrumbs, Divider, Grid, ImageListItem, Paper, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import GoogleBook from './../../google-books/GoogleBook';

const BookItem = () => {
  const { id } = useParams();
  const book = useAppSelector((state) => state.books.googleBooks);
  const bookItem: GoogleBook[] = book.filter((item) => item.id === id) as GoogleBook[];
  return (
    <div>
      <Grid container padding={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <Typography color="text.primary">{bookItem[0] && bookItem[0].volumeInfo.title}</Typography>
        </Breadcrumbs>
      </Grid>
      <Paper>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} padding={2}>
            <ImageListItem>
              <img
                src={`${
                  bookItem[0] && bookItem[0].volumeInfo.imageLinks.smallThumbnail
                }?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${
                  bookItem[0] && bookItem[0].volumeInfo.imageLinks.smallThumbnail
                }?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={bookItem[0] && bookItem[0].volumeInfo.title}
                loading="lazy"
              />
            </ImageListItem>
          </Grid>
          <Grid item xs={12} sm={12} md={6} padding={2}>
            <Typography variant="h4" gutterBottom>
              {bookItem[0] && bookItem[0].volumeInfo.title}
            </Typography>

            {bookItem[0] && (
              <Typography variant="body1" gutterBottom>
                {bookItem[0].volumeInfo.description}
              </Typography>
            )}

            <Divider />
            <Typography variant="h5" gutterBottom>
              {bookItem[0] && bookItem[0].volumeInfo.authors.map((item) => item)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default BookItem;
