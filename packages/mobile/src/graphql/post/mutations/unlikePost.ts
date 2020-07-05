import { gql } from "apollo-boost";

export const unlikePostMutation = gql`
  mutation UnlikePost($id: ID!) {
    unlikePost(id: $id) {
      id
      likeCount
      isLiked
    }
  }
`;
