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

  //creación de variables para igualar
  $correo =  $jsonUsuarios->correo;
  $contrasenya =  $jsonUsuarios->contrasenya;

  //Comprobar en la base de datos el login
  $sql = "SELECT * FROM usuarios WHERE correo=? AND contrasenya=?";

        $sentencia = $pdoObject->prepare($sql);
        $sentencia->bindParam(1, $correo);
        $sentencia->bindParam(2, $contrasenya);
        $sentencia->execute();
        $result = $sentencia->fetch(PDO::FETCH_ASSOC);
            if ($result) {
              echo json_encode([$result]);

            } else {
              echo json_encode(["success"=>0]);
            }

  ?>
