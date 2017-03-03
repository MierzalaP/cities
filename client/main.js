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

Template.cityAdd.events({
    'submit form': function (event) {
        event.preventDefault();
        var city = {};

        const target = event.target;

        city.name = target.name.value;
        city.description = target.description.value;
        city.coordinates = {
            long : target.long.value,
            lat : target.lat.value
        }
        city.user = {
            _id : Meteor.user()._id,
            email : Meteor.user().emails[0].address
        }

        // show the upload panel
        $('.uploadPanel').fadeIn();
        // hide the submit button
        $('#submit').fadeOut();
        // find the document corresponding to the user (his id is Meteor.userId())


        Cities.insert(city, function(err, objectId){
            city._id = objectId;
            Meteor.call("initUploadServerForCity", city);
        });

    }
});

Template.commentBox.events({
    'submit form#sectionAdd': function (event) {
        event.preventDefault();
        var activity = this;      
        var comment = {};
        const target = event.target;
         comment.user = {
            _id : Meteor.user()._id,
            email : Meteor.user().emails[0].address
        }   
        comment.date = new Date();  
        comment.text = target.comment.value;
        Meteor.call("addComment", activity, comment);
        $('#sectionAdd').fadeOut();
        target.comment.value = "";
    }
});



