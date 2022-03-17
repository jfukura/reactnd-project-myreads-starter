import { Component } from "react";
import Book from "../molecules/Book";

class Shelf extends Component {
    render() {
        const { books, shelf, moveBook, shelves } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <ul className="books-grid">
                    {books.map(( book ) => (
                        <Book key={book.id} book={book} shelves={shelves} currentShelf={shelf.id} moveBook={moveBook} />
                    ))}
                </ul>
            </div>
        )
    }
}

export default Shelf;