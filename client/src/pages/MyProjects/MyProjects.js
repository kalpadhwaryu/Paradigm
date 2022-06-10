import React, { useEffect } from "react";
import MainPage from "../../components/MainPage";
import { Link, useNavigate } from "react-router-dom";
import { Accordion, Badge, Button } from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProjectAction,
  listProjects,
} from "../../actions/projectActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyProjects = ({ search }) => {
  const dispatch = useDispatch();
  const projectsList = useSelector((state) => state.projectsList);

  const { loading, projects, error } = projectsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const projectCreate = useSelector((state) => state.projectCreate);
  const { success: successCreate } = projectCreate;

  const projectUpdate = useSelector((state) => state.projectUpdate);
  const { success: successUpdate } = projectUpdate;

  const projectDelete = useSelector((state) => state.projectDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = projectDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteProjectAction(id));
    }
  };

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(listProjects());
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
        <Link to="/addproject">
          <Button style={{ marginLeft: 10, marginBottom: 5 }} size="md">
            Add project
          </Button>
        </Link>
        {error && <ErrorMessage variant="danger" children={error} />}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {(loading || loadingDelete) && <Loading />}
        {projects &&
          projects
            .filter((filteredProject) =>
              filteredProject.title.toLowerCase().includes(search.toLowerCase())
            )
            .filter((filteredProject) => filteredProject.user === userInfo._id)
            .reverse()
            .map((project) => (
              <Accordion key={project._id}>
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
                        fontFamily: "monospace",
                      }}
                    >
                      {project.title}
                    </span>
                    <div>
                      <Button href={`/project/${project._id}`}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteHandler(project._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </AccordionHeader>

                  <AccordionBody>
                    <span>
                      <Badge pill bg="success">
                        {project.category}
                      </Badge>
                    </span>
                    <span>
                      <Badge pill bg="warning" style={{ marginLeft: 5 }}>
                        {project.duration}
                      </Badge>
                    </span>
                    <span>
                      {project.status === "Completed" ? (
                        <Badge pill bg="success" style={{ marginLeft: 5 }}>
                          {project.status}
                        </Badge>
                      ) : (
                        <Badge pill bg="danger" style={{ marginLeft: 5 }}>
                          {project.status}
                        </Badge>
                      )}
                    </span>
                    <blockquote className="blockquote mb-0">
                      <p
                        style={{
                          marginTop: 15,
                          marginBottom: 15,
                          fontSize: 18,
                          fontFamily: "cursive",
                        }}
                      >
                        {project.content}
                      </p>
                      {project.clientName &&
                      project.clientEmail &&
                      project.clientPhone ? (
                        <>
                          <p
                            style={{
                              fontSize: 18,
                              fontFamily: "revert",                              
                            }}
                          >
                            <b>Client Name:</b> {project.clientName}
                          </p>
                          <p
                            style={{
                              fontSize: 18,
                              fontFamily: "revert",
                              marginTop: -20,
                            }}
                          >
                            <b>Client Email:</b> {project.clientEmail}
                          </p>
                          <p
                            style={{
                              fontSize: 18,
                              fontFamily: "revert",
                              marginTop: -20,
                            }}
                          >
                            <b>Client Phone:</b> {project.clientPhone}
                          </p>
                        </>
                      ) : (
                        <></>
                      )}
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {project.createdAt.substring(0, 10)}
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

export default MyProjects;
