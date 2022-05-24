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

        $idString= $_GET["id"];
        $idNumber = intval($idString);

        //Consulta
        $sql = "DELETE FROM blog WHERE id=?";
        //Preparas
        $sentencia = $pdoObject->prepare($sql);
        $sentencia->bindParam(1, $idNumber);

        if ($sentencia->execute()) {
          echo json_encode(["success"=>1]);
        } else {
          echo json_encode(["success"=>2]);
        }
?>
