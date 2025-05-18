
let searchbtn=document.querySelector(".btn");
let usernameinp=document.querySelector(".usernameinp");
let card=document.querySelector(".card");


function getProfileData(username){
  return  fetch(`https://api.github.com/users/${username}`)
  .then(rawdata=>{
    if(!rawdata.ok) throw new Error ("User not found.");
    return rawdata.json();
  })
}
function getRepos(username){
  return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(raw=>{
    if(!raw.ok) throw new Error(" failed to featch Repos..")
        return raw.json();
  })
}

function decorateProfileData(details){
   let data= `
   <div class="flex items-start space-x-6">
      <div class="w-20 h-20 rounded-full overflow-hidden">
           <img 
            src="${details.avatar_url}" 
            alt="Avatar" 
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex-1 space-y-2">
          <h2 class="text-xl font-semibold text-gray-800">${details.name}</h2>
          <p class="text-gray-500">${details.bio ||  "Not Available"}</p>
          <div class="mt-2 flex space-x-4 text-sm text-gray-600">
            <span><strong>Repos:</strong> ${details.public_repos}</span>
            <span><strong>Followers:</strong> ${details.followers}</span>
            <span><strong>Following:</strong> ${details.following}</span>
          </div>
          <div class="mt-4 space-y-1 text-sm text-gray-600">
          <p><strong>📍 Location:</strong> ${details.location?details.location:"not Available"}</p>
            <p><strong>🏢 Company:</strong> ${details.company ?details.company:"not Available" }</p>
            <p>
              <strong>🔗 Blog:</strong> 
              <a href="${details.blog}" class="text-blue-600 hover:underline" target="_blank">${details.blog ||"N/A"}</a>
            </p>
          </div>
        </div>
        </div>
      `;

      card.innerHTML=data;
} 



searchbtn.addEventListener("click",function(e){
  e.preventDefault();
 let username = usernameinp.value.trim();

 if(username.length > 0){
    getProfileData(username).then((data)=>{
decorateProfileData(data);
    });
 }
 else{
    alert("itz a alert for u")
 }
})

