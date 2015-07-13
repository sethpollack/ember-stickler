export default {

  validate(value, messages) {
    if (!value) {
      const message = this.getWithDefault('requiredMessage', 'This field is required');
      messages.addObject({ message: message });
      return false;
    }
    return true;
  }

}
