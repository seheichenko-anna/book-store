import React, { createContext, useState, useEffect } from "react";
import booksData from "./books.json";

const BookContext = createContext();
const CART_STORAGE_KEY = "cart";

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(booksData.books);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    setCart(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  return (
    <BookContext.Provider
      value={{
        books,
        setBooks,
        cart,
        setCart,
        count,
        setCount,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
