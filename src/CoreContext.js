import { ObjUtils } from 'es4x-utils/src/utils/ObjUtils';
import { AbstractServiceContext } from 'es4x-gcp-service/src/service/AbstractServiceContext';

class	CoreContext	extends	AbstractServiceContext
{
	constructor(_vertx, _env, _isAdmin = false)
	{
		super(_vertx, _env, _isAdmin);
	}

	getServicesHostConfig(_env)
	{
		return {
			"test_service": "localhost"
		};
	}		
}

module.exports = {
	CoreContext
};