import { DataTypes } from "sequelize";

export default (sequelize) => {
  const ScoreDescriptor = sequelize.define(
    "ScoreDescriptor",
    {
      test_name: { type: DataTypes.STRING, allowNull: false },

      score_type: {
        type: DataTypes.ENUM("scaled", "composite", "standard"),
        allowNull: false,
      },
      min_score: { type: DataTypes.FLOAT, allowNull: false },
      max_score: { type: DataTypes.FLOAT, allowNull: false },
      descriptor: { type: DataTypes.STRING, allowNull: false },
      percentile_range: { type: DataTypes.STRING, allowNull: true },
      created_by_id: { type: DataTypes.STRING, allowNull: true },
      created_by: { type: DataTypes.STRING, allowNull: true },
      is_sample: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      createdAt: "created_date",
      updatedAt: "updated_date",
      tableName: "ScoreDescriptors",
    }
  );

  return ScoreDescriptor;
};
