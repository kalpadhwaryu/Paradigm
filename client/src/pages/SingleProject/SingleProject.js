import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainPage from "../../components/MainPage";
import ReactMarkdown from "react-markdown";
import {
  deleteProjectAction,
  updateProjectAction,
} from "../../actions/projectActions";
import { useNavigate, useParams } from "react-router-dom";

const SingleProject = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const dispatch = useDispatch();

  const projectUpdate = useSelector((state) => state.projectUpdate);
  const { loading, error } = projectUpdate;

  const projectDelete = useSelector((state) => state.projectDelete);
  const { loading: loadingDelete, error: errorDelete } = projectDelete;

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

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
      setStatus(data.status);
      setClientName(data.clientName);
      setClientEmail(data.clientEmail);
      setClientPhone(data.clientPhone);
    };

    fetching();
  }, [id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setDuration("");
    setStatus("");
    setClientName("");
    setClientEmail("");
    setClientPhone("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProjectAction(
        id,
        title,
        content,
        category,
        duration,
        clientName,
        clientEmail,
        clientPhone,
        status
      )
    );
    if (!title || !content || !category || !duration || !status) return;

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
              style={{ marginTop: 5, marginBottom: 5, color: "red" }}
            >
              <Form.Label>Fields with * are mandatory</Form.Label>
            </Form.Group>
            <Form.Group
              controlId="title"
              style={{ marginTop: 5, marginBottom: 5 }}
            >
              <Form.Label><span style={{ color: "red" }}>*</span>Title</Form.Label>
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
              <Form.Label><span style={{ color: "red" }}>*</span>Content</Form.Label>
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
              <Form.Label><span style={{ color: "red" }}>*</span>Category</Form.Label>
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
              <Form.Label><span style={{ color: "red" }}>*</span>Duration</Form.Label>
              <Form.Control
                type="content"
                value={duration}
                placeholder="Enter the duration"
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="content"
              style={{ marginTop: 5, marginBottom: 5 }}
            >
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                type="content"
                value={clientName}
                placeholder="Enter the client name"
                onChange={(e) => setClientName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="content"
              style={{ marginTop: 5, marginBottom: 5 }}
            >
              <Form.Label>Client Email</Form.Label>
              <Form.Control
                type="email"
                value={clientEmail}
                placeholder="Enter the client email"
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="content"
              style={{ marginTop: 5, marginBottom: 5 }}
            >
              <Form.Label>Client Phone</Form.Label>
              <Form.Control
                type="number"
                value={clientPhone}
                placeholder="Enter the client phone number"
                onChange={(e) => setClientPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ marginTop: 15, marginBottom: 5 }}>
              <Form.Label><span style={{ color: "red" }}>*</span>Status</Form.Label>
              <Form.Check
                type="radio"
                label="Just an idea"
                value="Just an idea"
                checked={status === "Just an idea"}
                name="group1"
                style={{ marginLeft: 30 }}
                onClick={handleStatusChange}
              />
              <Form.Check
                type="radio"
                label="Prototype ready"
                value="Prototype ready"
                checked={status === "Prototype ready"}
                name="group1"
                style={{ marginLeft: 30 }}
                onClick={handleStatusChange}
              />
              <Form.Check
                type="radio"
                label="In progress"
                value="In progress"
                checked={status === "In progress"}
                name="group1"
                style={{ marginLeft: 30 }}
                onClick={handleStatusChange}
              />
              <Form.Check
                type="radio"
                label="Completed"
                value="Completed"
                checked={status === "Completed"}
                name="group1"
                style={{ marginLeft: 30 }}
                onClick={handleStatusChange}
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
