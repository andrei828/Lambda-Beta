window.onload = function()
{
	document.getElementById("log_button").innerHTML = localStorage.name;
	runTest()
	LoadEventData()
	Update_Block()
	Display_Todos()
	var todo_input = document.getElementById("type_todo_item")
	todo_input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        Add_Item_Todo()
    }
});
}

serverUrl = "http://127.0.0.1:8080"

tokenData = {
	token: localStorage.token
}

var evt;

function runTest()
{
	
	notesResponse = getRequest(serverUrl + "/api/note/list",  tokenData)
	eventRespone  = getRequest(serverUrl + "/api/event/list", tokenData)
	todoResponse  = getRequest(serverUrl + "/api/todo/list",  tokenData)
	todoItemResponse = getRequest(serverUrl + "/api/todoitem/list", tokenData)

	notes  = notesResponse.responseJSON
	events = eventRespone.responseJSON
	todos  = todoResponse.responseJSON
	items  = todoItemResponse.responseJSON

	evt = events

	console.log(notes)
	console.log(events)
	console.log(todos)
	console.log(items)

	GetNoteList(notes)
	/*
	for (room of rooms) {

		newMessage = {
			token: tokenString,
			content: "My message test"
		}
		console.log(newMessage)
		postRequest(serverUrl + "/api/room/" + room.id + "/messages/add", newMessage)

		messages = getRequest(serverUrl + "/api/room/" + room.id + "/messages/list", tokenData)
		console.log(messages.responseJSON)
	}*/
}

function getRequest(url, data)
{
	return $.ajax({
		url: url,
		type: "GET",
		data: data,
		dataType: 'json',
		crossDomain: true,
		async: false,
		success: function(res) {
			return res
		}
	});
}

function postRequest(url, data)
{
	return $.ajax({
		url: url,
		type: "POST",
		data: data,
		crossDomain: true,
		async: false,
		success: function(res) {
			return res
		}
	});
}

function Username_Button()
{
	// save everything
}

function GetNoteList(note_list)
{
	// get from database
	for (note of note_list)
	{
		Create_Note(note.name, note.tag)
	}
}

function GetTodoList(todo_list)
{
	// get from database
}

function GetTodoItemList(todo_item_list)
{
	// get from database
}



var Months = [ ["January", 31], ["February", 29], ["March", 31],
				 ["April", 30], ["May", 31], ["June", 30], 
		  		 ["July", 31], ["August", 31], ["September", 30], 
		  		 ["October", 31], ["November", 30], ["December", 31] ];

var Month_Of_Year = { "January": 1, "February": 2, "March": 3, 
					  "April": 4, "May": 5, "June": 6, 
					  "July": 7, "August": 8, "September": 9, 
					  "October": 10, "November": 11, "December": 12}

function Event() {
	this.title;
	this.hour;
	this.minute;
	this.place;
	this.date;
	this.tag;
}

var copy_replace;
var copy_initial_children;

var EventList = [];

function LoadEventData()
{
	//  § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § 
	var date = new Date();
	var string_date = date.getDate() + " " + String(parseInt(date.getMonth())+1) + " " + date.getFullYear();
	
	// dummy data 
	var ev_1 = {
		title: "Meeting at lorem ipsum",
		tag: "event_blue",
		day: "11",
		month: "3",
		year: "2018"
	}

	var ev_2 = {
		title: "Lunch afer sample text",
		tag: "event_yellow",
		day: "11",
		month: "3",
		year: "2018"
	}

	var ev_3 = {
		title: "Meeting  tsgewg ir text data",
		tag: "event_red",
		day: "11",
		month: "3",
		year: "2018"
	}

	var ev_4 = {
		title: "Lunch afer wertg",
		tag: "event_yellow",
		day: "19",
		month: "8",
		year: "2018"
	}

	var ev_5 = {
		title: "Meeting sample text universal",
		tag: "event_red",
		day: "20",
		month: "8",
		year: "2018"
	}

	var ev_6 = {
		title: "Lunch afer lorem",
		tag: "event_yellow",
		date: "20 9 2018"
	}

	var ev_7 = {
		title: "Meeting ana are mere",
		tag: "event_blue",
		date: "20 9 2018"
	}
	
	//EventList.push(ev_1);
	//EventList.push(ev_2);
	//EventList.push(ev_3);
	/*EventList.push(ev_4);
	EventList.push(ev_5);
	EventList.push(ev_6);
	EventList.push(ev_7);*/
	// end dummy data

	for (Event of evt)
	{
		EventList.push(Event);
	}
}

