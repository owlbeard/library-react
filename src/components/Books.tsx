import { useRef, useState } from 'react';
import uniqid from 'uniqid';
import Delete from '../assets/trash-can-outline.svg';
import { motion as m, AnimatePresence } from 'framer-motion';

type Book = {
  id: string;
  title: string;
  author: string;
  pages: number;
  completion: boolean;
};

type BooksProps = {
  books: Book[];
  set: React.Dispatch<React.SetStateAction<Book[]>>;
};

export default function Books({ books, set }: BooksProps) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLInputElement>(null);
  const importanceRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex-grow flex flex-col justify-center items-center relative">
      <button
        onClick={() => setOpen(true)}
        className="rounded-full p-2 bg-green-500 font-bold text-lg"
      >
        Add Book
      </button>
      <AnimatePresence>
        {open && (
          <div className="flex justify-center items-center bg-black font-semibold bg-opacity-40 fixed left-0 right-0 top-0 bottom-0 z-10">
            <m.form
              animate={{ scale: '100%' }}
              initial={{ scale: '0%' }}
              exit={{ scale: '0%' }}
              ref={formRef}
              className="w-72 rounded-xl p-4 bg-slate-400 flex flex-col gap-4 justify-center items-center"
              onSubmit={(e) => {
                e.preventDefault();
                const book: Book = {
                  id: uniqid(),
                  title: titleRef.current!.value,
                  author: authorRef.current!.value,
                  pages: Number(pageRef.current!.value),
                  completion: importanceRef.current!.checked,
                };
                set([...books, book]);
                setOpen(false);
              }}
            >
              <div className="w-full flex flex-col justify-center items-start">
                <label className="font-bold" htmlFor="title">
                  Title:
                </label>
                <input
                  className="text-black w-full font-semibold rounded-full p-2 focus:bg-slate-700 focus:outline-none focus:text-white"
                  ref={titleRef}
                  type="text"
                  name="title"
                  required
                />
              </div>
              <div className="w-full flex flex-col justify-center items-start">
                <label className="font-bold" htmlFor="author">
                  Author:
                </label>
                <input
                  className="text-black w-full font-semibold rounded-full p-2 focus:bg-slate-700 focus:outline-none focus:text-white"
                  ref={authorRef}
                  type="text"
                  name="author"
                  required
                />
              </div>
              <div className="w-full flex flex-col justify-center items-start">
                <label className="font-bold" htmlFor="pages">
                  Pages:
                </label>
                <input
                  className="text-black font-semibold rounded-full p-2 focus:bg-slate-700 focus:outline-none focus:text-white"
                  ref={pageRef}
                  type="number"
                  name="pages"
                  required
                />
              </div>
              <div className="flex gap-2 w-full justify-start">
                <label className="font-bold" htmlFor="complete">
                  Completed?
                </label>
                <input
                  className="scale-150"
                  ref={importanceRef}
                  type="checkbox"
                  name="complete"
                />
              </div>
              <div className="w-full flex justify-between items-center">
                <button
                  onClick={() => {
                    setOpen(!open);
                    formRef.current?.reset();
                  }}
                  className="rounded-full p-2 bg-red-500"
                  type="button"
                >
                  Cancel
                </button>
                <button type="submit" className="rounded-full p-2 bg-green-500">
                  Add Book
                </button>
              </div>
            </m.form>
          </div>
        )}
      </AnimatePresence>
      <div className="flex-grow w-full p-4 gap-4 flex flex-wrap justify-start items-start">
        <AnimatePresence>
          {books.map((book) => {
            return (
              <m.div
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring' }}
                key={book.id}
                className="flex flex-col justify-center items-center bg-slate-400 p-4 rounded-xl border-l-4 border-l-yellow-500 w-72"
              >
                <h1 className="w-full rounded-full font-bold bg-red-500 p-2 sm:text-lg text-2xl text-center">
                  {book.title}
                </h1>
                <h3 className="w-full rounded-full font-bold bg-green-500 p-2 sm:text-base text:xl text-center">
                  By {book.author}
                </h3>
                <h3 className="w-full rounded-full font-bold bg-blue-500 p-2 sm:text-base text:xl text-center">
                  {book.pages} Pages
                </h3>
                <div className="flex w-full justify-start gap-2">
                  <label className="font-bold" htmlFor="read">
                    Read?
                  </label>
                  <input
                    className="scale-150"
                    type="checkbox"
                    name="read"
                    defaultChecked={book.completion}
                    onChange={(e) => {
                      const target = e.currentTarget as HTMLInputElement;
                      const value = target.checked;
                      console.log(value);
                      const newBooks = books.map((item) => {
                        if (item.id === book.id) {
                          console.log(item);
                          return { ...item, completion: value };
                        }
                        return item;
                      });
                      console.log(newBooks);
                      set(newBooks);
                    }}
                  />
                </div>
                <button
                  className="self-end"
                  onClick={() => {
                    const newLibrary = books.filter(
                      (item) => book.id !== item.id
                    );
                    set(newLibrary);
                  }}
                >
                  <img className="white h-8" src={Delete} alt="Delete" />
                </button>
              </m.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
