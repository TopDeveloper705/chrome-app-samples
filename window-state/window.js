// Variables:

var hiddenWindowDelay = 3000;
var fullscreenchangeCount = 0;
var fullscreenerrorCount = 0;
var newWindowOffset = 100;

// Helper functions
$ = function(selector) { return document.querySelector(selector); }

function createNewWindow(optionsDictionary, callback) {
  optionsDictionary = optionsDictionary || {};

  // Set new window to be offset from current window.
  var bounds = chrome.app.window.current().getBounds();
  bounds.left = (bounds.left + newWindowOffset) % (screen.width - bounds.width);
  bounds.top = (bounds.top + newWindowOffset) % (screen.height - bounds.height);
  optionsDictionary.left = bounds.left;
  optionsDictionary.top = bounds.top;
  optionsDictionary.width = bounds.width;
  optionsDictionary.height = bounds.height;

  chrome.app.window.create('window.html', optionsDictionary, callback);
};

function createNewWindowHidden(optionsDictionary) {
  optionsDictionary = optionsDictionary || {};
  optionsDictionary.hidden = true;
  createNewWindow(optionsDictionary,
    function (createdWindow) {
      setTimeout(function () { createdWindow.show(); }, hiddenWindowDelay);
    }
  );
}

// Log events:

var updateFulllscreenLabel = function updateFulllscreenLabel() {
  $('#html-fullscreen-label').innerText =
    fullscreenchangeCount + " change, " +
    fullscreenerrorCount + " error events.";
}
updateFulllscreenLabel();  // Initial text update.

document.onwebkitfullscreenchange = function () {
  fullscreenchangeCount++;
  console.log("onwebkitfullscreenchange");
  updateFulllscreenLabel();
}

document.onwebkitfullscreenerror = function () {
  fullscreenerrorCount++;
  console.log("onwebkitfullscreenerror");
  updateFulllscreenLabel();
}

// Button handlers:

$('#html-fullscreen-enter').onclick = function(e) {
  $('#fullscreen-area').webkitRequestFullscreen();
};

$('#html-fullscreen-exit').onclick = function(e) {
  document.webkitExitFullscreen();
};

$('#fullscreen').onclick = function(e) {
  setTimeout(chrome.app.window.current().fullscreen, $('#delay-slider').value);
};

$('#maximize').onclick = function(e) {
  setTimeout(chrome.app.window.current().maximize, $('#delay-slider').value);
};

$('#minimize').onclick = function(e) {
  setTimeout(chrome.app.window.current().minimize, $('#delay-slider').value);
};

$('#restore').onclick = function(e) {
  setTimeout(chrome.app.window.current().restore, $('#delay-slider').value);
};

$('#hide').onclick = function(e) {
  setTimeout(chrome.app.window.current().hide, $('#delay-slider').value);
};

$('#show').onclick = function(e) {
  setTimeout(chrome.app.window.current().show, $('#delay-slider').value);
};

var updateDelaySiderText = function updateDelaySiderText() {
  $('#delay-label').innerText = $('#delay-slider').value / 1000 + " seconds.";
}

$('#delay-slider').onchange = updateDelaySiderText;
updateDelaySiderText();  // Initial text update.

$('#newWindow').onclick = function(e) {
  createNewWindow();
};

$('#newWindowFullscreen').onclick = function(e) {
  createNewWindow({ state: 'fullscreen'});
};

$('#newWindowMaximized').onclick = function(e) {
  createNewWindow({ state: 'maximized'});
};

$('#newWindowMinimized').onclick = function(e) {
  createNewWindow({ state: 'minimized'});
};

$('#newWindowHidden').onclick = function(e) {
  createNewWindowHidden();
};

$('#newWindowFullscreenHidden').onclick = function(e) {
  createNewWindowHidden({ state: 'fullscreen'});
};

$('#newWindowMaximizedHidden').onclick = function(e) {
  createNewWindowHidden({ state: 'maximized'});
};

$('#newWindowMinimizedHidden').onclick = function(e) {
  createNewWindowHidden({ state: 'minimized'});
};

