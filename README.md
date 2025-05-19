# desarrollo_web_Francisco_Pena

Asegurarse de tener las dependencias necesarias en un entorno virtual para que el código no se rompa. Dejo un archivo requirements.txt en el que exporté las dependencias de esta tarea. Creo que con solo instalar flask y mysql basta, pero no está de más estar seguro. 

Suponiendo que la base de datos ya existe y las tablas han sido creadas (según enunciado): 

1.-
Activar la base de datos mediante la terminal:
$mysql -u cc5002 -p -h localhost -P 3306 tarea2
Escribir la contraseña:
$programacionweb

Nótese además que el string de conexión supone que la base de datos está configurada para aceptar utf8mb4 y caracteres unicode.

2.-
Una vez dentro de tarea2, correr en la terminal: 
$flask run
Esto debería iniciar la tarea en el navegador predeterminado. 

Las imágenes están configuradas para guardarse en la carpeta static/imgs, con el nombre y el índice de la actividad en la que están asociadas. Cambiarles el nombre rompe las dependencias y mi código no maneja esas situaciones ya que esto se encuentra fuera del contexto de la tarea. Agregué otra carpeta static/free_imgs con imágenes que generé mediante IA para utilizar en las pruebas. Están generadas a 800x600 px si no mal recuerdo. Agregar imágenes de static/free_imgs las duplica en imgs, no las mueve. 

Las actividades fueron testeadas para el thunder cross split attack o como sea que se llame.
![Screenshot (527)](https://github.com/user-attachments/assets/784a505c-8050-4a3c-8dae-3cf2b899332b)
