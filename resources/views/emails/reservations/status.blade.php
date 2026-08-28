<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mise à jour de votre réservation</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F4F4;font-family:'Georgia',serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F4F4;padding:40px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        {{-- Header --}}
        <tr>
          <td style="background-color:#000000;padding:32px 40px;">
            <p style="margin:0;font-family:'Georgia',serif;font-size:11px;font-weight:400;letter-spacing:0.2em;text-transform:uppercase;color:#97D2D4;">Centre Culturel</p>
            <h1 style="margin:6px 0 0;font-family:'Georgia',serif;font-size:24px;font-weight:300;color:#FFFFFF;letter-spacing:0.05em;">LIXUS · LARACHE</h1>
          </td>
        </tr>

        {{-- Status Banner --}}
        @if($reservation->statut === 'approuvee')
        <tr>
          <td style="background-color:#166534;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-family:'Georgia',serif;font-size:18px;font-weight:400;color:#FFFFFF;">
              ✅ &nbsp; Réservation <strong>Approuvée</strong>
            </p>
          </td>
        </tr>
        @elseif($reservation->statut === 'rejetee')
        <tr>
          <td style="background-color:#991B1B;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-family:'Georgia',serif;font-size:18px;font-weight:400;color:#FFFFFF;">
              ❌ &nbsp; Réservation <strong>Refusée</strong>
            </p>
          </td>
        </tr>
        @endif

        {{-- Body --}}
        <tr>
          <td style="background-color:#FFFFFF;padding:40px;">

            <p style="font-family:'Georgia',serif;font-size:16px;font-weight:300;color:#3C3C3C;line-height:1.7;margin-top:0;">
              Bonjour <strong>{{ $reservation->nom_association ?? optional($reservation->user)->name ?? 'Demandeur' }}</strong>,
            </p>

            @if($reservation->statut === 'approuvee')
            <p style="font-family:'Georgia',serif;font-size:15px;font-weight:300;color:#3C3C3C;line-height:1.7;">
              Nous avons le plaisir de vous informer que votre demande de réservation a été <strong style="color:#166534;">approuvée</strong> par l'administration du Centre Culturel Lixus.
            </p>
            <p style="font-family:'Georgia',serif;font-size:15px;font-weight:300;color:#3C3C3C;line-height:1.7;">
              Nous vous attendons le jour de l'événement. Merci de respecter les horaires convenus et la charte du centre.
            </p>
            @elseif($reservation->statut === 'rejetee')
            <p style="font-family:'Georgia',serif;font-size:15px;font-weight:300;color:#3C3C3C;line-height:1.7;">
              Nous sommes au regret de vous informer que votre demande de réservation a été <strong style="color:#991B1B;">refusée</strong>.
            </p>
            <p style="font-family:'Georgia',serif;font-size:15px;font-weight:300;color:#3C3C3C;line-height:1.7;">
              Pour toute question, n'hésitez pas à nous contacter.
            </p>
            @endif

            @if($reservation->motif)
            <div style="background-color:{{ $reservation->statut === 'approuvee' ? '#F0FDF4' : '#FEF2F2' }};border-left:4px solid {{ $reservation->statut === 'approuvee' ? '#166534' : '#C52034' }};padding:16px 20px;margin:20px 0;">
              <p style="font-family:'Georgia',serif;font-size:11px;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:#9D9D9D;margin:0 0 8px;">Remarque de l'administration</p>
              <p style="font-family:'Georgia',serif;font-size:15px;font-weight:300;color:#3C3C3C;line-height:1.6;margin:0;">{{ $reservation->motif }}</p>
            </div>
            @endif

            {{-- Reservation Details --}}
            <div style="border:1px solid #EDEDED;padding:24px;margin:28px 0;">
              <p style="font-family:'Georgia',serif;font-size:11px;font-weight:500;letter-spacing:0.15em;text-transform:uppercase;color:#9D9D9D;margin:0 0 16px;">Détails de votre réservation</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:'Georgia',serif;font-size:12px;color:#9D9D9D;text-transform:uppercase;letter-spacing:0.1em;padding:6px 0;width:130px;">Salle</td>
                  <td style="font-family:'Georgia',serif;font-size:15px;color:#000;padding:6px 0;"><strong>{{ optional($reservation->salle)->nom_salle ?? 'N/A' }}</strong></td>
                </tr>
                <tr>
                  <td style="font-family:'Georgia',serif;font-size:12px;color:#9D9D9D;text-transform:uppercase;letter-spacing:0.1em;padding:6px 0;">Date</td>
                  <td style="font-family:'Georgia',serif;font-size:15px;color:#000;padding:6px 0;">{{ \Carbon\Carbon::parse($reservation->date_activite)->format('d/m/Y') }}</td>
                </tr>
                <tr>
                  <td style="font-family:'Georgia',serif;font-size:12px;color:#9D9D9D;text-transform:uppercase;letter-spacing:0.1em;padding:6px 0;">Horaires</td>
                  <td style="font-family:'Georgia',serif;font-size:15px;color:#000;padding:6px 0;">{{ \Carbon\Carbon::parse($reservation->heure_debut)->format('H:i') }} — {{ \Carbon\Carbon::parse($reservation->heure_fin)->format('H:i') }}</td>
                </tr>
                <tr>
                  <td style="font-family:'Georgia',serif;font-size:12px;color:#9D9D9D;text-transform:uppercase;letter-spacing:0.1em;padding:6px 0;">Association</td>
                  <td style="font-family:'Georgia',serif;font-size:15px;color:#000;padding:6px 0;">{{ $reservation->nom_association ?? 'N/A' }}</td>
                </tr>
                <tr>
                  <td style="font-family:'Georgia',serif;font-size:12px;color:#9D9D9D;text-transform:uppercase;letter-spacing:0.1em;padding:6px 0;">Personnes</td>
                  <td style="font-family:'Georgia',serif;font-size:15px;color:#000;padding:6px 0;">{{ $reservation->nombre_personnes }} personnes</td>
                </tr>
              </table>
            </div>

            <p style="font-family:'Georgia',serif;font-size:14px;font-weight:300;color:#9D9D9D;line-height:1.6;margin-bottom:0;">
              Cordialement,<br>
              <strong style="color:#000;">L'administration du Centre Culturel Lixus</strong>
            </p>
          </td>
        </tr>

        {{-- Footer --}}
        <tr>
          <td style="background-color:#000000;padding:20px 40px;text-align:center;">
            <p style="margin:0;font-family:'Georgia',serif;font-size:12px;color:#97D2D4;">
              <a href="mailto:contact@lixusculture.ma" style="color:#97D2D4;text-decoration:none;">contact@lixusculture.ma</a>
              &nbsp;·&nbsp; +212 5 39 50 00 00
            </p>
            <p style="margin:8px 0 0;font-family:'Georgia',serif;font-size:11px;color:#707070;">
              © {{ date('Y') }} Centre Culturel Lixus — Avenue Mohammed V, Larache, Maroc
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
