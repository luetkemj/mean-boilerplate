angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService']);

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		});

	$locationProvider.html5Mode(true);

}]);
angular.module('GeekCtrl', []).controller('GeekController', function($scope) {

	$scope.tagline = 'The square root of life is pi!';
	$scope.butter = 'butter is about the very best thing ever in teh hostory of ever';	

});
angular.module('MainCtrl', []).controller('MainController', function($scope) {

	$scope.tagline = 'To the moon and back!';	

});
angular.module('NerdCtrl', []).controller('NerdController', function($scope) {

	$scope.tagline = 'Nothing beats a pocket protector!';

});
angular.module('GeekService', []).factory('Geek', ['$http', function($http) {

	

}]);
angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

	

}]);