import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirmation du mot de passe - Centre Culturel Lixus" />

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontFamily: DS.display, fontSize: '28px', fontWeight: 300, color: '#000', marginBottom: '8px' }}>
                    Zone Sécurisée
                </h1>
                <p style={{ fontFamily: DS.body, fontSize: '14px', color: '#707070' }}>
                    Veuillez confirmer votre mot de passe avant de continuer.
                </p>
            </div>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label htmlFor="password" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>
                        Mot de passe *
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoFocus
                        onChange={(e) => setData('password', e.target.value)}
                        className="input-lad"
                        style={{ fontFamily: DS.body }}
                    />
                    {errors.password && <div style={{ color: '#C52034', fontFamily: DS.body, fontSize: '12px', marginTop: '4px' }}>{errors.password}</div>}
                </div>

                <div style={{ display: 'flex', items: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link
                        href={route('password.request')}
                        style={{ fontFamily: DS.body, fontSize: '14px', color: '#C52034', textDecoration: 'underline' }}
                    >
                        Mot de passe oublié ?
                    </Link>
                </div>

                <button type="submit" disabled={processing} className="btn-lad-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                    Confirmer
                </button>
            </form>
        </GuestLayout>
    );
}