function GetEventList()
{
	return EventList;
}

function Create_Block()
{
	var block = document.createElement("div");
	block.id = "event_list";
	block.classList.add("list_event_block");
	
	var div_children = document.createElement("div");
	div_children.id = "children";
// Add title ****************************
	var title = document.createElement("div");
	title.id = "event_title_div";
	title.classList.add("mdl-layout__header-row");
	
	var text_span = document.createElement("span");
	text_span.classList.add("mdl-layout-title");
	text_span.id = "event_list_title";
	text_span.innerHTML = "Events";
	
	title.appendChild(text_span);
	div_children.appendChild(title);
// end title *****************************
	
// Add the + button **************************
	var add_button = document.createElement("button");
	add_button.classList.add("mdl-button");
	add_button.classList.add("mdl-js-button"); 
	add_button.classList.add("mdl-button--fab");
	add_button.classList.add("mdl-js-ripple-effect");
	add_button.classList.add("mdl-button--colored");
	add_button.id = "add_event";
	add_button.onclick = Plus_Add_Event_Button();
	
	var i = document.createElement("i");
	i.classList.add("material-icons");
	i.innerHTML = "add";
	
	add_button.appendChild(i);
	div_children.appendChild(add_button);
// end + button ********************************
	
// Add Today label ****************************
	var title_today = document.createElement("div");
	title_today.id = "event_date";
	title_today.innerHTML = GetDateToday();
	
	div_children.appendChild(title_today);
// end add today label **************************
	
// Add events for today*******************************
	var events_today = Add_Event_Today(GetEventList());
	
	div_children.appendChild(events_today);
// end add events *******************************
	
// Add break **********************
	br = document.createElement("br");
	
	div_children.appendChild(br);
// end add break **************************
	
// Add upcoming label ***************************
	var upcoming_label = document.createElement("div");
	upcoming_label.id = "up_ev_title";
	upcoming_label.innerHTML = "Upcoming Events";
	
	div_children.appendChild(upcoming_label);
// end add upcoming label ***********************
	
// Add upcoming dates ***************************
	var event_list = GetEventList();
	var date_list = new Set();
	//var date = new Date();
	//var string_date = date.getDate() + " " + String(parseInt(date.getMonth())+1) + " " + date.getFullYear();
	
	var current_day = date.getDate()
	var current_month = date.getMonth()
	var current_year = date.getFullYear()

	for (event of event_list)
	{
		if (event.day === current_day && event.month === current_month && event.year === current_year)
			continue;
		else {
			var lst = {
				day: event.day,
				month: event.month,
				year: event.year
			}
			date_list.add(lst);
		}
	}
	for (date of date_list)
	{
		ok = true
		var d = new Date();

		if (parseInt(date.year) < d.getFullYear()) { ok = false }
		else if (parseInt(date.year) == d.getFullYear())
			if (parseInt(date.month) < d.getMonth()) { ok = false }
			else if (parseInt(date.month) == d.getMonth())
				if (parseInt(date.day) < d.getDay()) { ok = false }

		if (ok == true)
		{
			var event_up = Add_Upcoming_Events(date)
			div_children.appendChild(event_up)
		}
	}
// end add upcoming dates ***********************
	block.appendChild(div_children);
	return block;
}



function Create_Block_Full()
{
	document.body.appendChild(Create_Block());
}

function X_Cancel_Event_Button()
{
	var block = document.getElementById("event_list");
	var replace = document.getElementsByClassName("replace")[0];
	//repl.style.display = "inline";
	block.removeChild(copy_replace);
	block.appendChild(copy_initial_children);
}

