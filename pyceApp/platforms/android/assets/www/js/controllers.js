angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope) {})

//wherever we see a call to Chats, we are calling the factorie that builds our objects

.controller('ChatsCtrl', function($scope, Chats) {
    // for looking "our friends" we need just to see the name of the key in the localStorage
    $scope.people = localStorage;
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    console.log($stateParams.chatId);
    console.log('****Password****', localStorage.getItem($stateParams.chatId));

    $scope.decrypted = [
        ["aaa", "2015-05-18T09:40:36.653Z", "received"],
        ["aaa", "2015-05-18T09:40:36.653Z", "received"]
    ];

    Chats.getFromApi(localStorage.getItem($stateParams.chatId), 'esta es la contrase;a definida por ambos usuarios', function(err, decrypted) {
        $scope.$watch('decrypted', function() {
            alert('hey, myVar has changed!');
        });
        $scope.decrypted = decrypted;
        // .sort(function(item1, item2) {
        //     return item1[1] < item2[1];
        // });
        // $scope.$apply();
    });
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
