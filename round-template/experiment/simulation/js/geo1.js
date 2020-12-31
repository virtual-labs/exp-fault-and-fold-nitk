//gap between lines
var grid_size = 35;

//each line plot points
var xaxis_starting_point = {number : 100, suffix:" "};
var yaxis_starting_point = {number : 100, suffix:" "};

//main canvas to plot graph
var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

//to be used for animations
var canvas2 = document.getElementById('mycanvas2');
var ctx2 = canvas2.getContext('2d');

//-------------paper for dotted line-----------
var paper = document.getElementById('paper');
var pctx = paper.getContext('2d');


//----------------paper for solid line-----------
var paper2 = document.getElementById('paper2');
var pctx2 = paper2.getContext('2d');

// //line plotting pencil within paper canvas
var imgTag = new Image();
var imgTag1 = new Image();
var imgTag2 = new Image();
var imgTags1,imgTags2,imgTags3,imgTags4,imgTags5,imgTags6,imgTags7,imgTags8 ;
var rp = new Image();
var sp = new Image();
imgTag.src = "images/pencil1.png";
imgTag1.src = "images/xarrow.png";
imgTag2.src = "images/reg1.png";
rp.src = "images/rp.png";
sp.src = "images/sp.png";
var lcolor;

//holding height and width of canvas
var canvas_width = canvas.width;
var canvas_height = canvas.height;

//no of vertical grid lines
var num_lines_x = Math.floor(canvas.height/grid_size);

//no of horizontal grid lines
var num_lines_y = Math.floor(canvas.width/grid_size);

//distance between lines
var xaxis_distance_gridlines = num_lines_x-1;

var yaxis_distance_gridlines = 1;
var t = 1,tx = 1,ty = 1,tpoint = 0,paperpointab=0,paperpointcd=0,lpoint=1,jpts=0,jpts1=0;

//animating drawing axis lines
var ptsx =[];
var ptsy =[];
var vertices = [];

//track span click operations
var spanclick=0;

//for solidline  and dotted line tables
var lin=0,tablesh=0;
var a1=0,b1=0,c1=0,d1=0,e1=0,f1=0,g1=0,h1=0,i1=0,j1=0,k1=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;

// //---tooltip variable
var sp1=0;


//for calculation
var solidline=0,m=0,n=0,faultCut = 0;

//for animating hand symbol
var ids,myInt;


//---variables plotting line on paper stores line as pencil track points
var x;
var y;
var xx;
var yy;
var i,j;

//variable for calculation
var fnd = 0;


//variables for tunnnel plot
var tun1x=0,tun1y=1190,tun2x=0,tun2y=1210;


//variables for drip
var speed =5;
var p1 = {x:270,y:-(140)};
var angle=27;
var radians = angle*Math.PI/180;
var xunits = Math.cos(radians)*speed;
var yunits = Math.sin(radians)*speed;
var point = new Array();
var ball ={x:p1.x,y:p1.y};
var drip=0;
var stopPoint = 0; 
var letter;
var nx,ny,drflag=0;
var faultStep = 0;

// Prompt questions during simulation
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else 
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		if(simsubscreennum == 8){
			if(soilType == "Fine grained soil")
				questions.ans1 = 3;
			else if(soilType == "Sandy soil")
				questions.ans1 = 2;
		}
		else
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		if(simsubscreennum == 8)
			document.getElementById("divq").innerHTML = qun+""+soilType;
		else
			document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");
		
		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");
		
		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.text = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);		
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}

//To set the questions division
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}

//-------------------------------------initial x and y axis plot points---------------------------------------
ptsx.push({
	x:0,
	y:grid_size*xaxis_distance_gridlines
});
ptsx.push({
	x:canvas_width,
	y:grid_size*xaxis_distance_gridlines
});
ptsy.push({
	x:grid_size*yaxis_distance_gridlines,
	y:0
});
ptsy.push({
	x:grid_size*yaxis_distance_gridlines,
	y:canvas_height
});

//plotting x and y axis
var xpoints = calcWaypoints(ptsx);
var ypoints = calcWaypoints(ptsy);

//jquery onload functions 
 
