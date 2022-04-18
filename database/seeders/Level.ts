import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Level from 'App/Models/Level'

export default class LevelSeeder extends BaseSeeder {
  public async run() {
    await Level.createMany([
      {
        level: 'Junior',
        slug: 'junior',
      },
      {
        level: 'Pleno',
        slug: 'pleno',
      },
    ])
  }
}
