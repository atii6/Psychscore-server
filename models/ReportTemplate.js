import { DataTypes } from "sequelize";

export default (sequelize) => {
  const ReportTemplate = sequelize.define(
    "ReportTemplate",
    {
      template_name: { type: DataTypes.STRING, allowNull: false },
      test_type: { type: DataTypes.STRING, allowNull: false },
      template_content: { type: DataTypes.TEXT, allowNull: false },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
      is_system_template: { type: DataTypes.BOOLEAN, defaultValue: false },
      category: {
        type: DataTypes.ENUM(
          "cognitive",
          "personality",
          "behavioral",
          "achievement",
          "neuropsychological",
          "self-report"
        ),
        allowNull: true,
      },
      available_placeholders: { type: DataTypes.JSONB, allowNull: true },
      created_by_id: { type: DataTypes.STRING, allowNull: true },
      created_by: { type: DataTypes.STRING, allowNull: true },
      is_sample: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_active_template: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      createdAt: "created_date",
      updatedAt: "updated_date",
      tableName: "ReportTemplates",
    }
  );

  return ReportTemplate;
};
