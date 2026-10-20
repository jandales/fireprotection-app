import Alert from '@/Components/Alert';

const RecentAlerts = ({ alerts, id, handleAlertClick }) => {
  const records = alerts?.data ?? [];

  return (
    <section className="dashboard-panel recent-alerts-panel" aria-labelledby="recent-alerts-title">
      <div className="dashboard-panel-heading">
        <div>
          <h2 id="recent-alerts-title">Recent alerts</h2>
          <p>Latest reported incidents</p>
        </div>
        <span className="recent-alert-count">{records.length}</span>
      </div>
      <div className="recent-alert-list">
        {records.length > 0 ? records.map((notification) => (
          <Alert
            key={notification.id}
            alert={notification}
            active={notification.id === id}
            onAlertClick={handleAlertClick}
          />
        )) : (
          <div className="dashboard-empty-state">
            <span className="dashboard-empty-icon" aria-hidden="true">—</span>
            <strong>No alerts to display</strong>
            <span>New alerts will appear here.</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentAlerts;
