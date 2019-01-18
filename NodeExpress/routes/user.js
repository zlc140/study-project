const express = require('express')
const router = express.Router();

router.get('/:name', function (req, res ) {
	res.render('user',{
		name: req.params.name
	})
	// res.send('hello,--' + req.params.name)
})
module.exports = router;
 const router3 = {
	'/': {
		type: 'get',
		callBack:function (req, res ) {
			res.send('hello,express2')
		}
	},
	'/:name' : {
		type: 'get',
		callBack: function (req, res ) {
			res.send('hello,--' + req.params.name)
		}
	}
}
// module.exports = router