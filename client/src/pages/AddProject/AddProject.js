import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProjectAction } from "../../actions/projectActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainPage from "../../components/MainPage";
import ReactMarkdown from "react-markdown";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const dispatch = useDispatch();

  const projectCreate = useSelector((state) => state.projectCreate);
  const { loading, error, project } = projectCreate;

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

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProjectAction(
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

  useEffect(() => {}, []);

  return (
    <MainPage title="Add an Project">
      <Card style={{ marginTop: 5, marginBottom: 5 }}>
        <Card.Header>Add a new Project</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
              <Form.Label>
                <span style={{ color: "red" }}>*</span>Title
              </Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
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
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ marginTop: 10, marginBottom: 5 }}>
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
                value={category}
                placeholder="Enter the category"
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
                type="tel"
                value={clientPhone}
                placeholder="Enter the client phone number"
                maxLength={10}
                onChange={(e) => setClientPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group style={{ marginTop: 15, marginBottom: 5 }}>
              <Form.Label><span style={{ color: "red" }}>*</span>Status</Form.Label>
              <Form.Check
                type="radio"
                label="Just an idea"
                value="Just an idea"
                name="group1"
                style={{ marginLeft: 30 }}
                onClick={handleStatusChange}
              />
              <Form.Check
                type="radio"
                label="Prototype ready"
                value="Prototype ready"
                name="group1"
                style={{ marginLeft: 30 }}
                onClick={handleStatusChange}
              />
              <Form.Check
                type="radio"
                label="In progress"
                value="In progress"
                name="group1"
                style={{ marginLeft: 30 }}
                onClick={handleStatusChange}
              />
              <Form.Check
                type="radio"
                label="Completed"
                value="Completed"
                name="group1"
                style={{ marginLeft: 30 }}
                onClick={handleStatusChange}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Form.Group style={{ marginTop: 15 }}>
              <Button type="submit" variant="primary">
                Add Project
              </Button>
              <Button className="mx-2" onClick={resetHandler} variant="danger">
                Reset Fields
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainPage>
  );
};

export default AddProject;
