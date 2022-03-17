import React from "react"
import * as BooksAPI from './BooksAPI'
import "./app.css"
import { Routes, Route } from "react-router-dom";
import BookShelf from "./components/BookShelf";
import FindBooks from "./components/FindBooks";

class BooksApp extends React.Component {
    state = { books: [] };

    shelves = [
        { id: "wantToRead", name: "Want to Read" },
        { id: "currentlyReading", name: "Now Reading" },
        { id: "read", name: "Already Read" }
    ]

    componentDidMount() {
        BooksAPI.getAll().then(books => this.setState({ books }));
    }

    moveBook = (movedBook, shelf) => {
        BooksAPI.update(movedBook, shelf).then(resp => {
            movedBook.shelf = shelf;
            this.setState(prevState => ({
                books: prevState.books
                    .filter(book => book.id !== movedBook.id)
                    .concat(movedBook)
            }));
        });
    };

  render() {
    const books = this.state.books;
    return (
      <div className="app">
        <Routes>
          <Route exact path="/" element={<BookShelf books={books} shelves={this.shelves} moveBook={this.moveBook} />} />
          <Route path="/add" element={<FindBooks books={books} shelves={this.shelves} moveBook={this.moveBook} />} />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
