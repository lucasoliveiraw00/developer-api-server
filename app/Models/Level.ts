import Developer from './Developer'
import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  beforePaginate,
  hasMany,
  HasMany,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'

type LevelQuery = ModelQueryBuilderContract<typeof Level>

export default class Level extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public level: string

  @column()
  public slug: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  private static querySoftDelete(query: LevelQuery) {
    query.whereNull('deleted_at')
  }

  public async softDelete() {
    this.deletedAt = DateTime.local()
    await this.save()
    return this.$isPersisted
  }

  @beforeFind()
  public static softDeletesFind = this.querySoftDelete

  @beforeFetch()
  public static softDeletesFetch = this.querySoftDelete

  @beforePaginate()
  public static softDeletePaginate([countQuery, query]: [LevelQuery, LevelQuery]) {
    countQuery.whereNull('deleted_at')
    query.whereNull('deleted_at')
  }

  @hasMany(() => Developer)
  public developers: HasMany<typeof Developer>

  public serializeExtras() {
    if (this.$extras.qtd_developers)
      return {
        qtd_developers: Number(this.$extras.qtd_developers),
      }
  }
}
