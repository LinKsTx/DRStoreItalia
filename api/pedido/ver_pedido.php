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



        $id_usuario = $_GET["id_usuario"];
        $idNumber = intval($id_usuario);

        //Consulta
        $sql = "SELECT * FROM pedidos WHERE id_usuario = '$idNumber'";
        //Preparas
        $sentencia = $pdoObject->prepare($sql);
        $sentencia->execute();
        $result = $sentencia->fetchAll(PDO::FETCH_ASSOC);
        //Resultado
        if ($result) {
          echo json_encode($result);
        } else {
          echo "No funciona";
        }
?>
