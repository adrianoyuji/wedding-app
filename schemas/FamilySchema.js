import Joi from "joi";

const schema = Joi.object({
  family_name: Joi.string().required(),
  members: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      confirmed_attendance: Joi.boolean(),
      full_name: Joi.string(),
    })
  ),
});

export default schema;