$(function()
{
	document.getElementById("select8-1").selectedIndex = 0;
	document.getElementById("select8-2").selectedIndex = 0;
	document.getElementById("select8-1").disabled = false;
	document.getElementById("select8-2").disabled = false;
	$('#select8-1').on('select', function() {
		$(this).next("span").remove();
	});
	$('#select8-2').on('select', function() {
		$(this).next("span").remove();
	});
	$('#select8-1').on('change', function() {
		$(this).next("span").remove();
		m=$(this).val();
		if(solidline == 0 && m ==100)
			$(this).prop('disabled',true);
		else if(solidline == 1 && m == 200)
			$(this).prop('disabled',true);
		else if(solidline == 2 && m == 300)
			$(this).prop('disabled',true);
		else if(solidline == 3 && m == 400)
			$(this).prop('disabled',true);
		else if(solidline == 4 && m == 400)
			$(this).prop('disabled',true);
		else
			$('#select8-1').after("<span>&#10008;</span>");
		isDisabled();
	});
	$('#select8-2').on('change', function() {
		$(this).next("span").remove();
		n=$(this).val();
		if(solidline == 0 && n == 200)
			$(this).prop('disabled',true);
		else if(solidline == 1 && n == 300)
			$(this).prop('disabled',true);
		else if(solidline == 2 && n == 400)
			$(this).prop('disabled',true);
		else if(solidline == 3 && n == 500)
			$(this).prop('disabled',true);
		else if(solidline == 4 && n == 500)
			$(this).prop('disabled',true);
		else
			$('#select8-2').after("<span>&#10008;</span>");
		isDisabled();
	});
	function isDisabled()
	{
		if($('#select8-1').prop('disabled')== true && $('#select8-2').prop('disabled') == true)
		{
			document.getElementById('calci').style.visibility="visible";
			//$('#calci').show();
		}
	}
	$('#calci').click(function()
	{
		document.getElementById('calci').style.visibility="hidden";
		if( solidline == 0 )
		{
			printCalculation(solidline,"&alpha;=120","&beta;=490","&yen;=270","<strong>&alpha;<&beta;</strong>","Index=(N*(¥- α )+M*( β-¥))/( β- α)","Index=(200*(270-120)+100*(490-270))/(490-120)",solidpoints[solidline][1]);
		}
		else if( solidline == 1 )
		{			
			printCalculation(solidline,"&alpha;=490","&beta;=870","&yen;=520","<strong>&alpha;<&beta;</strong>","Index=(N*(¥- α )+M*( β-¥))/( β- α)","Index=(300*(520-490)+200*(870-520))/(870-490)",solidpoints[solidline][1]);
		}
		else if( solidline == 2 )
		{
			printCalculation(solidline,"&alpha;=870","&beta;=1150","&yen;=925","<strong>&alpha;<&beta;</strong>","Index=(N*(¥- α )+M*( β-¥))/( β- α)","Index=(400*(925-870)+300*(1150-925))/(1150-870)",solidpoints[solidline][1]);
		}
		else if( solidline == 3 )
		{
			printCalculation(solidline,"&alpha;=1150","&beta;=1480","&yen;=1180","<strong>&alpha;<&beta;</strong>","Index=(N*(¥- α )+M*( β-¥))/( β- α)","Index=(500*(1180-1150)+400*(1480-1180))/(1480-1150)",solidpoints[solidline][1]);
		}
		else if( solidline == 4 )
		{
			printCalculation(solidline,"&alpha;=1150","&beta;=1480","&yen;=1450","<strong>&alpha;<&beta;</strong>","Index=(N*(¥- α )+M*( β-¥))/( β- α)","Index=(500*(1450-1150)+400*(1480-1450))/(1480-1150)",solidpoints[solidline][1]);
		}
	});
	$('#nb').click(function()
	{ 	
		if(solidline == 0)
		{
			document.getElementById('img8-1').src="images/img8-2.png";
			$('#can8-1').html("&#10148;For the solid line <span>q</span>:");
		}
		if(solidline == 1)
		{
			document.getElementById('img8-1').src="images/img8-3.png";
			$('#can8-1').html("&#10148;For the solid line <span>r</span>:");
		}
		if(solidline == 2)
		{
			document.getElementById('img8-1').src="images/img8-4.png";
			$('#can8-1').html("&#10148;For the solid line <span>s</span>:");
		}
		if(solidline == 3)
		{
			document.getElementById('img8-1').src="images/img8-5.png";
			$('#can8-1').html("&#10148;For the solid line <span>t</span>:");
		}
		if(solidline == 4)
		{
			document.getElementById('img8-1').src="images/img8-6.png";	
			$('#can8-1').html("&#10148;For the solid line <span>u</span>:");
		}

		document.getElementById('nb').style.visibility="hidden";
		document.getElementById("select8-1").selectedIndex = 0;
		document.getElementById("select8-2").selectedIndex = 0;
		document.getElementById("select8-1").disabled = false;
		document.getElementById("select8-2").disabled = false;
		document.getElementById('can8-2').style.visibility="hidden";			
		document.getElementById('can8-3').style.visibility="hidden";			
		document.getElementById('can8-4').style.visibility="hidden";			
		document.getElementById('can8-5').style.visibility="hidden";			
		document.getElementById('can8-6').style.visibility="hidden";			
		document.getElementById('can8-8').style.visibility="hidden";
		solidline++;
		removeColorTable(solidline);
		setColorTable(solidline);		
	});
	//plot points using abtable td
	$('#dottable td').on('click',function()
	{
		var rowid = $(this).attr('id');
		ctx.beginPath();
		ctx.font = "10px Verdana";
		ctx.fillStyle="#00BFFF";
		ctx.strokeStyle="black"
		switch(rowid)
		{
			case 'a1' : ctx.arc(grid_size*(dotpoints[0][0]/100), -grid_size*(dotpoints[0][1])/100,3,0,2*Math.PI,false);
						ctx.stroke();	
						ctx.fill();	
						ctx.closePath();
						$('#a1').off('click');
						$(this).css('background','#fff');
						$(this).css('cursor','auto');
						a1=1;
						break;
			case 'b1' :	ctx.arc(grid_size*(dotpoints[1][0]/100), -grid_size*(dotpoints[1][1])/100,3,0,2*Math.PI,false);
						ctx.stroke();	
						ctx.fill();		
						ctx.closePath();
						$('#b1').off('click');
						$(this).css('background','#fff');
						$(this).css('cursor','auto');
						b1=1;
						break;
						
			case 'e1' :	ctx.arc(grid_size*(dotpoints[4][0]/100), -grid_size*(dotpoints[4][1])/100,3,0,2*Math.PI,false);
						ctx.stroke();	
						ctx.fill();		
						ctx.closePath();
						$('#e1').off('click');
						$(this).css('background','#fff');
						$(this).css('cursor','auto');
						e1=1;
						break;
						
			case 'f1' :	ctx.arc(grid_size*(dotpoints[5][0]/100), -grid_size*(dotpoints[5][1])/100,3,0,2*Math.PI,false);
						ctx.stroke();	
						ctx.fill();		
						ctx.closePath();
						$('#f1').off('click');
						$(this).css('background','#fff');
						$(this).css('cursor','auto');					
						f1=1;
						break;
						
			case 'g1' :	ctx.arc(grid_size*(dotpoints[6][0]/100), -grid_size*(dotpoints[6][1])/100,3,0,2*Math.PI,false);
						ctx.stroke();	
						ctx.fill();		
						ctx.closePath();
						$('#g1').off('click');
						$(this).css('background','#fff');
						$(this).css('cursor','auto');					
						g1=1;
						break;
		}
		if(a1 == 1 && b1 == 1 && e1 == 1 && f1 == 1 && g1 == 1 )
		{
			document.getElementById('dotpic').style.visibility = "hidden"
			document.getElementById('cmap').innerHTML = "Plot Y'<br>&lt;X:1520 Y:0&gt;";
			spanclick=10;
		}
			
	});

	//plot points using abtable td
	$('#solidtable td').on('click',function()
	{
		var rowidd = $(this).attr('id');
		ctx.beginPath();
		switch(rowidd)
		{
			case 'p' : 	ctx.fillStyle="red";
						ctx.strokeStyle="black";
						ctx.arc(grid_size*(solidpoints[0][0]/100), -grid_size*((solidpoints[0][1])/100),3,0,2*Math.PI,false);
						ctx.stroke();	
						ctx.fill();	
						ctx.closePath();
						$('#p').off('click');
						$(this).css('background','#fff');
						$(this).css('cursor','auto');
						p=1;
						break;
						
			case 'q' :	ctx.fillStyle="red";
						ctx.strokeStyle="black";
						ctx.arc(grid_size*(solidpoints[1][0]/100), -grid_size*((solidpoints[1][1])/100),3,0,2*Math.PI,false);
						ctx.stroke();	
						ctx.fill();		
						ctx.closePath();
						$('#q').off('click');
						$(this).css('background','#fff');
						$(this).css('cursor','auto');
						q=1;
						break;
						
			case 'r' :	ctx.fillStyle="red";
						ctx.strokeStyle="black";
						ctx.arc(grid_size*(solidpoints[2][0]/100), -grid_size*((solidpoints[2][1])/100),3,0,2*Math.PI,false);
						ctx.stroke();	
						ctx.fill();	
						ctx.closePath();
						$('#r').off('click');
						$(this).css('background','#fff');
						$(this).css('cursor','auto');
						r=1;
						break;
					   
			case 's' :	ctx.fillStyle="red";
						ctx.strokeStyle="black";
						ctx.arc(grid_size*(solidpoints[3][0]/100), -grid_size*((solidpoints[3][1])/100),3,0,2*Math.PI,false);
						ctx.stroke();	
						ctx.fill();		
						ctx.closePath();
						$('#s').off('click');
						$(this).css('background','#fff');
						$(this).css('cursor','auto');
						s=1;
						break;
						
			case 't' :	ctx.fillStyle="red";
						ctx.strokeStyle="black";
						ctx.arc(grid_size*(solidpoints[4][0]/100), -grid_size*((solidpoints[4][1])/100),3,0,2*Math.PI,false);
						ctx.stroke();	
						ctx.fill();		
						ctx.closePath();
						$('#t').off('click');
						$(this).css('background','#fff');
						$(this).css('cursor','auto');
						t=1;
						break;
						
			case 'u' :	ctx.fillStyle="green";
						ctx.strokeStyle="black";
						ctx.arc(grid_size*(solidpoints[5][0]/100), -grid_size*((solidpoints[5][1])/100),3,0,2*Math.PI,false);
						ctx.stroke();	
						ctx.fill();		
						ctx.closePath();
						$('#u').off('click');
						$(this).css('background','#fff');
						$(this).css('cursor','auto');
						u=1;
						break;
		}
		if(p == 1 && q == 1 && r == 1 && s == 1 && t == 1 && u== 1)
		{
			// document.getElementById('solidpic').style.visibility="hidden";
			var q1 = Object.create(questions);												
			generateQuestion(q1,"________dotted lines and _______solid lines are identified in this map","","5 & 10","5 & 5","6 & 5","4 & 3",2,nextButtonProceed,100,150,300,120);	
		}
			
	});
	$('#scale').mouseover(function()
	{
		$('#scinff').show();
	});
	$('#scale').mouseout(function()
	{
		$('#scinff').hide();
	});
	$('#direct').mouseover(function()
	{
		$('#direction').show();
	});
	$('#direct').mouseout(function()
	{
		$('#direction').hide();
	});
	$('#legend').mouseover(function()
	{
		$('#legg').show();
	});
	$('#legend').mouseout(function()
	{
		$('#legg').hide();
	});
	$('#mycanvas').mousemove(function(event){
		var xx = event.pageX;
		var yy = event.pageY;		
		 if(sp1==1)
		 {
			 $('#tooltip-span').text(xx+" "+yy);    
			 if(xx>=202 && xx<=206 && yy>=475 && yy<=479)
			 {
				$('#tooltip-span').text("120,100");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			 else if(xx>=331 && xx<=335 && yy>=439&& yy<=443)
			 {
				$('#tooltip-span').text("490,200)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=464 && xx<=470 && yy>=405 && yy<=409)
			 {
				$('#tooltip-span').text("870,300");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=563&& xx<=567 && yy>=370 && yy<=374)
			 {
				$('#tooltip-span').text("1150,400");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=678 && xx<=682 && yy>=335 && yy<=339)
			 {
				$('#tooltip-span').text("1480,500");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=254 && xx<=259 && yy>=460 && yy<=464)
			 {
				$('#tooltip-span').text("270,140(Conglomerate/CG Sandstone)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=342 && xx<=346 && yy>=436 && yy<=440)
			 {
				$('#tooltip-span').text("520,208(CG Sandstone/FG Sandstone)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=484 && xx<=490 && yy>=397 && yy<=401)
			 {
				$('#tooltip-span').text("925,320(CG Sandstone/FG Sandstone)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=573 && xx<=577 && yy>=365 && yy<=369)
			 {
				$('#tooltip-span').text("1180,410 (FG Sandstone/Shale)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=668 && xx<=672 && yy>=338 && yy<=342)
			 {
				$('#tooltip-span').text("1450,490(Shale/Limestone)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX-70,
				  visibility:'visible'
				});
			 }
			  else if(xx>=408 && xx<=412 && yy>=425&& yy<=429)
			 {
				$('#tooltip-span').text("710,240)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX-90,
				  visibility:'visible'
				});
			 }
			  else if(xx>=438 && xx<=449 && yy>=411 && yy<=421)
			 {
				$('#tooltip-span').text("C(780,280)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx>=452 && xx<=463 && yy>=408 && yy<=417)
			 {
				$('#tooltip-span').text("D(829,290)");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx >= 411 && xx<=413 && yy >=363 && yy<=369)
			 {
				$('#tooltip-span').text("710,420");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX-90,
				  visibility:'visible'
				});
			 }
			  else if(xx >= 411 &&  xx<=413 && yy >=512 && yy<=515)
			 {
				$('#tooltip-span').text("710,0");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX+10,
				  visibility:'visible'
				});
			 }
			  else if(xx >= 411 && xx<=413 && yy >=473 && yy<=476)
			 {
				$('#tooltip-span').text("710,110");    
				$('#tooltip-span').css({
				  position:'absolute',
				  top:event.pageY-10,
				  left:event.pageX-90,
				  visibility:'visible'
				});
			 }
			 
			 else
			 {
				 $('#tooltip-span').css({
					visibility:'hidden'
				});
			 }
		 }
	});
		
});

//To blink arrows
 function animatearrow(ids)
{
    if(document.getElementById(ids).style.visibility=="visible")
        document.getElementById(ids).style.visibility="hidden";
    else
        document.getElementById(ids).style.visibility="visible";
}

//stop blinking arrow
function myStopFunction(ids) 
{
    clearInterval(myInt);
   // document.getElementById('ids').style.visibility="hidden";
}
//animate arrow at position
function animateArrowATPosition(left,top,degg)
{
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:"+left+"px; top: "+top+"px; height: 20px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate("+degg+"deg)"; 
	 // Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate("+degg+"deg)";
	 // Standard syntax
	document.getElementById("arrow1").style.transform = "rotate("+degg+"deg)";
}

//-------------function navnext------------

function navNext()
{

     for (temp = 0; temp <=16; temp++) 
     { 
         document.getElementById ('canvas'+temp).style.visibility="hidden";
     }
     simsubscreennum+=1;
     document.getElementById('canvas'+(simsubscreennum)).style.visibility="visible";

     document.getElementById('nextButton').style.visibility="hidden";
     magic();
}

//---------function magic starts here-----------
function magic()
{
	if(simsubscreennum == 1)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('canvas-wrap-1').style.visibility="visible";
		setTimeout(function()
		{
			$('#cover').animate({
									left:'45px',
									top:'230px'
								},500,
								function(){
								document.getElementById('fullmap').style.visibility="hidden";
								document.getElementById('ctr1').style.visibility="visible";
								document.getElementById('line1').style.visibility="visible";
								});
		},1500);
		setTimeout(function()
		{
			document.getElementById('fullmap').style.visibility="visible";
			document.getElementById('ctr1').style.visibility="hidden";
			document.getElementById('cover').style.visibility="hidden";
			document.getElementById('nextButton').style.visibility="visible";
		},3000);
	}
	else if(simsubscreennum == 2)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('fullmap').style.visibility="hidden";
		document.getElementById('line').style.visibility="hidden";
		document.getElementById('line1').style.visibility="hidden";
		document.getElementById('cmap').style.visibility="visible";
		
	}
	else if(simsubscreennum == 3)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('dotplot').style.visibility="hidden";
		document.getElementById('map2').style.visibility="hidden";
		document.getElementById('dotpoints').style.visibility="hidden";	
		ctx.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas		
		drawXaxis();
		drawYaxis();
		spanclick=3;
		document.getElementById('cmap').style.visibility="visible";
		document.getElementById('mycanvas').style.visibility="visible";
		document.getElementById('mycanvas').style.border="solid 2px";
		document.getElementById('cmap').innerHTML="Plot X-Axis";	
		
	}
	else if(simsubscreennum == 4)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('dotpic').style.visibility="visible";
		document.getElementById('cmap').style.visibility="visible";	
		document.getElementById('cmap').innerHTML = "Define<br>Co-ordinates";	
		ctx.beginPath();
		ctx.lineWidh = 4;
		ctx.font = '20px Verdana';
		ctx.fillText("Geographical Profile along XY",30,-295); 
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		
	}
	else if(simsubscreennum == 5)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="hidden";
		document.getElementById('scale').style.visibility="hidden";
		document.getElementById('direct').style.visibility="hidden";
		document.getElementById('dottable').style.visibility="hidden";
		document.getElementById('cmap').style.visibility="visible";	
		document.getElementById('cmap').innerHTML = "Get Paper";
		lin=1;
		tablesh = 1;
		spanclick=0;
		
	}
	else if(simsubscreennum == 6)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('solidplot').style.visibility="hidden";
		document.getElementById('solidpoints').style.visibility="hidden";
		document.getElementById('solidpic').style.visibility="visible";
		document.getElementById('mycanvas').style.visibility="visible";
		document.getElementById('cmap').style.visibility="visible";	
		document.getElementById('cmap').innerHTML = "Define X-Cordinates";
		spanclick=8;		
	}
	else if(simsubscreennum == 7)
	{
		document.getElementById('nextButton').style.visibility="hi";
		document.getElementById('mycanvas').style.visibility="hidden";
		document.getElementById('solidtable1').style.visibility="hidden";
		setTimeout(function()
		{
			document.getElementById('can7-1').style.visibility="visible";
			document.getElementById('img7-1').style.visibility="visible";
		},1500);
		setTimeout(function()
		{
			document.getElementById('img7-1').style.visibility="hidden";
			document.getElementById('can7-2').style.visibility="visible";
			document.getElementById('img7-2').style.visibility="visible";
			document.getElementById('img7-4').style.visibility="visible";
		},3500);
		setTimeout(function()
		{
			document.getElementById('can7-3').style.visibility="visible";
		},4500);
		setTimeout(function()
		{
			document.getElementById('can7-4').style.visibility="visible";
			document.getElementById('img7-3').style.visibility="visible";
		},6500);
		setTimeout(function()
		{
			document.getElementById('can7-5').style.visibility="visible";
		},7500);
		setTimeout(function()
		{
			document.getElementById('can7-6').style.visibility="visible";
		},8500);
		setTimeout(function()
		{
			document.getElementById('can7-7').style.visibility="visible";
			document.getElementById('nextButton').style.visibility="visible";
		},9500);
	}
	else if(simsubscreennum == 8)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('can7-1').style.visibility="hidden";
		document.getElementById('can7-2').style.visibility="hidden";
		document.getElementById('can7-3').style.visibility="hidden";
		document.getElementById('can7-4').style.visibility="hidden";
		document.getElementById('can7-5').style.visibility="hidden";
		document.getElementById('can7-6').style.visibility="hidden";
		document.getElementById('can7-7').style.visibility="hidden";
		document.getElementById('img7-1').style.visibility="hidden";
		document.getElementById('img7-2').style.visibility="hidden";
		document.getElementById('img7-3').style.visibility="hidden";
		document.getElementById('img7-4').style.visibility="hidden";
		setColorTable(solidline);
	}
	else if(simsubscreennum == 9)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('table2').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="visible";	
		document.getElementById('solidpic').style.visibility="visible";	
		document.getElementById('cmap').style.visibility="visible";	
		document.getElementById('cmap').innerHTML = "Click on Points to plot";
		spanclick=9;		
	}
	else if(simsubscreennum == 10)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('solidtable').style.visibility="hidden";
		document.getElementById('solidpic').style.visibility="hidden";	
		document.getElementById('cmap').style.visibility="visible";	
		document.getElementById('cmap').innerHTML = "Join Points";
		spanclick=11;	
	}
	else if(simsubscreennum == 11)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('can12-8').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="visible";
		document.getElementById('cmap').style.visibility="visible";	
		document.getElementById('cmap').innerHTML = "Plot points C and D (Road)";
		spanclick = 14;
	}
	else if(simsubscreennum == 12)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="visible";
		document.getElementById('cmap').style.visibility="visible";
		document.getElementById('cmap').innerHTML ="Draw Fault Line";
		spanclick = 15;
	}
	else if(simsubscreennum == 13)
	{	
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="hidden";
		document.getElementById('cmap').style.visibility="hidden";
		setTimeout(function()
		{
			document.getElementById("img12-1").src = "images/img12-1.png";
		},1500);
		setTimeout(function()
		{
			document.getElementById('can12-1').innerHTML="&#10148;Draw lines perpendicular to XY passing through points of intersection.";
			document.getElementById("img12-1").src = "images/img12-2.png";
		},3000);
		setTimeout(function()
		{
			document.getElementById('can12-1').innerHTML="&#10148;Take one  point  on each line  drawn  above consecutively  -Let it be a1 and a2.";
			document.getElementById("img12-1").src = "images/img12-3.png";
		},4500);	
		setTimeout(function()
		{
			document.getElementById('can12-1').innerHTML="&#10148;Let the index values of the dotted line be T1 and T2 (T1≠T2)which are at the point of intersection.(i.e a1 and a2).";
			document.getElementById("img12-1").src = "images/img12-4.png";
		},6000);
		setTimeout(function()
		{
			document.getElementById('can12-1').innerHTML="&#10148;Measure the distance between the above drawn lines along XY ,let it be d1.";
			document.getElementById("img12-1").src = "images/img12-5.png";
		},7500);
		setTimeout(function()
		{
			document.getElementById('can12-1').innerHTML="&#10148;Angle od Dip calculated as:";
			document.getElementById('can12-4').innerHTML="&#10148;For T1>T2:Angle of Dip (&theta;) = tan<sup>-1</sup>⁡( (T1-T2)/d1)";
			document.getElementById('can12-5').innerHTML="&#10148;For T2>T1:Angle of Dip (&theta;) =tan<sup>-1</sup>⁡( (T2-T1)/d1)";
			document.getElementById("img12-1").src = "images/img12-6.png";
			document.getElementById('can12-8').style.visibility="visible";
			document.getElementById('nextButton').style.visibility="visible";
		},9000);
	}

	else if(simsubscreennum == 14)
	{
		document.getElementById('cmap').style.visibility="hidden";
		document.getElementById('can12-8').style.visibility="hidden";
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="visible";
		document.getElementById('scale').style.visibility="visible";	
		document.getElementById('direct').style.visibility="visible";
		setDialog("From the point p ,draw a line  at an angle θ   with  horizontal in clockwise direction  and extend it till the bounds  that is  X axis and the curve.And its point of intersection on x-axis be p’",100,185,140,400);	
		
	}
	else if(simsubscreennum == 15)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('pp').style.visibility="hidden";
		document.getElementById('qq').style.visibility="hidden";
		document.getElementById('rr').style.visibility="hidden";
		document.getElementById('ss').style.visibility="hidden";
		document.getElementById('ttt').style.visibility="hidden";
		document.getElementById('uu').style.visibility="hidden";
		drip = 0;
		setDialog("Area Bounded by pp’OX  and u’uJ’ on the graph is Conglomerate.",100,185,100,350);
	}
	else if(simsubscreennum == 16)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('congo').style.visibility="hidden";
		document.getElementById('cgstone').style.visibility="hidden";
		document.getElementById('fgstone').style.visibility="hidden";
		document.getElementById('shale').style.visibility="hidden";
		document.getElementById('lime').style.visibility="hidden";
		faultStep = 0;
		setDialog("Move along the line XY from left to right and search for the types of the rock that repeats itself the first after the fault line FF.",100,185,140,350);
	}
	else if(simsubscreennum == 17)
	{
		document.getElementById('nextButton').style.visibility="hidden";
		document.getElementById('mycanvas').style.visibility="hidden";
		document.getElementById('scale').style.visibility="hidden";
		document.getElementById('direct').style.visibility="hidden";
		document.getElementById('legend').style.visibility="hidden";
		sp1= 1;
	}
	
}


