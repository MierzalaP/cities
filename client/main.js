  Template.reset.events({
        "click button": function () {
            Meteor.call("reset", function (err, res) {
            if (err) console.log("!!", err);
            });
        }
    });