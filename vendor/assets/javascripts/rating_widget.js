//
// rating Plugin
// By Chris Richards
// Last Update: 6/21/2011
//
// Turns a select box into a star rating control.
//

//Keeps '$' pointing to the jQuery version
(function ($) {

  $.widget("ui.rating", {
    options: {
      showCancel: true,
      cancelValue: null,
      cancelTitle: "Cancel",
      startValue: null,
      disabled: false,
      
      // URI for updating the rating (string / function)
      uri: null,
      
      // name for the rating parameter (?rating=X)
      param: 'rating'
    },
  
    _create: function(){
      
      var self = this, element = this.element;
      
      // we only want to process single select
      if ('select-one' !== element[0].type) {
        return;
      }
      
      // don't process the same control more than once
      if (element.prop('hasProcessed')) {
        return;
      }
      
      // mark the element so we don't process it more than once.
      element.prop('hasProcessed', true);
    
      // hide the select box because we are going to replace it with our control
      element.hide();
      
      //
      // create the new HTML element
      //
      // create a div and add it after the select box
      elm = $("<div/>").prop({
        title: element.title,  // if there was a title, preserve it.
        className: "ui-rating"
      }).insertAfter( element );
    
      // create the cancel
      if (true == this.options.showCancel) {
        $("<a/>").prop({
          className: "ui-rating-cancel ui-rating-cancel-empty",
          title: this.options.cancelTitle
        }).appendTo(elm);
      }
    
      // create all of the stars
      $('option', element).each( function() {
        // only convert options with a value
        if(this.value!="") {
          $("<a/>").prop({
            className: "ui-rating-star ui-rating-empty",
            title: $(this).text(),   // perserve the option text as a title.
            value: this.value        // perserve the value.
          }).appendTo(elm);
        }
      });
      
      // perserve the selected value
      //
      if ( 0 !==  $('option:selected', element).size() ) {
        // methods.setValue(
        this._setValue( element.val(), elm );
      } else {
        //Use a start value if we have it, otherwise use the cancel value.
        val = null !== this.options.startValue ? this.options.startValue : this.options.cancelValue;
        this._setValue( val, elm, element );
        
        //Make sure the selectbox knows our desision
        self.val(val);
      }
    
      // Should we do any binding?
      if( true !== this.options.disabled && element.prop("disabled") !== true ) {
        // Bind our events to the container
        $(elm).bind("mouseover", this._hoverOver)
        .bind("mouseout", this._hoverOut)
        .bind("click", {}, function(event){
          self._click(event)
        });
      }
    
      // Update the stars if the selectbox value changes.
      element.bind("change", {
        "container": elm
      }, function(event){
        self._change(event)
      });
  
    },
    
    _hoverOver: function(event) {
      var elm = $(event.target);

      //Are we over the Cancel or the star?
      if( elm.hasClass("ui-rating-cancel") ) {
        elm.addClass("ui-rating-cancel-full");
      } else {
        elm.prevAll().andSelf()
        .not(".ui-rating-cancel")
        .addClass("ui-rating-hover");
      }
    },
    _hoverOut: function(event) {
      var elm = $(event.target);
      
      //Are we over the Cancel or the star?
      if( elm.hasClass("ui-rating-cancel") ) {
        elm.addClass("ui-rating-cancel-empty")
        .removeClass("ui-rating-cancel-full");
      } else {
        elm.prevAll().andSelf()
        .not(".ui-rating-cancel")
        .removeClass("ui-rating-hover");
      }
    },
    _click: function(event) {
      var elm = $(event.target);
      var value = this.options.cancelValue;
      
      //Are we over the Cancel or the star?
      if( elm.hasClass("ui-rating-cancel") ) {
        //Clear all of the stars
        this._empty(elm);
      } else {
        //Set us, and the stars before us as full
        elm.closest(".ui-rating-star").prevAll().andSelf()
        .not(".ui-rating-cancel")
        .prop("className", "ui-rating-star ui-rating-full");
        
        //Set the stars after us as empty
        elm.closest(".ui-rating-star").nextAll()
        .not(".ui-rating-cancel")
        .prop("className", "ui-rating-star ui-rating-empty");
        
        // Uncheck the cancel
        elm.siblings(".ui-rating-cancel")
        .css("visibility","")
        .prop("className", "ui-rating-cancel ui-rating-cancel-empty");
        
        //Use our value
        value = elm.attr("value");
      }
      
      //Set the select box to the new value
      if( !event.data.hasChanged ) {
        this.element.val( value ).trigger("change");
      }
    },
    _change: function(event) {
      var value = this.element.val();
      this._setValue(value, event.data.container);
      
      // Wenn die URI in den Options gesetzt ist, wird ein AJAX-Call zum Update des Models ausgeführt:
      if (null != this.options.uri) {
        $.ajax({
          type: 'PUT',
          url: this.options.uri + "?" + this.options.param + "=" + value,
          success: function(){
          },
          error: function(request){
            alert(request.responseText);
          }
        });
      }
    },
    
    _setValue: function(value, container) {
      //Set a new target and let the method know the select has already changed.
      var evt = {
        "target": null,
        "data": {}
      };
      
      if(value===''){
        evt.target = $(".ui-rating-cancel", container);
      } else {
        evt.target = $(".ui-rating-star[value="+ value +"]", container);
      }
      evt.data.hasChanged = true;
      this._click(evt);
    },
    _empty: function(elm) {
      // Clear all of the stars
      
      elm.prop("className", "ui-rating-cancel ui-rating-cancel-empty")
      .css("visibility","hidden")
      .nextAll().prop("className", "ui-rating-star ui-rating-empty");
    }
  });

})(jQuery);