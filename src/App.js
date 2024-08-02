import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef} from 'react';
import blking from './images/black/king.png';
import wking from './images/white/king.png';
import blqueen from './images/black/queen.png';
import wqueen from './images/white/queen.png';
import blrook from './images/black/rook.png';
import wrook from './images/white/rook.png';
import blknight from './images/black/knight.png';
import wknight from './images/white/knight.png';
import blbishop from './images/black/bishop.png';
import wbishop from './images/white/bishop.png';
import blpawn from './images/black/pawn.png';
import wpawn from './images/white/pawn.png';




function App() {
const containerRef = useRef(null);
const [turn,setTurn] = useState(0);
const [click,setClick] = useState(0);
const [piece,setPiece] = useState();
const [trace,setTrace] = useState();
const lengg = new Array(64);
const useless = true;
 for (let i=0;i<64;i++){
  lengg[i]= i;
 }
 var beginposition = [
  { name:'king',
    side:'black',
    y : 1,
    x : 5,
    move : 0
  },
  { name:'king',
    side:'white',
    y : 8,
    x : 5,
    move : 0
  },
  { name:'rook',
    side:'black',
    y : 1,
    x : 1,
    move : 0
  },
  { name:'rook',
    side:'white',
    y : 8,
    x : 1,
    move : 0
  },
  { name:'rook',
    side:'black',
    y : 1,
    x : 8,
    move : 0
  },
  { name:'rook',
    side:'white',
    y : 8,
    x : 8,
    move : 0
  },
  { name:'knight',
    side:'black',
    y : 1,
    x : 2
  },
  { name:'knight',
    side:'white',
    y : 8,
    x : 2
  },
  { name:'knight',
    side:'black',
    y : 1,
    x : 7
  },
  { name:'knight',
    side:'white',
    y : 8,
    x : 7
  },
  { name:'bishop',
    side:'black',
    y : 1,
    x : 3
  },
  { name:'bishop',
    side:'white',
    y : 8,
    x : 3
  },
  { name:'bishop',
    side:'black',
    y : 1,
    x : 6
  },
  { name:'bishop',
    side:'white',
    y : 8,
    x : 6
  },
  { name:'queen',
    side:'black',
    y : 1,
    x : 4
  },
  { name:'queen',
    side:'white',
    y : 8,
    x : 4
  },
];
const [chess, setChess] = useState(beginposition);
const [tracker,setTracker] = useState();
const piecespic = {
  black : {
    king : blking,
    rook : blrook,
    knight : blknight,
    bishop : blbishop,
    queen : blqueen,
    pawn : blpawn
  },
  white : {
    king: wking,
    rook : wrook,
    knight : wknight,
    bishop : wbishop,
    queen : wqueen,
    pawn : wpawn
  }
}
const pattern = {
  king:[],
  pawn:[[-1,-1],[1,-1],[0,-1],[0,-2]],
  rook:[],
  bishop:[],
  knight:[[1,2],[-1,2],[1,-2],[-1,-2],[2,1],[-2,1],[2,-1],[-2,-1]],
  queen:[]
}

for (let i = -1; i < 2; i++) {
  for (let j = -1; j < 2; j++) {
    if(i!=0 || j!=0){
      pattern.king.push([i,j]);
    }
  }
}
for (let i=-7;i<8;i++){
  pattern.rook.push([0,i]);
  pattern.rook.push([i,0]);
  pattern.queen.push([0,i]);
  pattern.queen.push([i,0]);
}
for (let i=-7;i<8;i++){
  for (let j=-7;j<8;j++){
    if(i!=0 || j!=0 ){
      if(Math.abs(i)==Math.abs(j)){
        pattern.bishop.push([i,j]);
        pattern.queen.push([i,j]);
      }
    }
  }
}
const pattern2 = {
  king:[],
  pawn:[[-1,1],[1,1],[0,1],[0,2]],
  rook:[],
  bishop:[],
  knight:[[1,2],[-1,2],[1,-2],[-1,-2],[2,1],[-2,1],[2,-1],[-2,-1]],
  queen:[]
}

for (let i = -1; i < 2; i++) {
  for (let j = -1; j < 2; j++) {
    if(i!=0 || j!=0){
      pattern2.king.push([i,j]);
    }
  }
}
for (let i=-7;i<8;i++){
  pattern2.rook.push([0,i]);
  pattern2.rook.push([i,0]);
  pattern2.queen.push([0,i]);
  pattern2.queen.push([i,0]);
}
for (let i=-7;i<8;i++){
  for (let j=-7;j<8;j++){
    if(i!=0 || j!=0 ){
      if(Math.abs(i)==Math.abs(j)){
        pattern2.bishop.push([i,j]);
        pattern2.queen.push([i,j]);
      }
    }
  }
}
for (let i = 1; i < 2; i++) {
    if(i=1){
      for (let j = 1; j < 9; j++) {
        var obj = {
          name:'pawn',
          side:'black',
          y : 2,
          x : j
        }
        beginposition.push(obj);
      }
    }
    if(i=2){
      for (let z = 1; z < 9; z++) {
        var obj = {
          name:'pawn',
          side:'white',
          y : 7,
          x : z
        }
        beginposition.push(obj);
      }
    }
}

function positionDecider(index){
  return(
    [
      Math.floor(index/8)+1,index%8+1
    ]
  )
 }
function sideDecider(i){
  if(i<16){
    return 'black';
  }
  else if(i>47){
    return 'white';
  }
}

function movable(arr,color){
  for(let f=0;f<arr.length;f++){
    for(let k=0;k<chess.length;k++){
      if(chess[k].side==color){
        for(let u=0;u<7;u++){
          if(chess[k].name==Object.keys(pattern2)[u]){
            for(let v=0;v<Object.values(pattern2)[u].length;v++){
              if((Number(Object.values(pattern2)[u][v][1])+Number(chess[k].y))==Number(arr[f][0])
                && (Number(Object.values(pattern2)[u][v][0])+Number(chess[k].x))==Number(arr[f][1])
                && blockDecider(chess[k],[arr[f][0],'blank',arr[f][1]])){
                return false
                }
            }
          }
        }
      }
    }
  }
  return true;
}

// CASTLE

function castle(index,posi){
  if(posi[0]==8 && posi[1]==7
    && blockDecider(chess[index],[8,8],1)
    && movable([[8,6],[8,7]],'black')
  ){
    let clone = chess;
    clone[index].y=8;
    clone[index].x=7;
    for(let i=0;i<chess.length;i++){
      if(chess[i].x==8 && chess[i].y==8 && chess[i].move==0){
        clone[i].x=6;
        clone[index].move=1;
        clone[i].move=1;
        document.getElementById('cell-60').classList.replace('occupied','unoccupied');
        document.getElementById('cell-61').classList.replace('unoccupied','occupied');
        document.getElementById('cell-62').classList.replace('unoccupied','occupied');
        document.getElementById('cell-63').classList.replace('occupied','unoccupied');
        setChess(clone);
        setClick(0);
        setTurn(1);
      }
    }
  }
  if(posi[0]==8 && posi[1]==3
    && blockDecider(chess[index],[8,1],1)
    && movable([[8,2],[8,3],[8,4]],'black')
  ){
    let clone = chess;
    clone[index].y=8;
    clone[index].x=3;
    for(let i=0;i<chess.length;i++){
      if(chess[i].x==1 && chess[i].y==8 && chess[i].move==0){
        clone[i].x=4;
        clone[index].move=1;
        clone[i].move=1;
        document.getElementById('cell-56').classList.replace('occupied','unoccupied');
        document.getElementById('cell-58').classList.replace('unoccupied','occupied');
        document.getElementById('cell-59').classList.replace('unoccupied','occupied');
        document.getElementById('cell-60').classList.replace('occupied','unoccupied');
        setChess(clone);
        setClick(0);
        setTurn(1);
      }
    }
  }
  if(posi[0]==1 && posi[1]==3
    && blockDecider(chess[index],[1,1],1)
    && movable([[1,2],[1,3],[1,4]],'white')
  ){
    console.log('casltles');
    let clone = chess;
    clone[index].y=1;
    clone[index].x=3;
    for(let i=0;i<chess.length;i++){
      if(chess[i].x==1 && chess[i].y==1 && chess[i].move==0){
        console.log('casltles222');
        clone[i].x=4;
        clone[index].move=1;
        clone[i].move=1;
        document.getElementById('cell-0').classList.replace('occupied','unoccupied');
        document.getElementById('cell-2').classList.replace('unoccupied','occupied');
        document.getElementById('cell-3').classList.replace('unoccupied','occupied');
        document.getElementById('cell-4').classList.replace('occupied','unoccupied');
        setChess(clone);
        setClick(0);
        setTurn(0);
      }
    }
  }
  if(posi[0]==1 && posi[1]==7
    && blockDecider(chess[index],[1,8],1)
    && movable([[1,6],[1,7]],'white')
  ){
    console.log('casltles');
    let clone = chess;
    clone[index].y=1;
    clone[index].x=7;
    for(let i=0;i<chess.length;i++){
      if(chess[i].x==8 && chess[i].y==1 && chess[i].move==0){
        console.log('casltles222');
        clone[i].x=6;
        clone[index].move=1;
        clone[i].move=1;
        document.getElementById('cell-4').classList.replace('occupied','unoccupied');
        document.getElementById('cell-5').classList.replace('unoccupied','occupied');
        document.getElementById('cell-6').classList.replace('unoccupied','occupied');
        document.getElementById('cell-7').classList.replace('occupied','unoccupied');
        setChess(clone);
        setClick(0);
        setTurn(0);
      }
    }
  }
}

// ESCAPABLE

function escapable(king){
  let array = [];
  for(let i=0;i<7;i++){
    if(Object.keys(pattern)[i]=='king'){
      for(let n = 0;n<Object.values(pattern)[i].length;n++){
        let coory = Number(Object.values(pattern)[i][n][1])+Number(king[0]);
        let coorx = Number(Object.values(pattern)[i][n][0])+Number(king[2]);
        if (0<coory && coory<9 && 0<coorx && coorx<9){
          array = [...array,[coory,coorx]];
        }
      }
    }
  }
  console.log(array);
  let invalidmoves = [];
  for(let f=0;f<array.length;f++){
    for(let k=0;k<chess.length;k++){
      if(chess[k].side=='black'){
        for(let u=0;u<7;u++){
          if(chess[k].name==Object.keys(pattern2)[u]){
            for(let v=0;v<Object.values(pattern2)[u].length;v++){
              if((Number(Object.values(pattern2)[u][v][1])+Number(chess[k].y))==Number(array[f][0])
                && (Number(Object.values(pattern2)[u][v][0])+Number(chess[k].x))==Number(array[f][1])
                && blockDecider(chess[k],[array[f][0],'blank',array[f][1]])){
                // ){
                 invalidmoves = [...invalidmoves,array[f]];
                 console.log(invalidmoves);
                }
            }
          }
        }
      }
    }
  }
  for(let i=0;i<array.length;i++){
    for(let j=0;j<invalidmoves.length;j++){
      if(array[i]==invalidmoves[j]){
        array.splice(i,1);
      }
    }
  }
  for(let i=0;i<chess.length;i++){
    if(chess[i].side=='white'){
      for(let l=0;l<array.length;l++){
        if(chess[i].y==array[l][0] && chess[i].x==array[l][1]){
          array.splice(l,1);
        }
      }
    }
  }
  console.log(array);
  if(array.length==0){
    return false;
  }
  return true;
}

// ESCAPABLE 1 

function escapable1(king){
  let array = [];
  for(let i=0;i<7;i++){
    if(Object.keys(pattern)[i]=='king'){
      for(let n = 0;n<Object.values(pattern2)[i].length;n++){
        let coory = Number(Object.values(pattern2)[i][n][1])+Number(king[0]);
        let coorx = Number(Object.values(pattern2)[i][n][0])+Number(king[2]);
        if (0<coory && coory<9 && 0<coorx && coorx<9){
          array = [...array,[coory,coorx]];
        }
      }
    }
  }
  console.log(array);
  let invalidmoves = [];
  for(let f=0;f<array.length;f++){
    for(let k=0;k<chess.length;k++){
      if(chess[k].side=='white'){
        for(let u=0;u<7;u++){
          if(chess[k].name==Object.keys(pattern)[u]){
            for(let v=0;v<Object.values(pattern)[u].length;v++){
              if((Number(Object.values(pattern)[u][v][1])+Number(chess[k].y))==Number(array[f][0])
                && (Number(Object.values(pattern)[u][v][0])+Number(chess[k].x))==Number(array[f][1])
                && blockDecider(chess[k],[array[f][0],'blank',array[f][1]])){
                // ){
                 invalidmoves = [...invalidmoves,array[f]];
                 console.log(invalidmoves);
                }
            }
          }
        }
      }
    }
  }
  for(let i=0;i<array.length;i++){
    for(let j=0;j<invalidmoves.length;j++){
      if(array[i]==invalidmoves[j]){
        array.splice(i,1);
      }
    }
  }
  for(let i=0;i<chess.length;i++){
    if(chess[i].side=='black'){
      for(let l=0;l<array.length;l++){
        if(chess[i].y==array[l][0] && chess[i].x==array[l][1]){
          array.splice(l,1);
        }
      }
    }
  }
  console.log(array);
  if(array.length==0){
    return false;
  }
  return true;
}

// EAT THREAT

function eatThreat(piece,color){
  // console.log(piece,piece[0],piece[1]);
  let piecesubstitute = [piece[0],'',piece[1]];
  if(color=='black'){
    for(let i=0;i<chess.length;i++){
      if(chess[i].side=='white'){
        for(let j=0;j<7;j++){
          if(chess[i].name==Object.keys(pattern)[j]){
            for(let n=0;n<Object.values(pattern)[j].length;n++){
              if((Number(Object.values(pattern)[j][n][1])+Number(chess[i].y))==Number(piece[0])
                && (Number(Object.values(pattern)[j][n][0])+Number(chess[i].x))==Number(piece[1])
                && blockDecider(chess[i],piecesubstitute,0)){
                  console.log('eatable',chess[i],piecesubstitute);
                  
                  return true;
              }
            }
          }
        }
      }
    }
  }
  else if(color=='white'){
    for(let i=0;i<chess.length;i++){
      if(chess[i].side=='black'){
        for(let j=0;j<7;j++){
          if(chess[i].name==Object.keys(pattern2)[j]){
            for(let n=0;n<Object.values(pattern2)[j].length;n++){
              if((Number(Object.values(pattern2)[j][n][1])+Number(chess[i].y))==Number(piece[0])
                && (Number(Object.values(pattern2)[j][n][0])+Number(chess[i].x))==Number(piece[1])
                && blockDecider(chess[i],piecesubstitute,1)){
                return true;
              }
            }
          }
        }
      }
    }
  }
  return false;
}

//BLOCKABLE 

function blockable(piece,king,color,name){
  if(name=='rook' || name=='queen'){
    let array = []
    if(king[2]==piece[1] && king[0]>piece[0]){
      for(let z=1;z<king[0]-piece[0];z++){
        array = [...array,[piece[0]+z,piece[1]]];
      }
    }
    if(king[2]==piece[1] && king[0]<piece[0]){
      for(let z=1;z<piece[0]-king[0];z++){
        array = [...array,[piece[0]-z,piece[1]]];
      }
    }
    if(king[0]==piece[0] && king[2]>piece[1]){
      for(let z=1;z<king[2]-piece[1];z++){
        array = [...array,[piece[0],piece[1]+z]];
      }
    }
    if(king[0]==piece[0] && king[2]<piece[1]){
      for(let z=1;z<piece[2]-king[2];z++){
          array = [...array,[piece[0],piece[1]-z]];
      }
    }
    console.log(array);
    for(let i=0;i<chess.length;i++){
      if(chess[i].side==color){
        for(let j=0;j<7;j++){
          if(chess[i].name==Object.keys(pattern)[j] && chess[i].name!='king'){
            for(let n=0;n<Object.values(pattern)[j].length;n++){
              for(let k=0;k<array.length;k++){
                if((Number(Object.values(pattern)[j][n][1])+Number(chess[i].y))==Number(array[k][0]) && (Number(Object.values(pattern)[j][n][0])+Number(chess[i].x))==Number(array[k][1])){
                  return true;
                }
              }
            }
          }
        }
      }
    }
  }
  if(name=='bishop' || name=='queen'){
    let array = [];
    console.log(piece[0],piece[1],king[0],king[2]);
    if(king[0]>piece[0] && king[2]>piece[1]){
      for(let z=1;z<king[0]-piece[0];z++){
        array = [...array,[piece[0]+z,piece[1]+z]];
        console.log('1');
      }
    }
    if(king[0]<piece[0] && king[2]<piece[1]){
      for(let z=1;z<piece[0]-king[0];z++){
        array = [...array,[piece[0]-z,piece[1]-z]];
        console.log('2');
      }
    }
    if(king[0]<piece[0] && king[2]>piece[1]){
      for(let z=1;z<piece[0]-king[0];z++){
        array = [...array,[piece[0]-z,piece[1]+z]];
        console.log('3');
      }
    }
    if(king[0]>piece[0] && king[2]<piece[1]){
      for(let z=1;z<king[0]-piece[0];z++){
        array = [...array,[piece[0]+z,piece[1]-z]];
        console.log('4');
      }
    }
    console.log(array);
    for(let i=0;i<chess.length;i++){
      if(chess[i].side==color){
        for(let j=0;j<7;j++){
          if(chess[i].name==Object.keys(pattern)[j] && chess[i].name != 'king'){
            for(let n=0;n<Object.values(pattern)[j].length;n++){
              for(let k=0;k<array.length;k++){
                // console.log('sumy',Object.values(pattern)[j][n][1],chess[i].y,array[k][0]);
                // console.log('sumx',Object.values(pattern)[j][n][0],chess[i].x,array[k][1]);
                // console.log('side',chess[i].side, color,chess[i].name, Object.keys(pattern)[j]);
                if((Number(Object.values(pattern)[j][n][1])+Number(chess[i].y))==Number(array[k][0])
                 && (Number(Object.values(pattern)[j][n][0])+Number(chess[i].x))==Number(array[k][1])
                 && blockDecider(chess[i],[array[k][0],'blank',array[k][1]])){
                  // console.log('blockable');
                  console.log('sumy',Object.values(pattern)[j][n][1],chess[i].y,array[k][0]);
                console.log('sumx',Object.values(pattern)[j][n][0],chess[i].x,array[k][1]);
                console.log('side',chess[i].side, color,chess[i].name, Object.keys(pattern)[j]);
                  return true;
                }
              }
            }
          }
        }
      }
    }
  }
  return false;
}

// BLOCKDECIDERFUNCTION

function blockDecider(piece,posi,vis){
  if(piece.name=='rook'){
    console.log('absolute rook',posi[0],posi[1],posi[2]);
    if(piece.y==posi[0]){
      if(posi[2]<piece.x){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            if(chess[j].y==piece.y && chess[j].x==piece.x-i && chess[j].x>posi[2]){
              console.log('rook1blocked');
              return false;
            }
          }
        }
      }
      if(posi[2]>piece.x){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            if(chess[j].y==piece.y && chess[j].x==piece.x+i && chess[j].x<posi[2]){
              console.log('rook2blocked');
              return false;
            }
          }
        }
      }
    }
    if(piece.x==posi[2]){
      if(posi[0]<piece.y){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            if(chess[j].y==piece.y-i && chess[j].x==piece.x && chess[j].y>posi[0]){
              console.log('rook3blocked');
              return false;
            }
          }
        }
      }
      if(posi[0]>piece.y){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            if(chess[j].y==piece.y+i && chess[j].x==piece.x && chess[j].y<posi[0]){
              console.log('rook4blocked');
              return false;
            }
          }
        }
      }
    }
    return true;
  }
  if(piece.name=='queen'){
    console.log('absolute quene');
    if(piece.y==posi[0]&&piece.x==posi[2]){
      return false;
    }
    if(piece.y==posi[0]){
      if(posi[2]<piece.x){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            if(chess[j].y==piece.y && chess[j].x==piece.x-i && chess[j].x>posi[2]){
              return false;
            }
          }
        }
      }
      if(posi[2]>piece.x){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            if(chess[j].y==piece.y && chess[j].x==piece.x+i && chess[j].x<posi[2]){
              return false;
            }
          }
        }
      }
    }
    if(piece.x==posi[2]){
      if(posi[0]<piece.y){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            if(chess[j].y==piece.y-i && chess[j].x==piece.x && chess[j].y>posi[0]){
              return false;
            }
          }
        }
      }
      if(posi[0]>piece.y){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            if(chess[j].y==piece.y+i && chess[j].x==piece.x && chess[j].y<posi[0]){
              return false;
            }
          }
        }
      }
    }
    if(posi[0]<piece.y){
      if(posi[2]<piece.x){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            // console.log('y:',posi[0],chess[j].y,piece.y-i)
            if(chess[j].y==piece.y-i && chess[j].x==piece.x-i && chess[j].y>posi[0] && chess[j].x>posi[2]){
              return false;
            }
          }
        }
      }
      if(posi[2]>piece.x){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            // console.log('y:',posi[0],chess[j].y,piece.y-i)
            if(chess[j].y==piece.y-i && chess[j].x==piece.x+i && chess[j].y>posi[0] && chess[j].x<posi[2]){
              return false;
            }
          }
        }
      }
    }
    if(posi[0]>piece.y){
      if(posi[2]<piece.x){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            // console.log('y:',posi[0],chess[j].y,piece.y-i)
            if(chess[j].y==piece.y+i && chess[j].x==piece.x-i && chess[j].y<posi[0] && chess[j].x>posi[2]){
              return false;
            }
          }
        }
      }
      if(posi[2]>piece.x){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            // console.log('y:',posi[0],chess[j].y,piece.y+i)
            if(chess[j].y==piece.y+i && chess[j].x==piece.x+i && chess[j].y<posi[0] && chess[j].x<posi[2]){
              return false;
            }
          }
        }
      }
    }
    return true;
  }
  if(piece.name=='bishop'){
    console.log(piece.name,'namedeteced');
    if(posi[0]<piece.y){
      if(posi[2]<piece.x){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            if(chess[j].y==piece.y-i && chess[j].x==piece.x-i && chess[j].y>posi[0] && chess[j].x>posi[2]){
              return false;
            }
          }
        }
      }
      if(posi[2]>piece.x){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            if(chess[j].y==piece.y-i && chess[j].x==piece.x+i && chess[j].y>posi[0] && chess[j].x<posi[2]){
              return false;
            }
          }
        }
      }
    }
    if(posi[0]>piece.y){
      if(posi[2]<piece.x){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            if(chess[j].y==piece.y+i && chess[j].x==piece.x-i && chess[j].y<posi[0] && chess[j].x>posi[2]){
              return false;
            }
          }
        }
      }
      if(posi[2]>piece.x){
        for(let i=1;i<8;i++){
          for (let j=0;j<chess.length;j++){
            if(chess[j].y==piece.y+i && chess[j].x==piece.x+i && chess[j].y<posi[0] && chess[j].x<posi[2]){
              return false;
            }
          }
        }
      }
    }
    return true;
  }
  if(piece.name=='pawn'){
    // if(vis==0){
    //   if(posi[0]==piece.y){
    //     console.log('diffrent');
    //     return false;
    //   }
    // }
    if(vis==0){
      if(posi[2]==piece.x){
        return false;
      }
    }
    else{
      // console.log('x axis',posi[2],piece.x);
      // console.log('y axis',posi[0],piece.y+1,piece.y-1);
      if(posi[2]!=piece.x || (posi[0]!=piece.y+1 && posi[0]!=piece.y-1 && posi[0]==piece.y+2 && posi[0]==piece.y-2) ){
        return false
      }
    }
    return true;
  }
  if(piece.name=='knight'){
    return true;
  }
  if(piece.name=='king'){
    return true;
  }
}
useEffect(()=>{
  for(let i=0; i<64;i++){
    var celt = document.getElementById(`cell-${i}`);
    if(i<16){celt.classList.add('occupied');}
    if(i>47){celt.classList.add('occupied');}
    if(i==0){celt.classList.add('white');}
    if(!celt) {return};
    let posi = [Math.floor(i/8),i%8];
    // console.log(celt,posi[0]);
    if(i){
      // for (var k = 0; k < beginposition.length ; k++) {
      //   if(posi[0] == beginposition[k].y && posi[1] == beginposition[k].x) {
      //     celt.classList.add('occupied');
      //   }
        
      // }
      if(posi[0]==0){
        celt.classList.add('white');
      }
      if(posi[0]%2==1){
        if(posi[1]%2==1){celt.classList.add('white');}
        else if(posi[1]%2==0){celt.classList.add('black');}
      }
      else if(posi[0]%2==0){
        if(posi[1]%2==1){celt.classList.add('black');}
        else if(posi[1]%2==0){celt.classList.add('white');}
      }
    }
   if(!celt.classList.contains('occupied')){
    celt.classList.add('unoccupied')
   } 
  }
},[])
function handleMove(index){
  if(turn==0){
    if(click==0){
      let cell = document.getElementById(`cell-${index}`);
      setTracker(index);
      if(cell.getAttribute('side')=='white'){
        if(cell.classList.contains('occupied')){
          console.log('curr',cell.getAttribute('position'));
          setPiece(cell.getAttribute('position'));
          if(true){
            setClick(1);
          }
        }
      }
    }
    if(click==1){
      let cell = document.getElementById(`cell-${index}`);
      let cellv = document.getElementById(`cell-${tracker}`);
      var useless = 0;
      var clone = chess;
      if(cell.getAttribute('side')=='black'){
        for (let l = 0; l < chess.length; l++) {
          if(piece[0] == chess[l].y && piece[2]== chess[l].x) {
            for(let i=0;i<7;i++){
              if(chess[l].name == Object.keys(pattern)[i]){
                for(let n = 0;n<Object.values(pattern)[i].length;n++){
                  if ((Number(Object.values(pattern)[i][n][1]) + Number(piece[0])==Number(cell.getAttribute('position')[0])) 
                  && (Number(Object.values(pattern)[i][n][0]) + Number(piece[2])==Number(cell.getAttribute('position')[2]) )
                  && blockDecider(chess[l],cell.getAttribute('position'),useless)) {
                    // console.log('mao');
                      if(true){
                        let cellv = document.getElementById(`cell-${tracker}`);
                        cellv.classList.replace('occupied','unoccupied');
                        cell.classList.replace('unoccupied','occupied');
                        let eat = cell.getAttribute('position');
                        for (let l = 0; l < chess.length; l++) {
                          if(eat[0] == chess[l].y && eat[2]== chess[l].x) {
                            clone.splice(l,1);
                          }
                        }
                        for (let l = 0; l < chess.length; l++) {
                          if(piece[0] == chess[l].y && piece[2]== chess[l].x) {
                            clone[l].y=Number(cell.getAttribute('position')[0]);
                            clone[l].x=Number(cell.getAttribute('position')[2]);
                            setPiece([clone[l].y,'blank',clone[l].x,chess[l].name]);
                            setTrace(chess[l]);
                            setChess(clone);
                            if(true){
                              cell.classList.replace('unoccupied','occupied');
                              cellv.classList.replace('occupied','unoccupied');
                              setClick(0);
                              cell.setAttribute('side','white');
                            }
                          }
                          
                        }
                        setTurn(1);
                        return;
                      }
                    
                  }
                setClick(0);
                  
                }
              }
            }
          }
        }
      }
      if(cell.classList.contains('unoccupied')){
        var useless = 1;
        for (let l = 0; l < chess.length; l++) {
          if(piece[0] == chess[l].y && piece[2]== chess[l].x) {
            if(chess[l].name == 'king' && chess[l].side=='white'
               && chess[l].move == 0
               && (Number(cell.getAttribute('position')[2])==7 || Number(cell.getAttribute('position')[2])==3)
               && (Number(cell.getAttribute('position')[0])==1 || Number(cell.getAttribute('position')[0])==8)){
              castle(l,[cell.getAttribute('position')[0],cell.getAttribute('position')[2]]);
            }
            for(let i=0;i<7;i++){
              if(chess[l].name == Object.keys(pattern)[i]){
                for(let n = 0;n<Object.values(pattern)[i].length;n++){
                  if ((Number(Object.values(pattern)[i][n][1]) + Number(piece[0])==Number(cell.getAttribute('position')[0])) 
                  && (Number(Object.values(pattern)[i][n][0]) + Number(piece[2])==Number(cell.getAttribute('position')[2]) )
                  && blockDecider(chess[l],cell.getAttribute('position'),useless)) {
                    if(true){
                      var clone = chess;
                      clone[l].y=Number(cell.getAttribute('position')[0]);
                      clone[l].x=Number(cell.getAttribute('position')[2]);
                      setChess(clone);
                      if(true){
                        let cellv = document.getElementById(`cell-${tracker}`);
                        cellv.classList.replace('occupied','unoccupied');
                        cell.classList.replace('unoccupied','occupied');
                        setPiece([clone[l].y,'blank',clone[l].x,chess[l].name]);
                        setTrace(chess[l]);
                        setClick(0);
                        cell.setAttribute('side','white');
                        setTurn(1);
                        return;
                      }
                    }
                  }
                setClick(0);
                  
                }
              }
            }
          }
          
        }
      }
    }
    
  }
  if(turn==1){
    if(click==0){
      let cell = document.getElementById(`cell-${index}`);
      setTracker(index);
      if(cell.getAttribute('side')=='black'){
        if(cell.classList.contains('occupied')){
          console.log('curr',cell.getAttribute('position'));
          setPiece(cell.getAttribute('position'));
          if(true){
            setClick(1);
          }
        }
      }
    }
    if(click==1){
      let cell = document.getElementById(`cell-${index}`);
      let cellv = document.getElementById(`cell-${tracker}`);
      var clone = chess;
      var useless = 0;
      if(cell.getAttribute('side')=='white'){
        for (let l = 0; l < chess.length; l++) {
          if(piece[0] == chess[l].y && piece[2]== chess[l].x) {
            for(let i=0;i<7;i++){
              if(chess[l].name == Object.keys(pattern)[i]){
                for(let n = 0;n<Object.values(pattern)[i].length;n++){
                  if ((Number(Object.values(pattern)[i][n][1]) + Number(piece[0])==Number(cell.getAttribute('position')[0])) 
                  && (Number(Object.values(pattern)[i][n][0]) + Number(piece[2])==Number(cell.getAttribute('position')[2]) )
                  && blockDecider(chess[l],cell.getAttribute('position'),useless)) {
                    // console.log('mao');
                      if(true){
                        let cellv = document.getElementById(`cell-${tracker}`);
                        cellv.classList.replace('occupied','unoccupied');
                        cell.classList.replace('unoccupied','occupied');
                        let eat = cell.getAttribute('position');
                        for (let l = 0; l < chess.length; l++) {
                          if(eat[0] == chess[l].y && eat[2]== chess[l].x) {
                            clone.splice(l,1);
                          }
                        }
                        for (let l = 0; l < chess.length; l++) {
                          if(piece[0] == chess[l].y && piece[2]== chess[l].x) {
                            clone[l].y=Number(cell.getAttribute('position')[0]);
                            clone[l].x=Number(cell.getAttribute('position')[2]);
                            setPiece([clone[l].y,'blank',clone[l].x,chess[l].name]);
                            setTrace(chess[l]);
                            setChess(clone);
                            if(true){
                              cell.classList.replace('unoccupied','occupied');
                              cellv.classList.replace('occupied','unoccupied');
                              setClick(0);
                              cell.setAttribute('side','black');
                            }
                          }
                          
                        }
                        setClick(0);
                        setTurn(0);
                        return;
                      }
                    
                  }
                setClick(0);
                  
                }
              }
            }
          }
          
        }
      }
      if(cell.classList.contains('unoccupied')){
        console.log('posii',cell.getAttribute('position')[0],cell.getAttribute('position')[1],cell.getAttribute('position')[2]);
        for (let l = 0; l < chess.length; l++) {
          if(piece[0] == chess[l].y && piece[2]== chess[l].x) {
            if(chess[l].name == 'king' && chess[l].side=='black'
              && chess[l].move == 0
              && (Number(cell.getAttribute('position')[2])==7 || Number(cell.getAttribute('position')[2])==3)
              && (Number(cell.getAttribute('position')[0])==1 || Number(cell.getAttribute('position')[0])==8)){
             castle(l,[cell.getAttribute('position')[0],cell.getAttribute('position')[2]]);
             console.log('initiat castles');
            }
            for(let i=0;i<7;i++){
              if(chess[l].name == Object.keys(pattern2)[i]){
                for(let n = 0;n<Object.values(pattern2)[i].length;n++){
                  if (Number(Object.values(pattern2)[i][n][1]) + Number(piece[0])==Number(cell.getAttribute('position')[0]) 
                  && Number(Object.values(pattern2)[i][n][0]) + Number(piece[2])==Number(cell.getAttribute('position')[2])
                  && blockDecider(chess[l],cell.getAttribute('position'))) {
                    // console.log('mao');
                    if(true){
                      var clone = chess;
                      clone[l].y=Number(cell.getAttribute('position')[0]);
                      clone[l].x=Number(cell.getAttribute('position')[2]);
                      setPiece([clone[l].y,'blank',clone[l].x,chess[l].name]);
                      setTrace(chess[l]);
                      setChess(clone);
                      if(true){
                        let cellv = document.getElementById(`cell-${tracker}`);
                        cellv.classList.replace('occupied','unoccupied');
                        cell.classList.replace('unoccupied','occupied');
                        setClick(0);
                        cell.setAttribute('side','black');
                        setTurn(0);
                        return;
                      }
                    }
                  }
                  
                }
                setClick(0);
              }
            }
          }
          
        }
      }
    }
    
  }
}
useEffect(()=>{
  for(let l=0;l<chess.length;l++){
    if(chess[l].side=='white' && chess[l].name=='pawn'){
      if(chess[l].y==1){
        let clone = chess;
        clone[l].name='queen';
        setChess(clone);
      }
    }
    if(chess[l].side=='black' && chess[l].name=='pawn'){
      if(chess[l].y==8){
        let clone = chess;
        clone[l].name='queen';
        setChess(clone);
      }
    }
  }
  for(let z=0;z<64;z++){
    let sing = document.getElementById(`cell-${z}`);
    sing.innerHTML='';
  }
  for(let z=0;z<64;z++){
    let sings = document.getElementById(`cell-${z}`);
    let rando = [Math.floor(z/8)+1,z%8+1];
    for (let k = 0; k < chess.length; k++) {
      if(rando[0] == chess[k].y && rando[1] == chess[k].x){
        let haiya = piecespic[chess[k].side][chess[k].name];
        let content = document.createElement(
          'img'
        )
        content.src= haiya;
        sings.appendChild(content);
      }
    }
  }
  let king = null;
  let king1 = null;
  for(let l=0;l<chess.length;l++){
    if(chess[l].name=='king'){
      if(chess[l].side=='white'){
        king = [chess[l].y,'blank',chess[l].x];
      }
      if(chess[l].side=='black'){
        king1 = [chess[l].y,'blank',chess[l].x];
      }
    }
  }
  // step 1) xét tất cả nước đi khả thi của quân vua
  // step 2) xet tất cả nước đi khả thi của quân địch
  // step 3) so sánh 1) và 2) nếu tất cả nước đi của quân vua trùng với nước khả thi của quân địch thì xử thua
  // let array = [];
  // for(let i=0;i<7;i++){
  //   if(Object.keys(pattern)[i]=='king'){
  //     for(let n = 0;n<Object.values(pattern)[i].length;n++){
  //       let coory = Number(Object.values(pattern)[i][n][1])+Number(king[0]);
  //       let coorx = Number(Object.values(pattern)[i][n][0])+Number(king[2]);
  //       if (0<coory && coory<9 && 0<coorx && coorx<9){
  //         array = [...array,[coory,coorx]];
  //       }
  //     }
  //   }
  // }
  // console.log(array);
  // let invalidmoves = [];
  // for(let f=0;f<array.length;f++){
  //   for(let k=0;k<chess.length;k++){
  //     if(chess[k].side=='black'){
  //       for(let u=0;u<7;u++){
  //         if(chess[k].name==Object.keys(pattern2)[u]){
  //           for(let v=0;v<Object.values(pattern2)[u].length;v++){
  //             if((Number(Object.values(pattern2)[u][v][1])+Number(chess[k].y))==Number(array[f][0])
  //               && (Number(Object.values(pattern2)[u][v][0])+Number(chess[k].x))==Number(array[f][1])
  //               && blockDecider(chess[k],[array[f][0],'blank',array[f][1]])){
  //               // ){
  //                console.log('indeed',array[f],chess[k]);
  //                invalidmoves = [...invalidmoves,array[f]];
  //               }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  // if(8){
  //   if(king==null){alert('black wins')}
  //   if(king1==null){alert('white wins')}
  //   if(piece){
  //   for(let i=0;i<7;i++){
  //     if(piece[3] == Object.keys(pattern2)[i]){
  //       for(let n = 0;n<Object.values(pattern2)[i].length;n++){
  //         // console.log('thepattern',Object.values(pattern2)[i][n][1],Number(piece[0]),Number(king[0]));
  //         // console.log('thepattern',Object.values(pattern2)[i][n][0],Number(piece[2]),Number(king[2]));
  //         console.log(blockDecider(trace,king));
  //         console.log(trace,'part',king[0],king[2]);
  //         if (Number(Object.values(pattern2)[i][n][1]) + Number(piece[0])==Number(king[0])
  //         && Number(Object.values(pattern2)[i][n][0]) + Number(piece[2])==Number(king[2])
  //         && blockDecider(trace,king)) {
  //           console.log('check');
  //           if(!eatThreat(piece)){
  //             console.log('checkmatestep1');
  //             var color = 'white';

  //             // if(!blockable(piece,king,color)){
  //             //   console.log('checkmatestep2');
  //             //   alert('black wins');
  //             // }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   for(let i=0;i<7;i++){
  //     if(piece[3] == Object.keys(pattern)[i]){
  //       for(let n = 0;n<Object.values(pattern)[i].length;n++){
  //         // console.log('thepattern',Object.values(pattern)[i][n][1],Number(piece[0]),Number(king1[0]));
  //         if (Number(Object.values(pattern)[i][n][1]) + Number(piece[0])==Number(king1[0])
  //         && Number(Object.values(pattern)[i][n][0]) + Number(piece[2])==Number(king1[1])
  //         && blockDecider(trace,king)) {
  //           console.log('check');
  //           if(!eatThreat(piece)){
  //             console.log('checkmatestep1');
  //             var color = 'black';

  //             // if(!blockable(piece,king1,color)){
  //             //   console.log('checkmatestep2');
  //             //   alert('white wins');
  //             // }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   }
  // }
  for(let i=0;i<chess.length;i++){
    for (let l=0;l<7;l++){
      if(chess[i].side=='black'){
        if(chess[i].name==Object.keys(pattern)[l]){
          for(let n=0;n<Object.values(pattern)[l].length;n++){
            if(
              (Number(Object.values(pattern)[l][n][1])+Number(chess[i].y))==Number(king[0])
              && (Number(Object.values(pattern)[l][n][0])+Number(chess[i].x))==Number(king[2])
              && blockDecider(chess[i],king)){
                console.log('blackcheck');
                let mev = [chess[i].y,chess[i].x];
                if(!eatThreat(mev,'black')){
                  console.log('uneatable');
                  if(!blockable(mev,king,'white',chess[i].name)){
                    console.log('unblockable');
                    if(!escapable(king)){
                      console.log('checkmate');
                      // alert('black wins');
                    }
                  }
                }
            }
          }
        }
      }
    }
  }
  for(let i=0;i<chess.length;i++){
    for (let l=0;l<7;l++){
      if(chess[i].side=='white'){
        if(chess[i].name==Object.keys(pattern)[l]){
          for(let n=0;n<Object.values(pattern)[l].length;n++){
            if(
              (Number(Object.values(pattern)[l][n][1])+Number(chess[i].y))==Number(king1[0])
              && (Number(Object.values(pattern)[l][n][0])+Number(chess[i].x))==Number(king1[2])
              && blockDecider(chess[i],king1)){
                console.log('whitecheck');
                let mev = [chess[i].y,chess[i].x];
                if(!eatThreat(mev,'white')){
                  console.log('uneatable');
                  if(!blockable(mev,king1,'black',chess[i].name)){
                    console.log('unblockable');
                    if(!escapable(king)){
                      console.log('checkmate');
                      // alert('white wins');
                    }
                  }
                }
            }
          }
        }
      }
    }
  }
},[turn])
function decideContent(index){
  let cell = document.getElementById(`cell-${index}`);
  if(!cell){return};
  let posi = [Math.floor(index/8)+1,index%8+1];
  for (let k = 0; k < chess.length; k++) {
    if(posi[0] == chess[k].y && posi[1] == chess[k].x) {
      // cell.innerHTML='';
      return(<img className="pieces" src={piecespic[chess[k].side][chess[k].name]}/>)
    }
  }
}
return (
    <div className="App">
     {/* <table id='board'>
      {displayTable()}
      
      
     </table> */}
     <div  id='ctn'>
     {lengg.map(function(index){
        return(
          <div key={index} id={`cell-${index}`} className='cell' position={positionDecider(index)} side={sideDecider(index)} onClick={()=>handleMove(index)}>
            {/* {
              decideContent(index) 
            } */}
          </div>
          
        )
      })}
     </div>
    </div>
  );
}


export default App;
