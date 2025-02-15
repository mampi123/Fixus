<?php
// Verifica que se haya enviado el formulario
if (!$_POST) exit;

// Función sencilla para validar correo electrónico usando filter_var
function isEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Recoger y limpiar los datos enviados por POST
$name     = trim($_POST['name']);
$email    = trim($_POST['email']);
$phone    = trim($_POST['phone']);
$comments = trim($_POST['comments']);

// Validación de campos
if ($name == '') {
    echo '<div class="alert alert-error">Debe ingresar su nombre.</div>';
    exit();
} elseif ($email == '') {
    echo '<div class="alert alert-error">Debe ingresar su correo electrónico.</div>';
    exit();
} elseif (!isEmail($email)) {
    echo '<div class="alert alert-error">Debe ingresar un correo electrónico válido.</div>';
    exit();
} elseif ($phone == '') {
    echo '<div class="alert alert-error">Debe ingresar su teléfono.</div>';
    exit();
} elseif ($comments == '') {
    echo '<div class="alert alert-error">Debe ingresar su mensaje o comentarios.</div>';
    exit();
}

// Incluye las clases de PHPMailer
// Si instalaste PHPMailer con Composer, puedes incluir el autoload:
require 'vendor/autoload.php';

// Si no usas Composer, asegúrate de incluir manualmente estos archivos:
/// require 'path/to/PHPMailer/src/Exception.php';
/// require 'path/to/PHPMailer/src/PHPMailer.php';
/// require 'path/to/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Instancia PHPMailer
$mail = new PHPMailer(true);

try {
    // Configuración del servidor SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';           // Servidor SMTP de Gmail
    $mail->SMTPAuth   = true;                         // Habilitar autenticación SMTP
    $mail->Username   = 'fixuscontacto@gmail.com';          // Tu dirección de correo Gmail
    $mail->Password   = '!Fixus123';              // Tu contraseña (o App Password si usas 2FA)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Habilitar encriptación TLS
    $mail->Port       = 587;                          // Puerto TCP para TLS

    // Configurar el remitente y destinatarios
    $mail->setFrom('fixuscontacto@gmail.com', 'Fixus - Consultora para Pymes'); // Remitente: tu correo
    $mail->addAddress('mampelmartina@gmail.com');     // Destinatario: tu correo de recepción
    $mail->addReplyTo($email, $name);                 // Responder a la dirección del interesado

    // Contenido del correo
    $mail->isHTML(false); // Enviar como texto plano
    $mail->Subject = 'Fixus Consulta';
    
    // Construir el cuerpo del mensaje
    $body  = "Ha recibido un nuevo contacto desde su sitio web." . PHP_EOL . PHP_EOL;
    $body .= "Nombre: $name" . PHP_EOL;
    $body .= "Correo: $email" . PHP_EOL;
    $body .= "Teléfono: $phone" . PHP_EOL . PHP_EOL;
    $body .= "Mensaje:" . PHP_EOL;
    $body .= $comments . PHP_EOL . PHP_EOL;
    $body .= "------------------------" . PHP_EOL;
    $body .= "Este correo fue enviado desde el formulario de contacto." . PHP_EOL;

    $mail->Body = $body;

    // Envía el correo
    $mail->send();

    echo "<div class='alert alert-success'>";
    echo "<h3>Correo enviado correctamente.</h3>";
    echo "<p>Gracias <strong>$name</strong>, su mensaje ha sido enviado exitosamente.</p>";
    echo "</div>";
} catch (Exception $e) {
    echo "<div class='alert alert-error'>Error al enviar el correo: " . $mail->ErrorInfo . "</div>";
}
?>