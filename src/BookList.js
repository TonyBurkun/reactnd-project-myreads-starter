import React, { Component } from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'

class BookList extends Component{


    render() {

        const  currentlyReading = [],
            wantToRead = [],
            read = [];

        const { shelfBookList, onSelectItem } = this.props;

        shelfBookList.forEach((item) => {

            switch (item.shelf) {
                case 'currentlyReading':
                    currentlyReading.push(item);
                    break;

                case 'wantToRead':
                    wantToRead.push(item);
                    break;

                case 'read':
                    read.push(item);
                    break;

                default:
                    break;

            }
        });

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf
                            shelfTitle = {'Currently Reading'}
                            booksForShow = {currentlyReading}
                            onSelectItem = {onSelectItem}/>
                        <Shelf
                            shelfTitle = {'Want to Read'}
                            booksForShow = {wantToRead}
                            onSelectItem = {onSelectItem}/>
                        <Shelf
                            shelfTitle = {'Read'}
                            booksForShow = {read}
                            onSelectItem = {onSelectItem}
                        />
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default BookList