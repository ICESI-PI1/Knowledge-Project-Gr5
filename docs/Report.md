# Informe del primer sprint del proyecto Knewledge Projects.

## Descripción

En el siguiente informe se detallan punto por punto del diseño y desarrollo del sprint, ademas de referenciar a los items producto de cada actividad y su realizador.

### 1. Base de datos:

**Participante(s): Juan David Garzon Diaz**

En primer lugar realizamos un análisis de requerimientos e identificamos las entidades y sus respectivos atributos, corrigiendo y añadiendo algunas entidades como ROL durante las reuniones con el profesor, luego realizamos un modelo de la base de datos preliminar y nos reunimos con Sean, donde añadimos la entidad REPORTS y realizamos un cambio en BINNACLE, aunque después durante la reunión con el profesor se elimino REPORTS y BINNACLE volvió a como era anteriormente, también se añadieron las entidades de ANNOUNCEMENT y sus respectivos atributos y relaciones.
![BD](https://i.imgur.com/wlGVrPk.png)
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


### 6. Protipos en figma
**Participante(s): Gabriel Restrepo Giraldo**

Para la realización de los prototipos se manejaron 3 versiones de paletas de colores. El diseño básico se mantuvo relativamente idéntico a lo largo de las versiones.

#### Primera versión de diseño:

Para la primera versión del diseño de interfaz se propuso la siguiente paleta de colores:

![opt1](https://user-images.githubusercontent.com/93087966/229014061-39aaef0e-cd2b-43bf-8eba-ae1c07cf9875.png)

Dada la retroalimentación recibida, se hicieron los ajustes pertinentes, por lo cual solo hay 2 pantallas dentro del figma que reflejan el uso de la anterior paleta de colores:

Pantalla - Nueva propuesta:  
![image](https://user-images.githubusercontent.com/93087966/229013854-4d07d607-3446-4275-9311-a1a45ff254a4.png)

Pantalla - Acciones de usuario:  
![image](https://user-images.githubusercontent.com/93087966/229013917-57490f48-8f90-41c9-ae8c-8d18cced76f6.png)


#### Segunda versión del proyecto:  

Para la segunda versión del diseño del prototipo, se manejó la siguiente paleta de colores:
![opt2](https://user-images.githubusercontent.com/93087966/229014236-5bd8357e-743c-4cbd-a1fa-9aa41eac6ded.png)

La adaptación de la interfaz de la aplicación con la anterior paleta de colores, quedó de la siguiente manera:

Pantalla - Registro de usuario:  
![image](https://user-images.githubusercontent.com/93087966/229014494-6126327b-b0a1-4351-95bc-927a457726eb.png)

Pantalla - Inicio de sesión:  
![image](https://user-images.githubusercontent.com/93087966/229014582-01903c78-d59f-43e4-a3c5-501dbe85d736.png)

Pantalla - Home Page:  
![image](https://user-images.githubusercontent.com/93087966/229014683-554264f9-3a7b-4636-ac15-047f4dd92b2e.png)

Pantalla - Propuesta:  
![image](https://user-images.githubusercontent.com/93087966/229014768-49a3ebac-6f8d-4810-bede-a8a600ab50ba.png)

Pantalla - Nueva propuesta:  
![image](https://user-images.githubusercontent.com/93087966/229015109-157f121b-61f9-4274-9cc3-6aa0ea66c71d.png)

Pantalla - Aporte de recursos:  
![image](https://user-images.githubusercontent.com/93087966/229015154-11762a00-bb40-46a1-8294-9e0741e9385b.png)

Pantalla - Proyectos:  
![image](https://user-images.githubusercontent.com/93087966/229015349-da65b2f2-3cf2-4ade-976b-86dfa1b3b11d.png)

Pantalla - Aportes:  
![image](https://user-images.githubusercontent.com/93087966/229015443-27dcf27b-c9df-452a-9dc7-7b93390ec757.png)

Pantalla - Selección de aporte:  
![image](https://user-images.githubusercontent.com/93087966/229015500-3a140445-b5b7-4810-81da-25eb5276d176.png)

Pantalla - Tus aportes a proyectos:  
![image](https://user-images.githubusercontent.com/93087966/229015604-fdeaaef0-bf37-416c-9340-98605acb11c9.png)

Pantalla - Solicitud de nuevo recurso:  
![image](https://user-images.githubusercontent.com/93087966/229015666-53d43cad-f415-463a-9a04-336e3dd157f1.png)

#### Tercera versión del proyecto:  

Para la tercera versión del proyecto se manejó la siguiente paleta de colores

![opt31](https://user-images.githubusercontent.com/93087966/229017712-3a801e88-b30a-4524-a6b9-fa56ed4a6a20.png)


Las siguientes pantallas en figma reflejan el uso de la anterior colección de colores. Este último diseño es el que probablemente tendrá la página en su versión de desarrollo y final.

Pantalla - Registro de usuario:  
Opción 1:  
![image](https://user-images.githubusercontent.com/93087966/229016598-422f7009-5362-4043-9841-80ea60765b65.png)


Opción 2:  
![image](https://user-images.githubusercontent.com/93087966/229016652-c1bdf0c3-a390-4abb-8a36-78250efd9964.png)


Pantalla - Inicio de sesión:  
Opción 1:  
![image](https://user-images.githubusercontent.com/93087966/229016715-5cd31172-32ff-484a-aede-a324995f17bb.png)


Opción 2:  
![image](https://user-images.githubusercontent.com/93087966/229016756-a6b052d6-758d-4725-bb3a-1e360d2850cb.png)


Pantalla - Home Page:  
![image](https://user-images.githubusercontent.com/93087966/229016835-d4f405f3-3a6a-4b6d-be4e-de216991ac34.png)

Pantalla - Propuesta:  
![image](https://user-images.githubusercontent.com/93087966/229016854-5dbb3e7a-f7ff-4aec-a5e5-43d598ff8e5f.png)

Pantalla - Nueva propuesta:  
![image](https://user-images.githubusercontent.com/93087966/229016880-e07dcffc-f9e0-4196-8fac-34c76cc3790a.png)


Pantalla - Aporte de recursos:  
![image](https://user-images.githubusercontent.com/93087966/229016922-e82cbc64-5c61-4c95-97f5-9692b74f2a51.png)


Pantalla - Proyectos:  
![image](https://user-images.githubusercontent.com/93087966/229016978-8d3e8c7a-0951-4631-9907-e92ed1e8ae46.png)

Pantalla - Aportes:  
![image](https://user-images.githubusercontent.com/93087966/229017024-4e8b5ed6-5023-4a6c-ba78-b02953eefd37.png)

Pantalla - Selección de aporte:  
![image](https://user-images.githubusercontent.com/93087966/229017065-591762a3-7722-433a-ab66-69ea08cb17a1.png)

Pantalla - Tus aportes a proyectos:  
![image](https://user-images.githubusercontent.com/93087966/229017100-223de93f-6850-45dc-9e8b-bb54434f0c3d.png)

Pantalla - Solicitud de nuevo recurso:  
![image](https://user-images.githubusercontent.com/93087966/229017126-0217bc78-f1b7-45be-9c1a-e4f3202b6614.png)

## ENLACES
Link de repositorio GitHub: https://github.com/ICESI-PI1/Knowledge-Project-Gr5
Link de Proyecto en Jira: https://3j2gteam.atlassian.net/jira/software/projects/KNOW/boards/2
Link de Proyecto en FIGMA: https://www.figma.com/file/of6db2sodg57llu8YE5qOG/Knowledge-Projects?node-id=0%3A1&t=O0WWyTnjPjACx97X-1


