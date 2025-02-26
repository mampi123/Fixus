<?php
if (!$_POST) exit;

// Obtener datos del formulario
$contacto = trim($_POST['contacto']);
$cuit = trim($_POST['cuit']);

if ($contacto == '') {
    echo '<div class="alert alert-error">Debe ingresar su WhatsApp o email.</div>';
    exit();
} else if ($cuit == '') {
    echo '<div class="alert alert-error">Debe ingresar su CUIT o Razón Social.</div>';
    exit();
}

// Configuración del correo
$address = "mampelmartina@gmail.com"; // Correo donde quieres recibir los mensajes
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

// Enviar el correo
if (mail($address, $e_subject, $e_body, $headers)) {
    echo "<div class='alert alert-success'>";
    echo "<h3>✅ Correo enviado correctamente.</h3>";
    echo "<p>Gracias, su mensaje ha sido enviado exitosamente.</p>";
    echo "</div>";
} else {
    echo "<div class='alert alert-error'>❌ Error al enviar el correo. Por favor, inténtelo nuevamente más tarde.</div>";
    exit();
}
?>
