function OsaController($scope, $resource) {
	var RegistrationResource = $resource("http://trixxie-c.at/osa/1/", {});
	//var RegistrationResource = $resource("http://localhost\\:9081/app/api/osa/1/", {});

	$scope.r = {
		ras: []
	};
	$scope.success = null;
	$scope.error = null;

    $scope.remove = function(m) {
        $scope.r.ras = _.without($scope.r.ras, m);
    };

    $scope.add = function() {
        $scope.r.ras = _.union($scope.r.ras, [{kommer: 'nej'}]);
    };

	$scope.anyRegistration = function() {
		return _.some($scope.r.ras, function(ra) {
			return ra.kommer == 'ja';
		});
	};
	
	$scope.add();

	$scope.submit = function() {
		$scope.success = null;
		$scope.error = null;
		RegistrationResource.save($scope.r, function(p) {
			$scope.success = "Din OSA är mottagen. Tack!";
		}, function(response) { 
			$scope.error = "Något har gått fel. Snälla kontakta Henrik om detta :)";
		});
	};
}
