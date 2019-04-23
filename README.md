## Run directly from xcode or build ipa or submit to app store

1. run following command to build js bundle and to copy assets

react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios

2. Edit schema and select Release
3. Run/Archive like normal ios App

## Run directly from Android Studio, create signed apk

1. run following command to build js bundle and to copy assets

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle

2. Open android studio and switch to release build Varient

3. Run/Create Signed apk like normal android App


### Run directly from Visual Studio to create signed apk

$ cd android && ./gradlew assembleRelease
# react-native-architecture
