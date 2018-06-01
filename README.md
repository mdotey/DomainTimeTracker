# Domain Time Tracker
### A Chrome extension that keeps track of your time on each domain written in ReactJS and Javascript.

## To install:

1. Download this repo.

2. Unzip the downloaded folder.

3. In the chrome browser go to **More tools** and then **Extensions**.

4. Turn on **Developer mode** by clicking the slider on the top right:
![extension dev mode](https://user-images.githubusercontent.com/6424086/40699649-6804e5c6-638a-11e8-8f68-2db3e6cdbf13.png)

5. Click **LOAD UNPACKED** near the top:
![extension load](https://user-images.githubusercontent.com/6424086/40699651-6996a28a-638a-11e8-9459-6e8bf4e05389.png)

6. Go to the location you unzipped the downloaded folder and select the **Build** folder 
   inside the master folder.

## Features:

The extension's popup window will tell you your total time on the domain you are currently on:
![popup](https://user-images.githubusercontent.com/6424086/40814963-3bac8ffa-64f8-11e8-9291-93903f9d9893.png)

The domain listing's page shows you all the domains you have visited and for how long.
You can clear a timer, stop a timer, or resume a timer on this page as well as in the settings.

![domain l](https://user-images.githubusercontent.com/6424086/40814911-e59437b2-64f7-11e8-897c-6b581333f8b8.png)

## Known Bugs:
- Clicking away from the Chrome window onto another non Chrome window will cause the last
  visited domain to keep tracking time. The issue may be related to a known Chrome bug
  involving chrome.windows.onFocusChanged event listener.
  
- This extension as of now does not save your times between Chrome sessions. This 
  functionality may be added in the future.
