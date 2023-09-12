import { Card, CardActions, CardHeader } from '@mui/material';
import GoogleBook from '../../google-books/GoogleBook';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
interface BookProps {
  book: GoogleBook;
}

const Book: React.FC<BookProps> = ({ book }) => {
  return (
    <>
      <Link
        data-id={book.id}
        to={book.id || '/'}
        className="cardLink"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Card
          key={book.id}
          variant="outlined"
          sx={{ minHeight: ' 430px', border: '1px solid #ccc', transition: 'all 0.3s ease' }}
        >
          <CardMedia
            component="img"
            height="100%"
            width="100%"
            image={`${
              book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
            }?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${
              book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail
            }?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={book.volumeInfo.title}
            loading="lazy"
          />
          <CardHeader
            title={book.volumeInfo.title}
            subheader={book.volumeInfo.categories && book.volumeInfo.categories[0]}
          ></CardHeader>
          <CardActions>
            {book.volumeInfo.authors && book.volumeInfo.authors.map((item, index) => <span key={index}>{item}</span>)}
          </CardActions>
        </Card>
      </Link>
    </>
  );
};

export default Book;
