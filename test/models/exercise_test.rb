require 'test_helper'

class ExerciseTest < ActiveSupport::TestCase
  exercise = Exercise.new

  setup do
    exercise.name = 'Valid name'
    exercise.level = 'beg'
    exercise.primary_muscles = %w[shoulders lowerback traps]
    exercise.secondary_muscles = %w[triceps glutes]
    exercise.equipment = 'barbell'
    exercise.category = 'strength'
    exercise.instructions = ['Grab a barbell and add desired weight.',
                             'Curl the barbell to your face with both hands.', 'Make sure your elbows are tight at your sides.', 'Slowly lower the weight back to the starting position.']
  end

  test 'should save a valid exercise' do
    assert exercise.save, "Could not save a valid exercise, #{exercise.errors.full_messages}"
  end

  test 'should not save an exercise without a name' do
    exercise.name = nil
    assert_not exercise.save, 'Saved exercise with no name'
  end

  test 'should not save an exercise without a level' do
    exercise.level = nil
    assert_not exercise.save, 'Saved exercise with no level'
  end

  test 'should not save an exercise with an invalid level' do
    exercise.level = 'not adv'
    assert_not exercise.save, 'Saved exercise with invalid level'
  end

  test 'should not save an exercise with an invalid primary muscle' do
    exercise.primary_muscles.append('brain')
    assert_not exercise.save, 'Saved exercise with invalid primary muscle'
  end

  test 'should not save an exercise with an invalid secondary muscle' do
    exercise.secondary_muscles.append('brain')
    assert_not exercise.save, 'Saved exercise with invalid secondary muscle'
  end

  test 'should not save an exercise with an invalid category' do
    exercise.category = 'puzzle'
    assert_not exercise.save, 'Save exercise with invalid category'
  end
end
