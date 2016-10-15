(function() {

  "use strict";

  var toggles = $(".c-hamburger");
  var closeMenuObjects = $(".sidenavButton");

  toggleHandler(toggles[0]);

  for (var i = closeMenuObjects.length - 1; i >= 0; i--) {
    var toggle = closeMenuObjects[i];
    toggleHandler(toggle);
  };

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      (toggles[0].classList.contains("is-active") === true) ? toggles[0].classList.remove("is-active") : toggles[0].classList.add("is-active");
    });
  }

})();


var toolbarBtns = $(".toolbarBtn");

for (var i = toolbarBtns.length - 1; i >= 0; i--) {
  var buttonFocused = toolbarBtns[i];
  focusHandler(buttonFocused, i);
};

function focusHandler(buttonFocused, index) {
  buttonFocused.addEventListener( "click", function(e) {
    e.preventDefault(); 

    for (var i = toolbarBtns.length - 1; i >= 0; i--) {
      toolbarBtns[i].classList.remove('buttonFocus');
    };

    toolbarBtns[index].classList.add('buttonFocus');
  });
}