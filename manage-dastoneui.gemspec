require_relative "lib/manage/dastoneui/version"

Gem::Specification.new do |spec|
  spec.name        = "manage-dastoneui"
  spec.version     = Manage::Dastoneui::VERSION
  spec.authors     = ["liwuqi95"]
  spec.email       = ["wuqi.li@mail.utoronto.ca"]
  spec.homepage    = "https://github.com/fair-gz/manage-dastoneui"
  spec.summary = "Gem For CMS Management with CoreUI"
  spec.description = "Gem For CMS Management with CoreUI"
  spec.license     = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  spec.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = spec.homepage
  spec.metadata["changelog_uri"] = spec.homepage

  spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "rails", ">= 6.0.0"
end
