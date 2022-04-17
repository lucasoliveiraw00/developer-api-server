import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DashboardController {
  public async show({ response }: HttpContextContract) {
    const data = await Database.query()
      .with('data', (query) => {
        query.from('developers').whereNull('deleted_at').count('* as qtd_developers')
        query.from('levels').whereNull('deleted_at').count('* as qtd_levels')
      })
      .select('*')
      .from('data')
      .first()

    const responseData = {
      qtd_developers: Number(data?.qtd_developers || 0),
      qtd_levels: Number(data?.qtd_levels || 0),
    }

    return response.json(responseData)
  }
}
