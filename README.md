# REDDIT VIEWER

Reddit Viewer is a cross-platform React Native App for Android and iOS that fetches posts from the front page of reddit and displays information about each post. Clicking a post takes the user to a 'Post Details' page which shows the same basic information, plus time since posting.

##TECHNOLOGIES

- React Native
- Redux

##TESTING INSTRUCTIONS

- Make sure you've followed the React Native 
[setup instructions](https://facebook.github.io/react-native/docs/getting-started.html) provided by our friends at Facebook.
- Clone this repo to your machine
- Navigate to RedditViewer in terminal and run `npm install`
- (Android Studio) 
    - Open the RedditViewer folder with Android Studio.
    - Check the event log. If prompted, __Add Root__ and also __Configure__ your Android framework.
    - Start an emulator.
- (XCode) 
    - In your terminal enter `react-native run-ios`.
- NOTE: If the emulator's time drifts more than a minute, change the emulators time to the current time using the emulator's UI should fix that. I'm using Date.now() upon loading the PostDetail component so the detail view will be unavailable if you 
