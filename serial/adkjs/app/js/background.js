chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('comm.html#inlink',
     {
     	frame: 'custom', 
     	id: "mainwin",
     	bounds: {width: 343, height: 600}
     });
});
