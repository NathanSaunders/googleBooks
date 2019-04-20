import React, { Component } from "react";
import API from "../utils/API";
import { Container, Row, Col } from "../components/Grid";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult";

class SearchBooks extends Component {
  //create state
  state = {
    search: "",
    books: [],
    error: "",
    message: ""
  };

  //function takes value from search bar entry
  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  // function to control the submit button of the search form
  handleFormSubmit = event => {
    event.preventDefault();
    // connects to google book api with search value
    API.getGoogleSearchBooks(this.state.search)
      .then(res => {
        if (res.data.items === "error") {
          throw new Error(res.data.items);
        } else {
          // store response in an array
          let results = res.data.items;
          // map through array
          results = results.map(result => {
            // stores book information in a new object
            result = {
              key: result.id,
              id: result.id,
              title: result.volumeInfo.title,
              author: result.volumeInfo.authors,
              description: result.volumeInfo.description,
              image: result.volumeInfo.imageLinks.thumbnail,
              link: result.volumeInfo.infoLink
            };
            return result;
          });
          // resets state of empty books array to new array of objects with properties from response
          this.setState({ books: results, error: "" });
        }
      })
      .catch(err => this.setState({ error: err.items }));
  };

  handleSavedButton = event => {
    // console.log(event)
    event.preventDefault();
    console.log(this.state.books);
    let savedBooks = this.state.books.filter(
      book => book.id === event.target.id
    );
    savedBooks = savedBooks[0];
    API.saveBook(savedBooks)
      .then(this.setState({ message: alert("Your book is saved") }))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Container fluid>
        <h1 className="">Find your favorite book below...</h1>
        <Container>
          <Row>
            <Col size="12">
              <SearchForm
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
              />
            </Col>
          </Row>
        </Container>
        <br />
        <Container>
          <SearchResult
            books={this.state.books}
            handleSavedButton={this.handleSavedButton}
          />
        </Container>
        <footer>
          @copy 2019 created by Nathan Saunders ||
          <a
            href="https://github.com/NathanSaunders/googleBooks"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-chess-queen" />
          </a>
        </footer>
      </Container>
    );
  }
}

export default SearchBooks;
