import { Component } from "react";
import Masthead from "./molecules/Masthead";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

import Shelf from "./organisms/Shelf";

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        moveBook: PropTypes.func.isRequired
    };

    render () {
        const { books, moveBook, shelves } = this.props;
        return (
            <main className="list-books">
                <Masthead />
                <div className="list-books-content">
                { shelves.map( ( shelf ) => {
                    const booksOnShelf = books.filter( book => book.shelf === shelf.id )
                    return (
                        <Shelf key={shelf.id} shelf={shelf} shelves={shelves} books={booksOnShelf} moveBook={moveBook} />
                    )
                })}
                </div>
                <Link to='/add' className="open-search">
                    <span>Add Book</span>
                </Link>
            </main>
        )
    }
}

export default BookShelf;