class User
  include ActiveModel::Validations
  include ActiveModel::SecurePassword
  include Mongoid::Document
  include Mongoid::Timestamps

  VALID_EMAIL_REGEXP = URI::MailTo::EMAIL_REGEXP

  has_secure_password
  after_initialize :set_defaults

  field :first_name, type: String
  validates :first_name,
            presence: {
              message: 'Please enter a name'
            },
            length: {
              minimum: 3,
              maximum: 20,
              message: 'Please enter a name between 3 and 20 characters'
            }

  field :email, type: String
  validates :email,
            presence: {
              message: 'Please enter an email'
            },
            uniqueness: {
              message: 'That email is already registered'
            },
            format: {
              with: VALID_EMAIL_REGEXP,
              message: 'Please enter a valid email'
            }

  field :password_digest, type: String
  validates :password_digest,
            presence: true,
            length: {
              minimum: 6,
              maximum: 255
            }

  field :left_handed, type: Boolean
  field :use_metric, type: Boolean

  private

  def set_defaults
    self.left_handed = false if left_handed.nil?
    self.use_metric = false if use_metric.nil?
  end
end
