import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Connexion - Centre Culturel Lixus" />

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontFamily: DS.display, fontSize: '28px', fontWeight: 300, color: '#000', marginBottom: '8px' }}>
                    Connexion
                </h1>
                <p style={{ fontFamily: DS.body, fontSize: '14px', color: '#707070' }}>
                    Accédez à votre espace personnel
                </p>
            </div>

            {status && (
                <div style={{ backgroundColor: '#E8F5E9', border: '1px solid #A5D6A7', color: '#2E7D32', padding: '12px', fontFamily: DS.body, fontSize: '14px', marginBottom: '24px' }}>
                    {status}
                </div>
            )}

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label htmlFor="email" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>
                        Email *
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                        className="input-lad"
                        style={{ fontFamily: DS.body }}
                    />
                    {errors.email && <div style={{ color: '#C52034', fontFamily: DS.body, fontSize: '12px', marginTop: '4px' }}>{errors.email}</div>}
                </div>

                <div>
                    <label htmlFor="password" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>
                        Mot de passe *
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        className="input-lad"
                        style={{ fontFamily: DS.body }}
                    />
                    {errors.password && <div style={{ color: '#C52034', fontFamily: DS.body, fontSize: '12px', marginTop: '4px' }}>{errors.password}</div>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            style={{ margin: 0, cursor: 'pointer', accentColor: '#000' }}
                        />
                        <span style={{ fontFamily: DS.body, fontSize: '14px', color: '#3C3C3C', marginLeft: '8px' }}>Se souvenir de moi</span>
                    </label>

                    <Link
                        href={route('password.request')}
                        style={{ fontFamily: DS.body, fontSize: '14px', color: '#C52034', fontWeight: 500, textDecoration: 'underline' }}
                    >
                        Mot de passe oublié ?
                    </Link>
                </div>

                <button type="submit" disabled={processing} className="btn-lad-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                    Se connecter
                </button>

                <div style={{ borderTop: '1px solid #EDEDED', marginTop: '8px', paddingTop: '24px', textAlign: 'center' }}>
                    <p style={{ fontFamily: DS.body, fontSize: '14px', color: '#707070', margin: 0 }}>
                        Pas encore de compte ?{' '}
                        <Link href={route('register')} style={{ color: '#000', textDecoration: 'underline' }}>
                            S'inscrire
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
