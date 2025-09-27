let input=document.getElementsByTagName("input");
let div=document.getElementsByTagName("div");

async function fetchData(userName){

let res=await fetch(`https://api.github.com/users/${userName}`);

let data=await res.json();

displayContent(data,userName);

}





input[0].addEventListener("input",function(){
fetchData(input[0].value);
});

function displayContent(data,userName){
div[1].textContent="";
let main=document.createElement("div");
    main.classList.add("main");

let img=document.createElement("img");
    img.setAttribute("src",data.avatar_url);
   



let name=document.createElement("h3");
 name.textContent=data.name;
let bio=document.createElement("p");
 bio.textContent=data.bio || 'no bio available';
let follower=document.createElement("span");
let following=document.createElement("span");
let repo=document.createElement("span");
    follower.textContent="follower :-"+data.followers;
    following.textContent="following :-"+data.following;
    repo.textContent="Repo :-"+data.public_repos;

   fetchRepo(main,userName);


main.append(name,bio,follower,following,repo);
  
div[1].append(img,main); 
}

async function fetchRepo(main,userName){
 let res=await fetch(`https://api.github.com/users/${userName}/repos?sort=updated&per_page=5`);
 let data=await res.json();

 for(let i=0;i<data.length;i++){
  let repoList=document.createElement("button");
  let a=document.createElement("a");
   a.href=data[i].html_url;
   a.textContent=data[i].full_name;
   repoList.appendChild(a);
   main.appendChild(repoList);
}

}