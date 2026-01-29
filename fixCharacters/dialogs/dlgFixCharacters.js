//////////////////////////////////////////////////////////////
// Fix Characters                      Updated: 2021-11-27  //
//////////////////////////////////////////////////////////////
// Originally Made by Steegy aka RC (Ruben Castelein)       //
// Converted to Javascript By: MPG IT Consulting              //
// Fixes most important tags using personal preferences     //
//////////////////////////////////////////////////////////////

///////////////////////////////////////////////////
// FORM CREATION AND CALLING OF ENHANCER METHODS //
///////////////////////////////////////////////////

"use strict";
var styleOn;
var trackList;
var objTrackList = [{
	ID:"",
	trackNo:"",
	title:"",
	artist:"",
	album:"",
	albumArtist:"",
	genre:"",
	changed:"0"
}];

//Commit changes
function btnOkClick() {
	var intCnt;

	//loop through each selected record
	trackList.forEach(function (itmRec){
		//loop through each updated object
		for(intCnt = 0; intCnt < objTrackList.length; intCnt++){
			//find the one that matches
			if(itmRec.id == objTrackList[intCnt].ID){
				//only update selected track list if it was udpated
				if (objTrackList[intCnt].changed == "1"){
					itmRec.trackNumber = objTrackList[intCnt].trackNo;
					itmRec.title = objTrackList[intCnt].title;
					itmRec.artist = objTrackList[intCnt].artist;
					itmRec.albumArtist = objTrackList[intCnt].albumArtist;
					itmRec.album = objTrackList[intCnt].album;
					itmRec.genre = objTrackList[intCnt].genre;
				};
				intCnt < objTrackList.length + 1
			}
		}
	});

	trackList.commitAsync();
	closeWindow();
}

//close without saving
function btnCancelClick() {}

//write out a table row
function outField (fixed, normal) {
	var resultVal;
	if(fixed == normal){
		resultVal = "<td>" + MapField(normal) + "</td>";
	}else{
		resultVal = "<td class=\"highlight\" title=\"" + _("Old Value: ") + String.fromCharCode(13) + MapXML(normal) + "\">" + MapField(fixed) + "</td>";
	}
	return resultVal;
}

//set row style
function Style() {
	var resultVal;
	styleOn = !styleOn
	if(styleOn){
		resultVal = ""
	}else{
		resultVal = " class=\"Dark\""
	}
	return resultVal;
}

//
function MapField(fld) {
	var resultVal;
	if(fld == undefined){
		resultVal = "&nbsp;"
	}else{
		resultVal = MapXML(fld)
	}
	return resultVal;
}

function MapXML(original) {
	var hold;
	var i = 0;

	hold = original.replaceAll( "&",  "&amp;");
	hold = hold.replaceAll( "  ",  "&nbsp; ");
	hold = hold.replaceAll( "<",  "&lt;");
	hold = hold.replaceAll( ">",  "&gt;");
	hold = hold.replaceAll( "\"",  "&quot;");

	while((i<=hold.length)) { 
		if(hold.substr(i,  1).charCodeAt(0) > 127){
			hold = hold.substr(1,  i-1) + "&#" + (hold.substr(i,  1).charCodeAt(0) +'') + ";" + hold.substr(i+1);
		}
		i=i+1
	}
	return hold;
}

function FixForwardSlash(Tag) {
	var nCnt;
	//Add spaces before and after forward slash
    if(Tag.indexOf( "/") != -1){
		nCnt = Tag.indexOf( "/");
		while(nCnt != -1) {
			//Add space before /
			if(Tag.substr( nCnt - 1,  1) != " "){
				Tag = Tag.substr( 0 , nCnt) + " " + Tag.substr(nCnt,  Tag.length);
			};
			//Add space after /
			nCnt = (Tag).indexOf( "/", nCnt);
			if(Tag.substr( nCnt + 1,  1) != " "){
				Tag = Tag.substr( 0 ,  nCnt + 1) + " " + Tag.substr(nCnt + 1,  Tag.length);
			};
			nCnt = Tag.indexOf( "/", nCnt + 1);
		 }
	};
	return Tag;
}

function ChangeCharacters(Tag) {
	Tag = Tag.replaceAll( "_",  " ");
	Tag = Tag.replaceAll( "´",  "'");
	Tag = Tag.replaceAll( "`",  "'");
	Tag = Tag.replaceAll( "‘",  "'");
	Tag = Tag.replaceAll( "’",  "'");
	Tag = Tag.replaceAll( "…",  "...");
	Tag = Tag.replaceAll( " ?",  "?");
	Tag = Tag.replaceAll( " !",  "!");
	Tag = Tag.replaceAll( " ,",  ",");
	Tag = Tag.replaceAll( " :",  ":");
	Tag = Tag.replaceAll( " ...",  "...");
	Tag = Tag.replaceAll( "  ",  " ");
	Tag = Tag.replaceAll( "@",  "At");

	return Tag;
}

