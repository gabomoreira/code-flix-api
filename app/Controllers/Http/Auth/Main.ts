import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class Main {

  public async store({request, auth}: HttpContextContract) {
    const {email, password} = request.all()

    const token = await auth.attempt(email, password, {
      expiresIn: '7 days'
    })

    const user = await User.findByOrFail('email', email)

    return {user, token}
  }



  public async destroy({auth}: HttpContextContract) {
    await auth.logout()
  }
}
