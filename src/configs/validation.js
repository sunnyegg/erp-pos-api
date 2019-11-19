// Import
const Joi = require("@hapi/joi");

// Schemas
module.exports = {
  user_register: Joi.object({
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
      .max(2)
      .required()
  }),
  user_login: Joi.object({
    user_name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    user_password: Joi.string()
      .min(5)
      .max(15)
      .required()
  }),
  menu_add: Joi.object({
    menu_name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    menu_description: Joi.string()
      .min(5)
      .allow("")
      .optional(),
    menu_category: Joi.number()
      .max(10)
      .required(),
    menu_price: Joi.number()
      .min(500)
      .required(),
    menu_quantity: Joi.number().required(),
    menu_added_by: Joi.number().required(),
    menu_updated_by: Joi.number().required()
  }),
  menu_edit: Joi.object({
    menu_name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    menu_description: Joi.string()
      .min(5)
      .allow("")
      .optional(),
    menu_category: Joi.number()
      .max(10)
      .required(),
    menu_price: Joi.number()
      .min(500)
      .required(),
    menu_quantity: Joi.number().required(),
    menu_updated_by: Joi.number().required()
  }),
  order_add: Joi.object({
    order_table: Joi.number().required(),
    order_menu_id: Joi.number().required(),
    order_description: Joi.string()
      .allow("")
      .optional(),
    order_quantity: Joi.number().required(),
    order_added_by: Joi.number().required(),
    customer_id: Joi.number().required()
  }),
  order_edit: Joi.object({
    order_table: Joi.number().required(),
    order_menu_id: Joi.number().required(),
    order_description: Joi.string()
      .allow("")
      .optional(),
    order_quantity: Joi.number().required(),
    customer_id: Joi.number().required()
  })
};
