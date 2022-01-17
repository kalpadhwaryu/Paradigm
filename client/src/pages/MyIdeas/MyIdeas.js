import React from "react";
import MainPage from "../../components/MainPage";
import { Link } from "react-router-dom";
import { Accordion, Badge, Button } from "react-bootstrap";
import ideas from "../../data/ideas";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

const MyIdeas = () => {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
    }
  };
  return (
    <div>
      <MainPage title="Welcome Kalp Adhwaryu">
        <Link to="/addidea">
          <Button style={{ marginLeft: 10, marginBottom: 5 }} size="md">
            Add idea
          </Button>
        </Link>
        {ideas.map((idea) => (
          <Accordion>
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
                <h8>
                  <Badge pill bg="success">
                    {idea.category}
                  </Badge>
                </h8>
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
