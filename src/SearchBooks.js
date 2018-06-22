import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends React.Component {
  state = {
    query: '',
    books: []
  }

  handleInputChange = () => {
    this.setState({ books: [] })
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getSearch()
        }
      }
    })
  }

  getSearch = () => {
    BooksAPI.search(this.state.query).then((result) => {
      if (!result.error) {
        this.setState({ books: result })
      }
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" ref={input => this.search = input} onChange={this.handleInputChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
