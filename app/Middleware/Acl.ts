import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Acl {
  public async handle({ auth, response }: HttpContextContract, next: any, allowedRoles: string[]) {
    const user = await auth.authenticate()
    // code for middleware goes here. ABOVE THE NEXT CALL
    if (!allowedRoles.includes(user.role)) {
      return response.status(400).json({ error: { message: 'Access denied!' } })
    }
    await next()
  }
}
