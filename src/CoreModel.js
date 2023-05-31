import { ObjUtils } from 'es4x-utils/src/utils/ObjUtils';
import { AbstractModel } from 'es4x-gcp-service/src/model/AbstractModel';

class	CoreModel	extends	AbstractModel
{
	constructor(_service, _config)
	{
		super(_service, _config);
	}
}

module.exports = {
	CoreModel
};