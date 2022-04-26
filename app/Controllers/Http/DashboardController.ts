import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DashboardController {
  public async show({ response }: HttpContextContract) {
    const developerData = await Database.query()
      .select()
      .from('developers')
      .whereNull('deleted_at')
      .count('* as qtd_developers')
      .first()

    const levelData = await Database.query()
      .select()
      .from('levels')
      .whereNull('deleted_at')
      .count('* as qtd_levels')
      .first()

    const responseData = {
      qtd_developers: Number(developerData?.qtd_developers || 0),
      qtd_levels: Number(levelData?.qtd_levels || 0),
    }

    return response.json(responseData)
  }
}
