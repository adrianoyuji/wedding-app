import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().integer(),
  image_url: Joi.string(),
  gifted: Joi.boolean(),
});

export default schema;
