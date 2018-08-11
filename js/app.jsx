import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import '../styles/main.scss';

import PrimeHeader from './Main-Page/Header.jsx';
import PrimeMain from './Main-Page/Main.jsx';
import PrimeFooter from './Main-Page/Footer.jsx';
import SubPage from './Sub-Page/Page.jsx';


import {
    HashRouter,
    Route,
    Switch,
} from 'react-router-dom'


class AllTogether extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            pending: true
        }
     }

    render(){
        if(this.state.pending) {
            return (
                <p> Loading... </p>
            )
        }

        return(
            <div className="app">
                <PrimeHeader />
                <PrimeMain artists={this.state.artists}/>
                <PrimeFooter/>
            </div>
        )
    }

    componentDidMount() {
        fetch(`http://localhost:3000/artists`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    artists: data,
                    pending: false
                })
            })
    }

}

class App extends React.Component {
    render() {
        return (
            <AllTogether/>
        )
    }
}



document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <HashRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/artist/:id" component={SubPage} />
                </Switch>
            </div>
        </HashRouter>,
        document.getElementById('app')
    );
});


