const config = require('../config');
const {arduinoSerialValueMaxLength, lastSentDisplayTextShow, apiSerialArduinoLedNumber} = config.arduinoSerial;
const api = require('../api');
const {express} = api.express;
const arduinoSerialRouter = express.Router();
const models = require('../models');
const {DisplayTextModel} = models.messageModels;

arduinoSerialRouter.route('/:param')  // /api/arduinoSerial/____ //send arduino serial string or number
    .all(async (req, res) => { try{
        const {param} = req.params;
        if (param.length > arduinoSerialValueMaxLength) param = param.substring(0, arduinoSerialValueMaxLength);
        if (param.trim().length === 0) throw new Error();
        const result = webSocketBroadcast(req.app.locals.clients1, param);   ///api/arduino requested, turn on the lamp
        console.log('arduino requested ' + (result ? 'sent' : 'not sent!'));
        if(!result) throw new Error();
        if(param.length !== 1){ //is a string
            const data1 = {message: param};
            DisplayTextModel(data1).save();
        }
        const data2 = {arduino: true};
        return res.status(200).json( data2 );
    } catch(e){ return res.status(400).send('cant send a message to arduino'); }
    } );

arduinoSerialRouter.route('/') // /api/arduinoSerial/ //get posted strings
    .get(async (req, res) => { try{
        const data = {};
        const sort = {createdAt: -1};
        const result = await DisplayTextModel.find(data).sort( sort ).limit( lastSentDisplayTextShow ).skip(0).select('message -_id');
        const arrayResult = result.map(x => x.message);
        const returnResult = {displayText: arrayResult};
        return res.status(200).json(returnResult);
    } catch(e){ return res.status(400).send('fail to get the display text strings'); }
    } );

module.exports = arduinoSerialRouter;