function Add_event_database()
{
	var add_event_data = {
		token: tokenData.token,
		title: document.getElementById("new_event_name").value,
		place: document.getElementById("new_event_place").value,
		hour: document.getElementById("event_hour_add").value,
		tag: "event_" + document.getElementById("event_tag_add").value,
		day: document.getElementById("event_day_add").value,
		month: String(parseInt(document.getElementById("event_month_add").selectedIndex)+1),
		year: document.getElementById("event_year_add").value
	}
	//add event to database
	//  § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § 
	ok = true
	var d = new Date();
	if (add_event_data.title == null || add_event_data.title == undefined) { ok = false }

	if (parseInt(add_event_data.year) < d.getFullYear()) { ok = false }
	else if (parseInt(add_event_data.year) == d.getFullYear())
		if (parseInt(add_event_data.month) < d.getMonth() + 1) { ok = false }
		else if (parseInt(add_event_data.month) == d.getMonth() + 1)
			if (parseInt(add_event_data.day) < d.getDate()) { ok = false }

	if (ok == true)
	{
		add_event = getRequest(serverUrl + "/api/event/add",  add_event_data)
		EventList = []
		eventRespone  = getRequest(serverUrl + "/api/event/list", tokenData)
		events = eventRespone.responseJSON
		evt = events
		for (Event of evt)
		{
			EventList.push(Event);
		}

		Clear_Event_Data()
		Update_Block()
		if (document.getElementById("event_change_icon").innerHTML == "add")
		{
			document.getElementById("event_change_icon").innerHTML = "clear"
			document.getElementById("add_event_form").style.display = "block"
			document.getElementById("container").style.display = "none"
		}
		else if (document.getElementById("event_change_icon").innerHTML == "clear") 
		{
			document.getElementById("event_change_icon").innerHTML = "add"
			document.getElementById("container").style.display = "block"
			document.getElementById("add_event_form").style.display = "none"
		}
	}
	else
	{
		if (document.getElementById("event_change_icon").innerHTML == "add")
		{
			document.getElementById("event_change_icon").innerHTML = "clear"
			document.getElementById("add_event_form").style.display = "block"
			document.getElementById("container").style.display = "none"
		}
		else if (document.getElementById("event_change_icon").innerHTML == "clear") 
		{
			document.getElementById("event_change_icon").innerHTML = "add"
			document.getElementById("container").style.display = "block"
			document.getElementById("add_event_form").style.display = "none"
		}
	}
}



function GetDateToday()
{	
	var date = new Date();
	return "Today, " + date.getDate() + ' ' + Months[date.getMonth()][0];
}


function Add_Event_Today_Tag(tag_color)
{
	var tag = document.createElement("div");
	tag.id = "event_color";
	tag.classList.add(tag_color);

	return tag;
}


function Add_Event_Today_Title(content)
{
	var title = document.createElement("div");
	title.id = "event_title";
	title.innerHTML = content;

	title.onclick = function() {
		var event_title = content
		var d = new Date()

		if (title.parentNode.id != "event1")
		{
			var date_array = title.parentNode.parentNode.children[0].innerHTML.split(' ')

			if (date_array.length == 2)
			{
				
				x = d.getFullYear().toString()
				date_array.push(x)
			}	
			else
			{
				date_array[2] = date_array[3].split('(')[1].split(')')[0]
				date_array.pop()
				date_array.pop()
			}
		}
		else
		{
			var date_array = document.getElementById("event_date").innerHTML.split(' ')
			console.log(date_array)
			date_array[0] = date_array[1]
			date_array[1] = date_array[2]
			date_array[2] = d.getFullYear().toString()
		}

		document.getElementById("container").style.display = "none"
		document.getElementById("event_info").style.display = "block"
		document.getElementById("event_list_title").value = "About event"
		document.getElementById("add_event").children[0].innerHTML = "backspace"
		document.getElementById("event_info_title").innerHTML = content
		document.getElementById("event_info_date").innerHTML = null

		for (var i = 0; i < 3; i++)
		document.getElementById("event_info_date").innerHTML += date_array[i] + " "

		ok = false
		for (event of EventList)
		{
			if (event.title == content && event.day == date_array[0] && event.month == Month_Of_Year[date_array[1]] && event.year == date_array[2])
			{	
				if (event.place == undefined || event.place == "")
					document.getElementById("event_info_place").innerHTML = "No place added"
				else
					document.getElementById("event_info_place").innerHTML = event.place
				break;
			}
		}
	}

	return title;
}

function Add_Event_Today(event_list)
{
	//  § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § 

	var event = document.createElement("div");
	event.id = "event1";
	var date = new Date();
	var string_date = date.getDate() + " " + String(parseInt(date.getMonth())) + " " + date.getFullYear();
	
	var ok = false;
	for (evnt of event_list)
	{
		if (evnt.day == date.getDate() && evnt.month == String(parseInt(date.getMonth())+1) && evnt.year == date.getFullYear()) {

			ok = true;
			var tag_div = Add_Event_Today_Tag(evnt.tag);
			var title_div = Add_Event_Today_Title(evnt.title);
			var br = document.createElement("br");
			event.appendChild(tag_div);
			event.appendChild(title_div);
			event.appendChild(br);
		}
	}

	if (ok === false)
	{
		var no_events = Add_Event_Today_Title("No events for today");
		no_events.style.paddingLeft = "10%";
		var br = document.createElement("br");
		event.appendChild(no_events);
		event.appendChild(br);
	}
	return event;
}

