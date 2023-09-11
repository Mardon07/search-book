import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import BookItem from './components/BookItem/BookItem';
import Books from './components/Books/Books';
import NotFound from './components/NotFound/NotFound';
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Books />} />
      <Route path=":id" element={<BookItem />} errorElement={<NotFound />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
