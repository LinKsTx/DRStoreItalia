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

  //Meter en la base de datos el registro
  $sql = "INSERT INTO usuarios (nombre, nick, correo, contrasenya ,tipo) VALUES (?, ?, ?, ?, ?)";

            $sentencia = $pdoObject->prepare($sql);
            $sentencia->bindParam(1, $nick);
            $sentencia->bindParam(2, $nombre);
            $sentencia->bindParam(3, $correo);
            $sentencia->bindParam(4, $encriptado);
            $sentencia->bindParam(5, $tipodeusuario);

            //La ejecutamos
            if (@$sentencia->execute()) {
              echo json_encode(["success"=>1]);
          } else {
              echo json_encode(["success"=>0]);
          }
?>
