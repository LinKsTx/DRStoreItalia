<?php
  //Cabeceras
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
  header("Allow: GET, POST, OPTIONS, PUT, DELETE");

  //Conexión
  require("../conexion.php");

        $conexion= new Conexion();
        $pdoObject = $conexion->getConexion();


  //Recoge los datos de los inputs de angular (submit/post)
  $jsonUsuarios = json_decode(file_get_contents("php://input")); //Pilla todos los datos.
  if(!$jsonUsuarios){
    exit("No hay datos");
  }

  //creación de variables e igualarlas a lo del submit/post
  $nick = $jsonUsuarios->nick;
  $nombre =  $jsonUsuarios->nombre;
  $correo =  $jsonUsuarios->correo;
  $contrasenya = $jsonUsuarios->contrasenya;
  $tipodeusuario = 1;
  $encriptado = md5($contrasenya);

  $sql = "SELECT * FROM usuarios WHERE correo=?";
  $sentencia = $pdoObject->prepare($sql);
  $sentencia->bindParam(1, $correo);
  $sentencia->execute();

  $sql = "SELECT * FROM usuarios WHERE nick=?";
  $sentencia2 = $pdoObject->prepare($sql);
  $sentencia2->bindParam(1, $nick);

  $sentencia2->execute();
  $boolean1 = false;
  $boolean2 = false;

  //Sacar errores dependiendo de si nick o correo ya existen en la BBDD para poder diferenciarlos y validar
  //Si correo y nick ya existen
  if ($sentencia->rowCount() > 0 && $sentencia2->rowCount() > 0) {
    $boolean1 = true;
    $boolean2 = true;
    echo json_encode("5");
  } else {
    //Si correo ya existe
    if ($sentencia->rowCount() > 0) {
      echo json_encode("3");
        $boolean1 = true;
    }
    //Si nick ya existe
    if ($sentencia2->rowCount() > 0) {
      echo json_encode("4");
        $boolean2 = true;
    }
  }

if ($boolean1 == false && $boolean2 == false) {
  //Meter en la base de datos el registro
  $sql = "INSERT INTO usuarios (nombre, nick, correo, contrasenya ,tipo) VALUES (?, ?, ?, ?, ?)";
  $sentencia = $pdoObject->prepare($sql);
  $sentencia->bindParam(1, $nombre);
  $sentencia->bindParam(2, $nick);
  $sentencia->bindParam(3, $correo);
  $sentencia->bindParam(4, $encriptado);
  $sentencia->bindParam(5, $tipodeusuario);
  //La ejecutamos
  if ($sentencia->execute()) {
    echo json_encode(["success"=>1]);
  } else {
    echo json_encode(["success"=>0]);
  }
}

?>
