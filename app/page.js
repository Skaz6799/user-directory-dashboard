"use client";

import { useState, useEffect, useMemo } from "react";
import UserModal from "../components/UserModal";
import { UserCard } from "../components/UserCard";

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export default function Home() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadUsers() {
      setStatus('loading')
      try {
        const response = await fetch(API_URL, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        const data = await response.json()
        if (!Array.isArray(data)) throw new Error('Unexpected API response')
        setUsers(data)
        setStatus('success')
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('error')
      }
    }

    loadUsers()
    return () => controller.abort()
  }, [])

  const filteredUsers = useMemo(() => {
    const term = query.trim().toLowerCase()
    return users.filter((user) =>
      user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term),
    )
  }, [users, query])

  return (
    <>
      <header className="tw-border-b tw-border-slate-200 tw-bg-white">
        <div className="container tw-py-5">
          <p className="tw-mb-1 tw-text-xs tw-font-bold tw-uppercase tw-tracking-widest tw-text-brand">People &amp; teams</p>
          <h1 className="tw-mb-1 tw-text-3xl tw-font-bold tw-text-ink">User Directory</h1>
          <p className="tw-mb-0 tw-text-sm tw-text-muted">Find people and explore their details.</p>
        </div>
      </header>

      <main className="tw-min-h-screen tw-bg-slate-50 tw-py-8">
        <div className="container">
          <section aria-labelledby="directory-heading">
            <div className="row tw-items-end tw-gap-y-4 tw-pb-6">
              <div className="col-12 col-md-7 col-lg-6">
                <label htmlFor="user-search" className="tw-mb-2 tw-block tw-text-sm tw-font-semibold tw-text-ink">Search by name or email</label>
                <input
                  id="user-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="e.g. Leanne or @example.com"
                  className="tw-w-full tw-rounded-xl tw-border tw-border-slate-300 tw-bg-white tw-px-4 tw-py-3 tw-text-ink tw-shadow-sm focus:tw-border-brand focus:tw-outline focus:tw-outline-2 focus:tw-outline-indigo-100"
                />
              </div>
              <div className="col-12 col-md-5 col-lg-6 tw-text-sm tw-text-muted" aria-live="polite">
                {status === 'success' && `${filteredUsers.length} ${filteredUsers.length === 1 ? 'person' : 'people'} found`}
              </div>
            </div>

            <h2 id="directory-heading" className="tw-sr-only">Directory results</h2>
            {status === 'loading' && <p role="status" className="tw-rounded-xl tw-bg-white tw-p-6 tw-text-muted">Loading users…</p>}
            {status === 'error' && <div role="alert" className="tw-rounded-xl tw-bg-white tw-p-6 tw-text-ink">Could not load users. Check your connection and refresh the page.</div>}
            {status === 'success' && (filteredUsers.length ? (
              <div className="row tw-gap-y-4">
                {filteredUsers.map((user, index) => (
                  <div key={user.id} className="col-12 col-md-6 col-xl-4">
                    <UserCard user={user} index={index} onSelect={setSelectedUser} />
                  </div>
                ))}
              </div>
            ) : <p role="status" className="tw-rounded-xl tw-bg-white tw-p-6 tw-text-muted">No users match “{query}”. Try another name or email.</p>)}
          </section>
        </div>
      </main>
      <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </>
  )
}
