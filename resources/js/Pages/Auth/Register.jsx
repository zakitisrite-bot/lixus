import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Inscription - Centre Culturel Lixus" />

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontFamily: DS.display, fontSize: '28px', fontWeight: 300, color: '#000', marginBottom: '8px' }}>
                    Inscription
                </h1>
                <p style={{ fontFamily: DS.body, fontSize: '14px', color: '#707070' }}>
                    Rejoignez la communauté du Centre
                </p>
            </div>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label htmlFor="name" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>
                        Nom complet *
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        autoFocus
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        className="input-lad"
                        style={{ fontFamily: DS.body }}
                    />
                    {errors.name && <div style={{ color: '#C52034', fontFamily: DS.body, fontSize: '12px', marginTop: '4px' }}>{errors.name}</div>}
                </div>

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
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        className="input-lad"
                        style={{ fontFamily: DS.body }}
                    />
                    {errors.password && <div style={{ color: '#C52034', fontFamily: DS.body, fontSize: '12px', marginTop: '4px' }}>{errors.password}</div>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>
                        Confirmer le mot de passe *
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        className="input-lad"
                        style={{ fontFamily: DS.body }}
                    />
                    {errors.password_confirmation && <div style={{ color: '#C52034', fontFamily: DS.body, fontSize: '12px', marginTop: '4px' }}>{errors.password_confirmation}</div>}
                </div>

                <button type="submit" disabled={processing} className="btn-lad-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                    S'inscrire
                </button>

                <div style={{ borderTop: '1px solid #EDEDED', marginTop: '8px', paddingTop: '24px', textAlign: 'center' }}>
                    <p style={{ fontFamily: DS.body, fontSize: '14px', color: '#707070', margin: 0 }}>
                        Déjà inscrit ?{' '}
                        <Link href={route('login')} style={{ color: '#000', textDecoration: 'underline' }}>
                            Se connecter
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
