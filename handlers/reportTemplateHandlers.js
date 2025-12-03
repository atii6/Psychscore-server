import models from "../models/index.js";

export const createReportTemplate = async (data) => {
  const { template_name, test_type, template_content } = data;

  if (!template_name || !test_type || !template_content) {
    throw new Error("Template name, content and test type are required");
  }

  return await models.ReportTemplate.create(data);
};

export const getAllReportTemplates = async () => {
  return await models.ReportTemplate.findAll();
};

export const getReportTemplateById = async (id) => {
  const report = await models.ReportTemplate.findByPk(id);

  if (!report) {
    throw new Error("Report template not found");
  }

  return report;
};

export const updateReportTemplate = async (id, data) => {
  const report = await models.ReportTemplate.findByPk(id);

  if (!report) {
    throw new Error("Report template not found");
  }

  return await report.update(data);
};

export const deleteReportTemplate = async (id) => {
  const report = await models.ReportTemplate.findByPk(id);

  if (!report) {
    throw new Error("Report template not found");
  }

  await report.destroy();
  return true;
};
