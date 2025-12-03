import { DataTypes } from "sequelize";

export default (sequelize) => {
  const UserScoreDescriptor = sequelize.define(
    "UserScoreDescriptor",
    {
      score_type: {
        type: DataTypes.ENUM("standard", "scaled"),
        allowNull: false,
      },
      min_score: { type: DataTypes.FLOAT, allowNull: false },
      max_score: { type: DataTypes.FLOAT, allowNull: false },
      descriptor: { type: DataTypes.STRING, allowNull: false },
      percentile_range: { type: DataTypes.STRING, allowNull: true },
      clinical_interpretation: { type: DataTypes.TEXT, allowNull: true },
      created_by_id: { type: DataTypes.STRING, allowNull: true },
      created_by: { type: DataTypes.STRING, allowNull: true },
      is_sample: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      createdAt: "created_date",
      updatedAt: "updated_date",
      tableName: "UserScoreDescriptors",
    }
  );

  return UserScoreDescriptor;
};
