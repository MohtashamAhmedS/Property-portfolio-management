import FormPageHeader from '../../components/FormPageHeader'

export default function AddPropertyPage() {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <FormPageHeader
        backHref="/dashboard/properties"
        backLabel="Back to properties"
        title="Add a property"
        subtitle="Enter the details now. You can edit them any time."
      />

      {/* Form goes here */}
    </div>
  )
}
