# Load the Rails application.
require_relative 'application'

# Load in env variables from local file if it exists
require File.join(File.dirname(__FILE__), 'boot')

local_env = File.join(Rails.root, 'config', 'local_env.rb')
load(local_env) if File.exist?(local_env)

# Initialize the Rails application.
Rails.application.initialize!
