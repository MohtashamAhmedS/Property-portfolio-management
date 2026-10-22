'use client'

import { useParams } from 'next/navigation'
import PropertyDetailHeader from '../../components/PropertyDetailHeader'
import PropertyOverview from '../../components/PropertyOverview'
import TenantRentSection from '../../components/TenantRentSection'
import PropertyBills from '../../components/PropertyBills'

const PROPERTIES = {
  1: { name: 'AB avenue', city: 'AB city', type: 'Single-family home' },
  2: { name: 'CD street', city: 'CD city', type: 'Apartment' },
  3: { name: 'EF road', city: 'EF city', type: 'Apartment' },
  4: { name: 'GH lane', city: 'GH city', type: 'Townhouse' },
  5: { name: 'IJ boulevard', city: 'IJ city', type: 'Studio' },
}

export default function PropertyDetailPage() {
  const { id } = useParams()
  const property = PROPERTIES[id] ?? PROPERTIES[1]

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <PropertyDetailHeader
        name={property.name}
        city={property.city}
        type={property.type}
      />
      <PropertyOverview
        status="pending"
        bedrooms={3}
        bathrooms={2}
        floorArea={1850}
        yearBuilt={2018}
        rent={1200}
        nextDue="06 Nov 2026"
        lastPayment="$1,200 on 04 Oct"
      />
      <TenantRentSection
        tenant={{
          name: 'James Carter',
          since: 'Mar 2025',
          phone: '+1 555 014 2290',
          email: 'j.carter@example.com',
          deposit: 1200,
          leaseTerm: '12 months',
          leaseStart: '01 Mar 2026',
          leaseEnd: '28 Feb 2027',
          leaseProgress: 72,
        }}
        history={[
          {
            month: 'November 2026',
            amount: 1200,
            paidOn: null,
            status: 'Pending',
          },
          {
            month: 'October 2026',
            amount: 1200,
            paidOn: '04 Oct',
            status: 'Paid',
          },
          {
            month: 'September 2026',
            amount: 1200,
            paidOn: '03 Sep',
            status: 'Paid',
          },
          {
            month: 'August 2026',
            amount: 1200,
            paidOn: '09 Aug',
            status: 'Paid',
          },
        ]}
      />
      <PropertyBills
        bills={[
          {
            id: 1,
            name: 'Water',
            note: 'Due 24 Oct',
            icon: 'water',
            amount: 65,
            status: 'Upcoming',
          },
          {
            id: 2,
            name: 'Insurance',
            note: 'Paid 02 Oct',
            icon: 'shield',
            amount: 300,
            status: 'Paid',
          },
        ]}
      />
    </div>
  )
}
