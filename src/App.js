import { Routes, Route } from "react-router-dom";

import BookList from "./pages/BookList.js";
import NotFound from "./pages/NotFound.js";
import Signin from "./pages/Signin";
import SpecificBook from "./pages/SpecificBook";
import Layout from "./components/Layout";
import AuthRequired from "./components/AuthRequired";
import Cart from "./pages/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Signin />} />
        <Route element={<AuthRequired />}>
          <Route path="book-list" element={<BookList />} />
          <Route path="book-list/:id" element={<SpecificBook />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
