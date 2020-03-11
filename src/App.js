import React from 'react';
import NavBar from './components/layouts/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Home } from './components/pages/Home';
import User from './components/Users/User';
import Alert from './components/layouts/Alert';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import { NotFound } from './components/pages/NotFound';
const App = () => {
	return (
		<GithubState>
			<AlertState>
				<Router>
					<div className='App'>
						<NavBar icon='fa fa-github' title='Github Finder' />
						<div className='container'>
							<Alert alert={alert} />
							<Switch>
								<Route exact path='/' component={Home} />
								<Route exact path='/about' component={About} />
								<Route exact path='/user/:login' component={User} />
								<Route component={NotFound} />
								/>
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	);
};

export default App;
