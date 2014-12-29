
    //Global variables
	var cellType = "";
    var scoreProtein = [];
    var colorCellCompartment = "";	
	var isNotOneProtein = false;   
	   
	    
    //Clear popup when moveout
    function ClearPopup() {
	    var popup = getPopupObject('linkPopup');
        popup.style.visibility = 'hidden';	
    }

    //To get id from element
    function getPopupObject(myId) {
        if (document.getElementById(myId)) {
            return document.getElementById(myId);
        }
        else {
            return window.document[myId];
        }
    }

    //Shown main-popup
	//This function is called from wz_jsgraphics.js.
    function mouseEventHandler(mEvent,cID,pID) {
        // Internet Explorer	
        if (mEvent.srcElement) {
            showPopup(mEvent, 'linkPopup', mEvent.srcElement, cID,pID);
        }
        // Netscape and Firefox
        else if (mEvent.target) {
            showPopup(mEvent, 'linkPopup', mEvent.target, cID,pID);
        }
    } 
	
	//Showing score and little pop-up
	function showHighlightScore(proteinID,proteinLocalization,colorCellCompartment)
	{	 		 
		
		ClearPopup();	 
		selectCellPicture();	
		highlightCompartments(proteinID, proteinLocalization,colorCellCompartment);		
		//Header
       	writeHeader('headerPP',proteinID);		
		
		isNotOneProtein = false;					  	 
	} 
	
	function writeHeader(objectName,proteinID)
	{
	 	var divHeader = getPopupObject(objectName);
		while (divHeader.hasChildNodes()) {
			  divHeader.removeChild(divHeader.firstChild);
        }		
              var addHeader = document.createElement("h2");
                  addHeader.innerHTML = cellType + " : " + proteinID; 
                  divHeader.appendChild(addHeader);
	}
	//cID = protein localization,pID = proteinID
    function showPopup(myEvent, id, myElement,cID,pID) {
        var popup = getPopupObject(id);
        if (popup) {

            popup.style.visibility = 'hidden';
            var x = myEvent.clientX;
            var y = myEvent.clientY;
			
            x = parseInt(myEvent.clientX + document.body.scrollLeft);
            y = parseInt(myEvent.clientY + document.body.scrollTop);

            var tblPopup = getPopupObject('tblLinkPopup');

            //Remove all children before append
            while (tblPopup.hasChildNodes()) {
                
                  tblPopup.removeChild(tblPopup.firstChild);
            }		 	
							
					for (var i = 0; i < scoreProtein.length; i++) {                  					 
							var scorePT =  scoreProtein[i];							    
						 	
								 	 if(isNotOneProtein)
									 {		
									 		if (cID == scorePT.proteinLocalization)
									 			{															                                                
                                                    var rowProtein = document.createElement("tr");
                                                    rowProtein.setAttribute("id", "rowProtein" + i);
                                                    var columnProtein = document.createElement("td");
                                                    columnProtein.setAttribute("id", "columnProtein" + i);					
                                					var innerTag = document.createElement("p");
                                					innerTag.setAttribute("id", "innnerText" + i);
    																					
                                				    innerTag.setAttribute("onClick", "javaScript:showHighlightScore('"+scorePT.proteinID+"','"+ scorePT.proteinLocalization+"','"+ colorCellCompartment+"');");						
                                					innerTag.innerHTML = "<a href='#'>" + scorePT.proteinID + ":<b>" + scorePT.proteinScore+"</b></a>";
                                					
                                					columnProtein.appendChild(innerTag);                  
                                					rowProtein.appendChild(columnProtein);
                                                    tblPopup.appendChild(rowProtein);		   
										   
                                  				  }
									 }
									else
									 {
									  	if ((pID == scorePT.proteinID) && (cID == scorePT.proteinLocalization))	    						
    									    {								 
									 		 	 drawPopupScore(scorePT.proteinScore,tblPopup);						  
                						    	 break;		
											}							 	
									  }				 
                  					 
                	}               				 			
        						

            
            popup.style.left = x;
            popup.style.top = y;			
            popup.style.visibility = 'visible';

        }
    }
	
	
	function drawPopupScore(proteinScore,tblPopup)
	{
	 		 var rowProtein = document.createElement("tr");
                 rowProtein.setAttribute("id", "rowProtein0");
             var columnProtein = document.createElement("td");
                 columnProtein.setAttribute("id", "columnProtein0");				
                 columnProtein.innerHTML = "<p class='oneProtein' onmouseout='javaScript:clearPopup();' >" + proteinScore + "</p>";
                 rowProtein.appendChild(columnProtein);
                 tblPopup.appendChild(rowProtein);
	
	}

    function highlightCompartments(proteinID, proteinLocalization,colorCellCompartment) {
        var divCanvas = "myCanvas";
        var jg = new jsGraphics(divCanvas);			 
		
        if (cellType == "eukaryota") {

             if (proteinLocalization == "chloroplast")
            {			 	
                jg.setColor(colorCellCompartment);			
                jg.fillPolygon(proteinLocalization,proteinID,new Array(163, 160, 160, 164, 170, 176, 184, 193, 200, 208, 215, 221, 225, 230, 229, 214, 196, 184, 172), new Array(124, 128, 134, 138, 141, 142, 142, 142, 141, 139, 136, 134, 132, 129, 121, 115, 114, 115, 118));
                jg.paint();				
				
            }
	    else if (proteinLocalization == "chloroplastMembrane") {

                jg.setColor(colorCellCompartment);
				jg.drawPolygon(proteinLocalization,proteinID,new Array(163, 160, 160, 164, 170, 176, 184, 193, 200, 208, 215, 221, 225, 230, 229, 214, 196, 184, 172), new Array(124, 128, 134, 138, 141, 142, 142, 142, 141, 139, 136, 134, 132, 129, 121, 115, 114, 115, 118));                
                jg.paint();
            }
	    else if (proteinLocalization == "cytosol") {
                jg.setColor(colorCellCompartment);                
                jg.paint();
            }
		else if (proteinLocalization == "golgiApparatus") {
			 	
                jg.setColor(colorCellCompartment);
                jg.fillPolygon(proteinLocalization,proteinID,new Array(127,130,130,128,128,131,135,140,146,152,159,165,170,175,180,182,178,174,169,163,159,152,146,138,132,127,124,121,124), new Array(160,162,165,168,172,176,182,188,192,196,199,202,202,202,203,206,208,208,206,206,204,200,198,193,186,178,174,167,162));
				jg.fillPolygon(proteinLocalization,proteinID,new Array(115,120,123,120,118,118,120,125,131,136,143,150,161,167,173,179,184,189,191,188,182,173,164,157,149,141,133,126,122,117,114,113,113), new Array(157,157,160,163,167,172,177,184,192,196,201,204,210,211,214,214,212,212,216,218,219,217,214,211,209,204,200,191,186,178,169,162,158));
				jg.fillPolygon(proteinLocalization,proteinID,new Array(186,191,195,199,200,195,188,184), new Array(226,225,223,224,229,231,231,229));
				jg.fillPolygon(proteinLocalization,proteinID,new Array(99,103,107,109,109,109,112,113,115,119,123,127,132,140,147,154,161,168,175,179,178,173,165,155,144,135,128,122,115,108,103,95,96), new Array(156,156,157,162,167,171,175,180,185,191,197,202,206,211,215,218,220,222,224,226,229,227,225,222,217,213,207,202,195,181,171,163,159));
				jg.fillPolygon(proteinLocalization,proteinID,new Array(99,103,103,105,107,110,113,113,110,106,103,101,98), new Array(175,178,181,185,189,193,197,200,200,193,189,183,178));
				jg.fillPolygon(proteinLocalization,proteinID,new Array(116,120,124,127,130,135,141,147,154,159,160,157,147,139,131,122,118), new Array(203,205,209,211,215,218,221,223,226,227,231,232,227,224,220,212,207));
				jg.fillPolygon(proteinLocalization,proteinID,new Array(163,166,166,163,162), new Array(234,235,238,238,236));
				jg.fillPolygon(proteinLocalization,proteinID,new Array(99,103,105,109,112,117,123,129,132,133,129,123,116,110,105,100), new Array(192,195,200,204,208,213,216,220,223,225,223,220,215,209,204,199));	
				jg.fillPolygon(proteinLocalization,proteinID,new Array(90,93,93,91,87,86,88), new Array(174,175,179,183,182,178,175));		
				jg.paint();
            }
		else if (proteinLocalization == "golgiApparatusMembrane") {
			 			
                jg.setColor(colorCellCompartment);
                jg.drawPolygon(proteinLocalization,proteinID,new Array(128,131,131,129,129,132,136,141,147,153,160,166,171,176,181,183,179,175,170,164,160,153,147,139,133,128,125,122,125), new Array(161,163,166,169,173,177,183,189,193,197,200,203,203,203,204,207,209,209,207,207,205,201,199,194,187,179,175,168,163));
				jg.drawPolygon(proteinLocalization,proteinID,new Array(115,120,123,120,118,118,120,125,131,136,143,150,161,167,173,179,184,189,191,188,182,173,164,157,149,141,133,126,122,117,114,113,113), new Array(157,157,160,163,167,172,177,184,192,196,201,204,210,211,214,214,212,212,216,218,219,217,214,211,209,204,200,191,186,178,169,162,158));
				jg.drawPolygon(proteinLocalization,proteinID,new Array(186,191,195,199,200,195,188,184), new Array(226,225,223,224,229,231,231,229));
				jg.drawPolygon(proteinLocalization,proteinID,new Array(99,103,107,109,109,109,112,113,115,119,123,127,132,140,147,154,161,168,175,179,178,173,165,155,144,135,128,122,115,108,103,95,96), new Array(156,156,157,162,167,171,175,180,185,191,197,202,206,211,215,218,220,222,224,226,229,227,225,222,217,213,207,202,195,181,171,163,159));
				jg.drawPolygon(proteinLocalization,proteinID,new Array(99,103,103,105,107,110,113,113,110,106,103,101,98), new Array(175,178,181,185,189,193,197,200,200,193,189,183,178));
				jg.drawPolygon(proteinLocalization,proteinID,new Array(116,120,124,127,130,135,141,147,154,159,160,157,147,139,131,122,118), new Array(203,205,209,211,215,218,221,223,226,227,231,232,227,224,220,212,207));
				jg.drawPolygon(proteinLocalization,proteinID,new Array(163,166,166,163,162), new Array(234,235,238,238,236));
				jg.drawPolygon(proteinLocalization,proteinID,new Array(99,103,105,109,112,117,123,129,132,133,129,123,116,110,105,100), new Array(192,195,200,204,208,213,216,220,223,225,223,220,215,209,204,199));	
				jg.drawPolygon(proteinLocalization,proteinID,new Array(90,93,93,91,87,86,88), new Array(174,175,179,183,182,178,175));
                jg.paint();
            }
		else if (proteinLocalization == "peroxisome") {
                jg.setColor(colorCellCompartment);				
                jg.fillPolygon(proteinLocalization,proteinID,new Array(161,154,150,150,152,155,158,162,166,171,176,181,184,187,186,184), new Array(156,159,163,168,172,175,177,179,180,180,180,180,177,173,168,164));
                jg.paint();
            }
		else if (proteinLocalization == "peroxisomeMembrane") {
                jg.setColor(colorCellCompartment);
                jg.drawPolygon(proteinLocalization,proteinID,new Array(161,154,150,150,152,155,158,162,166,171,176,181,184,187,186,184), new Array(156,159,163,168,172,175,177,179,180,180,180,180,177,173,168,164));
                jg.paint();
            }
		else if (proteinLocalization == "plastid") {
                jg.setColor(colorCellCompartment);				
				jg.fillPolygon(proteinLocalization,proteinID,new Array(270,266,264,266,271,278,284,287,282), new Array(224,228,231,236,239,240,238,232,226));
                jg.paint();
            }
		else if (proteinLocalization == "plasmaMembrane") {
                jg.setColor(colorCellCompartment);
                jg.drawPolygon(proteinLocalization,proteinID,new Array(87,79,70,69,73,78,89,101,121,136,149,168,185,220,235,257,282,302,329,348,376,403,425,437,438,433,416,389,358,315,259,211,167,139,110), new Array(130,144,168,186,202,214,226,235,246,250,255,258,260,262,263,263,263,262,259,256,250,238,221,202,184,159,134,114,104,97,96,96,99,102,112));
                jg.paint();
            }
		else if (proteinLocalization == "extraCellular") {

                jg.setColor(colorCellCompartment);
			    jg.fillPolygon(proteinLocalization,proteinID,new Array(439,500,498,0,1,71,68,69,72,79,86,97,113,131,149,171,196,219,257,287,317,354,377,401,422,432,437), new Array(196,195,1,2,194,196,186,177,159,143,130,120,111,103,100,97,97,96,97,97,99,104,110,122,139,156,178));
                jg.fillPolygon(proteinLocalization,proteinID,new Array(440,499,500,1,1,69,73,83,97,113,135,164,193,216,243,276,309,341,363,384,405,419,428,435,439), new Array(197,196,399,397,195,197,207,221,234,242,250,258,260,262,263,262,260,256,252,246,237,226,218,206,199));
				jg.paint();
            }
		else if (proteinLocalization == "nucleus") {		        
                jg.setColor(colorCellCompartment);
                jg.fillPolygon(proteinLocalization,proteinID,new Array(234, 226, 223, 224, 229, 237, 244, 252, 258, 264, 274, 283, 290, 298, 298, 295, 280, 245), new Array(140, 145, 152, 160, 164, 168, 170, 172, 172, 173, 173, 172, 170, 165, 157, 148, 141, 138));
                jg.paint();
            }
		else if (proteinLocalization == "nucleusMembrane") {
                jg.setColor(colorCellCompartment);
                jg.drawPolygon(proteinLocalization,proteinID,new Array(234, 226, 223, 224, 229, 237, 244, 252, 258, 264, 274, 283, 290, 298, 298, 295, 280, 245), new Array(140, 145, 152, 160, 164, 168, 170, 172, 172, 173, 173, 172, 170, 165, 157, 148, 141, 138));
                jg.paint();
            }
        else if (proteinLocalization == "vacuole") {
				jg.setColor(colorCellCompartment);
                jg.fillPolygon(proteinLocalization,proteinID,new Array(318,312,311,314,318,323,327,330,330,327,322,318,318,322,328,336,345,352,361,369,373,379,384,390,395,396,388,378,363,351,340,329), new Array(125,131,136,142,146,152,156,162,168,174,181,187,193,194,193,190,185,183,177,176,174,173,173,172,171,162,152,143,135,128,124,123));
                jg.paint();
            }   
	    else if (proteinLocalization == "vacuoleMembrane") {
                jg.setColor(colorCellCompartment);
                jg.drawPolygon(proteinLocalization,proteinID,new Array(318,312,311,314,318,323,327,330,330,327,322,318,318,322,328,336,345,352,361,369,373,379,384,390,395,396,388,378,363,351,340,329), new Array(125,131,136,142,146,152,156,162,168,174,181,187,193,194,193,190,185,183,177,176,174,173,173,172,171,162,152,143,135,128,124,123));
                jg.paint();
            }
		else if (proteinLocalization == "mitochondria") {

                jg.setColor(colorCellCompartment);			
				jg.fillPolygon(proteinLocalization,proteinID,new Array(341,337,338,341,345,351,356,363,369,377,383,389,395,398,401,401,392,383), new Array(215,220,225,229,230,230,229,227,225,221,217,214,209,204,199,192,190,193));
                jg.paint();
            }
		else if (proteinLocalization == "mitochondriaMembrane") {

                jg.setColor(colorCellCompartment);
                jg.drawPolygon(proteinLocalization,proteinID,new Array(341,337,338,341,345,351,356,363,369,377,383,389,395,398,401,401,392,383), new Array(215,220,225,229,230,230,229,227,225,221,217,214,209,204,199,192,190,193));
                jg.paint();
            }
		else if (proteinLocalization == "endoplasmicReticulum") {

                jg.setColor(colorCellCompartment);			
                jg.fillPolygon(proteinLocalization,proteinID,new Array(255,254,253,249,245,241,237,233,230,228,226,228,232,239,242,240,236,233,229,226,228,233,239,246,251,258,263,263,258,255,250,246,247,252,257,262,268,273,271,267,262,258,258,258,259), new Array(171,176,179,180,179,178,176,173,171,170,173,178,180,182,185,187,186,184,183,184,187,191,192,194,194,196,194,191,190,190,189,188,185,186,187,187,186,185,181,181,181,180,177,175,172));
				jg.fillPolygon(proteinLocalization,proteinID,new Array(274,276,279,278,278,282,287,292,298,300,297,294,290,286,282,280,280,279), new Array(172,177,181,183,186,187,184,181,177,172,170,172,175,178,178,177,174,172));
				jg.fillPolygon(proteinLocalization,proteinID,new Array(268,274,280,288,293,298,298,292,283,274,267,267), new Array(191,192,190,187,185,183,186,190,194,195,195,193));				
				jg.fillPolygon(proteinLocalization,proteinID,new Array(266,274,282,289,294,300,304,305,307,309,306,299,293,292,295,300,305,307,309,307,303,297,289,285,279,276,275,280,285,287,284,281,273,268,264,264), new Array(201,200,199,197,194,190,187,183,182,186,191,195,200,204,204,201,197,195,196,201,206,210,212,214,216,215,212,210,208,205,203,203,205,207,206,203));
				jg.fillPolygon(proteinLocalization,proteinID,new Array(211,215,217,222,227,233,240,247,254,259,254,245,237,235,238,240,238,232,226,221,214,212,216,220,223,226,227,225,220,215,209,207,208), new Array(173,176,182,187,191,194,196,198,200,202,205,203,202,204,207,209,211,211,208,205,201,197,196,198,201,201,198,196,192,189,183,178,175));				
				jg.fillPolygon(proteinLocalization,proteinID,new Array(246,252,257,263,269,269,262,253,248,245), new Array(210,211,212,212,212,215,217,217,215,214));
                jg.paint();
            }
		else if (proteinLocalization == "endoplasmicReticulumMembrane") {

                jg.setColor(colorCellCompartment);
                jg.drawPolygon(proteinLocalization,proteinID,new Array(255,254,253,249,245,241,237,233,230,228,226,228,232,239,242,240,236,233,229,226,228,233,239,246,251,258,263,263,258,255,250,246,247,252,257,262,268,273,271,267,262,258,258,258,259), new Array(171,176,179,180,179,178,176,173,171,170,173,178,180,182,185,187,186,184,183,184,187,191,192,194,194,196,194,191,190,190,189,188,185,186,187,187,186,185,181,181,181,180,177,175,172));
				jg.drawPolygon(proteinLocalization,proteinID,new Array(274,276,279,278,278,282,287,292,298,300,297,294,290,286,282,280,280,279), new Array(172,177,181,183,186,187,184,181,177,172,170,172,175,178,178,177,174,172));
				jg.drawPolygon(proteinLocalization,proteinID,new Array(268,274,280,288,293,298,298,292,283,274,267,267), new Array(191,192,190,187,185,183,186,190,194,195,195,193));				
				jg.drawPolygon(proteinLocalization,proteinID,new Array(266,274,282,289,294,300,304,305,307,309,306,299,293,292,295,300,305,307,309,307,303,297,289,285,279,276,275,280,285,287,284,281,273,268,264,264), new Array(201,200,199,197,194,190,187,183,182,186,191,195,200,204,204,201,197,195,196,201,206,210,212,214,216,215,212,210,208,205,203,203,205,207,206,203));
				jg.drawPolygon(proteinLocalization,proteinID,new Array(211,215,217,222,227,233,240,247,254,259,254,245,237,235,238,240,238,232,226,221,214,212,216,220,223,226,227,225,220,215,209,207,208), new Array(173,176,182,187,191,194,196,198,200,202,205,203,202,204,207,209,211,211,208,205,201,197,196,198,201,201,198,196,192,189,183,178,175));				
				jg.drawPolygon(proteinLocalization,proteinID,new Array(246,252,257,263,269,269,262,253,248,245), new Array(210,211,212,212,212,215,217,217,215,214));
                jg.paint();
            }
            
        }
		else if (cellType == "bacteria") {
		
			 if(proteinLocalization=="cytosol"){
				jg.setColor(colorCellCompartment);                
                jg.paint();			
			}
			else if(proteinLocalization=="extra-cellular"){
				jg.setColor(colorCellCompartment);                
                jg.paint();			
			}
			else if(proteinLocalization=="fimbrium"){
				jg.setColor(colorCellCompartment);
	
    //<area alt="" title="" href="#" shape="poly" coords="369,252,373,258,374,264,373,268,371,276" />
    //<area alt="" title="" href="#" shape="poly" coords="397,242,398,248,399,254,403,263" />
    //<area alt="" title="" href="#" shape="poly" coords="419,224,427,226,435,230,441,238,447,244" />
    //<area alt="" title="" href="#" shape="poly" coords="426,203,429,207,435,208,442,208" />
    //<area alt="" title="" href="#" shape="poly" coords="414,167,419,166,425,165,431,163,436,154" />
    //<area alt="" title="" href="#" shape="poly" coords="391,147,396,144,401,141,409,138,419,135" />
    //<area alt="" title="" href="#" shape="poly" coords="368,139,371,132,369,123" />
    //<area alt="" title="" href="#" shape="poly" coords="322,134,326,125,333,118,342,113,350,109" />
    //<area alt="" title="" href="#" shape="poly" coords="296,134,300,127,302,118,299,113,295,107" />
    //<area alt="" title="" href="#" shape="poly" coords="257,135,257,131,261,123" />
    //<area alt="" title="" href="#" shape="poly" coords="229,132,235,121,235,110,230,100,227,90" />
    //<area alt="" title="" href="#" shape="poly" coords="201,132,199,127,195,125,197,117" />
    //<area alt="" title="" href="#" shape="poly" coords="171,131,165,124,161,116,161,108,163,102,165,99" />
    //<area alt="" title="" href="#" shape="poly" coords="149,134,146,128,141,124,136,118" />
    //<area alt="" title="" href="#" shape="poly" coords="109,142,108,134,99,128,91,121,81,115" />
    //<area alt="" title="" href="#" shape="poly" coords="83,168,73,163,65,160,57,158,51,152" />
    //<area alt="" title="" href="#" shape="poly" coords="83,208,76,207,62,208" />
    //<area alt="" title="" href="#" shape="poly" coords="108,230,104,232,99,240,97,242" />
	//<area alt="" title="" href="#" shape="poly" coords="139,245,136,251,130,255,124,258,119,260" />
    //<area alt="" title="" href="#" shape="poly" coords="172,256,167,260,164,267,159,274,154,282,152,287" />
    //<area alt="" title="" href="#" shape="poly" coords="202,261,200,272,200,278,197,285,193,292" />
    //<area alt="" title="" href="#" shape="poly" coords="231,264,233,278,237,286,238,296,235,304,240,318" />
    //<area alt="" title="" href="#" shape="poly" coords="269,268,268,276,269,283,271,288" />
    //<area alt="" title="" href="#" shape="poly" coords="301,266,303,276,301,289,301,298" />
				
								
                //jg.drawPolygon(new Array(336,339,338,337,335,335), new Array(260,272,281,289,297,306));
                jg.paint();		
			}
			if(proteinLocalization=="outer membrane"){
				jg.setColor(colorCellCompartment);				
                jg.fillPolygon(proteinLocalization,proteinID,new Array(161,154,150,150,152,155,158,162,166,171,176,181,184,187,186,184), new Array(156,159,163,168,172,175,177,179,180,180,180,180,177,173,168,164));
                jg.paint();		
			}
			else if(proteinLocalization=="periplasmic space"){
				jg.setColor(colorCellCompartment);				
                jg.fillPolygon(proteinLocalization,proteinID,new Array(161,154,150,150,152,155,158,162,166,171,176,181,184,187,186,184), new Array(156,159,163,168,172,175,177,179,180,180,180,180,177,173,168,164));
                jg.paint();		
			}
			else if(proteinLocalization=="plasma membrane"){
			}			
		
		}
		else if (cellType == "archaea") {
			 if(proteinLocalization=="cytoplasm"){
			}
			else if(proteinLocalization=="extra-cellular"){
			}
			else if(proteinLocalization=="plasma membrana"){
			}
			else {
				colorCellCompartment="#ffffff";
			}
		}


    }

    function selectCellPicture() {

        
        //Clear old image for next uploading
        var clearImg = getPopupObject('myCanvas');
        while (clearImg.hasChildNodes()) {
			  clearImg.removeChild(clearImg.firstChild);
        }
        //Select eukaryota
        if (cellType == "eukaryota") {
            var img = document.createElement("img");
            img.setAttribute("name", "leop");
            img.setAttribute("src", "./Euk-Cell-2D.jpg");
            img.setAttribute("width", "500");
            img.setAttribute("height", "400");
            img.setAttribute("alt", "");
            img.setAttribute("onMouseMove", "javaScript:ClearPopup();");
            document.getElementById("myCanvas").appendChild(img);
        }
        //Select bacteria
		else if (cellType == "bacteria") {
		
			var img = document.createElement("img");
            img.setAttribute("name", "leop");
            img.setAttribute("src", "./bacteria-2D.jpg");
            img.setAttribute("width", "500");
            img.setAttribute("height", "400");
            img.setAttribute("alt", "");
            img.setAttribute("onMouseMove", "javaScript:ClearPopup();");
           
            document.getElementById("myCanvas").appendChild(img);


        }
        //Select archaea
		else if (cellType == "archaea") {
			var img = document.createElement("img");
            img.setAttribute("name", "leop");
            img.setAttribute("src", "./archaea-2D.jpg");
            img.setAttribute("width", "500");
            img.setAttribute("height", "400");
            img.setAttribute("alt", "");
            img.setAttribute("onMouseMove", "javaScript:ClearPopup();");
           
            document.getElementById("myCanvas").appendChild(img);
		
		}


    }	
	
	function isOneProteinInFile()
	{
	 		 // Declaring variables for checking isOneProtein
						 var checkOneProtein = "";
        				 var compareProtein = "";        				 
        				 var oneProtein = scoreProtein[0];
                    	 checkOneProtein = oneProtein.proteinID;
				//Checking only one protein in file				
				for (var i = 0; i < scoreProtein.length; i++) {
						   	 	var localization = scoreProtein[i]
              					compareProtein = localization.proteinID;
          										 
          						if(compareProtein != checkOneProtein)
          						{
          							isNotOneProtein = true;
									break;
          						}
								
				}
				
				if(isNotOneProtein == false)
				{
				 	writeHeader('headerPP',oneProtein.proteinID);
				}				 
						 
	}	 

    window.onload = function () {
		
        var fileInput = document.getElementById('fileInput');
        var fileDisplayArea = document.getElementById('fileDisplayArea');		

        fileInput.addEventListener('change', function (e) {
            var file = fileInput.files[0];
            var textType = /text.*/;

            if (file.type.match(textType)) {
			   
                var reader = new FileReader();
                reader.onload = function (e) {
                    var words = (function () {

                        //split the file contents into separate lines on encountering \R or \r\n or \n
                        var fileLines = reader.result.trim().replace(/[\R\r\n]/g, ',').split(/[\,]+/g);
                        console.log("Lines= " + fileLines);
                        var fileLinesCount = fileLines.length;
                        console.log("Number of lines=" + fileLinesCount);

                        //create two new arrays - for score and localization
                        var scoreArray = [];
                        
                        //Omit the 1st two lines and start from the 3rd line
                        for (var i = 2; i < fileLines.length; i++) {

                            //Separate the line into words on encountering a tab and print each word
                            var arrayWords = fileLines[i].replace(/[\t]/g, ',').split(/[\,]+/g);
                            console.log(arrayWords);	
							
							// Array containing protein scores
                            scoreArray.push({
                                proteinID: arrayWords[0],
								proteinScore: arrayWords[1],
                                proteinLocalization: arrayWords[2]
                            });						
							
                        }
						                  

                        //Assigning global variable of score array
                        scoreProtein = scoreArray;
									

                        //find out the type of cell by reading the first line in the input file
                        cellType = fileLines[0].trim().toLowerCase();
						
						//To select correct cell picture
                        selectCellPicture();                        	
						//Header				 
					    writeHeader('headerPP',"");	
						
						//Temp Color
						colorCellCompartment = "#00CC00";	
						
						//Checking only one protein in file
						isOneProteinInFile();									
						
						//To highlight cell's compartments
						for (var i = 0; i < scoreProtein.length; i++) {
              					 var localization = scoreArray[i];									
															
								//To print the contents of the Localization array						
								highlightCompartments(localization.proteinID,localization.proteinLocalization,colorCellCompartment);							   
         				}
						
					

                    } ());

                }
                reader.readAsText(file);

            }

            else {
                fileDisplayArea.innerText = "File not supported!";
            }
        });

    }