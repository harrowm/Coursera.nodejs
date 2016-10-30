var mongoose = require('mongoose'),
    assert = require('assert');

var Leadership = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to leadership server");

    // create a new leadership
    Leadership.create(
      {
            "name": "Peter Pan",
            "image": "images/alberto.png",
            "designation": "Chief Epicurious Officer",
            "abbr": "CEO",
            "description": "Our CEO, Peter, . . ."
      }, function (err, leader) {
        if (err) throw err;
        console.log('Leader created!');
        console.log(leader);

        var id = leader._id;

        // get all the leaders
        setTimeout(function () {
            Leadership.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Test for Leadership'
                    }
                }, {
                    new: true
                })
                .exec(function (err, leader) {
                    if (err) throw err;
                    console.log('Updated Leader!');
                    console.log(leader);

                    db.collection('leadership').drop(function () {
                        db.close();
                    });
                });
        }, 3000);
    });
});
