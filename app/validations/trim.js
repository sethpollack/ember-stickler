import Transform from 'ember-stickler/transform';

export default Transform.create({
  transform(value) {
    return (value || '').trim();
  }
});
