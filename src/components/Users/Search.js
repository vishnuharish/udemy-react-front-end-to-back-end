import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
	static propTypes = {
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		showAlert: PropTypes.func.isRequired,
		showClear: PropTypes.bool.isRequired
	};
	state = {
		text: ''
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.text === '') {
			this.props.showAlert('Please enter somethin', 'light');
		} else {
			this.props.searchUsers(this.state.text);
			this.setState({ text: '' });
		}
	};

	render() {
		const { clearUsers, showClear } = this.props;
		return (
			<div>
				<form onSubmit={this.handleSubmit} className='form'>
					<input
						type='text'
						name='text'
						id='text'
						value={this.state.text}
						onChange={this.handleChange}
					/>
					<input
						type='submit'
						value='Search'
						className='btn btn-dark btn-block'
					/>
				</form>
				{showClear && (
					<button className='btn btn-light btn-block' onClick={clearUsers}>
						Clear
					</button>
				)}
			</div>
		);
	}
}

export default Search;
