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

if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });
}

Template.map.onRendered(function() {
  GoogleMaps.load();
});

Template.map.helpers({
  map: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }
});

Template.map.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('map', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});



