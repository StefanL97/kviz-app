import { Button, Form, FormCheck, FormControl, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Badge, Container, ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { createQuiz, getCreatedQuizzesByUser, getCurrentUser, getPassedQuizzesByUser, getUserByUsername } from "./api";

export const Profile = () => {
    const [currentUser, setCurrentUser] = useState();
    const [user, setUser] = useState();
    const [createdQuizzes, setCreatedQuizzes] = useState([]);
    const [passedQuizzes, setPassedQuizzes] = useState([]);
    const [modal, setModal] = useState(false);
    const [questions, setQuestions] = useState([]);
   
    const { username } = useParams();

 

    useEffect(() => {
        getCurrentUser().then(res => setCurrentUser(res.data));
        getUserByUsername(username).then(res => setUser(res.data));
        getCreatedQuizzesByUser(username).then(res => setCreatedQuizzes(res?.data));
        getPassedQuizzesByUser(username).then(res => setPassedQuizzes(res?.data));
    }, [username]);

    const renderCreatedQuizzes = (quizzes) => {
        if (quizzes.length === 0)
            return (<>
                <h3>Kreirani kvizovi</h3>
                <p>Korisnik nije kreirao nijedan kviz!</p>
            </>)
        let quizzesMarkUp = quizzes.map((quiz, index) => {
            return (
                <ListGroup.Item 
                    key={index}
                    as="li"
                    style={{ fontFamily: 'Inter', fontWeight: 400 }}
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto w-25" >
                        <div className="fw-bold">
                            {quiz.title}
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>Autor: <Link to={`/profile/${quiz.author.username}`}>{quiz.author.username}</Link></div>
                            <div>Već igrali: {quiz.passed}</div>
                        </div>
                    </div>
                    <div>
                    
                        <Link style={{border:"1px solid"}} to={`/quiz/${quiz.id}/passedusers/`}><t></t>Pogledajte rezultate kviza</Link>
                    </div>
                </ListGroup.Item>)
        });
        return (<>
            <h3>Kreirani kvizovi:</h3>
            <ListGroup>
                {quizzesMarkUp}
            </ListGroup>
        </>
        );
    }

    const renderPassedQuizzes = (quizzes) => {
        if (quizzes.length === 0)
            return (<>
                <h3>Odigrani kvizovi:</h3>
                <p>Prazno</p>
            </>)

        let quizzesMarkUp = quizzes.map((quiz, index) => {
            return (
                <ListGroup.Item
                    key={index}
                    as="li"
                    style={{ fontFamily: 'Inter', fontWeight: 400 }}
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto w-25">
                        <div className="fw-bold">
                            {quiz.title}
                        </div>
                        <div className="d-flex justify-content-between">
                            <div>Autor: <Link to={`/profile/${quiz.author.username}`}>{quiz.author.username}</Link></div>
                            <div>Odigrano: {quiz.passed}</div>
                        </div>
                    </div>
                </ListGroup.Item>)
        });
        return (<>
            <h3>Odigrani kvizovi:</h3>
            <ListGroup>
                {quizzesMarkUp}
            </ListGroup>
        </>
        );
    }

    const addQuiz = e => {
        e.preventDefault();
        let quiz = {
            title: e.target.title.value,
            description: e.target.description.value,
            category:e.target.category.value,
            questions: questions
        };
        createQuiz(quiz);
        window.location.reload();
    }

    const updateQuestionContent = (index, content) => {
        let qs = [...questions];
        let q = { ...qs[index] };
        q.content = content;
        qs[index] = q;
        setQuestions(qs);
    }

    const updateQuestionAnswers = (index, answer) => {
        let qs = [...questions];
        let q = { ...qs[index] };
        q.options.push(answer);
        qs[index] = q;
        setQuestions(qs);
    }

    const removeQuestionAnswer = (q_index) => {
        let qs = [...questions];
        let q = { ...qs[q_index] };
        q.options.splice(q.options.length - 1, 1);
        qs[q_index] = q;
        setQuestions(qs);
    }

    const updateAnswerContent = (q_index, a_index, content) => {
        let qs = [...questions];
        let q = { ...qs[q_index] };
        q.options[a_index].content = content;
        qs[q_index] = q;
        setQuestions(qs);
    }

    const updateAnswerIsCorrect = (q_index, a_index) => {
        let qs = [...questions];
        let q = { ...qs[q_index] };
        q.options[a_index].isCorrect = !q.options[a_index].isCorrect;
        qs[q_index] = q;
        setQuestions(qs);
    }

    const removeQuestion = () => {
        let qs = [...questions];
        qs.pop();
        setQuestions(qs);
    }

    const renderModal = modal => {
        return (
            <Modal size="lg" show={modal}>
                <Modal.Header>
                    <h2>Kreiraj kviz</h2>
                </Modal.Header>
                <Form onSubmit={e => addQuiz(e)}>
                    <Modal.Body>
                        <FormControl
                            placeholder="Ime"
                            className="me-2"
                            name="title" />
                        <FormControl
                            placeholder="Opis"
                            className="me-2 mt-3"
                            name="description" />
                         
                        {questions.map((question, q_index) => {
                            return <div className="ml-2">
                                <FormControl
                                    key={q_index}
                                    placeholder="Pitanje"
                                    className="me-2 mt-3"
                                    name={`question${q_index}`}
                                    onChange={e => { updateQuestionContent(q_index, e.target.value) }}
                                />
                                <Button
                                    onClick={() => updateQuestionAnswers(q_index, { content: "", isCorrect: false })}
                                    variant="success"
                                    className="mt-2"
                                >
                                    Dodajte odgovor
                                </Button>
                                <Button
                                    onClick={() => removeQuestionAnswer(q_index)}
                                    className="ml-2 mt-2"
                                    variant="outline-danger"
                                >
                                    Ukloniti odgovor
                                </Button>
                                {question.options.map((_, a_index) => {
                                    return <div className="ml-2 mt-2 d-flex">
                                        <FormControl
                                            key={`${q_index}${a_index}`}
                                            placeholder="Оdgovor"
                                            className="me-2 mt-3 mr-2"
                                            name={`answer${q_index}${a_index}`}
                                            onChange={e => updateAnswerContent(q_index, a_index, e.target.value)}
                                        />
                                        <FormCheck
                                            key={a_index}
                                            inline
                                            label="ispravno?"
                                            type="radio"
                                            onChange={() => updateAnswerIsCorrect(q_index, a_index)}
                                        />
                                    </div>
                                })}
                            </div>
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { setModal(false); setQuestions([]); }}>Poništi</Button>
                        <Button
                            onClick={() => removeQuestion()}
                            className="ml-2"
                            variant="outline-danger"
                            hidden={questions.length === 0}
                        >
                            Ukloni pitanje
                        </Button>
                        <Button
                            onClick={() => setQuestions(questions => [...questions, { options: [] }])}
                        >
                            Postavi pitanje
                        </Button>
                        <Button hidden={questions.length === 0} variant="success" type="submit">Kreiraj kviz</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }

    const renderUserView = (user, currentUser) => {
        if (user && currentUser) {
            if (user.username === currentUser.username)
                return (
                    <div className="d-flex justify-content-between">
                        <div>
                            <div>Korisničko ime: <b>{user.username}</b></div>
                            <div>E-mail:<b> {user.email}</b></div>
                        </div>
                        <div>
                            <Button onClick={() => setModal(true)}>Kreiraj kviz</Button>
                        </div>
                    </div>
                )
            if (user)
                return (
                    <div>
                        <div>Ime: {user.username}</div>
                        <div>{user.email ? `Mejl: ${user.email}` : ""}</div>
                    </div>
                );
            return <div>Prazno...</div>
        }
    }

    return (
        <Container style={{ marginTop: "100px" }}>
            <div className="mb-3">{renderUserView(user, currentUser)}</div>
            <div className="mt-3">{renderPassedQuizzes(passedQuizzes)}</div>
            <div className="mt-3">{renderCreatedQuizzes(createdQuizzes)}</div>
            {renderModal(modal)}
        </Container>
    );
}