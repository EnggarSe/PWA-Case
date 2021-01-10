import './style/app.css'
import { store, history } from './redux-saga/store'
import Dashboard from '../src/component/dashboard/dashboard'
import { Router, Route } from 'react-router'
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
       <Router history = {history}>
          <Route path = "/" component={Dashboard}/>
       </Router>
    </div>
  );
}

export default App;
