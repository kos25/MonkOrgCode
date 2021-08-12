({
	doinit : function(component, event, helper) {
		var action = component.get('c.getLabelApiName');
		action.setCallback(this,function(response){
			var  state = response.getState();
			if (state === "SUCCESS") {
				var res = response.getReturnValue();
				//helper.likeSearch(res,component);
				component.set('v.ObjNameList' , res.apiName);
				
			}
		});
		$A.enqueueAction(action);
	},
	handleInput :function(component,event, helper){

		var term = component.find("sObjectName").get("v.value");
		var SobjectList = component.get('v.ObjNameList');
		var search = new RegExp(term , 'i'); // prepare a regex object
		let filterdList = SobjectList.filter(item => search.test(item));
		component.set('v.ObjNameList' , filterdList);
		
	}

})


// let a = ["foo","fool","cool","god"];
// var term = 'l'; // search term (regex pattern)
// var search = new RegExp(term , 'i'); // prepare a regex object
// let b = a.filter(item => search.test(item));
// console.log(b);