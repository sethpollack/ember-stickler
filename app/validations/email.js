export default function email(self, value) {
	const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	let result = EMAIL_REGEX.test(value);
	if (!result) {
		const message = self.getWithDefault('email-message', 'A valid email address is required');
		return { message: message };
	}
}