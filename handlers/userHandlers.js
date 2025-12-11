import models from "../models/index.js";
import bcrypt from "bcrypt";
import sanitizeUser from "../utils/sanitizeUsers.js";

export const createUser = async (data) => {
  const { full_name, email, password } = data;

  if (!full_name || !email || !password) {
    throw new Error("Full name, email and password are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // TODO sanitize or remove password
  return await models.User.create({
    ...data,
    password: hashedPassword,
  });
};

export const getAllUsers = async () => {
  return await models.User.findAll({
    attributes: { exclude: ["password"] },
  });
};

export const getUserById = async (id) => {
  const user = await models.User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateUser = async (id, data) => {
  const user = await models.User.findByPk(id);
  const { password, ...rest } = data;

  if (!user) {
    throw new Error("User not found");
  }

  let payload = { ...rest };

  if (password) {
    payload.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.update(payload);

  return sanitizeUser(updatedUser);
};

export const deleteUser = async (id) => {
  const user = await models.User.findByPk(id);

  if (!user) {
    throw new Error("User not found");
  }

  await user.destroy();
  return true;
};
