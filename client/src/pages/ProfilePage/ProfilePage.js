import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainPage from "../../components/MainPage";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [imgUploaded, setImgUploaded] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  let navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords don't match!");
    } else {
      dispatch(updateProfile({ name, email, password, pic }));
      setMessage(null);
    }
  };

  return (
    <MainPage title="EDIT PROFILE">
      <div className="loginContainer">
        <Row className="profileContainer">
          <Col md={6}>
            {loading && <Loading />}
            {success && (
              <ErrorMessage variant="success">
                Updated Successfully
              </ErrorMessage>
            )}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {message && <ErrorMessage variant="danger" children={message} />}
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
                <Form.Label>Change Profile Picture</Form.Label>
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
                  Update
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic" />
          </Col>
        </Row>
      </div>
    </MainPage>
  );
};

export default ProfilePage;
