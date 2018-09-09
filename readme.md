Route List

Name	            Path	           HTTP Verb	       Purpose
====================================================================================
INDEX(camps)  /campgrounds         GET        Show the list of Campground   
NEW           /campgrounds/new     GET        Show the formto create campgrounds    
CREATE        /campgrounds         POST       create a new camp
SHOW          /campgrounds/:id     GET        Show an especific campgroup  
Edit	        /campsground/:id/edit	GET	      Show edit form for one dog	
Update	/campsground/:id	PUT	Update particular campground, then redirect somewhere	
Destroy	/campsground/:id	DELETE	Delete a particular campground, then redirect somewhere	else.
