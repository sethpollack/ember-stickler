export default {
  validate([value, messages]) {
    const length = this.get('maxLengthValue');

    if (!value || value.length > parseInt(length)) {
      const message = this.getWithDefault('maxLengthMessage', `Max length of ${length} allowed`);

      messages.push(message);
    }

    return [value, messages];
  }
}
