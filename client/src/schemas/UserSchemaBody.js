const yup = require('yup');

const schemaBodyUser = yup.object().shape({
    firstName: yup.string().required("Sorry, but field - First Name, must be fill"),
    lastName: yup.string().required("Sorry, but field - Last Name, must be fill"),
    displayName: yup.string().required("Sorry, but field - Display Name, must be fill"),
    email: yup.string().email("Sorry, but field - Email, must be fill"),
    password: yup.string().required("Sorry, but field - Password, must be fill"),
});

export default schemaBodyUser;