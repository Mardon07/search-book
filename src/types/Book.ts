export default interface Book {
  id: string;
  authors: string[];
  title: string;
  subtitle: string;
  publisher: string;
  publishedDate: string;
  image: string | undefined;
  link: string;
  rating: number;
}
