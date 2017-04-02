# centria-project

Installation guide 

Please make sure you already have node and npm installed at your computer. 
If not please make it ready before going futher.


The project require two global packages for development environment, which are **gulp** and **browser-sync**. 
You can install it simple run 
```
npm install -g gulp browser-sync
```

When you finish installing global packages, please run mongodb server (default port 27017). Please keeping in mind the internet 
connection need to be running all the time. 

From now you can run the command ( you need to be at the project).
```
npm install
```

To initialize admin:
```
node ./app-api/libs/initAdmin.js
```

To initialize data (not mandatory):
```
node ./app-api/libs/initDb.js
```


then 

``` 
npm start
```  
If you have any question please let me know.
