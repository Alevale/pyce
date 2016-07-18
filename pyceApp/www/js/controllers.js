angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})
//wherever we see a call to Chats, we are calling the factory that builds our objects

.controller('ChatsCtrl', function($scope, Chats, StorageFactory) {
    // for looking "our friends" we need just to see the name of the key in the localStorage
    $scope.$watch(function(){
        return localStorage.getItem('friends');
    },function(){
        $scope.people = StorageFactory.getter('friends');
    })
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $interval, $timeout, StorageFactory) {

    Chats.decode($stateParams.chatId);

    var organizeMessages = function(localeMessage, obj){
        $scope.allMessages = [];
        $scope.decrypted = StorageFactory.getOne('messages', $stateParams.chatId);
        $scope.myMessages = StorageFactory.getOne('sendedMessages', $stateParams.chatId);

        $scope.decrypted.forEach(function(array) {
            if ($scope.myMessages.length > 0) {
                array.ismine = $scope.myMessages.some(function(msg){
                    return msg[1] === array[1];
                });
            }else{
                array.ismine = false;
            }
            $scope.allMessages.push(array);
        });

        if (localeMessage) {
            obj.ismine = true;
            $scope.allMessages.push(obj);
        }
        $scope.allMessages.sort(function(i1, i2){
            return new Date(i1[1]) > new Date(i2[1]) ? 1 : -1;
        });
        $scope.allMessages.lastKnownMesssage = $scope.myMessages[0]? $scope.myMessages[0][1] : (new Date).toISOString();
    };
    organizeMessages();

    $scope.$on('$destroy', function () {
        //Kill of the set Interval to optimize the application.
        $interval.cancel(decryptEveryTime);
    });

    $scope.lock = Chats.messagesInDB().length;
    var decryptEveryTime = $interval(function(){
        if($scope.lock !== Chats.messagesInDB().length){
            debugger
            Chats.decode($stateParams.chatId);
            organizeMessages();
            $scope.lock = Chats.messagesInDB().length;
        }
    },500);

    $scope.setReadableTime = function (date){
        return moment(date).locale(window.navigator.userLanguage || window.navigator.language || 'en').fromNow();
    };

    $scope.inputField = '';
    $scope.sendMessage = function(msg) {
        $scope.inputField = '';
        Chats.addToApi(msg, $stateParams.chatId, function(err, decrypted) {
            var result = StorageFactory.getOne("sendedMessages", $stateParams.chatId);
            if (result.length > 0) {
                result.push([msg, decrypted.messages.created_at]);
            }else{
                result = [[msg, decrypted.messages.created_at]];
            }
            StorageFactory.addOne("sendedMessages", $stateParams.chatId, result);
            organizeMessages(true, [[msg, decrypted.messages.created_at]]);
        });
    };

})

.controller("ScannerController", function($scope, $cordovaBarcodeScanner, StorageFactory, $ionicPopup) {
    $scope.camera = true;
    $scope.data = {
        showDelete: false
    };
    $scope.key = "";
    $scope.value = "";

    $scope.onItemDelete = function(name) {
        //we have to remove the friend name and the messages decrypted for him...
        StorageFactory.removeOne('friends', name);
        StorageFactory.removeOne('messages', name);
        StorageFactory.removeOne('sendedMessages', name);
        $scope.loadItems();
    };

    $scope.loadItems = function() {
        $scope.items = StorageFactory.getter('friends');
    };

    $scope.showAlert = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Sorry, we had an issue.',
         template: 'It seems like your camera doesn\'t work in this device, please introduce the password manually'
       });
       alertPopup.then(function(res) {
         console.log('Expecting a backdoor?');
       });
     };

    $scope.scanBarcode = function() {
        try {
            $cordovaBarcodeScanner.scan().then(function(imageData) {
                $scope.value = imageData.text;
            }, function(error) {
               $scope.camera = !$scope.camera;
            });
        } catch (E) {
            //if this fires, is because we are not in the mobile app
           $scope.camera = !$scope.camera;
           $scope.showAlert();
        }
    };

    $scope.saveOnLocal = function(name, pass) {
        if (name) {
            StorageFactory.addOne('friends', name, pass);
            $scope.loadItems();
        }
        $scope.key = "";
        $scope.value = "";
    };

    $scope.refresh = function () {
        window.location.reload();
    };

    $scope.showPassclicked = false;
    $scope.showPassword = function(pass) {
        $scope.passwordOfItemClicked = pass;
        $scope.showPassclicked = !$scope.showPassclicked;
    };

    $scope.loadItems();
})

.controller('AccountCtrl', function($scope) {
    //Here we should have the multiULockEnvironment (To be implemented)

    //With the implementation of this feature, we could maybe implement some kind of backup pof the data...
    //Obviously is mus be set up in local (or in some kind of endpoint wich is called backup or something like this...)
    //maybe in the endpoint of the "saved" passwords and profiles we could aslso implement the 3 times input

    //http://codepen.io/MrHill/pen/kLvcw
    $scope.profilePassword = '';

});
