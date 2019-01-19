var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        console.log(req.body);

        var userData = req.body
        var userScores = userData.scores;

        console.log(userScores);

        var totalDifference = 0;

        for(var i = 0; i < friends.length; i++){
            console.log(friends[i]);
            totalDifference = 0;

            for(var t = 0; t < friends[i].scores[t]; t++){
                totalDifference += Math.abs(parseInt(userScores[t]) - parseInt(friends[i].scores[t]));
                if(totalDifference <= bestMatch.friendDifference) {


                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        friends.push(userData);

        res.json(bestMatch);
    });

   
}


