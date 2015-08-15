  angular.module('starter.controllers', ['firebase'])

  .factory("FirebaseClient", function() {
    var ref = new Firebase("https://greenbit.firebaseio.com/");
    return ref;
  })

  .controller('HomeCtrl', function($scope, FirebaseClient, $firebaseArray, $firebaseObject, $ionicModal) {

    $scope.tweet =  function(){
      var firebaseObject = FirebaseClient.child('Tweet');
      var message = document.querySelector('textarea').value;
      FirebaseClient.update({Tweet : message});
      $scope.closeModal();
    };  

    var settings = $firebaseObject(FirebaseClient.child('currentSettings'));
    settings.$loaded(function(){

        $scope.reading = settings;
        $scope.tweetMessage = '#IntelMaker #GreenBit Temperature: '+ $scope.reading.temperature + ' DEG | Light: '+ $scope.reading.light + ' LUX | Moisture: '+ $scope.reading.moisture + ' ppm';
    
    });

  // .fromTemplateUrl() method
  $ionicModal.fromTemplateUrl('templates/tweet.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  })

  .controller('SnapsCtrl', function($scope, FirebaseClient, $firebaseArray) {

    $scope.images = $firebaseArray(FirebaseClient.child('snaps'));
    $scope.takePicture = function(){
      FirebaseClient.update({snap:true});
    }

  })

  .controller('AnalyticsCtrl', function($scope, $firebaseArray, FirebaseClient) {
    var logs = $firebaseArray(FirebaseClient.child('logs'))
    logs.$loaded()
    .then(function(x) {
        var key = logs.$keyAt(0);
        $scope.reading = logs.$getRecord(key);
        $scope.labels = ["0", "5", "10", "15", "20"];
        $scope.data = [[28, 48, 40, 19, 86, 27, 90] ];
    })
    .catch(function(error) {
      console.log("Error:", error);
    });

  })

  .controller('ExperimentCtrl', function($scope, FirebaseClient, $firebaseArray, $firebaseObject) {
    
    $scope.currentSettings = $firebaseObject(FirebaseClient.child('currentSettings'));
    $scope.plants = $firebaseArray(FirebaseClient.child('plants'));

    $scope.changePlant = function(plant){
      $scope.currentSettings = $scope.plants.$getRecord(plant);
      $scope.currentSettings.plant = plant;
    };

    $scope.reset =  function(){
      var plant = $scope.currentSettings.plant;
      plant.lightState =true;
      var list = $firebaseArray(FirebaseClient.child('plants'));
      list.$loaded().then(function(data) {
        $scope.currentSettings = list.$getRecord(plant);
        $scope.currentSettings.plant = plant;
      })
      .catch(function(error) {
        console.error("Error:", error);
      });
    };

    $scope.apply = function(){
      var currentSettings = {
        temperature: parseInt($scope.currentSettings.temperature),
        light: parseInt($scope.currentSettings.light),
        moisture: parseInt($scope.currentSettings.moisture),
        plant: $scope.currentSettings.plant,
        lightOn: parseInt($scope.currentSettings.lightOn),
        lightOff:parseInt( $scope.currentSettings.lightOff),
        lightState: $scope.currentSettings.lightState
      };
      FirebaseClient.child('currentSettings').set(currentSettings);
    };

  });
