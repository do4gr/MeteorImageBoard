// Click "EXAMPLE EVENT" to see whats in `event`
module.exports = function (event) {
  console.log(event.data)
  if(event.data.dummy != null)
  {
	  if(event.data.dummy == "upvote")
	  {
		  event.data.karmaPoints = event.data.karmaPoints + 5
	  }
 	   if(event.data.dummy == "downvote")
	  {
		  event.data.karmaPoints = event.data.karmaPoints - 5
 	 }
	  if(event.data.dummy == "comment")
 	 {
  		event.data.karmaPoints = event.data.karmaPoints + 2
 	 }
  }
  return {data: event.data}
}
