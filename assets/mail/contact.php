<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (!$_POST) exit;

// Función para validar la dirección de correo (no modificar)
function isEmail($email) {
    return (preg_match("/^[-_.[:alnum:]]+@((([[:alnum:]]|[[:alnum:]][[:alnum:]-]*[[:alnum:]])\.)+(ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$/i", $email));
}

if (!defined("PHP_EOL")) define("PHP_EOL", "\r\n");

$name     = trim($_POST['name']);
$email    = trim($_POST['email']);
$phone    = trim($_POST['phone']);
$comments = trim($_POST['comments']);

if ($name == '') {
    echo '<div class="alert alert-error">Debe ingresar su nombre.</div>';
    exit();
} else if ($email == '') {
    echo '<div class="alert alert-error">Debe ingresar su correo electrónico.</div>';
    exit();
} else if (!isEmail($email)) {
    echo '<div class="alert alert-error">Debe ingresar un correo electrónico válido.</div>';
    exit();
} else if ($phone == '') {
    echo '<div class="alert alert-error">Debe ingresar su teléfono.</div>';
    exit();
} else if ($comments == '') {
    echo '<div class="alert alert-error">Debe ingresar su mensaje o comentarios.</div>';
    exit();
}

if (get_magic_quotes_gpc()) {
    $comments = stripslashes($comments);
}

// Configuración: Dirección de correo donde se enviarán los emails.
$address = "mampelmartina@gmail.com";

// Configuración: Asunto del correo.
$e_subject = 'Fixus Consulta';

// Construir el cuerpo del mensaje
$e_body  = "Ha recibido un nuevo contacto desde su sitio web." . PHP_EOL . PHP_EOL;
$e_body .= "Nombre: $name" . PHP_EOL;
$e_body .= "Correo: $email" . PHP_EOL;
$e_body .= "Teléfono: $phone" . PHP_EOL . PHP_EOL;
$e_body .= "Mensaje:" . PHP_EOL;
$e_body .= $comments . PHP_EOL . PHP_EOL;
$e_body .= "------------------------" . PHP_EOL;
$e_body .= "Este correo fue enviado desde el formulario de contacto." . PHP_EOL;

$msg = wordwrap($e_body, 70);

$headers = "From: $email" . PHP_EOL;
$headers .= "Reply-To: $email" . PHP_EOL;
$headers .= "MIME-Version: 1.0" . PHP_EOL;
$headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

if (mail($address, $e_subject, $msg, $headers)) {
    echo "<div class='alert alert-success'>";
    echo "<h3>Correo enviado correctamente.</h3>";
    echo "<p>Gracias <strong>$name</strong>, su mensaje ha sido enviado exitosamente.</p>";
    echo "</div>";
} else {
    echo '<div class="alert alert-error">Error al enviar el correo. Por favor, inténtelo nuevamente más tarde.</div>';
}
?>