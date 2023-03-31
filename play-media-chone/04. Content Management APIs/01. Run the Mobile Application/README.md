# Run the Mobile Application

## Global Prerequisites

1. On your computer, clone the [https://github.com/Sitecore/Sitecore.Demo.CHONE](https://github.com/Sitecore/Sitecore.Demo.CHONE) GitHub repository on your computer.
2. Open an elevated PowerShell terminal.
3. Go to the mobile app project folder:
    - `cd .\play-media-native`
4. Install the NPM packages:
    - `npm install`

## Run on a Physical Phone

### Physical Phone Prerequisites

1. On the physical phone, open the iOS app store or Android play store.
2. Search for "Expo Go" and install it.

### Starting the PLAY! Media Development Server

On your computer:

1. Open an elevated PowerShell terminal.
2. Go to the mobile app project folder:
    - `cd .\play-media-native`
3. Start the Expo development server:
    - `npm start`

> **Note:** If you get an error saying "CommandError: ngrok tunnel took too long to connect.", you can retry the `npm start` command a few times. It might also help to disconnect from the VPN. If after multiple attempts, you are unable to get past that error, it is recommended to switch to running the mobile application on an Android emulator.

You should see a QR code in your PowerShell terminal.

### Starting the PLAY! Media Application on a Physical Android Phone

On your physical Android phone:

1. Open the "Expo Go" application.
2. Click the "Scan QR code" button.
3. If asked, allow the application to use your phone camera.
4. Point your phone to the QR code in your computer's PowerShell terminal.
    - The Expo development server will compile the application, send it to your phone, and your phone will open the application.

### Starting the PLAY! Media Application on a Physical iOS Phone

On your physical iOS phone:

1. Open your camera application.
2. Point your phone to the QR code in your computer's PowerShell terminal.
3. On the phone screen, click the "Open in Expo Go" button that appears near the QR code.
    - The Expo Go application will open on your phone.
    - The Expo development server will compile the application, send it to your phone, and your phone will open the application.

## Run on an Android Emulator

### Android Emulator Prerequisites

1. On your computer, download and install Android Studio from [https://developer.android.com/studio](https://developer.android.com/studio)
2. Validate the `adb` executable is in your PATH:
    1. Close all PowerShell terminals.
    2. Open an elevated PowerShell terminal.
    3. Type `adb` and hit Enter.
    4. If you are getting documentation for "Android Debug Bridge", continue to creating an Android virtual device.
    5. If you are getting an error:
        1. Add `C:\Users<your_username>\AppData\Local\Android\Sdk\platform-tools` to your `PATH` environment variable.
        2. Close all PowerShell terminals.
        3. Retry the `adb` command.
        4. If you are still getting an error, try rebooting your computer.
3. Create an Android virtual device:
    1. Open Android Studio.
    2. In the middle section of the Android Studio application, click the "More Actions" link.
    3. Choose "Virtual Device Manager".
    4. In the Device Manager, click on the top-left "Create device" button.
    5. In the "Select Hardware" screen, select a predefined phone (e.g.: Pixel 6) and click the Next button.

        > **Note:** The PLAY! Media application is not compatible with non-phone devices. It has not been tested on tablets, watches, desktops, TVs, and cars.

    6. In the "System Image" screen:
        1. Select the latest production operating system version (e.g.: Tiramisu).
        2. Click the small download icon button next to the operating system release name.
        3. In the "License Agreement" screen, select the "Accept" radio button, and click the Next button.
        4. In the "SDK Component Installer" screen, wait for the download and install to finish, then click the Finish button.
        5. Back in the "System Image" screen, click the Next button.
    7. In the "Android Virtual Device (AVD)" screen:
        1. Click the bottom-left "Show Advanced Settings" button.
        2. Scroll down to the "Camera" section.
        3. For both the front and back cameras, select the "Webcam0" or "Device" option for the emulator to use your computer webcam as the phone cameras.
        4. Click the "Finish" button.

### Starting the PLAY! Media Application on an Android Emulator

1. In the Android Studio device manager:
    1. Start your virtual device using the "play" triangle icon button next to it in the device list.
2. On your computer, in an elevated PowerShell terminal:
    1. Start the Expo development server for Android:
        - `npm run android`
    2. Type the "a" keyboard key to tell Expo to start the application on your Android emulator.
        - The Expo development server will install Expo Go on your Android emulator, compile the application, send it to your Android emulator, and your Android emulator will open the application.
