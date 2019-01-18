const express = require('express')
const router = express.Router();
// const routerRules =require('./user')

router.get('/', function (req, res ) {
	res.send('hello,express3')
})

// Object.keys(routerRules).forEach(v => {
//
// 	if(!routerRules[v])return ;
//
// 	if(routerRules[v].type == 'get'){
//
// 		router.get(v,routerRules[v].callBack);
//
// 	}else if(routerRules[v].type == 'post'){
//
// 		router.post(v,routerRules[v].callBack);
//
// 	}
//
// })
//
module.exports = router;