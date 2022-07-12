import { gql } from '@apollo/client';

export const GET_ME = gql`
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