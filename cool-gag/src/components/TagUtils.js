import React from 'react';
import gql from 'react-apollo';

function replaceAll(string, find, replace) {
	let result = string;
	do {
		var previous = result;
		result = result.replace(find, replace);
	} while(result != previous);
	return result;
}

export default class TagUtils {
	static tagRegex = /(#[A-Za-zäöüßÄÖÜ\d-]+)/g;
	static refRegex = /(@[A-Za-zäöüßÄÖÜ\d-]+)/g;
	
	props = {
		
	};
	
	static genericTemplate = (<span>HELP!</span>);
	
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
				text: match[1].substr(1),
				index: match.index,
				length: match[1].length
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
	
	static splitByTagsAndRefs(string) {
		var tagsRefs = TagUtils.findTagsAndRefs(string);
		var sections = [];
		var createSections = (list, type) => {
			for(var i = 0; i < list.length; i++) {
				var index = list[i].index;
				var length = list[i].length;
				var section = {
					start: index,
					end: index + length,
					text: list[i].text,
					type: type
				};
				var inserted = false;
				for(var j = 0; j < sections.length; j++) {
					var other = sections[j];
					if(section.start < other.start) {
						sections.splice(j, 0, section);
						inserted = true;
						break;
					}
				}
				if(!inserted) {
					sections.push(section);
				}
			}
		};
		createSections(tagsRefs.tags, 'tag');
		createSections(tagsRefs.refs, 'ref');
		
		var result = [];
		if(sections.length > 0) {
			for(var i = 0; i < sections.length; i++) {
				var previousEnd = 0;
				if(i > 0) {
					previousEnd = sections[i - 1].end;
				}
				var previous = string.substring(previousEnd, sections[i].start);
				if(previous != '') {
					result.push({
						type: 'text',
						text: previous
					});
				}
				result.push({
					type: sections[i].type,
					text: sections[i].text
				});
			}
			var remaining = string.substring(sections[sections.length - 1].end, string.length);
			if(remaining != '') {
				result.push({
					type: 'text',
					text: remaining
				});
			}
		} else {
			if(string != '')  {
				result.push({
					type: 'text',
					text: string
				});
			}
		}
		
		return result;
	}
	
	
	static async requestTags(options) {
		console.log('before query', options.client);
		const tmp = await options.client.query({
			query: gql`
				query predefinedMemeQuery {
					allPredefinedMemes {
						name
						file {
							url
							secret
						}
					}
				}
			`
		});
		console.log('test');
		const result = await options.client.query({
			query: gql`
				query allTagsQuery{
					allTags{
						id,
						text,
						_postsMeta {count}
					}
				}
			`
		});
		console.log('after query');
		
		var tags = [];
		var tagCounts = [];
		
		for(var i = 0; i < result.length; i += 1) {
			var tag = result[i];
			var count = tag._postsMeta.count;
			if(count > 0) {
				var inserted = false;
				for(var k = 0; k < tagCounts.length; k += 1) {
					if(count > tagCounts[k]) {
						tags.splice(k, 0, tag.text);
						tagCounts.splice(k, 0, tag._postsMeta.count);
						inserted = true;
						break;
					}
				}
				if(!inserted) {
					tags.push(tag.text);
					tagCounts.push(tag._postsMeta.count);
				}
			}
		}
		
		// apply result
		if(options && typeof options.callback) {
			options.callback(tags);
		}
		return tags;
	}
	
	static mostUsed(allTags) {
		var tags = [];
		var tagCounts = [];
		
		for(var i = 0; i < allTags.length; i += 1) {
			var tag = allTags[i];
			var count = tag._postsMeta.count;
			if(count > 0) {
				var inserted = false;
				for(var k = 0; k < tagCounts.length; k += 1) {
					if(count > tagCounts[k]) {
						tags.splice(k, 0, tag.text);
						tagCounts.splice(k, 0, tag._postsMeta.count);
						inserted = true;
						break;
					}
				}
				if(!inserted) {
					tags.push(tag.text);
					tagCounts.push(tag._postsMeta.count);
				}
			}
		}
		return tags;
	}
}
