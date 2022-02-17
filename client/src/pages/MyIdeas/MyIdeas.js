import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button } from "react-bootstrap";
// import ideas from "../../data/ideas";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import axios from "axios";

const MyIdeas = () => {
  const [myIdeas, setMyIdeas] = useState([]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
    }
  };

  const fetchIdeas = async () => {
    const myIdeas = await axios.get(`/api/ideas`);
    setMyIdeas(myIdeas.data);
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div>
      <MainPage title="Welcome Kalp Adhwaryu">
        <Link to="/addidea">
          <Button style={{ marginLeft: 10, marginBottom: 5 }} size="md">
            Add idea
          </Button>
        </Link>
        {myIdeas.map((idea) => (
          <Accordion key={idea._id}>
            <AccordionItem eventKey="0" style={{ margin: 10 }}>
              <AccordionHeader style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  {idea.title}
                </span>
                <div>
                  <Button href={`/idea/${idea._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(idea._id)}
                  >
                    Delete
                  </Button>
                </div>
              </AccordionHeader>

              <AccordionBody>
                <h6>
                  <Badge pill bg="success">
                    {idea.category}
                  </Badge>
                </h6>
                <blockquote className="blockquote mb-0">
                  <p>{idea.content}</p>
                  <footer className="blockquote-footer">Added on DATE</footer>
                </blockquote>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        ))}
      </MainPage>
    </div>
  );
};

export default MyIdeas;
