export default {
	validate() {
		const value = this.get('value');
		const length = this.get('min-length-value');

			if (value.length < parseInt(length)) {
				const message = this.getWithDefault('min-length-message', `Min length of ${length} allowed`);
				return { message: message };
		  }		
	}
}
