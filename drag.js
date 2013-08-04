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
        offsetX = event.pageX - offset.left + ml;
        offsetY = event.pageY - offset.top + mt;
     
        $(dragElement).after(placeHolderItem);
        $(dragElement).css({position:'absolute','z-index':999,cursor:'move'});
        move(event);//position变为absolute的时候，调整位置，保持在界面上的位置不变
        buildPosTable();//建立位置数组
        
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
    var nLeft = oEvent.pageX - offsetX ;
    var nTop = oEvent.pageY - offsetY;
    $(dragElement).css({left:nLeft, top:nTop});
    
    swapItem(oEvent);
    return false;
    // console.log(oEvent.pageX);
}
function stop(oEvent){
    $(document).unbind('mousemove');
    $(document).unbind('mouseup');
    dropItem();
    buildPosTable();
    
}

//获得拖动的元素，暂时没用到
function getItem(){
	return $('.wrap a');
}

//mousemove的时候用来交换位置
function swapItem(ev){
	var overIndex = findPos(ev.pageX, ev.pageY);
	console.log(overIndex)
	if (overIndex > dragList.length || overIndex==-1) {
		return false;
	}
	//把dragElement上一次的位置和当前dragElement的位置比较，判断是从左边拖过来的，还是从右边拖过来的
	if (lastPos == null || ( lastPos.left > $(dragElement).offset().left || lastPos.top > $(dragElement).offset().top )) {
		$(dragList[overIndex]).before(placeHolderItem);
		// $(pos[overIndex].elem).before(placeHolderItem);
	}else{
		$(dragList[overIndex]).after(placeHolderItem);
		// $(pos[overIndex].elem).after(placeHolderItem);
	}

	lastPos = $(dragElement).offset();//保存拖动元素的位置，
	buildPosTable();
	return false;
}

//mouseup的时候把拖动的元素插入到占位符的位置
function dropItem(){
	$(dragElement).attr('style','');
	$(placeHolderItem).before(dragElement);
	placeHolderItem.remove();
	dragElement = null;
}

//根据pageX,pageY找到重合的元素的index
function findPos(x,y){
	var len = pos.length;
	for (var i = 0; i < len; i++) {
		if (pos[i].left < x && pos[i].right > x && pos[i].top < y && pos[i].bottom > y)
			return i;
	}
	return -1;
}

//建立位置数组
function buildPosTable(){
	//这里一定要去除拖动的元素，不然总会自己跟自己重合，因此会导致一闪一闪的
	$(dragList).not(dragElement).each(function(i){
		var loc = $(this).offset();
		loc.right = loc.left + $(this).width();
		loc.bottom = loc.top + $(this).height();
		loc.elem = $(this);//把当前元素保存下来，暂时没用到，
		pos[i] = loc;
		console.log(loc)
	});
}
