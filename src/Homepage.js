import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

const Homepage = () => {
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setJokes(data.jokes);
      })
      .catch((error) => {
        setError("Error fetching jokes. Please try again later.");
      });
  }, []);

  return (
    <Container className="jokes-container">
      <h2>Jokes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Joke</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((joke) => (
            <tr key={joke.id}>
              <td>{joke.id}</td>
              <td>{joke.joke}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Homepage;