import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button, Nav, Form } from "react-bootstrap";
import UserContext from "../../Context/UserContext";
import Axios from "axios";
import Alert from "../Alert";

function Register() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, displayName };

      await Axios.post("/users/register", newUser);
      const loginRes = await Axios.post("/users/login", { email, password });
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
      <Nav.Link onClick={handleShow}>Register</Nav.Link>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create an Account</Modal.Title>
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
            <Form.Group controlId="formBasicDisplayName">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                placeholder="John Doe"
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </Form.Group>

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
                Never share your password with anyone.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicVerifyPassword">
              <Form.Label>Verify Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Verify Password"
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={submit}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Register;
