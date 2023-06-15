import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getQuiz, getCurrentQuizScore, isAuthenticated, isQuizCompletedByCurrentUser } from './api';

export const Quiz = () => {
    const [quiz, setQuiz] = useState({});
    const [isAuth, setIsAuth] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [quizResult, setQuizResult] = useState({ maxScore: 0, correctAnswers: 0 });

    let { quizid } = useParams();

    useEffect(() => {
        getQuiz(quizid).then(res => setQuiz(res.data));
        isAuthenticated().then(res => setIsAuth(res.data));
        isQuizCompletedByCurrentUser(quizid).then(res => setIsCompleted(res.data));
    }, [quizid]);

    useEffect(() => {
        if (isCompleted === true)
            getCurrentQuizScore(quizid).then(res => setQuizResult(res.data));
    }, [quizid, isCompleted])

    let quizAccess = <></>;
    if (isAuth === false)
        quizAccess = <Alert variant="primary">
            <Alert.Heading>Niste prijavljeni!</Alert.Heading>
            <p>Morate se prijaviti da biste igrali ovaj kviz. Kliknite na dugme „Prijava“ na padajućoj listi Meni u gornjem desnom uglu stranice.</p>
        </Alert>;
    else if (isCompleted === true)
        quizAccess = <Alert variant="info">
            <Alert.Heading>Uspješno ste odigrali ovaj kviz. Vaš rezultat: {`${quizResult.correctAnswers}`}/{`${quizResult.maxScore}`}</Alert.Heading>
            <p></p>
        </Alert>;
    else quizAccess = <Link to='questions/'>Započni kviz</Link>

    return (
        <Container style={{ marginTop: "100px" }}>
            <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 text-center">
            <p data-aos="fade-up" class="aos-init aos-animate">Naziv:       {quiz.title}</p>
            <p data-aos="fade-up" class="aos-init aos-animate">Opis: {quiz.description}</p>
            <p data-aos="fade-up" class="aos-init aos-animate">Broj igraca koji su odigrali kviz:      {quiz.passed}</p>
            {quizAccess}
            </div>
            </div>
            </div>
        </Container>
    );
}