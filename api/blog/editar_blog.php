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

        $jsonBlogUpdate = json_decode(file_get_contents("php://input")); //Pilla todos los datos.
        if(!$jsonBlogUpdate){
          exit("No hay datos");
        }

        $titulo = $jsonBlogUpdate->titulo;
        $contenido = $jsonBlogUpdate->contenido;
        $imagen = $jsonBlogUpdate->imagen;
        $idString = $jsonBlogUpdate->id;
        $idNumber = intval($idString);

        $sql = "UPDATE blog SET titulo=?, contenido=?, imagen=? WHERE id=?;";

        $sentencia = $pdoObject->prepare($sql);
        $sentencia->bindParam(1, $titulo);
        $sentencia->bindParam(2, $contenido);
        $sentencia->bindParam(3, $imagen);
        $sentencia->bindParam(4, $idNumber);

        if ($sentencia->execute()) {
          echo json_encode(["success"=>1]);
        } else {
          echo json_encode(["success"=>2]);
        }
?>
