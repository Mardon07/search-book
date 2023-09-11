import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import GoogleBook from '../../google-books/GoogleBook';
import GoogleBooksAPIResults from '../../google-books/GoogleBooksResults';
interface IPagination {
  offset: number;
  limit: number;
}
interface IBooks {
  googleBooks: GoogleBook[];
  googleBooksAPIResults: GoogleBooksAPIResults;
  search: string;
  category: string;
  sortByBook: string;
  pagination: IPagination;
}

const initialState: IBooks = {
  googleBooks: [] as GoogleBook[],
  googleBooksAPIResults: {} as GoogleBooksAPIResults,
  sortByBook: 'relevance',
  pagination: {
    offset: 0,
    limit: 30,
  },
  search: '',
  category: 'all',
};

const booksReducer = createSlice({
  name: 'books',
  initialState,
  reducers: {
    updateBooks: (state: IBooks, action: PayloadAction<GoogleBook[]>) => {
      state.googleBooks = action.payload;
    },
    updateApi: (state: IBooks, action: PayloadAction<GoogleBooksAPIResults>) => {
      state.googleBooksAPIResults = action.payload;
    },
    setPagination: (state: IBooks, action: PayloadAction<IPagination>) => {
      state.pagination = action.payload;
    },
    setSearchString: (state: IBooks, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFilterCategory: (state: IBooks, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setFilterSort: (state: IBooks, action: PayloadAction<string>) => {
      state.sortByBook = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.pagination.offset = action.payload;
    },
  },
});

export const {
  updateBooks,
  updateApi,
  setPagination,
  setSearchString,
  setFilterCategory,
  setFilterSort,
  setLimit,
  setOffset,
} = booksReducer.actions;

export default booksReducer.reducer;
