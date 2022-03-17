import { Component } from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        moveBook: PropTypes.func.isRequired
    };

    changeShelf = ( e ) => {
        this.props.moveBook( this.props.book, e.target.value)
    }
    render() {
        const { book, shelves, currentShelf } = this.props
        console.log(book)
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})`}} />
                        <div className={classNames("book-shelf-changer", `mod-${currentShelf}`)}>
                            <select name="" id="" onChange={this.changeShelf} value={currentShelf && currentShelf}>
                                <option value="">Select an option</option>
                                {shelves.map((_shelf) => (
                                    <option key={_shelf.id} value={_shelf.id}>{_shelf.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
                </div>
            </li>
        )
    }
}

export default Book;
