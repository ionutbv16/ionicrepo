angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})


.factory('getHttpServiceEvents', ['$http', '$q','$state',
    function ($http, $q, $state) {
        // interface
        var results = {
            events: [],
            getHttp: getHttp,
            getHttpItem: getHttpItem
        };
        return results;
        //var url = "http://localhost/json/";
        // implementation
        function getHttp() {
            var def = $q.defer();
            var headers = {
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT' 
            };
            $http({
              method: "get",
              headers: headers,
              url: "http://127.0.0.1/json/"
               }
            ).success(function(data) {
                    results.events = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get albums");
                });
            return def.promise;
        }

        function getHttpItem() {
            var def = $q.defer();
            console.log("get id ",$state.params.eventid);
            var id = $state.params.eventid;
            var headers = {
              'Access-Control-Allow-Origin' : '*',
              'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT' 
            };
            $http({
              method: "get",
              headers: headers,
              url: "http://127.0.0.1/json/event.php?id="+id
               }
            ).success(function(data) {
                    results.events = data;
                    def.resolve(data);
                })
                .error(function() {
                    def.reject("Failed to get albums");
                });
            return def.promise;
        }
    }]);

 