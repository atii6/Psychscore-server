import models from "../models/index.js";

export const createGeneratedReport = async (data) => {
  const { assessment_id, report_content } = data;

  if (!assessment_id || !report_content) {
    throw new Error("Assessment ID and report content are required");
  }

  return await models.GeneratedReport.create(data);
};

export const getAllGeneratedReports = async () => {
  return await models.GeneratedReport.findAll();
};

export const getGeneratedReportById = async (id) => {
  const report = await models.GeneratedReport.findByPk(id);

  if (!report) {
    throw new Error("Generated report not found");
  }

  return report;
};

export const updateGeneratedReport = async (id, data) => {
  const report = await models.GeneratedReport.findByPk(id);

  if (!report) {
    throw new Error("Generated report not found");
  }

  return await report.update(data);
};

export const deleteGeneratedReport = async (id) => {
  const report = await models.GeneratedReport.findByPk(id);

  if (!report) {
    throw new Error("Generated report not found");
  }

  await report.destroy();
  return true;
};