//------------------spanclick------------------
$('#cmap').click('one', function() {
	if(spanclick == 0)
	{
		if(lin == 0)
		{
			document.getElementById('paper').style.visibility="visible";
			document.getElementById('cmap').style.visibility="hidden";
			$('#paper').animate(
								{
									height:'200'
								},
								800,
			
							function(){
				//$('#fullmap').css('clip', 'rect(0px, 600px, 180px, 0px)');
				document.getElementById('paper').width="485";
				document.getElementById('paper').height="200";
				document.getElementById('cmap').style.visibility="visible";
				$('#cmap').text("Mark Points");
				spanclick=1;
			  });
		}
		else if(lin == 1)
		{
			document.getElementById('paper2').style.visibility="visible";
			document.getElementById('cmap').style.visibility="hidden";
			$('#paper2').animate(
								{
									height:'200'
								},
								800,
			
							function(){
				//$('#fullmap').css('clip', 'rect(0px, 600px, 180px, 0px)');
				document.getElementById('paper2').width="485";
				document.getElementById('paper2').height="200";
				document.getElementById('cmap').style.visibility="visible";
				document.getElementById('mycanvas2').style.visibility="visible";
				$('#cmap').text("Mark Points");
				spanclick=1;
			  });
		}
		  
      
    }
	
	else if(spanclick == 1)
	{
		pctx.clearRect(0,0,paper.width,paper.height);
		if(lin == 0)
		{
			document.getElementById('dotpoints').style.visibility="visible";
			$('#dotpoints').show().find('tr').each(function (i,item){  
			var $row = $(item); 
			$row.hide();  
			$row.delay(i*500).fadeIn(500); 	
		});
			plotonpaperab();
		}
		else if(lin == 1)
		{
			document.getElementById('solidpoints').style.visibility="visible";
			$('#solidpoints').show().find('tr').each(function (i,item){  
			var $row = $(item); 
			$row.hide();  
			$row.delay(i*500).fadeIn(500); 	
		});
			plotonpapercd();
		}
		
		
		//document.getElementById('nextButton').style.visibility="visible";
	}
	else if(spanclick == 3)
	{
		document.getElementById('cmap').style.visibility="hidden";
		spanclick=4;
		plotXaxis(xpoints);
	}
	else if(spanclick == 4)
	{
		document.getElementById('cmap').style.visibility="hidden";
		plotYaxis(ypoints);
		setTimeout(function()
		{
			ctx.translate(yaxis_distance_gridlines*grid_size,xaxis_distance_gridlines*grid_size);
			drawtriangle();
			spanclick=5;
		},2600);
	}
	else if(spanclick == 5)
	{
		tickXaxis();
		origin();
		$('#cmap').text("Points on Y-Axis");
		spanclick=6;
	}
	else if(spanclick == 6)
	{
		tickYaxis();
		document.getElementById('cmap').style.visibility = "hidden";
		document.getElementById('nextButton').style.visibility = "visible";
		document.getElementById('scale').style.visibility = "visible";
		document.getElementById('direct').style.visibility = "visible";
		$('#cmap').css('height','35px');
		spanclick=8;
	}
	else if(spanclick == 7)
	{
		namescale();
		document.getElementById('cmap').style.visibility = "hidden";
		document.getElementById('nextButton').style.visibility = "visible";
		$('#cmap').css('height','35px');
		spanclick=8;
	}
	else if(spanclick == 8)
	{
		showtable();
		spanclick=9;
	}
	else if(spanclick == 10)
	{
		endLine();
		document.getElementById('cmap').style.visibility = "hidden";
		document.getElementById('nextButton').style.visibility = "visible";
	}
	else if(spanclick == 11)
	{
		ctx.beginPath();
		ctx.moveTo(0,-grid_size*(100)/100);
		joinPoints();
		spanclick=-1;
	}
	else if(spanclick == 13)
	{
		spanclick =-1;
		namePoints();	
	}
	else if(spanclick == 14)
	{
		spanclick =-1;
		plotPointsofRoad();
	}
	else if(spanclick == 15)
	{
		spanclick=-1;
		drawFalutLine();
	}
});

