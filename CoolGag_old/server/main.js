import request from 'request';
import url from 'url';

// This proxy filters traffic on paths with ‘/image’ and takes 2 required params:
// img = an image url
// user= a Meteor user id
WebApp.connectHandlers.use((req, res, next) => {
	//request = Meteor.npmRequire ‘request’
	//url = Meteor.npmRequire ‘url’
	// only process image urls
	if(url.parse(req.url, true).pathname == '/imageProxy') {
		queryData = url.parse(req.url, true).query

		if(queryData.imageSecret) {
			//userId = queryData.user
			var imageSecret = queryData.imageSecret;
			// check if user exists
			//u = Meteor.users.findOne _id: userId
			//return next() unless u?
			// pipe request to client
			var x = request('https://api.graph.cool/file/v1/cj7ltcl10045u0168nf1b0a44/' + imageSecret);
			req.pipe(x).pipe(res);
		} else {
			return next()
		}
	} else {
		return next();
	}
});
