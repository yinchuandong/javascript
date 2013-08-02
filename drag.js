$(document).ready(function() {
<<<<<<< HEAD
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
	buildPosTable();
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
=======
	// init();
	// dragStart();
});

var container;
var list = [],
	pos=[];//保存所有元素的位置
var allowDrag = false, 
	offset=null;
var draggedItem=null,draggedItemIndex=0,placeHolderItem;

function init(){
	container = $('.wrap');
	list = container.children();
	$(list).mousedown(grabItem);
}

function uninit(){

}

function getItem(){
	return $(container).children();
}

function grabItem(e){
	e.preventDefault();
	draggedItem = $(e.target);
	// draggedItem.attr('test',container.index(draggedItem))
	var dragHandle = e.target;
	$(dragHandle).attr("data-cursor",$(dragHandle).css('cursor'));
	$(dragHandle).css("cursor", "move");
	var trigger = function(){
		dragStart(e);
		// $(container).unbind('mousemove',trigger);
	}
	$(container).mousemove(trigger).mouseup(function(){
		$(dragHandle).css('cursor',$(dragHandle).attr('data-cursor'));
		$(container).unbind('mousemove',trigger);
	});
	// console.log($(dragHandle).index())

}

function dragStart(e){
	var mt = parseInt(draggedItem.css('marginLeft'));
	var ml = parseInt(draggedItem.css('marginRight'));
	offset = draggedItem.offset();
	offset.top = e.pageY - offset.top + (isNaN(mt)?0:mt)-1;
	offset.left = e.pageX - offset.left + (isNaN(ml)?0:ml)-1;

	var h = draggedItem.height();
	var w = draggedItem.width();

	$(draggedItem).after('<div></div>');
	placeHolderItem = $(draggedItem).next().css({height:h,width:w}).attr('data-placeHolder',true);

	var orginStyle = $(draggedItem).attr('style');
	$(draggedItem).attr('data-orginStyle',orginStyle?orginStyle:'');
	$(draggedItem).css({position:'absolute', opacity:0.8, 'z-index':999, width:w,height:h});

	buildPostionTable();
	setPos(e.pageX,e.pageY);
	// console.log(mt+'-'+ml);
}	

function buildPostionTable(){
	getItem().not([placeHolderItem]).each(function(i){
		var loc = $(this).offset();
		loc.right = loc.left + $(this).outerWidth();
		loc.bottom = loc.top + $(this).outerHeight();
		loc.elm = $(this);
		pos[i] = loc;
		
	});
}

function findPos(x, y) {
	for (var i = 0; i < this.pos.length; i++) {
		if (this.pos[i].left < x && this.pos[i].right > x && this.pos[i].top < y && this.pos[i].bottom > y)
			return i;
	}
	return -1;
}

function setPos(x,y){
	var left = x - offset.left;
	var top = y - offset.top;
console.log(left+':'+top);

	draggedItem.parents().each(function(){
		if ($(this).css("position") != "static" && ($(this).css("display") != "table")) {
			var offset = $(this).offset();

			top -= offset.top;
			left -= offset.left;
			return false;
		}
	});
	$(draggedItem).css({left:left, top:top});
	
>>>>>>> db3745f247b5a562be4a9b97e59b1cbda0540297
}