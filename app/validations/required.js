export default function required(self, value) {
	if (!value.length) {
		const message = self.getWithDefault('required-message', 'This field is required');
		return { message: message };
	}
}