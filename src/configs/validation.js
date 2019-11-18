// Import
const Joi = require("@hapi/joi");

// Schemas
module.exports = {
  customer: Joi.object({
    customer_firstname: Joi.string()
      .min(4)
      .max(30)
      .required(),
    customer_lastname: Joi.string()
      .min(4)
      .max(30)
      .required(),
    customer_address: Joi.string()
      .min(4)
      .max(50)
      .required(),
    customer_city: Joi.string()
      .min(4)
      .max(15)
      .required(),
    customer_email: Joi.string()
      .email()
      .required(),
    customer_phone: Joi.string()
      .regex(/\d/)
      .min(8)
      .max(15)
      .required(),
    user_id: Joi.string()
      .regex(/\d/)
      .required()
  }),
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
      .min(1)
      .max(1)
      .required()
  })
};
