

export default class TagUtils {
	static tagRegex = /(^|\s)(#[A-Za-zäöüßÄÖÜ\d-]+)/g
	static refRegex = /(^|\s)(@[A-Za-zäöüßÄÖÜ\d-]+)/g
	
	static findTagsAndRefs(string) {
		return {
			tags: TagUtils.findTags(string),
			refs: TagUtils.findRefs(string)
		}
	}
	
	static findTags(string) {
		return TagUtils.findAll(TagUtils.tagRegex, string);
	}
	static findRefs(string) {
		return TagUtils.findAll(TagUtils.refRegex, string);
	}
	
	static findAll(regex, string) {
		var match;
		
		var found = [];
		
		for(var match = regex.exec(string); match; match = regex.exec(string)) {
			found.push({
				text: match[2].substr(1),
				index: match.index,
				length: match[2].length
			});
		}
		Object.defineProperty(found, 'textList', {
			get: function() {
				var textList = [];
				for(var i = 0; i < this.length; i++) {
					textList.push(this[i].text);
				}
				return textList;
			}
		});
		return found;
	}
}