// Calling dripDrawFunction 
 function toDrawDrip(elem)
{
		var dripid = elem.id;
		myStopFunction(ids);
		document.getElementById(ids).style.visibility = "hidden";
		document.getElementById(dripid).onclick = " ";
		if(dripid == "pp")
		{
			if(drip == 0)
			{
				letter = "p'";
				gameLoop();
			}
		}
		else if(dripid == "qq")
		{
			if(drip==1)
			{
				p1={x:520,y:-(208)};
				ball ={x:p1.x,y:p1.y};
				stopPoint = 40;
				angle=27;
				radians = angle*Math.PI/180;
				xunits = Math.cos(radians)*speed;
				yunits = Math.sin(radians)*speed;
				letter = "q'";				
				gameLoop();
			}
		}
		else if(dripid == "rr")
		{
			if(drip==2)
			{
				faultCut = 0;
				p1={x:925,y:-(320)};
				ball ={x:p1.x,y:p1.y};
				stopPoint = 6;
				angle=27;
				radians = angle*Math.PI/180;
				xunits = Math.cos(radians)*speed;
				yunits = Math.sin(radians)*speed;
				letter = "r'";	
				gameLoop();
			}
		}
		else if(dripid == "ss")
		{
			if(drip==3)
			{
				faultCut = 0;
				p1={x:1180,y:-(410)};
				ball ={x:p1.x,y:p1.y};
				stopPoint = 83;
				angle=27;
				radians = angle*Math.PI/180;
				xunits = Math.cos(radians)*speed;
				yunits = Math.sin(radians)*speed;
				letter = "s'";	
				gameLoop();
			}
		}
		else if(dripid == "ttt")
		{
			if(drip==4)
			{
				p1={x:1450,y:-(490)};
				ball ={x:p1.x,y:p1.y};
				stopPoint = 163;
				angle=20;
				radians = angle*Math.PI/180;
				xunits = Math.cos(radians)*speed;
				yunits = Math.sin(radians)*speed;
				letter = "t'";	
				gameLoop();
			}
		}
		else if(dripid == "uu")
		{
			if(drip==5)
			{
				p1={x:710,y:-(240)};
				ball ={x:p1.x,y:p1.y};
				stopPoint = 0;
				angle=27;
				radians = angle*Math.PI/180;
				xunits = Math.cos(radians)*speed;
				yunits = Math.sin(radians)*speed;
				letter = "u'";	
				gameLoop();
			}
		}
}
 
 // -------------To draw drip--------
function drawScreen()
{
	
	ctx.strokeStyle="#000000";
	ball.x+= xunits;
	ball.y+= yunits;
	point.push({x:ball.x,y:ball.y});
	ctx.fillStyle = "#000000";	
	ctx.beginPath();
	ctx.arc(grid_size*ball.x/100,grid_size*ball.y/100,1,0,Math.PI*2,true);
	ctx.fill();
	ctx.closePath();
	if(faultCut == 0)
	{
		if(grid_size*ball.y/100>-stopPoint)
		{
			setText(letter,grid_size*ball.x/100,grid_size*(ball.y-10)/100);
		// chkdrip();
			if(drip == 2)
			{
				faultCut = 1;
				p1={x:925,y:-(320)};
				ball ={x:p1.x,y:p1.y};
				stopPoint =150;
				angle=207;
				radians = angle*Math.PI/180;
				xunits = Math.cos(radians)*speed;
				yunits = Math.sin(radians)*speed;
				letter = "Z";	
				gameLoop();
			}
			if(drip == 5)
			{
				document.getElementById("nextButton").style.visibility = "visible"
			}
			setTimeout(function()
			{
				drip++;
				nextLineToDraw();
			},800);
		}
	}
	else if(faultCut == 1)
	{
		if(grid_size*ball.y/100<-stopPoint)
		{
			setText(letter,grid_size*ball.x/100,grid_size*(ball.y-10)/100);
		}
	}
}

function gameLoop()
{
	window.setTimeout(gameLoop,20);
	
	if(faultCut == 1)
	{
		if(grid_size*ball.y/100>-stopPoint)
			drawScreen();
	}
	else 
	{
		if(grid_size*ball.y/100<-stopPoint)
			drawScreen();  
	}
}

function setText(letter,xcoord,ycoord)
{
	ctx.font = "14px verdana";
	ctx.fillStyle="black";
	ctx.fillText(letter,xcoord,ycoord);
}

function fillPattterns(elem)
{
	var regid = elem.id;
	myStopFunction(ids);
	document.getElementById(ids).style.visibility = "hidden";
	document.getElementById(regid).onclick = " ";
	if(regid == "congo")
	{
		if(drip == 0)
		{
			drawCongoPatterns();
			drip++;
			nextLineToDraw();
		}
	}
	else if(regid == "cgstone")
	{
		if(drip == 1)
		{
			drawcgStonePatterns();
			drip++;
			nextLineToDraw();
		}
	}
	else if(regid == "fgstone")
	{
		if(drip == 2)
		{
			drawfgStonePatterns();
			drip++;
			nextLineToDraw();
		}
	}
	else if(regid == "shale")
	{
		if(drip == 3)
		{
			drawShalePatterns();
			drip++;
			nextLineToDraw();
		}
	}
	else if(regid == "lime")
	{
		if(drip == 4)
		{
			drawLimePatterns();
			drip++;
			nextLineToDraw();
		}
	}
	
}

