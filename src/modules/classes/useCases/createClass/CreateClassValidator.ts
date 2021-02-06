import Joi from 'joi';

export const createClassSchema = Joi.object({
  sentRole: Joi.string()
    .required()
    .regex(/<(@&\d+)>/)
    .messages({
      'string.empty': 'O primeiro argumento é obrigatório',
      'any.required': 'O primeiro argumento é obrigatório',
      'string.pattern.base': 'O primeiro argumento deve ser um role',
    }),
  level: Joi.string()
    .required()
    .regex(/\b1\b|\b2\b/)
    .messages({
      'string.empty': 'O segundo argumento é obrigatório',
      'any.required': 'O segundo argumento é obrigatório',
      'string.pattern.base': 'O segundo argumento deve ser "1" ou "2"',
    }),
});
