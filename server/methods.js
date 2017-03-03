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
'initUploadServerForActivity': function (city, activity) {
        var dirName = city.picture.slice(8, city.picture.lastIndexOf("/"));
        UploadServer.init({
            tmpDir: process.env.PWD + '/.uploads/tmp',
            uploadDir: process.env.PWD + '/public/images/' + dirName,
            checkCreateDirectories: true, //create the directories for you
            finished: function (req) {
                var fileName = "/images/" + dirName + "/" + req.name;
                // add fileName in the array of pictures of the activity
                // Test whether this is the first picture in the array
                // If this is the first picture, you have update the city document by adding to its field 'activities'
                // an object with the id, the name, the nature and the picture filename(this first one)
                // You have also tu update the activity document by adding the filename to the array 'pictures'
                console.log("ID :" + activity._id)
                console.log("Filename :" + fileName)
                Activities.update({
                    _id : activity._id
                }, {
                    $push : {
                        pictures : fileName
                    }
                })
                
                activity.picture = Activities.findOne({
                    _id : activity._id
                }).pictures[0]
                
                Cities.update({
                    _id : city._id
                }, {
                    $push : {
                        activities : activity
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
});

Meteor.methods({
    'addLike' : function(activity, user){
         Activities.update({
                _id : activity._id
            }, {
                $inc : {
                    like : 1
                },
                $push : {
                    usersLiking : user._id
                }
            })
        }
    });
