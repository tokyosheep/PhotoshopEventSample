window.onload = () =>{
    "use strict";
    const csInterface = new CSInterface();
    const extensionId = csInterface.getExtensionID(); 
    const toJSX = csInterface.getSystemPath(SystemPath.EXTENSION) +`/jsx/`;
    themeManager.init();
    const cropJsx = "getCropID.jsx";
    const caution = "caution.jsx";
    const flag = document.getElementById("flag");
    const eventButton = document.getElementById("eventButton");

    const PhotoshopCallbackUnique = () =>{
        csInterface.evalScript(`$.evalFile("${toJSX+caution}")`);
    }
    const dispatchEvent = () =>{
        flag.textContent = "ON";
        csInterface.evalScript(`$.evalFile("${toJSX+cropJsx}")`,(e)=>{
            const event = new CSEvent();
            event.data = e;
            event.type = `com.adobe.PhotoshopRegisterEvent`;
            event.scope = `APPLICATION`; 
            event.appId = csInterface.getApplicationID();
            event.extensionId = csInterface.getExtensionID();
            csInterface.dispatchEvent(event);
            console.log(event);
        });
        csInterface.addEventListener(`com.adobe.PhotoshopJSONCallback${extensionId}`,PhotoshopCallbackUnique);
        csInterface.evalScript(`alert("dispatch crop event")`);
    }

    const removeEvent = () =>{
        csInterface.evalScript(`alert("event was removed")`);
        flag.textContent = "OFF";
        csInterface.removeEventListener(`com.adobe.PhotoshopJSONCallback${extensionId}`,PhotoshopCallbackUnique);
    }

    eventButton.addEventListener("click",()=>{
        if(flag.textContent === "OFF"){
            dispatchEvent();
        }else{
            removeEvent();
        }
    });
}
    
