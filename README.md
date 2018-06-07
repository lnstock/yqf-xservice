# yqf-xservice
[![npm version](https://badge.fury.io/js/yqf-xservice.svg)](https://badge.fury.io/js/yqf-xservice)

安装
```
npm install yqf-xservice
```
示例
```javascript
var xservice = require('yqf-xservice')

var client = xservice.servingClient('url', 'app_key', 'app_secret')

var req = {
    CityCode: 'CNCAN'
}
client.invoke('BaseDest.GetCityDetail', req)
    .then(rsp => {
        console.log(rsp)
    }).catch(err => {
        console.error(err)
    })
```
```javascript
import xservice from 'yqf-xservice'

var client = xservice.servingClient('url', 'app_key', 'app_secret')

var req = {
    CityCode: 'CNCAN'
}
try {
    var rsp = await client.invoke('BaseDest.GetCityDetail', req)
    console.log(rsp)
} catch (e) {
    console.error(e);
}
```