require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'should not save a user without a first name' do
    user = User.new
    user.email = 'valid@email.com'
    user.password = 'Valid9password'
    user.password_confirmation = 'Valid9password'
    assert_not user.save, 'Saved user with no first name'
  end

  test 'should not save a user with a short first name' do
    user = User.new
    user.first_name = 'ab'
    user.email = 'valid@email.com'
    user.password = 'Valid9password'
    user.password_confirmation = 'Valid9password'
    assert_not user.save, 'Saved user with too short name'
  end

  test 'should not save a user with a long first name' do
    user = User.new
    user.first_name = 'abcdefghijklmnopqrstu'
    user.email = 'valid@email.com'
    user.password = 'Valid9password'
    user.password_confirmation = 'Valid9password'
    assert_not user.save, 'Saved user with too long name'
  end

  test 'should not save a user without an email' do
    user = User.new
    user.first_name = 'valid'
    user.password = 'Valid9password'
    user.password_confirmation = 'Valid9password'
    assert_not user.save, 'Saved user with no email'
  end

  test 'should not save a user with an invalid email' do
    user = User.new
    user.first_name = 'valid'
    user.email = 'invalid@email@fake.com'
    user.password = 'Valid9password'
    user.password_confirmation = 'Valid9password'
    assert_not user.save, 'Saved user with invalid email'
  end

  test 'should not save a user with a non-unique email' do
    user1 = User.new
    user1.first_name = 'valid'
    user1.email = "#{Random.rand(999_999)}@email.com"
    user1.password = 'Password1'
    user1.password_confirmation = 'Password1'

    user2 = User.new
    user2.first_name = 'alsovalid'
    user2.email = user1.email
    user2.password = 'Password2'
    user2.password_confirmation = 'Password2'

    user1.save
    assert_not user2.save, 'Saved user with non-unique email'
  end

  test 'should not save a user without a password' do
    user = User.new
    user.first_name = 'valid'
    user.email = 'valid@email.com'
    assert_not user.save, 'Saved user with no password'
  end

  test 'should not save a user when password confirmation does not match' do
    user = User.new
    user.first_name = 'valid'
    user.email = 'valid@email.com'
    user.password = 'Password1'
    user.password_confirmation = 'Password222'
    assert_not user.save, 'Saved user without a matching password confirmation'
  end

  test 'should default left_handed to false' do
    user = User.new
    assert_equal user.left_handed, false, 'Left_handed did not default to false'
  end

  test 'should default is_metric to false' do
    user = User.new
    assert_equal user.use_metric, false, 'Use_metric did not default to false'
  end
end
