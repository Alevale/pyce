angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

//wherever we see a call to Chats, we are calling the factorie that builds our objects

.controller('ChatsCtrl', function($scope, Chats, StorageFactory) {
    // for looking "our friends" we need just to see the name of the key in the localStorage
    $scope.$watch(function(){
        return localStorage.getItem('friends');
    },function(){
        $scope.people = StorageFactory.getter('friends');
    })
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $interval, $timeout, StorageFactory) {
    
    $scope.decrypted = Chats.decode($stateParams.chatId);
    
    $scope.preventlock = Chats.messagesInDB().length;

    $interval(function(){
        //handle multiple intervals
        console.log('otro evento mas, desencriptando', $stateParams.chatId);
        if(Chats.messagesInDB().length !== $scope.preventlock){
            $scope.decrypted = Chats.decode($stateParams.chatId);
            $scope.preventlock = Chats.messagesInDB().length;
        }
    },5000)
    
    // This should be the way everything works
    // $scope.$watch(function(obj){ return obj.messagesInDB();}.bind(null,Chats), function() {
    //   debugger
    // });
    
    $scope.setReadableTime = function (date){
        return moment(date).locale(window.navigator.userLanguage || window.navigator.language || 'en').fromNow();
    };

    $scope.inputField = 'Send some message';
    $scope.sendMessage = function(msg) {
        $scope.inputField = '';
        Chats.addToApi(msg, StorageFactory.getter($stateParams.chatId), function(err, decrypted) {
          $scope.decrypted.push([msg, (new Date).toISOString()]);
        });
    };
    
})

.controller("ScannerController", function($scope, $cordovaBarcodeScanner, StorageFactory) {
    $scope.manual = true;
    $scope.data = {
        showDelete: false
    };

    $scope.onItemDelete = function(name) {
        localStorage.removeItem(name);
        StorageFactory.removeOne('friends', name);
        $scope.loadItems();
    };

    $scope.loadItems = function() {
        $scope.items = StorageFactory.getter('friends');
    };

    $scope.scanBarcode = function() {
        try {
            $cordovaBarcodeScanner.scan().then(function(imageData) {
                alert(imageData.text);
                alert("Barcode Format -> " + imageData.format);
                alert("Cancelled -> " + imageData.cancelled);
                $scope.manual = !$scope.manual;
            }, function(error) {
                console.log("An error happened -> " + error);
                $scope.manual = !$scope.manual;
            });
        } catch (E) {
            $scope.manual = !$scope.manual;
        }
    };

    $scope.saveOnLocal = function(name, pass) {
        if (name !== 'undefined') {
            StorageFactory.addOne('friends', name, pass);
            $scope.loadItems();
        }
    };
    
    $scope.refresh = function () {
        window.location.reload();
    }
    
    $scope.showPassclicked = false;
    $scope.showPassword = function(pass) {
        $scope.passwordOfItemClicked = pass;
        $scope.showPassclicked = !$scope.showPassclicked;
    };

    $scope.loadItems();
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
