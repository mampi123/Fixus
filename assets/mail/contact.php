<?php
if (!$_POST) exit;

$contacto = trim($_POST['contacto']);
$cuit = trim($_POST['cuit']);

if ($contacto == '') {
    echo json_encode(["status" => "error", "message" => "❌ Debe ingresar su WhatsApp o email."]);
    exit;
}
if ($cuit == '') {
    echo json_encode(["status" => "error", "message" => "❌ Debe ingresar su CUIT o Razón Social."]);
    exit;
}

$address = "info@fixusconsultora.com";
$e_subject = "Nuevo Contacto - Fixus";

$e_body  = "Ha recibido un nuevo contacto desde su sitio web.\n\n";
$e_body .= "📞 Contacto: $contacto\n";
$e_body .= "📌 CUIT / Razón Social: $cuit\n";
$e_body .= "------------------------";

$headers = "From: no-reply@goldenrod-pony-702753.hostingersite.com\r\n";
$headers .= "Reply-To: $contacto\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "Content-Transfer-Encoding: quoted-printable\r\n";

if (mail($address, $e_subject, $e_body, $headers)) {
    echo json_encode(["status" => "success", "message" => "✅ Correo enviado correctamente. Gracias por contactarnos."]);
} else {
    echo json_encode(["status" => "error", "message" => "❌ Error al enviar el correo. Por favor, intenta nuevamente."]);
}
?>
