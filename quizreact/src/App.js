import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import {Profile} from './components/Profile';
import {Quiz} from './components/Quiz';
import {Quizzes} from './components/Quizzes';
import {Result} from './components/Result';
import {Question} from './components/Question';
import {Pocetna} from './components/Pocetna';

const App = (props) =>{
  const [query, setQuery] = useState('');

  return (
      <BrowserRouter>
          <Layout setQuery={setQuery} {...props} />
         
          <Routes>
          <Route exact path='/quizzes' element={<Quizzes query={query} {...props} />} />
         
          <Route exact path='/' element={<Pocetna/>}/>
          
          <Route exact path="quizzes/quiz/:quizid" element={<Quiz />} />
                
                <Route exact path="/quiz/:quizid/passedusers/" element={<Result />}/>
                <Route exact path="quizzes/quiz/:quizid/questions/" element={<Question />} />
                <Route exact path="/profile/:username" element={<Profile />} /> 
          </Routes>
      </BrowserRouter>
  );
}
export default App;