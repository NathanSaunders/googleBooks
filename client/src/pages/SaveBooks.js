import React, { Component } from "react";
import API from "../utils/API";
import { Container } from "../components/Grid";
import SavedBook from "../components/SavedBook";

class SaveBook extends Component {
  state = {
    savedBooks: []
  };

  //grabs books that were saved to the database
  componentDidMount() {
    API.getBooks()
      .then(res => this.setState({ savedBooks: res.data }))
      .catch(err => console.log(err));
  }

  //function to remove books by id
  handleDeleteButton = id => {
    API.deleteBook(id)
      .then(res => this.componentDidMount())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid className="container">
        <hr />
        <hr />
        <Container>
          <SavedBook
            savedBooks={this.state.savedBooks}
            handleDeleteButton={this.handleDeleteButton}
          />
        </Container>
        <footer>
          Created by Nathan Saunders
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

export default SaveBook;
