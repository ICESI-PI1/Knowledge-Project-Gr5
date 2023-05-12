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

## Clase CompanyModelTestCase

### Escenario
Crear una compañía con los datos proporcionados, verificar que la representación en cadena de la compañía sea correcta y verificar las excepciones asociadas a ingresar mal el Nit y el telefono.

### Prueba unitaria 1: test_company_creation
**Objetivo:** Verificar que la creación de una compañía con los datos proporcionados se realiza correctamente.

**Precondiciones:**
- Se debe haber creado una instancia de la clase Company con los datos proporcionados.

**Pasos de la prueba:**
1. Ejecutar la función test_company_creation.
2. Verificar que los atributos de la compañía creada sean correctos.

**Datos de prueba:**
- NIT: '1234567890'
- Nombre: 'Test Company'
- Dirección: 'ddf'
- Teléfono: '+573001234567'

**Resultados esperados:**
- Los atributos de la compañía creada deben ser iguales a los proporcionados.

### Prueba unitaria 2: test_company_str_representation
**Objetivo:** Verificar que la representación en cadena de una compañía creada con los datos proporcionados sea correcta.

**Precondiciones:**
- Se debe haber creado una instancia de la clase Company con los datos proporcionados.

**Pasos de la prueba:**
1. Ejecutar la función test_company_str_representation.
2. Verificar que la representación en cadena de la compañía creada sea correcta.

**Datos de prueba:**
- NIT: '1234567890'
- Nombre: 'Test Company'
- Dirección: 'ddf'
- Teléfono: '+573001234567'

**Resultados esperados:**
- La representación en cadena de la compañía creada debe ser igual a 'Test Company - NIT:  1234567890'.

### Prueba unitaria 3: test_company_nit_validation
**Objetivo:** Verificar que la validación de NIT funcione correctamente.

**Precondiciones:**
- Se debe haber creado una instancia de la clase Company con los datos proporcionados.

**Pasos de la prueba:**
1. Ejecutar la función test_company_nit_validation del código de prueba.
2. Verificar que se lance una excepción ValidationError para un NIT inválido con más de 10 dígitos.

**Datos de prueba:**
- NIT: '12345678899'
- Nombre: 'Test Company'
- Dirección: 'ddf'
- Teléfono: '+573001234567'

**Resultados esperados:**
- La función test_company_nit_validation debe lanzar una excepción ValidationError para un NIT inválido con más de 10 dígitos.

### Prueba unitaria 4: test_company_phone_validation
**Objetivo:** Verificar que la validación del teléfono funcione correctamente.

**Precondiciones:**
- Se debe haber creado una instancia de la clase Company con los datos proporcionados.

**Pasos de la prueba:**
1. Ejecutar la función test_company_phone_validation del código de prueba.
2. Verificar que se actualice correctamente el teléfono de la compañía con un número válido.
3. Verificar que se lance una excepción ValidationError para un número de teléfono inválido con menos de 8 dígitos.
4. Verificar que se lance una excepción ValidationError para un número de teléfono inválido con más de 10 dígitos.

**Datos de prueba:**

- Teléfono: '123456789'

- NIT: '12345678899'
- Nombre: 'Test Company'
- Dirección: 'ddf'
- Teléfono: '1234567'

- NIT: '12345678891'
- Nombre: 'Test Company'
- Dirección: 'ddf'
- Teléfono: '1234567891011'

**Resultados esperados:**
- La función test_company_phone_validation debe actualizar correctamente el número de teléfono de la compañía con un número válido.
- La función test_company_phone_validation debe lanzar una excepción ValidationError para un número de teléfono inválido con menos de 8 dígitos.
- La función test_company_phone_validation debe lanzar una excepción ValidationError para un número de teléfono inválido con más de 10 dígitos.

