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
  $jsonProductos = json_decode(file_get_contents("php://input")); //Pilla todos los datos.
  if(!$jsonProductos){
    exit("No hay datos");
  }

  $nombre = $jsonProductos->nombre;
  $precio = $jsonProductos->precio;
  $descripcion = $jsonProductos->descripcion;
  $categoria = $jsonProductos->categoria;
  $marca = $jsonProductos->marca;
  $imagen = $jsonProductos->imagen;
  $stock = $jsonProductos->stock;

  //Meter en la base de datos el blog
  $sql = "INSERT INTO productos (nombre, precio, descripcion, categoria, marca, imagen, stock) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $sentencia = $pdoObject->prepare($sql);
        $sentencia->bindParam(1, $nombre);
        $sentencia->bindParam(2, $precio);
        $sentencia->bindParam(3, $descripcion);
        $sentencia->bindParam(4, $categoria);
        $sentencia->bindParam(5, $marca);
        $sentencia->bindParam(6, $imagen);
        $sentencia->bindParam(7, $stock);

        if ($sentencia->execute()) {
          $last_id = $pdoObject->lastInsertId();
          $mensaje = "Producto creado correctamente.";
        } else {
          $mensaje = "Fallo al crear producto.";
        }
?>
