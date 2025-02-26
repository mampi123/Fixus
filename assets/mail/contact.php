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

// Enviar correo
$address = "mampelmartina@gmail.com";
$e_subject = 'Nuevo Contacto - Fixus';

$e_body  = "Ha recibido un nuevo contacto desde su sitio web." . PHP_EOL . PHP_EOL;
$e_body .= "Contacto: $contacto" . PHP_EOL;
$e_body .= "CUIT / Razón Social: $cuit" . PHP_EOL;
$e_body .= "------------------------" . PHP_EOL;
$msg = wordwrap($e_body, 70);

$headers = "From: no-reply@fixus.com" . PHP_EOL;
$headers .= "Reply-To: no-reply@fixus.com" . PHP_EOL;
$headers .= "MIME-Version: 1.0" . PHP_EOL;
$headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

if (mail($address, $e_subject, $msg, $headers)) {
    echo "<div class='alert alert-success'>";
    echo "<h3>Correo enviado correctamente.</h3>";
    echo "<p>Gracias, su mensaje ha sido enviado exitosamente.</p>";
    echo "</div>";
} else {
    echo '<div class="alert alert-error">Error al enviar el correo. Por favor, inténtelo nuevamente más tarde.</div>';
    exit();
}
?>