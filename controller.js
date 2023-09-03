const ND_db = mysql.createConnection(ND_Config.mysql);

ND_db.connect();

const fetchNDCharacters = (req, res) => {
	try {
		ND_db.query(
			`SELECT * FROM nd_characters`,
			function (error, results, fields) {
				if (error)
					return res.json({
						error: 'Unexpected error while trying too query DB.',
					});

				res.json({
					characters: results,
				});
			}
		);
	} catch (err) {
		console.log(err);

		res.json({
			error: 'Unexpected error while trying too fetch characters.',
		});
	}
};
// character.charid
const searchNDCharacters = (req, res) => {
	try {
		const firstName = req.query.firstName || '';
		const lastName = req.query.lastName || '';

		let query = `
			SELECT * 
			FROM nd_characters
			WHERE (LOWER(firstname) LIKE ? AND LOWER(lastname) LIKE ?)
		`;

		const searchValueFirstName = `%${firstName.toLowerCase()}%`;
		const searchValueLastName = `%${lastName.toLowerCase()}%`;

		ND_db.query(
			query,
			[searchValueFirstName, searchValueLastName],
			function (error, results, fields) {
				if (error)
					return res.json({
						error: 'Unexpected error while trying to query DB.',
					});

				res.json({
					characters: results,
				});
			}
		);
	} catch (err) {
		console.log(err);

		res.json({
			error: 'Unexpected error while trying too fetch characters.',
		});
	}
};

const getNDCharacter = (req, res) => {
	try {
		const { userId } = req.query;

		if (!userId)
			return res.json({
				error: 'Invalid params.',
			});

		ND_db.query(
			`SELECT * FROM nd_characters WHERE charid = ?`,
			[userId],
			function (error, results, fields) {
				if (error)
					return res.json({
						error: 'Unexpected error while trying to query DB.',
					});

				const character = results[0];

				if (!character)
					return res.json({
						error: 'Unexpected error, couldnt find character.',
					});

				res.json({
					character: character,
				});
			}
		);
	} catch (err) {
		console.log(err);

		res.json({
			error: 'Unexpected error while trying to get character.',
		});
	}
};

const fetchNDVehicles = (req, res) => {
	try {
		ND_db.query(
			`SELECT * FROM nd_vehicles`,
			function (error, results, fields) {
				if (error)
					return res.json({
						error: 'Unexpected error while trying too query DB.',
					});

				res.json({
					vehicles: results,
				});
			}
		);
	} catch (err) {
		console.log(err);

		res.json({
			error: 'Unexpected error while trying too fetch vehicles.',
		});
	}
};

const searchNDVehicles = (req, res) => {
	try {
		const plate = req.query.licensePlate || '';

		let query = `
			SELECT * 
			FROM nd_vehicles
			WHERE LOWER(plate) LIKE ?
		`;

		const searchValue = `%${plate.toLowerCase()}%`;

		ND_db.query(query, [searchValue], function (error, results, fields) {
			if (error)
				return res.json({
					error: 'Unexpected error while trying to query DB.',
				});

			res.json({
				vehicles: results,
			});
		});
	} catch (err) {
		console.log(err);

		res.json({
			error: 'Unexpected error while trying to fetch vehicles.',
		});
	}
};

const getNDVehicle = (req, res) => {
	try {
		const plate = req.query.vehicleId || '';

		let query = `
			SELECT * 
			FROM nd_vehicles
			WHERE plate = ?
		`;

		ND_db.query(query, [plate], function (error, results, fields) {
			if (error)
				return res.json({
					error: 'Unexpected error while trying to query DB.',
				});

			const vehicle = results[0];

			if (!vehicle)
				return res.json({
					error: 'Unexpected error, couldnt find vehicle.',
				});

			res.json({
				vehicle: vehicle,
			});
		});
	} catch (err) {
		console.log(err);

		res.json({
			error: 'Unexpected error while trying to fetch vehicles.',
		});
	}
};
