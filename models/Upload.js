import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Upload = sequelize.define(
    "Upload",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      original_name: { type: DataTypes.STRING, allowNull: false },
      filename: { type: DataTypes.STRING, allowNull: false },
      mime_type: { type: DataTypes.STRING },
      size: { type: DataTypes.INTEGER },
      path: { type: DataTypes.STRING },
      url: { type: DataTypes.STRING },
      status: {
        type: DataTypes.ENUM("uploaded", "processing", "done", "failed"),
        defaultValue: "uploaded",
      },
      extracted_json: { type: DataTypes.JSONB, allowNull: true },
      raw_text: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      createdAt: "created_date",
      updatedAt: "updated_date",
      tableName: "Uploads",
    }
  );

  return Upload;
};