function Add_Event()
{
	var event = document.createElement("div");
	event.id = "event";
	
// Add tag **************************
	var tag = document.createElement("div");
	tag.id = "event_color";
	tag.classList.add("event_blue");
	event.appendChild(tag);
// end add tag ***********************

// Add tag **************************
	var title = document.createElement("div");
	title.id = "event_title";
	title.innerHTML = "Meeting at lorem upsum";
	
	event.appendChild(title);
// end add tag **********************	

	return event;
}

function Add_Upcoming_Events(date) 
{
	//  § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § 
	var event_upcom = document.createElement("div");
	event_upcom.id = "event_up";
	
	var event_up_date = document.createElement("div");
	event_up_date.id = "event_up_date";
	
	var event_list_day = document.createElement("div")
	event_list_day.id = "bubble_event"

	var date_ob = new Date();
	var current_year = date_ob.getFullYear();
	console.log(date.day)
	event_up_date.innerHTML = date.day + " " + Months[parseInt(date.month)-1][0];

	if (current_year != date.year)
		event_up_date.innerHTML += " <i> (" + date.year + ") </i>";

	event_upcom.appendChild(event_up_date);
	
	var event_list = GetEventList();
	for (event of event_list)
	{
		if (date.day == event.day && date.month == event.month && date.year == event.year)
		{
			var tag_div = Add_Event_Today_Tag(event.tag);
			var title_div = Add_Event_Today_Title(event.title);
			var br = document.createElement("br");
			event_list_day.appendChild(tag_div);
			event_list_day.appendChild(title_div);
			event_list_day.appendChild(br);
		}
	}
	
	event_upcom.appendChild(event_list_day)

	return event_upcom;
}

function Plus_Add_Event_Button(btn)
{
	if (btn.children[0].innerHTML == "add")
	{
		btn.children[0].innerHTML = "clear"
		document.getElementById("add_event_form").style.display = "block"
		document.getElementById("container").style.display = "none"

	}
	else if (btn.children[0].innerHTML == "clear") 
	{
		Clear_Event_Data()
		Update_Block()
		btn.children[0].innerHTML = "add"
		document.getElementById("container").style.display = "block"
		document.getElementById("add_event_form").style.display = "none"
	}
	else if (btn.children[0].innerHTML == "backspace")
	{
		btn.children[0].innerHTML = "add"
		document.getElementById("event_info").style.display = "none"
		document.getElementById("container").style.display = "block"
	}

	

	/*var block = document.getElementById("event_list");
	var replace = document.getElementsByClassName("replace")[0];
	
	block_initial_children = document.getElementById("children");
	
	copy_replace = replace.cloneNode(true);
	copy_replace.style.display = "block";
	copy_initial_children = block_initial_children.cloneNode(true);
	
	block.removeChild(block_initial_children);
	
	block.appendChild(copy_replace);

	*/
}

function Clear_Event_Data()
{
	var myNode = document.getElementById("event");
	while (myNode.firstChild) 
    	myNode.removeChild(myNode.firstChild);
	var myNode = document.getElementById("upcoming_events");
	while (myNode.firstChild) 
    	myNode.removeChild(myNode.firstChild);
}

function Update_Block()
{	

// Add Today label ****************************
	var title_today = document.getElementById("event_date");
	title_today.innerHTML = GetDateToday();

// end add today label **************************
	
// Add events for today*******************************
	var event_list_today = document.getElementById("event");
	var events_today = Add_Event_Today(GetEventList());
	
	event_list_today.appendChild(events_today);
// end add events *******************************
	
// Add upcoming dates ***************************
	var upcoming_events = document.getElementById("upcoming_events");
	var event_list = GetEventList();
	var date_list = []
	var d = new Date();
	//  § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § § 

	var current_day = d.getDate()
	var current_month = String(parseInt(d.getMonth())+1)
	var current_year = d.getFullYear()

	var ok = false
	var i = 0
	for (event of event_list)
	{
		if (event.day == current_day && event.month == current_month && event.year == current_year)
			continue;
		else {

			var lst = {
				day: event.day,
				month: event.month,
				year: event.year
			}

			if (i == 0 || JSON.stringify(date_list[i-1]) != JSON.stringify(lst))
			{
				date_list.push(lst)
				i++
			}
			
		}
	}
	
	for (date of date_list)
	{
		ok = true
		

		if (parseInt(date.year) < d.getFullYear()) { ok = false }
		else if (parseInt(date.year) == d.getFullYear())
			if (parseInt(date.month) < d.getMonth() + 1) { ok = false }
			else if (parseInt(date.month) == d.getMonth() + 1)
				if (parseInt(date.day) < d.getDate()) { ok = false }

		if (ok == true)
		{
			console.log(date.day + "    " + date.month + "    " + date.year)
			var event_up = Add_Upcoming_Events(date); 
			upcoming_events.appendChild(event_up);
		}

	}
// end add upcoming dates ***********************
}

