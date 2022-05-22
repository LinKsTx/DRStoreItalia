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

  $pic = $jsonUsuarios->pic;
  $nick = $jsonUsuarios->nick;

  $sql = "UPDATE usuarios SET pic=? WHERE nick=?";
  $sentencia = $pdoObject->prepare($sql);
  $sentencia->bindParam(1, $pic);
  $sentencia->bindParam(2, $nick);
  $sentencia->execute();

  //La ejecutamos
  if ($sentencia->execute()) {
    echo json_encode(["success"=>1]);
  } else {
    echo json_encode(["success"=>0]);
  }


  ?>
