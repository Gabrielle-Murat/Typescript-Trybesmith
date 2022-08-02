import Joi from 'joi';

const orderCreate = Joi.object({
  productsIds: Joi.array()
    .items(Joi
      .number()
      .required())
    .required()
    .messages({
      'any.required': '400|"productsIds" is required',
      'array.base': '422|"productsIds" must be an array',
      'array.items': '422|"productsIds" must include only numbers',
      'array.includesRequiredUnknowns': '422|"productsIds" must include only numbers',
    }),
});

export default orderCreate;
