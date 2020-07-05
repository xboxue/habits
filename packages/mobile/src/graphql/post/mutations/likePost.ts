import { gql } from "apollo-boost";

export const likePostMutation = gql`
  mutation LikePost($id: ID!) {
    likePost(id: $id) {
      id
      likeCount
      isLiked
    }
  }
`;
