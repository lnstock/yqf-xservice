var xservice = require('../index.js')

var client = xservice.servingClient('url', 'app_key', 'app_secret')

var req = {
    CityCode: 'CNCAN'
}
client.invoke('BaseDest.GetCityDetail', req).then(rsp=>{
    console.log('succes')
    console.log(rsp)
}).catch(err=>{
    console.log('error')
    console.error(err)
})
