import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submitCode = (e) => {
        e.preventDefault();
        post(route('verification.code'));
    };

    const resendEmail = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Vérification Email" />

            <div className="mb-4 text-sm text-gray-600" style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: '16px' }}>
                Merci pour votre inscription ! Avant de commencer, veuillez vérifier votre adresse email en saisissant le code à 6 chiffres que nous venons de vous envoyer. Si vous n'avez pas reçu l'email, nous pouvons vous en renvoyer un autre.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                    Un nouveau code de vérification a été envoyé à l'adresse email fournie lors de l'inscription.
                </div>
            )}

            <form onSubmit={submitCode}>
                <div className="mt-4">
                    <label htmlFor="code" className="block text-sm font-medium text-slate-700 mb-1" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        Code de vérification
                    </label>
                    <input
                        id="code"
                        type="text"
                        name="code"
                        value={data.code}
                        className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-[#C52034] focus:border-[#C52034]"
                        onChange={(e) => setData('code', e.target.value)}
                        required
                        autoFocus
                        placeholder="Ex: 123456"
                        maxLength="6"
                        style={{ textAlign: 'center', letterSpacing: '5px', fontSize: '18px', fontWeight: 'bold' }}
                    />
                    {errors.code && <div className="text-red-600 mt-2 text-sm">{errors.code}</div>}
                </div>

                <div className="mt-6 flex flex-col space-y-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#1e293b] hover:bg-[#0f172a] text-white px-6 py-3 text-sm font-medium transition-colors shadow-sm disabled:opacity-50 uppercase tracking-widest text-center"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                        Valider le code
                    </button>

                    <button
                        type="button"
                        onClick={resendEmail}
                        className="w-full text-sm text-[#C52034] hover:underline"
                        style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: '15px' }}
                    >
                        Renvoyer le code
                    </button>
                </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm text-gray-500 underline hover:text-gray-900"
                    style={{ fontFamily: "'EB Garamond', Georgia, serif" }}
                >
                    Se déconnecter
                </Link>
            </div>
        </GuestLayout>
    );
}
