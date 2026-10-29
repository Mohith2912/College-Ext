import mysql from 'mysql2/promise';

const databaseName = process.env.DATABASE_NAME?.trim();
const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) throw new Error('DATABASE_URL is required.');
if (!databaseName || !/^[a-zA-Z][a-zA-Z0-9_]{0,63}$/.test(databaseName)) {
  throw new Error('DATABASE_NAME must be a valid MySQL database name.');
}

const url = new URL(databaseUrl);
const connection = await mysql.createConnection({
  host: url.hostname,
  port: Number(url.port || 3306),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.slice(1) || 'defaultdb',
  ssl: { rejectUnauthorized: false },
});

try {
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${databaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  );
  console.log(`Database ${databaseName} is ready.`);
} finally {
  await connection.end();
}
