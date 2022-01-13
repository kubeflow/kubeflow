# coding: utf-8
require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name    = "RNAWSCognito"
  s.version = package['version']
  s.requires_arc = true
  s.platforms = { :ios => "8.0" }
  s.license = { :file => 'LICENSE.txt' }
  s.homepage = "https://github.com/aws-amplify/amplify-js/tree/main/packages/amazon-cognito-identity-js"
  s.author = "Amazon"

  s.summary = "Amazon Cognito Identity SDK for JavaScript"
  s.description = <<-DESC
                    The Amazon Cognito Identity SDK for JavaScript allows JavaScript enabled applications to sign-up users, authenticate users, view, delete, and update user attributes within the Amazon Cognito Identity service.
                  DESC

  s.source = { :git => "https://github.com/aws/aws-amplify.git", :tag => "amazon-cognito-identity-js@#{s.version.to_s}" }
  s.source_files     = 'ios/**/*.{h,m,c}'
  s.dependency 'React-Core'
end
