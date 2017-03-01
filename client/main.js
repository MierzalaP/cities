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
