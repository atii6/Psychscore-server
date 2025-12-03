import { DataTypes } from "sequelize";

export default (sequelize) => {
  const GeneratedReport = sequelize.define(
    "GeneratedReport",
    {
      assessment_id: { type: DataTypes.NUMBER, allowNull: false },
      template_id: { type: DataTypes.STRING, allowNull: true },
      report_content: { type: DataTypes.TEXT, allowNull: false },
      report_title: { type: DataTypes.STRING, allowNull: true },
      client_name: { type: DataTypes.STRING, allowNull: true },
      created_by_id: { type: DataTypes.STRING, allowNull: true },
      created_by: { type: DataTypes.STRING, allowNull: true },
      is_sample: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      createdAt: "created_date",
      updatedAt: "updated_date",
      tableName: "GeneratedReports",
    }
  );

  return GeneratedReport;
};
