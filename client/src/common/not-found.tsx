import React from 'react';
import { Button } from 'carbon-components-react';
import { useHistory } from 'react-router-dom';
import './not-found.scss'
export const NotFound = () => {
	const history = useHistory();
	return (
		<>
			<div className='notFound'>
				<div style={{ textAlign: 'left' }}>
					<h3>404: Not found</h3>
					<p style={{ marginTop: '0.5em' }}>
						This page does not exist, click  <strong>Go back</strong><br /> to return.
					</p>
					<Button style={{ marginTop: '1rem' }} onClick={() => history.goBack()}>Go back</Button>
				</div>
			</div>
		</>
	);
};
