const sanitizeUser = (user) => {
  const { password, ...rest } = user.dataValues;
  return rest;
};

export default sanitizeUser;
