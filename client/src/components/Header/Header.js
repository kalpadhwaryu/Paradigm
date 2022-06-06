import React from "react";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

export const Header = ({ setSearch }) => {
  const navigate = useNavigate();

  const location = useLocation()

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/"> Paradigm</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            {location.pathname === "/myideas" ? (
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className=""
                  aria-label="Search"
                  style={{ width: 400 }}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            ) : (
              <></>
            )}
          </Nav>
          <Nav
            className=" my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {userInfo ? (
              <>
                <Nav.Link>
                  <Link to="/myideas">My Ideas</Link>
                </Nav.Link>
                <NavDropdown title={userInfo.name} id="navbarScrollingDropdown">
                  <NavDropdown.Item>
                    <Link to="/profile">My Profile</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
