# Site Owner

- [Site Owner](#site-owner)
  - [Overview](#overview)
  - [Role of a Site Owner](#role-of-a-site-owner)
    - [Manage Content](#manage-content)
    - [Manage Access](#manage-access)
    - [Enhance the Site](#enhance-the-site)
  - [Folders vs. Metadata](#folders-vs-metadata)
    - [Folders](#folders)
    - [Metadata](#metadata)
    - [Document Sets](#document-sets)
  - [Collaboration Site Templates](#collaboration-site-templates)
  - [Creating Sites/Subsites](#creating-sitessubsites)
    - [Missing Site Templates](#missing-site-templates)
  - [Site Settings](#site-settings)
    - [Users and Permissions](#users-and-permissions)
    - [Look and Feel](#look-and-feel)
    - [Site Actions](#site-actions)
    - [Web Designer Galleries](#web-designer-galleries)
    - [Site Administration](#site-administration)
    - [Search](#search)
    - [Site Collection Administration](#site-collection-administration)
  - [Customizing SharePoint](#customizing-sharepoint)
    - [Changing the Title, Description, URL, or Logo](#changing-the-title-description-url-or-logo)
      - [Title, Description, Logo](#title-description-logo)
      - [URL](#url)
    - [GUI-Based Changes](#gui-based-changes)
    - [Custom CSS](#custom-css)
  - [Adding Apps](#adding-apps)
  - [Libraries](#libraries)
    - [Document Library](#document-library)
    - [Library Settings](#library-settings)
      - [Accessing through Library](#accessing-through-library)
      - [Accessing through Site Contents](#accessing-through-site-contents)
  - [Switching Between New and Classic](#switching-between-new-and-classic)

## Overview

- The role of the site owner:
  - Different for each organization.
  - Person in charge of all aspects of the SharePoint implementation.
  - Managers of the site, with IT taking care of backend and configuration stuff.
- Most site owners will need to know:
  - Management and creation of sites and sub-sites.
  - Management of user access.
  - Enhancing SharePoint.

## Role of a Site Owner

### Manage Content

- Create and configure lists and libraries.
- Create and manage workflows.
- Create and manage columns and content types.
- Owning structure of the sites/sub-sites.

### Manage Access

- Manage access to the site.
- Set permission levels.
- Create and manage permission groups.
- Manage user, site, and app permissions.

### Enhance the Site

- Managing pages, such as adding and updating the web pages.
- Control navigation and regional settings.

## Folders vs. Metadata

### Folders

- SharePoint owners have to deal with is when and whether to use folders.
- Folders create more trouble than they're worth.
- In SharePoint, folders have the following drawbacks:
  - Add to the URL length. URL length limit is 260 characters.
    - If a URL gets longer than this, the URLs with characters beyond this limit will be unclickable.
  - Not searchable.
  - Cannot affect views.
  - Do not help with workflows.

### Metadata

- Instead of folders, it's often more helpful to use metadata or a document set.
- Metadata has the folloiwng benefits:
  - Doesn't contribute to URL length.
  - Searchable.
  - Affects views.
  - Useful in workflows.
- Metadata can't be used to control permissions, however.

### Document Sets

- Document sets are another option to use instead of folders.
  - [Official introduction to document sets](https://support.office.com/en-us/article/introduction-to-document-sets-3dbcd93e-0bed-46b7-b1ba-b31de2bcd234).

## Collaboration Site Templates

- These are out-of-the-box configurations for sites.
- Any of the features in these sites can be turned on or off for other site types.
  - They're just starter templates.
  - Team Site
    - Document library, site assets, pages, and newsfeed.
    - Nothing really configured out of the box.
  - Project Site
    - For project management.
    - Pre-built with task list that allows connection to project management systems.
    - Doesn't have a site pages library.
      - Only a homepage.
  - Blog Site
    - Just for blogs. Don't use it for anything else.
  - Community Site
    - Most of the sites will be of this style.
    - Forums for discussion, etc.
    - New in 2016.

## Creating Sites/Subsites

- Click the Gear > Site Contents.
- Scroll down to Subsites.
- Click + New Subsite to enter the subsite form.
  - Avoid using a long URL, and avoid spaces in the URL.
  - Set default permissions. You can always change permissions on a site level later.
  - Recommendation is to inherit the parent's top-nav for subsites.
    - This gives users a sense of grounding in their navigation experience.

### Missing Site Templates

- If a site template is missing, you can activate it using the Manage Site Features in the Site Settings menu.
  - Gear > Site Settings > Manage Site Features.
- You'll probably need to activate this feature on the Site Collection level as well.
  - Not sure how to do this yet. ❗️

## Site Settings

- Every site and subsite has its own unique site settings. They're not shared across the platform.
  - They can be inherited, however, if you configure the top-level site before deploying the sub-site.

### Users and Permissions

- Control access.

### Look and Feel

- Visual adjustments and customization.
- Can edit quick links and top nav here.

### Site Actions

- Fusebox of the site.
- Turn on/off features from the site.

### Web Designer Galleries

- Master libraries of the site.
- Site columns have the columns of the site and all sites above it.

### Site Administration

- Regional and language settings are usually the only thing you'll need to worry about.
- Configure site closure and deletion policies here.
- Also can be used to adjust notification options for other users.

### Search

- Usually set up globally.
- Deep dive to get this to work.
- Custom searches, scopes, and queries.

### Site Collection Administration

- Has a lot of powerful options.
- Only available for Site Admin.
- Only appears at the top-level of the Site Collection.

## Customizing SharePoint

### Changing the Title, Description, URL, or Logo

- Gear > Site Settings > Title, Description, and Logo.

#### Title, Description, Logo

- Change whatever you need.
- Logo needs to be uploaded to SharePoint.
- Logo needs to be pre-sized.
  - Best logo size is around 150px.

#### URL

- DON'T. Don't change this, you stupid idiot.

### GUI-Based Changes

- Gear > Change the Look (if this option isn't available, access Site Settings > Look and Feel > Change the Look)
  - Upload background image.
  - Change color scheme.
  - Change font.
  - Change overall layout (Seattle or Oslo).

### Custom CSS

- You can upload and use custom CSS files to adjust the visuals of the page as well.

## Adding Apps

- Apps are an umbrella term for lists, libraries, and third-party things you might use for your site.
- Add apps to the site you want it to exist in.
  - Top-level site within a Site Collection
- Gear > Site Contents > Add an App. On-prem, you can also just choose Gear > Add an App.
  - Clicking an option pops up its dialogue box.

## Libraries

- Libraries are considered Apps in SharePoint.

### Document Library

- Can store any type of file.
- Add an App > Document Library.

### Library Settings

- Control library settings like:
  - Email settings
  - User permissions
  - Columns, metadata, views, etc.

#### Accessing through Library

- Access library.
- Click the Library tab at the top of the site.
- Click Library Settings.

#### Accessing through Site Contents

- Gear > Site Contents > ... on library > Settings

## Switching Between New and Classic

- Doesn't seem to work.
