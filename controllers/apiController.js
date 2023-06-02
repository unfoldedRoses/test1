const axios = require('axios');
const mysql = require('mysql');

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_mysql_database',
});

// Fetch APIs and push to MySQL
exports.fetchAndPush = async (req, res) => {
  try {
    const response = await axios.get('https://api.publicapis.org/entries');
    const apis = response.data.entries;

    // Create a bulk insert query
    const query = 'INSERT INTO apis (title, description, auth, cors, link, category) VALUES ?';
    const values = apis.map(api => [api.API, api.Description, api.Auth, api.Cors, api.Link, api.Category]);

    connection.query(query, [values], (error, results) => {
      if (error) throw error;
      res.status(200).json({ message: 'APIs fetched and pushed to MySQL successfully.' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch and push APIs to MySQL.' });
  }
};

// Retrieve all APIs from MySQL
exports.getAllApis = (req, res) => {
  const query = 'SELECT * FROM apis';

  connection.query(query, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

// Retrieve a specific API by ID from MySQL
exports.getApiById = (req, res) => {
  const apiId = req.params.id;
  const query = 'SELECT * FROM apis WHERE id = ?';

  connection.query(query, [apiId], (error, results) => {
    if (error) throw error;
    res.status(200).json(results[0]);
  });
};

// Update a specific API by ID in MySQL
exports.updateApiById = (req, res) => {
  const apiId = req.params.id;
  const { title, description, auth, cors, link, category } = req.body;
  const query = 'UPDATE apis SET title = ?, description = ?, auth = ?, cors = ?, link = ?, category = ? WHERE id = ?';

  connection.query(query, [title, description, auth, cors, link, category, apiId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'API updated successfully.' });
  });
};

// Delete a specific API by ID from MySQL
exports.deleteApiById = (req, res) => {
  const apiId = req.params.id;
  const query = 'DELETE FROM apis WHERE id = ?';

  connection.query(query, [apiId], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'API deleted successfully.' });
  });
};


// Bulk insert APIs to MySQL
exports.bulkInsert = (req, res) => {
  const apis = req.body.apis;

  // Create a bulk insert query
  const query = 'INSERT INTO apis (title, description, auth, cors, link, category) VALUES ?';
  const values = apis.map(api => [api.API, api.Description, api.Auth, api.Cors, api.Link, api.Category]);

  connection.query(query, [values], (error, results) => {
    if (error) throw error;
    res.status(200).json({ message: 'APIs bulk inserted to MySQL successfully.' });
  });
};
