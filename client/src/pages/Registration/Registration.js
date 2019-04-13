import React, { Component } from 'react';
import {createAccountAction} from "../../actions/actionCreator";
import connect from 'react-redux/es/connect/connect';
import schemaBodyUser from '../../schemas/SchemaBoduUser';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: ""
        };
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({role: e.target.value});
    }

    userValidation = () => {
        if (this.state.password === this.state.confirmPassword) {
            schemaBodyUser.validate(this.state)
               .then(() => {
                   this.props.createAccount(this.state);
               })
               .catch(err => {
                   console.log(err + "     TEST VALIDATION: NOT OK(((((((((");
               })
        } else {
           console.log("Password confirmation needs to match original password")
        }
    };

    onChangeInput = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    render() {
        const {email, password, confirmPassword} = this.state;
        return (
            <div>

                <input type={"Email"} placeholder={"Email"} name={'email'} value={email} onChange={this.onChangeInput} />
                <input type={"Password"} placeholder={"Password"} name={'password'} value={password} onChange={this.onChangeInput} />
                <input type={"Password"} placeholder={"Confirm Password"} name={'confirmPassword'} value={confirmPassword} onChange={this.onChangeInput} />
                <button onClick={this.userValidation}>Create account</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { state };                                                       //      !!!!! нужно убрать и получить только то что нужно
};

const mapDispatchToProps = (dispatch) => ({
    createAccount: (data) => dispatch(createAccountAction(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);