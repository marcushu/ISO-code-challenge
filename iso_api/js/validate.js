const validator = require('validator');


// check valid email format
//
const validateEmail = email => {
    let errors = { success: true }

    if (
        !validator.isEmail(email) ||
        validator.isEmpty(email)
    ) {
        errors.formatError = "email formatting error";
        errors.success = false;
    }

    return errors;
}


// check name exists and is only letters
//
const validateName = name => {
    let errors = { success: true }

    if(validator.isEmpty(name) || !validator.isAlpha(name, 'en-US', {ignore: " "})) {
        errors.formatError = "incorrectly formatted name";
        errors.success = false;
    }

    return errors;
}


// only digits in phone number
//
const validatePhoneNumber = phNumber => {
    let errors = { success: true }
    
    if(validator.isEmpty(phNumber) || !validator.isNumeric(phNumber.split(' ').join(''))) {
        errors.formatError = "phone number can only have digits";
        errors.success = false;
    }

    return errors;
}


exports.validateEmail = validateEmail;
exports.validateName = validateName;
exports.validatePhoneNumber = validatePhoneNumber;