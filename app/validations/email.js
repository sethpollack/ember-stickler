export default {

  validate(value, messages) {
    const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const result = EMAIL_REGEX.test(value);

    if (!result) {
      const message = this.getWithDefault('emailMessage', 'A valid email address is required');
      messages.addObject({ message: message });
      return false;
    }
    return true;
  }

}
