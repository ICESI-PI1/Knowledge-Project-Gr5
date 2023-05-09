# Plan de Pruebas
## Clase UserModelTestCase
### Método test_user_creation
Descripción: Prueba la creación de un usuario.
Precondiciones:

No hay usuarios creados en la base de datos.
Pasos:

Crear un usuario con los siguientes datos:
user_cc: "1234567890"
full_name: "John Doe"
email: "johndoe@example.com"
phone: "1234567890"
birth_date: "1990-01-01"
password: "testpassword"
Verificar que la cantidad de usuarios en la base de datos sea igual a 1.
Verificar que los atributos del usuario coincidan con los valores especificados.
Verificar que el usuario no sea un miembro del staff.
Verificar que el usuario esté activo.
Resultados esperados:

Se crea un usuario correctamente en la base de datos con los atributos y estado esperados.
### Método test_user_str_representation
Descripción: Prueba la representación en cadena de un usuario.
Precondiciones:

Hay un usuario creado en la base de datos.
Pasos:

Obtener la representación en cadena del usuario.
Verificar que la representación en cadena coincida con el nombre completo del usuario.
Resultados esperados:

La representación en cadena del usuario coincide con el nombre completo.
## Clase RoleModelTestCase
### Método test_role_creation
Descripción: Prueba la creación de un rol.
Precondiciones:

No hay roles creados en la base de datos.
Pasos:

Crear un rol con el nombre "Admin".
Verificar que la cantidad de roles en la base de datos sea igual a 1.
Verificar que el nombre del rol coincida con el valor especificado.
Resultados esperados:

Se crea un rol correctamente en la base de datos con el nombre esperado.
### Método test_role_str_representation
Descripción: Prueba la representación en cadena de un rol.
Precondiciones:

Hay un rol creado en la base de datos.
Pasos:

Obtener la representación en cadena del rol.
Verificar que la representación en cadena coincida con el formato "1 - Name: Admin", donde 1 es el ID del rol y "Admin" es el nombre del rol.
Resultados esperados:

La representación en cadena del rol coincide con el formato esperado.
## Clase UserRoleModelTestCase
### Método test_user_role_creation
Descripción: Prueba la creación de una relación entre usuario y rol.
Precondiciones:

No hay relaciones entre usuarios y roles creadas en la base de datos.
Pasos:

Crear un usuario y un rol.
Crear una relación entre el usuario y el rol.
Verificar que la cantidad de relaciones entre usuarios y roles en la base de datos sea igual a 1.
Verificar que el usuario y el rol de la relación coincidan con los valores especificados.
Resultados esperados:

Se crea una relación entre usuario y rol correctamente en la base de datos con los valores esperados.