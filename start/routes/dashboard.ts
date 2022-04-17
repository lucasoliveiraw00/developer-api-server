import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/dashboard', 'DashboardController.show').as('dashboard.show')
}).prefix('/api')
