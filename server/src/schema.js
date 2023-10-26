import { find, remove } from "lodash";

const people = [
  {
    id: "1",
    firstName: "Bill",
    lastName: "Gates",
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs",
  },
  {
    id: "3",
    firstName: "Linux",
    lastName: "Torvalds",
  },
];

const cars = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Corolla",
    price: "40000",
    personId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LX 600",
    price: "13000",
    personId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Civic",
    price: "20000",
    personId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Acura ",
    model: "MDX",
    price: "60000",
    personId: "2",
  },
  {
    id: "5",
    year: "2018",
    make: "Ford",
    model: "Focus",
    price: "35000",
    personId: "2",
  },
  {
    id: "6",
    year: "2017",
    make: "Honda",
    model: "Pilot",
    price: "45000",
    personId: "2",
  },
  {
    id: "7",
    year: "2019",
    make: "Volkswagen",
    model: "Golf",
    price: "40000",
    personId: "3",
  },
  {
    id: "8",
    year: "2018",
    make: "Kia",
    model: "Sorento",
    price: "45000",
    personId: "3",
  },
  {
    id: "9",
    year: "2017",
    make: "Volvo",
    model: "XC40",
    price: "55000",
    personId: "3",
  },
];

const typeDefs = `
  type Person {
    id: String!
    firstName: String
    lastName: String
  }

  type Car {
    id: String!
    year: String
    make: String
    model: String
    price: String
    personId: String
  }

  type PersonWithCars {
    person: Person,
    cars: [Car]
  }

  type Query {
    people: [Person]
    person(id: String!): Person
    carsOfPerson(personId: String!): [Car]
    peoplWithCars: [PersonWithCars]
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String!, lastName: String!): Person
    removePerson(id: String!): Person
    addCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    updateCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    removeCar(id: String!): Car
  }
`;

const resolvers = {
  Query: {
    people: () => people,
    peoplWithCars: () => {
      return people.map((person) => {
        return {
          person,
          cars: cars.filter((car) => car.personId === person.id),
        };
      });
    },
    person: (root, args) => {
      return find(people, { id: args.id });
    },
    carsOfPerson: (root, args) => {
      return cars.filter((car) => car.personId === args.personId);
    },
  },
  Mutation: {
    // ========================> people
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      people.push(newPerson);
      return newPerson;
    },

    updatePerson: (root, args) => {
      const person = find(people, { id: args.id });

      if (!person) {
        throw new Error(`Couldn't find person with id ${args.id}`);
      }

      person.firstName = args.firstName;
      person.lastName = args.lastName;

      return person;
    },

    removePerson: (root, args) => {
      const removedPerson = find(people, { id: args.id });

      if (!removedPerson) {
        throw new Error(`Couldn't find person with id ${args.id}`);
      }

      // remove all cars of this person
      remove(cars, (c) => {
        return c.personId === removedPerson.id;
      });

      remove(people, (c) => {
        return c.id === removedPerson.id;
      });

      return removedPerson;
    },

    // ========================> cars

    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };
      cars.push(newCar);
      return newCar;
    },

    updateCar: (root, args) => {
      const car = find(cars, { id: args.id });

      if (!car) {
        throw new Error(`Couldn't find car with id ${args.id}`);
      }

      car.year = args.year;
      car.make = args.make;
      car.model = args.model;
      car.price = args.price;
      car.personId = args.personId;

      return car;
    },
  },
};

export { typeDefs, resolvers };