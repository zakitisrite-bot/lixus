<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Vérification de votre adresse email</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-w-xl mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-sm text-center">
        <h2 style="color: #333;">Bienvenue au Centre Culturel Lixus</h2>
        <p style="color: #555; font-size: 16px;">Veuillez utiliser le code ci-dessous pour vérifier votre adresse email :</p>
        
        <div style="margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #C52034; background-color: #f4f4f4; padding: 15px 30px; border-radius: 8px;">
                {{ $code }}
            </span>
        </div>

        <p style="color: #555; font-size: 14px;">Si vous n'avez pas créé de compte, aucune action n'est requise.</p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #999; font-size: 12px;">© {{ date('Y') }} Centre Culturel Lixus. Tous droits réservés.</p>
    </div>
</body>
</html>
