import request from 'request';
import url from 'url';
import faker from 'faker';


function randomRange(start, end) {
	if(start == undefined && end == undefined) {
		start = 0;
		end = 1;
	} else if(start != undefined && end == undefined) {
		end = start;
		start = 0;
	}
	return Math.round(Math.random() * (end - start)) + start
}

class User {
	
	static userNameParts = (() => {var value = [
			{content: 'The', type:'article'},
			{content: 'The', type:'article'},
			{content: 'The', type:'article'},
			{content: 'The', type:'article'},
			
			{content: 'Of', type:'preposition'},
			{content: 'Of', type:'preposition'},
			{content: 'Of', type:'preposition'},
			{content: 'Of', type:'preposition'},
			
			{content: 'User', type:'noun'},
			{content: 'Master', type:'noun'},
			{content: 'Knight', type:'noun'},
			{content: 'T-Rex', type:'noun'},
			{content: 'Inflation', type:'noun'},
			{content: 'Universe', type:'noun'},
			{content: 'Madness', type:'noun', isAttribute: true},
			{content: 'Luck', type:'noun', isAttribute: true},
			{content: 'Destruction', type:'noun', isAttribute: true},
			
			//{content: 'Uber', type:'adjective'},
			{content: 'Super', type:'adjective'},
			{content: 'Holy', type:'adjective'},
			{content: 'Hyper', type:'adjective'},
			{content: 'Unlucky', type:'adjective'},
			{content: 'Lucky', type:'adjective'}
		];
		value.getRandom = arrayGetRandom;
		console.log('getRandom assigned');
		return value;
	})();
	
	name = '';
	password = '';
	email = '';
	
	
	constructor(parts) {
		var contents = parts.map(part => part.content);
		this.name = contents.join(' ');
		this.password = this.name;
		this.email = contents.join('') + '@example.org';
	}
	
	
	static generateRandom() {
		for(;;) {
			var parts = [];
			var partCount = randomRange(3, 15);
			for(var k = 0; k < partCount; k++) {
				parts.push(arrayGetRandom.call(User.userNameParts));
			}
			if(User.isValid(parts)) {
				return new User(parts);
			}
		}
	}
	
	static isValid(parts) {
		for(var i = 0; i < parts.length; i++) {
			var isFirst = i == 0;
			var isLast = i == parts.length - 1;
			var current = parts[i];
			switch(current.type) {
				case 'adjective':
				case 'article':
					var nounAfterwards = false;
					for(var k = i + 1; k < parts.length; k++) {
						if(parts[k].type == 'noun') {
							nounAfterwards = true;
							break;
						} else if(parts[k].type == 'adjective') {
							if(current.content == parts[k].content) {
								return false;
							}
						} else {
							break;
						}
					}
					if(!nounAfterwards) {
						return false;
					}
					break;
				case 'noun':
					if(!isLast && (parts[i+1].type == 'article' || parts[i+1].type == 'adjective')) {
						return false;
					}
					var nounBefore = null;
					for(var k = i - 1; k >= 0; k--) {
						if(parts[k].type == 'noun') {
							nounBefore = parts[k];
							break;
						}
					}
					var nounAfter = null;
					for(var k = i + 1; k <parts.length; k++) {
						if(parts[k].type == 'noun') {
							nounAfter = parts[k];
							break;
						}
					}
					if(nounBefore != null && nounAfter == null) {
						if(current.content == nounBefore.content || current.isAttribute && nounBefore.isAttribute) {
							return false;
						}
					} else if(nounBefore == null && nounAfter != null) {
						if(current.content == nounAfter.content || current.isAttribute && nounAfter.isAttribute) {
							return false;
						}
					} else if(nounBefore != null && nounAfter != null) {
						return false;
					}
					break;
				case 'preposition':
					if(isFirst || isLast) {
						return false;
					}
					if(parts[i+1].type != 'article') {
						var attributeAfterwards = false;
						for(var k = i + 1; k < parts.length; k++) {
							if(parts[k].type == 'noun') {
								attributeAfterwards = parts[k].isAttribute;
								break;
							} else if(parts[k].type != 'adjective') {
								break;
							}
						}
						if(!attributeAfterwards) {
							return false;
						}
					}
					break;
			}
		}
		return true;
	}
	
	toString() {
		return this.name;
	}
	
	
	create() {
		return null;
	}
}

var arrayGetRandom = function() {
	return this[Math.floor(Math.random() * this.length)];
};

