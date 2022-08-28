import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

// 아래는 client 동작을 test 하는 code 임 comment 처리 하갰음
// client
//   .query({
//     query: gql`
//       {
//         allMovies {
//           title
//         }
//       }
//     `,
//   })
//   .then((data) => console.log(data));


export default client;