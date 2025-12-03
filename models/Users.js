import { DataTypes } from "sequelize";

export default (sequelize) => {
  const AppUser = sequelize.define(
    "AppUser",
    {
      role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      license_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      practice_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      report_table_theme_color: {
        type: DataTypes.ENUM(
          "neutral_gray",
          "soft_orange",
          "mint_green",
          "light_blue"
        ),
        defaultValue: "neutral_gray",
      },

      report_table_show_title: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      report_header_content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      report_footer_content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      report_font_family: {
        type: DataTypes.ENUM(
          "Times New Roman",
          "Arial",
          "Calibri",
          "Georgia",
          "Verdana"
        ),
        defaultValue: "Times New Roman",
      },

      use_ai_descriptors: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      createdAt: "created_date",
      updatedAt: "updated_date",
      tableName: "Users",
    }
  );

  return AppUser;
};
