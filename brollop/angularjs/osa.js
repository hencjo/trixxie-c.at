function OsaController($scope, $resource, $window, $timeout, $window) {
	//	var RegistrationResource = $resource("https://backoffice.brewingagile.org/api/registration/1/", {});
	var RegistrationResource = $resource("http://localhost\\:9080/ba-backoffice/api/registration/1/", {});

	$scope.r = {
		ras: []
	};


	$scope.lastRegisteredName = "";
	$scope.showSuccess = false;
	$scope.showError = false;

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
		$scope.showSuccess = false;
		$scope.showError = false;
		RegistrationResource.save($scope.r, function(p) {
			if (p.success) $scope.lastRegisteredName = $scope.r.participantName;
			$scope.showSuccess = p.success;
			$scope.showError = !p.success;
			$window.location.href = "#signUpForm";
		}, function(response) { 
			$scope.showError = true;
			$window.location.href = "#signUpForm";
		});
	};
}
