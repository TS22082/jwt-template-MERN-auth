import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button, Nav, Form } from "react-bootstrap";
import UserContext from "../../Context/UserContext";
import Alert from "../Alert";
import Axios from "axios";

function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post("/users/login", loginUser);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/home");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <>
      <Nav.Link onClick={handleShow}>Login</Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log in to your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert
              msg={error}
              color="danger"
              clearError={() => setError(undefined)}
            />
          )}
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className="text-muted">
                Never share your password to anyone.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={submit}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
