/**
 * Copyright © 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
	'jquery',
    'ko',
    'uiComponent',
    'Magento_Customer/js/customer-data',
	'mage/cookies'
], function ($, ko, Component, customerData) {
    'use strict';
    return Component.extend({
        initialize: function (config) {
            var self = this;

            self._super();


	        var allowServices = false,
		        allowedCookies,
		        allowedWebsites;

	        if (config.isCookieRestrictionModeEnabled) {
		        allowedCookies = $.mage.cookies.get(config.cookieName);

		        if (allowedCookies !== null) {
			        allowedWebsites = JSON.parse(allowedCookies);

			        if (allowedWebsites[config.currentWebsite] === 1) {
				        allowServices = true;
			        }
		        }
	        } else {
		        allowServices = true;
	        }

	        if (allowServices) {
		        console.log(customerData.get('cadence-fbpixel-fpc')());
		        customerData.get('cadence-fbpixel-fpc').subscribe(function (loadedData) {
			        console.log(loadedData);
			        if (loadedData && "undefined" !== typeof loadedData.events) {
				        for (var eventCounter = 0; eventCounter < loadedData.events.length; eventCounter++) {
					        var eventData = loadedData.events[eventCounter];
					        //console.log(eventData);
					        if ("undefined" !== typeof eventData.eventAdditional && eventData.eventAdditional) {
						        console.log("Tracking: " + eventData.eventName + " , with data: ");
						        console.log(eventData.eventAdditional);
						        fbq('track', eventData.eventName, eventData.eventAdditional || {});
					        }
				        }
				        customerData.set('cadence-fbpixel-fpc', {});
			        }
		        });
	        }
        }
    });
});