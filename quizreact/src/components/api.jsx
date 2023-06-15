import axios from "axios"

const baseAddress = 'https://localhost:7111/api';
const jwtKey = 'jwt';

const getJwt = () => {
    let tokens = document.cookie;
    if (tokens)
        return tokens
            .split(';')
            .filter(cookie =>
                cookie.startsWith(`${jwtKey}=`))[0]
            .substring(`${jwtKey}=`.length);
}

export const getQuizzes = async () => {
    try {
        const response = await axios.get(`${baseAddress}/quizzes/`);
        return response;
    } catch (error) {
        console.error(error);
    }
}





export const getQuiz = async id => {
    try {
        const response = await axios.get(`${baseAddress}/quizzes/${id}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}
export const deleteQuiz = async id => {
    try {
        const response = await axios.delete(`${baseAddress}/quizzes/${id}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getQuestionsByQuizId = async quizId => {
    try {
        const response = await axios.get(`${baseAddress}/questions?quizid=${quizId}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getAnswersByQuizId = async quizId => {
    try {
        const response = await axios.get(`${baseAddress}/answers?quizid=${quizId}`);
        return response
    } catch (error) {
        console.error(error);
    }
}
export const getCreatedQuizzesByUsers = async username => {
    try {
        const response = await axios.get(`${baseAddress}/quizzes/get-created-quizzes-by-user?username=ozren`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getCreatedQuizzesByUserm = async username => {
    try {
        const response = await axios.get(`${baseAddress}/quizzes/get-created-quizzes-by-user?username=qwert`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getCreatedQuizzesByUserg = async username => {
    try {
        const response = await axios.get(`${baseAddress}/quizzes/get-created-quizzes-by-user?username=string123`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getCreatedQuizzesByUserf = async username => {
    try {
        const response = await axios.get(`${baseAddress}/quizzes/get-created-quizzes-by-user?username=marko11`);
        return response;
    } catch (error) {
        console.error(error);
    }
}
var params = new URLSearchParams();
params.append("username", "stefo");
params.append("username", "test");
var request = {
  params: params
};
export const getCreatedQuizzesByUsero = async username => {
    try {
        const response = await axios.get(`${baseAddress}/quizzes/get-created-quizzes-by-user/`,request);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getCreatedQuizzesByUser = async username => {
    try {
        const response = await axios.get(`${baseAddress}/quizzes/get-created-quizzes-by-user?username=${username}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getPassedQuizzesByUser = async username => {
    try {
        const response = await axios.get(`${baseAddress}/quizzes/get-passed-quizzes-by-user?username=${username}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const setCompletedQuizToCurrentUser = async (quizId, correctAnswers) => {
    try {
        const jwt = getJwt();
        const response = await axios.post(`${baseAddress}/users/set-completed-quiz?quizid=${quizId}&correctanswers=${correctAnswers}`,
            {}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${jwt}`
        }});
        if (response.status !== 200)
            alert(response.status);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const isQuizCompletedByCurrentUser = async quizId => {
    try {
        const jwt = getJwt();
        const response = await axios.get(`${baseAddress}/users/is-quiz-completed-by-current-user?quizid=${quizId}`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
        if (response.status !== 200)
            alert(response.status);
        return response;
    }
    catch (err) {
        console.error(err);
    }
}

export const getCurrentQuizScore = async quizId => {
    try {
        const jwt = getJwt();
        const response = await axios.get(`${baseAddress}/users/get-result-for-current-user?quizid=${quizId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getUsersByPassedQuizz = async quizid => {
    try{
        const response = await axios.get(`${baseAddress}/quizzes/get-passed-users-by-quizid?quizid=${quizid}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getQuizResultByUsername = async (username, quizid) => {
    try {
        const response = await axios.get(`${baseAddress}/quizzes/get-result-by-username?username=${username}&quizid=${quizid}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const createQuiz = async quiz => {
    try {
        const jwt = getJwt();
        const response = await axios.post(`${baseAddress}/users/create-quiz`, quiz, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        if (response.status !== 201)
            alert(response.status);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const login = async loginModel => {
    try {
        const response = await axios.post(`${baseAddress}/users/login`, loginModel, {
            withCredentials: true
        });
        if (response.status !== 200)
            alert(response.status);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const register = async registerModel => {
    try {
        const response = await axios.post(`${baseAddress}/Users/register`, registerModel, {
            withCredentials: true
        });
        if (response.status !== 201)
            alert(response.status);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const logout = async () => {
    try {
        const jwt = getJwt();
        const response = await axios.post(`${baseAddress}/users/logout`, {}, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        if (response.status !== 200)
            alert(response.status);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const jwt = getJwt();
        if (jwt) {
            const response = await axios.get(`${baseAddress}/users/get-current-user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            if (response.status !== 200)
                alert(response.status);
            return response;
        }
    } catch (error) {
        console.error(error);
    }
}

export const getUserByUsername = async username => {
    try {
        const response = await axios.get(`${baseAddress}/users/get-user-by-username?username=${username}`);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const isAuthenticated = async () => {
    try {
        const jwt = getJwt();
        const response = await axios.get(`${baseAddress}/users/is-authenticated`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        if (response.status !== 200)
            alert(response.status);
        return response;
    } catch (error) {
        console.error(error);
    }
}