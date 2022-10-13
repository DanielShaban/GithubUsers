# Search Github Users App

This is an application that helps to find users and their github followers using the github rest api

This application works only with Android. For Ios it needs to download pods.

## Run Locally

Clone the project

```bash
  git clone https://github.com/DanielShaban/GithubUsers
```

Go to the project directory

```bash
  cd GithubUserSearcher
```

Install dependencies

```bash
  yarn install
```

Start React-Native

```bash
  npx react-native start
```

run android simulator

```bash
  npx react-native run-android
```

## Limits
These limits are related to the github api, which gives a certain number of requests per hour (60). Moreover, effective analytics and visualization require loading a large number of followers at once, which takes 10 requests at once.
## Demo

https://user-images.githubusercontent.com/55671854/195504838-020bbd8c-10ac-49f3-8b49-4c1137f0dc77.mp4

## What technologies were used
- TypeScript
- React Navigation 6
- React Native Skia
- axios
- debounce