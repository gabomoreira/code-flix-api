const roleItemsTypes = ['ADMIN', 'CUSTOMER'] as const

type RoleType = (typeof roleItemsTypes)[number]

export { roleItemsTypes, RoleType }
