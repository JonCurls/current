import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const REMOVE_CARD = gql`
  mutation deleteCard($cardId: String!) {
    deleteCard(bookId: $cardId) {
      _id
      email
      savedCards {
        description
        title
        link
      }
    }
  }
`;

export const SAVE_CARD = gql`
  mutation AddCard($title: String!, $link: String!, $description: String!) {
    addCard(title: $title, link: $link, description: $description) {
      _id
      title
      link
      description
    }
  }
`;
