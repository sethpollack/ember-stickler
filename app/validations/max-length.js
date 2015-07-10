export default {
	validate() {
		const value = this.get('value');
		const length = this.get('max-length-value');

		if (value.length > parseInt(length)) {
			const message = this.getWithDefault('max-length-message', `Max length of ${length} allowed`);
			return { message: message };
	  }	
	}
}
