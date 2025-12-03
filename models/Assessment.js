import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Assessment = sequelize.define(
    "Assessment",
    {
      client_first_name: { type: DataTypes.STRING, allowNull: false },
      client_last_name: { type: DataTypes.STRING, allowNull: false },

      gender: {
        type: DataTypes.ENUM("female", "male", "nonbinary", "other"),
        allowNull: true,
      },
      date_of_birth: { type: DataTypes.DATEONLY, allowNull: true },
      subjective_pronoun: { type: DataTypes.STRING, allowNull: true },
      objective_pronoun: { type: DataTypes.STRING, allowNull: true },
      possessive_pronoun: { type: DataTypes.STRING, allowNull: true },
      test_date: { type: DataTypes.DATEONLY, allowNull: true },
      file_urls: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      extracted_scores: { type: DataTypes.JSONB, allowNull: true },
      status: {
        type: DataTypes.ENUM("uploaded", "processed", "report_generated"),
        defaultValue: "uploaded",
      },

      notes: { type: DataTypes.TEXT, allowNull: true },

      // Rater fields
      rater1_first_name: { type: DataTypes.STRING, allowNull: true },
      rater1_last_name: { type: DataTypes.STRING, allowNull: true },
      rater1_suffix: { type: DataTypes.STRING, allowNull: true },
      rater2_first_name: { type: DataTypes.STRING, allowNull: true },
      rater2_last_name: { type: DataTypes.STRING, allowNull: true },
      rater2_suffix: { type: DataTypes.STRING, allowNull: true },

      // Metadata
      created_by_id: { type: DataTypes.STRING, allowNull: true },
      created_by: { type: DataTypes.STRING, allowNull: true },
      is_sample: { type: DataTypes.BOOLEAN, defaultValue: false },

      external_id: { type: DataTypes.STRING, allowNull: true },
      user_id: { type: DataTypes.STRING, allowNull: true },
      client_email: { type: DataTypes.STRING, allowNull: true },

      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      createdAt: "created_date",
      updatedAt: "updated_date",
      tableName: "Assessments",
    }
  );

  return Assessment;
};
