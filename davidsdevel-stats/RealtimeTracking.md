La implementacion es realmente sencilla. Hacer una peticion fetch del cliente con el usuario nuevo o existente.

Este fetch se hara dentro del metodo "init" del Tracking del SDK.

POST /stats/session
{
  action: 'start'
}

Para cerrar la sesion se enviara otro fetch al servidor con: las rutas visitadas, el tiempo de permanencia

# To Do

- [ ] Crear campo "activeUsers" en el esquema Stats
- [ ]



```js
let user = localStorage.get('userID') || await this.parent.users.create();


```