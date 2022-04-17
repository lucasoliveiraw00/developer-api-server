import { rules, schema } from '@ioc:Adonis/Core/Validator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateLevelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number([rules.required()]),
    level: schema.string({ trim: true }, [
      rules.required(),
      rules.unique({
        table: 'levels',
        column: 'level',
        caseInsensitive: true,
        whereNot: {
          id: this.ctx.request.input('id') || 0,
        },
      }),
    ]),
  })

  public messages = {
    '*': (field, rule) => {
      return `${rule} erro de validação em ${field}`
    },
    'required': 'O campo {{ field }} é obrigatório.',
    'date.format': '{{ field }} deve ser formatado como {{ options.format }}',
    'unique': 'Já existe um valor com mesmo dado.',
    'level.unique': 'Já existe um nível com mesmo valor.',
  }
}
