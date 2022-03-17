import { Component } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from '../BooksAPI'
import Book from "./molecules/Book";
import { Link } from "react-router-dom";

class FindBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        moveBook: PropTypes.func.isRequired
    };

    state = {
        query: '',
        newBooks: [],
        emptyResults: false
    };

    queryBooks = (event) => {
        const query = event.target.value;
        this.setState({ query });
        const { books } = this.props;

        if (query) {
            BooksAPI.search(query.trim(), 20).then(resp => {
                if ( resp.length > 0 ) {
                    resp.some((r) => {
                        books.forEach( ( b ) => {
                            if (b.id === r.id) {
                                r['shelf'] = b.shelf
                            }
                        })
                    })

                    this.setState({ newBooks: resp, emptyResults: false })
                } else {
                    this.setState({ newBooks: [], emptyResults: true });
                }
            });
        } else this.setState({ newBooks: [], emptyResults: false });
    };

    render() {
        const { query, newBooks, emptyResults } = this.state;
        const { moveBook, shelves } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={this.queryBooks}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {newBooks.length > 0 && (
                        <div>
                            <h3 className="search-text">Search returned {newBooks.length} books </h3>
                            <ol className="books-grid">
                                {newBooks.map(book => (
                                    <Book
                                        book={book}
                                        key={book.id}
                                        shelves={shelves}
                                        moveBook={moveBook}
                                        currentShelf={book.shelf}
                                    />
                                ))}
                            </ol>
                        </div>
                    )}
                    {emptyResults && (
                        <h3 className="search-text-empty">Sorry, we couldn't find anything to match your search. Please try again.</h3>
                    )}
                </div>
            </div>
        );
    }
}

export default FindBooks;