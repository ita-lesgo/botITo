import Joi from 'joi';

export const createDayValidator = Joi.object({
  weekDay: Joi.number().min(1).max(6).messages({
    'number.min': 'O argumento deve ser maior ou igual a 1',
    'number.max': 'O argumento deve ser menor ou igual a 6',
    'number.base': 'O argumento deve ser um número',
  }),
});
