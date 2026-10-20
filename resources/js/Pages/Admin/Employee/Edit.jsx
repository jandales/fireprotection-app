import React from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link, useForm } from '@inertiajs/react';
import CIcon from '@coreui/icons-react';
import { cilBriefcase, cilLocationPin, cilSave, cilUser } from '@coreui/icons';
import { toast } from 'react-toastify';

const Field = ({ id, label, value, onChange, error, hint, ...props }) => (
  <div className="employee-create-field">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={id}
      value={value ?? ''}
      onChange={onChange}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      className={error ? 'employee-create-input employee-create-input-error' : 'employee-create-input'}
      {...props}
    />
    {error && <span className="employee-create-error" id={`${id}-error`}>{error}</span>}
    {hint && !error && <span className="employee-create-hint" id={`${id}-hint`}>{hint}</span>}
  </div>
);

export default function Edit({ user }) {
  const { data, setData, patch, errors, processing } = useForm({
    id: user.id,
    name: user.name || '',
    email: user.email || '',
    role: user.role || '',
    phonenumber: user.phonenumber || '',
    address1: user.address1 || '',
    address2: user.address2 || '',
    city: user.city || '',
    province: user.province || '',
    zipcode: user.zipcode || '',
    status: Number(user.status) === 1 ? 1 : 0,
  });

  const submit = (event) => {
    event.preventDefault();
    patch(route('employees.update'), {
      preserveScroll: true,
      onSuccess: () => toast.success('Employee updated successfully.', { autoClose: 1800 }),
      onError: (validationErrors) => {
        if (Object.keys(validationErrors).length === 0) {
          toast.error('The employee could not be updated. Please try again.');
        }
      },
    });
  };

  return (
    <DefaultLayout>
      <main className="employee-create-page">
        <header className="employee-create-heading">
          <div>
            <h1>Edit employee</h1>
            <p>Update {user.name}’s account, contact information, and status.</p>
          </div>
          <Link className="employee-create-back" href={route('employees')}>
            Back to employees
          </Link>
        </header>

        {Object.keys(errors).length > 0 && (
          <div className="employee-create-error-summary" role="alert">
            Some information needs your attention. Review the highlighted fields below.
          </div>
        )}

        <form className="employee-create-form" onSubmit={submit} noValidate>
          <section className="employee-create-section" aria-labelledby="employee-details-title">
            <header className="employee-create-section-heading">
              <span className="employee-create-section-icon"><CIcon icon={cilUser} aria-hidden="true" /></span>
              <div>
                <h2 id="employee-details-title">Employee details</h2>
                <p>Update the employee’s name, role, and contact information.</p>
              </div>
            </header>
            <div className="employee-create-fields">
              <Field
                id="name"
                label="Full name"
                autoComplete="name"
                required
                value={data.name}
                onChange={(event) => setData('name', event.target.value)}
                error={errors.name}
              />
              <Field
                id="email"
                label="Work email"
                type="email"
                autoComplete="email"
                value={data.email}
                error={errors.email}
                readOnly
                hint="Email addresses cannot be changed here."
              />
              <Field
                id="phonenumber"
                label="Contact number"
                type="tel"
                autoComplete="tel"
                required
                value={data.phonenumber}
                onChange={(event) => setData('phonenumber', event.target.value)}
                error={errors.phonenumber}
              />
              <div className="employee-create-field">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={data.role}
                  onChange={(event) => setData('role', event.target.value)}
                  aria-invalid={Boolean(errors.role)}
                  aria-describedby={errors.role ? 'role-error' : undefined}
                  className={errors.role ? 'employee-create-input employee-create-input-error' : 'employee-create-input'}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="administrator">Administrator</option>
                  <option value="dispatcher">Dispatcher</option>
                </select>
                {errors.role && <span className="employee-create-error" id="role-error">{errors.role}</span>}
              </div>
            </div>
          </section>

          <section className="employee-create-section" aria-labelledby="employee-address-title">
            <header className="employee-create-section-heading">
              <span className="employee-create-section-icon"><CIcon icon={cilLocationPin} aria-hidden="true" /></span>
              <div>
                <h2 id="employee-address-title">Address</h2>
                <p>Update the employee’s address details.</p>
              </div>
            </header>
            <div className="employee-create-fields">
              <Field
                id="address1"
                label="Street"
                autoComplete="address-line1"
                value={data.address1}
                onChange={(event) => setData('address1', event.target.value)}
                error={errors.address1}
              />
              <Field
                id="address2"
                label="Barangay"
                autoComplete="address-line2"
                value={data.address2}
                onChange={(event) => setData('address2', event.target.value)}
                error={errors.address2}
              />
              <Field
                id="city"
                label="Municipality / city"
                autoComplete="address-level2"
                value={data.city}
                onChange={(event) => setData('city', event.target.value)}
                error={errors.city}
              />
              <Field
                id="province"
                label="Province"
                autoComplete="address-level1"
                value={data.province}
                onChange={(event) => setData('province', event.target.value)}
                error={errors.province}
              />
              <Field
                id="zipcode"
                label="ZIP code"
                inputMode="numeric"
                autoComplete="postal-code"
                value={data.zipcode}
                onChange={(event) => setData('zipcode', event.target.value)}
                error={errors.zipcode}
              />
            </div>
          </section>

          <section className="employee-create-section" aria-labelledby="employee-status-title">
            <header className="employee-create-section-heading">
              <span className="employee-create-section-icon"><CIcon icon={cilBriefcase} aria-hidden="true" /></span>
              <div>
                <h2 id="employee-status-title">Account status</h2>
                <p>Control whether this employee account is active.</p>
              </div>
            </header>
            <div className="employee-edit-status-row">
              <div>
                <strong>Active employee</strong>
                <span>An inactive employee may not be able to use their account.</span>
              </div>
              <label className="employee-edit-toggle">
                <input
                  type="checkbox"
                  name="status"
                  checked={Number(data.status) === 1}
                  onChange={(event) => setData('status', event.target.checked ? 1 : 0)}
                  aria-label="Active employee"
                />
                <span aria-hidden="true" />
              </label>
            </div>
            {errors.status && <p className="employee-create-error employee-edit-status-error">{errors.status}</p>}
          </section>

          <footer className="employee-create-actions">
            <Link className="employee-create-cancel" href={route('employees')}>
              Cancel
            </Link>
            <button className="employee-create-submit" type="submit" disabled={processing}>
              <CIcon icon={cilSave} aria-hidden="true" />
              {processing ? 'Saving…' : 'Save changes'}
            </button>
          </footer>
        </form>
      </main>
    </DefaultLayout>
  );
}
