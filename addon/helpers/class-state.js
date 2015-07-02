import Ember from 'ember';

export function classState([value, trueClass, falseClass, nilClass]) {
	if(value === null) {
		return nilClass || '';
	}
	return value ? trueClass : falseClass;
}

export default Ember.HTMLBars.makeBoundHelper(classState);
