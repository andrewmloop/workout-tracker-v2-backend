require 'test_helper'

class ExercisesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @exercise = Exercise.new
    @exercise.name = 'Test Exercise 1'
    @exercise.level = 'beg'
    @exercise.primary_muscles = %w[shoulders chest]
    @exercise.secondary_muscles = %w[lowerback traps]
    @exercise.equipment = 'barbell'
    @exercise.category = 'powerlifting'
    @exercise.instructions = [
      'Stand with barbell on your front shoulders.',
      'Press barbell above your head',
      'Return barbell to starting position'
    ]
  end

  test 'should get index' do
    get exercises_url, as: :json
    assert_response :success
  end

  # test 'should create exercise' do
  #   assert_difference('Exercise.count') do
  #     post exercises_url,
  #          params: {
  #            exercise:
  #              {
  #                category: @exercise.category,
  #                equipment: @exercise.equipment,
  #                instructions: @exercise.instructions,
  #                level: @exercise.level,
  #                name: @exercise.name,
  #                primary_muscles: @exercise.primary_muscles,
  #                secondary_muscles: @exercise.secondary_muscles
  #              }
  #          }, as: :json
  #   end

  #   assert_response :created
  # end

  # test 'should show exercise' do
  #   get exercise_url(@exercise), as: :json
  #   assert_response :success
  # end

  # test 'should update exercise' do
  #   patch exercise_url(@exercise),
  #         params: { exercise: { category: @exercise.category, equipment: @exercise.equipment, instructions: @exercise.instructions, level: @exercise.level, name: @exercise.name, primary_muscles: @exercise.primary_muscles, secondary_muscles: @exercise.secondary_muscles } }, as: :json
  #   assert_response :success
  # end

  # test 'should destroy exercise' do
  #   assert_difference('Exercise.count', -1) do
  #     delete exercise_url(@exercise), as: :json
  #   end

  #   assert_response :no_content
  # end
end
