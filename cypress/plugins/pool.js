const { Pool } = require('pg');

const createPool = ({ 
  username: user, 
  password, 
  hostname: host, 
  database, 
  port 
}) => new Pool({
  user,
  password,
  host,
  database,
  port
})

module.exports = createPool;