
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
		
        if (cellType == "eukaryota") {
		    
             if (proteinLocalization == "chloroplast")
         {	      			
		   			
			  var svgPath = d3.select("svg")
		   	   	  .append("path")
				  .attr("id", "chloroplast")
				  .attr("fill",colorCellCompartment)
				  .attr("d","M 180.25,115.50 C 180.08,114.21 207.61,114.28 207.50,115.00 207.50,115.00 222.00,117.75 222.00,117.75 223.08,117.30 231.42,122.85 229.25,123.75 229.25,123.75 230.75,129.25 230.75,129.25 230.75,129.25 223.25,135.00 223.25,135.00 223.25,135.00 207.25,141.25 207.25,141.25 207.25,141.25 186.00,143.75 186.00,143.75 186.00,143.75 174.50,143.50 174.50,143.50 174.50,143.50 165.75,141.00 165.75,141.00 165.75,141.00 161.25,137.50 161.25,137.50 161.25,137.50 159.00,134.25 159.00,134.25 159.00,134.25 158.75,130.50 158.75,130.50 158.75,130.50 160.50,126.25 160.50,126.25 160.50,126.25 163.50,122.50 163.50,122.50 163.50,122.50 166.75,119.25 166.75,119.25 166.75,119.25 171.50,117.50 171.50,117.50 171.50,117.50 176.25,115.75 176.25,115.75 Z")
				  .attr("onmouseover","javaScript:mouseEventHandler(event,'"+proteinLocalization+"','"+proteinID+"');");	
				  //.attr("onmouseout","javaScript:ClearPopup();")							
				
         }
	    else if (proteinLocalization == "chloroplastMembrane") {

               
            }
	    else if (proteinLocalization == "cytosol") {
               
            }
		else if (proteinLocalization == "golgiApparatus") {
			 	
                
            }
		else if (proteinLocalization == "golgiApparatusMembrane") {
			 			
               
            }
		else if (proteinLocalization == "peroxisome") {
               
            }
		else if (proteinLocalization == "peroxisomeMembrane") {
                
            }
		else if (proteinLocalization == "plastid") {
               
            }
		else if (proteinLocalization == "plasmaMembrane") {
                
            }
		else if (proteinLocalization == "extraCellular") {

               
            }
		else if (proteinLocalization == "nucleus") {		        
               
            }
		else if (proteinLocalization == "nucleusMembrane") {
                
            }
        else if (proteinLocalization == "vacuole") {
				
            }   
	    else if (proteinLocalization == "vacuoleMembrane") {
               
            }
		else if (proteinLocalization == "mitochondria") {

               
            }
		else if (proteinLocalization == "mitochondriaMembrane") {

               
            }
		else if (proteinLocalization == "endoplasmicReticulum") {

               
            }
		else if (proteinLocalization == "endoplasmicReticulumMembrane") {

               
            }
            
        }
		else if (cellType == "bacteria") {
		
			 if(proteinLocalization=="cytosol"){
						
			}
			else if(proteinLocalization=="extra-cellular"){
							
			}
			else if(proteinLocalization=="fimbrium"){
					
			}
			if(proteinLocalization=="outer membrane"){
					
			}
			else if(proteinLocalization=="periplasmic space"){
					
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
			
		}


    }

    function selectCellPicture() {
	        
        //Clear old image for next uploading
        var divImg = getPopupObject('myCanvas');
        while (divImg.hasChildNodes()) {
			  divImg.removeChild(divImg.firstChild);
        }
        //Select eukaryota
        if (cellType == "eukaryota") {
		//SVG		   
		   var divSVG = d3.select("#myCanvas") 
		  	        .append("svg")
			        .attr("width",1000)
        	        .attr("height",1000);
		   var svg = d3.select("svg")
		   	   	    .append("image")
					.attr("xlink:href", "./Euk-Cell-2D.jpg")
        	        .attr("x",0)
					.attr("y",0)
					.attr("width",500)
        	        .attr("height",400)
					.attr("onmousemove", "javaScript:ClearPopup();");	   				
            
        }
        //Select bacteria
		else if (cellType == "bacteria") {
					
			//SVG		   
		   var divSVG = d3.select("#myCanvas") 
		  	        .append("svg")
			        .attr("width",1000)
        	        .attr("height",1000);
		   var svg = d3.select("svg")
		   	   	    .append("image")
					.attr("xlink:href", "./bacteria-2D.jpg")
        	        .attr("x",0)
					.attr("y",0)
					.attr("width",500)
        	        .attr("height",400)
					.attr("onmousemove", "javaScript:ClearPopup();");
        }
        //Select archaea
		else if (cellType == "archaea") {
			
			
		   //SVG		   
		   var divSVG = d3.select("#myCanvas") 
		  	        .append("svg")
			        .attr("width",1000)
        	        .attr("height",1000);
		   var svg = d3.select("svg")
		   	   	    .append("image")
					.attr("xlink:href", "./archaea-2D.jpg")
        	        .attr("x",0)
					.attr("y",0)
					.attr("width",500)
        	        .attr("height",400)
					.attr("onmousemove", "javaScript:ClearPopup();");	
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

   function main() { 		
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
	
	main();