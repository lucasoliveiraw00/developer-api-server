import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Developer from 'App/Models/Developer'
import Database from '@ioc:Adonis/Lucid/Database'

import CreateDeveloper from 'App/Validators/CreateDeveloperValidator'
import UpdateDeveloper from 'App/Validators/UpdateDeveloperValidator'

export default class DevelopersController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const search = request.input('search', '')
    const order = request.input('order', 'id')
    const sort = request.input('sort', 'desc')

    const developers = await Database.modelQuery(Developer)
      .where((query) => {
        query
          .orWhere('id', Number(search) || 0)
          .orWhere('name', 'like', `%${search}%`)
          .orWhere('sex', 'like', `%${search}%`)
          .orWhere('hobby', 'like', `%${search}%`)
      })
      .orderBy(order, sort)
      .paginate(page, perPage)

    response.json(developers)
  }

  public async show({ request, response }: HttpContextContract) {
    const idDeveloper = request.param('id')
    const developer = await Developer.findOrFail(idDeveloper)
    response.json(developer)
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreateDeveloper)

    const developer = await Developer.create(payload)

    if (!developer.$isPersisted)
      return response.status(500).send({ message: 'Error ao criar desenvolvedor.' })

    return response.status(201)
  }

  public async update({ request, response }: HttpContextContract) {
    const idDeveloper = request.param('id')
    const developer = await Developer.findOrFail(idDeveloper)

    const payload = await request.validate(UpdateDeveloper)

    const changedDeveloper = await developer.merge(payload).save()

    if (!changedDeveloper.$isPersisted)
      return response.status(500).send({ message: 'Error ao alterar desenvolvedor.' })

    return response.status(200)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const idDeveloper = request.param('id')
    const developer = await Developer.findOrFail(idDeveloper)

    const isPersisted = await developer.softDelete()

    if (!isPersisted)
      return response.status(500).send({ message: 'Error ao excluir desenvolvedor.' })

    return response.status(201)
  }
}
