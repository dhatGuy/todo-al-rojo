import { faker } from "@faker-js/faker";

export type Person = {
  rank: number;
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
  };
  badge: string;
  FTD: number;
  chips: string;
  insignia: string;
};

let counter = 1;

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    rank: counter++,
    user: {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.firstName(),
      avatar: faker.image.avatar(),
    },
    badge: faker.helpers.shuffle(["gold", "silver", "bronze"])[0]!,
    FTD: faker.number.int(100),
    chips: Intl.NumberFormat("es-US").format(faker.number.int(2000)),
    insignia: faker.helpers.shuffle([
      "🏆 Todo al Rojo",
      "🔥 High Roller",
      "❄️ VIP",
      "👤 Novato al Rojo",
      "⭐ Jugador Active",
    ])[0]!,
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((_d): Person => {
      return newPerson();
    });
  };

  return makeDataLevel();
}

const data = makeData(1000);

export async function fetchData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));

  return {
    rows: data.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize,
    ),
    pageCount: Math.ceil(data.length / options.pageSize),
    rowCount: data.length,
  };
}
