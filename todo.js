// const todoItem=[{
// 		item:'Item 1',
// 		discription:'This is description',
// 		id:1
// 	},
// 	{
// 		item:'Item 2',
// 		discription:'This is description 2',
// 		id:2
// 	},
// 	{
// 		item:'Item 3',
// 		discription:'This is description 3',
// 		id:3
// 	},
// 	{
// 		item:'Item 4',
// 		discription:'This is description 4',
// 		id:4
// 	},
// 	{
// 		item:'Item 5',
// 		discription:'This is description 5',
// 		id:5
// 	},
// 	{
// 		item:'Item 1',
// 		discription:'This is description',
// 		id:6
// 	},
// 	{
// 		item:'Item 2',
// 		discription:'This is description 2',
// 		id:7
// 	},
// 	{
// 		item:'Item 3',
// 		discription:'This is description 3',
// 		id:8
// 	},
// 	{
// 		item:'Item 4',
// 		discription:'This is description 4',
// 		id:9
// 	},
// 	{
// 		item:'Item 5',
// 		discription:'This is description 5',
// 		id:10
// 	},
// 	{
// 		item:'Item 1',
// 		discription:'This is description',
// 		id:11
// 	},
// 	{
// 		item:'Item 2',
// 		discription:'This is description 2',
// 		id:12
// 	},
// 	{
// 		item:'Item 3',
// 		discription:'This is description 3',
// 		id:13
// 	},
// 	{
// 		item:'Item 4',
// 		discription:'This is description 4',
// 		id:14
// 	},
// 	{
// 		item:'Item 5',
// 		discription:'This is description 5',
// 		id:15
// 	}];
const todoItem=[];

if(localStorage.getItem('TodoItems')){
	todoItem.push(...JSON.parse(localStorage.getItem('TodoItems')));
	// console.log(todoItem);
}
const todoCompleted=[];
const todoWorking=[];

var windowHeight=window.outerHeight;

var mainScrollContainer = document.querySelectorAll('.mainTodoContainer');
for(var msc=0;msc<mainScrollContainer.length;msc++){
	mainScrollContainer[msc].style.maxHeight=(windowHeight- 300)+'px';
}

FirstPageLoad();

function FirstPageLoad(){
	formTodoList();
}

function getAllTodoItem(){
	formTodoList();
}

function updateActualTodo(){
	localStorage.setItem('TodoItems',JSON.stringify(todoItem));
}

function listDownItem(){
	var id=Math.floor(Math.random()*10000);
	var newitem = document.getElementById('todoItem').value;
	var todoitemDiscription = document.getElementById('todoDiscription').value;
	todoItem.push({
		item:newitem,
		discription:todoitemDiscription,
		id:id
	});

	document.getElementById('todoItem').value='';
	document.getElementById('todoDiscription').value='';
	localStorage.setItem('TodoItems',JSON.stringify(todoItem));
	formTodoList();
}

function formTodoList(){
	document.getElementById('mainTodoItemContainer').innerHTML='';
	if(todoItem.length==0){
		document.getElementById('mainTodoItemContainer').innerHTML+="<div class='item noItemPresent'>"+
			"<div class='itemText '>NO Task Present</div>";
	}else{

	todoItem.forEach(x=>{
		document.getElementById('mainTodoItemContainer').innerHTML+="<div class='item'>"+
		"<div class='itemText'><b><i>"+x.item+"</b></i> : "+x.discription+
			"</div><div class='itemControls'>"+
				"<i class='fas fa-spinner' onclick='todotaskWorking(1,todoItem,"+x.id+")'></i>"+
				// "<i class='fas fa-check' onclick='todotaskCompleted(1,todoItem,"+x.id+")'></i>"+
				"<i class='fas fa-edit' onclick=editTodoItem(1,todoItem,"+x.id+")></i>"+
				"<i class='fas fa-trash' onclick=deleteTodoItem(1,todoItem,"+x.id+")></i>"+
			"</div>"+
		"</div>";
	})
	}
}

function todotaskWorking(type,getlist,id){
	
	for(var x=0;x<getlist.length;x++){

		if(getlist.findIndex(x => x.id === id) == -1){
			console.log('not found');
		}else{
			let itemIndex = getlist.findIndex(x => x.id === id);
			todoWorking.push(getlist[itemIndex]);
			getlist.splice(itemIndex, 1);
			workNoti(true);
			refreshList(type);
			break;
		}
		
	}

}


