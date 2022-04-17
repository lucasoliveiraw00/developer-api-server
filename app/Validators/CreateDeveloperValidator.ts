import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateDeveloperValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.required(),
      rules.unique({ table: 'developers', column: 'name', caseInsensitive: true }),
    ]),
    sex: schema.string.optional({ trim: true }),
    birth_date: schema.date({}, [rules.required()]),
    age: schema.number([rules.required()]),
    hobby: schema.string({}, [rules.required()]),
    level_id: schema.number([
      rules.required(),
      rules.exists({
        table: 'levels',
        column: 'id',
        where: {
          deleted_at: null,
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
    'name.unique': 'Já existe um nome com mesmo valor.',
  }
}
