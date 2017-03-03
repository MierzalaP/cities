Meteor.methods({
    initUploadServerForCity: function (city) {
        UploadServer.init({
            tmpDir: process.env.PWD + '/.uploads/tmp',
            uploadDir: process.env.PWD + '/public/images/' + city.name,
            checkCreateDirectories: true, //create the directories for you
            finished: function (req) {
                var fileName = "/images/" + city.name + "/" + req.name;
                // Insert the new city in the collection here
                
                Cities.update({
                    _id : city._id
                }, {
                    $set : {
                        picture : fileName
                    }
                })
            }
        });
    }
});

Meteor.methods({
    'addComment': function(activity, comment) {
        Activities.update({
            _id : activity._id
        }, {
            $push : {
                comments : comment
            }
        }) 
    }
})