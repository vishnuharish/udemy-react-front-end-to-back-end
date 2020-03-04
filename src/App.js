import React, { Component, Fragment } from 'react';
import NavBar from './components/layouts/NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Users from './components/Users/Users';
import User from './components/Users/User';
import Search from './components/Users/Search';
import Alert from './components/layouts/Alert';
import axios from 'axios';
import About from './components/pages/About';

class App extends Component {
	state = {
		loading: false,
		users: [],
		alert: null,
		user: {},
		repos: []
	};
	// async componentDidMount() {
	// 	console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
	// 	this.setState({ loading: true });
	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);
	// 	this.setState({ loading: false, users: res.data });
	// }

	//Clear Users

	clearUsers = () => {
		this.setState({
			users: [],
			loading: false,
			alert: null
		});
	};
	// Show Alert
	showAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });
		setTimeout(() => this.setState({ alert: null }), 5000);
	};

	searchUsers = async text => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ loading: false, users: res.data.items });
	};

	getUser = async username => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ loading: false, user: res.data });
	};
	getUserRepos = async username => {
		this.setState({ loading: true });
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		this.setState({ loading: false, repos: res.data });
	};

	render() {
		const { users, loading, user, repos } = this.state;
		return (
			<Router>
				<div className='App'>
					<NavBar icon='fa fa-github' title='Github Finder' />
					<div className='container'>
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={props => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											showClear={users.length > 0 ? true : false}
											showAlert={this.showAlert}
										/>
										<Users
											loading={loading}
											users={users}
											getUser={this.getUser}
										/>
									</Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={props => (
									<User
										{...props}
										getUser={this.getUser}
										user={user}
										getUserRepos={this.getUserRepos}
										repos={repos}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;

// function App() {
// 	return (
// 		<div className='App'>
// 			<NavBar icon='fab fa-github' title='Github Finder' />
// 			<div className='container'>
// 				<Users />
// 			</div>
// 		</div>
// 	);
// }
