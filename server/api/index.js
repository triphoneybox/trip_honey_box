// <project root>/api/index.js
const express = require('express')
const axios = require('axios')
// express 인스턴스 생성
const app = express()
const myCache = new NodeCache( { stdTTL: 60 } )

// 실제로는 /api 라우트를 처리하는 메소드가 된다.
app.get('/', function(req, res) {
  console.log('root call')
  res.send('root API')
})

app.get('/user/:id', function(req, res) {
  console.log('userapi:', req.params.id)
  const value = myCache.get(req.params.id);
  if ( value !== undefined ){
      // handle miss!
      const now = Math.floor(new Date().getTime() / 1000)
      const ttl = Math.floor(myCache.getTtl( req.params.id ) / 1000)
      // console.log('cache===', value)
      console.log('ttl===', myCache.getTtl( req.params.id ))
      console.log(now)
      console.log(ttl - now )
      // console.log(myCache)
      res.send({...value, ttl:ttl - now} )
  } else {
    axios({
      method : 'get',
      url : `https://jsonplaceholder.typicode.com/users/${req.params.id}`
    }).then(({data})=>{
      myCache.set( req.params.id, data )
      res.send(data)
    }).catch(e => {
      console.log(e)
      res.send(e)
    })
  }
})
// 모듈로 사용할 수 있도록 export
// 앱의 /api/* 라우트로 접근하는 모든 요청은 모두 app 인스턴스에게 전달된다.
module.exports = {
  path: '/api',
  handler: app
}