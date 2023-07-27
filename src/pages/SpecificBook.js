import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { BookContext } from "./BookContext";
import image from "../assets/images/book.jpg";

function SpecificBook() {
  const { id } = useParams();
  const { books, count, setCount } = useContext(BookContext);
  const CART_STORAGE_KEY = "cart";
  const book = books.find((book) => book.id === parseInt(id));

  const handleCountChange = (event) => {
    let newCount = parseInt(event.target.value);
    if (isNaN(newCount)) {
      newCount = 1;
    } else if (newCount > 42) {
      newCount = 42;
    }
    setCount(newCount);
  };
  const totalPrice = book.price * count;

  const handleAddToCart = () => {
    if (book) {
      const selectedBook = {
        ...book,
        selectedCount: count,
        totalPrice: totalPrice,
      };

      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      const cart = storedCart ? JSON.parse(storedCart) : {};

      if (cart[book.id]) {
        cart[book.id].selectedCount += count;
        cart[book.id].totalPrice += totalPrice;
      } else {
        cart[book.id] = selectedBook;
      }

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }
  return (
    <main className="specific-book-container">
      <>
        <div className="current-book-img">
          <img src={book.image || image} alt="Book" />
        </div>
        <div className="book-main-info">
          <div>
            <h2 className="book-info-name">{book.title}</h2>
            <ul className="book-info-list">
              <li>
                <p>
                  <span className="book-info-item">Book author:</span>{" "}
                  {book.author}
                </p>
              </li>
              <li>
                <p>
                  <span className="book-info-item">Book level: </span>
                  {book.level}
                </p>
              </li>
              <li>
                <p>
                  <span className="book-info-item">Book tags: </span>
                  {book.tags.join(", ")}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="pay-book-form">
          <form>
            <ul className="list-price">
              <li className="list-item list-item-price">
                <p>Price, $</p>
                <p className="price" id="price">
                  {book.price}
                </p>
              </li>
              <li className="list-item list-item-count">
                <label htmlFor="count">Count</label>
                <input
                  type="number"
                  id="count"
                  name="number_of_books"
                  value={count}
                  min="1"
                  max="42"
                  onChange={handleCountChange}
                />
              </li>
              <li className="list-item list-item-price">
                <p>Total price, $</p>
                <p className="price" id="total-price">
                  {totalPrice.toFixed(2)}
                </p>
              </li>
            </ul>
            <button className="btn btn-add" onClick={handleAddToCart}>
              Add to cart
            </button>
          </form>
        </div>
        <div className="book-desc">
          <p>
            <span className="book-info-item">Book description:</span>{" "}
            {book.description}
          </p>
        </div>
      </>
    </main>
  );
}

export default SpecificBook;
