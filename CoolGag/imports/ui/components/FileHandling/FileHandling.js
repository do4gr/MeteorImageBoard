

export default class FileHandling {
	static getDataUrl(file, callback) {
		var reader = new FileReader();
		// TODO: handle errors
		if(typeof callback == 'function') {
			reader.addEventListener("load", () => {
				callback(reader.result);
			}, false);
		}
		
		reader.readAsDataURL(file);
	}
	
	// used to create submittable content from an image url
	// see: https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
	static dataURItoBlob(dataURI, options) {
		// convert base64/URLEncoded data component to raw binary data held in a string
		var byteString;
		var parts = dataURI.split(',');
		if (parts[0].indexOf('base64') >= 0)
			byteString = atob(parts[1]);
		else
			byteString = unescape(parts[1]);

		// separate out the mime component
		var mimeString = parts[0].split(':')[1].split(';')[0];

		// write the bytes of the string to a typed array
		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ia], {type:mimeString});
	}
}