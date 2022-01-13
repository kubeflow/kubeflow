---
title: Analytics Introduction
---

# Introduction

For many companies is important to understand the user traffic, origin and behaviour. This may apply
to your business, and you can find an example in the app.

## Google Tag Manager (GTM)

In previous versions the app used `Google Analytics` directly, but for this version it uses GTM.
This enables a lot more control over the analytics implementation and also helps you display things
like GDPR modal, various targeted content; control the data transfer, cookies and other aspects
based on user data privacy preferences. Read more about GTM
[here](https://support.google.com/tagmanager/answer/6102821?hl=en&ref_topic=3441530).

## How GTM it works

In order to use the `GTM platform` you set up a container, then you create a tag for each provider
you need, for example, Google Analytics. Then, using the triggers, you control multiple tags based
on data pushed to the data layer. The data pushed gets computed on the client (browser), and then
the library determines which tags will be loaded.

## How is it implemented

The app uses a small singleton class to help with loading the `GTM library`, initialize it and track
events via the GTM available methods.
