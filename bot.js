var twit = require('twit');  
var config = require('./config.js');

var Twitter = new twit(config);

var retweet = function() {  
    var params = {
        q: '#ibm, #iot, #IBM, #IOT',
        result_type: 'recent',
        lang: 'en'
    }

    Twitter.get('search/tweets', params, function(err, data) {
        if (!err) {
            data.statuses.forEach((v, i, a) => {
                Twitter.post('statuses/retweet/:id', {id: v.id_str}, (err, response) => {
                    if (!err){
                        console.log(`- ${v.id_str} - ${v.user.location} - ${v.text.substr(0,15).toString()}`);
                        
//                        Twitter.post('favorites/create/:id', {id: v.id_str}, (err, response) => {
//                            if (!err){
//                                console.log(`- ${v.id_str} - ${v.user.location} - ${v.text.substr(0,15).toString()}`);
//                            }
//                            else {
//                                console.log(`- Done - ${v.id_str} - ${v.user.location} - ${v.text.substr(0,15).toString()}`);
 //                           }
//                        });
                    }
                    else {
                        console.log(`- Done - ${v.id_str} - ${v.user.location} - ${v.text.substr(0,15).toString()}`);
                    }
                });
            });
        }
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}

retweet();

setInterval(retweet, 3000000);