//To fill Lime Stone Region
function drawCongoPatterns()
{
	ctx.beginPath();
	ctx.fillStyle="brown";
	ctx.font="12px Verdana";
	ctx.lineWidth=2;
	i=20;j=60,stopPoint = 340;
	fillTextPatterns("*",i,j,stopPoint);
	i=20;j=30,stopPoint = 400;
	fillTextPatterns("*",i,j,stopPoint);
	i=20;j=0,stopPoint = 500;
	fillTextPatterns("*",i,j,stopPoint);
	i=200;j=90,stopPoint = 300;
	fillTextPatterns("*",i,j,stopPoint);
	i=720;j=200,stopPoint = 750;
	fillTextPatterns("*",i,j,stopPoint);
	i=720;j=170,stopPoint = 800;
	fillTextPatterns("*",i,j,stopPoint);
	i=720;j=140,stopPoint = 820;
	fillTextPatterns("*",i,j,stopPoint);
	i=720;j=110,stopPoint = 900;
	fillTextPatterns("*",i,j,stopPoint);
	i=720;j=80,stopPoint = 950;
	fillTextPatterns("*",i,j,stopPoint);
	i=720;j=50,stopPoint = 1000;
	fillTextPatterns("*",i,j,stopPoint);
	i=720;j=20,stopPoint = 1050;
	fillTextPatterns("*",i,j,stopPoint);
	i=720;j=0,stopPoint = 1100;
	fillTextPatterns("*",i,j,stopPoint);
	
}
//To fill cgsandstone Region
function drawcgStonePatterns()
{
	ctx.beginPath();
	ctx.fillStyle="blue";
	ctx.font="12px Verdana";
	ctx.lineWidth=2;
	i=400;j=160,stopPoint = 580;
	fillTextPatterns("\u2729",i,j,stopPoint);
	i=300;j=120,stopPoint = 650;
	fillTextPatterns("\u2729",i,j,stopPoint);
	i=400;j=80,stopPoint = 690;
	fillTextPatterns("\u2729",i,j,stopPoint);
	i=450;j=50,stopPoint = 690;
	fillTextPatterns("\u2729",i,j,stopPoint);
	i=500;j=20,stopPoint = 690;
	fillTextPatterns("\u2729",i,j,stopPoint);
	i=550;j=0,stopPoint = 690;
	fillTextPatterns("\u2729",i,j,stopPoint);
	i=750;j=230,stopPoint = 1050;
	while(j>=0)
	{
		fillTextPatterns("\u2729",i,j,stopPoint);
		i=i+55;j=j-30;stopPoint=stopPoint+55;
	}
	i=850;j=270,stopPoint = 950;
	fillTextPatterns("\u2729",i,j,stopPoint);
	ctx.closePath();
}
//To fill fgsandstone Region
function drawfgStonePatterns()
{
	ctx.beginPath();
	ctx.fillStyle="green";
	ctx.font="12px Verdana";
	ctx.lineWidth=2;
	i=600;j=200,stopPoint = 690;
	fillTextPatterns("\u25B2",i,j,stopPoint);
	i=630;j=170,stopPoint = 690;
	fillTextPatterns("\u25B2",i,j,stopPoint);
	i=960;j=320,stopPoint = 1300;
	while(j>180)
	{
		fillTextPatterns("\u25B2",i,j,stopPoint);
		i=i+50;j=j-30;stopPoint=stopPoint+40;
	}
	i=1250;j=160,stopPoint = 1450;
	while(j>0)
	{
		fillTextPatterns("\u25B2",i,j,stopPoint);
		i=i+50;j=j-30;
	}
	i=1100;j=360,stopPoint = 1200;
	fillTextPatterns("\u25B2",i,j,stopPoint);
}
//To fill Sandstone Region
function drawShalePatterns()
{
	ctx.beginPath();
	ctx.fillStyle="#581845";
	ctx.font="12px Verdana";
	ctx.lineWidth=2;
	i=1220;j=400,stopPoint = 1500;
	while(j>0)
	{
		fillTextPatterns("\u25B0",i,j,stopPoint);
		i=i+50;j=j-30;
	}	
	i=1330;j=430,stopPoint = 1500;
	fillTextPatterns("\u25B0",i,j,stopPoint);
	i=1410;j=460,stopPoint = 1500;
	fillTextPatterns("\u25B0",i,j,stopPoint);
	
	ctx.closePath();
}
//To fill Conglomerite Region
function drawLimePatterns()
{
	ctx.beginPath();
	ctx.fillStyle="#e1280b";
	ctx.font="12px Verdana";
	ctx.lineWidth=2;
	i=1490;j=480,stopPoint = 1500;
	fillTextPatterns("\u25C9",i,j,stopPoint);
	ctx.closePath();
}
function fillTextPatterns(pattern,xcoord,ycoord,stopPoint)
{
	while(xcoord<=stopPoint)
	{
		ctx.fillText(pattern,grid_size*xcoord/100,-grid_size*(ycoord)/100);
		xcoord=xcoord+50;
	}	
}

	
function divshow1()
{
	$('#resultContainer').empty();
	document.getElementById('scale').style.visibility="hidden";
	document.getElementById('direct').style.visibility="hidden";
	document.getElementById('legend').style.visibility="hidden";
	document.getElementById('mycanvas').style.visibility="hidden";
	$('#resultContainer').html('<img id="ctmap" style="position: absolute; left: 55px; top: 120px;" src="images/ctrmap1.png"/>');
}
function divshow2()
{
	$('#resultContainer').empty();
	document.getElementById('mycanvas').style.visibility="visible";
	document.getElementById('scale').style.visibility="visible";
	document.getElementById('direct').style.visibility="visible";
	document.getElementById('legend').style.visibility="visible";
	$('#mycanvas').css({'left':'125px','top':'160px'});
	$('#scale').css({'left':'590px','top':'170px'});
	$('#direct').css({'left':'590px','top':'210px'});
	$('#legend').css({'left':'590px','top':'250px'});
	$('#scinff').css({'left':'460px','top':'170px'});
	$('#direction').css({'left':'500px','top':'170px'});
	$('#legg').css({'left':'250px','top':'170px'});
}

	 
	
// // calc waypoints traveling along vertices(for line tracing)
function calcWaypoints(vertices) {
    var waypoints = [];
    for (var i = 1; i < vertices.length; i++) {
        var pt0 = vertices[i - 1];
        var pt1 = vertices[i];
		var dx = pt1.x - pt0.x;
        var dy = pt1.y - pt0.y;
        for (var j = 0; j < 100; j++) {
            var x = pt0.x + dx * j / 100;
            var y = pt0.y + dy * j / 100;
            waypoints.push({
                x:x,
                y:y
            });
        }
    }
    return (waypoints);
}

// //-------function for array formation--------------
function formArray(x1,y1,x2,y2)
{
	var farray = [];
	farray.push({
		x:x1,
		y:y1
	});
	farray.push({
		x:x2,
		y:y2
	});
	return (farray);
}




//--------------drawing tunnel()
function drawTunnel90()
{
	ctx.moveTo(grid_size*tun1x/100,-grid_size*(tun1y-1000)/100);
	ctx.lineTo(grid_size*tun1x/100+10,-grid_size*(tun1y-1000)/100);
	//pctx.font="12px verdana";
	ctx.lineWidh="1";
	ctx.strokeStyle="black";
	ctx.stroke();
	//pctx.fillText(dotmarkers[paperpointab],xx,190);
	//pctx.fill();
	tun1x += 10;
	if (tun1x<=1510) requestAnimationFrame(drawTunnel90) 
		if(tun1x>1510)
			ctx.closePath();
}
function drawTunnel110()
{
	ctx.moveTo(grid_size*tun2x/100,-grid_size*(tun2y-1000)/100);
	ctx.lineTo(grid_size*tun2x/100+10,-grid_size*(tun2y-1000)/100);
	//pctx.font="12px verdana";
	ctx.lineWidh="1";
	ctx.strokeStyle="black";
	ctx.stroke();
	//pctx.fillText(dotmarkers[paperpointab],xx,190);
	//pctx.fill();
	tun2x += 10;
	if (tun2x<=1510) requestAnimationFrame(drawTunnel110) 
		if(tun2x>1510)
		{
			ctx.closePath();
			document.getElementById('nextButton').style.visibility="visible";
			ctx.beginPath();
			ctx.font="10px verdana";
			ctx.fillStyle="black"
			ctx.fillText("Tunnel",grid_size*650/100,-grid_size*1200/100);
			ctx.fill();
			ctx.closePath();
		}
}




//-----animating line draw on paper------------
function drawpp(lineColor)
	{
		if(lin == 0)
		{
			pctx.moveTo(xx,yy);
			pctx.lineTo(xx,yy+2);
			//pctx.font="12px verdana";
			pctx.lineWidh="1";
			pctx.strokeStyle=lineColor;
			pctx.stroke();
			//pctx.fillText(dotmarkers[paperpointab],xx,190);
			//pctx.fill();
			yy += 1;
			if (yy<=15) requestAnimationFrame(drawpp) 
		}
		else if(lin == 1)
		{
			pctx2.moveTo(xx,yy);
			pctx2.lineTo(xx,yy+2);
			//pctx.font="12px verdana";
			pctx2.lineWidh="1";
			pctx2.strokeStyle="red";
			pctx2.stroke();
			//pctx.fillText(dotmarkers[paperpointab],xx,190);
			//pctx.fill();
			yy += 1;
			if (yy<=15) requestAnimationFrame(drawpp)   
		}
	}
	
	


