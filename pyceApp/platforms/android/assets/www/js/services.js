angular.module('starter.services', [])

.factory('Chats', function($http) {
    // Might use a resource here that returns a JSON array

    function decode(array, keyToUnlock, mode) {
        console.log('estoy en decode');
        var result = [];
        array.messages.forEach(function(message) {
            console.log(message);
            if (message.content !== null) {
                var temp = CryptoJS.AES.decrypt(message.content, keyToUnlock).toString(CryptoJS.enc.Latin1);
                console.log(temp);
                if (temp.split('**Date**')[1] !== undefined) {
                    result.push([temp.split('**Date**')[0], message.created_at, mode]);
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
            $http.post('//pruebarails-alevale.c9.io/api/data.json', JSON.stringify({
                "content": "U2FsdGVkX19bw46Lw6Tmr2nzgemitI1NkY1w0f4Tu2CfqUaXxUP9nI3zoeHXe2NGjZnrwFBXy/HBu+Fo1ImuF4xcPth9Re/L2QW5cjKB/A0=11"
            }), {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    dataType: 'json'
                }
            }).
            success(function(data, status, headers, config) {
                console.log('Success en getFromApi');
                console.log(JSON.stringify(data));
                console.log(status);
                console.log(headers);
                console.log(config);

                // data.forEach(function(d) {
                //     console.log(d);
                // });
                //
                // var total = [];
                // decode(data, keyToUnlock, 'received').forEach(function(item) {
                //     total.push(item);
                // });
                // decode(data, myOwnKey, 'sent').forEach(function(item) {
                //     total.push(item);
                // });
                //
                // callback(null, total);
            }).
            error(function(data, status, headers, config) {
                console.error('Fail en getFromApi!');
                console.log(data);
                console.log(status);
                console.log(headers);
                console.log(config);
            });
        },
        getFromApi: function(keyToUnlock, myOwnKey, callback) {
            console.log('estoy en getFromApi');
            $http.get('http://pruebarails-alevale.c9.io/api/data', {
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            }).
            success(function(data, status, headers, config) {
                console.log('Success en getFromApi');
                console.log(JSON.stringify(data));
                console.log(status);
                console.log(headers);
                console.log(config);

                var total = [];
                decode(data, keyToUnlock, 'received').forEach(function(item) {
                    total.push(item);
                });
                decode(data, myOwnKey, 'sent').forEach(function(item) {
                    total.push(item);
                });

                callback(null, total);
            }).
            error(function(data, status, headers, config) {
                console.error('Fail en getFromApi!');
                console.log(data);
                console.log(status);
                console.log(headers);
                console.log(config);
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
