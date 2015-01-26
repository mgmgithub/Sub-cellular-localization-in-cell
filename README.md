Sub-cellular-localization-in-cell
=================================

--OBJECTIVE--

"To visualize biological cells and highlight by a user selected sub-cellular compartments in a way that they stand out from the un-selected ones" 

--POINTS TO NOTE--

Please open the component ("index.html") in Google Chrome.

The "Localization" page contains three sample input files, one each for Archaea, Bacteria and Eukaryota.

--IMPLEMENTATION--

1) First, all the cell compartments were identified by the paths that were marked using the GIMP image editor.
2) The images of the different cell compartments were saved in svg file format.
3) Using the information from the user's input file, the number of proteins present in each compartment were determined.
4) Each compartment was highlighted using a localization color scale, which was obtained by converting the number of proteins present in each localization into a percentage of the total number of proteins and matched to a color.
5) A table to display all the proteins present in each cell compartment and their scores.
6) Upon 'mouseover' over a compartment, a tooltip was displayed, which shows the proteins present in that cell compartment, and the score (confidence) of the protein.
7) The proteins displayed in the tooltip were made clickable so that the cell image could be updated to reflect the scores of the protein in all the cell compartments.
8) Finally, the cell compartments were highlighted using a score color scale, which was obtained by mapping the score of a protein in each cell compartment to a color. 
