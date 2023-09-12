import GoogleBooksAPIResults from '../google-books/GoogleBooksResults';

const url = 'https://www.googleapis.com/books/v1/volumes';
enum keyApi {
  key = 'AIzaSyAPbMAaKu3KVfhOSD-imMJzy34TAOow-O0',
}

export const getBooks = async (search: string, sortBy: string, page: number): Promise<GoogleBooksAPIResults> => {
  const response = await fetch(
    `${url}?q=${search}&orderBy=${sortBy}&startIndex=${page}&projection=full&key=${keyApi.key}&maxResults=30`
  );
  const data = await response.json();
  return data;
};
