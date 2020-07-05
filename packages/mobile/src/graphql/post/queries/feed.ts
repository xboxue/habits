import { gql } from "apollo-boost";

export const feedQuery = gql`
  query Feed {
    feed {
      id
      content
      author {
        id
        displayName
        photoUrl
      }
      todos {
        id
        title
        completed
      }
      createdAt
      likeCount
      commentCount
      isLiked
    }
  }
`;
