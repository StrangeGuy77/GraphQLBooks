import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../gql/queries";

class addBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {" "}
            {author.name}{" "}
          </option>
        );
      });
    }
  }

  saveAuthors(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <form id="add-book" onSubmit={e => this.saveAuthors(e)}>
          <div className="field">
            <label>Book name: </label>
            <input
              type="text"
              name="book-name"
              id="bn"
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Genre: </label>
            <input
              type="text"
              name="book-genre"
              id="bg"
              onChange={e => this.setState({ genre: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Author: </label>
            <select onChange={e => this.setState({ authorId: e.target.value })}>
              {this.displayAuthors()}
            </select>
          </div>
          <button>+</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(addBook);
