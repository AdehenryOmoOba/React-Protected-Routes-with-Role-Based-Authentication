import { useQuery, gql } from "@apollo/client";

const GET_ALL_BLOGS = gql`
  query {
    allBlogs {
      id
      title
    }
  }
`;

export default function useAllBlogs() {
  const { loading, error, data } = useQuery(GET_ALL_BLOGS);

  return { loading, error, data };
}
