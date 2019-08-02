const faker = require('faker');
const fs = require('fs');

const user = false;

const generateUsers = (num) => {
  const userHeader = 'user_id,first_name,last_name,avatar\n';
  const hostHeader = 'host_id,host_first_name,hot_last_name,host_avatar\n';
  const fileName = user ? 'users.csv' : 'hosts.csv';
  let output = (user ? userHeader : hostHeader);
  for (let i = 1; i <= num; i += 1) {
    const entry = `${i},${faker.name.firstName()},${faker.name.lastName()},${faker.internet.avatar()}\n`;
    output = output.concat(entry);
  }
  output = output.slice(0, output.length - 2);
  fs.writeFile(fileName, output);
};

generateUsers(1000);
