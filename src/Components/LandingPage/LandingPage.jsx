/* Libraries */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { v4 as uuidv4 } from "uuid";
import Row from "react-bootstrap/Row";

/* Other imports */

/* Components */
import PostCard from "./PostCard";

export default function LandingPage() {
  const [mockPosts, setMockPosts] = useState([{}]);
  //const [mockImage, setMockImage] = useState();
  //const [page, setPage] = useState();

  const getPosts = async () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
      setMockPosts(res.data);
    });
  };

  /* I tried to get images but i am failed... :( */
  /*
  const getImage = async () => {
    const image = await axios.get("https://picsum.photos/200/300", {
      responseType: "arraybuffer",
    });
    const returnedB64 = Buffer.from(image.data).toString("base64");
    console.log(returnedB64);
    setMockImage(returnedB64);
  };
  */

  useEffect(() => {
    getPosts();
    //getImage();
  }, []);

  return (
    <Container className="mt-5 container-md w-75">
      <h1 className="text-center">Landing Page</h1>
      {mockPosts
        .filter((post, i) => post.id <= 5)
        .map((post) => (
          <Row key={uuidv4()}>
            <PostCard
              title={post.title}
              description={post.body}
              key={uuidv4()}
            />
          </Row>
        ))}
    </Container>
  );
}
/* Styled Components */
