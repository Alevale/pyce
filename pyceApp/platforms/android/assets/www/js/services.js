angular.module('starter.services', [])

.factory('Chats', function($http) {
    // Might use a resource here that returns a JSON array

    function decode(array, keyToUnlock) {
        var result = [];
        array.forEach(function(message) {
            if (message.content !== null) {
                var temp = CryptoJS.AES.decrypt(message.content, keyToUnlock).toString(CryptoJS.enc.Latin1);
                console.log(temp);
                if (temp.split('**Date**')[1] !== undefined) {
                    result.push([temp.split('**Date**')[0], message.created_at]);
                }
            }
        });
        return result;
    }

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            var result;
            chats.forEach(function(chat) {
                if (chat.id === parseInt(chatId)) {
                    result = chat;
                }
            });
            return result;
        },
        addToApi: function(msg, password, callback) {
          var message = CryptoJS.AES.encrypt(msg + ' **Date** ' + (new Date()).toISOString(), password);
          console.log(message.toString(CryptoJS.Latin1));
            $http.post('https://pruebarails-alevale.c9.io/api/data.json', {
                "content": message.toString(CryptoJS.Latin1)
            }, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    dataType: 'json'
                }
            }).
            success(function(data, status, headers, config) {
                // console.log(JSON.stringify(decode(data.content, password)));
                // decode(data.content, password)
                // Store the message in you local database to know when you receive messages which have you sent
                callback(null, data);
            }).
            error(function(data, status, headers, config) {
                callback('Error getting from database', {
                    d: data,
                    s: status,
                    h: headers,
                    c: config
                });
            });
        },
        getFromApi: function(messagesKey, callback) {
            $http.get('https://pruebarails-alevale.c9.io/api/data', {
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            }).
            success(function(data, status, headers, config) {
                console.log(JSON.stringify(data));
                console.log(status);
                console.log(headers);
                console.log(config);

                var result = [];
                decode(data.messages, messagesKey, 'received').forEach(function(item) {
                    result.push(item);
                });

                callback(null, result);
            }).
            error(function(data, status, headers, config) {
                callback('Error getting from database', {
                    d: data,
                    s: status,
                    h: headers,
                    c: config
                });
            });
        },
        GenRdmTillLenght: function(num) {
            var abc = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,=,+,/,0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z';
            var str = 'U2FsdGVkX1';
            for (var i = str.length; i < num; i++) {
                str += abc.split(',')[(Math.floor(Math.random() * ((abc.length) / 2 - 0)) + 0)];
            }
            return str;
        }
    };
});
