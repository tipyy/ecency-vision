import React, {Component} from "react";

export default class Tracker extends Component {
    render() {
        const code = `var _paq = window._paq = window._paq || [];
                  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
                  _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
                  _paq.push(["setCookieDomain", "*.ecency.com"]);
                  _paq.push(["setDomains", ["*.ecency.com"]]);
                  _paq.push(['trackPageView']);
                  _paq.push(['enableLinkTracking']);
                  (function() {
                  var u="//analytics.ecency.com/";
                  _paq.push(['setTrackerUrl', u+'matomo.php']);
                  _paq.push(['setSiteId', '1']);
                  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                  g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                })();`;

        return <>
            <script type="text/javascript" dangerouslySetInnerHTML={{__html: code}}/>
            <noscript>
                <p><img src="//analytics.ecency.com/matomo.php?idsite=1&amp;rec=1" style={{border: "0"}} alt=""/></p>
            </noscript>
        </>
    }
}
