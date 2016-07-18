angular.module('starter.services', [])

.factory('Chats', function($http, $interval, StorageFactory) {
    // Might use a resource here that returns a JSON array
    
    function getMessage() {
        //we need to refactor this and do separate functions
        
        var url = 'https://pruebarails-alevale.c9.io/api/data'
        
        if (magicMessage[0] !== undefined) {
            var date = (new Date((new Date(magicMessage[(magicMessage.length)-1].created_at)).getTime()+1)).toISOString();
            url +="?created_at="+date
        }
        
        $http.get(url , {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        }).
        success(function(data, status, headers, config) {
            if(magicMessage.length === data.messages.length || !data.messages.length ){
                console.log("No new messages in DB");
            }else{
                if(magicMessage.length > 0){
                    data.messages.forEach(function(message){
                      magicMessage.push(message);
                    });
                }else{
                    magicMessage = data.messages;
                }
            }
        });
    };
    
    var magicMessage = [];
    
    getMessage();
    
    $interval(function(){
        if (window.location.hash.match(RegExp('#/tab/chats/*')) !== null) {
            getMessage();
        }
    }, 3000);
    
    
    
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
        messagesInDB: function(){
            return magicMessage;
        },
        addToApi: function(msg, friendName, callback) {
            var password = StorageFactory.getOne('friends', friendName);
            
            var message = CryptoJS.AES.encrypt(msg + ' **Date** ' + (new Date()).toISOString(), password);
        //   console.log(message.toString(CryptoJS.Latin1));
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
        decode:function(friendName) {
            //we receive the friends name and get the password (dentro de friends)
            //we get the message history with the friend (dentro de mensages)

            var keyToUnlock = StorageFactory.getOne('friends', friendName);
            var decryptedMessages = StorageFactory.getOne('messages', friendName);
            var lastMessageTime = StorageFactory.getOne('times', friendName);
            
            
            if(lastMessageTime.length > 0){
                var result = decryptedMessages;
                magicMessage.forEach(function(message) {
                    if (message.created_at > lastMessageTime) {
                        var temp = CryptoJS.AES.decrypt(message.content, keyToUnlock).toString(CryptoJS.enc.Latin1);
                        if (temp.split('**Date**')[1] !== undefined) {
                            result.push([temp.split('**Date**')[0], message.created_at]);
                        }
                    }
                });
                StorageFactory.addOne('messages', friendName, result);
                StorageFactory.addOne('times', friendName, result[result.length-1][1])
            }else{
                var result = [];
                magicMessage.forEach(function(message) {
                    if (message.content !== null) {
                        var temp = CryptoJS.AES.decrypt(message.content, keyToUnlock).toString(CryptoJS.enc.Latin1);
                        if (temp.split('**Date**')[1] !== undefined) {
                            result.push([temp.split('**Date**')[0], message.created_at]);
                        }
                    }
                });
                StorageFactory.addOne('messages', friendName, result);
                StorageFactory.addOne('times', friendName, result[result.length-1]!== undefined? result[result.length-1][1]: null)
            }

            return result;
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
})
.factory('ProfileManagerFactory', function(StorageFactory){
    var profilePassword = "";
    //when descifrating u have to see to which profile it corresponds, if with none, then you hav to create a new profile called genericly
    var usingNameOfProfile = "";
    
    return{
        getPassword: function(){
            return profilePassword;
        },
        setPassword: function(value){
            this.profilePassword = value;
        },
        getAlreadycreatedProfiles: function(){
            //retrieve the messages and paste them into
            //localStorage messages and change the name of the using profile to the one that should be saved
            var profiles = StorageFactory.getter("profiles") || {};
            profiles.forEach(function(profile){
                //decode each profile withthe using password
                console.log();
                //if none of the password has a profile associated
                //then modify the storage to have no elements inside
            });
        },
        saveMessagesOnProfile: function(){
            //save the actual items into the profile name that was defined when changed the password
        }
    }
})
.factory('StorageFactory', function(){
    var getter =function(name){
        return JSON.parse(localStorage.getItem(name)) || {};
    };
        
    var setter = function(name, value){
        localStorage.setItem(name, JSON.stringify(value));
    };
    
    return{
        getter: getter,
        setter: setter,
        getOne: function(collection, itemName){
            return getter(collection)[itemName] || {};
        },
        addOne: function(collection, itemName, value){
            var items = getter(collection);
            items[itemName] = value;
            localStorage.setItem(collection, JSON.stringify(items));
        },
        modOne: function(collection, itemName, newValue){
            var items = getter(collection);
            items[itemName] = newValue;
            localStorage.setItem(collection, JSON.stringify(items));
        },
        removeOne: function(collection, itemName){
            var items = getter(collection);
            delete items[itemName];
            localStorage.setItem(collection, JSON.stringify(items));   
        }
    }
});
