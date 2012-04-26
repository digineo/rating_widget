module RatingWidget
  
  class Engine < ::Rails::Engine
  end
  
  module ViewHelper
    def rating_input(tag_id, value, max_rating=5)
      select_tag tag_id, options_for_select(create_option_texts(max_rating), value), :include_blank => true
    end
    
    def rating_display(value, max_rating=5)
      rating_html = '<div class="ui-rating">'
      max_rating.times { |rating|
        attrs = { :class =>"ui-rating-star " }
        value > rating ? attrs[:class] << "ui-rating-full" : attrs[:class] << "ui-rating-empty"
        rating_html << content_tag("div", "", attrs)
      }
      rating_html << '</div>'
      rating_html.html_safe
    end
    
    def create_option_texts(max_rating)
      option_texts = {}
      max_rating.times.map { |rating|
        option_texts[I18n.t("rating.#{rating}")] = rating
      }
      option_texts
    end
  end
  
end

ActionView::Base.send :include, RatingWidget::ViewHelper