function FixBrackets(Tag) {
	Tag = Tag.replaceAll("[", "(");
    Tag = Tag.replaceAll("]", ")");
    Tag = Tag.replaceAll("( ", "(");
    Tag = Tag.replaceAll(" )", ")");
    Tag = Tag.replaceAll("{", "(");
    Tag = Tag.replaceAll("}", ")");
    
	return Tag;
}

function FixCommonWords(Tag) {

	Tag = ReplaceBadTagPortion(Tag, "its", "It's");      //Good changes outweigh the bad ones (real "its")
	Tag = ReplaceBadTagPortion(Tag, "RMX", "Remix");

	Tag = ReplaceBadTagPortion(Tag, "dont", "Don't");
	Tag = ReplaceBadTagPortion(Tag, "wont", "Won't");

	Tag = ReplaceBadTagPortion(Tag, "aint", "Ain't");
	Tag = ReplaceBadTagPortion(Tag, "isnt", "Isn't");
	Tag = ReplaceBadTagPortion(Tag, "cant", "Can't");

	Tag = ReplaceBadTagPortion(Tag, "ill", "I'll");      //Good changes outweigh the bad ones (real "ill")

	Tag = ReplaceBadTagPortion(Tag, "Im", "I'm");

	Tag = ReplaceBadTagPortion(Tag, "wouldnt", "Wouldn't");
	Tag = ReplaceBadTagPortion(Tag, "wouldve", "Would've");

	Tag = ReplaceBadTagPortion(Tag, "couldnt", "Couldn't");
	Tag = ReplaceBadTagPortion(Tag, "couldve", "Could've");

	Tag = ReplaceBadTagPortion(Tag, "shouldnt", "Shouldn't");
	Tag = ReplaceBadTagPortion(Tag, "shouldve", "Should've");


	Tag = ReplaceBadTagPortion(Tag, "youre", "You're");
	Tag = ReplaceBadTagPortion(Tag, "youve", "You've");
	Tag = ReplaceBadTagPortion(Tag, "didnt", "Didn't");
	Tag = ReplaceBadTagPortion(Tag, "wasnt", "Wasn't");
	Tag = ReplaceBadTagPortion(Tag, "wont", "Won't");
	Tag = ReplaceBadTagPortion(Tag, "havent", "Haven't");
	return Tag;
}

const RemoveAccents = str => {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/\u00df/g, "ss")
}

function FixWrongGenre(Tag) {
	var resultVal;
	resultVal = Tag.toLowerCase();
	if(resultVal == "other" || resultVal == "unknown" || resultVal == "default" || resultVal == "genre" || resultVal == "misc"){
		Tag = ""
	}
	return Tag;
}

function ReplaceBadTagPortion(Tag, fromValue, toValue) {
	if(Tag.toLowerCase().indexOf(fromValue.toLowerCase()) == 0){
 		regExp = new RegExp(fromValue + " ", "gi");
		Tag = Tag.replaceAll(regExp, toValue + " ");
 
		regExp = new RegExp(fromValue + "\\)", "gi")
		Tag = Tag.replaceAll(regExp, toValue + ")");
	}

	if(InStrRev(Tag, fromValue, -1, 1) == Tag.length - fromValue.length + 1){
		regExp = new RegExp(" " + fromValue, "gi");
		Tag = Tag.replaceAll(regExp, " " + toValue);

		regExp = new RegExp("\\(" + fromValue, "gi");
		Tag = Tag.replaceAll(regExp, "(" + toValue );
	}

 	regExp = new RegExp(" " + fromValue + " ", "gi");
	Tag = Tag.replaceAll(regExp, " " + toValue + " ");

	regExp = new RegExp("\\(" + fromValue + " ", "gi");
  	Tag = Tag.replaceAll(regExp, "(" + toValue + " ");
	
	regExp = new RegExp(" " + fromValue + "\\)", "gi");
  	Tag = Tag.replaceAll(regExp, " " + toValue + ")");

	regExp = new RegExp("\\(" + fromValue + "\\)", "gi");
  	Tag = Tag.replaceAll(regExp, "(" + toValue + ")");

	return Tag;
}

function InStrRev(srchStr, fndStr, start, cmp) {
	if (!fndStr || fndStr === null) {
		fndStr = "";
	}
	if (!cmp) {
		cmp = 0;
	}

	srchStr.toString();

	if (cmp == 1) {
		srchStr = srchStr.toLowerCase();
		fndStr = fndStr.toLowerCase();
	}
	if (!start || !IsNumeric(start)) {
		start = -1;
	}
	if (start > -1) {
		srchStr = srchStr.substr(0, start);
	}
	var loc;
	if (fndStr === "") {
		loc = srchStr.length;
	} else {
		loc = srchStr.lastIndexOf(fndStr) + 1;
	}
	return loc;
}

