La implementacion es realmente sencilla. Hacer una peticion fetch del cliente con el usuario nuevo o existente.

Este fetch se hara dentro del metodo "init" del Tracking del SDK.

Para cerrar la sesion se enviara otro fetch al servidor con: las rutas visitadas, el tiempo de permanencia