//---marking animation with pencil---------
function animate() {
		if(lin == 0)
		{
			ctx.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
			ctx.drawImage(imgTag, x, y);                       // draw image at current position
			y += 1;
			if (y <=190) requestAnimationFrame(animate) 			  // loop
		}	
		else if(lin == 1)
		{
			ctx2.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
			ctx2.drawImage(imgTag, x, y);                       // draw image at current position
			y += 1;
			if (y <=190) requestAnimationFrame(animate) 			  // loop
		}	
}
		
		
//-----------plot on paper for dotted line-----------
function plotonpaperab()
{
	document.getElementById('cmap').style.visibility="hidden";
	if (paperpointab < 6) {
		setTimeout(function()
		{
			requestAnimationFrame(plotonpaperab);
		},500);
    }
	if(paperpointab==6)
		{
			spanclick=0;
			setTimeout(function()
			{
				document.getElementById('dotpoints').style.visibility="hidden";
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				document.getElementById('paper').style.visibility="hidden";
				document.getElementById('dotplot').style.visibility="visible";
				document.getElementById('nextButton').style.visibility="visible";
			},1500);
			ctx.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
		}
	pctx.beginPath();
	if(paperpointab == 0)
	{
			x =107+(paperpointab*35);
			y = 175;
			xx = 27+(paperpointab*35);
			yy = 0;
			lcolor = "blue";
			pctx.font="12px verdana";
			pctx.fillText(dotmarkers[paperpointab],27+(paperpointab*35),30);
			pctx.fill();
			drawpp(lcolor);
			animate(x,y);
	}
	else if(paperpointab == 1)
	{
		x = 202+(paperpointab*35);
		y = 175;
		xx = 122+(paperpointab*35);
		yy = 0;
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],122+(paperpointab*35),30);
		pctx.fill();
		drawpp(lcolor);
		animate(x,y);	
	}
	else if(paperpointab == 2)
	{
		x = 262+(paperpointab*35);
		y = 175;
		xx = 182+(paperpointab*35);
		yy = 0;
		lcolor = "red";
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],182+(paperpointab*35),30);
		pctx.fill();
		drawpp(lcolor);
		animate(x,y);	
	}
	else if(paperpointab == 3)
	{
		x = 240+(paperpointab*35);
		y = 175;
		xx = 160+(paperpointab*35);
		yy = 0;
		lcolor = "red";
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],160+(paperpointab*35),30);
		pctx.fill();
		drawpp(lcolor);
		animate(x,y);	
	}
	else if(paperpointab == 4)
	{
		x =220+(paperpointab*35);
		y = 175;
		xx = 140+(paperpointab*35);
		yy = 0;
		lcolor = "blue";
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],140+(paperpointab*35),30);
		pctx.fill();
		drawpp(lcolor);
		animate(x,y);
	}
	else if(paperpointab == 5)
	{
		x = 275+(paperpointab*35);
		y = 175;
		xx = 195+(paperpointab*35);
		yy = 0;
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],195+(paperpointab*35),30);
		pctx.fill();
		drawpp(lcolor);
		animate(x,y);
	}
	else if(paperpointab == 6)
	{
		x = 342+(paperpointab*35);
		y = 175;
		xx = 262+(paperpointab*35);
		yy = 0;
		pctx.font="12px verdana";
		pctx.fillText(dotmarkers[paperpointab],262+(paperpointab*35),30);
		pctx.fill();
		drawpp(lcolor);
		animate(x,y);
	}
	
	paperpointab++;
}




		
//-----------plot on paper for solidline line-----------
function plotonpapercd()
{
	document.getElementById('cmap').style.visibility="hidden";
	if (paperpointcd < 4) {
		setTimeout(function()
		{
			requestAnimationFrame(plotonpapercd);
		},500);
    }
	if(paperpointcd==4)
		{
			spanclick=2;
			// lin=1;
			setTimeout(function()
			{
				ctx2.clearRect(0, 0, canvas.width, canvas.height);
				document.getElementById('paper2').style.visibility="hidden";
				document.getElementById('solidplot').style.visibility="visible";
				document.getElementById('nextButton').style.visibility="visible";
			},1500);
			ctx2.clearRect(0, 0, canvas.width, canvas.height);  // clear canvas
		}
	pctx2.beginPath();
	if(paperpointcd == 0)
	{
			x = 160+(paperpointcd*35);
			y = 175;
			xx = 79+(paperpointcd*35);
			yy = 0;
			pctx2.font="12px verdana";
			pctx2.fillText(solidmarkers[paperpointcd],+(paperpointcd*35),30);
			pctx2.fill();
			drawpp();
			animate(x,y);
	}
	else if(paperpointcd == 1)
	{
		x = 211+(paperpointcd*35);
		y = 175;
		xx = 132+(paperpointcd*35);
		yy = 0;
		pctx2.font="12px verdana";
		pctx2.fillText(solidmarkers[paperpointcd],132+(paperpointcd*35),30);
		pctx2.fill();
		drawpp();
		animate(x,y);	
	}
	else if(paperpointcd == 2)
	{
		x = 308+(paperpointcd*35);
		y = 175;
		xx = 229+(paperpointcd*35);
		yy = 0;
		pctx2.font="12px verdana";
		pctx2.fillText(solidmarkers[paperpointcd],229+(paperpointcd*35),30);
		pctx2.fill();
		drawpp();
		animate(x,y);	
	}
	else if(paperpointcd == 3)
	{
		x = 356+(paperpointcd*35);
		y = 175;
		xx = 277+(paperpointcd*35);
		yy = 0;
		pctx2.font="12px verdana";
		pctx2.fillText(solidmarkers[paperpointcd],277+(paperpointcd*35),30);
		pctx2.fill();
		drawpp();
		animate(x,y);	
	}
	else if(paperpointcd == 4)
	{
		x =401+(paperpointcd*35);
		y = 175;
		xx = 322+(paperpointcd*35);
		yy = 0;
		pctx2.font="12px verdana";
		pctx2.fillText(solidmarkers[paperpointcd],322+(paperpointcd*35),30);
		pctx2.fill();
		drawpp();
		animate(x,y);
	}
	paperpointcd++;
}



//flow of drawing profile view graph
function drawXaxis()
{
	//drawing X-axis and horizontal grid lines
	for(var i=0;i<=num_lines_x;i++)
	{
		ctx.beginPath();
		ctx.lineWidth = 1;
		// if(i == xaxis_distance_gridlines)
		// {             
			// ctx.lineWidth = 2;
			// ctx.strokeStyle = "#000000";
		// }		else
			ctx.strokeStyle ='pink';	
		if(i == num_lines_x){
			ctx.moveTo(0,grid_size*i);
			ctx.lineTo(canvas_width,grid_size*i);
		}
		else{
			ctx.moveTo(0, grid_size*i+0.5);
        	ctx.lineTo(canvas_width, grid_size*i+0.5);
   		}
   	 	ctx.stroke();
	}
}
function drawYaxis()
{
	for(i=0; i<=num_lines_y; i++) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		
		// If line represents Y-axis draw in different color
		// if(i == yaxis_distance_gridlines)
		// { 
			// ctx.lineWidth = 2;
			// ctx.strokeStyle = "#000000";
		// }
		// else
			ctx.strokeStyle = "pink";
		
		if(i == num_lines_y) { 
			ctx.moveTo(grid_size*i, 0);
			ctx.lineTo(grid_size*i, canvas_height);
		}
		else {
			ctx.moveTo(grid_size*i+0.5, 0);
			ctx.lineTo(grid_size*i+0.5, canvas_height);
		}
	ctx.stroke();
	}
	
}
//plotting x axis animation
function plotXaxis()
{
	
 if (tx < xpoints.length - 1) {
        requestAnimationFrame(plotXaxis);
    }
	
    // draw a line segment from the last waypoint
    // to the current waypoint
	 if (tx == xpoints.length-1) {
		document.getElementById('cmap').style.visibility="visible"  
		document.getElementById('cmap').innerHTML="Plot Y-Axis";	
		}
    ctx.beginPath();
	ctx.lineWidth=2;
	ctx.strokeStyle="black";
    ctx.moveTo(xpoints[tx - 1].x, xpoints[tx - 1].y);
    ctx.lineTo(xpoints[tx].x, xpoints[tx].y);
    ctx.stroke();
	ctx.closePath();
    tx++;
}
//plotting y axis animation
function plotYaxis()
{
	
 if (ty < ypoints.length - 1) {
        requestAnimationFrame(plotYaxis);
    }
    // draw a line segment from the last waypoint
    // to the current waypoint
    ctx.beginPath();
	ctx.lineWidth=2;
	ctx.strokeStyle="black";
    ctx.moveTo(ypoints[ty - 1].x, ypoints[ty - 1].y);
    ctx.lineTo(ypoints[ty].x, ypoints[ty].y);
    ctx.stroke();
	ctx.closePath();
    ty++;
}
function origin()
{
	//Name origin as 0 for AB line
	ctx.beginPath();
	ctx.font = '10px Verdana';
	ctx.fillText("(0,0)",-40,15); 
	ctx.fill();
	ctx.closePath();
	
}
function tickXaxis()
{
	
	//----for AB line----------
	for(i=1; i<(num_lines_x+5); i++) {
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";

		// Draw a tick mark 6px long (-3 to 3)
		ctx.moveTo(grid_size*i+0.5, -3);
		ctx.lineTo(grid_size*i+0.5, 3);
		ctx.stroke();
		
		// Text value at that point
		ctx.font = '10px Verdana';
		ctx.textAlign = 'start';
		ctx.fillText(yaxis_starting_point.number*i + xaxis_starting_point.suffix, grid_size*i, 15);
		ctx.stroke();
		ctx.closePath();
	}	
	
}
function tickYaxis()
{
	//Positive Y-axis of graph is negative Y-axis of the canvas
	//------------for AB line----------
	for(i=1; i<(num_lines_y); i++) {
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = "black";

		// Draw a tick mark 6px long (-3 to 3)
		ctx.moveTo(-3, -grid_size*i+0.5);
		ctx.lineTo(3, -grid_size*i+0.5);
		ctx.stroke();

		// Text value at that point
		ctx.font = '10px Verdana';
		ctx.textAlign = 'start';
		ctx.fillText(xaxis_starting_point.number*i + xaxis_starting_point.suffix, -30,-grid_size*i);
		ctx.stroke();
		ctx.closePath();
	}
	
	
}
function drawtriangle()
{
	//-----------for AB line ------------
	ctx.beginPath();
	ctx.strokeStyle="black";
	ctx.fillStyle="black";
	ctx.font = "20px Verdana Bold";
	ctx.fillText("Y",-(grid_size*(50/100)),-(grid_size*(960/100)));
	ctx.moveTo(0,-(grid_size*(1000/100)));
	ctx.lineTo(-(grid_size*(20/100)),-(grid_size*(970/100)));
	ctx.lineTo((grid_size*(20/100)),-(grid_size*(970/100)));
	ctx.lineTo(0,-(grid_size*(1000/100)));
	ctx.fillText("X\u0027",grid_size*(1580/100),-(grid_size*(-50/100)));
	ctx.moveTo(grid_size*(1620/100),-(grid_size*(0/100)));
	ctx.lineTo(grid_size*(1580/100),-(grid_size*(20/100)));
	ctx.lineTo((grid_size*(1580/100)),-(grid_size*(-20/100)));
	ctx.lineTo(grid_size*(1620/100),-(grid_size*(0/100)));
	ctx.fill();
	ctx.closePath();
	document.getElementById('cmap').style.visibility ="visible";
	document.getElementById('cmap').innerHTML ="Points on X-Axis";
}
function namescale()
{
	//Name origin as 0
	ctx.beginPath();
	ctx.font = '14px Verdana';
	ctx.fillText("Scale",350,-300); 
	ctx.fillText("X-Axis:1cm=100m",350,-280); 
	ctx.fillText("Y-Axis:1cm=100m",350,-260); 
	ctx.fill();
	ctx.closePath();
}
function setcanvas()
{
	ctx2.translate(yaxis_distance_gridlines*grid_size,xaxis_distance_gridlines*grid_size);
	setTimeout(function()
	{
		showarrow();
	},500);
}
function showarrow()
{
	document.getElementById('mycanvas2').style.visibility="visible";
	setTimeout(function()
	{
		ctx2.clearRect(0, 0, 605, 400); 		
		ctx2.drawImage(imgTag1,grid_size*(270/100), -grid_size*(662/100));
		document.getElementById('x1').innerHTML="270";
	},2500);
	setTimeout(function()
	{
		ctx2.clearRect(grid_size*(260/100),-grid_size*(662/100), 15,234); 		
		ctx2.drawImage(imgTag1,grid_size*(510/100), -grid_size*(662/100));
		document.getElementById('x2').innerHTML="520";
	},3500);
	setTimeout(function()
	{
		ctx2.clearRect(grid_size*(510/100),-grid_size*(662/100), 15,234); 		
		ctx2.drawImage(imgTag1,grid_size*(915/100), -grid_size*(662/100));
		document.getElementById('x3').innerHTML="925";
	},4500);
	setTimeout(function()
	{
		ctx2.clearRect(grid_size*(915/100),-grid_size*(662/100), 15,234); 		
		ctx2.drawImage(imgTag1,grid_size*(1180/100), -grid_size*(662/100));
		document.getElementById('x4').innerHTML="1180";
	},5500);
	setTimeout(function()
	{
		ctx2.clearRect(grid_size*(1170/100),-grid_size*(662/100), 15,234); 		
		ctx2.drawImage(imgTag1,grid_size*(1430/100), -grid_size*(662/100));
		document.getElementById('x5').innerHTML="1450";
	},6500);
	setTimeout(function()
	{
		ctx2.clearRect(grid_size*(1440/100),-grid_size*(662/100), 15,234); 
		document.getElementById('mycanvas2').style.visibility="hidden";
		document.getElementById('solidpic').style.visibility="hidden";
		document.getElementById('nextButton').style.visibility="visible";
	},7500);
}
// table show()
function showtable()
{
	if( tablesh == 0 )
	{
		document.getElementById('dottable').style.visibility="visible";		
		$('#dottable').show().find('tr').each(function (i,item){  
		  var $row = $(item); 
			$row.hide();  
			$row.delay(i*200).fadeIn(200); 	
		});
		document.getElementById('cmap').innerHTML="Click on Points<br> to plot";
	}
	else if( tablesh == 1 )
	{
		document.getElementById('solidtable1').style.visibility="visible";		
		// $('#solidtable1').show().find('tr').each(function (i,item){  
		  // var $row = $(item); 
			// $row.hide();  
			// $row.delay(i*200).fadeIn(200); 	
		// });
		document.getElementById('cmap').style.visibility="hidden"
		setcanvas();
	}
	   
}





