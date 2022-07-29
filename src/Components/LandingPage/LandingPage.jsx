/* Libraries */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { v4 as uuidv4 } from "uuid";
import Form from "react-bootstrap/Form";

/* Animation */
import AnimatedPage from "../AnimatedPage/AnimatedPage";

/* Other imports */

/* Components */
import PostCard from "./PostCard";

export default function LandingPage() {
  const paginationRule = [1, 5, 10, 25, 50];

  const [mockPosts, setMockPosts] = useState([{}]);
  //const [mockImage, setMockImage] = useState();
  const [page, setPage] = useState(1);
  const [postsOnPage, setPostsOnPage] = useState(paginationRule[1]);
  const pageNr = Math.ceil(mockPosts.length / postsOnPage);

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

  const validatePageValue = (pageValue) => {
    if (pageValue < 1) {
      return 1;
    } else if (pageValue > pageNr) {
      return pageNr;
    } else {
      return pageValue;
    }
  };

  useEffect(() => {
    getPosts();
    //getImage();
  }, [postsOnPage]);

  return (
    <AnimatedPage>
      <Container className="mt-5 container-md w-75">
        <h1 className="text-center">Landing Page</h1>
        <div className="d-flex flex-column justify-content-center align-content-center mt-5">
          <div
            id="control-board"
            className="btn-group w-25 mx-auto"
            role="group"
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setPage(validatePageValue(page - 1))}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setPage(validatePageValue(page + 1))}
            >
              Next
            </button>
          </div>
          <p className="text-center mb-0">
            Page {page} form {pageNr}
          </p>
          <p className="text-center">
            there are {mockPosts.length} posts to read
          </p>
          <Form.Group className="mb-3" controlId="ControlInput1">
            <Form.Select
              className="w-25 mx-auto text-center"
              size="sm"
              onChange={(e) => {
                const newPPP = +e.target.value;
                setPage(Math.ceil((postsOnPage * page) / newPPP));
                setPostsOnPage(newPPP);
              }}
            >
              {paginationRule.map((p) => (
                <option
                  key={uuidv4()}
                  selected={p === postsOnPage ? true : false}
                  value={p}
                >
                  {p} post{p > 1 ? "s" : ""} / page
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>
        <div className="d-flex flex-row  flex-wrap justify-content-center">
          {[...mockPosts]
            .splice((page - 1) * postsOnPage, postsOnPage)
            .map((post) => (
              <PostCard
                title={post.title}
                description={post.body}
                key={uuidv4()}
              />
            ))}
        </div>
      </Container>
    </AnimatedPage>
  );
}
