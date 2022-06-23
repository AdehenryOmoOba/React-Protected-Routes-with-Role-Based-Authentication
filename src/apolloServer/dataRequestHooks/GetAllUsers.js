import { useQuery, gql } from "@apollo/client";

const GET_ALL_USERS = gql`
  query {
    allUsers {
      username
      phone
      role
    }
  }
`;

export default function useAllUsers() {
  const { loading, error, data, refetch, ...rest } = useQuery(GET_ALL_USERS);

  return { loading, error, data, refetch };
}