function Remove_Event_Database()
{
	var title_html = document.getElementById("event_info_title").innerHTML
	var date_html  = document.getElementById("event_info_date").innerHTML.split(' ')
	var place_html = document.getElementById("event_info_place").innerHTML

	if (place_html == "No place added")
		place_html = ""

	console.log(document.getElementById("event_info_date").innerHTML)
	rmv_event_data = {
		token: tokenData.token,
		title: title_html,
		day: date_html[0],
		month: Month_Of_Year[date_html[1]],
		year: date_html[2]
	}

	remove_event = getRequest(serverUrl + "/api/event/remove",  rmv_event_data)
	EventList = []
	eventRespone  = getRequest(serverUrl + "/api/event/list", tokenData)
	events = eventRespone.responseJSON
	evt = events
	for (Event of evt)
	{
		EventList.push(Event);
	}

	Clear_Event_Data()
	Update_Block()
	Plus_Add_Event_Button(document.getElementById("add_event"))
}



var current_note;

function Plus_Add_Note_Button()
{
	
	if (document.getElementById("note_change_icon").innerHTML == "create")
	{
		document.getElementById("note_list_title").value = "Untitled"
		document.getElementById("note_list_title").readOnly = false;
		document.getElementById("note_list_title").onfocus = function() {
		if (document.getElementById("note_list_title").value == "Untitled")
			document.getElementById("note_list_title").value = null
		}
		var center = document.createElement("center");
		center.id = "hide_center_id"
		var note = document.createElement("div")
		note.id = "biu_div"
		document.getElementById("note_list").style.display = "none";
		boldButton = document.createElement('button')
		boldButton.classList.add("mdl-button")
		boldButton.classList.add("mdl-js-button")
		boldButton.classList.add("mdl-button--raised")
		boldButton.classList.add("lmb-button")
		boldButton.style.backgroundColor = "white";
		boldButton.onclick = function() {
			document.execCommand('bold',false,null)
		}
		boldButton.innerHTML = "<strong>B</strong>"
		note.appendChild(boldButton)		
		italicButton = document.createElement('button')
		italicButton.classList.add('mdl-button')
		italicButton.classList.add('mdl-js-button')
		italicButton.classList.add('mdl-button--raised')
		italicButton.classList.add('lmd-button')
		italicButton.style.backgroundColor = "white";
		italicButton.onclick = function () {
		  document.execCommand('italic', false, null);
		}
		italicButton.innerHTML = "<italic>I</italic>"
		note.appendChild(italicButton)	

 		underlineButton = document.createElement('button')
 		underlineButton.classList.add('mdl-button')
 		underlineButton.classList.add('mdl-js-button')
 		underlineButton.classList.add('mdl-button--raised')
 		underlineButton.classList.add('lmd-button')
 		underlineButton.style.backgroundColor = "white";
 		underlineButton.onclick = function () {
 		  document.execCommand('underline', false, null);
 		}
 		underlineButton.innerHTML = "<u>U</u>"
  		note.appendChild(underlineButton)
		center.appendChild(note)
		document.getElementById("note").appendChild(center)
		
		noteContent = document.createElement('div')
		noteContent.id = "textarea_div"
		noteContent.classList.add('mdl-textfield__input')
		noteContent.classList.add('note_content')
		noteContent.contentEditable = 'true'
		noteContent.style.backgroundColor = "rgb(202, 247, 187)";
		noteContent.type = 'text'
		noteContent.rows = '3'
		noteContent.onfocus = function() {
			if (noteContent.innerHTML == "Type your note here...")
			noteContent.innerHTML = null
		}
		noteContent.innerHTML = "Type your note here..."
		document.getElementById("note").appendChild(noteContent)
		
		document.getElementById("note_change_icon").innerHTML = "archive"
	}
	else if(document.getElementById("note_change_icon").innerHTML == "archive")
	{
		var title = document.getElementById("note_list_title").value
		var content = document.getElementById("textarea_div").innerHTML
		document.getElementById("note_list_title").value = "Notes"
		document.getElementById("note_list_title").readOnly = true;
		document.getElementById("note_list").style.display = "block";
		document.getElementById("note_list").scrollTop = 1;
		var remove = document.getElementById("hide_center_id")
		var remove_2 = document.getElementById("textarea_div")
		document.getElementById("note").removeChild(remove)
		document.getElementById("note").removeChild(remove_2)
		document.getElementById("note_change_icon").innerHTML = "create"
		Create_Note(title, content)

		// update database
		add_data = {
			token: tokenData.token,
			title: title,
			content: content
		}

		add_note = getRequest(serverUrl + "/api/note/add",  add_data)
	}
	else if (document.getElementById("note_change_icon").innerHTML == "check")
	{ 
		var title = document.getElementById("note_list_title").value
		var content = document.getElementById("textarea_div").innerHTML
		document.getElementById("note_list_title").value = "Notes"
		document.getElementById("note_list_title").readOnly = true;
		
		var i1 = document.getElementById("hide_center_id")
		var i2 = document.getElementById("textarea_div")
		document.getElementById("note").removeChild(i1)
		document.getElementById("note").removeChild(i2)
		var note = document.getElementById("note_list")
		note.style.display = "block"
		note.scrollTop = 1;
		document.getElementById("note_change_icon").innerHTML = "create"
		Create_Note(title, content)

		// update database
		add_data = {
			token: tokenData.token,
			title: title,
			content: content
		}

		add_note = getRequest(serverUrl + "/api/note/add",  add_data)
	}
}

