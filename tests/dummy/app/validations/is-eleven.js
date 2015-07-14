export default {

  validate(value, errors) {
    if (value !== '11') {
     errors.push('Take it to eleven!');
      return false;
    }
    return true;
  }

}
