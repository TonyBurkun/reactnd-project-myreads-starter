import React, { Component }from 'react'




class Book extends Component {


    render() {

        const { title, authors } = this.props.currentBook;
        const { currentBook, onSelectItem } = this.props;
        const bookThumbnail = this.props.currentBook.hasOwnProperty('imageLinks') ? this.props.currentBook.imageLinks.thumbnail : 'dumb';




        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(" ${bookThumbnail}")`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select value={currentBook.shelf} onChange={(event) => {onSelectItem(currentBook, event.target.value, currentBook.shelf)}}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        )
    }
}

export default Book

