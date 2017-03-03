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
      new Chart(ctx).Line(data, Chart.defaults.global);
    });

  });
