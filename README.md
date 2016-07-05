# Appitizer app starter

### Clone
    git clone git@github.com:guard-systems/appitizer.git

### Install
    npm install -g cordova
    npm install -g browserify
    npm install

### Development
    (requires ‘npm install -g budo’)
    npm run dev

### Build
Add a platform (ref. ios, android)

    npm run build

## Release

### iOS

    cordova platform add ios

Xcode and Mac!
* archive build (Product > Archive)
* add to itunesconnect.apple.com

### Android
Before you do anything install android SDK - And build platforms

    cordova platform add android

    npm run android-release

Add newly generated FleetApp.apk to google play developer console
