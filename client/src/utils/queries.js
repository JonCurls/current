import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query {
    me {
      _id
      email
      cards {
        _id
        title
        link
        description
      }
    }
  }
`;

export const QUERY_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      _id
      email
      cards {
        _id
        title
        link
        description
      }
    }
  }
`;
