# Conversor de Notas Erasmus

Este proyecto es un conversor de notas diseñado para facilitar la conversión de calificaciones académicas entre diferentes sistemas de evaluación utilizados en países europeos. Está construido con Next.js y TypeScript, aplicando una serie de patrones de diseño y principios de programación para asegurar su escalabilidad y mantenibilidad.

## Características

- **Soporte para múltiples países:** Cada país tiene su propio convertidor de notas, implementado siguiendo el patrón Estrategia.
- **Facilidad de ampliación:** Se pueden agregar nuevos convertidores de notas sin necesidad de modificar el código existente, gracias al Principio Abierto/Cerrado (OCP).


## Tecnologías Utilizadas

- **Next.js:** Framework de React para aplicaciones web modernas.
- **TypeScript:** Lenguaje que añade tipado estático a JavaScript, mejorando la seguridad del código.
- **Prime react:** Componentes prefabricados para interfaces de usuario.

## Problemas encontrados: 
FOUC (Flash of Unstyled Content) en la carga de la página. Se solucionó con la implementación de un componente de carga.

UK una E es F

Suiza es rarito tambien