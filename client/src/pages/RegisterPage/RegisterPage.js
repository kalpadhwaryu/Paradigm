import React, { useEffect, useState } from "react";
import MainPage from "../../components/MainPage";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [imgUploaded, setImgUploaded] = useState(false);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  let navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/myideas");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords don't match!");
    }    
    else {
      dispatch(register(name, email, password, pic));
    }
  };

  const postDetails = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "dkfzbehjp",
          uploadPreset: "sdccjdnz",
        },
        (error, result) => {
          setPic(result.info.secure_url.toString());
          setImgUploaded(true);
          if (error) {
            console.log(error);
            setImgUploaded(false);
          }
        }
      )
      .open();
  };

  return (
    <MainPage title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger" children={error} />}
        {message && <ErrorMessage variant="danger" children={message} />}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>          
          <Form.Group className="mb-3" controlId="pic">
            <Form.Label>Profile Picture</Form.Label>            
            <Button
              variant="outline-primary"
              onClick={postDetails}
              className="mx-3"
            >
              {imgUploaded ? "Image Uploaded" : "Choose File"}
            </Button>
          </Form.Group>

          <Form.Group className="mb-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/login">Login here</Link>
          </Col>
        </Row>
      </div>
    </MainPage>
  );
};

export default RegisterPage;
