require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test 'should create user' do
    assert_difference('User.count') do
      post users_url, params:
        { user:
            { email: "#{Random.rand(999_999)}@test.com",
              first_name: 'test',
              password: 'Password1',
              password_confirmation: 'Password1' } },
                      as: :json
    end

    assert_response :created
  end

  test 'should get index' do
    get users_url, as: :json
    assert_response :success
  end

  test 'should show user' do
    @user = User.find_by({ email: 'test@test.com' })

    get user_url(@user), as: :json
    assert_response :success
  end

  test 'should update user' do
    @user = User.find_by({ email: 'test@test.com' })

    patch user_url(@user),
          params: { user: {
            first_name: @user.first_name
          } }, as: :json
    assert_response :success
  end

  test 'should destroy user' do
    random_email = "#{Random.rand(999_999)}@test.com"

    @user = User.create({
                          first_name: 'test',
                          email: random_email,
                          password: 'Password1',
                          password_confirmation: 'Password1'
                        })

    assert_difference('User.count', -1) do
      delete user_url(@user), as: :json
    end

    assert_response :no_content
  end
end
