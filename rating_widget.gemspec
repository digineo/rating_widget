# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "rating_widget"
  s.version = '0.1.0'
  s.authors = ["Julian Kornberger"]
  s.email = ["jk+gemspec@digineo.de"]
  s.homepage = "https://github/digineo/rating_widget"
  s.summary = %q{ Ruby on Rails helpers and assets for rating widgets }

  s.files = `git ls-files`.split("\n")
  s.test_files = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.require_paths = ["lib"]
  
  s.add_runtime_dependency "rails"
  s.add_runtime_dependency "sass"

end
