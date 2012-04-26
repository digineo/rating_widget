Rating-Widget
============

Ruby On Rails helpers and assets for Ratings


Installation
------------

Gemfile:

    gem 'rating_widget', :git => 'git://github.com/digineo/rating_widget.git'

Add the supplied javascript to your asset pipeline (e. g. `/app/assets/javascripts/application.js`)

	//= require rating_widget

Please ensure the `rating_widget.js` is inserted at the bottom of your `<body>` element and jQuery is loaded before.


Usage for input
---------------

Just call the `rating_input` helper in any view to include a rating widget tag:

rating_input(tag_id, value, max_rating=5)
	
Parameters:
*	tag_id = The html-container-id for the rating-widget
*	value = the saved actual value of the rating-attribute in the model
*   max_rating (optional) = default is 5, can be overwritten by a number of stars
	
Example:
	
	rating_input("rating_#{mailing.id}", mailing.rating)
	
	
Javascript:
----------

Just use the rating-method on the select-tag which you have rendered with the above mentioned helper-method

Example:

	var rater = $(element).find('select');
	rater.rating({
	        uri: document.location.pathname + '/' + mailingId,
	        param: 'mailing[rating]'
	});

You have to pass two parameters for the rating-method:
*	uri = The PUT uri of the model to update the rating-attribute
* 	param = The qualified rating-attribute    
      

Locales:
--------

The option values and texts for the stars are generated with the definition in the application locales as the named context 'rating'

Example:

	de
      rating
        "1": sehr schlecht
		"2": schlecht
		"3": mittelmäßig
		"4": gut
		"5": sehr gut


Usage for displaying stars only
-------------------------------

Just call the `rating_display` helper in any view to include a rating widget tag to display the stars:

rating_display(value, max_rating=5)
	
Parameters:
*	value = the saved actual value of the rating-attribute in the model
*   max_rating (optional) = default is 5, can be overwritten by a number of stars
	
Example:
	
	rating_display(mailing.rating)
	
	
	
Copyright
---------

Copyright © 2012 [Digineo GmbH](http://www.digineo.de/), released under the MIT license.
