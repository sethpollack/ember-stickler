export default {

  validate(value, messages) {
    const length = this.get('minLength');

    if (!value || value.length < parseInt(length)) {
      const message = this.getWithDefault('minLengthMessage', `Min length of ${length} allowed`);
      messages.push(message);
      return false
    }
    return true;
  }

}
