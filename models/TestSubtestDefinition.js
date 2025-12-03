import { DataTypes } from "sequelize";

export default (sequelize) => {
  const TestSubtestDefinition = sequelize.define(
    "TestSubtestDefinition",
    {
      test_name: { type: DataTypes.TEXT, allowNull: false },
      test_aliases: { type: DataTypes.ARRAY(DataTypes.TEXT), defaultValue: [] },
      subtests: { type: DataTypes.JSONB, defaultValue: [] },
      subtest_placeholders: { type: DataTypes.JSONB, defaultValue: [] }, // fixed to match schema
      is_system_template: { type: DataTypes.BOOLEAN, defaultValue: false },
      created_by_id: { type: DataTypes.STRING, allowNull: true },
      created_by: { type: DataTypes.STRING, allowNull: true },
    },
    {
      createdAt: "created_date",
      updatedAt: "updated_date",
      tableName: "TestSubtestDefinitions",
    }
  );

  return TestSubtestDefinition;
};
