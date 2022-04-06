const loadTweets = async () => {
    try {
        const response = await fetch("http://localhost:8081/tweets")
        const json = await response.json()
        let data = []
        console.log(json.length)
        data = json.reverse()
        $(".mid-tweet-grid").html('');
        let x = (`<div class="mid-tweet-template"><img src="https://cdn.discordapp.com/attachments/750272962590015498/961208628080181309/pf.jpg" class="mid-profile-picture"><div class="mid-tweet-template-container"><textarea class="mid-tweet-template-input" placeholder="What's happening?" type="text"></textarea><div class="mid-tweet-template-actions"><i class="far fa-image mid-tweet-template-action"></i><i class="far fa-smile mid-tweet-template-action"></i><button class="mid-tweet-template-tweetbtn" onclick="sendTweet()">Tweet</button></div></div></div>`)
        data.forEach(element => {
            x += `<div class="mid-tweet"><img src="${element.profile_url}" class="mid-profile-picture"><div class="mid-tweet-container"><div class="mid-tweet-header">${element.displayname} <span style="position: absolute; top: 2px;"><img src="./assets/Twitter_Verified_Badge.png" class="mid-tweet-verified" alt=""></span> <span  class="mid-tweet-smalltext">@${element.username} · 14 hours ago</span></div><div class="mid-tweet-content">${element.tweetmessage}</div><div class="mid-tweet-actions"><i class="far fa-comment mid-tweet-action"><span class="mid-tweet-action-info">${element.data.comments}</span></i><i class="fas fa-retweet mid-tweet-action"><span class="mid-tweet-action-info">${element.data.shares}</span></i><i class="far fa-heart mid-tweet-action"><span class="mid-tweet-action-info">${element.data.likes}</span></i><i class="fas fa-share mid-tweet-action"></i></div></div></div>`
        });
        $(".mid-tweet-grid").append(x);
    }
    catch(e) {
        console.error(e)
    }
}

const Account = {

}


const sendTweet = async () => {
    try {
        const data = {
            "displayname": "Daan Verbeek",
            "profile_url": "https://cdn.discordapp.com/attachments/750272962590015498/961208628080181309/pf.jpg",
            "username": "daanverbeek3",
            "tweetmessage": $(".mid-tweet-template-input").val(),
            "tweetdate": "06/04/2022",
            "data": {
                "likes": 0,
                "comments": 0,
                "shares": 0
            }
        }
        
        fetch('http://localhost:8081/tweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    catch(e) {
        console.error(e)
    }
    finally{ 
        setTimeout(() =>{
            console.log("Resync")
            loadTweets() 
        }, 500)  
    }
}

