class Exercise
  include ActiveModel::Validations
  include Mongoid::Document
  include Mongoid::Timestamps

  MUSCLE_GROUPS = %w[shoulders chest quadriceps calves glutes hamstrings
                     abdominals adductors biceps forearms abductors
                     triceps lowerback traps middleback lats neck]

  field :name, type: String
  validates :name,
            presence: {
              message: 'An exercise name is required'
            }

  field :level, type: String
  validates :level,
            presence: {
              message: 'A level is required'
            },
            inclusion: {
              in: %w[beg int adv],
              message: 'A level must be beg, int, or adv'
            }

  field :primary_muscles, type: Array
  validates :primary_muscles,
            inclusion: {
              in: MUSCLE_GROUPS,
              message: 'Not a valid primary muscle'
            }

  field :secondary_muscles, type: Array
  validates :secondary_muscles,
            inclusion: {
              in: MUSCLE_GROUPS,
              message: 'Not a valid secondary muscle'
            }

  field :equipment, type: String

  field :category, type: String
  validates :category,
            inclusion: {
              in: %w[strength stretching plyometrics strongman powerlifting
                     cardio olympic_weightlifting],
              message: 'Not a valid category'
            }

  field :instructions, type: Array
end
