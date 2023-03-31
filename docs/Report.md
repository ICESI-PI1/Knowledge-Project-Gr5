# Informe del primer sprint del proyecto Knewledge Projects.

## Descripción

En el siguiente informe se detallan punto por punto del diseño y desarrollo del sprint, ademas de referenciar a los items producto de cada actividad y su realizador.

### 1. Base de datos:

**Participante(s): Juan David Garzon Diaz**

En primer lugar realizamos un análisis de requerimientos e identificamos las entidades y sus respectivos atributos, corrigiendo y añadiendo algunas entidades como ROL durante las reuniones con el profesor, luego realizamos un modelo de la base de datos preliminar y nos reunimos con Sean, donde añadimos la entidad REPORTS y realizamos un cambio en BINNACLE, aunque después durante la reunión con el profesor se elimino REPORTS y BINNACLE volvió a como era anteriormente, también se añadieron las entidades de ANNOUNCEMENT y sus respectivos atributos y relaciones.
¡[BD](https://i.imgur.com/wlGVrPk.png)
![Excel]( https://i.imgur.com/lxlonf1.png)

### 2. ADMIN DJANGO (https://github.com/ICESI-PI1/Knowledge-Project-Gr5/tree/functional-prototype)

**Participante(s): Juan Camilo González**

Los modelos usados en esta entrega no serán usados directamente en entregas e incrementos posteriores. Se realizaron cambios en el modelo de datos y se hicieron modificaciones en el código que aún no se ven reflejadas en esta entrega *(Cambios en relaciones y entidades, Class Bassed Views)*.

**Users (django model):**
![users](https://github.com/IntegradorTeam/PI-Project-KnowledgeProjects/blob/main/Images/CRUD%20&%20View/WhatsApp%20Image%202023-03-30%20at%209.09.39%20PM.jpeg?raw=true)
**Projects (Own model)**
![project](https://github.com/IntegradorTeam/PI-Project-KnowledgeProjects/blob/main/Images/CRUD%20&%20View/WhatsApp%20Image%202023-03-30%20at%209.10.44%20PM.jpeg?raw=true)

### 3. Diagrama de clases
**Participante(s): Geovanny Quintero Velez.** 
Se realizo un analisis de los requerimientos y se identificarón las clases que formarian parte del sistema, sus metodos, atributos y interacciones con otras clases. Luego se modelo el diagrama de clases preliminar de tal modo que siguiera la logica del programa y tuviera a su vez calidad. Despues de las reuniones con el monitor y el profesor se ajusto el diagrama de clases para que siguiera de mejor manera el diagrama de bases de datos. Se implementaron los patrones de diseño DAO para modelar el uso de la base de datos y MVC para Modelar las interacciones con la vista.

![Class Diagram](https://ibb.co/dtXSSN1)

### 4. AUTENTICACIÓN DJANGO (https://github.com/ICESI-PI1/Knowledge-Project-Gr5/tree/functional-prototype)

**Participante(s): Juan Camilo González**

Se realizarán cambios en el código:  

* S O L I D
* Class-Bassed-Views

**Página de inicio:**
![home](https://github.com/Juank114Gonzalez/images/blob/master/WhatsApp%20Image%202023-03-30%20at%208.58.28%20PM.jpeg?raw=true)
**Página de inicio de sesión:**
![login](https://github.com/Juank114Gonzalez/images/blob/master/WhatsApp%20Image%202023-03-30%20at%208.59.08%20PM.jpeg?raw=true)
**Página de registro de usuario:**
![signup](https://github.com/IntegradorTeam/PI-Project-KnowledgeProjects/blob/main/Images/CRUD%20&%20View/WhatsApp%20Image%202023-03-30%20at%208.59.10%20PM.jpeg?raw=true)

### 5. PROTOTIPO DE VISTA

**Participante(s): Juan Camilo González**

El diseño usado no es fiel a los protoripos creados en *Figma*, todo el diseño en *HTML* y *CSS* será hecho lo más apegado a los hechos en dicha herramienta. Además se ha planteado la posibilidad de usar *React.js* como framework para la parte del front-end

**Página de proyectos activos**
![pending_projects](https://github.com/IntegradorTeam/PI-Project-KnowledgeProjects/blob/main/Images/CRUD%20&%20View/WhatsApp%20Image%202023-03-30%20at%209.00.20%20PM.jpeg?raw=true)
![created_projects](https://github.com/IntegradorTeam/PI-Project-KnowledgeProjects/blob/main/Images/CRUD%20&%20View/WhatsApp%20Image%202023-03-30%20at%209.02.28%20PM.jpeg?raw=true)
**Página de edición de proyectos:**
![edit_project](https://github.com/IntegradorTeam/PI-Project-KnowledgeProjects/blob/main/Images/CRUD%20&%20View/WhatsApp%20Image%202023-03-30%20at%209.03.13%20PM.jpeg?raw=true)
**Página de proyectos completados**
![image](https://github.com/IntegradorTeam/PI-Project-KnowledgeProjects/blob/main/Images/CRUD%20&%20View/WhatsApp%20Image%202023-03-30%20at%209.03.13%20PM%20(1).jpeg?raw=true)

