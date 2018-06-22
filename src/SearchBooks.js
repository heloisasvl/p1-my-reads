import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends React.Component {
  state = {
    query: '',
    results: []
  }

  handleInputChange = () => {
    this.setState({ results: [] })
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
    const { books } = this.props

    BooksAPI.search(this.state.query).then((results) => {
      if (results && !results.error) {
        results = results.map(b => {
          const book = books.find(book => book.id === b.id)
          if (book) {
            b.shelf = book.shelf
          } else {
            b.shelf = 'none'
          }
          return b
        })
        this.setState({ results })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.books !== this.state.books) {
      this.setState(status => ({
        results: status.results.map(b => {
          const book = nextProps.books.find(book => book.id === b.id)
          if (book) {
            b.shelf = book.shelf
          } else {
            b.shelf = 'none'
          }
          return b
        })
      }))
    }
  }

  render() {
    const { results } = this.state
    const { onChangeBookShelf } = this.props

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
            {results.map(book => (
              <li key={book.id}>
                <Book book={book} onChangeBookShelf={onChangeBookShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
