import Route from '@ioc:Adonis/Core/Route'

Route.resource('/categories', 'Category/Main').middleware({
  index: ['auth', 'acl:ADMIN,CUSTOMER'],
  store: ['auth', 'acl:ADMIN'],
  show: ['auth', 'acl:ADMIN,CUSTOMER'],
  update: ['auth', 'acl:ADMIN'],
  destroy: ['auth', 'acl:ADMIN'],
})
