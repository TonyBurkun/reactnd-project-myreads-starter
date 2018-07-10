import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import Search from './Search'
import {Route} from 'react-router-dom'


class BooksApp extends React.Component {
    state = {
        allBooks: [],
    };


    componentDidMount() {

        BooksAPI.getAll()
            .then(books => {
                this.updateState(books);
            });
    }

    updateState = (newData) => {
        this.setState(() => ({
            allBooks: newData,
        }));
    };

    handleSelect = (book, shelf) => {


        BooksAPI.update(book, shelf)
            .then(result => {
                book.shelf = shelf;

                let allResultIDArr = [];
                 for (let value in result) {
                     allResultIDArr = allResultIDArr.concat(result[value]);
                 }

                 this.setState((currState) => ({
                     allBooks: currState.allBooks.filter(item => {
                         return allResultIDArr.includes(item.id);
                     })
                 }));


            });


    };

    render() {

        console.log(this.state);

        return (
            <div className="app">

                <Route exact path="/" render={() => (
                    <BookList
                        shelfBookList = {this.state.allBooks}
                        onSelectItem = {this.handleSelect}

                    />
                )}/>
                <Route exact path="/search" render={() => (
                    <Search
                        shelfBookList = {this.state.allBooks}
                        updateState = {this.updateState}
                    />
                )}/>

            </div>
        )
    }
}

export default BooksApp
