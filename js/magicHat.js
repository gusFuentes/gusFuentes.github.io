var app = angular.module('App', ['ngMaterial', 'ngMdIcons', 'ngRoute']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog) {
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  $scope.closeSidenav = function(menuId) {
    $mdSidenav(menuId).close();
    removeMenuBtnCloseIcon();
  };
  
  $scope.showAdd = function(ev) {
    $mdDialog.show({
        controller: DialogController,
        template:'<md-dialog> <md-content> <h2 class="centered innerSectionSubtitle toLeft wf-loading">Contact</h2> <form action="https://formspree.io/gusfuentes1@gmail.com" method="POST"> <div layout="column"> <md-input-container flex> <input secondary type="text" name="name" placeholder="Name"> </md-input-container> <md-input-container flex><input type="email" name="_replyto" placeholder="E-mail"></md-input-container> <md-input-container flex><input type="text" name="message" placeholder="Message"></md-input-container> <md-input-container flex></md-input-container> <br /> <input type="submit" value="Send"> <input type="hidden" name="_next" value="thanks.html" /> </div> </form></md-content class="md-padding"> </md-dialog>',
        targetEvent: ev,
        clickOutsideToClose : true,
      })
  };
}]);

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
	'100': '900',
	'200': 'ef9a9a',
	'300': 'e57373',
	'400': 'ef5350',
	'500': '900',
	'600': '900',
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

  .when('/section_1', {
    templateUrl : 'pages/section_1.html',
    controller  : 'AboutController'
  })

  .when('/section_2', {
    templateUrl : 'pages/section_2.html',
    controller  : 'WorksController'
  })

  .when('/section_3', {
    templateUrl : 'pages/section_3.html',
    controller  : 'VideogamesController'
  })

  .when('/section_4', {
    templateUrl : 'pages/section_4.html',
    controller  : 'ExperimentsController'
  })

  .when('/section_5', {
    templateUrl : 'pages/section_5.html',
    controller  : 'MixedmediaController'
  })

  .otherwise({redirectTo: '/'});
});

app.controller('HomeController', function($scope) {
  $scope.message = 'Home';
  unselectToolbarButtons();
});

app.controller('AboutController', function($scope) {
  $scope.message = 'section_1';
  unselectToolbarButtons();
  toolbarBtns[0].classList.add('buttonFocus');
});

app.controller('WorksController', function($scope) {
  $scope.message = 'section_2';
  unselectToolbarButtons();
  toolbarBtns[1].classList.add('buttonFocus');
});

app.controller('VideogamesController', function($scope) {
  $scope.message = 'section_3';
  unselectToolbarButtons();
  toolbarBtns[2].classList.add('buttonFocus');
});

app.controller('ExperimentsController', function($scope) {
  $scope.message = 'section_4';
  unselectToolbarButtons();
  toolbarBtns[3].classList.add('buttonFocus');
});

app.controller('MixedmediaController', function($scope) {
  $scope.message = 'section_5';
  unselectToolbarButtons();
  toolbarBtns[4].classList.add('buttonFocus');
});


