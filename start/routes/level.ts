import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('developer', 'DevelopersController')
    .where('id', /^[0-9]+$/)
    .apiOnly()
}).prefix('/api')
