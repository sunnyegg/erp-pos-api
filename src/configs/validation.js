// Import
const Joi = require("@hapi/joi");

// Schemas
module.exports = {
  user: Joi.object({
    user_name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    user_password: Joi.string()
      .min(5)
      .max(15)
      .required(),
    user_type: Joi.number()
      .max(1)
      .required()
  }),
  menu: Joi.object({
    menu_name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    menu_description: Joi.string()
      .min(5)
      .required(),
    menu_price: Joi.number().required(),
    menu_added_by: Joi.number().required()
  })
};
