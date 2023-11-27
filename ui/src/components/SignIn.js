import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async () => {
        try {
            const user = await Auth.signIn(username, password);
            console.log('user logged in: ', user);
        } catch (error) {
            console.log('error signing in: ', error);
        }
    }

    return (
        <div>
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={signIn}>Sign In</button>
        </div>
    );
}

export default SignIn;