function Open_Note_Preview(div_summary)
{
	var title = div_summary.children[0].innerHTML
	var content = div_summary.children[1].innerHTML
	div_summary.parentNode.remove()

	document.getElementById("note_list_title").value = title
	document.getElementById("note_list_title").readOnly = false;
	document.getElementById("note_list_title").onfocus = function() {
		if (document.getElementById("note_list_title") == "Untitled")
			document.getElementById("note_list_title").value = null
	}
	var center = document.createElement("center");
	center.id = "hide_center_id"
	var note = document.createElement("div")
	note.id = "biu_div"
	document.getElementById("note_list").style.display = "none";
	boldButton = document.createElement('button')
	boldButton.classList.add("mdl-button")
	boldButton.classList.add("mdl-js-button")
	boldButton.classList.add("mdl-button--raised")
	boldButton.classList.add("lmb-button")
	boldButton.style.backgroundColor = "white";
	boldButton.onclick = function() {
		document.execCommand('bold',false,null)
	}
	boldButton.innerHTML = "<strong>B</strong>"
	note.appendChild(boldButton)		
	italicButton = document.createElement('button')
	italicButton.classList.add('mdl-button')
	italicButton.classList.add('mdl-js-button')
	italicButton.classList.add('mdl-button--raised')
	italicButton.classList.add('lmd-button')
	italicButton.style.backgroundColor = "white";
	italicButton.onclick = function () {
	  document.execCommand('italic', false, null);
	}
	italicButton.innerHTML = "<italic>I</italic>"
	note.appendChild(italicButton)	
 	underlineButton = document.createElement('button')
 	underlineButton.classList.add('mdl-button')
 	underlineButton.classList.add('mdl-js-button')
 	underlineButton.classList.add('mdl-button--raised')
 	underlineButton.classList.add('lmd-button')
 	underlineButton.style.backgroundColor = "white";
 	underlineButton.onclick = function () {
 	  document.execCommand('underline', false, null);
 	}
 	underlineButton.innerHTML = "<u>U</u>"
  	note.appendChild(underlineButton)
	center.appendChild(note)
	document.getElementById("note").appendChild(center)
	
	noteContent = document.createElement('div')
	noteContent.id = "textarea_div"
	noteContent.classList.add('mdl-textfield__input')
	noteContent.classList.add('note_content')
	noteContent.contentEditable = 'true'
	noteContent.style.backgroundColor = "rgb(202, 247, 187)";
	noteContent.type = 'text'
	noteContent.rows = '3'
	noteContent.onfocus = function() {
		if (noteContent.innerHTML == "Type your note here...")
		noteContent.innerHTML = null
	}
	noteContent.innerHTML = content
	document.getElementById("note").appendChild(noteContent)
	
	document.getElementById("note_change_icon").innerHTML = "check"

	// update database
	remove_data = {
		token: tokenData.token,
		title: title,
		content, content
	}
	console.log(remove_data)
	remove_note = getRequest(serverUrl + "/api/note/remove",  remove_data)
}



