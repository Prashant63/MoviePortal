app.controller('myMovie',["$scope", "omdbapiService", "storageService", "$http",
	function($scope, omdbapiService, storageService, $http){

	var self = this;

	$http.get('/users').
	  	success(function(data, status, headers, config) {
	    self.users=data;

	  	}).
	  	error(function(data, status, headers, config) {
	    
	  	});

  	$scope.logout = function(){
		init();
		$http.get('/users').
		  	success(function(data, status, headers, config) {
		    self.users=data;

		  	}).
		  	error(function(data, status, headers, config) {
		    
		  	});
  	}

  	$scope.login = function(){
  		var userFound = false;
  		for(var index in self.users){
  			var user = self.users[index];
  			if(user.email == $scope.email){
  				userFound = true;
  				if(user.password == $scope.password){
  					$scope.loginError = false;
  					$scope.user = user;
			  		$scope.email = '';
			  		$scope.isUserLoggedIn = true;

  					break;
  				}
  				else{
  					$scope.loginError = true;
  				}
  				
  			}
  		}
  		if(!userFound){
  			var user = {"email":$scope.email,"password":$scope.password, "fav_movies":[]}
  			$http.put('/users/add', user).success(function(data, status, headers, config) {
		        $scope.user = data;
		        $scope.email = '';
			  	$scope.isUserLoggedIn = true;
		      }).error(function(data, status, headers, config) {
		        console.log('user not added');
		      });
  		}
   	}
	

	$scope.requestMovie = function(){
		var url = "http://www.omdbapi.com/?";
		var fullUrl = "http://www.omdbapi.com/?t" + "=" + $scope.movieName + "&y=&plot=short" + "&r=json";

		omdbapiService.get(fullUrl).then(function(data){
			$scope.movieData = data.data;
			$scope.movieDataPresent = true;
		});
	}

	$scope.addToFav = function(movie){
		var movieAlreadyFav = false;
		for (var index in $scope.user.fav_movies){
			var favMovie = $scope.user.fav_movies[index];
			if(favMovie.imdbID == movie.imdbID){
				movieAlreadyFav = true;
				break;
			}
		}
		if(!movieAlreadyFav){
			$scope.user.fav_movies.push(movie);
			$http.put('/users/'+$scope.user._id, $scope.user.fav_movies).success(function(data, status, headers, config) {
		        $scope.user = data;
		      }).error(function(data, status, headers, config) {
		        console.log('movie not added to fav');
		      });
		}
	}

	$scope.addReview = function(movie,review) {
		for (var index in $scope.user.fav_movies){
			var favMovie = $scope.user.fav_movies[index];
			if(favMovie.imdbID == movie.imdbID){
				$scope.user.fav_movies[index].reviews = $scope.user.fav_movies[index].reviews || [];
				$scope.user.fav_movies[index].reviews.push(review);
				break;
			}
		}
      	$http.put('/users/'+$scope.user._id, $scope.user.fav_movies).success(function(data, status, headers, config) {
      		$scope.user = data;
      	}).error(function(data, status, headers, config) {
        	console.log('review not added');
      	});
  	}


	$scope.showLib = function(){
		$scope.fromLib = $scope.user.fav_movies;
	}

	var init = function(){
		$scope.movieName = "";
		$scope.movieDataPresent = false;
		$scope.movieData = {};
		$scope.fromLib = [];
		$scope.email = '';
		$scope.password = '';
  		$scope.isUserLoggedIn = false;
  		$scope.user = {};
  		$scope.loginError = false;
	}

	init();
}]);