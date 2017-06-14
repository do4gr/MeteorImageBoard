

export default class UserUtils {
	
	static const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;
	static const mailPattern = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
	
	static const minNameLength = 2;
	static const minPasswordLength = 6;
	
	static error = {
		toShort: 'toShort',
		toLong: 'toLong',
		format: 'format',
		empty: 'empty',
		containsSpaces: 'containsSpaces',
		unknownType: 'unknownType'
	}
	
	static isValid(type, value) {
		switch(type) {
		case 'name':
			return UserUtils.isValidName(value);
		case 'mail':
			return UserUtils.isValidMail(value);
		case 'password':
			return UserUtils.isValidPassword(value);
		default:
			console.warn('UserUtils.isValid(type, value) was called with an unknown type!');
			return {valid: false, errors: [UserUtils.errors.unknownType]}
		}
	}
	static isValidName(name) {
		var errors = [];
		if(name.length == 0) {
			errors.push(UserUtils.errors.empty);
		} else {
			if(name.length < UserUtils.minNameLength) {
				errors.push(UserUtils.errors.toShort);
			}
		}
		
		if(errors.length == 0) {
			return {valid: true};
		} else {
			return {
				valid: false,
				errors: errors
			};
		}
	}
	static isValidMail(mail) {
		var errors = [];
		if(mail.length == 0) {
			errors.push(UserUtils.errors.empty);
		} else {
			if(!mail.match(UserUtils.mailPattern)) {
				errors.push(UserUtils.errors.format);
			}
		}
		
		if(errors.length == 0) {
			return {valid: true};
		} else {
			return {
				valid: false,
				errors: errors
			};
		}
	}
	static isValidPassword(password) {
		var errors = [];
		if(password.length == 0) {
			errors.push(UserUtils.errors.empty);
		} else {
			if(password.length < UserUtils.minPasswordLength) {
				errors.push(UserUtils.errors.toShort);
			}
			if(!password.match(UserUtils.passwordPattern)) {
				errors.push(UserUtils.errors.format);
			}
		}
		
		if(errors.length == 0) {
			return {valid: true};
		} else {
			return {
				valid: false,
				errors: errors
			};
		}
	}
}