function getAllTodoWorking(){
	document.getElementById('mainTodoWorkingContainer').innerHTML='';
	workNoti(false);
	if(todoWorking.length==0){
		document.getElementById('mainTodoWorkingContainer').innerHTML+="<div class='item noItemPresent'>"+
			"<div class='itemText '>NO Task Present</div>";
	}else{

		todoWorking.forEach(x=>{
			document.getElementById('mainTodoWorkingContainer').innerHTML+="<div class='item todoWorking'>"+
			"<div class='itemText'>"+x.item+"-"+x.discription+
				"</div><div class='itemControls'>"+
					"<i class='fas fa-check' onclick='todotaskCompleted(2,todoWorking,"+x.id+")'></i>"+
					"<i class='fas fa-trash'  onclick=deleteTodoItem(2,todoWorking,"+x.id+")></i>"+
				"</div>"+
			"</div>";
		})
	}
}


function refreshList(type){
	// updateActualTodo();
	if(type==1){
		formTodoList();
	}

	if(type==2){
		getAllTodoWorking();
	}

	if(type==3){
		getAllTodoCompleted();
	}

	
}

function todotaskCompleted(type,getlist,id){
	for(var x=0;x<getlist.length;x++){

		if(getlist.findIndex(x => x.id === id) == -1){
			console.log('not found');
		}else{
			let itemIndex = getlist.findIndex(x => x.id === id);
			todoCompleted.push(getlist[itemIndex]);
			getlist.splice(itemIndex, 1);
			completeNoti(true);
			refreshList(type);

			break;
		}
		
	}
}

function getAllTodoCompleted(){
	document.getElementById('mainTodoCompleteContainer').innerHTML='';
	completeNoti(false);
	if(todoCompleted.length==0){
		document.getElementById('mainTodoCompleteContainer').innerHTML+="<div class='item noItemPresent'>"+
			"<div class='itemText '>NO Task Present</div>";
	}else{

	todoCompleted.forEach(x=>{
		document.getElementById('mainTodoCompleteContainer').innerHTML+="<div class='item itemCompleted'>"+
		"<div class='itemText'>"+x.item+"-"+x.discription+
			"</div><div class='itemControls'>"+
				"<i class='fas fa-spinner' onclick='todotaskWorking(3,todoCompleted,"+x.id+")'></i>"+
				"<i class='fas fa-trash' onclick='deleteTodoItem(3,todoCompleted,"+x.id+")'></i>"+
			"</div>"+
		"</div>";
	})
	}
}

function editTodoItem(type,getlist,id){
	for(var x=0;x<getlist.length;x++){

		if(getlist.findIndex(x => x.id === id) == -1){
			console.log('not found');
		}else{
			let itemIndex = getlist.findIndex(x => x.id === id);
			// todoCompleted.push(getlist[itemIndex]);
			// getlist.splice(itemIndex, 1);
			// refreshList(type);
			document.getElementById('updateTask').value=getlist[itemIndex].item;
			document.getElementById('updateDiscription').value=getlist[itemIndex].discription;
			document.getElementById('todoItemUpdateBtn').setAttribute('onclick',"updateTodoItem(1,"+id+")");
			$("#editTodoItem").modal('show');
			break;
		}
		
	}
}

function updateTodoItem(type,id){
	getlist=todoItem;
	
	for(var x=0;x<getlist.length;x++){

		if(getlist.findIndex(x => x.id === id) == -1){
			console.log('not found');
		}else{
			let itemIndex = getlist.findIndex(x => x.id === id);
			getlist[itemIndex].item=document.getElementById('updateTask').value;
			getlist[itemIndex].discription=document.getElementById('updateDiscription').value;
			refreshList(type);
			$("#editTodoItem").modal('hide');
			break;
		}
		
	}
}

function deleteTodoItem(type, getlist, id){
	for(var x=0;x<getlist.length;x++){

		if(getlist.findIndex(x => x.id === id) == -1){
			console.log('not found');
		}else{
			let itemIndex = getlist.findIndex(x => x.id === id);
			
			getlist.splice(itemIndex, 1);
			refreshList(type);
			
			break;
		}
		
	}
}

var workNoti = function (state){
	if(state){
		document.getElementById('todoWorkNoti').style.opacity=1;
	}else{
		document.getElementById('todoWorkNoti').style.opacity=0;

	}
}

var completeNoti = function (state){
	if(state){
		document.getElementById('todoCompleteNoti').style.opacity=1;
	}else{
		document.getElementById('todoCompleteNoti').style.opacity=0;

	}
}