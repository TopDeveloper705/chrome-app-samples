# Push Messaging Guestbook

Sample that shows how to use the [Push Messaging
API](http://developer.chrome.com/trunk/apps/pushMessaging.html) in an app.

How to install on your local machine:

* Download the [Google App Engine SDK for
  Python](https://developers.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python).
* Ensure that <code>dev\_appserver.py</code> is in your PATH
* Go to the [Developer Console](https://code.google.com/apis/console/), and request a "Client ID for Web Applications"
  using the " API Access" nav bar item, click on "Create an OAuth2 client ID".
* Use the "Web Application" type in the Create Client ID dialog.
* Use "localhost" for the URL.
* Click on "Edit settings" to edit the redirect URIs.
* Add <code>http://localhost:8080/oauth2callback</code> to the list of Redirect
  URIs for your Client ID (yes, http, not https for the sample.)
* Download JSON for your client ID, and save it in the path
  <code>$PROJECT\_ROOT/guestbook-srv/client\_secrets.json</code>.
* Click on the "Services" item on the left nav bar.
* Scroll down to "Google Cloud Messaging for Chrome", and turn it on.

## How to serve from your local machine: ##

    ~ cd $PROJECT_ROOT/guestbook-srv
    ~ dev_appserver.py .

## How to enable push messaging:

* Upload the app in <code>$PROJECT\_ROOT/guestbook-app</code> to the Chrome Web Store.
* Go to the Chrome Web Store, click the "gear" icon, and choose "Developer Dashboard".
* click "Add new item"
* Download it back to your browser, and click the icon to open the main window.
  it should have a message like "The last Guestbook message was".
* Don't launch the client app until the server is running, and you have done the startpush command in the browser.  It registers with the server.  If you do end up starting the client app too early, you can try first killling it from the chrome://extensions page, and if that doesn't work, you can restart the dev_appserver with the --clear_datastore argument.
* Navigate to <code>http://localhost:8080/startpush</code> and login with the account with push.  You should only have to do this once, not every time.
  message permission
* Now launch the push messaging sample app
* Send push messages <code>http://localhost:8080</code>
* You should now see the payload of the push message appear in the push guestbook app.

## APIs

* [Push Messaging API](http://developer.chrome.com/trunk/apps/pushMessaging.html)
* [Runtime](http://developer.chrome.com/trunk/apps/app.runtime.html)
* [Window](http://developer.chrome.com/trunk/apps/app.window.html)
