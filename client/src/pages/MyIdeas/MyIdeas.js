import React, { useEffect } from "react";
import MainPage from "../../components/MainPage";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, Badge, Button } from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { useDispatch, useSelector } from "react-redux";
import { deleteIdeaAction, listIdeas } from "../../actions/ideaActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyIdeas = ({ search }) => {
  const dispatch = useDispatch();
  const ideasList = useSelector((state) => state.ideasList);

  const { loading, ideas, error } = ideasList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const ideaCreate = useSelector((state) => state.ideaCreate);
  const { success: successCreate } = ideaCreate;

  const ideaUpdate = useSelector((state) => state.ideaUpdate);
  const { success: successUpdate } = ideaUpdate;

  const ideaDelete = useSelector((state) => state.ideaDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = ideaDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteIdeaAction(id));
    }
  };

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(listIdeas());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    navigate,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <div>
      <MainPage title={`Welcome back ${userInfo.name}`}>
        <Link to="/addidea">
          <Button style={{ marginLeft: 10, marginBottom: 5 }} size="md">
            Add idea
          </Button>
        </Link>
        {error && <ErrorMessage variant="danger" children={error} />}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loading && <Loading />}
        {loadingDelete && <Loading />}
        {ideas &&
          ideas
            .filter((filteredIdea) =>
              filteredIdea.title.toLowerCase().includes(search.toLowerCase())
            )
            .filter((filteredIdea) =>
              filteredIdea.user === userInfo._id
            )
            .reverse()
            .map((idea) => (
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
                    <span>
                      <Badge pill bg="success">
                        {idea.category}
                      </Badge>
                    </span>
                    <span>
                      <Badge pill bg="warning" style={{ marginLeft: 5 }}>
                        {idea.duration}
                      </Badge>
                    </span>
                    <blockquote className="blockquote mb-0">
                      <p>{idea.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {idea.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
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
