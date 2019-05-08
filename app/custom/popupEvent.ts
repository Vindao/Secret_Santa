// @ts-ignore
const event = document.createEvent("CustomEvent", { popupType: "" });

event.initEvent("serviceWorker", true, false);

export const popupEvent = event;
