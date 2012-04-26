Rating-Widget
==========

Ruby On Rails helpers and assets for Ratings


Installation
------------

Gemfile:

    gem 'rating_widget', :git => 'git://github.com/digineo/rating_widget.git'

Add the supplied javascript to your asset pipeline (e. g. `/app/assets/javascripts/application.js`)

	//= require rating_widget

Please ensure the `rating_widget.js` is inserted at the bottom of your `<body>` element and jQuery is loaded before.


Usage
-----

Just call the `rating_tag` helper in any view to include insert a rating widget tag:

rating_tag(tag_id, option_texts, initial)
	
Parameters:
*	tag_id = The html-container-id for the rating-widget
*	option_texts = A hash with key as the option text and value as the count of rating stars
			   e.g.: {"sehr schlecht" => 1, "schlecht" => 2, "mittelmäßig" => 3, "gut" => 4, "sehr gut" => 5}
*	initial = The initial value of stars (dynamically from the model-attribute for the rating)
	
Example:
	
	rating_tag("rating_#{mailing.id}", {"sehr schlecht" => 1, "schlecht" => 2, "mittelmäßig" => 3, "gut" => 4, "sehr gut" => 5}, mailing.rating)
	
	
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



Copyright
---------

Copyright © 2012 [Digineo GmbH](http://www.digineo.de/), released under the MIT license.
