import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'

//page transition obj to centrally setup all framer-motion used in components
export const pageTransition = {
in: {
  opacity: 1
},
out: {
  opacity: 0
}
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
