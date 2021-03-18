import React from 'react';
import ReactDOM from 'react-dom';
import SCSS from './styles/app.scss';
import Main from "./components/Main.jsx";

const appData = {
  title: 'PQWL Project'
};

ReactDOM.render(
  <Main data={appData} />, document.getElementById('root')
);
