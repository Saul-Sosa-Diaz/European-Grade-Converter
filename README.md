# Conversor de Notas Erasmus

Este proyecto es un conversor de notas diseñado para facilitar la conversión de calificaciones académicas entre diferentes sistemas de evaluación utilizados en países europeos. Está construido con Next.js y TypeScript, aplicando una serie de patrones de diseño y principios de programación para asegurar su escalabilidad y mantenibilidad.

## Características

- **Interfaz de usuario intuitiva:** Permite a los usuarios seleccionar su país de origen y destino para la conversión de notas.
- **Soporte para múltiples países:** Cada país tiene su propio convertidor de notas, implementado siguiendo el patrón Estrategia.
- **Facilidad de ampliación:** Se pueden agregar nuevos convertidores de notas sin necesidad de modificar el código existente, gracias al Principio Abierto/Cerrado (OCP).

## Patrones de Diseño Aplicados

### Patrón Estrategia
Se han implementado diferentes convertidores de notas para cada país, permitiendo al sistema elegir el convertidor adecuado en tiempo de ejecución.

### Patrón Fábrica
La creación y gestión de los convertidores se centraliza a través de un patrón de fábrica, facilitando la extensión del sistema y la creación de nuevos convertidores.

### Principio de Responsabilidad Única (SRP)
Cada clase en el sistema tiene una única responsabilidad. Por ejemplo, cada convertidor de notas se encarga exclusivamente de la lógica para convertir calificaciones de un país específico.

### Principio Abierto/Cerrado (OCP)
El sistema está diseñado de manera que puedes agregar nuevos países y sus respectivos convertidores sin modificar el código existente, favoreciendo la extensibilidad y la reducción de errores.


## Tecnologías Utilizadas

- **Next.js:** Framework de React para aplicaciones web modernas.
- **TypeScript:** Lenguaje que añade tipado estático a JavaScript, mejorando la seguridad del código.
- **Prime react:** Componentes prefabricados para interfaces de usuario.

