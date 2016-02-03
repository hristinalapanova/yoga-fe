loadCategories(posecategories);

$('.elements').on('click', 'h2', function(){
  if($(this).parent().hasClass('category')){
    $.when(categoryCall($(this).html())).done(categoryReturn).fail(fail);
  }else if($(this).parent().hasClass('sequence')){
    //Do a sequence thing
  }else{
    //Do a pose thing
  }
})

$('select').change(function(){
  $('.elements').children('.element').remove();
  //Add ajax call here.
  if($('select').val() === '1' ){
    loadCategories(posecategories);
  }else if ($('select').val() === 'all'){
    $.when(allPoseCall()).done(poseReturn).fail(fail)
  }else{
    $.when(sequenceCall($('select').val())).done(sequenceReturn)
  }
})

var allPoseCall = function(){
  return $.ajax({
    url: 'https://young-shelf-28645.herokuapp.com/api',
    dataType: 'JSON',
    method: 'GET'
  })
}

function poseReturn(results){
  results.forEach(function(item){
    newPose(item.id, item.pose_name)
  })
}


var categoryCall = function(value){
  return $.ajax({
    url: 'https://young-shelf-28645.herokuapp.com/api/poses?category=' + value,
    dataType: 'JSON',
    method: 'GET'
  })
}


function categoryReturn(result){
  $('.elements').children('.sequence').remove();
  var resultArray = JSON.parse(result);
  resultArray.forEach(function(item){
    var newDiv = '<div class="pose element notdraggable"><p class="close">X</p><h2 id="' + item.pose_id + '">' + item.pose_name +  '</h2></div>'
    $(newDiv).appendTo('.elements');
  })
}

function fail(reuslt){
  alert('Sorry we failed')
}

var sequenceCall = function(value){
  return $.ajax({
    dataType: "JSON",
    url: '/api/' + username + '/' + value,
    method: 'GET'
  })
}

function sequenceReturn(results){
  results.forEach(function(item){
    var newDiv = '<div class="element sequence"><h2 id="' + item.pose_id + '">' + item.pose_name +  '</a></div>'
    $(newDiv).appendTo('.elements');
  })
}


function loadCategories(array){
  array.forEach(function(item){
    var newDiv = '<div class="category element notdraggable"><p class="close">X</p><h2 id="' + item + '">' + item +  '</h2></div>'
    $(newDiv).appendTo('.elements');
  })
}

function newPose(id, name){
  var newDiv = '<div class="pose element"><p class="close">X</p><h4 id="' + id + '">' + name + '</h4><label>Time</label><input type="number"></input></div>'
  $(newDiv).appendTo('.elements');
}

function newSequence(name, id){
  var newDiv = '<div class="sequence element notdraggable"><h2 id="'+ id + '">' + name + '</h2></div>'
  $(newDiv).appendTo('.elements')
}

function newCategory(name){
  var newDiv = '<div class="category element notdraggable"><h2 id="'+ name + '">' + name + '</h2></div>'
  $(newDiv).appendTo('.elements')
}