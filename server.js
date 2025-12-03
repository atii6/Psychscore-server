import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/sequelize.js";
// import assessmentRoutes from "./routes/assessmentRoute.js";
// import generateReportRoutes from "./routes/generatedReportRoute.js";
// import reportTemplateRoutes from "./routes/reportTemplateRoute.js";
// import scoreDescriptorRoutes from "./routes/scoreDescriptorRoute.js";
// import testSubtestDefinitionRoute from "./routes/testSubtestDefinitionRoute.js";
// import userScoreDescriptorRoute from "./routes/userScoreDescriptorRoute.js";
// import uploadFileRoute from "./routes/uploadFileRoute.js";
// import extractFileRoute from "./routes/extractFileRoute.js";
// import userRoute from "./routes/userRoute.js";
// import authRoute from "./routes/authRoute.js";
// import { API_ROUTES } from "./utils/constants.js";
// import cookieParser from "cookie-parser";
// import { auth } from "./middleware/auth.js";

dotenv.config();

console.log(process.env.CLIENT_URL);

const app = express();
app.use((req, res, next) => {
  process.env.CLIENT_URL;
  console.log("➡️  Request:", req.method, req.originalUrl);
  console.log("🌐 Origin:", req.headers.origin);

  next();
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    // credentials: true,
  })
);
// app.use(cookieParser());
// app.use(express.json());
// app.use(API_ROUTES.ASSESSMENT, auth, assessmentRoutes);
// app.use(API_ROUTES.GENERATED_REPORT, auth, generateReportRoutes);
// app.use(API_ROUTES.REPORT_TEMPLATE, auth, reportTemplateRoutes);
// app.use(API_ROUTES.SCORE_DESCRIPTOR, auth, scoreDescriptorRoutes);
// app.use(API_ROUTES.TEST_SUBTEST_DEFINITION, auth, testSubtestDefinitionRoute);
// app.use(API_ROUTES.USER_SCORE_DESCRIPTOR, auth, userScoreDescriptorRoute);
// app.use(API_ROUTES.UPLOAD_FILE, auth, uploadFileRoute);
// app.use(API_ROUTES.EXTRACT_FILE, auth, extractFileRoute);
// app.use(API_ROUTES.USER, auth, userRoute);
// app.use(API_ROUTES.AUTH, authRoute);

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error(err));

sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error(err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
