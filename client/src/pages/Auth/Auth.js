import React, { Component } from 'react';
import { authAction } from "../../actions/actionCreator";
import connect from 'react-redux/es/connect/connect';

class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    onChangeInput = (e) => {
      const {name, value} = e.target;
      this.setState({[name]: value});
    };

    render() {
        const {email, password} = this.state;
        return (
            <div>
                <input type={"Email"} placeholder={"Email"} name={'email'} value={email} onChange={this.onChangeInput} />
                <input type={"Password"} placeholder={"Password"} name={'password'} value={password} onChange={this.onChangeInput} />
                <button onClick={() => this.props.authAction({...this.state, navigate: this.props.history.push})}>Authentication</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { state };                                            //      !!!!! нужно убрать и получить только то что нужно
};

const mapDispatchToProps = (dispatch) => ({
   authAction: (auth) => dispatch(authAction(auth))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);






























// renderToMainPage() {
//     return this.props.history.push('/');
// }
//
// renderError() {
//     return <div>!!!!!!!!!!!!!!!!!!!</div>;
// }
//
// componentWillReceiveProps(nextProps, nextContext) {
//
//     const { authPass } = this.props;
//     if (authPass){
//         this.props.history.push('/');
//     }
//
// }