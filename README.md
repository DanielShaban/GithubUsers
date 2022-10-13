Search Github Users App
This is an application that helps to find users and their github followers using the github rest api

This application works only with Android. For Ios it needs to download pods.

Run Locally
Clone the project

  git clone https://github.com/DanielShaban/GithubUsers
Go to the project directory

  cd GithubUserSearcher
Install dependencies

  yarn install
Start React-Native

  npx react-native start
run android simulator

  npx react-native run-android
Limits
These limits are related to the github api, which gives a certain number of requests per hour (60). Moreover, effective analytics and visualization require loading a large number of followers at once, which takes 10 requests at once.

Demo
Will be later

What technologies were used
TypeScript
React Navigation 6
React Native Skia
axios
debounce