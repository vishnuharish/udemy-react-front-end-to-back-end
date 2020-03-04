import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repo: { name, repo_url } }) => {
	return (
		<div className='card'>
			<h3>
				<a href={repo_url}>{name}</a>
			</h3>
		</div>
	);
};

RepoItem.propTypes = {
	repo: PropTypes.object.isRequired
};
export default RepoItem;
