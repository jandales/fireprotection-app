import React from 'react';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { Link, useForm } from '@inertiajs/react';
import CIcon from '@coreui/icons-react';
import { cilBriefcase, cilLocationPin, cilUser } from '@coreui/icons';
import { toast } from 'react-toastify';

const Field = ({ id, label, value, onChange, error, ...props }) => (
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
  </div>
);

export default function Create() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    role: '',
    phonenumber: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    zipcode: '',
  });

  const submit = (event) => {
    event.preventDefault();
    post(route('employees.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Employee created successfully.', { autoClose: 1800 });
      },
      onError: (validationErrors) => {
        if (Object.keys(validationErrors).length === 0) {
          toast.error('The employee could not be created. Please try again.');
        }
      },
    });
  };

  return (
    <DefaultLayout>
      <main className="employee-create-page">
        <header className="employee-create-heading">
          <div>
            <h1>Add employee</h1>
            <p>Create an employee account and add their contact information.</p>
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
                <p>Enter the employee’s name, work email, phone number, and role.</p>
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
                required
                value={data.email}
                onChange={(event) => setData('email', event.target.value)}
                error={errors.email}
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
                  aria-describedby={errors.role ? 'role-error' : 'role-hint'}
                  className={errors.role ? 'employee-create-input employee-create-input-error' : 'employee-create-input'}
                  required
                >
                  <option value="">Select a role</option>
                  <option value="administrator">Administrator</option>
                  <option value="dispatcher">Dispatcher</option>
                </select>
                {errors.role
                  ? <span className="employee-create-error" id="role-error">{errors.role}</span>
                  : <span className="employee-create-hint" id="role-hint">Choose the access role for this account.</span>}
              </div>
            </div>
          </section>

          <section className="employee-create-section" aria-labelledby="employee-address-title">
            <header className="employee-create-section-heading">
              <span className="employee-create-section-icon"><CIcon icon={cilLocationPin} aria-hidden="true" /></span>
              <div>
                <h2 id="employee-address-title">Address</h2>
                <p>Add the employee’s address. These fields are optional.</p>
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

          <footer className="employee-create-actions">
            <Link className="employee-create-cancel" href={route('employees')}>
              Cancel
            </Link>
            <button className="employee-create-submit" type="submit" disabled={processing}>
              <CIcon icon={cilBriefcase} aria-hidden="true" />
              {processing ? 'Creating…' : 'Create employee'}
            </button>
          </footer>
        </form>
      </main>
    </DefaultLayout>
  );
}