function IsNumeric(sValue) {
	return!isNaN(sValue);
}
function init(params) {
	var strHTML;
	var strTrackNumber, strArtist, strTitle, strGenre, strAlbum, strAlbumArtist

	this.title = params.title;
	trackList = params.tracks

	if(trackList.length == 0){
		messageDlg("Select tracks to be updated", 'Error', [btnOK]);
		return;
	};

	// Create the window to be shown
	var UI = getAllUIElements();
  
	//create header
	strHTML = "    <H1>" + _("Character Changes:") + "</H1>" +"\r\n";

	//create table
	strHTML += "    <table>\r\n";
	strHTML += "      <tr>";
	strHTML += "        <th>Track#</th>";
	strHTML += "        <th>Title</th>";
	strHTML += "        <th>Artist</th>";
	strHTML += "        <th>Album</th>";
	strHTML += "        <th>Genre</th>";
	strHTML += "        <th>Album Artist</th>";
	strHTML += "      </tr>";

	//loop through each selected row
	trackList.forEach(function (itmRec) {
		let objTrack = {
			ID:"",
			trackNo:"",
			title:"",
			artist:"",
			album:"",
			albumArtist:"",
			genre:"",
			changed:""
		};
	
		objTrack.ID = itmRec.id;
		objTrack.trackNo = itmRec.trackNumber;
		objTrack.title = itmRec.title;
		objTrack.artist = itmRec.artist;
		objTrack.albumArtist = itmRec.albumArtist;
		objTrack.album = itmRec.album;
		objTrack.genre = itmRec.genre;
		objTrackList.push(objTrack);

		strHTML += "      <tr>";

		//fix trackNumber
		strTrackNumber = itmRec.trackNumber;

		if (strTrackNumber != 0){
			//strip letters from track number
			if (isNaN(strTrackNumber)){
				strTrackNumber = itmRec.trackNumber.replaceAll( /^\D+/g, '');
			};
		}else{
			strTrackNumber = "";
		};

		//pad zeros in front of the track number if less than 10.
		if( strTrackNumber != ""){
			if(strTrackNumber < 10 && strTrackNumber.length != 2){
				strTrackNumber = "0" + strTrackNumber;
			};
		};

		//fix each field
		strArtist = RemoveAccents(FixCommonWords(FixBrackets(ChangeCharacters(FixForwardSlash(objTrack.artist)))));
		strTitle = RemoveAccents(FixCommonWords(FixBrackets(ChangeCharacters(FixForwardSlash(objTrack.title)))));
		strGenre = FixWrongGenre(objTrack.genre);
		strAlbum = RemoveAccents(FixCommonWords(FixBrackets(ChangeCharacters(FixForwardSlash(objTrack.album)))));
		strAlbumArtist = RemoveAccents(FixCommonWords(FixBrackets(ChangeCharacters(FixForwardSlash(objTrack.albumArtist)))));

		//write out each field to the table
		strHTML += outField(strTrackNumber, objTrack.trackNo);
		strHTML += outField(strTitle, objTrack.title);
		strHTML += outField(strArtist, objTrack.artist);
		strHTML += outField(strAlbum, objTrack.album);
		strHTML += outField(strGenre, objTrack.genre);
		strHTML += outField(strAlbumArtist, objTrack.albumArtist);

 		//update each object field if changed
		if(strTrackNumber != objTrack.trackNo){
			objTrack.trackNo = strTrackNumber;
			objTrack.changed = "1";
		  };
  
		if(strArtist != "" && strArtist != objTrack.artist){
			objTrack.artist = strArtist;
			objTrack.changed = "1";
		};
		if(strAlbumArtist != "" && strAlbumArtist != objTrack.albumArtist){
			objTrack.albumArtist = strAlbumArtist;
			objTrack.changed = "1";
		};
		if(strTitle != objTrack.title){
			objTrack.title = strTitle;
			objTrack.changed = "1";
		};
		if(strAlbum != "" && strAlbum != objTrack.album){
			objTrack.album = strAlbum;
			objTrack.changed = "1";
		};
		if(strGenre != objTrack.genre){
			objTrack.genre = strGenre;
			objTrack.changed = "1";
		};
		strHTML += "      </tr>";
	});

	//write out the updated table
	strHTML += "    </table>\r\n";
	divFileContent.innerHTML = strHTML

	UI.btnOK.controlClass.localListen(UI.btnOK, 'click', function () {
		btnOkClick();
	});

}
