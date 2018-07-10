import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Book from './Book'


class Search extends Component {
    state = {
        searchResult: []
    };


    handleSearch = (value) => {
        const query = value.trim();

        if (query.length) {
            BooksAPI.search(query)
                .then(result => {

                    if (!result.error) {
                        result = result.map(item => {
                            item.shelf = 'none';
                            return item;
                        });

                        this.updateSearchResult(result);
                    } else {
                        this.updateSearchResult([]);
                    }

                })
        } else {
            this.updateSearchResult([]);
        }


    };

    updateSearchResult = (newData) => {
        this.setState(() => ({
            searchResult: newData
        }));
    };

    handleSearchSelect = (book, shelf) => {

        const {searchResult} = this.state;
        searchResult.some((item, index) => {
            if (book.id === item.id) {
                searchResult[index].shelf = shelf;
            }

            return (book.id === item.id);

        });

        this.updateSearchResult(searchResult);

        let {shelfBookList} = this.props;
        let indexOfBook = '',
            bookExistOnShelf = false;

        bookExistOnShelf = shelfBookList.some((item, index) => {

            indexOfBook = index;

            return (item.id === book.id);
        });

        BooksAPI.update(book, shelf)
            .then(result => {
                if (bookExistOnShelf) {

                    if (shelf === 'none') {
                        shelfBookList.splice(indexOfBook, 1);
                    } else {
                        shelfBookList[indexOfBook].shelf = shelf;
                    }
                } else {
                    if (shelf !== 'none') {
                        shelfBookList.push(book);
                    }
                }

                this.props.updateState(shelfBookList);
            });
    };


    render() {

        const {shelfBookList} = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search"
                          onClick={() => this.setState({showSearchPage: false})}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                               placeholder="Search by title or author"
                               onChange={event => this.handleSearch(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchResult.length !== 0 && (
                            this.state.searchResult.map((book, index) => {

                                shelfBookList.some(item => {
                                    if (item.id === book.id) {
                                        book.shelf = item.shelf
                                    }
                                    return item.id === book.id;
                                });

                                return (
                                    <li key={index}>
                                        <Book
                                            currentBook={book}
                                            onSelectItem={this.handleSearchSelect}/>
                                    </li>
                                )
                            })
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;