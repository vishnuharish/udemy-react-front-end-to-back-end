import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import {
	SEARCH_USERS,
	GET_REPOS,
	GET_USER,
	SET_LOADING,
	CLEAR_USERS
} from '../types';

const GithubState = props => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	//Search Users
	const searchUsers = async text => {
		dispatch({ type: SET_LOADING });
		const res = await axios.get(
			`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items
		});
	};
	//Get user

	const getUser = async username => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		dispatch({ type: GET_USER, payload: res.data });
	};

	//Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });
	//Clear users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });
	//Set repos

	const getUserRepos = async username => {
		setLoading();
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		dispatch({ type: GET_REPOS, payload: res.data });
	};

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos
			}}>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
