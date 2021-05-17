# Vue 3 + Inversify template

**Status: experimental**

This repo showcases a layered approach to structuring Vue 3 application with a strong emphasis on separating view from business logic.

The key aspect is layered application structure:

- **Business logic layer** is represented by _singleton_ classes called _services_ which encapsulate application state and expose methods to modify it. Those are written in TypeScript and contain all the business logic, which can also be deferred to helpers, utilities, etc.

- **View layer** is represented by Vue components which `inject` the singletons they need. Those are written in JavaScript because don't contain as much logic.

- **Application** is a composition root that registers all services and auxiliary classes and allows one to rebind them (which is extremely useful in testing).

The setup in this repo also adds a couple of conventions to streamline the development:

- Classes placed in `src/main/services` and decorated with `@service('foo')` are automatically bound as singletons and are instantly available in all the components via `inject: ['foo']`.

- Vue components placed in `src/main/components` are automatically available globally (i.e. no need to register components manually and/or import them).

## Usage

- Clone
- `npm i`
- `npm run dev`
- `open http://localhost:8080`
- Tinker

## TODO

- [ ] Test setup
- [ ] Document moar
