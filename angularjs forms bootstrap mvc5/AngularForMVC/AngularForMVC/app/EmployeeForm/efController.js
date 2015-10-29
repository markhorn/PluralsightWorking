
angularFormsApp.controller('efController',
    ["$scope", "$window", "$routeParams", "DataService",
    function efController($scope, $window, $routeParams, DataService) {
        
        if ($routeParams.id)
            $scope.employee = DataService.getEmployee($routeParams.id);
        else
            $scope.employee = { id: 0 }

        $scope.editableEmployee = angular.copy($scope.employee);

        $scope.departments = [
            "Engineering",
            "Marketing",
            "Finance",
            "Administration"
        ];

        $scope.programmingLanguages = [
            "C",
            "C++",
            "C#",
            "JavaScript",
            "Java",
            "Pascal",
            "Perl",
            "PHP"
        ];

        $scope.shouldShowFullName = function () {
            return true;
        };

        $scope.hoveringOver = function (value) {
            $scope.overStart = value;
            $scope.percent = 100 * (value / 10);
        }

        $scope.submitForm = function () {

            angular.forEach($scope.employeeForm.$error.required, function (field) {
                field.$setDirty();
                field.$setTouched();
            });

            if ($scope.employeeForm.$invalid)                 
                return;

            if ($scope.editableEmployee.id == 0) {
                //insert new employee
                DataService.insertEmployee($scope.editableEmployee).then(
                    function (results) {
                        //on success
                        $scope.employee = angular.copy($scope.editableEmployee);
                        $scope.employee.id = results.data.id;
                        $window.history.back();
                    },
                    function (results) {
                        //on error
                        $scope.hasFormError = true;
                        $scope.formErrors = results.statusText;
                    });
            }
            else {
                //update the employee\
                DataService.updateEmployee($scope.editableEmployee);
            }

            

            //$modalInstance.close();
        }

        $scope.cancelForm = function () {
            $scope;
             $window.history.back();

            //$modalInstance.dismiss();
        }

        $scope.resetForm = function () {
           
            angular.forEach($scope.employeeForm.$error.required || $scope.employeeForm.$error.pattern, function (field) {
                
                field.$setPristine();
                field.$setUntouched();
            });

        }
    }]);