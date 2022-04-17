import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Developer from 'App/Models/Developer'

export default class DeveloperSeeder extends BaseSeeder {
  public async run() {
    await Developer.createMany([
      {
        name: 'Lucas',
        sex: 'masculino',
        birthDate: new Date('1990-01-01'),
        age: 22,
        hobby: 'desenvolver software para comunidade',
        levelId: 1,
      },
      {
        name: 'João',
        sex: 'masculino',
        birthDate: new Date('1990-01-01'),
        age: 22,
        hobby: 'desenvolver software para comunidade',
        levelId: 1,
      },
    ])
  }
}
