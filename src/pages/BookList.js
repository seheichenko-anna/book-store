import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "./BookContext";
import image from "../assets/images/book.jpg";

function BookList() {
  const { books } = useContext(BookContext);
  const [filter, setFilter] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("ALL");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const getPriceRangeBooks = () => {
    switch (selectedPriceRange) {
      case "ALL":
        return books;
      case "UNDER_15":
        return books.filter((book) => book.price > 0 && book.price < 15);
      case "BETWEEN_15_AND_30":
        return books.filter((book) => book.price >= 15 && book.price < 30);
      case "OVER_30":
        return books.filter((book) => book.price >= 30);
      default:
        return books;
    }
  };

  const filteredBooks = getPriceRangeBooks().filter((book) =>
    book.title.toLowerCase().includes(filter.toLowerCase())
  );

  const truncateTitle = (title) => {
    if (title.length <= 24) {
      return title;
    } else {
      return title.substring(0, 21) + "...";
    }
  };

  const renderBooks = () => {
    return filteredBooks.map((book) => (
      <li key={book.id} className="books-list-item">
        <img
          className="book-image"
          src={book.image || image}
          alt={book.title}
        />
        <h2 className="book-title">{truncateTitle(book.title)}</h2>
        <h3 className="book-author">{book.author}</h3>
        <div>
          <p className="book-price">{book.price}$</p>
          <Link to={`/book-list/${book.id}`}>
            <button className="book-btn">View</button>
          </Link>
        </div>
      </li>
    ));
  };

  return (
    <main>
      <div className="filter">
        <div className="search">
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search by book name"
          />
        </div>
        <select value={selectedPriceRange} onChange={handlePriceRangeChange}>
          <option value="ALL">All</option>
          <option value="UNDER_15">Under 15$</option>
          <option value="BETWEEN_15_AND_30">Between 15$ and 30$</option>
          <option value="OVER_30">Over 30$</option>
        </select>
      </div>
      <div className="book-list-container">
        <article>
          <ul className="books-list">{renderBooks()}</ul>
        </article>
      </div>
    </main>
  );
}

export default BookList;
