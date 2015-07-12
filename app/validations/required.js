export default {
  validate() {
    const value = this.get('value');

    if (!value.length) {
      const message = this.getWithDefault('requiredMessage', 'This field is required');

      return { message: message };
    }
  }
}
