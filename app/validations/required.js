export default {
	validate() {
		const value = this.get('value');
		
		if (!value.length) {
			const message = this.getWithDefault('required-message', 'This field is required');
			return { message: message };
		}
	}
}
