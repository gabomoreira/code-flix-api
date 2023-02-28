const castMemberItemsTypes = [1, 2] as const

type castMemberType = (typeof castMemberItemsTypes)[number]

export { castMemberItemsTypes, castMemberType }
