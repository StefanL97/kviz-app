import React, { useEffect, useState } from "react";
import { Container, Form, Button, Navbar, Nav, FormControl, Modal, NavDropdown, Image, Alert } from "react-bootstrap";
import { login, register, logout, getCurrentUser } from "./api";
import logo from '../images/logokviz.jpg';
import search from '../images/search.png';
export const Layout = (props) => {
    const [modal, setModal] = useState({ show: false, type: "" });
    const [user, setUser] = useState({});
    const [show, setShow] = useState(true);

    useEffect(() => {
        getCurrentUser().then(res => setUser(res?.data));
    }, []);

    const loginUser = e => {
        e.preventDefault();
        let loginModel = {
            username: e.target.username.value,
            password: e.target.password.value
        };
        login(loginModel).finally(() => {
            getCurrentUser().then(res => setUser(res?.data));
            
              
                return (
                  <>
                    <Alert show={show} variant="success">
                      <Alert.Heading>How's it going?!</Alert.Heading>
                      <p>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                        lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                        fermentum.
                      </p>
                      <hr />
                      <div className="d-flex justify-content-end">
                        <Button onClick={() => setShow(false)} variant="outline-success">
                          Close me y'all!
                        </Button>
                      </div>
                    </Alert>
              
                    {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
                  </>
                );
              }
        );
        setModal({ show: false });
    }

    const signupUser = e => {
        e.preventDefault();
        let registerModel = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            repeatPassowrd: e.target.repeatPassword.value
        };
        register(registerModel).then(res => {
            if (res.status !== 201)
                alert('registration process went wrong')
        });
        setModal({ show: false });
    }

    const renderModal = modal => {
        if (modal.type === "login")
            return (
                <Modal show={modal.show} onHide={() => setModal({ show: false })}>
                    <Modal.Header>
                        <h2>Аutorizacija</h2>
                    </Modal.Header>
                    <Form onSubmit={e => loginUser(e)}>
                        <Modal.Body>
                            <FormControl
                                placeholder="Korisnicko ime"
                                className="me-2"
                                name="username" />
                            <FormControl
                                placeholder="Lozinka"
                                className="me-2 mt-3"
                                name="password"
                                type="password" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setModal({ show: false })}>
                                Zatvori
                            </Button>
                            <Button onClick={()=>{ alert('Uspješno ste se prijavili!'); }}
                                variant="primary"
                                type="submit"
                            >
                                Uloguj se
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>);
        else if (modal.type === "register")
            return (
                <Modal show={modal.show} onHide={() => setModal({ show: false })}>
                    <Modal.Header>
                        <h2>Registracija</h2>
                    </Modal.Header>
                    <Form onSubmit={e => signupUser(e)}>
                        <Modal.Body>
                            <FormControl
                                placeholder="Korisnicko ime"
                                className="me-2"
                                name="username" />
                            <FormControl
                                placeholder="E-mail"
                                className="me-2 mt-3"
                                name="email" />
                            <FormControl
                                placeholder="Lozinka"
                                className="me-2 mt-3"
                                name="password"
                                type="password" />
                            <FormControl
                                placeholder="Ponovite lozinku"
                                className="me-2 mt-3"
                                name="repeatPassword"
                                type="password" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setModal({ show: false })}>
                                Zаtvori
                            </Button>
                            <Button onClick={()=>{ alert('Uspješno ste se registrovali!'); }}
                                variant="primary"
                                type="submit"
                            >
                                Registruj se
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>);
    }

    const logoutUser = () => {
        logout().then(() => setUser({}));
        setModal({ show: false });
        window.location.reload(false);
    }

    const renderMenu = (username) => {
        if (username)
            return (
                <NavDropdown title="Meni" id="authMenu">
                    <NavDropdown.Item href={`/profile/${username}`}>{username}</NavDropdown.Item>
                    <NavDropdown.Item href="/quizzes">Kvizovi</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => logoutUser()} >Odjava</NavDropdown.Item>
                </NavDropdown>
            );
        else return (
            <NavDropdown title="Meni" id="notAuthMenu">
                <NavDropdown.Item onClick={() => setModal({ type: "login", show: true })}>Prijava</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setModal({ type: "register", show: true })}>Registracija</NavDropdown.Item>
                <NavDropdown.Item href="/quizzes">Kvizovi</NavDropdown.Item>
            </NavDropdown>
        );
    }

    const filterQuizzes = () => {
        const form = document.getElementById('search-form');
        props.setQuery(form.value);
    }

    return (
        <Navbar fixed="top" expand="lg" style={{ backgroundColor: '#F0EFF9', fontFamily: 'Inter', fontWeight: 600 }}>
            <Container fluid>
                <Image style={{ height: '66px', width: '69px' , border: '1px solid blue', borderRadius:'40%' }} src={logo} alt="logo" />
                <Navbar.Brand href="/" style={{marginLeft:'12px', fontSize:"30", fontFamily:"cursive", letterSpacing:"2px"}}>Kvizovi</Navbar.Brand>
                <Navbar.Collapse id="navbarScroll" className="d-flex justify-content-end">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {renderMenu(user?.username)}
                        <Form className="d-flex">
                            <FormControl
                                id="search-form"
                                type="search"
                                placeholder="Pretraži kvizove"
                                className="me-2 ml-2"
                                aria-label="Search"
                                name="search"
                            />
                            <Image style={{ height: '21px', width: '22px', cursor: 'pointer', marginTop: '3%', marginLeft: '1%' }} onClick={() => filterQuizzes()} src={search} alt="search" />
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            {renderModal(modal)}
        </Navbar>
    )
}