function endLine()
{
	//Endline Y';
	ctx.beginPath();
	ctx.lineWidth=2;
	ctx.font = "20px Verdana Bold";
	ctx.strokeStyle="#000000";
	ctx.fillStyle="#000000";
	ctx.moveTo(grid_size*(1520/100),-canvas_height);
	ctx.lineTo(grid_size*(1520/100),-(grid_size*(0/100)-(grid_size+15)));
	ctx.moveTo(grid_size*(1520/100),-(grid_size*(1000/100)));
	ctx.lineTo(grid_size*(1500/100),-(grid_size*(970/100)));
	ctx.lineTo((grid_size*(1540/100)),-(grid_size*(970/100)));
	ctx.lineTo(grid_size*(1520/100),-(grid_size*(1000/100)));
	ctx.fillText("Y'",grid_size*(1575/100),-(grid_size*(960/100)));
	ctx.fill();
	ctx.stroke();
	ctx.closePath();
}

function drawFalutLine()
{
	ctx.beginPath();
	ctx.lineWidth=2;
	ctx.font = "20px Verdana Bold";
	ctx.strokeStyle="#000000";
	ctx.fillStyle="green";
	ctx.moveTo(grid_size*(710/100),-(grid_size*(0/100)));
	ctx.lineTo(grid_size*(710/100),-(grid_size*(240/100)));
	ctx.fillText("u",grid_size*(710/100),-(grid_size*(250/100)));
	ctx.fillText("j'",grid_size*(710/100),-(grid_size*(-40/100)));
	ctx.fillText("FF",grid_size*(720/100),-(grid_size*(450/100)));
	ctx.stroke();
	ctx.closePath();
	ctx.beginPath();
	ctx.lineWidth=2;
	ctx.font = "20px Verdana Bold";
	ctx.strokeStyle="#000000";
	ctx.setLineDash([2,1]);
	ctx.moveTo(grid_size*(710/100),-(grid_size*(240/100)));
	ctx.lineTo(grid_size*(710/100),-(grid_size*(550/100)));
	ctx.stroke();
	ctx.closePath();
	document.getElementById("nextButton").style.visibility = "visible";
}

function namePoints()
{
	ctx.beginPath();
	ctx.lineWidth=2;
	ctx.font = "20px Verdana Bold";
	ctx.fillStyle="blue";
	ctx.fillText("a",grid_size*(120/100),-(grid_size*(120/100)));
	ctx.fillText("b",grid_size*(490/100),-(grid_size*(220/100)));
	ctx.fillText("e",grid_size*(870/100),-(grid_size*(320/100)));
	ctx.fillText("f",grid_size*(1150/100),-(grid_size*(420/100)));
	ctx.fillText("g",grid_size*(1480/100),-(grid_size*(520/100)));
	ctx.fillStyle="red";
	ctx.fillText("p",grid_size*(270/100),-(grid_size*(160/100)));
	ctx.fillText("q",grid_size*(520/100),-(grid_size*(228/100)));
	ctx.fillText("r",grid_size*(925/100),-(grid_size*(340/100)));
	ctx.fillText("s",grid_size*(1180/100),-(grid_size*(430/100)));
	ctx.fillText("t",grid_size*(1450/100),-(grid_size*(510/100)));
	// ctx.fillText("F",grid_size*(710/100),-(grid_size*(260/100)));
	// ctx.fillText("F'",grid_size*(710/100),-(grid_size*(-20/100)));
	ctx.stroke();
	ctx.closePath();
	document.getElementById("nextButton").style.visibility = "visible";
}

function plotPointsofRoad()
{
	ctx.beginPath();
	ctx.lineWidth=2;
	ctx.font = "14px Verdana Bold";
	ctx.fillStyle="brown";
	ctx.strokeStyle="red";
	ctx.fillText("\u26AB",grid_size*(780/100),-(grid_size*(260/100)));
	ctx.fillText("\u26AB",grid_size*(820/100),-(grid_size*(270/100)));
	ctx.fillText("ROAD",grid_size*(740/100),-(grid_size*(300/100)));
	// ctx.fillText("d",grid_size*(820/100),-(grid_size*(300/100)));
	ctx.stroke();
	ctx.closePath();
	var q2 = Object.create(questions);												
	generateQuestion(q2,"Which are the road points identified in this map? ","","a & b","p & q","s & r","C & D",4,nextButtonProceed,100,150,300,120);}

function showCalculationMethod(elem)
{
	var fid = elem.id;
	if(fid == "found")
	{
		document.getElementById("f11").style.visibility = "visible";
		document.getElementById("f2").style.visibility = "hidden";
		document.getElementById("found").style.visibility = "visible";
		document.getElementById("can7-1").style.visibility = "visible";
		document.getElementById("can7-1").src = "images/tt.PNG";
	}
	else if(fid == "notfound")
	{
		document.getElementById("f11").style.visibility = "hidden";
		document.getElementById("f2").style.visibility = "visible";
		document.getElementById("notfound").style.visibility = "visible";
		document.getElementById("can7-1").style.visibility = "visible";
		document.getElementById("can7-1").src = "images/tt2.png";
		document.getElementById("nextButton").style.visibility = "visible";
	}
}

function jpoints(x,y)
{
	ctx.lineTo(x,y);
	ctx.stroke();
}

