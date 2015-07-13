export default {
  validate() {
    const value = this.get('value');
    const length = this.get('minLengthValue');

    if (value.length < parseInt(length)) {
      const message = this.getWithDefault('minLengthMessage', `Min length of ${length} allowed`);

      return { message: message };
    }
  }
}
