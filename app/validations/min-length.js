export default function minLength(self, value) {
	const length = self.get('min-length-value');

	if (value.length < parseInt(length)) {
		const message = self.getWithDefault('min-length-message', `Min length of ${length} allowed`);
		return { message: message };
  }
}