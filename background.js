chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.set({color:'#3aa757'});

chrome.action.onClicked.addListener(() => 
{
    chrome.tabs.create({url:'popup.html'});

});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === "get_color")
    {
        chrome.storage.sync.get("color",(data) => sendResponse({color:data.color}));
        return true;
    }
});