var xservice = require('../index.js')

var client = xservice.servingClient('https://api2.yqfws.com/', '2', '839a591dc3dbdd41')

var req = {
    CityCode: null
}
client.invoke('BaseDest.GetCityDetail', req).then(rsp=>{
    console.log(rsp)
}).catch(err=>{
    console.log('error')
    console.error(err)
})
