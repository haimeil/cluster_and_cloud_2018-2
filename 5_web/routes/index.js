var express = require('express');
var router = express.Router();
var request = require('request');
var rp = require('request-promise');

/* GET home page. */

router.get('/', function(req, res, next) {
	var nsh, quh, sah, vih, wah, tah, nth, cth; //twitter index
	var nss, qus, sas, vis, was, tas, nts, cts; //income
	var nsa, qua, saa, via, waa, taa, nta, cta; // edu 0-9
	var nsb, qub, sab, vib, wab, tab, ntb, ctb; //edu 9-12
	var nsc, quc, sac, vic, wac, tac, ntc, ctc; // edu >12
	var nsi, qui, sai, vii, wai, tai, nti, cti; // ios system
	var nsd, qud, sad, vid, wad, tad, ntd, ctd; // android system

	var all_data = [];

	var aurin_url = 'http://115.146.86.138:5984/aurin/_design/au/_view/view';
	var twitter_url = 'http://115.146.86.138:5984/processed_data/_design/pro/_view/view';

	rp(aurin_url)
	    .then(function(response) {
	    	var obj = JSON.parse(response);
	    	var listObj = obj['rows'];
	    	var contentObj1 = listObj[0]['value']['aurin_state_avrg_wkly_income'];
	    	nss = (contentObj1['New South Wales']).toFixed(2);
	    	qus = (contentObj1['Queensland']).toFixed(2);
	    	sas = (contentObj1['South Australia']).toFixed(2);
	    	vis = (contentObj1['Victoria']).toFixed(2);
	    	was = (contentObj1['Western Australia']).toFixed(2);
	    	tas = (contentObj1['Tasmania']).toFixed(2);
	    	nts = (contentObj1['Northern Territory']).toFixed(2);
	    	cts = 425.67;

	    	var contentObj2 = listObj[1]['value']['state_edu_y0-9_y10_12_y12_above_percentage'];
	    	nsa = (contentObj2['New South Wales'][0]).toFixed(2);
	    	nsb = (contentObj2['New South Wales'][1]).toFixed(2);
	    	nsc = (contentObj2['New South Wales'][2]).toFixed(2);
	    	qua = (contentObj2['Queensland'][0]).toFixed(2);
	    	qub = (contentObj2['Queensland'][1]).toFixed(2);
	    	quc = (contentObj2['Queensland'][2]).toFixed(2);
	    	saa = (contentObj2['South Australia'][0]).toFixed(2);
	    	sab = (contentObj2['South Australia'][1]).toFixed(2);
	    	sac = (contentObj2['South Australia'][2]).toFixed(2);
	    	via = (contentObj2['Victoria'][0]).toFixed(2);
	    	vib = (contentObj2['Victoria'][1]).toFixed(2);
	    	vic = (contentObj2['Victoria'][2]).toFixed(2);
	    	waa = (contentObj2['Western Australia'][0]).toFixed(2);
	    	wab = (contentObj2['Western Australia'][1]).toFixed(2);
	    	wac = (contentObj2['Western Australia'][2]).toFixed(2);
	    	taa = (contentObj2['Tasmania'][0]).toFixed(2);
	    	tab = (contentObj2['Tasmania'][1]).toFixed(2);
	    	tac = (contentObj2['Tasmania'][2]).toFixed(2);
	    	nta = (contentObj2['Northern Territory'][0]).toFixed(2);
	    	ntb = (contentObj2['Northern Territory'][1]).toFixed(2);
	    	ntc = (contentObj2['Northern Territory'][2]).toFixed(2);
	    	cta = (contentObj2['Australian Capital Territory'][0]).toFixed(2);
	    	ctb = (contentObj2['Australian Capital Territory'][1]).toFixed(2);
	    	ctc = (contentObj2['Australian Capital Territory'][2]).toFixed(2);

	    	var contentObj3 = listObj[3]['value']['vic_median_household_income'];
	    	for(var ele in contentObj3){
	    		all_data.push({'name': ele, 'income': contentObj3[ele]});
	    	}
	    	var contentObj4 = listObj[2]['value']['vic_edu_y0-9_y10_12_y12_above_percentage'];
	    	for(var ele in contentObj4){
	    		for(var element in all_data){
	    			if(all_data[element]['name'].toUpperCase() == ele.toUpperCase()){
	    				all_data[element]['education'] = (contentObj4[ele][1]+contentObj4[ele][2]).toFixed(2);
	    				break;
	    			}
	    		}
	    	}
	    	return rp(twitter_url)
	    })
        .then(function(response) {
        	var obj = JSON.parse(response);
        	var listObj = obj['rows'];
        	var contentObj = listObj[2]['value']['state'];
        	nsh = (contentObj['NEW SOUTH WALES'][0]).toFixed(3);
        	nsi = (contentObj['NEW SOUTH WALES'][1]).toFixed(3);
        	nsd = (contentObj['NEW SOUTH WALES'][2]).toFixed(3);
        	quh = (contentObj['QUEENSLAND'][0]).toFixed(3);
        	qui = (contentObj['QUEENSLAND'][1]).toFixed(3);
        	qud = (contentObj['QUEENSLAND'][2]).toFixed(3);
        	sah = (contentObj['SOUTH AUSTRALIA'][0]).toFixed(3);
        	sai = (contentObj['SOUTH AUSTRALIA'][1]).toFixed(3);
        	sad = (contentObj['SOUTH AUSTRALIA'][2]).toFixed(3);
        	vih = (contentObj['VICTORIA'][0]).toFixed(3);
        	vii = (contentObj['VICTORIA'][1]).toFixed(3);
        	vid = (contentObj['VICTORIA'][2]).toFixed(3);
        	wah = (contentObj['WESTERN AUSTRALIA'][0]).toFixed(3);
        	wai = (contentObj['WESTERN AUSTRALIA'][1]).toFixed(3);
        	wad = (contentObj['WESTERN AUSTRALIA'][2]).toFixed(3);
        	tah = (contentObj['TASMANIA'][0]).toFixed(3);
        	tai = (contentObj['TASMANIA'][1]).toFixed(3);
        	tad = (contentObj['TASMANIA'][2]).toFixed(3);
        	nth = (contentObj['NORTHERN TERRITORY'][0]).toFixed(3);
        	nti = (contentObj['NORTHERN TERRITORY'][1]).toFixed(3);
        	ntd = (contentObj['NORTHERN TERRITORY'][2]).toFixed(3);
        	cth = (contentObj['AUSTRALIA CAPITAL TERRITORY'][0]).toFixed(3);
        	cti = (contentObj['AUSTRALIA CAPITAL TERRITORY'][1]).toFixed(3);
        	ctd = (contentObj['AUSTRALIA CAPITAL TERRITORY'][2]).toFixed(3);

        	var contentObj2 = listObj[1]['value']['victoria'];
        	for(var ele in contentObj2){
        		for(var element in all_data){
        			if(all_data[element]['name'].toUpperCase()==ele){
        				all_data[element]['index'] = (contentObj2[ele][0]).toFixed(3);
        				all_data[element]['IOS'] = contentObj2[ele][1];
        				break;
        			}
        		}
        	}
        	res.render('index', {
        		nsh:nsh,nsa:nsa,nsb:nsb,nsc:nsc,nss:nss,nsi:nsi,nsd:nsd,
        		quh:quh,qua:qua,qub:qub,quc:quc,qus:qus,qui:qui,qud:qud,
        		sah:sah,saa:saa,sab:sab,sac:sac,sas:sas,sai:sai,sad:sad,
        		vih:vih,via:via,vib:vib,vic:vic,vis:vis,vii:vii,vid:vid,
        		wah:wah,waa:waa,wab:wab,wac:wac,was:was,wai:wai,wad:wad,
        		tah:tah,taa:taa,tab:tab,tac:tac,tas:tas,tai:tai,tad:tad,
        		nth:nth,nta:nta,ntb:ntb,ntc:ntc,nts:nts,nti:nti,ntd:ntd,
        		cth:cth,cta:cta,ctb:ctb,ctc:ctc,cts:cts,cti:cti,ctd:ctd,
        		all_data:JSON.stringify(all_data)
        	});
        	return Promise.resolve();
        }).catch(function(err) {console.log("error: "+err)});

	
	
	});
module.exports = router;