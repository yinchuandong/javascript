$(document).ready(function() {
	dragList = $('.wrap a');
    beginDrag();
});
var dragList = null;//拖动元素的列表
var dragElement = null;
var pos = [];
var lastPos = null;
var offsetX=0,offsetY=0,offset;
// var marginLeft = 0; marginTop = 0;
var allowDrag = false;
var placeHolderItem = $('<a href="#" style="border:2px dashed #666;width:196px;height:196px;" class="placeHolderItem"></a>');

function beginDrag () {
    $(dragList).mousedown(function(event){
        dragElement = $(this);
        offset = $(this).offset();
        allowDrag = true;
        var ml = parseInt(dragElement.css('marginLeft'));
        var mt = parseInt(dragElement.css('marginTop'));
        offsetX = event.clientX - offset.left + ml;
        offsetY = event.clientY - offset.top + mt;
     
        $(dragElement).after(placeHolderItem);
        $(dragElement).css({position:'absolute','z-index':999,cursor:'move'});
        buildPosTable();
        move(event);
        // console.log(style)
        $(document).mousemove(move);
        $(document).mouseup(stop);
        return false;
        // event.preventDefault();
    });
    $(dragList).click(function(){
        console.log('click');
    });
}

function move(oEvent){
    var nLeft = oEvent.clientX - offsetX ;
    var nTop = oEvent.clientY - offsetY;
    $(dragElement).css({left:nLeft, top:nTop});
    
    swapItem(oEvent);
    // return false;
    // console.log(oEvent.clientX);
}
function stop(oEvent){
    $(document).unbind('mousemove');
    $(document).unbind('mouseup');
    dropItem();
    buildPosTable();
    
}

function getItem(){
	return $('.wrap a');
}

function swapItem(ev){

	var overIndex = findPos(ev.clientX, ev.clientY);
	if (overIndex > dragList.length || overIndex==-1) {
		return false;
	}
	// $(dragList).each(function(index,element){
	// 	if(index == overIndex){
	// 		$(dragList[overIndex]).before(placeHolderItem);
	// 	}
	// });
	// $(dragList[overIndex]).before(placeHolderItem);
	// console.log(overIndex+"--");
	if (lastPos == null || lastPos.top > $(dragElement).offset().top || lastPos.left > $(dragElement).offset().left) {
		$(dragList[overIndex]).before(placeHolderItem);
	}else{
		$(dragList[overIndex]).after(placeHolderItem);
	}

	lastPos = $(dragElement).offset();
	//buildPosTable();
	return false;
}

function dropItem(){
	$(dragElement).attr('style','');
	$(placeHolderItem).before(dragElement);
	placeHolderItem.remove();
	dragElement = null;
}

function findPos(x,y){
	var len = pos.length;
	for (var i = 0; i < len; i++) {
		if (pos[i].left < x && pos[i].right > x && pos[i].top < y && pos[i].bottom > y)
			return i;
	}
	return -1;
}
function buildPosTable(){
	$(dragList).each(function(i){
		var loc = $(this).offset();
		loc.right = loc.left + $(this).outerWidth();
		loc.bottom = loc.top + $(this).outerHeight();
		pos[i] = loc;
		
	});
}
