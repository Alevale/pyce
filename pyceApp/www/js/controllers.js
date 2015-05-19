angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

//wherever we see a call to Chats, we are calling the factorie that builds our objects

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
    Chats.getFromApi();
})

.controller("ScannerController", function($scope, $cordovaBarcodeScanner) {
    $scope.manual = true;
    $scope.data = {
        showDelete: false
    };

    $scope.onItemDelete = function(item) {
        localStorage.removeItem(item);
        $scope.loadItems();
    };

    $scope.loadItems = function() {
        $scope.items = localStorage;
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
            localStorage.setItem(name, pass);
            $scope.loadItems();
        }
    };

    $scope.loadItems();
    })

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
