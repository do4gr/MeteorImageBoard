import request from 'request';
import url from 'url';
import { HTTP } from 'meteor/http';


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
	
	constructor(parts) {
		var contents = parts.map(part => part.content);
		this.name = contents.join(' ');
		this.password = this.name;
		this.email = contents.join('') + '@example.org';
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
	
	name = '';
	password = '';
	email = '';
	
	toString() {
		return this.name;
	}
}

var arrayGetRandom = function() {
	return this[Math.floor(Math.random() * this.length)];
};

// Content Generator
WebApp.connectHandlers.use((req, res, next) => {
	
	const userNameParts = [
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
	userNameParts.getRandom = arrayGetRandom;
	
	const tags = ['funny', 'kittens', 'cute', 'hashtag', '']
	
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
	//	var index = -1;
	//	do {
	//		index = html.indexOf('href="http://i.imgur.com/', index + 1);
	//		if(index != -1) {
	//			endIndex = html.indexOf('"', index + 1 + 'href="http://i.imgur.com/'.length);
	//			var url = html.substring(index + 'href="'.length, endIndex);
	//			if(urls.indexOf(url) < 0) {
	//				urls.push(url);
	//			}
	//		}
	//	} while(index != -1);
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
	
	//request = Meteor.npmRequire ‘request’
	//url = Meteor.npmRequire ‘url’
	// only process image urls
	if(url.parse(req.url, true).pathname == '/admin/contentGenerator/run') {
		queryData = url.parse(req.url, true).query
		
		//userId = queryData.user
		var imageSecret = queryData.imageSecret;
		// check if user exists
		//u = Meteor.users.findOne _id: userId
		//return next() unless u?
		// pipe request to client
		//var x = request('http://i.imgur.com/bRkaW1U.jpg');
		//for(var key in HTTP.HTTP) {
		//	var type = typeof HTTP.HTTP[key];
		//	if(type != 'function') {
		//		console.log(key + ' (' + type + '): ' + HTTP.HTTP[key]);
		//	} else {
		//		console.log(key + ' (' + type + '): function(...) {...}');
		//	}
		//}
		
		var imageCount = 0;
		
		console.log('started to create users');
		
		var users = [];
		users.getRandom = arrayGetRandom;
		var userCount = 100;
		while(users.length < userCount) {
			var parts = [];
			var partCount = randomRange(3, 8);
			for(var k = 0; k < partCount; k++) {
				parts.push(userNameParts.getRandom());
			}
			if(User.isValid(parts)) {
				var user = new User(parts);
				console.log('-', user.name);
				users.push(user);
			}
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
		
		for(var i = 0; i < imageUrls.length; i++) {
			console.log('(' + i + ') ' + imageTitles[i] + ':', imageUrls[i]);
		}
		
		var x = HTTP.get('http://i.imgur.com/bRkaW1U.jpg');
		
		
		res.writeHead(200);
		res.end('Test');
		return 'nope';
	} else {
		return next();
	}
});