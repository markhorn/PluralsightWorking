
var angularFormsApp = angular.module('angularFormsApp', ['ngRoute', 'ui.bootstrap']);

angularFormsApp.config(
    ["$routeProvider", "$locationProvider",
    function ($routeProvider, $locationProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "app/Home.html",
                controller: "HomeController"
            })
            .when("/newEmployeeForm", {
                templateUrl: "app/EmployeeForm/efTemplate.html",
                controller: "efController"
            })
            .when("/updateEmployeeForm/:id", {
                templateUrl: "app/EmployeeForm/efTemplate.html",
                controller: "efController"
            })
            .otherwise({
                redirectTo: "/home"
            });
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

    }]);

angularFormsApp.controller("HomeController",
    ["$scope", "$location", "$modal", "DataService",
    function ($scope, $location, $modal, DataService) {

        DataService.getEmployees().then(
            function (results) {
                // on success
                var data = results.data;
            },
            function (results) {
                // on error, take action on results.status and results.statustext
                var data = results.data;
            }
        );

        $scope.showCreateEmployeeForm = function () {
            $location.path('/newEmployeeForm');

            //$modal.open({
            //    templateUrl: "app/EmployeeForm/efTemplate.html",
            //    controller: "efController"
            //});
        };

        $scope.showUpdateEmployeeForm = function (id) {
            $location.path('/updateEmployeeForm/' + id)
        };
    }]);