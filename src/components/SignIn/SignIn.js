import { Component } from 'react';
import { auth, signInWithGoogle } from '../../firebase/Firebase';
import CustomButton from '../CustomButton/CustomButton';
import FormInput from '../FormInput/FormInput';

import './SignIn.scss';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: '' });
        } catch(error) {
            console.log('Error signining in the user:', error.message);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value })
    }

    render() { 
        return (
            <div className='sign-in'>
                <h2 className='title'>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={ this.handleSubmit }>
                    <FormInput 
                        type='email' 
                        name='email' 
                        value={ this.state.email } 
                        handleChange={ this.handleChange }
                        label='Email'
                        required  
                    />

                    <FormInput 
                        type='password' 
                        name='password' 
                        value={ this.state.password } 
                        handleChange={ this.handleChange }
                        label='Password'  
                        required
                    />

                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton type='button' onClick={ signInWithGoogle } isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>

                </form>
            </div>
        );
    }
}
 
export default SignIn;