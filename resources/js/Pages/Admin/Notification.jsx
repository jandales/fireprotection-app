import React, { useEffect, useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { CAvatar } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBell, cilCheckCircle, cilMagnifyingGlass, cilFire, cilSearch, cilTrash, cilWarning } from '@coreui/icons';
import DefaultLayout from '@/Layouts/DefaultLayout';
import Pagination from '@/Components/Pagination';
import DefaultAvatar from '@/assets/images/avatars/user.png';
import echo from '../../../js/echo.js';
import ViewAlert from '@/Pages/Admin/Notification/ViewAlert.jsx';
import ConfirmDelete from '@/Components/ConfirmDelete';

const statusClass = {
  active: 'status-badge-critical',
  dispatched: 'status-badge-warning',
  closed: 'status-badge-resolved',
};

const StatusBadge = ({ status }) => (
  <span className={`status-badge ${statusClass[status] || 'status-badge-neutral'}`}>
    {status || 'unknown'}
  </span>
);

const Notification = ({ notifications, filter, statusFilter = 'all', stats }) => {
  const records = notifications?.data ?? [];
  const [search, setSearch] = useState(filter || '');
  const [status, setStatus] = useState(statusFilter);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { delete: destroy, processing } = useForm();

  useEffect(() => {
    setSearch(filter || '');
    setStatus(statusFilter);
  }, [filter, statusFilter]);

  useEffect(() => {
    echo.channel('notification-channel').listen('.NotificationEvent', () => {
      router.reload({ only: ['notifications', 'stats'], preserveScroll: true });
    });

    return () => echo.leaveChannel('notification-channel');
  }, []);

  const applyFilters = (event) => {
    event.preventDefault();
    router.get(route('notifications'), {
      search: search.trim() || undefined,
      status: status !== 'all' ? status : undefined,
    }, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('all');
    router.get(route('notifications'), {}, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  };

  const onPageChange = (url) => {
    if (url) {
      router.get(url, {}, {
        preserveScroll: true,
        preserveState: true,
        onStart: () => setIsLoading(true),
        onFinish: () => setIsLoading(false),
      });
    }
  };

  const openAlert = (notification) => {
    setAlert(notification);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    destroy(route('notifications.destroy', { id: deleteId }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Notification deleted.', { autoClose: 1500 });
        setIsModalDeleteOpen(false);
        setDeleteId(null);
      },
    });
  };

  const renderActions = (notification) => (
    <div className="notification-actions">
      <button
        type="button"
        className="notification-action-button"
        onClick={() => openAlert(notification)}
        title="View notification"
        aria-label={`View notification from ${notification.name || notification.id}`}
      >
        <CIcon icon={cilMagnifyingGlass} aria-hidden="true" />
        <span className="notification-action-label">View</span>
      </button>
      <button
        type="button"
        className="notification-action-button notification-action-delete"
        onClick={() => {
          setDeleteId(notification.id);
          setIsModalDeleteOpen(true);
        }}
        aria-label={`Delete notification ${notification.name || notification.id}`}
      >
        <CIcon icon={cilTrash} aria-hidden="true" />
        <span className="notification-action-label">Delete</span>
      </button>
    </div>
  );

  const renderContact = (notification) => (
    <div className="notification-contact">
      <CAvatar
        size="md"
        src={notification.user?.avatar || DefaultAvatar}
        alt=""
      />
      <div>
        <strong>{notification.name || notification.user?.name || 'Unknown contact'}</strong>
        {notification.user?.email && <span>{notification.user.email}</span>}
        <span>
          {notification.deviceName || notification.device?.name || 'Fire incident'}
          {(notification.macAddress || notification.device?.macAddress)
            ? ` · ${notification.macAddress || notification.device.macAddress}`
            : ''}
        </span>
      </div>
    </div>
  );

  return (
    <DefaultLayout>
      <main className="notifications-page">
        <header className="page-heading">
          <div>
            <h1>Notifications</h1>
            <p>Monitor and manage fire alerts and incident notifications.</p>
          </div>
        </header>

        <section className="notification-stat-grid" aria-label="Notification summary">
          <article className="notification-stat-card">
            <span className="notification-stat-icon notification-stat-icon-blue"><CIcon icon={cilBell} /></span>
            <div><span>All notifications</span><strong>{stats?.all ?? 0}</strong></div>
          </article>
          <article className="notification-stat-card">
            <span className="notification-stat-icon notification-stat-icon-red"><CIcon icon={cilFire} /></span>
            <div><span>Active alerts</span><strong>{stats?.active ?? 0}</strong></div>
          </article>
          <article className="notification-stat-card">
            <span className="notification-stat-icon notification-stat-icon-green"><CIcon icon={cilCheckCircle} /></span>
            <div><span>Closed alerts</span><strong>{stats?.closed ?? 0}</strong></div>
          </article>
        </section>

        <section className="notification-list-panel" aria-label="Notification records" aria-busy={isLoading}>
          <form className="notification-toolbar" onSubmit={applyFilters}>
            <label className="notification-search">
              <CIcon icon={cilSearch} aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search contact, location, device…"
                aria-label="Search notifications"
              />
            </label>
            <label className="notification-status-filter">
              <span className="visually-hidden">Filter by status</span>
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="all">All statuses</option>
                <option value="active">Active alerts</option>
                <option value="closed">Closed alerts</option>
              </select>
            </label>
            <button className="notification-filter-button" type="submit" disabled={isLoading}>
              {isLoading ? 'Updating…' : 'Apply filters'}
            </button>
            {(search || status !== 'all') && (
              <button className="notification-clear-button" type="button" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </form>

          {isLoading && <p className="notification-loading" role="status">Updating notifications…</p>}

          {records.length > 0 ? (
            <>
              <div className="notification-table-scroll">
                <table className="notification-table">
                  <thead>
                    <tr>
                      <th scope="col">Incident / Contact</th>
                      <th scope="col">Location</th>
                      <th scope="col">Date &amp; time</th>
                      <th scope="col">Status</th>
                      <th scope="col"><span className="visually-hidden">Actions</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((notification) => (
                      <tr key={notification.id}>
                        <td>{renderContact(notification)}</td>
                        <td className="notification-location">
                          {notification.deviceLocation || notification.device?.location || notification.location || 'Location unavailable'}
                        </td>
                        <td className="notification-date">{notification.created_at}</td>
                        <td><StatusBadge status={notification.status} /></td>
                        <td>{renderActions(notification)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="notification-mobile-list">
                {records.map((notification) => (
                  <article className="notification-mobile-card" key={notification.id}>
                    <div className="notification-mobile-card-heading">
                      {renderContact(notification)}
                      <StatusBadge status={notification.status} />
                    </div>
                    <p className="notification-mobile-location">
                      <CIcon icon={cilWarning} aria-hidden="true" />
                      {notification.deviceLocation || notification.device?.location || notification.location || 'Location unavailable'}
                    </p>
                    <time className="notification-mobile-date">{notification.created_at}</time>
                    {renderActions(notification)}
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="notification-empty-state">
              <span className="notification-empty-icon"><CIcon icon={cilBell} /></span>
              <h2>No notifications found</h2>
              <p>{search || status !== 'all' ? 'Try adjusting or clearing your filters.' : 'New fire alerts will appear here.'}</p>
              {(search || status !== 'all') && (
                <button className="notification-clear-button" type="button" onClick={clearFilters}>
                  Clear filters
                </button>
              )}
            </div>
          )}

          {notifications?.last_page > 1 && (
            <Pagination
              currentpage={notifications.current_page}
              nextpage={notifications.next_page_url}
              prevpage={notifications.prev_page_url}
              firstpage={notifications.first_page_url}
              lastpage={notifications.last_page_url}
              totalRecord={notifications.total}
              totalPage={notifications.last_page}
              perPage={notifications.per_page}
              onPageChange={onPageChange}
            />
          )}
        </section>

        <ConfirmDelete
          isOpen={isModalDeleteOpen}
          onClose={() => setIsModalDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this notification?"
          processing={processing}
        />
        {alert && (
          <ViewAlert
            visible={isModalOpen}
            notification={alert}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </main>
    </DefaultLayout>
  );
};

export default Notification;
