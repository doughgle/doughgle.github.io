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

{{< cc-by >}}