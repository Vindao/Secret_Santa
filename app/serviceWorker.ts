// import { popupEvent } from "./custom/popupEvent";

interface configI {
  onUpdate?: () => void;
  onSuccess?: () => void;
  onNoInternet?: () => void;
}

export interface SWRegistrationI {
  installing: boolean;
  onupdatefound?: () => void;
  onstatechange?: () => void;
}

type swURLT = string;

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export const register = (config: configI) => {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    const publicUrl = new URL(window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets;
      return;
    }
    window.addEventListener("load", () => {
      const swUrl = `sw.bundle.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "This web app is being served cache-first by a service " +
              "worker. To learn more, visit http://bit.ly/CRA-PWA"
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
};

const registerValidSW = (swURL: string, config: configI) => {
  navigator.serviceWorker
    .register(swURL)
    .then((SWRegistration: any) => {
      // TODO: specify type
      SWRegistration.onupdatefound = () => {
        const installingSW = SWRegistration.installing;
        if (installingSW == null) {
          return;
        }
        installingSW.onstatechange = () => {
          if (installingSW.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // new content is available but not served yet
              // it will be served when all tabs of this application are closed

              console.log(`New content is available and will be used when all 
                        tabs for this page are closed. See http://bit.ly/CRA-PWA.`);
              if (config && config.onUpdate) {
                config.onUpdate();
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log("Content is cached for offline use.");

              if (config && config.onSuccess) {
                config.onSuccess();
              }
            }
          }
        };
      };
    })
    .catch((err: any) => {
      console.error(
        "There was an error during the service worker registration:",
        err
      );
    });
};

const checkValidServiceWorker = (swURL: swURLT, config: configI) => {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swURL)
    .then((res: any) => {
      // TODO: specify type
      const contentType = res.headers.get("content-type");
      if (
        res.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // no service worker found
        // reload the app
        navigator.serviceWorker.ready.then(SWRegistration => {
          SWRegistration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swURL, config);
      }
    })
    .catch(() => {
      console.log("No internet connection. App is running in offline mode");
    });
};

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
