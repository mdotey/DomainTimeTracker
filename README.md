#Domain Time Tracker
###A Chrome extension that keeps track of your time on each domain.

##To install:

1. Download this repo

2. Unzip the downloaded folder

3. In the chrome browser go to **More tools** and then **Extensions**.

4. Turn on **Developer mode** by clicking the slider on the top right:
![extension dev mode](https://user-images.githubusercontent.com/6424086/40699649-6804e5c6-638a-11e8-8f68-2db3e6cdbf13.png)

5. Click **LOAD UNPACKED** near the top:
![extension load](https://user-images.githubusercontent.com/6424086/40699651-6996a28a-638a-11e8-9459-6e8bf4e05389.png)

6. Go to the location you unzipped the downloaded folder and select the **Build** folder.


##Known Bugs
- Clicking away from the Chrome window onto another non Chrome window will cause the last 
  visited domain to keep tracking time. The issue may be related to a known Chrome bug 
  involving chrome.windows.onFucusChanged event listener
