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

  $nick = $jsonUsuarios->nick;

  //Comprobar en la base de datos el login
  $sql = "SELECT pic FROM usuarios WHERE nick=?";

        //Le pasamos la linea 26 como consulta
        $sentencia = $pdoObject->prepare($sql);
        //Le pasamos valores ->
        $sentencia->bindParam(1, $nick);
        //Ejecutamos sentencia
        $sentencia->execute();
        //Convierte resultado a array_assoc
        $result = $sentencia->fetch(PDO::FETCH_ASSOC);

        //Si hay cosas dentro, te devuelve los datos
        if ($result) {
          echo json_encode([$result]);
        } else {
          echo json_encode("Z");
        }

  ?>
