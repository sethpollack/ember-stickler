export default {

  validate(value, messages) {
    if (!value) {
      const message = this.getWithDefault('requiredMessage', 'This field is required');
      messages.push(message);
      return false;
    }
    return true;
  }

}
