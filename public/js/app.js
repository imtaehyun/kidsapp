(function() {
  angular
    .module('admin', [])
    .controller('AdminController', AdminController);

  AdminController.$inject = ['$scope', '$http'];

  function AdminController($scope, $http) {
    $scope.seriesList = {};

    $http
      .get('/api/series')
      .success(function(result) {
        console.log('result: ' + JSON.stringify(result));
        $scope.seriesList = result.results;
      })
      .error(function(err) {
        console.error('error: ' + err);
        alert(err);
      });
  }

})();
