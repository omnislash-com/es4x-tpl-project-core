/// <reference types="@vertx/core" />
// @ts-check
import { TestSuite } from '@vertx/unit';
import { ObjUtils } from 'es4x-utils/src/utils/ObjUtils';

import { TestService } from './service/TestService';
import { CoreContext } from '../src/CoreContext';

const suite = TestSuite.create("ES4X Test: Service");
const	config = require('./test_config.json');

// PGDBMgr
suite.test("Service.Init", async function (context) {

	let async = context.async();

	try
	{
		// initialize the context
		let	appContext = new CoreContext(vertx, "local", false);

		// determine the path to the config folder
		let	configFolder = process.cwd() + "/tests/service/config/";
		let	modelFolder = process.cwd() + "/tests/service/";	
		
		// create the service
		let	service = new TestService();

		// init it
		let	ok = await service.init(appContext, configFolder, modelFolder, null);

		// -> make sure it's ok!
		context.assertEquals(ok, true);

		// next let's run some tests
		context.assertEquals(appContext.hasCache(), true);

		// now we are going to run some of the tests
		let	testsToDo = ObjUtils.GetValue(config, "service_actions", []);
		for(let test of testsToDo)
		{
			// get the action parameters
			let	model = ObjUtils.GetValueToString(test, "model");
			let	action = ObjUtils.GetValueToString(test, "action");
			let	filters = ObjUtils.GetValue(test, "filters");
			let	data = ObjUtils.GetValue(test, "data");

			// execute the action
			let	ret = await service.doOnModel(model, action, filters, data);

			// run the tests
			let	tests = ObjUtils.GetValue(test, "tests");
			for(let key in tests)
			{
				// special key?
				if (key == "**length**")
				{
					context.assertEquals(tests[key], ret.length);
				}
				else
				{
					let	value = ObjUtils.GetValue(ret, key);

					// same?
					context.assertEquals(tests[key], value);
				}
			}
		}
	}
	catch(e)
	{
		console.trace(e);
	}

	async.complete();
});

suite.run();