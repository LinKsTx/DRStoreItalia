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

  $titulo = $jsonUsuarios->titulo;
  $contenido = $jsonUsuarios->contenido;
  $imagen = $jsonUsuarios->imagen;
  $fecha = $jsonUsuarios->fecha;

  //Meter en la base de datos el blog
  $sql = "INSERT INTO blog (titulo,contenido,imagen,fecha) VALUES (?, ?, ?, ?)";
        $sentencia = $pdoObject->prepare($sql);
        $sentencia->bindParam(1, $titulo);
        $sentencia->bindParam(2, $contenido);
        $sentencia->bindParam(3, $imagen);
        $sentencia->bindParam(4, $fecha);

        if ($sentencia->execute()) {
          $last_id = $pdoObject->lastInsertId();
          $mensaje = "Registro creado correctamente.";
        }
?>
