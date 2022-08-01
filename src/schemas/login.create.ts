import Joi from 'joi';

const loginCreate = Joi.object({
  username: Joi.string()
    .required()
    .messages({
      'any.required': '400|"username" is required',
      'string.base': '422|"username" must be a string',
    }),

  password: Joi.string()
    .required()
    .messages({
      'any.required': '400|"password" is required',
      'string.base': '422|"password" must be a string',
    }),
});

export default loginCreate;
