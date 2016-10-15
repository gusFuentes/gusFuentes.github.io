var app = angular.module('StarterApp', ['ngMaterial', 'ngMdIcons', 'ngRoute']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog) {
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
  $scope.showAdd = function(ev) {
    $mdDialog.show({
        controller: DialogController,
        template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-dialog-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
        targetEvent: ev,
        clickOutsideToClose : true,
      })
  };
}]);

app.controller('gridListDemoCtrl', function($scope) {

    this.tiles = buildGridModel({
            title: "Svg-",
            background: ""
          });

    function buildGridModel(tileTmpl){
      var it, results = [ ];

      for (var j=0; j<11; j++) {

        it = angular.extend({},tileTmpl);
        it.title = it.title + (j+1);
        it.span  = { row : 1, col : 1 };

        switch(j+1) {
          case 1:
            it.background = "red";
            it.span.row = it.span.col = 2;
            break;

          case 2: it.background = "green";         break;
          case 3: it.background = "darkBlue";      break;
          case 4:
            it.background = "blue";
            it.span.col = 2;
            break;

          case 5:
            it.background = "yellow";
            it.span.row = it.span.col = 2;
            break;

          case 6: it.background = "pink";          break;
          case 7: it.background = "darkBlue";      break;
          case 8: it.background = "purple";        break;
          case 9: it.background = "deepBlue";      break;
          case 10: it.background = "lightPurple";  break;
          case 11: it.background = "yellow";       break;
        }

        results.push(it);
      }
      return results;
    }
  })

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
};

app.directive( 'goClick', function ( $location, $mdSidenav ) {
  return function ( scope, element, attrs ) {
    var path;

    attrs.$observe( 'goClick', function (val) {
      path = val;
    });

    element.bind( 'click', function () {
      scope.$apply( function () {
        $location.path( path );
      });
    });
  };
});


app.config(function($mdThemingProvider) {
$mdThemingProvider.definePalette('customPalette', {
	'50': 'ffebee',
	'100': '000000',
	'200': 'ef9a9a',
	'300': 'e57373',
	'400': 'ef5350',
	'500': 'f44336',
	'600': '000000',
	'700': 'd32f2f',
	'800': 'c62828',
	'900': 'b71c1c',
	'A100': 'ff8a80',
	'A200': 'ff5252',
	'A400': 'ff1744',
	'A700': 'd50000',
	'contrastDefaultColor': 'light', // whether, by default, text (contrast)
	// on this palette should be dark or light
	'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
	  '200', '300', '400', 'A100'
	],
	'contrastLightColors': undefined // could also specify this if default was 'dark'
});

/**** Declaring custom theme and extended "indigo" theme with hues ****/

$mdThemingProvider.theme('default')
	.primaryPalette('customPalette', {
	  'default': '400',
	  'hue-1': '100',
	  'hue-2': '600',
	  'hue-3': 'A100'
})
.accentPalette('cyan', {
  'default': '200'
})
.warnPalette('indigo', {
  'default': '500'
});

/**** declaring multiple themes ****/

$mdThemingProvider.theme('altTheme')
.primaryPalette('teal')

$mdThemingProvider.alwaysWatchTheme(true); // enable the default theme to be used across your entire application

// $mdThemingProvider.setDefaultTheme('altTheme'); // change the default theme to custom theme

});

app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'pages/home.html',
    controller  : 'HomeController'
  })

  .when('/about', {
    templateUrl : 'pages/about.html',
    controller  : 'AboutController'
  })

  .when('/works', {
    templateUrl : 'pages/works.html',
    controller  : 'WorksController'
  })

  .when('/videogames', {
    templateUrl : 'pages/videogames.html',
    controller  : 'VideogamesController'
  })

  .when('/experiments', {
    templateUrl : 'pages/experiments.html',
    controller  : 'ExperimentsController'
  })

  .when('/mixedmedia', {
    templateUrl : 'pages/mixedmedia.html',
    controller  : 'MixedmediaController'
  })

  .otherwise({redirectTo: '/'});
});

app.controller('HomeController', function($scope) {
  $scope.message = 'Welcome to my portfoil';
  unselectToolbarButtons();
});

app.controller('AboutController', function($scope) {
  $scope.message = 'Lorem ipsum dolor sit amet, an utroque sensibus torquatos quo, ne eam mundi sonet. Mea an habeo mandamus, his ad reque saepe prompta, ad prompta habemus nec. Duo ea munere legimus, in vis nibh debet iusto. Eu ius cetero sapientem assueverit, ullum viris ubique eu pro, sententiae signiferumque eu vim. Vero posse epicuri ut vel, eam ei tritani detracto.';
  toolbarBtns[0].classList.add('buttonFocus');
});

app.controller('WorksController', function($scope) {
  $scope.message = 'Lorem ipsum dolor sit amet, an utroque sensibus torquatos quo, ne eam mundi sonet. Mea an habeo mandamus, his ad reque saepe prompta, ad prompta habemus nec. Duo ea munere legimus, in vis nibh debet iusto. Eu ius cetero sapientem assueverit, ullum viris ubique eu pro, sententiae signiferumque eu vim. Vero posse epicuri ut vel, eam ei tritani detracto.';
  toolbarBtns[1].classList.add('buttonFocus');
});

app.controller('VideogamesController', function($scope) {
  $scope.message = 'Lorem ipsum dolor sit amet, an utroque sensibus torquatos quo, ne eam mundi sonet. Mea an habeo mandamus, his ad reque saepe prompta, ad prompta habemus nec. Duo ea munere legimus, in vis nibh debet iusto. Eu ius cetero sapientem assueverit, ullum viris ubique eu pro, sententiae signiferumque eu vim. Vero posse epicuri ut vel, eam ei tritani detracto.';
  toolbarBtns[2].classList.add('buttonFocus');
});

app.controller('ExperimentsController', function($scope) {
  $scope.message = 'Lorem ipsum dolor sit amet, an utroque sensibus torquatos quo, ne eam mundi sonet. Mea an habeo mandamus, his ad reque saepe prompta, ad prompta habemus nec. Duo ea munere legimus, in vis nibh debet iusto. Eu ius cetero sapientem assueverit, ullum viris ubique eu pro, sententiae signiferumque eu vim. Vero posse epicuri ut vel, eam ei tritani detracto.';
  toolbarBtns[3].classList.add('buttonFocus');
});

app.controller('MixedmediaController', function($scope) {
  $scope.message = 'Lorem ipsum dolor sit amet, an utroque sensibus torquatos quo, ne eam mundi sonet. Mea an habeo mandamus, his ad reque saepe prompta, ad prompta habemus nec. Duo ea munere legimus, in vis nibh debet iusto. Eu ius cetero sapientem assueverit, ullum viris ubique eu pro, sententiae signiferumque eu vim. Vero posse epicuri ut vel, eam ei tritani detracto.';
  toolbarBtns[4].classList.add('buttonFocus');
});


