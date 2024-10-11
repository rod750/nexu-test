import { readFileSync, writeFileSync } from 'fs';

const generate = async () => {
  const json = readFileSync('src/db/seeds/models.json', 'utf8');

  const data = JSON.parse(json);

  const brands = data.reduce((acc, item) => {
    if (!acc.includes(item.brand_name)) {
      acc.push(item.brand_name);
    }
    return acc;
  }, []);

  const brandsSQL = brands.map((model, key) => {
    return `INSERT INTO brands (id, name) VALUES (${key + 1}, '${model}');`;
  });

  const findBrandId = (brand) => {
    return brands.indexOf(brand) + 1;
  };

  const modelsSQL = data.map((item) => {
    return `INSERT INTO models (id, name, brand_id, average_price) VALUES (${item.id}, '${item.name}', ${findBrandId(item.brand_name)}, ${item.average_price});`;
  });

  writeFileSync('src/db/seeds/brands.sql', brandsSQL.join('\n'));
  writeFileSync('src/db/seeds/models.sql', modelsSQL.join('\n'));
};

generate();
