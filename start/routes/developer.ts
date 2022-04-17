import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('', 'LevelsController.index').as('index')
    Route.get('/:id', 'LevelsController.show').as('show')
    Route.post('', 'LevelsController.store').as('store')
    Route.put('/:id', 'LevelsController.update').as('update')
    Route.delete('/:id', 'LevelsController.destroy').as('destroy')
    Route.get('/list', 'LevelsController.list').as('list')
  })
    .prefix('/level')
    .as('level')
    .where('id', /^[0-9]+$/)
}).prefix('/api')
