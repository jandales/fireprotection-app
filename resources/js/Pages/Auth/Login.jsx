import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import CIcon from '@coreui/icons-react';
import { cilEnvelopeClosed, cilLockLocked } from '@coreui/icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BfpLogo from '@/assets/images/BFP-LOGO.png';

export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (event) => {
    event.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <div className="auth-login-page">
      <Head title="Sign in" />
      <main className="auth-login-shell">
        <aside className="auth-login-brand">
          <div className="auth-brand-lockup">
            <img src={BfpLogo} alt="Bureau of Fire Protection" />
            <div>
              <strong>Fire Station</strong>
              <span>Management System</span>
            </div>
          </div>
          <div className="auth-brand-message">
            <span className="auth-brand-eyebrow">FIRE &amp; EMERGENCY RESPONSE</span>
            <h1>Ready to respond.<br />Built to protect.</h1>
            <p>Sign in to manage station operations, monitor alerts, and coordinate emergency response.</p>
          </div>
          <div className="auth-brand-footer">Bureau of Fire Protection</div>
        </aside>

        <section className="auth-login-content" aria-labelledby="login-heading">
          <div className="auth-login-form-wrap">
            <div className="auth-login-mobile-brand">
              <img src={BfpLogo} alt="" />
              <span>Fire Station Management</span>
            </div>
            <div className="auth-login-intro">
              <span className="auth-login-kicker">WELCOME BACK</span>
              <h2 id="login-heading">Sign in to your account</h2>
              <p>Enter your account details to continue.</p>
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="auth-login-error-summary" role="alert">
                {errors.email || errors.password || 'We could not sign you in. Check your details and try again.'}
              </div>
            )}

            <form className="auth-login-form" onSubmit={submit} noValidate>
              <div className="auth-login-field">
                <label htmlFor="login-email">Email address</label>
                <div className={`auth-login-input-wrap ${errors.email ? 'auth-login-input-invalid' : ''}`}>
                  <CIcon icon={cilEnvelopeClosed} aria-hidden="true" />
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    autoFocus
                    placeholder="you@example.com"
                    value={data.email}
                    onChange={(event) => setData('email', event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'login-email-error' : undefined}
                    required
                  />
                </div>
                {errors.email && <span className="auth-login-field-error" id="login-email-error">{errors.email}</span>}
              </div>

              <div className="auth-login-field">
                <div className="auth-login-label-row">
                  <label htmlFor="login-password">Password</label>
                  <Link href={route('password.request')} className="auth-login-forgot-link">
                    Forgot password?
                  </Link>
                </div>
                <div className={`auth-login-input-wrap ${errors.password ? 'auth-login-input-invalid' : ''}`}>
                  <CIcon icon={cilLockLocked} aria-hidden="true" />
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={(event) => setData('password', event.target.value)}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? 'login-password-error' : undefined}
                    required
                  />
                </div>
                {errors.password && <span className="auth-login-field-error" id="login-password-error">{errors.password}</span>}
              </div>

              <label className="auth-login-remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={data.remember}
                  onChange={(event) => setData('remember', event.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <button className="auth-login-submit" type="submit" disabled={processing}>
                {processing ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p className="auth-login-register">
              Don’t have an account? <Link href={route('register')}>Create an account</Link>
            </p>
          </div>
        </section>
      </main>
      <ToastContainer />
    </div>
  );
}
