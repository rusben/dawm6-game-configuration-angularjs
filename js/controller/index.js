(function(){

// In order to understand the code, uncomment step by step sequentially.
// Only one step active each time.

/* Step 0 */

// We define a controller in our app, called GameController
angular.module('GamePropertiesApp').controller('GameController', ['$scope', function($scope){

    $scope.title = "Proven";
    $scope.players = 2;
    $scope.type = "Adventure";

}]);

/**/

/* Step 1 */

// We decide to create a factory to define the properties of the game.
// The factory allow you to configure a function that returns an object, this
// returned object can NOT be instantiated.
//
// The factory is tipically used when returning an object without methods 
// (but it can contain methods).
//
// This is the factory definition
angular.module('GamePropertiesApp').factory('GameFactory', function() {
    return {
        title: "Proven"
    }
});

// In order to use our GameFactory the GameController must know about it, so
// we inject the factory into the controller.
// (Advanced) How the injector works: https://docs.angularjs.org/api/auto/service/$injector
// 
// To tell the controller the factory exists we must inject the GameFactory 
// into the GameController as below:
angular.module('GamePropertiesApp').controller('GameController', ['$scope', 'GameFactory', function($scope, GameFactory){
    $scope.title = GameFactory.title;
    $scope.player = 1;
    $scope.type = "Adventure";
}]);

/**/

/* Step 2 */

// The definition of factory in the 'Step 1' is equivalent to the next definition
// that is using the $provide, in this case $provide.factory()
// (Advanced) How $provide works: https://docs.angularjs.org/api/auto/service/$provide
//
// We will use the factory shorcut used in 'Step 1' defined to this purpose.
angular.module('GamePropertiesApp').config(function($provide) {
    $provide.factory('GameFactory', function() {
        return {
            title: "Proven",
            players: 2
        }
    });
});

// We inject the GameFactory into the controller GameController
angular.module('GamePropertiesApp').controller('GameController', ['$scope', 'GameFactory', function($scope, GameFactory){
    $scope.title = GameFactory.title;
    $scope.players = GameFactory.players;
    $scope.type = "Adventure";
}]);

/**/

/* Step 3 */

// The definition of factory in the 'Step 1' & 'Step 2' is equivalent to the next definition
// that is using the $provide, in this case $provide.provider()
//
// As you can guess, factory & provider shorcuts are implemented as a provider, but
// while factory returns objects in the provider we must implement the $get method
// in order to return an object that in this case can be instantiated & configured
angular.module('GamePropertiesApp').config(function($provide) {
    $provide.provider('GameProvider', function() {
        
            this.$get = function() {
                return {
                    title: "Proven",
                    players: 2
                }
            }
    });
});

// We inject the GameProvider into the controller GameController
angular.module('GamePropertiesApp').controller('GameController', ['$scope', 'GameProvider', function($scope, GameProvider){
    $scope.title = GameProvider.title;
    $scope.players = GameProvider.players;
    $scope.type = "Classic";
}]);

/**/

/* Step 4 */

// In this case we define the GameProvider with the shortcut function, note that
// the name is simply Game, as AngularJS will create for as GameProvider
// In this step we include the type atributte.
angular.module('GamePropertiesApp').provider('Game', function () {

    this.$get = function() {
        return {
            title: "Proven",
            players: 2,
            type: "Memory"
        }
    }

});

// We inject the GameProvider into the controller GameController
angular.module('GamePropertiesApp').controller('GameController', ['$scope', 'Game', function($scope, Game){
    $scope.title = Game.title;
    $scope.players = Game.players;
    $scope.type = Game.type;
}]);

/**/

/* Step 5 */

// In this case we define the GameProvider with the shortcut function, note that
// the name is simply Game, as AngularJS will create for as GameProvider
angular.module('GamePropertiesApp').provider('Game', function () {

    var type;

    this.setType = function(value) {
        type = value;
    };

    this.$get = function() {
        return {
            title: "Proven",
            players: 2,
            type: type
        }
    }

});

angular.module('GamePropertiesApp').config(function(GameProvider) {
    GameProvider.setType("Arcade");
});

// We inject the GameProvider into the controller GameController
angular.module('GamePropertiesApp').controller('GameController', ['$scope', 'Game', function($scope, Game){
    $scope.title = Game.title;
    $scope.players = Game.players;
    $scope.type = Game.type;
}]);

/**/

})();
