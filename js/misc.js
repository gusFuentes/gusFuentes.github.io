var toggles = $(".c-hamburger");
var sidenavMenuBtns = $(".sidenavButton");
var toolbarBtns = $(".toolbarBtn");

//Add circular menu Button Animation Handlers
(function() {

  "use strict";
  //Add handler to circular menu Button
  toggleHandler(toggles[0]);
  //Add handler to sidenav menu Buttons
  for (var i = sidenavMenuBtns.length - 1; i >= 0; i--) {
    var toggle = sidenavMenuBtns[i];
    toggleHandler(toggle);
  };

})();

function toggleHandler(toggle) {
  toggle.addEventListener( "click", function(e) {
    e.preventDefault();
    (toggles[0].classList.contains("is-active") === true) ? toggles[0].classList.remove("is-active") : toggles[0].classList.add("is-active");
  });
};

function removeMenuBtnCloseIcon() {
  toggles[0].classList.remove("is-active")
};

//Styles behaviour for toolbar text buttons
for (var i = toolbarBtns.length - 1; i >= 0; i--) {
  var buttonFocused = toolbarBtns[i];
  focusHandler(buttonFocused, i);
};

function focusHandler(buttonFocused, index) {
  buttonFocused.addEventListener( "click", function(e) {
    e.preventDefault();
    unselectToolbarButtons();
    toolbarBtns[index].classList.add('buttonFocus');
  });
}

function unselectToolbarButtons() {
  for (var i = toolbarBtns.length - 1; i >= 0; i--) {
    toolbarBtns[i].classList.remove('buttonFocus');
  };
}