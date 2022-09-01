import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// graphql 에서 사용한 query field 와 동잏한 syntax 를 사용함
const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;


const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

export default function Movie() {
  const { id } = useParams(); // id parameter from URI
  const { data, loading,
      client: { cache },   // inside the client, we are going to get a cache
  } = useQuery(GET_MOVIE, {
    variables: {  // the same format as we did in graphql server in variable section
      movieId: id,
    },
  });
  console.log(data, loading);
  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      // fragment: gql`
      //   fragment MovieFragment on Movie {
      //     isLiked
      //     title  // title 과 rating 도 cache 에 저장된다
      //     rating
      //   }
      // `,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,

      data: {
        isLiked: !data.movie.isLiked,
        // title : "hello", // testing only
        // rating : 10
      },
    });
  };
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
        <Subtitle>⭐️ {data?.movie?.rating}</Subtitle>
        <button onClick={onClick}>
          {data?.movie?.isLiked ? "Unlike" : "Like"}
        </button>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
}
