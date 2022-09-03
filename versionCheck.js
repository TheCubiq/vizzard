// ==UserScript==
// @name              VizzardVers
// @description       check the vers
// @author            Cubiq The Creator
// @namespace         https://github.com/TheCubiq/vizzardVers
// @match             https://vizzy.io/*
// @icon              https://vizzy.io/favicon.ico
// @supportURL        https://github.com/TheCubiq/vizzard
// @grant             unsafeWindow
// ==/UserScript==
"use strict";
const VIZZARD_LATEST_VERSION = '0.0.70-2+1';
unsafeWindow.VIZZARD_LATEST_VERSION = VIZZARD_LATEST_VERSION;