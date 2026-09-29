export function UserCard({ user, onSelect, index }) {
    const initials = user.name.split(/\s+/).slice(0, 2).map((word) => word[0]).join('').toUpperCase()

  return (
    <article
      className="user-card-enter tw-h-full tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-white tw-p-5 tw-shadow-sm tw-transition-shadow hover:tw-shadow-md"
      style={{ animationDelay: `${Math.min(index, 9) * 45}ms` }}
    >
      <div className="tw-flex tw-items-start tw-gap-4">
        <span aria-hidden="true" className="tw-flex tw-h-12 tw-w-12 tw-shrink-0 tw-items-center tw-justify-center tw-rounded-xl tw-bg-indigo-100 tw-text-sm tw-font-bold tw-text-brand">
          {initials}
        </span>
        <div className="tw-min-w-0">
          <h3 className="tw-m-0 tw-text-lg tw-font-semibold tw-text-ink">{user.name}</h3>
          <p className="tw-m-0 tw-break-all tw-text-sm tw-text-muted">{user.email}</p>
        </div>
      </div>
      <dl className="tw-mb-0 tw-mt-6 tw-grid tw-gap-3 tw-text-sm">
        <div>
          <dt className="tw-font-medium tw-text-muted">Company</dt>
          <dd className="tw-mb-0 tw-text-ink">{user.company.name}</dd>
        </div>
        <div>
          <dt className="tw-font-medium tw-text-muted">City</dt>
          <dd className="tw-mb-0 tw-text-ink">{user.address.city}</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={() => onSelect(user)}
        aria-label={`View full details for ${user.name}`}
        className="tw-mt-6 tw-rounded-lg tw-border-0 tw-bg-indigo-50 tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-text-brand tw-transition-colors hover:tw-bg-indigo-100 focus-visible:tw-outline focus-visible:tw-outline-2 focus-visible:tw-outline-offset-2 focus-visible:tw-outline-brand"
      >
        View details <span aria-hidden="true">→</span>
      </button>
    </article>
  )
}