function joinPoints()
{
	if (jpts < finalPoints.length) {
		setTimeout(function()
		{
			requestAnimationFrame(joinPoints);
		},500);
    }
	if(jpts==finalPoints.length)
		{
			jpoints(grid_size*(1520/100),-grid_size*(520)/100);
			ctx.closePath();
			document.getElementById('cmap').style.visibility ="visible";
			document.getElementById('cmap').innerHTML ="Name Points";
			spanclick = 13;
			// document.getElementById('nextButton').style.visibility="visible";
		}
	//Join Points
	ctx.strokeStyle="maroon";
	ctx.lineWidth=1;
		if(jpts == 0 || jpts == 1 || jpts == 2 || jpts == 3 || jpts == 4 || jpts == 5)
		{	
			jpoints(grid_size*(finalPoints[jpts][0]/100),-grid_size*(finalPoints[jpts][1])/100);
		}
	jpts++;
}
function nextLineToDraw()
{
	if(simsubscreennum == 14)
	{
		if(drip==1)
			setDialog("From the point q, draw a line  at an angle θ   with  horizontal in clockwise direction  and extend it till the bounds  that is  FF LINE and the curve. And its point of intersection on FF LINE be q’(710,110).",100,185,140,380);
		else if(drip==2)
			setDialog("From the point r , draw a line  at an angle θ   with  horizontal in clockwise direction  and extend it till the bounds  that is  Y’ line and the curve. And its point of intersection on x-axis be r’ and extrapolate it till its cuts the FF LINE that is at POINT Z(710,420).",100,185,150,400);
		else if(drip==3)
			setDialog("From the point s, draw a line  at an angle θ   with  horizontal in clockwise direction  and extend it till the bounds  that is  Y’ line and  the curve. And its point of intersection on x-axis be s’",100,185,140,380);
		else if(drip==4)
			setDialog("From the point t, draw a line  at an angle θ   with  horizontal in clockwise direction  and extend it till the bounds  that is  X axis and  the curve. And its point of intersection on x-axis be t’",100,185,140,380);
		else if(drip==5)
			setDialog("From the point u, draw a line  at an angle θ   with  horizontal in clockwise direction  and extend it till the bounds  that is  X-axis and the curve. And its point of intersection on x-axis be u’",100,185,140,380);
	}
	else if(simsubscreennum == 15)
	{
		if(drip==1)
			setDialog("Area Bounded by qq’p’p and  uu’r’r  on the graph is Course grained Sandstone.",100,185,100,350);
		else if(drip==2)
			setDialog("Area bounded between uq’q and rr’s’s on the graph is Fine grained Sandstone.",100,185,100,350);
		else if(drip==3)
			setDialog("Area bounded between s’stt’ on the graph is Shale.",100,185,100,350);
		else if(drip==4)
			setDialog("Area bounded between tt’ and Y’ axis on the graph is Limestone.",100,185,100,350);
		else if(drip == 5)
		{
			document.getElementById('nextButton').style.visibility="visible";
			document.getElementById('legend').style.visibility="visible";
		}
	}
	else if(simsubscreennum == 16)
	{
		if(faultStep==1)
			setDialog("For the rock present on the left of LINE FF mark its highest boundary elevation on the graph that is here POINT q and extend it that is cuts the line FF at point q.’",100,185,150,350);
		else if(faultStep==2)
			setDialog("For the rock present on the right of LINE FF mark its boundary elevation on the graph that is here POINT r and extend it that is cuts the line FF at point Z.",100,185,150,350);
		else if(faultStep==3)
			setDialog("Difference in the Y-coordinate of point Z and q’ will give the downthrow value of the fault.",100,185,150,350);
		else if(faultStep == 4)
		{
			document.getElementById('nextButton').style.visibility="visible";
		}
	}
}
function chkdrip()
{
	if(drip==0)
	{
		document.getElementById('pp').style.visibility="visible";
		ids=$('#s1').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);	
	}
	else if(drip==1)
	{
		document.getElementById('qq').style.visibility="visible";
		ids=$('#s2').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==2)
	{
		document.getElementById('rr').style.visibility="visible";
		ids=$('#s3').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==3)
	{
		document.getElementById('ss').style.visibility="visible";
		ids=$('#s4').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==4)
	{
		document.getElementById('ttt').style.visibility="visible";
		ids=$('#s5').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==5)
	{
		document.getElementById('uu').style.visibility="visible";
		ids=$('#s6').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
}
function chkdrip2()
{
	if(drip==0)
	{
		document.getElementById('congo').style.visibility="visible";
		ids=$('#s111').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	if(drip==1)
	{
		document.getElementById('cgstone').style.visibility="visible";
		ids=$('#s22').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==2)
	{
		document.getElementById('fgstone').style.visibility="visible";
		ids=$('#s33').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==3)
	{
		document.getElementById('shale').style.visibility="visible";
		ids=$('#s44').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	else if(drip==4)
	{
		document.getElementById('lime').style.visibility="visible";
		ids=$('#s55').attr('id');
		myInt = setInterval(function(){ animatearrow(ids); }, 500);
	}
	
}

 function printCalculation(sline,cn82,cn83,cn84,cn85,cn86,cn87,tval)
 {
	 setTimeout(function()
	{
		document.getElementById('can8-2').style.visibility="visible";
		$('#can8-2').html(cn82);
		document.getElementById('can8-3').style.visibility="visible";
		$('#can8-3').html(cn83);
		document.getElementById('can8-4').style.visibility="visible";
		$('#can8-4').html(cn84);
	},1500);
	setTimeout(function()
	{
		$('#can8-5').html(cn85);
		document.getElementById('can8-5').style.visibility="visible";
	},3500);
	setTimeout(function()
	{
		$('#can8-6').html(cn86);
		document.getElementById('can8-6').style.visibility="visible";
	},5500);
	setTimeout(function()
	{
		$('#can8-7').html(cn87);
		document.getElementById('can8-7').style.visibility="visible";
	},7500);
	setTimeout(function()
	{
		document.getElementById('can8-7').style.visibility="hidden";
		$('#can8-8').html("Index="+tval);
		$('#yval'+(sline+1)).html(tval);
		document.getElementById('can8-8').style.visibility="visible";
		setTimeout(function()
		{
			resetTable(tval);
		},500);
	},9500);
 }
 function resetTable(tval)
 {
	if(solidline<4)
			document.getElementById('nb').style.visibility="visible";
	else if(solidline == 4)
	{
		setTimeout(function()
		{
			document.getElementById('select8-1').style.visibility="hidden";			
			document.getElementById('select8-2').style.visibility="hidden";			
			document.getElementById('can8-1').style.visibility="hidden";			
			document.getElementById('can8-2').style.visibility="hidden";			
			document.getElementById('can8-3').style.visibility="hidden";			
			document.getElementById('can8-4').style.visibility="hidden";			
			document.getElementById('can8-5').style.visibility="hidden";			
			document.getElementById('can8-6').style.visibility="hidden";			
			document.getElementById('can8-8').style.visibility="hidden";	
			document.getElementById('img8-1').style.visibility="hidden";	
			document.getElementById('table1').style.visibility="hidden";
			document.getElementById('p5').style="color:black;background-color:white";		
			$('label').css({'visibility':'hidden'});
			$('#table2').css({'left':'250px','top':'50px'});
			document.getElementById('nextButton').style.visibility="visible";	
		},500); 
	}
 }
 function setColorTable(sline)
 {
	 if(sline == 0 || sline == 1 || sline == 2 || sline == 3)
	 {
		document.getElementById("p"+(sline+1)).style="color:white;background-color:blue";
		document.getElementById("mn"+(sline+1)).style="color:white;background-color:red";
		document.getElementById("mn"+(sline+2)).style="color:white;background-color:green";
	 }
	 else if(sline == 4)
	 {
		document.getElementById("p"+(sline+1)).style="color:white;background-color:blue";
		document.getElementById("mn"+(sline)).style="color:white;background-color:red";
		document.getElementById("mn"+(sline+1)).style="color:white;background-color:green";
	 }
 }
 function removeColorTable(sline)
 {
	 if(sline == 1 || sline == 2 || sline == 3 || sline == 4 )
	 {
		document.getElementById("p"+(sline)).style="color:black;background-color:white";
		document.getElementById("mn"+(sline)).style="color:black;background-color:white";
		document.getElementById("mn"+(sline+1)).style="color:black;background-color:white";
	 }
 }

function calculateDownThrow()
{
	if(faultStep == 0)
	{
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.fillStyle="red";
		ctx.fillText("Conglomerate",grid_size*(710/100),-(grid_size*(90/100)));
		ctx.stroke();
		setTimeout(function()
		{
			faultStep++;
			nextLineToDraw();
		},1000);
	}
	else if(faultStep == 1)
	{
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.strokeStyle="red";
		ctx.setLineDash([2,1]);
		ctx.moveTo(grid_size*(520/100),-(grid_size*(208/100)));
		ctx.lineTo(grid_size*(710/100),-(grid_size*(110/100)));	
		ctx.stroke();
		setTimeout(function()
		{
			faultStep++;
			nextLineToDraw();
		},1000);
	}
	else if(faultStep == 2)
	{
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.strokeStyle="red";
		ctx.setLineDash([2,1]);
		ctx.moveTo(grid_size*(925/100),-(grid_size*(320/100)));
		ctx.lineTo(grid_size*(710/100),-(grid_size*(430/100)));	
		ctx.stroke();
		ctx.closePath();
		setTimeout(function()
		{
			faultStep++;
			nextLineToDraw();
		},1000);
	}
	else if(faultStep == 3)
	{
		ctx.beginPath();
		ctx.lineWidth = 4;
		ctx.strokeStyle="blue";
		ctx.moveTo(grid_size*(710/100),-(grid_size*(110/100)));
		ctx.lineTo(grid_size*(710/100),-(grid_size*(430/100)));	
		ctx.stroke();
		ctx.closePath();
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle="black";
		ctx.moveTo(grid_size*(600/100),-(grid_size*(110/100)));
		ctx.lineTo(grid_size*(710/100),-(grid_size*(110/100)));
		ctx.moveTo(grid_size*(600/100),-(grid_size*(430/100)));
		ctx.lineTo(grid_size*(710/100),-(grid_size*(430/100)));
		ctx.moveTo(grid_size*(650/100),-(grid_size*(110/100)));
		ctx.lineTo(grid_size*(650/100),-(grid_size*(430/100)));
		ctx.fillText("Downthrow of the fault = 310m",grid_size*(10/100),-(grid_size*(300/100)));
		ctx.stroke();
		ctx.closePath();
		setTimeout(function()
		{
			faultStep++;
			nextLineToDraw();
		},1000);
	}
}
 
 function setDialog(textContent,leftPos,topPos,heightVal,widthVal)
{
	document.getElementById("divp").innerHTML = textContent;
	document.getElementById('dialog-div').style.left=leftPos+"px";											
	document.getElementById('dialog-div').style.top=topPos+"px";												
	document.getElementById('dialog-div').style.height=heightVal+"px";
	document.getElementById('dialog-div').style.width=widthVal+"px";
	document.getElementById('dialog-div').style.visibility="visible";											
}
function hideDialog()
{
	document.getElementById("dialog-div").style.visibility = "hidden";
	if(simsubscreennum == 14)
		chkdrip();
	else if(simsubscreennum == 15)
		chkdrip2();
	else if(simsubscreennum == 16)
		calculateDownThrow();
}	
 function nextButtonProceed()
{
	document.getElementById('nextButton').style.visibility="visible";
}