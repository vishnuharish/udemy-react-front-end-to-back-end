import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const UserItem = ({ avatar_url, login, html_url }) => {
	return (
		<div className='card text-center'>
			<img
				src={avatar_url}
				alt={login}
				className='round-img'
				style={{ width: '60px' }}
			/>
			<h3>{login}</h3>
			<div>
				<Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
					More
				</Link>
			</div>
		</div>
	);
};

UserItem.propTypes = {
	avatar_url: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	html_url: PropTypes.string.isRequired
};

export default UserItem;
