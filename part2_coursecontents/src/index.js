import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Course from './components/Course.js'


 const App = () => {
    return (
        <div>
        <h1> Web Development Curriculum</h1>
        <Course />

        </div>

     
    )
  }
ReactDOM.render(<App />, document.getElementById('root'));

