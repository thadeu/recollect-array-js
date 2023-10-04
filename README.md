<p align="center">
  <h1 align="center">🔃 recollect-array-js</h1>
  <p align="center"><i>Simple wrapper to filter array using JavaScript and simple predicate conditions</i></p>
</p>

<p align="center">
  <a href="https://github.com/thadeu/recollect-array-js/actions/workflows/ci.yml">
    <img alt="Build Status" src="https://github.com/thadeu/recollect-array-js/actions/workflows/ci.yml/badge.svg">
  </a>
</p>


## Motivation

Because in sometimes, we need filter array passing conditions. This library simplify this work.

## Documentation <!-- omit in toc -->

Version    | Documentation
---------- | -------------
unreleased | https://github.com/thadeu/recollect-array-js/blob/main/README.md

## Table of Contents <!-- omit in toc -->
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Availables Predicates](#availables-predicates)
  - [Usage](#usage)
  - [Utilities](#utilities)

## Compatibility

| kind           | branch  | javascript         |
| -------------- | ------- | ------------------ |
| unreleased     | main    | >= 14.x, <= 18.x |

## Installation

Use Yarn

```bash
yarn add recollect-array-js
```

or use NPM

```bash
npm i --save recollect-array-js
```

and then, enjoy!

```ts
import RecollectArray from 'recollect-array-js'
```

## Configuration

Without configuration, because we use only JavaScript. ❤️

## Availables Predicates for all values

| Type | Suffix | Value | 
| ----------- | ----------- | ----------- |
| Equal | eq      | Anywhere |
| NotEqual | not_eq        | Anywhere |
| Contains | cont        | Anywhere |
| NotContains | not_cont        | Anywhere |
| Included | in  | Anywhere |
| NotIncluded | not_in        | Anywhere |
| LessThan | lt        | Anywhere |
| LessThanEqual | lte        | Anywhere |
| GreaterThan | gt        | Anywhere |
| GreaterThanEqual | gte        | Anywhere |
| GreaterThanEqual | gte        | Anywhere |

## Availables Predicates only when value is Object

> 💡 Below predicates works only when value is Object

| Type | Suffix | Value | 
| ----------- | ----------- | ----------- |
| Exists | exists        | Anywhere |
| NotEqual | not_eq        | Object |
| NotContains | not_cont        | Object |
| NotIncluded | not_in        | Object |
| NotMatches | not_matches        | Object |


## Usage

<details>
  <summary>Think that your data seems like this.</summary>
  
  ```ts
  data = [
    {
      id: 1,
      name: 'Test #1',
      email: 'test1@email1.com',
      schedule: { all_day: true },
      numbers: [1, 2],
      active: true,
      count: 9
    },
    {
      id: 2,
      name: 'Test #2',
      email: 'test2@email2.com',
      schedule: { all_day: false },
      numbers: [3, 4],
      active: true,
      count: 10
    },
    {
      id: 3,
      name: 'Test #3',
      email: 'test3@email3.com',
      schedule: { all_day: false },
      numbers: [5, 6],
      active: false,
      count: 99,
      members: null
    }
  ]
  ```
</details>

You can use one or multiples predicates in your filter. We see some use cases.

### Flexible Use Case (Hash)

**Equal**

```ts
filters = {
  active: { eq: true }
}

collection = RecollectArray.filter(data, filters)
```

**NotEqual**

```ts
filters = {
  active: {
    not_eq: true
  }
}

collection = RecollectArray.filter(data, filters)
```

**Exists**

Filter only if value be different of null or undefined

```ts
filters = {
  members: {
    exists: true
  }
}

collection = RecollectArray.filter(data, filters)
```

**NotExists**

```ts
filters = {
  members: {
    exists: false
  }
}

collection = RecollectArray.filter(data, filters)
```

**Nested Hash Paths**

```ts
filters = {
  'schedule.all_day': {
    eq: true
  }
}

collection = RecollectArray.filter(data, filters)
```

**Nested Array Paths**

> Note the `.0` 🎉

```ts
filters = {
  'numbers.0': {
    eq: '3'
  }
}

collection = RecollectArray.filter(data, filters)
```

```ts
filters = {
  numbers: {
    in: '3' // or in: ['3']
  }
}

collection = RecollectArray.filter(data, filters)
```

Using default Equal predicate.

```ts
RecollectArray.filter(data, { numbers: 3 })

RecollectArray.filter(data, { active: true })

RecollectArray.filter(data, { id: 3 })
```

If array, you can navigate into self, using `property.NUMBER.property`

```ts
data = [
  {
    schedules: [
      {
        opened: true,
        all_day: true
      },
      {
        opened: false,
        all_day: true
      }
    ]
  },
  {
    schedules: [
      {
        opened: false,
        all_day: true
      },
      {
        opened: false,
        all_day: true
      }
    ]
  }
]

filters = {
  'schedules.0.opened': {
    eq: true
  }
}

collection = RecollectArray.filter(data, filters)

# [{ schedules: [{ opened: true, all_day: true }, { opened: false, all_day: true }] }]
```

Amazing, you can pass a Function value as value, like this.

```javascript
filters = {
  'schedules.0.opened': { eq: () => true }
}

collection = Recollect::Array.filter(data, filters)
```

**Combine conditions**

Yes, you can combine one or multiple predicates to filter you array.


```ts
filters = {
  active: { eq: true },
  numbers: {
    in: [5],
    not_in: '10'
  },
  email: {
    cont: 'email1',
    not_cont: '@gmail'
  },
  'schedule.all_day': {
    in: [true, false]
  }
}

collection = RecollectArray.filter(data, filters)
```

[⬆️ &nbsp;Back to Top](#table-of-contents-)

## Development

After checking out the repo, install dependencies. Then, run `yarn test` to run the tests.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/thadeu/recollect-array-js. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/thadeu/recollect-array-js/blob/master/CODE_OF_CONDUCT.md).


## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
