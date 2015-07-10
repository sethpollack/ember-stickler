export default function maxLength(self, value) {
	const length = self.get('max-length-value');

	if (value.length > parseInt(length)) {
		const message = self.getWithDefault('max-length-message', `Max length of ${length} allowed`);
		return { message: message };
  }
}