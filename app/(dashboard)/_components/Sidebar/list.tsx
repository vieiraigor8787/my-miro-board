'use client'

import { useOrganizationList } from '@clerk/nextjs'
import React from 'react'

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
        <p className="" key={user.id}>
          {user.organization.name}
        </p>
      ))}
    </ul>
  )
}
