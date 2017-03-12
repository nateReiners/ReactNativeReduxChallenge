# REDDIT VIEWER

Reddit Viewer is a cross-platform React Native App for Android and iOS that fetches posts from the front page of reddit and displays information about each post. Clicking a post takes the user to a 'Post Details' page which shows the same basic information, plus time since posting.

![Screenshots](./RedditViewer/app/images/screenshots.png)

##TECHNOLOGIES

- React Native
- Redux

##TESTING INSTRUCTIONS

- Make sure you've followed the
[setup instructions](https://facebook.github.io/react-native/docs/getting-started.html) provided by our friends at Facebook.
- Clone this repo to your machine
- Navigate to RedditViewer in terminal and run 'npm install'
- Open the RedditViewer folder in Android Studio for Android testing or XCode for iOS testing
- type 'react-native run-android' or 'react-native run-ios' respectively in your terminal
- NOTE: If the emulator's time drifts more than a minute, you may have to reset it as I'm calculating time since posting using Date.now() upon loading the PostDetail component