// Content Generator
WebApp.connectHandlers.use((req, res, next) => {
	
	const tags = ['funny', 'kittens', 'cute', 'hashtag', ''];
	
	var addContainedUrls = function(html, urls, titles) {
		const imgurPattern = /<a class="title may-blank (outbound)?"[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/ig;
		const pagePattern = /"media-preview-content">[^<]*<a href="([^"]+)"[^>]*>/i;
		for (var match = imgurPattern.exec(html); match != null; match = imgurPattern.exec(html)) {
			var url = match[2];
			var title = match[3];
			if(url.indexOf('imgur.com') >= 0) {
				if(url.endsWith('gifv')) {
					url = null;
				} else if(url.indexOf('.') < 0) {
					url = null;
				}
			} else if(url.startsWith('/')) {
				var page = HTTP.get('https://www.reddit.com' + url);
				var pageMatch = page.content.match(pagePattern);
				if(pageMatch) {
					url = pageMatch[1];
				} else {
					url = null;
				}
			} else {
				url = null;
			}
			if(url != null && urls.indexOf(url) < 0) {
				urls.push(url);
				titles.push(title);
			}
		}
	}
	
	var findNextUrl = function(html) {
		var index = html.lastIndexOf('href="https://www.reddit.com/r/funny/?count=');
		if(index != -1) {
			var endIndex = html.indexOf('" rel="nofollow next"', index + 'href="https://www.reddit.com/r/funny/?count='.length);
			if(endIndex != -1) {
				return html.substring(index + 'href="'.length, endIndex).replace('&amp;', '&');
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
	
	var uploadFile = function(options) {
		var originalImage = HTTP.get(options.imageUrl);
		console.log(originalImage.headers['content-type']);
		let data = new FormData();
		data.append('data', {
			contentType: originalImage.headers['content-type'],
			filename: 'faked.jpg',
			data: originalImage.content
		}); // TODO: inser data
		var generated = data.generate();
		console.log('data generated');
		var response = HTTP.post(
			'https://api.graph.cool/file/v1/cj2ryvxmbt4qw0160y6qhdgdl',
			{
				headers: generated.headers,
				content: generated.body
			},
			function (error, result) {
				if (error) {
					console.log('Error when posting to Haven OnDemand :', error);
				} else if (result) {
					options.callback(JSON.parse(result.content));
				}
			}
		);
		//fetch('https://api.graph.cool/file/v1/cj2ryvxmbt4qw0160y6qhdgdl', {
		//	body: data,
		//	method: 'POST'
		//}).then((response) => {
		//	response.json().then(result => {
		//		if(typeof this.props.onUploaded == "function") {
		//			if(this.props.enableDescription) {
		//				result.description = this.state.description;
		//			}
		//			this.props.onUploaded(result);
		//		}
		//	});
		//}).catch((exception) => {
		//	// TODO: handle upload error
		//	console.log('error uploading the file!');
		//	this.setState({'isSubmitting': false});
		//});
	}
	
	//request = Meteor.npmRequire ‘request’
	//url = Meteor.npmRequire ‘url’
	// only process image urls
	if(url.parse(req.url, true).pathname == '/admin/contentGenerator/run') {
		queryData = url.parse(req.url, true).query
		
		//userId = queryData.user
		var imageSecret = queryData.imageSecret;
		
		var imageCount = 0;
		
		console.log(faker.lorem.words());
		
		console.log('started to create users');
		
		var users = [];
		users.getRandom = arrayGetRandom;
		
		var userCount = 5;
		while(users.length < userCount) {
			var user = User.generateRandom();
			users.push(user);
			console.log(user.name);
		}
		
		
		var imageUrls = [];
		var imageTitles = [];
		
		var redditUrl = 'https://www.reddit.com/r/funny/';
		
		while(imageUrls.length < imageCount && redditUrl != null) {
			var reddit = HTTP.get(redditUrl);
			addContainedUrls(reddit.content, imageUrls, imageTitles);
			redditUrl = findNextUrl(reddit.content);
			console.log('image count:', imageUrls.length);
			console.log('next:', redditUrl);
		}
		
		
		for(var i = 0; i < imageCount && i < imageUrls.length; i++) {
			var originalImageUrl = imageUrls[i];
			
			uploadFile({
				imageUrl: originalImageUrl,
				callback: (function(title, user, data) {
					console.log('file upload result:', data);
					var fileId = data.id;
				}).bind(this, title, user)
			});
			var title = imageTitles[i];
			var user = users.getRandom();
		}
		
		for(var i = 0; i < imageUrls.length; i++) {
			console.log('(' + i + ') ' + imageTitles[i] + ':', imageUrls[i]);
		}
		
		var x = HTTP.get('http://i.imgur.com/bRkaW1U.jpg');
		
		const client = new ApolloClient(meteorClientConfig());
		console.log('client:', client);
		
		//const schema = makeExecutableSchema({
		//	typeDefs,
		//	resolvers,
		//});
		//createApolloServer({
		//	schema,
		//});
		
		
		res.writeHead(200);
		res.end('Test');
		return 'nope';
	} else {
		return next();
	}
});

