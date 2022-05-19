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
  $contrasenya = $jsonUsuarios->contrasenya;
  $encriptado = md5($contrasenya);

  //Comprobar en la base de datos el login
  $sql = "SELECT * FROM usuarios WHERE correo=? AND contrasenya=?";

        //Le pasamos la linea 26 como consulta
        $sentencia = $pdoObject->prepare($sql);
        //Le pasamos valores ->
        //1 ? es correo
        $sentencia->bindParam(1, $correo);
        //2 ? es contraseña
        $sentencia->bindParam(2, $encriptado);
        //Ejecutamos sentencia
        $sentencia->execute();
        //Convierte resultado a array_assoc
        $result = $sentencia->fetch(PDO::FETCH_ASSOC);

            //Si hay cosas dentro, te devuelve los datos
            if ($result) {
              echo json_encode([$result]);

            } else {
              echo json_encode("X");
            }

  ?>
