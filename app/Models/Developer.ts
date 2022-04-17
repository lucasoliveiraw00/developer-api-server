import Level from './Level'
import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  BelongsTo,
  belongsTo,
  beforePaginate,
  ModelQueryBuilderContract,
} from '@ioc:Adonis/Lucid/Orm'

type DeveloperQuery = ModelQueryBuilderContract<typeof Developer>

export default class Developer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public sex: string

  @column()
  public birthDate: Date

  @column()
  public age: number

  @column()
  public hobby: string

  @column()
  public levelId: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  private static querySoftDelete(query: DeveloperQuery) {
    query.whereNull('deleted_at')
  }

  private static preloadLevel(query: DeveloperQuery) {
    query.preload('level')
  }

  public async softDelete() {
    this.deletedAt = DateTime.local()
    await this.save()
    return this.$isPersisted
  }

  @belongsTo(() => Level)
  public level: BelongsTo<typeof Level>

  @beforeFind()
  public static softDeletesFind = this.querySoftDelete

  @beforeFind()
  public static FindLevel = this.preloadLevel

  @beforeFetch()
  public static softDeletesFetch = this.querySoftDelete

  @beforeFetch()
  public static fetchLevel = this.preloadLevel

  @beforePaginate()
  public static softDeletePaginate([countQuery, query]: [DeveloperQuery, DeveloperQuery]) {
    countQuery.whereNull('deleted_at')
    query.whereNull('deleted_at')
  }
}