### Plan de prueba
| Prueba | Objetivo | Precondiciones | Pasos | Resultados esperados |
| --- | --- | --- | --- | --- |
| test_company_creation | Verificar que la creación de una compañía con los datos proporcionados se realiza correctamente. | Se debe haber creado una instancia de la clase Company con los datos proporcionados. | 1. Ejecutar la función test_company_creation.<br>2. Verificar que los atributos de la compañía creada sean correctos. | Los atributos de la compañía creada deben ser iguales a los proporcionados. |
| test_company_str_representation | Verificar que la representación en cadena de una compañía creada con los datos proporcionados sea correcta. | Se debe haber creado una instancia de la clase Company con los datos proporcionados. | 1. Ejecutar la función test_company_str_representation.<br>2. Verificar que la representación en cadena de la compañía creada sea correcta. | La representación en cadena de la compañía creada debe ser igual a 'Test Company - NIT:  1234567890'. |
| test_company_nit_validation | Verificar que la validación de NIT funcione correctamente. | Se debe haber creado una instancia de la clase Company con los datos proporcionados. | 1. Ejecutar la función test_company_nit_validation del código de prueba.<br>2. Verificar que se lance una excepción ValidationError para un NIT inválido con más de 10 dígitos. | La función test_company_nit_validation debe lanzar una excepción ValidationError para un NIT inválido con más de 10 dígitos. |
| test_company_phone_validation | Verificar que la validación del teléfono funcione correctamente. | Se debe haber creado una instancia de la clase Company con los datos proporcionados. | 1. Ejecutar la función test_company_phone_validation del código de prueba.<br>2. Verificar que se actualice correctamente el teléfono de la compañía con un número válido.<br>3. Verificar que se lance una excepción ValidationError para un número de teléfono inválido con menos de 8 dígitos.<br>4. Verificar que se lance una excepción ValidationError para un número de teléfono inválido con más de 10 dígitos. | - La función test_company_phone_validation debe actualizar correctamente el número de teléfono de la compañía con un número válido.<br>- La función test_company_phone_validation debe lanzar una excepción ValidationError para un número de teléfono inválido con menos de 8 dígitos.<br>- La función test_company_phone_validation debe lanzar una excepción ValidationError para un número de teléfono inválido con más de 10 dígitos. |

## Clase CategoryModelTestCase

## Pruebas Unitarias

### Escenario
Crear una categoría con los datos proporcionados y verificar que la representación en cadena y la carga de la foto se realicen correctamente.

### Prueba unitaria 1: test_category_str_representation
**Objetivo:** Verificar que la representación en cadena de una categoría creada con los datos proporcionados sea correcta.

**Precondiciones:**
- Se debe haber creado una instancia de la clase Category con los datos proporcionados.

**Pasos de la prueba:**
1. Ejecutar la función test_category_str_representation.
2. Verificar que la representación en cadena de la categoría creada sea correcta.

**Datos de prueba:**
- Nombre: 'Test Category'
- Foto: 'path/to/photo.jpg'

**Resultados esperados:**
- La representación en cadena de la categoría creada debe ser igual a '1 - Name: Test Category'.

### Prueba unitaria 2: test_category_photo_upload
**Objetivo:** Verificar que la carga de la foto de una categoría creada con los datos proporcionados se realiza correctamente.

**Precondiciones:**
- Se debe haber creado una instancia de la clase Category con los datos proporcionados.

**Pasos de la prueba:**
1. Ejecutar la función test_category_photo_upload.
2. Verificar que la foto de la categoría creada sea correcta.

**Datos de prueba:**
- Nombre: 'Test Category'
- Foto: 'path/to/photo.jpg'

**Resultados esperados:**
- La foto de la categoría creada debe ser igual a 'path/to/photo.jpg'.

### Prueba unitaria 3: test_category_photo_upload_blank
**Objetivo:** Verificar que la carga de una foto en blanco de una categoría creada con los datos proporcionados se realiza correctamente.

**Precondiciones:**
- No debe haber categorías creadas con una foto en blanco.

**Pasos de la prueba:**
1. Ejecutar la función test_category_photo_upload_blank.
2. Verificar que la foto de la categoría creada sea en blanco.

**Datos de prueba:**
- Nombre: 'Blank Photo Category'
- Foto: ''

**Resultados esperados:**
- La foto de la categoría creada debe ser una cadena vacía.

### Plan de prueba
| Prueba | Objetivo | Precondiciones | Pasos | Resultados esperados |
| --- | --- | --- | --- | --- |
| test_category_str_representation | Verificar que la representación en cadena de una categoría creada con los datos proporcionados sea correcta. | Se debe haber creado una instancia de la clase Category con los datos proporcionados. | 1. Ejecutar la función test_category_str_representation.<br>2. Verificar que la representación en cadena de la categoría creada sea correcta. | La representación en cadena de la categoría creada debe ser igual a '1 - Name: Test Category'. |
| test_category_photo_upload | Verificar que la carga de la foto de una categoría creada con los datos proporcionados se realiza correctamente. | Se debe haber creado una instancia de la clase Category con los datos proporcionados. | 1. Ejecutar la función test_category_photo_upload.<br>2. Verificar que la foto de la categoría creada sea correcta. | La foto de la categoría creada debe ser igual a 'path/to/photo.jpg'. |
| test_category_photo_upload_blank | Verificar que la carga de una foto en blanco de una categoría creada con los datos proporcionados se realiza correctamente. | No debe haber categorías creadas con una foto en blanco. | 1. Ejecutar la función test_category_photo_upload_blank.<br>2. Verificar que la foto de la categoría creada sea en blanco. | La foto de la categoría creada debe ser una cadena vacía. |