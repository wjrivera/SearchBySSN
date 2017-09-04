//Main controller for the whole project
(function () {
    angular
        .module("Trace")
        .controller("MainCtrl", MainFunction);

    function MainFunction() {

    }
})();

//Home controller for the home.html page
(function () {
    angular
        .module("Trace")
        .controller("HomeCtrl", HomeFunction);
    function HomeFunction($scope, $http, $rootScope, $location) {
        $scope.form = {};
        $scope.form.ssn = "";
        $scope.form.name = "";
        $scope.form.listUsers = [];

        var people = {
            _id: "",
            first: "",
            middle: "",
            last: "",

            home: "",
            cell: "",
            work: "",
            email: "",

            street: "",
            city: "",
            state: "",
            zip: "",

            dob: "",
            rid: "",
            ssn: ""
        };


        $scope.submitMyForm = function (form) {

            people.ssn = $scope.form.ssn;

            $http.post('/find', people).then(function (res) {
                console.log("Reponse: " + JSON.stringify(res.data));
                if(res.data.length === 0){
                    console.log("Empty");
                    $location.path('/user');
                }
                else{
                    for(var i = 0; i < res.data.length; i++){
                        console.log("User: " + i + " - Name: " +
                            res.data[i].first + " " +
                            res.data[i].middle + " " +
                            res.data[i].last);
                        $scope.form.listUsers.push(res.data[i]);
                    }
                }


            })
        };

        $scope.submitById = function (x) {
            // var people = {
            //     _id : x._id
            // };

            people._id = x._id;


            $http.post('/findOne', people).then(function (res) {
                //console.log("Reponse: " + JSON.stringify(res.data));


                $rootScope.currentUser = res.data[0];
                // console.log($rootScope.currentUser.name);
                // console.log($rootScope.currentUser.ssn);
                $location.path('/user');
            })
        };
    }
})();

//Home controller for the home.html page
(function () {
    angular
        .module("Trace")
        .controller("UserCtrl", HomeFunction);
    function HomeFunction($scope, $http, $location) {




        $scope.submitMyForm = function (currentUser) {
            var people = {
                first: currentUser.first,
                middle: currentUser.middle,
                last: currentUser.last,

                home: currentUser.home,
                cell: currentUser.cell,
                work: currentUser.work,
                email: currentUser.email,

                street: currentUser.street,
                city: currentUser.city,
                state: currentUser.state,
                zip: currentUser.zip,

                dob: currentUser.dob,
                rid: currentUser.rid,
                ssn: currentUser.ssn
            };
            $http.post('/insertUser', people).then(function (res) {
                $location.path('/');
            })
        };


    }
})();
