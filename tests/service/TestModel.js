import { ObjUtils } from 'es4x-utils/src/utils/ObjUtils';
import { CoreModel } from '../../src/CoreModel';


class	TestModel	extends	CoreModel
{
	constructor(_service, _config)
	{
		super(_service, _config);
	}

	getConditionsForList(_filters)
	{
		// build a list of AND conditions
		let	conditions = [];

		// filter by user id?
		let	filterUserId = ObjUtils.GetValueToInt(_filters, "user_id");
		if (filterUserId > 0)
		{
			conditions.push(this.field("user_id") + "=$" + filterUserId);
		}

		return conditions;
	}	
}

module.exports = TestModel;