function Create_Note(title, content)
{
	if (title == "Untitled" && content == "Type your note here...") return
	if (title != "Untitled" && content == "Type your note here...") content = null
	Note = {}
	Note.name = title
	Note.content = content
	Note.tag = "blue"

	var container = document.createElement("div")

	var note_summary = document.createElement("div")
	note_summary.classList.add("note_summary")

	var note_summary_title = document.createElement("div")
	note_summary_title.innerHTML = title
	note_summary_title.classList.add("note_summary_title")
	container.appendChild(note_summary_title)
	
	var note_summary_preview = document.createElement("div")
	note_summary_preview.innerHTML = content
	note_summary_preview.classList.add("note_summary_preview")
	container.appendChild(note_summary_preview)

	note_summary.appendChild(container)

	var note_summary_delete = document.createElement("div")
	note_summary_delete.classList.add("note_summary_delete")

	var btn1 = document.createElement("button")
	btn1.classList.add("mdc-button")
	btn1.classList.add("note_summary_delete_button")

	var i1 = document.createElement("i")
	i1.classList.add("material-icons")
	i1.classList.add("mdc-button__icon")
	i1.innerHTML = "clear"

	btn1.appendChild(i1)
	note_summary_delete.appendChild(btn1)
	note_summary.appendChild(note_summary_delete)

	note_summary.children[0].setAttribute("onclick", "Open_Note_Preview(this)")
	
	note_summary.children[1].children[0].setAttribute("onclick", "Delete_Note(this)")

	note_summary.onmouseover = function() {
		note_summary.children[1].children[0].style.display = "block"
	}

	note_summary.onmouseleave = function() {
		note_summary.children[1].children[0].style.display = "none"
	}

	document.getElementById("note_list").insertBefore(note_summary, document.getElementById("note_list").firstChild)
}

function Delete_Note(Note)
{
	//console.log(Note)
	Note.parentNode.parentNode.style.animationName = "disappear_remove"
	Note.parentNode.parentNode.style.animationDuration = "0.7s"

	rmv_note_data = {
		token: tokenData.token,
		title: Note.parentNode.parentNode.children[0].children[0].innerHTML,
		content: Note.parentNode.parentNode.children[0].children[1].innerHTML
	}

	setTimeout(function() { Note.parentNode.parentNode.remove() }, 500);

	getRequest(serverUrl + "/api/note/remove",  rmv_note_data)
}














function Display_Todos()
{
	Hide_Completed_Tasks()
	for (Task of todos)
		if (Task.checked == "false")
			Create_Item_Todo(Task.content)
		else
			Create_Item_Todo_Completed(Task.content)
}

function Hide_Completed_Tasks()
{
	document.getElementById("completed_tasks").style.display = "none"
}

function Todo_Item_MouseOver(item)
{
	item.children[0].style.display = "block"
	item.children[1].style.display = "block"
}

function Todo_Item_MouseLeave(item)
{
	item.children[0].style.display = "none"
	item.children[1].style.display = "none"
}

function Add_Item_Todo()
{
	var x = document.getElementById("type_todo_item").value
	if (x != "")
	{
		Create_Item_Todo(x)
		document.getElementById("type_todo_item").value = null
		
		add_todo_data = {
			token: tokenData.token,
			content: x,
			checked: "false"
		
		}
		getRequest(serverUrl + "/api/todo/add",  add_todo_data)
	}
}

function Create_Item_Todo(content)
{	
	var new_item = document.createElement("div")
	new_item.id = "todo_item"

	var check_div = document.createElement("div")
	check_div.id = "todo_item_complete"
	

	var btn1 = document.createElement("button")
	btn1.classList.add("mdc-button")
	btn1.id = "todo_item_actions"

	var i1 = document.createElement("i")
	i1.classList.add("material-icons")
	i1.classList.add("mdc-button__icon")
	i1.innerHTML = "check"

	btn1.appendChild(i1)
	check_div.appendChild(btn1)


	var rmv_div = document.createElement("div")
	rmv_div.id = "todo_item_remove"
	

	var btn2 = document.createElement("button")
	btn2.classList.add("mdc-button")
	btn2.id = "todo_item_actions"

	var i2 = document.createElement("i")
	i2.classList.add("material-icons")
	i2.classList.add("mdc-button__icon")
	i2.innerHTML = "clear"

	btn2.appendChild(i2)
	rmv_div.appendChild(btn2)

	var content_div = document.createElement("div")
	content_div.id = "todo_item_content"
	content_div. innerHTML = content

	new_item.appendChild(check_div)
	new_item.appendChild(rmv_div)
	new_item.appendChild(content_div)

	new_item.onmouseover = function() {
		new_item.children[0].style.display = "block"
		new_item.children[1].style.display = "block"
	}

	new_item.onmouseleave = function() {
		new_item.children[0].style.display = "none"
		new_item.children[1].style.display = "none"
	}

	document.getElementById("todo_list").insertBefore(new_item,  document.getElementById("todo_list").firstChild)
		
	check_div.onclick = function() {
		check_div.parentNode.style.animationName = "disappear_check"
		check_div.parentNode.style.animationDuration = "0.7s"

		setTimeout(function() {check_div.parentNode.parentNode.removeChild(check_div.parentNode)}, 500);
	
		// check to do list task
		rmv_todo_data = {
			token: tokenData.token,
			content: content,
			checked: "false"
		}
		getRequest(serverUrl + "/api/todo/remove",  rmv_todo_data)
		Create_Item_Todo_Completed(rmv_todo_data.content)
		
		rmv_todo_data.checked = "true"
		getRequest(serverUrl + "/api/todo/add", rmv_todo_data)
		
	}

	rmv_div.onclick = function() {
		rmv_div.parentNode.style.animationName = "disappear_remove"
		rmv_div.parentNode.style.animationDuration = "0.7s"

		setTimeout(function() {rmv_div.parentNode.parentNode.removeChild(rmv_div.parentNode)}, 500);
		
		// remove to do list task
		rmv_todo_data = {
			token: tokenData.token,
			content: content,
			checked: "false"
		}
		getRequest(serverUrl + "/api/todo/remove",  rmv_todo_data)
	}
}

function Create_Item_Todo_Completed(content)
{
	var new_item = document.createElement("div")
	new_item.id = "todo_item"

	var rmv_div = document.createElement("div")
	rmv_div.id = "todo_item_remove_completed"
	

	var btn2 = document.createElement("button")
	btn2.classList.add("mdc-button")
	btn2.id = "todo_item_actions"

	var i2 = document.createElement("i")
	i2.classList.add("material-icons")
	i2.classList.add("mdc-button__icon")
	i2.innerHTML = "clear"

	btn2.appendChild(i2)
	rmv_div.appendChild(btn2)

	var content_div = document.createElement("div")
	content_div.id = "todo_item_content"
	content_div. innerHTML = content

	new_item.appendChild(rmv_div)
	new_item.appendChild(content_div)

	document.getElementById("completed_tasks").insertBefore(new_item,  document.getElementById("completed_tasks").firstChild)

	rmv_div.onclick = function() {
		rmv_div.parentNode.style.animationName = "disappear_remove"
		rmv_div.parentNode.style.animationDuration = "0.7s"

		setTimeout(function() {rmv_div.parentNode.parentNode.removeChild(rmv_div.parentNode)}, 500);
		
		// remove to do list task
		rmv_todo_data = {
			token: tokenData.token,
			content: content,
			checked: "true"
		}
		getRequest(serverUrl + "/api/todo/remove",  rmv_todo_data)
	}
}

function Show_Completed_Tasks()
{
	if (document.getElementById("todo_list_title").value == "To do list")
	{
		todos = getRequest(serverUrl + "/api/todo/list",  tokenData).responseJSON
		document.getElementById("todo_list_title").value = "Completed tasks"
		document.getElementById("todo_container").style.display = "none"
		document.getElementById("completed_tasks").style.display = "block"
		document.getElementById("todo_change_icon").innerHTML = "backspace"
	}
	else 
	{
		document.getElementById("todo_list_title").value = "To do list"
		document.getElementById("todo_container").style.display = "block"
		document.getElementById("completed_tasks").style.display = "none"
		document.getElementById("todo_change_icon").innerHTML = "menu"
	}
}



// TO DELETE AFTER DB SYNC **********************************************************************************************************************
function remove_item_check(element)
{
	element.parentNode.style.animationName = "disappear_check"
	element.parentNode.style.animationDuration = "0.7s"

	setTimeout(function() {element.parentNode.parentNode.removeChild(element.parentNode)}, 500);
}

function remove_item_remove(element)
{
	element.parentNode.style.animationName = "disappear_remove"
	element.parentNode.style.animationDuration = "0.7s"

	setTimeout(function() {element.parentNode.parentNode.removeChild(element.parentNode)}, 500);
}
// TO DELETE AFTER DB SYNC **********************************************************************************************************************


















