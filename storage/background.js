chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('main.html', {
	id: "mainwin",
    bounds: {
      'width': 400,
      'height': 500
    }
  });
});
