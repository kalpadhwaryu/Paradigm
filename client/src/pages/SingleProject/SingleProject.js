import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainPage from "../../components/MainPage";
import ReactMarkdown from "react-markdown";
import { deleteProjectAction, updateProjectAction } from "../../actions/projectActions";
import { useNavigate, useParams } from "react-router-dom";

const SingleProject = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const dispatch = useDispatch();

  const projectUpdate = useSelector((state) => state.projectUpdate);
  const { loading, error } = projectUpdate;

  const projectDelete = useSelector((state) => state.projectDelete);
  const { loading: loadingDelete, error: errorDelete } = projectDelete;

  let navigate = useNavigate();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProjectAction(id));
    }
    navigate("/myprojects");
  };

  const { id } = useParams();

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/projects/${id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
      setDuration(data.duration);
    };

    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setDuration("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateProjectAction(id, title, content, category, duration));
    if (!title || !content || !category || !duration) return;

    resetHandler();
    navigate("/myprojects");
  };

  return (
    <MainPage title="Edit Project">
      <Card style={{ marginTop: 5, marginBottom: 5 }}>
        <Card.Header>Edit your Project</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
            <Form.Group
              controlId="title"
              style={{ marginTop: 5, marginBottom: 5 }}
            >
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              controlId="content"
              style={{ marginTop: 5, marginBottom: 5 }}
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter the content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="content"
              style={{ marginTop: 10, marginBottom: 5 }}
            >
              {content && (
                <Card>
                  <Card.Header>Project Preview</Card.Header>
                  <Card.Body>
                    <ReactMarkdown>{content}</ReactMarkdown>
                  </Card.Body>
                </Card>
              )}
            </Form.Group>
            <Form.Group
              controlId="content"
              style={{ marginTop: 5, marginBottom: 5 }}
            >
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                placeholder="Enter the Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="content"
              style={{ marginTop: 5, marginBottom: 5 }}
            >
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="content"
                value={duration}
                placeholder="Enter the duration"
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Form.Group style={{ marginTop: 15 }}>
              <Button variant="primary" type="submit">
                Update Project
              </Button>
              <Button
                className="mx-2"
                variant="danger"
                onClick={() => deleteHandler(id)}
              >
                Delete Project
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainPage>
  );
};

export default SingleProject;