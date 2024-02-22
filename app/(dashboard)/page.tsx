'use client'

import { useOrganization } from '@clerk/nextjs'

import { EmptyOrg } from './_components/empty-org'

const DashboardPage = () => {
  const { organization } = useOrganization()

  return (
    <div className="flex-1 h-[calc(100%-80px)]">
      {!organization ? <EmptyOrg /> : <p>Lista</p>}
    </div>
  )
}

export default DashboardPage
