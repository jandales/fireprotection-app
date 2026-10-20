import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { useForm, usePage } from '@inertiajs/react';
import { CAvatar } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilBriefcase,
  cilCheckCircle,
  cilEnvelopeClosed,
  cilLocationPin,
  cilPencil,
  cilPhone,
  cilUser,
} from '@coreui/icons';
import { toast } from 'react-toastify';
import DefaultAvatar from '@/assets/images/avatars/user.png';

const createProfileData = (user) => ({
  name: user.name || '',
  phonenumber: user.phonenumber || '',
  address1: user.address1 || '',
  address2: user.address2 || '',
  city: user.city || '',
  province: user.province || '',
  zipcode: user.zipcode || '',
  avatar: null,
});

const ProfileField = ({ id, label, value, onChange, error, disabled = false, helperText, ...props }) => (
  <div className="account-field">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      className={error ? 'account-input account-input-error' : 'account-input'}
      {...props}
    />
    {error && <span className="account-field-error" id={`${id}-error`}>{error}</span>}
    {helperText && <span className="account-field-help">{helperText}</span>}
  </div>
);

export default function Profile() {
  const user = usePage().props.auth.user;
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const {
    data,
    setData,
    setDefaults,
    post,
    processing,
    errors,
    setError,
    clearErrors,
    reset,
  } = useForm(createProfileData(user));

  useEffect(() => {
    const profileData = createProfileData(user);
    setData(profileData);
    setDefaults(profileData);
    setIsEditing(false);
  }, [user, setData, setDefaults]);

  useEffect(() => {
    if (!avatarPreview) return undefined;
    return () => URL.revokeObjectURL(avatarPreview);
  }, [avatarPreview]);

  const fullAddress = [
    user.address1,
    user.address2,
    user.city,
    user.province,
    user.zipcode,
  ].filter(Boolean).join(', ');

  const cancelEditing = () => {
    reset();
    clearErrors();
    setAvatarPreview(null);
    setIsEditing(false);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setData('avatar', file);
    clearErrors('avatar');
    setAvatarPreview(file ? URL.createObjectURL(file) : null);
  };

  const submit = (event) => {
    event.preventDefault();
    clearErrors();

    if (!data.name.trim()) {
      setError('name', 'Please enter your name.');
      return;
    }

    post(route('user.update'), {
      preserveScroll: true,
      onSuccess: () => {
        setAvatarPreview(null);
        setIsEditing(false);
        toast.success('Profile updated successfully.', { autoClose: 1800 });
      },
      onError: (validationErrors) => {
        if (Object.keys(validationErrors).length === 0) {
          toast.error('Your profile could not be updated. Please try again.');
        }
      },
    });
  };

  return (
    <DefaultLayout>
      <main className="account-page">
        <header className="account-page-heading">
          <div>
            <h1>My Account</h1>
            <p>View and update your personal information.</p>
          </div>
        </header>

        <div className="account-profile-grid">
          <section className="account-profile-card" aria-label="Profile summary">
            <div className="account-profile-avatar-wrap">
              <CAvatar
                src={avatarPreview || user.avatar || DefaultAvatar}
                size="xl"
                className="account-profile-avatar"
                alt={`${user.name} profile`}
              />
            </div>
            <h2>{user.name}</h2>
            <p className="account-profile-email">{user.email}</p>
            {user.role && (
              <span className="account-role-badge">
                <CIcon icon={cilBriefcase} aria-hidden="true" />
                <span>{user.role}</span>
              </span>
            )}
            {user.status !== null && user.status !== undefined && (
              <span className={`account-status-badge ${Number(user.status) === 1 ? 'account-status-active' : 'account-status-inactive'}`}>
                <CIcon icon={cilCheckCircle} aria-hidden="true" />
                {user.statusName}
              </span>
            )}
            <button
              type="button"
              className="account-edit-button"
              onClick={() => setIsEditing(true)}
              disabled={isEditing}
            >
              <CIcon icon={cilPencil} aria-hidden="true" />
              Edit Profile
            </button>
            <div className="account-summary-divider" />
            <div className="account-summary-detail">
              <CIcon icon={cilEnvelopeClosed} aria-hidden="true" />
              <div>
                <span>Email address</span>
                <strong>{user.email}</strong>
              </div>
            </div>
            <div className="account-summary-detail">
              <CIcon icon={cilPhone} aria-hidden="true" />
              <div>
                <span>Phone number</span>
                <strong>{user.phonenumber || 'Not provided'}</strong>
              </div>
            </div>
            <div className="account-summary-detail">
              <CIcon icon={cilLocationPin} aria-hidden="true" />
              <div>
                <span>Address</span>
                <strong>{fullAddress || 'Not provided'}</strong>
              </div>
            </div>
          </section>

          <section className="account-information-card" aria-labelledby="account-information-heading">
            <header className="account-card-heading">
              <div>
                <h2 id="account-information-heading">Personal Information</h2>
                <p>Manage the details associated with your account.</p>
              </div>
            </header>

            {Object.keys(errors).length > 0 && (
              <div className="account-error-summary" role="alert">
                Please review the highlighted fields and try again.
              </div>
            )}

            <form onSubmit={submit} noValidate>
              <div className="account-fields-grid">
                <ProfileField
                  id="name"
                  label="Full name"
                  autoComplete="name"
                  value={data.name}
                  onChange={(event) => setData('name', event.target.value)}
                  error={errors.name}
                  disabled={!isEditing || processing}
                  required
                />
                <ProfileField
                  id="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  value={user.email || ''}
                  disabled
                  readOnly
                  helperText="Email address is managed by your account."
                />
                <ProfileField
                  id="phonenumber"
                  label="Phone number"
                  type="tel"
                  autoComplete="tel"
                  value={data.phonenumber}
                  onChange={(event) => setData('phonenumber', event.target.value)}
                  error={errors.phonenumber}
                  disabled={!isEditing || processing}
                />
                <ProfileField
                  id="address1"
                  label="Street address"
                  autoComplete="address-line1"
                  value={data.address1}
                  onChange={(event) => setData('address1', event.target.value)}
                  error={errors.address1}
                  disabled={!isEditing || processing}
                />
                <ProfileField
                  id="address2"
                  label="Barangay"
                  autoComplete="address-line2"
                  value={data.address2}
                  onChange={(event) => setData('address2', event.target.value)}
                  error={errors.address2}
                  disabled={!isEditing || processing}
                />
                <ProfileField
                  id="city"
                  label="Municipality / city"
                  autoComplete="address-level2"
                  value={data.city}
                  onChange={(event) => setData('city', event.target.value)}
                  error={errors.city}
                  disabled={!isEditing || processing}
                />
                <ProfileField
                  id="province"
                  label="Province"
                  autoComplete="address-level1"
                  value={data.province}
                  onChange={(event) => setData('province', event.target.value)}
                  error={errors.province}
                  disabled={!isEditing || processing}
                />
                <ProfileField
                  id="zipcode"
                  label="ZIP code"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={data.zipcode}
                  onChange={(event) => setData('zipcode', event.target.value)}
                  error={errors.zipcode}
                  disabled={!isEditing || processing}
                />
              </div>

              {isEditing && (
                <div className="account-avatar-field">
                  <label htmlFor="avatar">Profile photo</label>
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    disabled={processing}
                    aria-invalid={Boolean(errors.avatar)}
                    aria-describedby={errors.avatar ? 'avatar-error' : 'avatar-help'}
                  />
                  <span className="account-field-help" id="avatar-help">Choose an image file for your profile picture.</span>
                  {errors.avatar && <span className="account-field-error" id="avatar-error">{errors.avatar}</span>}
                </div>
              )}

              {isEditing && (
                <div className="account-form-actions">
                  <button
                    className="account-cancel-button"
                    type="button"
                    onClick={cancelEditing}
                    disabled={processing}
                  >
                    Cancel
                  </button>
                  <button className="account-save-button" type="submit" disabled={processing}>
                    {processing ? 'Saving…' : 'Save Changes'}
                  </button>
                </div>
              )}
            </form>
          </section>
        </div>
      </main>
    </DefaultLayout>
  );
}
