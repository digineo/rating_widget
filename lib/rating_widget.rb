module RatingWidget
  
  class Engine < ::Rails::Engine
  end
  
  module ViewHelper
    def rating_input(tag_id, value, options={})
      options[:max] = 5
      select_tag tag_id, options_for_select(create_option_texts(options[:max]), value), :include_blank => true
    end
    
    def rating_display(value, max=5)
      rating_html = '<div class="ui-rating">'
      max.times { |i|
        value > i ? rating_html << '<div class="ui-rating-star ui-rating-full"></div>' : rating_html << '<div class="ui-rating-star ui-rating-empty"></div>'
      }
      rating_html << '</div>'
      rating_html.html_safe
    end
    
    def create_option_texts(max)
      option_texts = Hash.new
      max.times { |i|
        option_texts[I18n.t("rating.#{i+1}")] = i+1
      }
      option_texts
    end
  end
  
end

ActionView::Base.send :include, RatingWidget::ViewHelper