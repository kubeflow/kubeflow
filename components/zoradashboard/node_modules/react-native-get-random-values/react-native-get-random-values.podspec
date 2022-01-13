require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-get-random-values"
  s.version      = package["version"]
  s.summary      = "getRandomValues for React Native"
  s.description  = "A small implementation of `getRandomValues` for React Native."
  s.homepage     = "https://github.com/LinusU/react-native-get-random-values"
  s.license      = "MIT"
  s.authors      = { "Linus Unnebäck" => "linus@folkdatorn.se" }
  s.platforms    = { :ios => "9.0", :tvos => "9.0", :osx => "10.14" }
  s.source       = { :git => "https://github.com/LinusU/react-native-get-random-values.git", :tag => "v#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React-Core"
end
