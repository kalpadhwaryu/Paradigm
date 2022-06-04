import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createIdeaAction } from "../../actions/ideaActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainPage from "../../components/MainPage";
import ReactMarkdown from "react-markdown";

const AddIdea = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");

  const dispatch = useDispatch();

  const ideaCreate = useSelector((state) => state.ideaCreate);
  const { loading, error, idea } = ideaCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setDuration("");
  };

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createIdeaAction(title, content, category, duration));
    if (!title || !content || !category || !duration) return;

    resetHandler();
    navigate("/myideas");
  };

  useEffect(() => {}, []);

  return (
    <MainPage title="Add an Idea">
      <Card style={{ marginTop: 5, marginBottom: 5 }}>
        <Card.Header>Add a new Idea</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group
              controlId="title"
              style={{ marginTop: 5, marginBottom: 5 }}
            >
              <Form.Label>Title</Form.Label>
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
              <Form.Label>Content</Form.Label>
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
                  <Card.Header>Idea Preview</Card.Header>
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
                value={category}
                placeholder="Enter the category"
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
              <Button type="submit" variant="primary">
                Add Idea
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

export default AddIdea;
