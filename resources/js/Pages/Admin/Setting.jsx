import React from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { useForm } from '@inertiajs/react';
import CIcon from '@coreui/icons-react';
import {
  cilBuilding,
  cilCheckCircle,
  cilLocationPin,
  cilMap,
  cilSave,
} from '@coreui/icons';
import { toast } from 'react-toastify';

const SettingField = ({ id, label, value, onChange, error, hint, ...props }) => (
  <div className="settings-field">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={id}
      value={value ?? ''}
      onChange={onChange}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
      className={error ? 'settings-input settings-input-error' : 'settings-input'}
      {...props}
    />
    {error && <span className="settings-field-error" id={`${id}-error`}>{error}</span>}
    {hint && !error && <span className="settings-field-hint" id={`${id}-hint`}>{hint}</span>}
  </div>
);

export default function Setting({ settings }) {
  const {
    data: contactData,
    setData: setContactData,
    patch: patchContact,
    processing: contactProcessing,
    errors: contactErrors,
  } = useForm({
    station: settings.stationName || '',
    email: settings.email || '',
    phonenumber: settings.phonenumber || '',
    mobilenumber: settings.mobilenumber || '',
  });

  const {
    data: locationData,
    setData: setLocationData,
    patch: patchLocation,
    processing: locationProcessing,
    errors: locationErrors,
  } = useForm({
    latitude: settings.latitude ?? '',
    longitude: settings.longitude ?? '',
    location: settings.location || '',
  });

  const {
    data: passwordData,
    setData: setPasswordData,
    patch: patchPassword,
    processing: passwordProcessing,
    errors: passwordErrors,
    reset: resetPassword,
  } = useForm({
    oldpassword: '',
    newpassword: '',
    newpassword_confirmation: '',
  });

  const saveContact = (event) => {
    event.preventDefault();
    patchContact(route('settings.update.contact'), {
      preserveScroll: true,
      onSuccess: () => toast.success('Station contact information saved.'),
    });
  };

  const saveLocation = (event) => {
    event.preventDefault();
    patchLocation(route('settings.update.location'), {
      preserveScroll: true,
      onSuccess: () => toast.success('Station location saved.'),
    });
  };

  const savePassword = (event) => {
    event.preventDefault();
    patchPassword(route('settings.update.password'), {
      preserveScroll: true,
      onSuccess: () => {
        resetPassword();
        toast.success('Password updated successfully.');
      },
      onError: () => {
        resetPassword('oldpassword', 'newpassword', 'newpassword_confirmation');
      },
    });
  };

  return (
    <DefaultLayout>
      <main className="settings-page">
        <header className="settings-page-heading">
          <div>
            <h1>Settings</h1>
            <p>Manage your fire station information and preferences.</p>
          </div>
        </header>

        <div className="settings-sections">
          <section className="settings-card" aria-labelledby="station-contact-title">
            <header className="settings-card-heading">
              <span className="settings-card-icon"><CIcon icon={cilBuilding} aria-hidden="true" /></span>
              <div>
                <h2 id="station-contact-title">Station contact</h2>
                <p>Official name and contact details for your fire station.</p>
              </div>
            </header>
            <form onSubmit={saveContact} className="settings-form">
              <div className="settings-fields-grid">
                <SettingField
                  id="station-name"
                  label="Station name"
                  autoComplete="organization"
                  required
                  value={contactData.station}
                  onChange={(event) => setContactData('station', event.target.value)}
                  error={contactErrors.station}
                />
                <SettingField
                  id="station-email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  value={contactData.email}
                  onChange={(event) => setContactData('email', event.target.value)}
                  error={contactErrors.email}
                />
                <SettingField
                  id="station-phone"
                  label="Telephone number"
                  type="tel"
                  autoComplete="tel"
                  value={contactData.phonenumber}
                  onChange={(event) => setContactData('phonenumber', event.target.value)}
                  error={contactErrors.phonenumber}
                />
                <SettingField
                  id="station-mobile"
                  label="Mobile number"
                  type="tel"
                  autoComplete="tel-national"
                  value={contactData.mobilenumber}
                  onChange={(event) => setContactData('mobilenumber', event.target.value)}
                  error={contactErrors.mobilenumber}
                />
              </div>
              <div className="settings-form-footer">
                <button className="settings-save-button" type="submit" disabled={contactProcessing}>
                  <CIcon icon={cilSave} aria-hidden="true" />
                  {contactProcessing ? 'Saving…' : 'Save contact details'}
                </button>
              </div>
            </form>
          </section>

          <section className="settings-card" aria-labelledby="station-location-title">
            <header className="settings-card-heading">
              <span className="settings-card-icon"><CIcon icon={cilMap} aria-hidden="true" /></span>
              <div>
                <h2 id="station-location-title">Station location</h2>
                <p>Set the station address and map coordinates used by the application.</p>
              </div>
            </header>
            <form onSubmit={saveLocation} className="settings-form">
              <div className="settings-fields-grid">
                <SettingField
                  id="station-latitude"
                  label="Latitude"
                  type="number"
                  step="any"
                  min="-90"
                  max="90"
                  inputMode="decimal"
                  value={locationData.latitude}
                  onChange={(event) => setLocationData('latitude', event.target.value)}
                  error={locationErrors.latitude}
                  hint="Range: −90 to 90"
                />
                <SettingField
                  id="station-longitude"
                  label="Longitude"
                  type="number"
                  step="any"
                  min="-180"
                  max="180"
                  inputMode="decimal"
                  value={locationData.longitude}
                  onChange={(event) => setLocationData('longitude', event.target.value)}
                  error={locationErrors.longitude}
                  hint="Range: −180 to 180"
                />
                <div className="settings-field settings-field-full">
                  <label htmlFor="station-address">Station address</label>
                  <div className="settings-address-input">
                    <CIcon icon={cilLocationPin} aria-hidden="true" />
                    <input
                      id="station-address"
                      name="location"
                      value={locationData.location}
                      onChange={(event) => setLocationData('location', event.target.value)}
                      aria-invalid={Boolean(locationErrors.location)}
                      aria-describedby={locationErrors.location ? 'station-address-error' : undefined}
                      className={locationErrors.location ? 'settings-input settings-input-error' : 'settings-input'}
                    />
                  </div>
                  {locationErrors.location && <span className="settings-field-error" id="station-address-error">{locationErrors.location}</span>}
                </div>
              </div>
              <div className="settings-location-preview">
                <CIcon icon={cilLocationPin} aria-hidden="true" />
                <div>
                  <span>Current station address</span>
                  <strong>{locationData.location || 'No address set'}</strong>
                </div>
              </div>
              <div className="settings-form-footer">
                <button className="settings-save-button" type="submit" disabled={locationProcessing}>
                  <CIcon icon={cilSave} aria-hidden="true" />
                  {locationProcessing ? 'Saving…' : 'Save location'}
                </button>
              </div>
            </form>
          </section>

          <section className="settings-card" aria-labelledby="password-title">
            <header className="settings-card-heading">
              <span className="settings-card-icon"><CIcon icon={cilCheckCircle} aria-hidden="true" /></span>
              <div>
                <h2 id="password-title">Change password</h2>
                <p>Update the password for your signed-in account.</p>
              </div>
            </header>
            <form onSubmit={savePassword} className="settings-form">
              <div className="settings-fields-grid">
                <SettingField
                  id="oldpassword"
                  label="Current password"
                  type="password"
                  autoComplete="current-password"
                  value={passwordData.oldpassword}
                  onChange={(event) => setPasswordData('oldpassword', event.target.value)}
                  error={passwordErrors.oldpassword}
                  required
                />
                <div />
                <SettingField
                  id="newpassword"
                  label="New password"
                  type="password"
                  autoComplete="new-password"
                  value={passwordData.newpassword}
                  onChange={(event) => setPasswordData('newpassword', event.target.value)}
                  error={passwordErrors.newpassword}
                  required
                />
                <SettingField
                  id="newpassword_confirmation"
                  label="Confirm new password"
                  type="password"
                  autoComplete="new-password"
                  value={passwordData.newpassword_confirmation}
                  onChange={(event) => setPasswordData('newpassword_confirmation', event.target.value)}
                  error={passwordErrors.newpassword_confirmation}
                  required
                />
              </div>
              <div className="settings-form-footer">
                <button className="settings-save-button" type="submit" disabled={passwordProcessing}>
                  <CIcon icon={cilSave} aria-hidden="true" />
                  {passwordProcessing ? 'Updating…' : 'Update password'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </DefaultLayout>
  );
}
