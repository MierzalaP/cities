Template.reset.events({
  "click button": function () {
  Meteor.call("reset", function (err, res) {
            if (err) console.log("!!", err);
            });
  }
});

Template.home.helpers({
  	"cities" : function(){
  		return Cities.find({});
  	}
});

Template.registerHelper('equals', function(a, b){
	return a == b;
});

Template.addPlace.events({
//ecouter l'evenement
	"submit form" : function(ev){
		ev.preventDefault();	
		var city = {
			name : $('#name').val(),
			contry : $('#country').val(),
			//coordinates[lat] : $('#latCity').val(),
			//coordinates[long] : $('#logCity').val(),
			description : $('#description').val()
		};

		Meteor.call('insertCity', city);
		return false;
		//alert(w+' | '+x+' | '+c+' | '+v+' | '+b);
	}
//cities insert
})

Template.addEvents.events({
//ecouter l'evenement
	"submit form" : function(ev){
		ev.preventDefault();	
		var activity = {
			name : $('#name').val(),
			url : $('#url').val(),
			startDate : $('#startDate').val(),
			endDate : $('#endDate').val(),
			description : $('#description').val()
		};

		Meteor.call('insertCity', city);
		return false;
		//alert(w+' | '+x+' | '+c+' | '+v+' | '+b);
	}
//cities insert
})