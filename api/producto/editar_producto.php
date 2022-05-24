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

        $jsonProductUpdate = json_decode(file_get_contents("php://input")); //Pilla todos los datos.
        if(!$jsonProductUpdate){
          exit("No hay datos");
        }

        $nombre = $jsonProductUpdate->nombre;
        $precio = $jsonProductUpdate->precio;
        $descripcion = $jsonProductUpdate->descripcion;
        $categoria = $jsonProductUpdate->categoria;
        $marca = $jsonProductUpdate->marca;
        $imagen = $jsonProductUpdate->imagen;
        $stock = $jsonProductUpdate->stock;
        $idString = $jsonProductUpdate->id;
        $idNumber = intval($idString);

        $sql = "UPDATE productos SET nombre=?, precio=?, descripcion=?, categoria=?, marca=?, imagen=?, stock=? WHERE id=?;";

        $sentencia = $pdoObject->prepare($sql);
        $sentencia->bindParam(1, $nombre);
        $sentencia->bindParam(2, $precio);
        $sentencia->bindParam(3, $descripcion);
        $sentencia->bindParam(4, $categoria);
        $sentencia->bindParam(5, $marca);
        $sentencia->bindParam(6, $imagen);
        $sentencia->bindParam(7, $stock);
        $sentencia->bindParam(8, $idNumber);

        if ($sentencia->execute()) {
          echo json_encode(["success"=>1]);
        } else {
          echo json_encode(["success"=>2]);
        }
?>
