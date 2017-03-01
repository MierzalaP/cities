Meteor.methods({
	'insertCity' : function(city) {
		Cities.insert(city);
	} 
});