import React from 'react';
import ReactDOM from 'react-dom';
import initReactFastclick from 'react-fastclick';
import './assert/css/reset.css'
import './assert/stylus/index.styl';
import App from './App';

initReactFastclick()

ReactDOM.render(
  <App />
  ,document.getElementById('root')
);
