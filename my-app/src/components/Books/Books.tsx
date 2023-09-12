import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  PaginationItem,
  Paper,
  Select,
  Stack,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { getBooks } from '../../api/requests';
import { useEffect, useState } from 'react';
import GoogleBook from '../../google-books/GoogleBook';
import Book from '../Book/Book';
import { useDispatch } from 'react-redux';
import {
  setFilterCategory,
  setFilterSort,
  setOffset,
  setSearchString,
  updateApi,
  updateBooks,
} from '../../store/reducers/books.slice';
import { useAppSelector } from '../../hooks/redux';
import GoogleBooksAPIResults from '../../google-books/GoogleBooksResults';
import { Link, useLocation } from 'react-router-dom';

const Books = () => {
  const googleBooks = useAppSelector((state) => state.books.googleBooks);
  const googleBooksApi = useAppSelector((state) => state.books.googleBooksAPIResults);
  const searchString = useAppSelector((state) => state.books.search);
  const categoryString = useAppSelector((state) => state.books.category);
  const sortByString = useAppSelector((state) => state.books.sortByBook);
  const [books, setBooks] = useState<GoogleBook[]>(googleBooks || []);
  const [search, setSearch] = useState(searchString);
  const [category, setCategory] = useState(categoryString);
  const [sortBy, setSortBy] = useState(sortByString);
  const categories = ['Art', 'Biography', 'Computers', 'History', 'Medical', 'Poetry'];
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1');

  const { limit } = useAppSelector((state) => state.books.pagination);

  const pages = Math.ceil(googleBooksApi.totalItems / limit);

  const dispatch = useDispatch();
  const handleChangeOffset = async (event: React.ChangeEvent<unknown>, num: number) => {
    const newOffset = (num - 1) * limit;
    dispatch(setOffset(newOffset));
  };
  const handleChange = (value: string) => {
    setSearch(value);
  };
  const handleChangeCategory = (value: string) => {
    setCategory(value);
  };
  const handleChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  const handleClick = async () => {
    const response = await getBooks(search, sortBy, page === 1 ? 0 : page * 29);

    if (search) {
      dispatch(updateBooks(response.items));
      dispatch(updateApi(response));
    } else {
      dispatch(updateBooks([]));
      dispatch(updateApi({} as GoogleBooksAPIResults));
    }

    setBooks(response.items);
  };
  const filter = () => {
    if (googleBooksApi.items) {
      const filterCaterories = googleBooksApi.items.filter(
        (item) => item.volumeInfo.categories && item.volumeInfo.categories[0] === category
      );
      if (category === 'all') {
        setBooks(googleBooks);
      } else {
        setBooks(filterCaterories);
      }
    }
  };
  useEffect(() => {
    dispatch(setSearchString(search));
    dispatch(setFilterCategory(category));
    dispatch(setFilterSort(sortBy));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search, sortBy]);

  useEffect(() => {
    filter();
    if (!search) {
      dispatch(updateBooks([]));
      dispatch(updateApi({} as GoogleBooksAPIResults));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  useEffect(() => {
    handleClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sortBy]);
  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '30px',
            flexDirection: 'column',
            marginBottom: '40px',
          }}
        >
          <Typography sx={{ margin: '0 auto', fontWeight: '700', marginBottom: '30px' }} variant="h3">
            Search for books
          </Typography>
          <FormControl sx={{ width: '600px', m: 1, marginBottom: '30px' }} variant="outlined">
            <OutlinedInput
              id="outlined-basic"
              placeholder="Search"
              value={search}
              onChange={(e) => handleChange(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClick} aria-label="toggle visibility" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box sx={{ width: '100%', display: 'flex', gap: 30 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Categories"
                renderValue={(value) => `${value}`}
                onChange={(e) => handleChangeCategory(e.target.value)}
              >
                <MenuItem value="all">
                  <em>all</em>
                </MenuItem>
                {categories.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sorting By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                label="Sorting By"
                renderValue={(value) => `${value}`}
                onChange={(e) => handleChangeSortBy(e.target.value)}
              >
                <MenuItem value="relevance">
                  <em>relevance</em>
                </MenuItem>
                <MenuItem value="newest">newest</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {googleBooksApi.totalItems && (
            <Typography sx={{ margin: '0 auto', width: '100%', textAlign: 'center' }} paragraph>
              {`Fount ${googleBooksApi.totalItems} result`}
            </Typography>
          )}
          <Pagination
            size="large"
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
            onChange={handleChangeOffset}
            onClick={handleClick}
            page={page}
            count={pages}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/search-book/${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
              />
            )}
          />
        </Box>
        <Paper sx={{ minHeight: '100vh' }}>
          <Grid container spacing={3}>
            {books &&
              books.map((book, index) => (
                <Grid key={index} item xs={12} sm={6} md={3}>
                  <Stack alignItems="stretch" justifyContent="space-between" height="100%">
                    <Book book={book && book} />
                  </Stack>
                </Grid>
              ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default Books;
