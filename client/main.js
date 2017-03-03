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

//Template.addPlace.events({
//    'submit form': function (event) {
//        event.preventDefault();
//        var place = {};
//
//        const target = event.target;
//
//        place.name = target.name.value;
//        place.description = target.description.value;
//        place.nature = target.nature.value;
//        place.url = target.url.value;
//        place.user = {
//            _id : Meteor.user()._id,
//            email : Meteor.user().emails[0].address
//        }
//         place.comments = [];
//        place.editor = "TODO";
//        place.pictures = [];
//        place.like = 0;
//        place.usersLiking = [];
//        $('.uploadPanel').fadeIn();
//        $('#submit').fadeOut();
//        Activities.insert(place, function(err, objectId){
//            place._id = objectId;
//            Meteor.call("initUploadServerForPlace", place);      console.log("done");
//        });
//
//    }
//});
Template.addActivity.events({
    'submit form': function (event) {
        console.log("working");
        event.preventDefault();
const target = event.target;
        var city;
        var activity = {};
        activity.name = target.name.value;
        activity.description = target.description.value;
        activity.nature = $('form .nature:checked').val();

Cities.update({_id : Template.currentData()._id}, { $push :{activities: activity}});

Activities.insert(activity, function(err, objectId){
            activity._id = objectId;
     Meteor.call("initUploadServerForActivity", city, activity);
        });

    },
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
        target.comment.value = "";
    }
});

Template.likeButton.events({
    'click #like' : function(){
        var user = isConnected();
        if(user != null) {
            user = Meteor.user();
            var activity = this;
            activity.usersLiking =[];
            console.log(activity);
            if ( activity.usersLiking != null ) {
                console.log(activity.usersLiking);
                var check = !activity.usersLiking.some(function(e){
                    return e == user._id;
                })
            } else {
                var check = true;
            }
            console.log(check);
            if ( check ) {
                Meteor.call("addLike", activity, user);
                alert("liked");
            } else {
                alert("already liked!");
            }

        }
    }
    });

    function isConnected() {
    var user = Meteor.user();
    if (user != null) {
        return true;
    }
    return false;
    }




Template.charts.onRendered(function () {
    Chart.defaults.global.scaleBeginAtZero = true;
    // get graphics context of canvas elements
    // and call global methods on the server
    // for data aggregation
    let ct = Template.currentData().name.replace(/ /g, "-");
    console.log("currentData = ",Template.currentData().name.replace(/ /g, "-"));
    console.log("parrentData = ",Template.parentData(1).name.replace(/ /g, "-"));
    let ctx = $("#myChart").get(0).getContext("2d");
    Meteor.call("getWeatherData", ct, (err, result) => {
        let data = {
        labels: [],
        datasets: []
      };
      data.datasets.push({
          label: "temp",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: []
      });
      data.datasets.push({
          label: "temp min",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: []
      });
      data.datasets.push({
          label: "temp max",
          fillColor: "rgba(255,187,205,0.2)",
          strokeColor: "rgba(255,187,205,1)",
          pointColor: "rgba(255,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(255,187,205,1)",
          data: []
      });
      for (let d of result.list) {
        data.labels.push(d.dt_txt);
        data.datasets[0].data.push(d.main.temp);
        data.datasets[1].data.push(d.main.temp_min);
        data.datasets[2].data.push(d.main.temp_max);
      }
      new Chart(ctx).Line(data, {
        responsive: true,
        maintainAspectRatio: true
    });
    });

  });
Template.activity.helpers({
  	"firstPic" : function(){
  		return Template.currentData().pictures[0];
  	}
});
