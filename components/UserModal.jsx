import { useEffect, useRef } from 'react'

export default function UserModal({ user, onClose }) {
  const modalElement = useRef(null)
  const modalInstance = useRef(null)
  const onCloseRef = useRef(onClose)
  const userRef = useRef(user)
  onCloseRef.current = onClose
  userRef.current = user

  useEffect(() => {
    const element = modalElement.current
    let instance
    let cancelled = false
    const handleHidden = () => onCloseRef.current()

    import('bootstrap/js/dist/modal').then(({ default: Modal }) => {
      if (cancelled) return
      instance = new Modal(element)
      modalInstance.current = instance
      element.addEventListener('hidden.bs.modal', handleHidden)
      if (userRef.current) instance.show()
    })

    return () => {
      cancelled = true
      if (!instance) return
      element.removeEventListener('hidden.bs.modal', handleHidden)
      instance.hide()
      instance.dispose()
      modalInstance.current = null
    }
  }, [])

  useEffect(() => {
    if (user) modalInstance.current?.show()
    else modalInstance.current?.hide()
  }, [user])

  const address = user?.address
  const formattedAddress = address && [address.suite, address.street, address.city, address.zipcode].filter(Boolean).join(', ')
  const website = user?.website?.replace(/^https?:\/\//, '')

  return (
    <div ref={modalElement} className="modal fade" tabIndex="-1" aria-labelledby="user-modal-title" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <section className="modal-content tw-overflow-hidden tw-rounded-2xl tw-border-0 tw-shadow-xl" aria-label="User details">
          <header className="modal-header tw-border-slate-100 tw-p-5">
            <div>
              <p className="tw-mb-1 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-brand">Directory profile</p>
              <h2 id="user-modal-title" className="modal-title tw-text-xl tw-font-bold tw-text-ink">{user?.name}</h2>
            </div>
            <button type="button" className="btn-close" aria-label="Close details" onClick={() => modalInstance.current?.hide()} />
          </header>
          <div className="modal-body tw-p-5">
            {user && (
              <dl className="tw-m-0 tw-grid tw-gap-4 tw-text-sm">
                <div><dt className="tw-font-semibold tw-text-muted">Email</dt><dd className="tw-mb-0 tw-break-all"><a href={`mailto:${user.email}`} className="tw-text-brand">{user.email}</a></dd></div>
                <div><dt className="tw-font-semibold tw-text-muted">Company</dt><dd className="tw-mb-0 tw-text-ink">{user.company.name}</dd></div>
                <div><dt className="tw-font-semibold tw-text-muted">Address</dt><dd className="tw-mb-0 tw-text-ink">{formattedAddress}</dd></div>
                <div><dt className="tw-font-semibold tw-text-muted">Phone</dt><dd className="tw-mb-0"><a href={`tel:${user.phone}`} className="tw-text-brand">{user.phone}</a></dd></div>
                <div><dt className="tw-font-semibold tw-text-muted">Website</dt><dd className="tw-mb-0 tw-break-all"><a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="tw-text-brand">{website}</a></dd></div>
              </dl>
            )}
          </div>
          <footer className="modal-footer tw-border-slate-100 tw-p-5">
            <button type="button" className="tw-rounded-lg tw-border-0 tw-bg-brand tw-px-5 tw-py-2 tw-font-semibold tw-text-white hover:tw-bg-indigo-700" onClick={() => modalInstance.current?.hide()}>Close</button>
          </footer>
        </section>
      </div>
    </div>
  )
}