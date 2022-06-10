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
  $jsonPedidos = json_decode(file_get_contents("php://input")); //Pilla todos los datos.
  if(!$jsonPedidos){
    exit("No hay datos");
  }

  $pedido = $jsonPedidos->pedido;
  $id_usuario = $jsonPedidos->id_usuario;
  $fecha_pedido = $jsonPedidos->fecha_pedido;


  //Meter en la base de datos el blog
  $sql = "INSERT INTO pedidos (pedido, fecha_pedido, id_usuario) VALUES (?, ?, ?)";
        $sentencia = $pdoObject->prepare($sql);
        $sentencia->bindParam(1, $pedido);
        $sentencia->bindParam(2, $fecha_pedido);
        $sentencia->bindParam(3, $id_usuario);


        if ($sentencia->execute()) {
          $last_id = $pdoObject->lastInsertId();
          $mensaje = "Pedido creado correctamente.";
        } else {
          $mensaje = "Fallo al crear pedido.";
        }
?>
