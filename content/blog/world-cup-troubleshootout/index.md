---
title: "World Cup Troubleshootout"
date: 2023-01-04T22:02:06+08:00
publishdate: 2023-01-04T22:02:06+08:00
tags: ['thinkpad', 'ubuntu', 'troubleshooting']
comments: true
draft: false
---

Every four years the Fifa World Cup ignites my passion to troubleshoot a bunch of technical problems so that I can enjoy the tournament in the same way I grew up - with highly-biased English commentary.

This time, a big problem worth troubleshooting was the HDMI output on Ubuntu on my Thinkpad X1 Extreme Gen 4. Problem statement: No HDMI power, no big screen.

Here's the [write up](../../how-to/enable-hdmi-on-thinkpad-x1-extreme-gen-4/). To sum up, it shows how to check the hardware details and loaded video driver, and find the recommended video driver for your setup. Use the `lshw` and `xrandr` commands to list your video devices and monitors, and the `lsmod` and `ubuntu-drivers` utilities to check your loaded and recommended drivers.

---

> <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/StillImage" property="dct:title" rel="dct:type">World Cup Troubleshootout</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="douglashellinger.com" property="cc:attributionName" rel="cc:attributionURL">Douglas Hellinger</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.