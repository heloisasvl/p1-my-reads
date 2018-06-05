import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    // Carrega todos os livros e seta em uma variavel
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /**
    * @description Atualiza estante do livro
    * @param {string} book - Livro a ser atualizado
    * @param {string} shelf - Estante do livro a ser adicionada
    */
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(data => {
      this.setState(status => ({
        books: status.books.map(b => {
          if (book.id === b.id) {
            b.shelf = shelf
          }
          return b
        })
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} onChangeBookShelf={this.updateBookShelf} />
        )}/>
        <Route exact path='/search' render={() => (
          <SearchBooks />
        )}/>
      </div>
    )
  }
}

export default BooksApp
