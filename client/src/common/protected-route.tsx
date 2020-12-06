import React, { useState,useContext } from 'react';
import { Route, useHistory} from 'react-router-dom';
import { Button, Modal } from 'carbon-components-react';
import { useAuth } from './hooks';
import { UserContext } from './user-context';
import './not-found.scss'

export const validUrl = (url: string | null) => {
	const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
		+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' // domain name
		+ '((\\d{1,3}\\.){3}\\d{1,3}))' // ip (v4) address
		+ '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port
		+ '(\\?[;&amp;a-z\\d%_.~+=-]*)?' // query string
		+ '(\\#[-a-z\\d_]*)?$','i');

	if (!url || !pattern.test(url)) {
		return '';
	}

	return url;
};


export const ProtectedRoute = ({
	component: Component,
	isAuthenticated,
	noAuthComponent,
	...rest
}: any) => {
	const value = useContext(UserContext);
	const history = useHistory();
	let auth = useAuth();
    const guestLogin = (type: string) => fetch(`http://localhost:5000/api/${type}-guest-login`)
	.then((response) => {
		if (!response.ok) {
			throw new Error(response.statusText);
        }
        response.json().then((res:any)=>{ value.setState({status: 'success',
		error: null,user:res.user}); history.push(res.url); return res;})
	});
	let NoAuthComponent = () => {
		window.localStorage.setItem('redirectUrl', window.location.href);
		return (
			<div >
				<div className='noAuth'>
					<h1>SDC Forms</h1>
					<p style={{ marginTop: '0.5em' }}>You don't have access to this page, try...</p>
					<div>					
						<Button
						// disabled
						style={{
							marginTop: '2em',
							marginBottom: '1em'
						}}
						onClick={()=>history.push('/')}
						>
						Log in to get started
					</Button></div>
					<div className="guest">
      				<p>Or...</p>
					<Button
					      id="fillbtn"
						  kind="secondary"
						onClick={() => { guestLogin('filler') }}>
						Log in as Filler guest
					</Button>
					<Button
						id="mngbtn"
						kind="secondary"
						onClick={() => { guestLogin('manager') }}>
						Log in as Manager guest
					</Button>
					</div>
				</div>
			</div>
		);
	};

	if (noAuthComponent) {
		NoAuthComponent = noAuthComponent;
	}
	const tryAuth = (user: any) =>{
		if(! user) {
			return false;
		}
		if (rest.path.includes('manage') || rest.path.includes('upload-form') || rest.path.includes('formdisplay')){
			if(user.permissions.includes('manage')){
				return true;
			}
			return false;
		}
		if (rest.path.includes('formfill') || rest.path.includes('fill') ){
			if(user.permissions.includes('fill')){
				return true;
			}
			return false;
		}
	}
	return <Route {...rest} render={(props) => (
		isAuthenticated
			? isAuthenticated({ auth })
				? <Component {...props} {...rest} />
				: <NoAuthComponent />
			: tryAuth(auth.user)
				? <Component {...props} {...rest} />
				: <NoAuthComponent />
	)} />;
};
