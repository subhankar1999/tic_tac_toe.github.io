console.log('Welcome to tic toc toe game');
let turn ='X';
console.log(turn);
 let gameover = false;
let tab = new Audio("tab.wav");

const changeTurn = ()=>{
    return turn === 'X' ? '0':'X';
}

const checkForWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let win = document.getElementById('win');
   
    let wins = [
        [0,1,2,0,65,0],
        [3,4,5,0,195,0],
        [6,7,8,0,325,0],
        [0,3,6,-130,195,90],
        [1,4,7,0,195,90],
        [2,5,8,130,195,90],
        [0,4,8,0,195,45],
        [2,4,6,0,195,135]
    ]
    
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")){
            gameover = true;
            win.innerHTML = "Computer Win";
            win.style.display = 'block';
            document.querySelector('.line').style.width = "390px";
            document.querySelector('.line').style.transform = `translate(${e[3]}px,${e[4]}px) rotate(${e[5]}deg)`;
        }
    })
}

let board = [];
for(let i = 0; i<9; i++)
board[i] = "";

function is_win()
{
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    wins.forEach(e =>{
        if((board[e[0]] === board[e[1]]) && (board[e[2]] === board[e[1]]) && (board[e[0]] !== "")){
            return true;
        }
    })
    return false;
}

function isMovesLeft()
{
    for(let i=0; i<9; i++)
    if(board[i] === "")
    return true;
    return false;
}

function checkwinner()
{
	for(let i=0;i<9;i+=3)
    {
        if(board[i]===board[i+1] && board[i+1]===board[i+2])
        {
        	if(board[i]==="O")
            return 10;
            else if(board[i]==="X")
            return -10;
        }
    }
    
    for(let i=0;i<3;i++)
    {
        if(board[i]===board[i+3] && board[i+3]===board[i+6])
        {
        	if(board[i]==="O")
            return 10;
            else if(board[i]==="X")
            return -10;
        }
    }
    
    if((board[0]===board[4] && board[4]===board[8]))
    {
        if(board[0]==="O")
    	return 10;
    	else if(board[0]==="X")
    	return -10;
    }
    if((board[2]===board[4] && board[4]===board[6]))
    {
    	if(board[2]==="O")
    	return 10;
    	else if(board[2]==="X")
    	return -10;
	}
	
	return 0; //in case of draw
}

function minimax(depth,ismaximize)
{
	//Base Case
	let score = checkwinner();
	if(score===10)
	return (score-depth);
	if(score===-10)
	return (score+depth);
	if(!isMovesLeft())
	return 0;
	
	if(ismaximize)
	{
		 let bestscore=-100;
		
		for(let x=0;x<9;x++)
		{
				if(board[x]==="")
				{
					board[x]="O";
					bestscore=Math.max(bestscore,minimax(depth+1,false));
					board[x]="";
				}
		}
		return bestscore;
	}
	else
    {
		 let bestscore=100;
		
		for(let x=0;x<9;x++)
		{
				if(board[x]==="")
				{
					board[x]="X";
					bestscore=Math.min(bestscore,minimax(depth+1,true));
					board[x]="";
				}
		}
		return bestscore;
	}
}

let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click',()=>{
        let pos = element.id.substring(3);
        
        if(boxtext.innerText === "" && !gameover)
        {
            boxtext.innerText = turn;
           
            board[pos] = "X";
           
            tab.play();
           
            checkForWin();
            
           
            if(isMovesLeft())
            {
                let best= -1000;
                let pos1 = -1;
                for(let j=0;j<9;j++)
                {
                    if(board[j]==="")  //if cell is empty
                    {
                        board[j]="O";
                        let curr = minimax(0,false);
                        board[j]="";
                        
                        if(curr>best)
                        {
                            best=curr;
                            pos1 = j;
                        }
                    }
                }
               // console.log(best);
                board[pos1] = "O";
                let str = "box" + pos1;
               // console.log(str);
                let cur_box = document.getElementById(str);
               // console.log(cur_box);
                let boxtest = cur_box.querySelector('.boxtext');

                boxtest.innerText = "O";
                checkForWin();

            }
            else
            {
                let win = document.getElementById('win');
                win.innerHTML = "Match Draw";
                win.style.display = 'block';
            }
           
        }
    })
})