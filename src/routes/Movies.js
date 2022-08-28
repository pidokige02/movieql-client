import { gql, useQuery } from "@apollo/client";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
    allTweets {
      id
      text
      author {
        fullName
      }
    }
  }
`;

export default function Movies() {
  // 선언형 code 는 원하는 것을 설명하기 위한 code만 적는 가을 말한다.
  const { data, loading, error } = useQuery(ALL_MOVIES);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Could not fetch :(</h1>;
  }
  return (
    <ul>
      <h1>Movies</h1>
      {data.allMovies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
      <h1>Tweets</h1>
      {data.allTweets.map((tweet) => (
        <li key={tweet.id}>
          {tweet.text}/by: {tweet.author.fullName}
        </li>
      ))}
    </ul>
  );
}
