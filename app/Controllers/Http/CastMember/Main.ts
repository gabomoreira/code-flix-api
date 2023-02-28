import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CastMember from 'App/Models/CastMember'
import CreateCastMemberValidator from 'App/Validators/CastMember/CreateCastMemberValidator'
import UpdateCastMemberValidator from 'App/Validators/CastMember/UpdateCastMemberValidator'
import { DateTime } from 'luxon'

export default class Main {
  public async index({ request }: HttpContextContract) {
    const { search = '', page = 1, per_page = 5 } = request.qs()

    const castMembers = await CastMember.query()
      .whereNull('deleted_at')
      .where('name', 'ilike', `%${search}%`)
      .where('type', 'ilike', `%${search}%`)
      .paginate(page, per_page)

    return castMembers
  }

  public async store({ request }: HttpContextContract) {
    const { name, type } = await request.validate(CreateCastMemberValidator)

    const castMember = await CastMember.create({
      name,
      type,
    })

    return castMember
  }

  public async show({ params }: HttpContextContract) {
    const castMember = await CastMember.findByOrFail('id', params.id)

    return castMember
  }

  public async update({ request, params }: HttpContextContract) {
    const data = await request.validate(UpdateCastMemberValidator)

    const castMember = await CastMember.findByOrFail('id', params.id)
    await castMember.merge(data).save()

    return castMember
  }

  public async destroy({ params }: HttpContextContract) {
    const castMember = await CastMember.findByOrFail('id', params.id)
    castMember.deletedAt = DateTime.fromJSDate(new Date())

    await castMember.save()

    return castMember
  }
}
