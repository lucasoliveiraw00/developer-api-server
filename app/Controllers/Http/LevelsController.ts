import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Level from 'App/Models/Level'

import CreateLevel from 'App/Validators/CreateLevelValidator'
import UpdateLevel from 'App/Validators/UpdateLevelValidator'
import Developer from 'App/Models/Developer'
import slugify from 'slugify'

const configSlugify = {
  replacement: '-',
  remove: undefined,
  lower: true,
  strict: false,
  locale: 'vi',
  trim: true,
}

export default class LevelsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const search = request.input('search', '')
    const order = request.input('order', 'id')
    const sort = request.input('sort', 'desc')

    const levels = await Level.query()
      .withCount('developers', (query) => {
        query.whereNull('deleted_at').as('qtd_developers')
      })
      .where((query) => {
        query
          .orWhere('id', Number(search) || 0)
          .orWhere('level', 'like', `%${search}%`)
          .orWhere('slug', 'like', `%${search}%`)
      })
      .orderBy(order, sort)
      .paginate(page, perPage)

    return response.json(levels)
  }

  public async show({ request, response }: HttpContextContract) {
    const idLevel = request.param('id')
    const level = await Level.findOrFail(idLevel)
    return response.json(level)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateLevel)

    const slug = slugify(payload.level, configSlugify)

    const level = await Level.create({ ...payload, slug })

    if (!level.$isPersisted) return response.status(500).send({ message: 'Error ao criar nível.' })

    return response.status(201)
  }

  public async update({ request, response }: HttpContextContract) {
    const idLevel = request.param('id')
    const level = await Level.findOrFail(idLevel)

    const payload = await request.validate(UpdateLevel)

    const slug = slugify(payload.level, configSlugify)

    const changedLevel = await level.merge({ ...payload, slug }).save()

    if (!changedLevel.$isPersisted)
      return response.status(500).send({ message: 'Error ao alterar nível.' })

    return response.status(200)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const idLevel = request.param('id')
    const level = await Level.findOrFail(idLevel)
    const isLevel = await Developer.findBy('level_id', level.id)

    if (isLevel)
      return response
        .status(500)
        .send({ message: 'Nível não pode ser excluido, possui dados associado a este nível.' })

    const isPersisted = await level.softDelete()

    if (!isPersisted) return response.status(500).send({ message: 'Error ao excluir nível.' })

    return response.status(201)
  }

  public async list({ response }: HttpContextContract) {
    const levels = await Level.all()
    return response.json(levels)
  }
}
