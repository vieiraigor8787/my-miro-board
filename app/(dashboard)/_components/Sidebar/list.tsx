'use client'

import { useOrganizationList } from '@clerk/nextjs'
import { Item } from './item'

export const List = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const users = userMemberships.data

  if (!users?.length) return null

  return (
    <ul className="space-y-4">
      {users.map((user) => (
        <Item
          key={user.organization.id}
          id={user.organization.id}
          name={user.organization.name}
          imageUrl={user.organization.imageUrl}
        />
      ))}
    </ul>
  )
}
