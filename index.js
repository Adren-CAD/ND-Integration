integrations.push('nd');

const ND = express.Router();

ND.get('/characters', fetchNDCharacters);

ND.get('/characters/search', searchNDCharacters);

ND.get('/characters/get', getNDCharacter);

ND.get('/vehicles', fetchNDVehicles);

ND.get('/vehicles/search', searchNDVehicles);

ND.get('/vehicles/get', getNDVehicle);

API.use('/ND', ND);

onNet('adrenCAD:setup', () => {
	_connection.emit('');
});
