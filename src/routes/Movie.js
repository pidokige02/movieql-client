import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

// graphql 에서 사용한 query field 와 동잏한 syntax 를 사용함
const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      small_cover_image
    }
  }
`;

export default function Movie() {
  const { id } = useParams(); // id parameter from URI
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {  // the same format as we did in graphql server in variable section
      movieId: id,
    },
  });
  console.log(data, loading);
  if (loading) {
    return <h1>Fetching movie...</h1>;
  }
  return <div>{data.movie.title}</div>;
}
