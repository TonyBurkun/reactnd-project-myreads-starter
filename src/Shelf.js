import React, {Component} from 'react'
import Book from './Book'

class Shelf extends Component {

    render() {

        const { shelfTitle, booksForShow, onSelectItem } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {booksForShow.map((book, index) => (
                            <li key = {index}>
                                <Book
                                    currentBook = {book}
                                    onSelectItem = {onSelectItem}/>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf