// create variables
var $noteTitle = $("#noteTitle");
var $noteText = $("#noteText");
var $saveBtn = $("#submit-btn");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-group");

// save inputs to the db and update the page
var handleNoteSave = function () {
  var newNote = {
    title: $noteTitle.val(),
    body: $noteText.val()
  };

  // ajax function to post the new note
  $.ajax({
    url: "/api/notes",
    data: newNote,
    method: "POST"
  }).then(function (data) {
    location.reload();

    console.log(data)
  });
};

// target the button to save the note
$saveBtn.on("click", handleNoteSave);

// delete the note on click
var handleNoteDelete = function (event) {
  event.preventDefault();

  console.log("delete")

  var note = $(this)
    .parents(".list-group-item")
    .data();

  // ajax function to delete the note
  $.ajax({
    url: "/api/notes/" + note.id,
    method: "DELETE"
  }).then(function () {
    location.reload();
  });
};

// target the button to delete the note
$noteList.on("click", ".delete-note", handleNoteDelete);

// render the list of notes
var renderNoteList = function (notes) {
  $noteList.empty();

  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];

    var $li = $("<li class='list-group-item'>").data(note);
    var $titleDiv = $("<div>");
    var $titleSpan = $("<span class='font-weight-bold'>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );

    var $noteP = $("<p class='mt-2'>").text(note.body);

    $titleDiv.append($titleSpan, $delBtn);

    $li.append($titleDiv, $noteP);
    noteListItems.push($li);
  }

  $noteList.append(noteListItems);
};

// get notes from the db and render them to the sidebar
var getAndRenderNotes = function () {

  // ajax get request
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function (data) {
    renderNoteList(data);
  });
};

// call the function
getAndRenderNotes();