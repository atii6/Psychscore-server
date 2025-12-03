import sequelize from "../config/sequelize.js";
import Assessment from "./Assessment.js";
import ReportTemplate from "./ReportTemplate.js";
import ScoreDescriptor from "./ScoreDescriptor.js";
import UserScoreDescriptor from "./UserScoreDescriptor.js";
import GeneratedReport from "./GeneratedReport.js";
import TestSubtestDefinition from "./TestSubtestDefinition.js";
import Upload from "./Upload.js";
import User from "./Users.js";

const models = {
  Assessment: Assessment(sequelize),
  ReportTemplate: ReportTemplate(sequelize),
  ScoreDescriptor: ScoreDescriptor(sequelize),
  UserScoreDescriptor: UserScoreDescriptor(sequelize),
  GeneratedReport: GeneratedReport(sequelize),
  TestSubtestDefinition: TestSubtestDefinition(sequelize),
  Upload: Upload(sequelize),
  User: User(sequelize),
};

models.sequelize = sequelize;

export default models;
