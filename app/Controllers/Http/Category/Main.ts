import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CreateCategoryValidator from 'App/Validators/Category/CreateCategoryValidator'
import UpdateCategoryValidator from 'App/Validators/Category/UpdateCategoryValidator'
import { DateTime } from 'luxon'


export default class Main {
  public async index({request}: HttpContextContract) {
    const {search = '', page = 1, per_page = 5} = request.qs()

    const categories = await Category.query().whereNull('deleted_at').where('name', 'ilike', `%${search}%`).paginate(page, per_page)

    return categories
  }

  public async store({request}: HttpContextContract) {
    const {name, description, is_active} = await request.validate(CreateCategoryValidator)

    const category = await Category.create({
      name,
      description,
      is_active
    })

    return category
  }

  public async show({}: HttpContextContract) {}

  public async update({request, params}: HttpContextContract) {
    const data = await request.validate(UpdateCategoryValidator)

    const category = await Category.findByOrFail('id', params.id)
    await category.merge(data).save()

    return category

  }

  public async destroy({params}: HttpContextContract) {
    const category = await Category.findByOrFail('id', params.id)
    category.deletedAt = DateTime.fromJSDate(new Date())

    await category.save()


    return category
  }
}
