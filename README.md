## Instalación

1. Instalar dependencias

```bash
$ npm install
```

2. Copiar .env.sample a .env y colocar los accesos a la base de datos

3. Ejecutar migraciones

```bash
npm run migration:run
```

4. Insertar en la base de datos lo que se encuentra en los archivos .sql en la carpeta db/seeds


## Compilar y ejecutar el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Ejecutar pruebas

```bash
# unit tests
$ npm run test
```

## Swagger
```
http://localhost:3000/api
```


## Notas

Ya que se esta valorando la capacidad de aprender cosas nuevas, decidí utilizar
Nest.js, un framework con el cual no tenía experiencia previa.

En mis dificultades me encontre con TypeORM, muchos años antes lo había valorado
pero lo descarte por su poca claridad, en esta prueba decidí darle otra
oportunidad pero confirmé que tiene decisiones de diseño algo cuestionables y
la documentación no es muy clara por lo que fue más una carga que ayuda,
veo mejor diseñado y con mejor soporte a Sequelize.

Me resulto muy sencillo Nest.js y su integración con diferentes herramientas
me facilitó mucho el trabajo por ejemplo a la hora de hacer validaciones o
con la documentación de swagger.

Encontrarán que quiza la solución está demasiado estructurada para una API
tan sencilla, es con el objetivo de demostrar mi comprensión de conceptos en
arquitectura de software y que sigo las recomendaciones de cada framework que
utilizo.

En el endpoint para listar las marcas, noté que el objeto dice "nombre" en
vez de "name" como en todos los demás ejemplos, no sé si haya sido intencional
pero conservé eso tal cual.