import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/User/CreateUserValidator'

export default class Main {
  public async index({}: HttpContextContract) {
    const users = await User.all()

    return users
  }

  public async store({ request }: HttpContextContract) {
    const { email, password, username } = await request.validate(CreateUserValidator)

    const user = await User.create({
      email,
      password,
      username,
    })

    return user
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
