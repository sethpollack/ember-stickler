export default {
	validate() {
		const value = this.get('value');
		const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
		const result = EMAIL_REGEX.test(value);

		if (!result) {
			const message = this.getWithDefault('email-message', 'A valid email address is required');
			return { message: message };
		}	
	}
}
