
angularFormsApp.controller('efController',
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
                DataService.insertEmployee($scope.editableEmployee);
            }
            else {
                //update the employee\
                DataService.updateEmployee($scope.editableEmployee);
            }

            $scope.employee = angular.copy($scope.editableEmployee);
            $window.history.back();

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
    });