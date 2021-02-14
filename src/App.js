import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoList} from "./TodoList";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import {Login} from "./components/Login"
import {TodoApp} from "./components/TodoApp"

class App extends Component {

    constructor(props) {
        super(props);
        if(!localStorage.getItem("isLoggedIn")){
            localStorage.setItem("isLoggedIn", false);
            this.state = { isLoggedIn: false };
        } else {
            this.state = { isLoggedIn: true };
        }
        console.log(localStorage.getItem("isLoggedIn"));
        localStorage.clear();
        localStorage.setItem("email", "juan@gmail.com");
        localStorage.setItem("password", "juan123");
        this.loginSuccess = this.loginSuccess.bind(this);
    }

    loginSuccess(e) {
        this.setState({isLoggedIn:true});
        console.log(this.state.isLoggedIn, "++++++++++");
        localStorage.setItem("isLoggedIn", true);
        console.log(localStorage.getItem("isLoggedIn"), "********");
        alert("Login Success!");
    }

    loginFailed() {
        alert("Login Failed!");
    }

    render() {
        const LoginView = () => (
            <Login success={this.loginSuccess} failed={this.loginFailed} />
        );
      
        const TodoAppView = () => (
            <TodoApp/>
        );

        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">TODO React App</h1>
                    </header>

                    <br/>
                    <br/>

                    <ul>
                        {!this.state.isLoggedIn && <li><Link to="/">Login</Link></li>}
                        {this.state.isLoggedIn && <li><Link to="/todo">Todo</Link></li>}
                    </ul>

                    <div>
                        {!this.state.isLoggedIn && <Route exact path="/" component={LoginView}/>}
                        {this.state.isLoggedIn && <Route path="/todo" component={TodoAppView}/>}
                    </div>
                </div>
            </Router>
        );
    }

}

export default App;
