module RatingWidget
  
  class Engine < ::Rails::Engine
  end
  
  module ViewHelper
    def rating_tag(tag_id, option_texts, initial)
      select_tag tag_id, options_for_select(option_texts, initial), :include_blank => true
    end
  end
  
end

ActionView::Base.send :include, RatingWidget::ViewHelper