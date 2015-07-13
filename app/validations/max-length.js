export default {
  validate() {
    const value = this.get('value');
    const length = this.get('maxLengthValue');

    if (value.length > parseInt(length)) {
      const message = this.getWithDefault('maxLengthMessage', `Max length of ${length} allowed`);

      return { message: message };
    }
  }
}
