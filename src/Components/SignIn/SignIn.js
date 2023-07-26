import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {

    onSubmitSignIn = () => {
      // this.props.loadUser(user)
      this.props.onRouteChange('setup');
    };

    onSubmitRegisterNow = () => {
        // this.props.loadUser(user)
        this.props.onRouteChange('register');
      };

    render() {
        return(
            <div className="background-image">
                <h3>Welcome to the best place to learn French Vocabulary</h3>
                <h4>Sign in if you have been here before and if it's your first time, register an account with us!</h4>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw4 ph0 mh0">Sign In</legend>
                                {/* <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name" 
                                    // onChange={this.onNameChange}
                                    />
                                </div> */}
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    // onChange={this.onEmailChange}
                                    />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    // onChange={this.onPasswordChange}
                                    />
                                </div>
                            </fieldset>
                            <div className="">
                                <input 
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in" />
                            </div>
                            <div className="">
                                <p className="db fw6 lh-copy f4">Don't have an account? </p>
                                <input 
                                onClick={this.onSubmitRegisterNow}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register Now" />
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default SignIn;


// render() {
//     return(
//         <div>
//             <h3>Welcome to the best place to learn French Vocabulary</h3>
//             <h4>Sign in if you have been here before and if it's your first time, register an account with us!</h4>
//             <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
//                 <main className="pa4 black-80">
//                     <div className="measure">
//                         <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//                             <legend className="f2 fw4 ph0 mh0">Sign In</legend>
//                             <div className="mt3">
//                                 <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
//                                 <input 
//                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
//                                 type="text" 
//                                 name="name"  
//                                 id="name" 
//                                 // onChange={this.onNameChange}
//                                 />
//                             </div>
//                             <div className="mt3">
//                                 <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
//                                 <input 
//                                 className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
//                                 type="email" 
//                                 name="email-address"  
//                                 id="email-address" 
//                                 // onChange={this.onEmailChange}
//                                 />
//                             </div>
//                             <div className="mv3">
//                                 <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
//                                 <input 
//                                 className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
//                                 type="password" 
//                                 name="password"  
//                                 id="password" 
//                                 // onChange={this.onPasswordChange}
//                                 />
//                             </div>
//                         </fieldset>
//                         <div className="">
//                             <input 
//                             onClick={this.onSubmitSignIn}
//                             className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
//                             type="submit" 
//                             value="Sign in" />
//                         </div>
//                     </div>
//                 </main>
//             </article>
//         </div>
//     );
// }
// }


