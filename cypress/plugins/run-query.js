const createPool = require('./pool');

const runQuery = ({ env }) => async ([ firstQuery, ...queries ]) => {
  //console.debug('Creating pool');
  const client = await createPool(env.db).connect();
  try {
    if ( !queries.length ) {
      return await client.query(firstQuery);
    }
    const results = [];
    await new Promise(
      resolve => [firstQuery, ...queries].forEach(async(query, index) => {
        results.push(await client.query(query));
        if(index === queries.length) resolve();
      })
    );
    return results;
  } catch(ex) {
    console.log(ex);
    throw ex;
  }finally {
    //console.debug('Releasing pool');
    client.release();
  }
}

module.exports = runQuery;