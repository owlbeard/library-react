import { useEffect, useState } from 'react';
import Books from './components/Books';
import Footer from './components/Footer';
import Header from './components/Header';

const LOCAL_STORAGE_KEY = 'library';

type Book = {
  id: string;
  title: string;
  author: string;
  pages: number;
  completion: boolean;
};

function App() {
  const [books, setBooks] = useState<Book[]>(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!) || [];
  });
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
  }, [books]);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Books books={books} set={setBooks} />
      <Footer />
    </div>
  );
}

export default App;
